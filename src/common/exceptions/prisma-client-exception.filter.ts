import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = exception.message;

    switch (exception.code) {
      case 'P2000':
        status = HttpStatus.BAD_REQUEST;
        message = 'Nilai terlalu panjang untuk kolom ini';
        break;
      case 'P2001':
        status = HttpStatus.NOT_FOUND;
        message = 'Data tidak ditemukan';
        break;
      case 'P2002':
        status = HttpStatus.CONFLICT;
        message = 'Data harus unik, tapi ada yang sama';
        break;
      case 'P2003':
        status = HttpStatus.BAD_REQUEST;
        message = 'Ada masalah dengan kunci asing';
        break;
      case 'P2004':
        status = HttpStatus.BAD_REQUEST;
        message = 'Ada masalah dengan batasan di database';
        break;
      case 'P2005':
        status = HttpStatus.BAD_REQUEST;
        message = 'Nilai tidak valid untuk kolom ini';
        break;
      case 'P2006':
        status = HttpStatus.BAD_REQUEST;
        message = 'Nilai tidak valid untuk model ini';
        break;
      case 'P2007':
        status = HttpStatus.BAD_REQUEST;
        message = 'Kesalahan validasi data';
        break;
      case 'P2008':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Gagal memproses kueri';
        break;
      case 'P2009':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Gagal memvalidasi kueri';
        break;
      case 'P2010':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Gagal menjalankan kueri mentah';
        break;
      case 'P2011':
        status = HttpStatus.BAD_REQUEST;
        message = 'Kolom ini tidak boleh kosong';
        break;
      case 'P2012':
        status = HttpStatus.BAD_REQUEST;
        message = 'Ada nilai yang hilang';
        break;
      case 'P2013':
        status = HttpStatus.BAD_REQUEST;
        message = 'Argumen yang diperlukan untuk kueri hilang';
        break;
      case 'P2014':
        status = HttpStatus.BAD_REQUEST;
        message = 'Pelanggaran hubungan data';
        break;
      case 'P2015':
        status = HttpStatus.NOT_FOUND;
        message = 'Data terkait tidak ditemukan';
        break;
      case 'P2016':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Kesalahan interpretasi kueri';
        break;
      case 'P2017':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Data untuk hubungan tidak terhubung';
        break;
      case 'P2018':
        status = HttpStatus.NOT_FOUND;
        message = 'Data terkait yang diperlukan tidak ditemukan';
        break;
      case 'P2019':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Kesalahan input pada database';
        break;
      case 'P2020':
        status = HttpStatus.BAD_REQUEST;
        message = 'Nilai di luar jangkauan untuk tipe ini';
        break;
      case 'P2021':
        status = HttpStatus.NOT_FOUND;
        message = 'Tabel tidak ada';
        break;
      case 'P2022':
        status = HttpStatus.NOT_FOUND;
        message = 'Kolom tidak ada';
        break;
      case 'P2023':
        status = HttpStatus.BAD_REQUEST;
        message = 'Data kolom tidak konsisten';
        break;
      case 'P2024':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Waktu habis menunggu mesin kueri untuk memulai';
        break;
      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        message = 'Operasi gagal karena data yang diperlukan tidak ditemukan';
        break;
      case 'P2026':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Fitur yang digunakan kueri tidak didukung oleh penyedia database saat ini';
        break;
      case 'P2027':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Terjadi beberapa kesalahan pada database selama eksekusi kueri';
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = `Kesalahan database tidak dikenal: ${exception.message}`;
        break;
    }

    response.status(status).json({
      status: 'failed',
      message,
    });
  }
}
