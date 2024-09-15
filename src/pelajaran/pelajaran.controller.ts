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
import { Request, Response } from 'express';
import { PelajaranService } from './pelajaran.service';
import { CreatePelajaranDto } from './dto/create-pelajaran.dto';
import { UpdatePelajaranDto } from './dto/update-pelajaran.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BigIntToJSON } from 'src/common/utils/bigint-to-json';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/anotations/roles';
import { JwtAuthGuard } from 'src/common/guards/access-token.guard';
import { RoleGuard } from 'src/common/guards/roles.guard';
import { Prisma } from '@prisma/client';

@UseGuards(AuthGuard)
@Controller('pelajaran')
@ApiTags('Pelajaran')
export class PelajaranController {
  constructor(private readonly pelajaranService: PelajaranService) { }

  @Post('create')
  @Roles('admin', 'guru')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Create Pelajaran' })
  async create(
    @Body() createPelajaranDto: CreatePelajaranDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    const role = req['role'];
    const pelajaran = await this.pelajaranService.create(
      createPelajaranDto,
      userId,
      role,
    );

    return res.status(201).json({
      status: 'success',
      message: 'Berhasil menambah pelajaran',
      pelajaran: JSON.parse(JSON.stringify(pelajaran, BigIntToJSON)),
    });
  }

  @Get('get-all')
  @Roles('admin', 'guru')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Get All Pelajaran' })
  async findAll(@Res() res: Response, @Req() req: Request) {
    const userId = req['user'].sub;
    const role = req['role'];
    const pelajaran = await this.pelajaranService.findMany(userId, role);

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil mengambil semua pelajaran',
      pelajaran: JSON.parse(JSON.stringify(pelajaran, BigIntToJSON)),
    });
  }

  @Get('get-by-id/:id')
  @ApiOperation({ summary: 'Get One Pelajaran' })
  @Roles('admin', 'guru')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async findOne(
    @Param('id') id: number,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    const role = req['role'];
    let whereClause: Prisma.PelajaranWhereInput = { id };
    const includeClause: Prisma.PelajaranInclude = {
      materi: true,
    };

    if (role === 'guru') {
      whereClause = {
        AND: [{ id }, { creatorId: userId }],
      };
    }

    const pelajaran = await this.pelajaranService.findOneFilteredWithInclude({
      where: whereClause,
      include: includeClause,
    });

    if (!pelajaran) throw new NotFoundException('Pelajaran tidak ditemukan');

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil menemukan pelajaran',
      pelajaran: JSON.parse(JSON.stringify(pelajaran, BigIntToJSON)),
    });
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update Pelajaran' })
  @Roles('admin', 'guru')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async update(
    @Param('id') id: number,
    @Body() updatePelajaranDto: UpdatePelajaranDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    const role = req['role'];
    const pelajaran = await this.pelajaranService.findOne(id, userId, role);

    if (!pelajaran) throw new NotFoundException('Pelajaran tidak ditemukan');

    const pelajaranUpdate = await this.pelajaranService.update({
      where: { id },
      data: updatePelajaranDto,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil memperbarui pelajaran',
      pelajaran: JSON.parse(JSON.stringify(pelajaranUpdate, BigIntToJSON)),
    });
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete Pelajaran' })
  @Roles('admin', 'guru')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async remove(
    @Param('id') id: number,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    const role = req['role'];
    const pelajaran = await this.pelajaranService.findOne(id, userId, role);

    if (!pelajaran) throw new NotFoundException('Pelajaran tidak ditemukan');

    await this.pelajaranService.delete({ id });

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil menghapus pelajaran',
    });
  }
}
