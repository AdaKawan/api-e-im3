import { BadRequestException } from '@nestjs/common';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from "fs"

export const validateAndUploadFile = async (
  routeFolder: string,
  file: Express.Multer.File,
) => {
  if (!file) throw new BadRequestException('File wajib diupload');

  const fileDocumentExtensions = ['.pdf', '.docx', '.doc', '.mp4'];
  const videoExtensions = [
    ".mp4",
    ".mov",
    ".avi",
    ".wmv",
    ".flv",
    ".f4v",
    ".mkv",
    ".webm",
    ".avchd",
    ".mpeg",
    ".3gp",
    ".3g2",
    ".ogv",
    ".m4v",
    ".prores",
    ".dnxhr",
    ".dnxhd"
  ];
  const imageExtensions = ['.jpg', '.png']

  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExtensions = [
    ...fileDocumentExtensions,
    ...videoExtensions,
    ...imageExtensions
  ];

  if (!allowedExtensions.includes(ext)) {
    throw new BadRequestException(
      `File dengan ekstensi ${ext} tidak diizinkan.`,
    );
  }

  const uniqueSuffix = uuidv4();
  const newFileName = `${uniqueSuffix}${ext}`;
  const folder = ext === '.pdf' ? 'pdf' : 'doc';

  const uploadPathPdf = path.join(__dirname, '..', '..', '..', 'public', '${routeFolder}', '${folder}', newFileName);
  fs.writeFileSync(uploadPathPdf, file.buffer);

  return { fileName: newFileName, fileUrl: url };
};
