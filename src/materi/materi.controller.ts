import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  NotFoundException,
  UseInterceptors,
  Req,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { MateriService } from 'src/materi/materi.service';
import { CreateMateriDto } from 'src/materi/dto/create-materi.dto';
import { UpdateMateriDto } from 'src/materi/dto/update-materi.dto';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { BigIntToJSON } from 'src/common/utils/bigint-to-json';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/common/anotations/roles';
import { JwtAuthGuard } from 'src/common/guards/access-token.guard';
import { RoleGuard } from 'src/common/guards/roles.guard';
import { PelajaranService } from 'src/pelajaran/pelajaran.service';
import { validateAndUploadFiles } from 'src/common/utils/validate-upload-file';
import { validateAndUpdateFiles } from 'src/common/utils/validate-update-file';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { FileCountInterceptor } from 'src/common/utils/FileCountInterceptor';
import FileData from 'src/common/types/FileData';
import { deleteManyFiles } from 'src/common/utils/deleteFiles';
import { ConfigService } from '@nestjs/config';

@UseGuards(AuthGuard)
@Controller('materi')
@ApiTags('Materi')
export class MateriController {
  constructor(
    private readonly materiService: MateriService,
    private readonly pelajaranService: PelajaranService,
    private configService: ConfigService,
  ) {}

  @Post('create')
  @Roles('admin', 'guru')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UseInterceptors(FilesInterceptor('files', 11), FileCountInterceptor)
  @ApiOperation({ summary: 'Create Materi' })
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createMateriDto: CreateMateriDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    const files = req['files'] as Express.Multer.File[];

    const fileNameAndUrl = await validateAndUploadFiles(
      'materi',
      files,
      this.configService,
    );
    const materi = await this.materiService.create(
      userId,
      createMateriDto,
      fileNameAndUrl,
    );

    return res.status(201).json({
      status: 'success',
      message: 'Berhasil menambah materi',
      materi: JSON.parse(JSON.stringify(materi, BigIntToJSON)),
    });
  }

  @Get('get-all')
  @Roles('admin', 'guru')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Get All Materi' })
  async findAll(@Res() res: Response, @Req() req: Request) {
    const userId = req['user'].sub;
    const role = req['role'];

    const materi =
      role === 'admin'
        ? await this.materiService.findManyFilteredWithInclude({
            include: {
              pelajaran: true,
              tugas: true,
            },
          })
        : await this.materiService.findManyFilteredWithInclude({
            where: {
              creatorId: userId,
            },
            include: {
              pelajaran: true,
              tugas: true,
            },
          });

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil mengambil semua materi',
      materi: JSON.parse(JSON.stringify(materi, BigIntToJSON)),
    });
  }

  @Get('get-by-id/:id')
  @Roles('admin', 'guru')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Get Materi By ID' })
  async findOne(
    @Param('id') id: number,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    const role = req['role'];

    const materi =
      role === 'admin'
        ? await this.materiService.findOneFilteredWithInclude({
            where: { id },
            include: {
              pelajaran: true,
              tugas: true,
            },
          })
        : await this.materiService.findOneFilteredWithInclude({
            where: {
              id,
              creatorId: userId,
            },
            include: {
              pelajaran: true,
              tugas: true,
            },
          });

    if (!materi) throw new NotFoundException('Materi tidak ditemukan');

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil menemukan materi',
      materi: JSON.parse(JSON.stringify(materi, BigIntToJSON)),
    });
  }

  @Patch('update/:id')
  @Roles('admin', 'guru')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UseInterceptors(FilesInterceptor('files', 11), FileCountInterceptor)
  @ApiOperation({ summary: 'Update Materi' })
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('id') id: number,
    @Body() updateMateriDto: UpdateMateriDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    const role = req['role'];
    const files = req['files'] as Express.Multer.File[];

    const materi =
      role === 'admin'
        ? await this.materiService.findOne(id)
        : await this.materiService.findOneFilteredWithSelect({
            where: {
              id,
              creatorId: userId,
            },
            select: {
              id: true,
              pelajaranId: true,
              creatorId: true,
              nama_materi: true,
              isi_materi: true,
              files: true,
              createdAt: true,
              updatedAt: true,
              pelajaran: true,
            },
          });

    if (!materi) throw new NotFoundException('Materi tidak ditemukan');

    const oldFiles: FileData[] = (materi.files as unknown as any[]).map(
      (file) => {
        if (
          typeof file === 'object' &&
          'fileUrl' in file &&
          'fileName' in file &&
          'originalName' in file
        ) {
          return file as FileData;
        } else {
          throw new BadRequestException('Invalid file data structure');
        }
      },
    );

    let uploadedFiles = [];
    if (files && files.length > 0) {
      try {
        uploadedFiles = await validateAndUpdateFiles(
          oldFiles,
          'materi',
          files,
          this.configService,
        );
      } catch (error) {
        throw new BadRequestException(
          `Gagal mengunggah file: ${error.message}`,
        );
      }
    }

    let newFiles = [];
    if (uploadedFiles.length > 0) {
      newFiles = uploadedFiles.map((file) => ({
        fileUrl: file.fileUrl,
        fileName: file.fileName,
        originalName: file.originalName,
      }));
    }

    const materiUpdate = await this.materiService.update({
      where: { id },
      data: updateMateriDto,
      files: newFiles,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil memperbarui materi',
      materi: JSON.parse(JSON.stringify(materiUpdate, BigIntToJSON)),
    });
  }

  @Delete('delete/:id')
  @Roles('admin', 'guru')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Delete Materi' })
  async remove(
    @Param('id') id: number,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    const role = req['role'];

    const materi =
      role === 'admin'
        ? await this.materiService.findOne(id)
        : await this.materiService.findOneFilteredWithSelect({
            where: {
              id,
              creatorId: userId,
            },
            select: {
              id: true,
              pelajaranId: true,
              creatorId: true,
              nama_materi: true,
              isi_materi: true,
              files: true,
              createdAt: true,
              updatedAt: true,
              pelajaran: true,
            },
          });

    if (!materi) throw new NotFoundException('Materi tidak ditemukan');

    const oldFiles: FileData[] = (materi.files as unknown as any[]).map(
      (file) => {
        if (
          typeof file === 'object' &&
          'fileUrl' in file &&
          'fileName' in file &&
          'originalName' in file
        ) {
          return file as FileData;
        } else {
          throw new BadRequestException('Invalid file data structure');
        }
      },
    );

    if (oldFiles && oldFiles.length > 0) {
      try {
        await deleteManyFiles(oldFiles, 'materi');
      } catch (error) {
        throw new BadRequestException(`Gagal menghapus file: ${error.message}`);
      }
    }

    await this.materiService.delete({ id });

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil menghapus materi dan file terkait',
    });
  }
}
