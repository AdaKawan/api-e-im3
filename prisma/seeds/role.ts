import { prisma } from "./PrismaModule"

export async function roleSeed() {
    const roleAdmin = await prisma.role.upsert({
        where: { id: 1 },
        update: {},
        create: {
            role: 'admin'
        }
    })

    const roleGuru = await prisma.role.upsert({
        where: { id: 2 },
        update: {},
        create: {
            role: 'guru'
        }
    })

    const roleSiswa = await prisma.role.upsert({
        where: { id: 3 },
        update: {},
        create: {
            role: 'siswa'
        }
    })

    console.log('Seeding completed for Role!')
}