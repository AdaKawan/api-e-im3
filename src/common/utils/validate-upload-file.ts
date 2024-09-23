import { BadRequestException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

export const validateAndUploadFiles = async (
  routeFolder: string,
  files: Express.Multer.File[],
  configService: ConfigService,
) => {
  const fileDocumentExtensions = ['.pdf', '.docx', '.doc'];
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

  const uploadedFiles = [];

  for (const file of files) {
    const ext = path.extname(file.originalname).toLowerCase();

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
      `${routeFolder}`,
      `${folder}`,
    );

    // Ensure the directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const filePath = path.join(uploadPath, newFileName);
    fs.writeFileSync(filePath, file.buffer);

    const baseUrl = configService.get<string>('baseUrl');
    const fileUrl = `${baseUrl}/public/${routeFolder}/${folder}/${newFileName}`;
    uploadedFiles.push({
      fileName: newFileName,
      fileUrl,
      originalName: file.originalname,
    });
  }

  return uploadedFiles;
};
