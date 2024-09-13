import { prisma } from "./PrismaModule"

export async function UserPadaKelasSeed() {
    const guruPadaKelas1A = await prisma.userOnKelas.upsert({
        where: { userId_kelasId: { userId: 2, kelasId: 1 } },
        update: {},
        create: {
            userId: 2,
            kelasId: 1
        }
    })

    const guruPadaKelas1B = await prisma.userOnKelas.upsert({
        where: { userId_kelasId: { userId: 3, kelasId: 2 } },
        update: {},
        create: {
            userId: 3,
            kelasId: 2
        }
    })

    const siswaPadaKelas1A = await prisma.userOnKelas.upsert({
        where: { userId_kelasId: { userId: 4, kelasId: 1 } },
        update: {},
        create: {
            userId: 4,
            kelasId: 1
        }
    })

    const siswaPadaKelas1B = await prisma.userOnKelas.upsert({
        where: { userId_kelasId: { userId: 5, kelasId: 1 } },
        update: {},
        create: {
            userId: 5,
            kelasId: 2
        }
    })

    console.log('Seeding completed for UserPadaKelas!')
}