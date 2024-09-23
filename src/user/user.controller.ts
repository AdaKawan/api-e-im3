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
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { Request, Response } from 'express';
import { BigIntToJSON } from 'src/common/utils/bigint-to-json';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/anotations/roles';
import { RoleGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/access-token.guard';
import { UpdateIsActiveDto } from 'src/user/dto/update-is-active.dto';
import { UpdateUserProfileDto } from 'src/user/dto/update-user-profile.dto';
import { success } from 'src/common/utils/responseHandler';

@Controller('users')
@UseGuards(AuthGuard)
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('get-all-guru')
  @ApiOperation({ summary: 'Get All Guru' })
  async getAllGuru(@Res() res: Response) {
    const guru = await this.userService.getAllGuru();

    res.status(200).json({
      status: 'success',
      message: 'Berhasil mengambil data',
      guru: JSON.parse(JSON.stringify(guru, BigIntToJSON)),
    });
  }

  @Get('get-all-siswa')
  @Roles('admin', 'guru')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Get All Siswa' })
  async getAllSiswa(@Res() res: Response, @Req() req: Request) {
    const role = req['role'];
    const siswa = await this.userService.findManyStudents(role);

    res.status(200).json({
      status: 'success',
      message: 'Berhasil mengambil data',
      siswa: JSON.parse(JSON.stringify(siswa, BigIntToJSON)),
    });
  }

  @Post('create')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Create User' })
  @ApiBody({
    description: 'Create a new User',
    type: CreateUserDto,
    required: true,
  })
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    if (createUserDto.password !== createUserDto.confPassword)
      throw new BadRequestException('Password dan confirm password tidak sama');

    const user = await this.userService.create(createUserDto);

    delete user.password;

    res.status(201).json({
      status: 'success',
      message: 'Berhasil menambahkan data',
      user: JSON.parse(JSON.stringify(user, BigIntToJSON)),
    });
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('get-all')
  @ApiOperation({ summary: 'Get All User' })
  async getAll(@Res() res: Response) {
    const users = await this.userService.findAll();
    res.status(200).json({
      status: 'success',
      message: 'Berhasil mengambil data',
      users: JSON.parse(JSON.stringify(users, BigIntToJSON)),
    });
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('find-one-guru/:id')
  @ApiOperation({ summary: 'Find One Guru' })
  async finOneGuru(@Param('id') id: number, @Res() res: Response) {
    const guru = await this.userService.findOneWithSelectedField(
      {
        id,
        roleId: 2,
      },
      {
        id: true,
        nama_lengkap: true,
        username: true,
        email: true,
        isActive: true,
        asal_sekolah: true,
        role: {
          select: {
            id: true,
            role: true,
          },
        },
        createdPelajaran: {
          select: {
            nama_pelajaran: true,
          },
        },
        createdMateri: {
          select: {
            nama_materi: true,
          },
        },
        createdTugas: {
          select: {
            nama_tugas: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    );

    if (!guru) throw new NotFoundException('Guru tidak ditemukan');

    res.status(200).json({
      status: 'success',
      message: 'Berhasil mengambil data',
      guru: JSON.parse(JSON.stringify(guru, BigIntToJSON)),
    });
  }

  @Roles('admin', 'guru')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('find-one-siswa/:id')
  @ApiOperation({ summary: 'Find One Siswa' })
  async finOneSiswa(@Param('id') id: number, @Res() res: Response) {
    const siswa = await this.userService.findOneWithSelectedField(
      {
        id,
        roleId: 3,
      },
      {
        id: true,
        nama_lengkap: true,
        username: true,
        email: true,
        isActive: true,
        materi: {
          select: {
            materiId: true,
            materi: {
              select: {
                nama_materi: true,
              },
            },
          },
        },
        pengumpulan: {
          select: {
            id: true,
            isi_pengumpulan: true,
            nilai: {
              select: {
                nilai: true,
              },
            },
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    );

    if (!siswa) throw new NotFoundException('Siswa tidak ditemukan');

    res.status(200).json({
      status: 'success',
      message: 'Berhasil mengambil data',
      siswa: JSON.parse(JSON.stringify(siswa, BigIntToJSON)),
    });
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch('update/:id')
  @ApiOperation({ summary: 'Update User' })
  @ApiBody({
    description: 'Update User',
    type: UpdateUserDto,
    required: true,
  })
  async update(
    @Param('id') id: number,
    @Res() res: Response,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.findOne({
      id,
    });

    if (!user) throw new NotFoundException('User tidak ditemukan');

    if (updateUserDto.password !== updateUserDto.confPassword)
      throw new BadRequestException('Password dan confirm password tidak sama');

    const userUpdate = await this.userService.update(id, updateUserDto);

    delete userUpdate.password;

    res.status(200).json({
      status: 'success',
      message: 'Berhasil mengubah data',
      user: JSON.parse(JSON.stringify(userUpdate, BigIntToJSON)),
    });
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Update is Active User' })
  @Patch('toggle-active/:id')
  async toggleActiveStatus(
    @Param('id') id: number,
    @Body() updateIsActiveDto: UpdateIsActiveDto,
    @Res() res: Response,
  ) {
    const user = await this.userService.findOne({ id });
    if (!user) {
      throw new NotFoundException('Pengguna tidak ditemukan.');
    }

    const settIsActiove = await this.userService.toggleActiveStatus(
      id,
      updateIsActiveDto.isActive,
    );

    return res.status(200).json(success('User berhasil aktif', {
      user: JSON.parse(JSON.stringify(settIsActiove, BigIntToJSON))
    }));
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete User' })
  async delete(@Param('id') id: number, @Res() res: Response) {
    const user = await this.userService.findOneWithoutPassword({
      id,
    });

    if (!user) throw new NotFoundException('User tidak ditemukan');

    await this.userService.delete(id);

    res.status(200).json({
      status: 'success',
      message: 'Berhasil menghapus',
    });
  }

  @Roles('admin', 'guru', 'siswa')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'User Get Me' })
  @Get('get-me')
  async userGetMe(@Req() req: Request, @Res() res: Response) {
    const userId = req['user'].sub;

    const user = await this.userService.findOneWithSelectedField(
      {
        id: userId,
      },
      {
        id: true,
        nama_lengkap: true,
        email: true,
        username: true,
        role: {
          select: {
            role: true,
          },
        },
        asal_sekolah: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    );

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil mengambil data',
      user: JSON.parse(JSON.stringify(user, BigIntToJSON)),
    });
  }

  @Roles('admin', 'guru', 'siswa')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch('update-profile')
  @ApiOperation({ summary: 'Update User' })
  @ApiBody({
    description: 'Update User',
    type: UpdateUserDto,
    required: true,
  })
  async updateProfileUSer(
    @Res() res: Response,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;

    const user = await this.userService.findOne({ id: userId });

    if (!user) throw new NotFoundException('User tidak ditemukan');

    if (updateUserProfileDto.password !== updateUserProfileDto.confPassword)
      throw new BadRequestException('Password dan confirm password tidak sama');

    const userUpdate = await this.userService.updateUserProfile(
      userId,
      updateUserProfileDto,
    );
    delete userUpdate.password;

    res.status(200).json({
      status: 'success',
      message: 'Berhasil mengubah data',
      user: JSON.parse(JSON.stringify(userUpdate, BigIntToJSON)),
    });
  }
}
