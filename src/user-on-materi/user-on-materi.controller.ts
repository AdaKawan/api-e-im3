import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserOnMateriService } from 'src/user-on-materi/user-on-materi.service';
import { CreateUserOnMateriDto } from 'src/user-on-materi/dto/create-user-on-materi.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { BigIntToJSON } from 'src/common/utils/bigint-to-json';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/anotations/roles';
import { JwtAuthGuard } from 'src/common/guards/access-token.guard';

@UseGuards(AuthGuard)
@Controller('user-on-materi')
@ApiTags('User On Materi')
export class UserOnMateriController {
  constructor(private readonly userOnMateriService: UserOnMateriService) {}

  @Post('create')
  @ApiBearerAuth()
  @Roles('admin', 'guru', 'siswa')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Create UserOnMateri' })
  async create(
    @Body() createUserOnMateriDto: CreateUserOnMateriDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    const userOnMateri = await this.userOnMateriService.create(
      userId,
      createUserOnMateriDto,
    );

    return res.status(201).json({
      status: 'success',
      message: 'Berhasil menambah UserOnMateri',
      userOnMateri: JSON.parse(JSON.stringify(userOnMateri, BigIntToJSON)),
    });
  }

  @Get('get-all')
  @ApiBearerAuth()
  @Roles('admin', 'guru')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Get All UserOnMateri' })
  async findAll(@Res() res: Response, @Req() req: Request) {
    const userId = req['user'].sub;
    const role = req['role'];
    const userOnMateri =
      role === 'admin'
        ? await this.userOnMateriService.findMany()
        : await this.userOnMateriService.findManyFilteredWithSelect({
            where: {
              materi: {
                creatorId: userId,
              },
            },
            select: {
              user: {
                select: {
                  nama_lengkap: true,
                },
              },
              materi: {
                select: {
                  nama_materi: true,
                },
              },
            },
          });

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil mengambil semua UserOnMateri',
      userOnMateri: JSON.parse(JSON.stringify(userOnMateri, BigIntToJSON)),
    });
  }

  @Get('get-by-materi-id/:materiId')
  @ApiBearerAuth()
  @Roles('admin', 'guru')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Get One By Materi Id UserOnMateri' })
  async findOneByMateriId(
    @Param('materiId') materiId: number,
    @Res() res: Response,
  ) {
    const userOnMateri =
      await this.userOnMateriService.findManyFilteredWithSelect({
        where: { materiId },
        select: {
          userId: true,
          materiId: true,
          user: {
            select: {
              nama_lengkap: true,
            },
          },
          materi: {
            select: {
              id: true,
              nama_materi: true,
            },
          },
        },
      });

    if (!userOnMateri) throw new NotFoundException('Materi tidak ditemukan');

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil menemukan UserOnMateri',
      userOnMateri: JSON.parse(JSON.stringify(userOnMateri, BigIntToJSON)),
    });
  }

  @Get('get-by-user-id/:userId')
  @ApiBearerAuth()
  @Roles('admin', 'guru')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Get One By User Id UserOnMateri' })
  async findOneByUserId(@Param('userId') userId: number, @Res() res: Response) {
    const userOnMateri =
      await this.userOnMateriService.findManyFilteredWithSelect({
        where: { userId },
        select: {
          userId: true,
          materiId: true,
          user: {
            select: {
              nama_lengkap: true,
            },
          },
          materi: {
            select: {
              id: true,
              nama_materi: true,
            },
          },
        },
      });

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil menemukan UserOnMateri',
      userOnMateri: JSON.parse(JSON.stringify(userOnMateri, BigIntToJSON)),
    });
  }

  @Delete('delete/:userId/:materiId')
  @ApiBearerAuth()
  @Roles('admin', 'guru')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Delete UserOnMateri' })
  async remove(
    @Param('userId') userId: number,
    @Param('materiId') materiId: number,
    @Res() res: Response,
  ) {
    const userOnMateri =
      await this.userOnMateriService.findOneFilteredWithSelect({
        where: { userId, materiId },
        select: { userId: true, materiId: true },
      });

    if (!userOnMateri)
      throw new NotFoundException('UserOnMateri tidak ditemukan');

    await this.userOnMateriService.delete({
      userId_materiId: { userId, materiId },
    });

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil menghapus UserOnMateri',
    });
  }
}
