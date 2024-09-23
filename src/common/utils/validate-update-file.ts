import { BadRequestException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import FileData from '../types/FileData';
import { ConfigService } from '@nestjs/config';

export const validateAndUpdateFiles = async (
  oldFiles: FileData[],
  routeFolder: string,
  newFiles: Express.Multer.File[],
  configService: ConfigService,
) => {
  if (!newFiles || newFiles.length === 0) {
    throw new BadRequestException('File wajib diupload');
  }

  const fileDocumentExtensions = ['.pdf', '.docx', '.doc', '.mp4'];
  const videoExtensions = [
    '.mp4',
    '.mov',
    '.avi',
    '.wmv',
    '.flv',
    '.f4v',
    '.mkv',
    '.webm',
    '.avchd',
    '.mpeg',
    '.3gp',
    '.3g2',
    '.ogv',
    '.m4v',
    '.prores',
    '.dnxhr',
    '.dnxhd',
  ];
  const imageExtensions = ['.jpg', '.png'];

  const allowedExtensions = [
    ...fileDocumentExtensions,
    ...videoExtensions,
    ...imageExtensions,
  ];

  if (oldFiles && oldFiles.length > 0) {
    for (const oldFile of oldFiles) {
      const oldFilePath = path.join(
        __dirname,
        '..',
        '..',
        '..',
        'public',
        oldFile.fileUrl.replace('http://localhost:6948/public/', ''),
      );
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }
  }

  const uploadedFiles = [];

  for (const newFile of newFiles) {
    const ext = path.extname(newFile.originalname).toLowerCase();

    if (!allowedExtensions.includes(ext)) {
      throw new BadRequestException(
        `File dengan ekstensi ${ext} tidak diizinkan.`,
      );
    }

    const uniqueSuffix = uuidv4();
    const newFileName = `${uniqueSuffix}${ext}`;

    let folder = '';
    if (fileDocumentExtensions.includes(ext)) {
      folder = 'documents';
    } else if (videoExtensions.includes(ext)) {
      folder = 'videos';
    } else if (imageExtensions.includes(ext)) {
      folder = 'images';
    }

    const uploadPath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'public',
      routeFolder,
      folder,
    );

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const newFilePath = path.join(uploadPath, newFileName);
    fs.writeFileSync(newFilePath, newFile.buffer);

    const baseUrl = configService.get<string>('baseUrl');
    const fileUrl = `${baseUrl}/public/${routeFolder}/${folder}/${newFileName}`;

    uploadedFiles.push({
      fileName: newFileName,
      fileUrl,
      originalName: newFile.originalname,
    });
  }

  return uploadedFiles;
};
