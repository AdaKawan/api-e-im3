/*
  Warnings:

  - You are about to drop the column `kelasId` on the `Pelajaran` table. All the data in the column will be lost.
  - You are about to drop the `Kelas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserOnKelas` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `asal_sekolah` to the `Pelajaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jenjang_kelas` to the `Pelajaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActive` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pelajaran" DROP CONSTRAINT "Pelajaran_kelasId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnKelas" DROP CONSTRAINT "UserOnKelas_kelasId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnKelas" DROP CONSTRAINT "UserOnKelas_userId_fkey";

-- AlterTable
ALTER TABLE "Pelajaran" DROP COLUMN "kelasId",
ADD COLUMN     "asal_sekolah" TEXT NOT NULL,
ADD COLUMN     "jenjang_kelas" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "asal_sekolah" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "Kelas";

-- DropTable
DROP TABLE "UserOnKelas";
