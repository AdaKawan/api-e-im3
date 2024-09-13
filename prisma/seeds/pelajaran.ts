import { prisma } from "./PrismaModule"

export async function pelajaranSeed() {
    const pelajaranAKelas1A = await prisma.pelajaran.upsert({
        where: { id: 1 },
        update: {},
        create: {
            nama_pelajaran: "Pelajaran A Kelas 1A",
            kelasId: 1,
            creatorId: 2
        }
    })

    const pelajaranBKelas1A = await prisma.pelajaran.upsert({
        where: { id: 2 },
        update: {},
        create: {
            nama_pelajaran: "Pelajaran B Kelas 1A",
            kelasId: 1,
            creatorId: 2
        }
    })

    const pelajaranAKelas1B = await prisma.pelajaran.upsert({
        where: { id: 3 },
        update: {},
        create: {
            nama_pelajaran: "Pelajaran A Kelas 1B",
            kelasId: 2,
            creatorId: 3
        }
    })

    const pelajaranBKelas1B = await prisma.pelajaran.upsert({
        where: { id: 4 },
        update: {},
        create: {
            nama_pelajaran: "Pelajaran B Kelas 1B",
            kelasId: 2,
            creatorId: 3
        }
    })

    console.log('Seeding completed for Pelajaran!')
}