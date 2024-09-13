import { Role, User } from '@prisma/client';
import { Response } from 'express';
import { LoginDto } from 'src/auth/dto/login.dto';

export const rememberMeLogic = (
  user: User & { role: Role },
  userId: number,
  loginDto: LoginDto,
  res: Response,
  refreshToken: { refresh_token: string },
) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);
  if (loginDto.rememberMe) {
    res.cookie('refreshToken', refreshToken.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain: 'friendly-guide-9grrxx5pg7ghx6x7-5090.app.github.dev',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      expires: expirationDate,
    });

    res.cookie(
      'data',
      {
        id: userId,
        nama_lengkap: user.nama_lengkap,
        role: user.role.role,
      },
      {
        secure: true,
        sameSite: 'none',
        domain: 'friendly-guide-9grrxx5pg7ghx6x7-5090.app.github.dev',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        expires: expirationDate,
      },
    );
  } else {
    res.cookie('refreshToken', refreshToken.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain: 'friendly-guide-9grrxx5pg7ghx6x7-5090.app.github.dev',
      maxAge: 0,
    });

    res.cookie(
      'data',
      {
        id: userId,
        nama_lengkap: user.nama_lengkap,
        role: user.role.role,
      },
      {
        secure: true,
        sameSite: 'none',
        domain: 'friendly-guide-9grrxx5pg7ghx6x7-5090.app.github.dev',
        maxAge: 0,
      },
    );
  }
};
