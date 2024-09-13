import { prisma } from "./PrismaModule";

export async function nilaiSeed() {
    const nilai1 = await prisma.nilai.upsert({
        where: { id: 1 },
        update: {},
        create: {
            pengumpulanId: 1,
            nilai: 85,
        }
    });

    const nilai2 = await prisma.nilai.upsert({
        where: { id: 2 },
        update: {},
        create: {
            pengumpulanId: 2,
            nilai: 90,
        }
    });

    const nilai3 = await prisma.nilai.upsert({
        where: { id: 3 },
        update: {},
        create: {
            pengumpulanId: 3,
            nilai: 88,
        }
    });

    const nilai4 = await prisma.nilai.upsert({
        where: { id: 4 },
        update: {},
        create: {
            pengumpulanId: 4,
            nilai: 92,
        }
    });

    console.log('Seeding completed for Nilai!')
}
