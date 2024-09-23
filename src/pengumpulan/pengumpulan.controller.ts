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
} from '@nestjs/common';
import { PengumpulanService } from 'src/pengumpulan/pengumpulan.service';
import { CreatePengumpulanDto } from 'src/pengumpulan/dto/create-pengumpulan.dto';
import { UpdatePengumpulanDto } from 'src/pengumpulan/dto/update-pengumpulan.dto';
import { ApiOperation, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { BigIntToJSON } from 'src/common/utils/bigint-to-json';
import { Request, Response } from 'express';

import { Roles } from 'src/common/anotations/roles';
import { JwtAuthGuard } from 'src/common/guards/access-token.guard';
import { RoleGuard } from 'src/common/guards/roles.guard';

import { AuthGuard } from 'src/common/guards/auth.guard';

@UseGuards(AuthGuard)
@ApiTags('Pengumpulan')
@Controller('pengumpulan')
export class PengumpulanController {
  constructor(private readonly pengumpulanService: PengumpulanService) {}

  @Post('create')
  @Roles('admin', 'guru', 'siswa')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Create Pengumpulan' })
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createPengumpulanDto: CreatePengumpulanDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;

    // if (!file) throw new BadRequestException('File wajib diupload');

    // const { fileName, fileUrl } = await validateAndUploadFile(
    //   'pengumpulan',
    //   file,
    // );
    // createPengumpulanDto.file = fileName;
    // createPengumpulanDto.file_url = fileUrl;

    const pengumpulan = await this.pengumpulanService.create(
      userId,
      createPengumpulanDto,
    );

    return res.status(201).json({
      status: 'success',
      message: 'Berhasil menambah pengumpulan',
      pengumpulan: JSON.parse(JSON.stringify(pengumpulan, BigIntToJSON)),
    });
  }

  @Get('get-all')
  @Roles('admin', 'guru', 'siswa')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Get All Pengumpulan' })
  async findAll(@Res() res: Response, @Req() req: Request) {
    const userId = req['user'].sub;
    const role = req['role'];
    const pengumpulan = await this.pengumpulanService.findMany(userId, role);

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil mengambil semua pengumpulan',
      pengumpulan: JSON.parse(JSON.stringify(pengumpulan, BigIntToJSON)),
    });
  }

  @Get('get-by-id/:id')
  @Roles('admin', 'guru', 'siswa')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Get One Pengumpulan' })
  async findOne(
    @Param('id') id: number,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    const role = req['role'];
    const pengumpulan = await this.pengumpulanService.findOnewithAuthorization(
      userId,
      role,
      id,
    );

    if (!pengumpulan)
      throw new NotFoundException('Pengumpulan tidak ditemukan');

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil menemukan pengumpulan',
      pengumpulan: JSON.parse(JSON.stringify(pengumpulan, BigIntToJSON)),
    });
  }

  @Patch('update/:id')
  @Roles('admin', 'guru', 'siswa')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Update Pengumpulan' })
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('id') id: number,
    @Body() updatePengumpulanDto: UpdatePengumpulanDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    const role = req['role'];
    const pengumpulan = await this.pengumpulanService.findOnewithAuthorization(
      userId,
      role,
      id,
    );

    if (!pengumpulan)
      throw new NotFoundException('Pengumpulan tidak ditemukan');

    // const { fileName, fileUrl } = await validateAndUpdateFile(
    //   pengumpulan.file_url,
    //   'pengumpulan',
    //   file,
    // );

    // updatePengumpulanDto.file_url = fileUrl;
    // updatePengumpulanDto.file = fileName;

    const pengumpulanUpdate = await this.pengumpulanService.update({
      where: { id },
      data: updatePengumpulanDto,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil memperbarui pengumpulan',
      pengumpulan: JSON.parse(JSON.stringify(pengumpulanUpdate, BigIntToJSON)),
    });
  }

  @Delete('delete/:id')
  @Roles('admin', 'guru', 'siswa')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Delete Pengumpulan' })
  async remove(
    @Param('id') id: number,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    const role = req['role'];
    const pengumpulan = await this.pengumpulanService.findOnewithAuthorization(
      userId,
      role,
      id,
    );

    if (!pengumpulan)
      throw new NotFoundException('Pengumpulan tidak ditemukan');

    // await del(pengumpulan.file_url, {
    //   token: process.env.BLOB_READ_WRITE_TOKEN,
    // });

    await this.pengumpulanService.delete({ id });

    // const oldExt = path.extname(pengumpulan.file).toLowerCase()

    // if (oldExt === '.doc' || oldExt === '.docx') {
    //   const oldFileDocPath = `./public/pengumpulan/doc/${pengumpulan.file}`
    //   fs.unlinkSync(oldFileDocPath);
    // } else if (oldExt === '.pdf') {
    //   const oldFilePdfPath = `./public/pengumpulan/pdf/${pengumpulan.file}`
    //   fs.unlinkSync(oldFilePdfPath);
    // }

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil menghapus pengumpulan',
    });
  }
}
