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
  UploadedFile,
  UseInterceptors,
  Req,
  BadRequestException,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { MateriService } from './materi.service';
import { CreateMateriDto } from './dto/create-materi.dto';
import { UpdateMateriDto } from './dto/update-materi.dto';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { BigIntToJSON } from 'src/common/utils/bigint-to-json';
import { FileInterceptor } from '@nestjs/platform-express';
import { del } from '@vercel/blob';
import { CreateMateriResponseDto } from './dto/create-materi-response.dto';
import { FindAllMateriResponseDto } from './dto/find-all-materi-response.dto';
import { FindOneMateriResponseDto } from './dto/find-one-materi-response.dto';
import { UpdateMateriResponseDto } from './dto/update-materi-response.dto';
import { DeleteMateriResponseDto } from './dto/delete-materi-response.dto';
import { Roles } from 'src/common/anotations/roles';
import { JwtAuthGuard } from 'src/common/guards/access-token.guard';
import { RoleGuard } from 'src/common/guards/roles.guard';
import { PelajaranService } from 'src/pelajaran/pelajaran.service';
import { validateAndUploadFile } from 'src/common/utils/validate-upload-file';
import { validateAndUpdateFile } from 'src/common/utils/validate-update-file';
import { AuthGuard } from 'src/common/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('materi')
@ApiTags('Materi')
export class MateriController {
  constructor(
    private readonly materiService: MateriService,
    private readonly pelajaranService: PelajaranService,
  ) { }

  @Post('create')
  @Roles('admin', 'guru')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Create Materi' })
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createMateriDto: CreateMateriDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    const role = req['role'];

    // if (role === 'admin') {
    //   const { fileName, fileUrl } = await validateAndUploadFile('materi', file);
    //   createMateriDto.file = fileName;
    //   createMateriDto.file_url = fileUrl;
    // } else {
    //   const pelajaran = await this.pelajaranService.findOneFilteredWithInclude({
    //     where: {
    //       id: createMateriDto.pelajaranId,
    //       creatorId: userId,
    //     },
    //     include: {
    //       kelas: true,
    //     },
    //   });

    //   if (!pelajaran) throw new ForbiddenException('Akses terlarang');

    //   const { fileName, fileUrl } = await validateAndUploadFile('materi', file);
    //   createMateriDto.file = fileName;
    //   createMateriDto.file_url = fileUrl;
    // }

    const materi = await this.materiService.create(userId, createMateriDto);

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
            // file: true,
            file_url: true,
            // yt_link: true,
            // file_link: true,
            createdAt: true,
            updatedAt: true,
            pelajaran: true,
          },
        });

    if (!materi) throw new NotFoundException('Materi tidak ditemukan');

    // const { fileName, fileUrl } = await validateAndUpdateFile(
    //   materi.file_url,
    //   'materi',
    //   file,
    // );

    // updateMateriDto.file_url = fileUrl;
    // updateMateriDto.file = fileName;

    const materiUpdate = await this.materiService.update({
      where: { id },
      data: updateMateriDto,
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
            // file: true,
            file_url: true,
            // yt_link: true,
            // file_link: true,
            createdAt: true,
            updatedAt: true,
            pelajaran: true,
          },
        });

    if (!materi) throw new NotFoundException('Materi tidak ditemukan');

    await del(materi.file_url, { token: process.env.BLOB_READ_WRITE_TOKEN });

    await this.materiService.delete({ id });

    // const oldExt = path.extname(materi.file).toLowerCase()

    // if (oldExt === '.doc' || oldExt === '.docx') {
    //   const oldFileDocPath = `./public/materi/doc/${materi.file}`
    //   fs.unlinkSync(oldFileDocPath);
    // } else if (oldExt === '.pdf') {
    //   const oldFilePdfPath = `./public/materi/pdf/${materi.file}`
    //   fs.unlinkSync(oldFilePdfPath);
    // }

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil menghapus materi',
    });
  }
}
