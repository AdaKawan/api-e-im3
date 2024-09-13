import { prisma } from "./PrismaModule";

export async function kelasSeed() {
    const kelas1A = await prisma.kelas.upsert({
        where: { id: 1 },
        update: {},
        create: {
            nama_kelas: '1A'
        }
    })

    const kelas1B = await prisma.kelas.upsert({
        where: { id: 2 },
        update: {},
        create: {
            nama_kelas: '1B'
        }
    })

    console.log('Seeding completed for Kelas!')
}