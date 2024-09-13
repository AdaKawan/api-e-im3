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
  UseGuards,
  Req,
} from '@nestjs/common';
import { KelasService } from './kelas.service';
import { CreateKelaDto } from './dto/create-kela.dto';
import { UpdateKelaDto } from './dto/update-kela.dto';
import { Response, Request } from 'express';
import { BigIntToJSON } from 'src/common/utils/bigint-to-json';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateKelasResponseDto } from './dto/create-kelas-response.dto';
import { FindAllKelasResponseDto } from './dto/get-all-kelas-response.dto';
import { FindOneKelasResponseDto } from './dto/get-kelas-by-id-response.dto';
import { UpdateKelasResponseDto } from './dto/update-kelas-response.dto';
import { DeleteKelasResponseDto } from './dto/delete-kelas-response.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/anotations/roles';
import { RoleGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/access-token.guard';
import { Kelas } from '@prisma/client';

@UseGuards(AuthGuard)
@Controller('kelas')
@ApiTags('Kelas')
export class KelasController {
  constructor(private readonly kelasService: KelasService) {}

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('create')
  @ApiOperation({ summary: 'Create Kelas' })
  async create(@Body() createKelaDto: CreateKelaDto, @Res() res: Response) {
    const kelas = await this.kelasService.create(createKelaDto);

    return res.status(201).json({
      status: 'success',
      message: 'Berhasil menambah data',
      kelas: JSON.parse(JSON.stringify(kelas, BigIntToJSON)),
    });
  }

  @Roles('admin', 'guru')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('get-all')
  @ApiOperation({ summary: 'Get All Kelas' })
  async findAll(@Res() res: Response, @Req() req: Request) {
    const userId = req['user'].sub;
    const role = req['role'];

    const kelas =
      role === 'admin'
        ? await this.kelasService.findAllWithSelectedField()
        : await this.kelasService.findAllWithSelectedField({
            where: {
              users: {
                some: {
                  userId: userId,
                },
              },
            },
          });

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil mengambil data',
      kelas: JSON.parse(JSON.stringify(kelas, BigIntToJSON)),
    });
  }

  @Roles('admin', 'guru')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('get-by-id/:id')
  @ApiOperation({ summary: 'Get Kelas By Id' })
  async findOne(
    @Param('id') id: number,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    const role = req['role'];
    const kelas =
      role === 'admin'
        ? await this.kelasService.findOneWithIncludedField({
            where: { id },
            include: {
              users: {
                include: {
                  user: {
                    select: {
                      nama_lengkap: true,
                    },
                  },
                },
              },
              pelajaran: {
                include: {
                  materi: {
                    include: {
                      tugas: true,
                    },
                  },
                },
              },
            },
          })
        : await this.kelasService.findOneWithIncludedField({
            where: {
              id,
              users: {
                some: {
                  userId,
                },
              },
            },
            include: {
              users: {
                include: {
                  user: {
                    select: {
                      nama_lengkap: true,
                    },
                  },
                },
              },
              pelajaran: {
                include: {
                  materi: {
                    include: {
                      tugas: true,
                    },
                  },
                },
              },
            },
          });

    if (!kelas) throw new NotFoundException('Kelas tidak ditemukan');

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil menemukan kelas',
      kelas: JSON.parse(JSON.stringify(kelas, BigIntToJSON)),
    });
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch('update/:id')
  @ApiOperation({ summary: 'Update Kelas' })
  async update(
    @Param('id') id: number,
    @Body() updateKelaDto: UpdateKelaDto,
    @Res() res: Response,
  ) {
    const kelas = await this.kelasService.findOneWithIncludedField({
      where: { id },
    });

    if (!kelas) throw new NotFoundException('Kelas tidak ditemukan');

    const kelasUpdate = await this.kelasService.update(id, updateKelaDto);

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil memperbarui kelas',
      kelas: JSON.parse(JSON.stringify(kelasUpdate, BigIntToJSON)),
    });
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete Kelas' })
  async remove(@Param('id') id: number, @Res() res: Response) {
    const kelas = await this.kelasService.findOneWithIncludedField({
      where: { id },
    });

    if (!kelas) throw new NotFoundException('Kelas tidak ditemukan');

    await this.kelasService.remove(id);

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil menghapus kelas',
    });
  }
}
