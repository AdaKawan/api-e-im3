/*
  Warnings:

  - You are about to drop the column `file_url` on the `Materi` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Materi" DROP COLUMN "file_url",
ADD COLUMN     "files" JSONB[];
