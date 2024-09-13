import { prisma } from "./PrismaModule"

export async function IsUserAccessMateriSeed() {
    const aksesMateriSiswaKelasA = await prisma.userOnMateri.createMany({
        data: [
            {
                userId: 1,
                materiId: 1,
            },
            {
                userId: 1,
                materiId: 2,
            },
            {
                userId: 1,
                materiId: 3,
            },
            {
                userId: 1,
                materiId: 4,
            },
        ]
    })

    const aksesMateriSiswaKelasB = await prisma.userOnMateri.createMany({
        data: [
            {
                userId: 2,
                materiId: 5,
            },
            {
                userId: 2,
                materiId: 6,
            },
            {
                userId: 2,
                materiId: 7,
            },
            {
                userId: 2,
                materiId: 8,
            },
        ]
    })

    console.log('Seeding completed for UserOnMateri!')
}