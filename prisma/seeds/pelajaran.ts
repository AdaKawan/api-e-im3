import { prisma } from "./PrismaModule"

export async function pelajaranSeed() {
    const pelajaranAKelas1A = await prisma.pelajaran.upsert({
        where: { id: 1 },
        update: {},
        create: {
            nama_pelajaran: "Pelajaran A SMP Negeri 2 Barat Kelas 1",
            jenjang_kelas: 1,
            asal_sekolah: 'smp negeri 2 barat',
            creatorId: 2
        }
    })

    const pelajaranBKelas1A = await prisma.pelajaran.upsert({
        where: { id: 2 },
        update: {},
        create: {
            nama_pelajaran: "Pelajaran B Kelas 2",
            jenjang_kelas: 2,
            asal_sekolah: 'smp negeri 2 barat',
            creatorId: 2
        }
    })

    const pelajaranAKelas1B = await prisma.pelajaran.upsert({
        where: { id: 3 },
        update: {},
        create: {
            nama_pelajaran: "Pelajaran SMP Negeri 1 Lembeyan Kelas 1",
            jenjang_kelas: 1,
            asal_sekolah: 'smp negeri 1 lembeyan',
            creatorId: 3
        }
    })

    const pelajaranBKelas1B = await prisma.pelajaran.upsert({
        where: { id: 4 },
        update: {},
        create: {
            nama_pelajaran: "Pelajaran SMP Negeri 1 Lembeyan Kelas 2",
            jenjang_kelas: 2,
            asal_sekolah: 'smp negeri 1 lembeyan',
            creatorId: 3
        }
    })

    console.log('Seeding completed for Pelajaran!')
}