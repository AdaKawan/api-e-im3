-- CreateTable
CREATE TABLE "UserOnKelas" (
    "userId" BIGINT NOT NULL,
    "kelasId" BIGINT NOT NULL
);

-- CreateTable
CREATE TABLE "UserOnMateri" (
    "userId" BIGINT NOT NULL,
    "materiId" BIGINT NOT NULL
);

-- CreateTable
CREATE TABLE "Kelas" (
    "id" BIGSERIAL NOT NULL,
    "nama_kelas" TEXT NOT NULL,

    CONSTRAINT "Kelas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Materi" (
    "id" BIGSERIAL NOT NULL,
    "pelajaranId" BIGINT NOT NULL,
    "creatorId" BIGINT NOT NULL,
    "nama_materi" TEXT NOT NULL,
    "isi_materi" TEXT NOT NULL,
    "file_url" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Materi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nilai" (
    "id" BIGSERIAL NOT NULL,
    "pengumpulanId" BIGINT NOT NULL,
    "nilai" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Nilai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pelajaran" (
    "id" BIGSERIAL NOT NULL,
    "kelasId" BIGINT NOT NULL,
    "creatorId" BIGINT NOT NULL,
    "nama_pelajaran" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pelajaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pengumpulan" (
    "id" BIGSERIAL NOT NULL,
    "tugasId" BIGINT NOT NULL,
    "pengumpulId" BIGINT NOT NULL,
    "isi_pengumpulan" JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pengumpulan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "jti" TEXT NOT NULL,
    "expiredDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" BIGSERIAL NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tugas" (
    "id" BIGSERIAL NOT NULL,
    "materiId" BIGINT NOT NULL,
    "creatorId" BIGINT NOT NULL,
    "nama_tugas" TEXT NOT NULL,
    "isi_tugas" JSONB[],
    "deadline" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tugas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "nama_lengkap" TEXT NOT NULL,
    "email" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserOnKelas_userId_kelasId_key" ON "UserOnKelas"("userId", "kelasId");

-- CreateIndex
CREATE UNIQUE INDEX "UserOnMateri_userId_materiId_key" ON "UserOnMateri"("userId", "materiId");

-- CreateIndex
CREATE UNIQUE INDEX "Kelas_nama_kelas_key" ON "Kelas"("nama_kelas");

-- CreateIndex
CREATE INDEX "Kelas_nama_kelas_idx" ON "Kelas"("nama_kelas");

-- CreateIndex
CREATE UNIQUE INDEX "Nilai_pengumpulanId_key" ON "Nilai"("pengumpulanId");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_jti_key" ON "RefreshToken"("jti");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_nama_lengkap_email_username_idx" ON "User"("nama_lengkap", "email", "username");

-- AddForeignKey
ALTER TABLE "UserOnKelas" ADD CONSTRAINT "UserOnKelas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnKelas" ADD CONSTRAINT "UserOnKelas_kelasId_fkey" FOREIGN KEY ("kelasId") REFERENCES "Kelas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnMateri" ADD CONSTRAINT "UserOnMateri_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnMateri" ADD CONSTRAINT "UserOnMateri_materiId_fkey" FOREIGN KEY ("materiId") REFERENCES "Materi"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Materi" ADD CONSTRAINT "Materi_pelajaranId_fkey" FOREIGN KEY ("pelajaranId") REFERENCES "Pelajaran"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Materi" ADD CONSTRAINT "Materi_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nilai" ADD CONSTRAINT "Nilai_pengumpulanId_fkey" FOREIGN KEY ("pengumpulanId") REFERENCES "Pengumpulan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pelajaran" ADD CONSTRAINT "Pelajaran_kelasId_fkey" FOREIGN KEY ("kelasId") REFERENCES "Kelas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pelajaran" ADD CONSTRAINT "Pelajaran_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pengumpulan" ADD CONSTRAINT "Pengumpulan_tugasId_fkey" FOREIGN KEY ("tugasId") REFERENCES "Tugas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pengumpulan" ADD CONSTRAINT "Pengumpulan_pengumpulId_fkey" FOREIGN KEY ("pengumpulId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tugas" ADD CONSTRAINT "Tugas_materiId_fkey" FOREIGN KEY ("materiId") REFERENCES "Materi"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tugas" ADD CONSTRAINT "Tugas_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
