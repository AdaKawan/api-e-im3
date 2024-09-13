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
  BadRequestException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserOnKelasService } from './user-on-kelas.service';
import { CreateUserOnKelaDto } from './dto/create-user-on-kela.dto';
import { Request, Response } from 'express';
import { BigIntToJSON } from 'src/common/utils/bigint-to-json';
import { UpdateUserOnKelasDto } from './dto/update-user-on-kelas.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/anotations/roles';
import { RoleGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/access-token.guard';

@UseGuards(AuthGuard)
@Controller('user-on-kelas')
@ApiTags('User On Kelas')
export class UserOnKelasController {
  constructor(private readonly userOnKelasService: UserOnKelasService) { }

  @Post('create')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Create' })
  async create(
    @Body() createUserOnKelaDto: CreateUserOnKelaDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    const role = req['role'];

    const ifUserInClass =
      await this.userOnKelasService.findOneFilteredWithSelect({
        where: {
          userId: createUserOnKelaDto.userId,
          kelasId: createUserOnKelaDto.kelasId,
        },
        select: {
          kelas: {
            select: {
              id: true,
              nama_kelas: true,
            },
          },
          user: {
            select: {
              id: true,
              nama_lengkap: true,
            },
          },
        },
      });

    if (ifUserInClass)
      throw new BadRequestException('User sudah berada dikelas');

    const userOnKelas =
      await this.userOnKelasService.create(createUserOnKelaDto);

    return res.status(201).json({
      status: 'success',
      message: 'Berhasil menambah user pada kelas',
      data: JSON.parse(JSON.stringify(userOnKelas, BigIntToJSON)),
    });
  }

  @Get('get-all')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Get All' })
  async findAll(@Res() res: Response) {
    const userOnKelas = await this.userOnKelasService.findAll();

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil mengambil data',
      data: JSON.parse(JSON.stringify(userOnKelas, BigIntToJSON)),
    });
  }

  @Get('find-by-user-id/:userId')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Find By User Id' })
  async findOneByUserId(@Param('userId') userId: number, @Res() res: Response) {
    const userOnKelas =
      await this.userOnKelasService.findManyFilteredWithSelect({
        where: { userId },
        select: {
          kelas: {
            select: {
              id: true,
              nama_kelas: true,
            },
          },
        },
      });

    if (!userOnKelas) throw new NotFoundException('User tidak ditemukan');

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil menemukan data',
      data: JSON.parse(JSON.stringify(userOnKelas, BigIntToJSON)),
    });
  }

  @Get('find-by-kelas-id/:kelasId')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Find By Kelas Id' })
  async findOneByKelasId(
    @Param('kelasId') kelasId: number,
    @Res() res: Response,
  ) {
    const userOnKelas =
      await this.userOnKelasService.findManyFilteredWithSelect({
        where: { kelasId },
        select: {
          user: {
            select: {
              id: true,
              nama_lengkap: true,
            },
          },
        },
      });

    if (!userOnKelas) throw new NotFoundException('Kelas tidak ditemukan');

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil menemukan data',
      data: JSON.parse(JSON.stringify(userOnKelas, BigIntToJSON)),
    });
  }

  @Patch('update')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Update' })
  async update(
    @Res() res: Response,
    @Body() updateUserOnKelasDto: UpdateUserOnKelasDto,
  ) {
    const ifUserOnClass =
      await this.userOnKelasService.findOneFilteredWithSelect({
        where: {
          userId: updateUserOnKelasDto.oldUserId,
          kelasId: updateUserOnKelasDto.oldKelasId,
        },
        select: {
          kelas: {
            select: {
              id: true,
              nama_kelas: true,
            },
          },
          user: {
            select: {
              id: true,
              nama_lengkap: true,
            },
          },
        },
      });

    if (!ifUserOnClass) throw new NotFoundException('Data tidak ditemukan');

    await this.userOnKelasService.update({
      updateUserOnKelasDto: updateUserOnKelasDto,
      where: {
        userId_kelasId: {
          userId: updateUserOnKelasDto.oldUserId,
          kelasId: updateUserOnKelasDto.oldKelasId,
        },
      },
    });

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil update data',
    });
  }

  @Delete('delete:userId/:kelasId')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Delete' })
  async remove(
    @Res() res: Response,
    @Param('userId') userId: number,
    @Param('kelasId') kelasId: number,
  ) {
    const ifFound = await this.userOnKelasService.findOneFilteredWithSelect({
      where: {
        userId: userId,
        kelasId: kelasId,
      },
      select: {
        kelas: {
          select: {
            id: true,
          },
        },
        user: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!ifFound) throw new NotFoundException('Data tidak ditemukan');

    await this.userOnKelasService.remove({
      userId_kelasId: {
        userId: userId,
        kelasId: kelasId,
      },
    });

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil menghapus data',
    });
  }
}
