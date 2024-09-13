import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Req,
  UnauthorizedException,
  Res,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { success } from 'src/common/utils/responseHandler';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { BigIntToJSON } from 'src/common/utils/bigint-to-json';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly refresTokenService: RefreshTokenService,
    private jwtService: JwtService,
  ) { }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  async login(
    @Body() loginDto: LoginDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = await this.userService.findOneWithIncludeedField(
      {
        username: loginDto.username,
      },
      {
        role: true,
      },
    );

    if (!user) throw new NotFoundException('User tidak ditemukan');

    const userId = Number(user.id);

    const isPasswordCorrect = await argon2.verify(
      user.password,
      loginDto.password,
    );

    if (!isPasswordCorrect) throw new UnauthorizedException('Password salah.');

    const refreshToken = await this.authService.login(user);

    return res.status(200).json(
      success('Berhasil login', {
        id: userId,
        nama_lengkap: user.nama_lengkap,
        role: user.role.role,
        asal_sekolah: user.asal_sekolah,
        refresh_token: refreshToken.refresh_token,
      }),
    );
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout' })
  async logout(@Req() req: Request, @Res() res: Response) {
    const headerAut = req.headers.authorization;
    const splitHeader = headerAut.split(' ');
    const refreshToken = splitHeader[1];

    if (!refreshToken) {
      throw new UnauthorizedException('Mohon login');
    }

    const decode = await this.jwtService.verifyAsync(refreshToken);

    const { jti } = decode;

    const jtiFind = this.refresTokenService.findJti(jti);

    if (!jtiFind) throw new NotFoundException('User tidak ditemukan');

    await this.authService.logout(jti);

    const tokens = await this.refresTokenService.findExpiredJtis();

    return res
      .status(200)
      .json(
        success(
          'Berhasil logout',
          JSON.parse(JSON.stringify(tokens, BigIntToJSON)),
        ),
      );
  }

  @Post('autologin')
  @ApiOperation({ summary: 'Autologin' })
  async autoLogin(@Req() req: Request, @Res() res: Response) {
    try {
      const headerAut = req.headers.authorization;
      const splitHeader = headerAut.split(' ');
      const refreshToken = splitHeader[1];
      // const data = req.cookies['data'];

      if (!refreshToken) {
        throw new UnauthorizedException('Mohon login');
      }

      const decode = await this.jwtService.verifyAsync(refreshToken);

      const { sub, username, email, role, jti } = decode;

      const user = await this.userService.findOneWithIncludeedField(
        {
          id: BigInt(sub),
        },
        {
          role: true,
        },
      );
      const userPayload = {
        id: sub,
        username,
        email,
        role,
      };

      const currentTime = Date.now();

      const jtiFind = await this.refresTokenService.findJti(jti);

      if (!jtiFind) throw new NotFoundException('User tidak ditemukan');

      const token = await this.authService.autoLogin(
        userPayload,
        jti,
        currentTime,
      );

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);

      return res.status(200).json(
        success('Berhasil login', {
          id: Number(user.id),
          nama_lengkap: user.nama_lengkap,
          role: user.role.role,
          asal_sekolah: user.asal_sekolah,
          refresh_token: token.refresh_token,
        }),
      );
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token has expired');
      } else if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid token');
      } else if (error.name === 'UnauthorizedException') {
        throw new UnauthorizedException(`${error.response.message}`);
      } else {
        throw new InternalServerErrorException('Token validation failed');
      }
    }
  }

  @Get('get-me')
  @ApiOperation({ summary: 'Get Me' })
  async getMe(@Req() req: Request, @Res() res: Response) {
    try {
      console.log('header', req.headers)
      const headerAut = req.headers.authorization;
      console.log(headerAut)
      const splitHeader = headerAut.split(' ');
      const refreshToken = splitHeader[1];
      console.log(refreshToken)
      // const data = req.cookies['data'];

      if (!refreshToken) {
        throw new UnauthorizedException('Mohon login');
      }

      const decode = await this.jwtService.verifyAsync(refreshToken);

      console.log(decode)

      const { sub, username, email, role, jti } = decode;

      const user = await this.userService.findOneWithIncludeedField(
        {
          id: BigInt(sub),
        },
        {
          role: true,
        },
      );
      const userPayload = {
        id: sub,
        username,
        email,
        role,
      };

      const jtiFind = await this.refresTokenService.findJti(jti);

      if (!jtiFind) throw new UnauthorizedException('Token tidak ditemukan');

      return res.status(200).json(
        success('Berhasil', {
          id: Number(user.id),
          nama_lengkap: user.nama_lengkap,
          role: user.role.role,
          asal_sekolah: user.asal_sekolah,
        }),
      );
    } catch (error) {
      console.log(error)
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token has expired');
      } else if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid token');
      } else if (error.name === 'UnauthorizedException') {
        throw new UnauthorizedException(`${error.response.message}`);
      } else {
        throw new InternalServerErrorException('Token validation failed');
      }
    }
  }
}
