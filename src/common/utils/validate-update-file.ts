import { BadRequestException } from '@nestjs/common';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { put, del } from '@vercel/blob';

export const validateAndUpdateFile = async (
  file_url: string,
  routeFolder: string,
  file: Express.Multer.File,
) => {
  if (!file) throw new BadRequestException('File wajib diupload');

  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExtensions = ['.pdf', '.docx', '.doc'];

  if (!allowedExtensions.includes(ext)) {
    throw new BadRequestException(
      `File dengan ekstensi ${ext} tidak diizinkan.`,
    );
  }

  await del(file_url, { token: process.env.BLOB_READ_WRITE_TOKEN });

  const uniqueSuffix = uuidv4();
  const newFileName = `${uniqueSuffix}${ext}`;
  const folder = ext === '.pdf' ? 'pdf' : 'doc';

  const { url } = await put(
    `${routeFolder}/${folder}/${newFileName}`,
    file.buffer,
    { access: 'public', token: process.env.BLOB_READ_WRITE_TOKEN },
  );
  // const uploadPathPdf = path.join(__dirname, '..', '..', '..', 'public', '${routeFolder}', '${folder}', newFileName);
  // fs.writeFileSync(uploadPathPdf, file.buffer);

  return { fileName: newFileName, fileUrl: url };
};
