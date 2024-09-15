import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as multer from 'multer';
import * as path from 'path';

@Injectable()
export class FileUploadMiddleware implements NestMiddleware {
  private readonly upload = multer({
    fileFilter: (req, file, callback) => {
      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf']; // Tambahkan ekstensi yang diizinkan
      const extname = path.extname(file.originalname).toLowerCase();
      if (!allowedExtensions.includes(extname)) {
        return callback(new BadRequestException('Invalid file type'));
      }
      callback(null, true);
    },
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB batas ukuran file
    },
  });

  use(req: Request, res: Response, next: NextFunction) {
    this.upload.single('file')(req, res, (err) => {
      if (err) {
        if (
          err instanceof multer.MulterError &&
          err.code === 'LIMIT_FILE_SIZE'
        ) {
          return res.status(400).json({
            statusCode: 400,
            message: 'File is too large. Maximum size is 5MB.',
          });
        }
        if (err.message === 'Unexpected end of form') {
          return res.status(400).json({
            statusCode: 400,
            message: 'Incomplete form data. Please try again.',
          });
        }
        return res.status(400).json({
          statusCode: 400,
          message: err.message || 'An error occurred while uploading the file.',
        });
      }
      next();
    });
  }
}
