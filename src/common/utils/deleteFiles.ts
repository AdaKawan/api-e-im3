import * as fs from 'fs';
import * as path from 'path';
import { BadRequestException } from '@nestjs/common';

interface FileData {
  fileUrl: string;
  fileName: string;
  originalName: string;
}

export const deleteManyFiles = async (
  oldFiles: FileData[],
  routeFolder: string,
) => {
  if (!oldFiles || oldFiles.length === 0) {
    throw new BadRequestException(
      'Tidak ada file yang ditemukan untuk dihapus.',
    );
  }

  for (const file of oldFiles) {
    const filePathParts = file.fileUrl.split('/');
    const folder = filePathParts[filePathParts.length - 2];
    const fileName = file.fileName;

    const filePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'public',
      routeFolder,
      folder,
      fileName,
    );

    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.error(
          `Gagal menghapus file: ${filePath}. Error: ${err.message}`,
        );
      }
    } else {
      console.warn(`File tidak ditemukan: ${filePath}`);
    }
  }
};
