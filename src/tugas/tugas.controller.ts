import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Res,
  Req,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { TugasService } from 'src/tugas/tugas.service';
import { CreateTugasDto } from 'src/tugas/dto/create-tugas.dto';
import { UpdateTugasDto } from 'src/tugas/dto/update-tugas.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BigIntToJSON } from 'src/common/utils/bigint-to-json';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/anotations/roles';
import { JwtAuthGuard } from 'src/common/guards/access-token.guard';
import { RoleGuard } from 'src/common/guards/roles.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@UseGuards(AuthGuard)
@Controller('tugas')
@ApiTags('Tugas')
export class TugasController {
  constructor(
    private readonly tugasService: TugasService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('create')
  @ApiBearerAuth()
  @Roles('admin', 'guru')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Create Tugas' })
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createTugasDto: CreateTugasDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    const role = req['role'];

    if (role === 'guru') {
      const materi = await this.prisma.materi.findFirst({
        where: {
          id: createTugasDto.materiId,
          creatorId: userId,
        },
      });

      if (!materi) {
        throw new ForbiddenException(
          'Anda hanya bisa membuat tugas pada materi yang Anda buat sendiri.',
        );
      }
    }

    // const { fileName, fileUrl } = await validateAndUploadFile('tugas', file);
    // createTugasDto.file = fileName;
    // createTugasDto.file_url = fileUrl;

    const tugas = await this.tugasService.create(userId, createTugasDto);

    return res.status(201).json({
      status: 'success',
      message: 'Berhasil menambah tugas',
      tugas: JSON.parse(JSON.stringify(tugas, BigIntToJSON)),
    });
  }

  @Get('get-all')
  @ApiBearerAuth()
  @Roles('admin', 'guru')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Get All Tugas' })
  async findAll(@Res() res: Response, @Req() req: Request) {
    const userId = req['user'].sub;
    const role = req['role'];

    const selecttedItem: Prisma.TugasSelect = {
      id: true,
      materiId: true,
      creatorId: true,
      nama_tugas: true,
      isi_tugas: true,
      // file: true,
      // file_url: true,
      deadline: true,
      createdAt: true,
      updatedAt: true,
      pengumpulan: {
        select: {
          pengumpul: {
            select: {
              nama_lengkap: true,
            },
          },
        },
      },
    };

    const tugas =
      role === 'admin'
        ? await this.tugasService.findManyFilteredWithSelect({
            select: selecttedItem,
          })
        : await this.tugasService.findManyFilteredWithSelect({
            where: {
              creatorId: userId,
            },
            select: selecttedItem,
          });

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil mengambil semua tugas',
      tugas: JSON.parse(JSON.stringify(tugas, BigIntToJSON)),
    });
  }

  @Get('get-by-id/:id')
  @ApiBearerAuth()
  @Roles('admin', 'guru', 'siswa')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Get One Tugas' })
  async findOne(
    @Param('id') id: number,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    const role = req['role'];

    const selectedItems: Prisma.TugasSelect = {
      id: true,
      materiId: true,
      creatorId: true,
      nama_tugas: true,
      isi_tugas: true,
      // file: true,
      // file_url: true,
      deadline: true,
      createdAt: true,
      updatedAt: true,
      materi: true,
      pengumpulan: {
        select: {
          isi_pengumpulan: true,
          // file_url: true,
          // file: true,
          pengumpul: {
            select: {
              id: true,
              nama_lengkap: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      },
    };

    const selectedItemsRoleSiswa: Prisma.TugasSelect = {
      id: true,
      materiId: true,
      creatorId: true,
      nama_tugas: true,
      isi_tugas: true,
      // file: true,
      // file_url: true,
      deadline: true,
      createdAt: true,
      updatedAt: true,
      materi: true,
    };

    const tugas =
      role === 'admin'
        ? await this.tugasService.findOneFilteredWithSelect({
            where: { id },
            select: selectedItems,
          })
        : role === 'guru'
          ? await this.tugasService.findOneFilteredWithSelect({
              where: {
                id,
                creatorId: userId,
              },
              select: selectedItems,
            })
          : await this.tugasService.findOneFilteredWithSelect({
              where: {
                id,
                creatorId: userId,
              },
              select: selectedItemsRoleSiswa,
            });

    if (!tugas) throw new NotFoundException('Tugas tidak ditemukan');

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil menemukan tugas',
      tugas: JSON.parse(JSON.stringify(tugas, BigIntToJSON)),
    });
  }

  @Patch('update/:id')
  @ApiBearerAuth()
  @Roles('admin', 'guru')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Update Tugas' })
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('id') id: number,
    @Body() updateTugasDto: UpdateTugasDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    const role = req['role'];

    const tugas =
      role === 'admin'
        ? await this.tugasService.findOne(id)
        : await this.tugasService.findOneFilteredWithInclude({
            where: {
              id,
              creatorId: userId,
            },
            include: {
              materi: true,
            },
          });

    if (!tugas) throw new NotFoundException('Tugas tidak ditemukan');

    // const { fileName, fileUrl } = await validateAndUpdateFile(
    //   tugas.file_url,
    //   'materi',
    //   file,
    // );

    // updateTugasDto.file_url = fileUrl;
    // updateTugasDto.file = fileName;

    const tugasUpdate = await this.tugasService.update({
      where: { id },
      data: updateTugasDto,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil memperbarui tugas',
      tugas: JSON.parse(JSON.stringify(tugasUpdate, BigIntToJSON)),
    });
  }

  @Delete('delete/:id')
  @ApiBearerAuth()
  @Roles('admin', 'guru')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Delete Tugas' })
  async remove(
    @Param('id') id: number,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    const role = req['role'];

    const tugas =
      role === 'admin'
        ? await this.tugasService.findOne(id)
        : await this.tugasService.findOneFilteredWithInclude({
            where: {
              id,
              creatorId: userId,
            },
            include: {
              materi: true,
            },
          });

    if (!tugas) throw new NotFoundException('Tugas tidak ditemukan');

    // await del(tugas.file_url, { token: process.env.BLOB_READ_WRITE_TOKEN });

    await this.tugasService.delete({ id });

    // const oldExt = path.extname(tugas.file).toLowerCase()

    // if (oldExt === '.doc' || oldExt === '.docx') {
    //   const oldFileDocPath = `./public/tugas/doc/${tugas.file}`
    //   fs.unlinkSync(oldFileDocPath);
    // } else if (oldExt === '.pdf') {
    //   const oldFilePdfPath = `./public/tugas/pdf/${tugas.file}`
    //   fs.unlinkSync(oldFilePdfPath);
    // }

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil menghapus tugas',
    });
  }
}
