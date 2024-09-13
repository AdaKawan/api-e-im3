import { prisma } from "./PrismaModule";

export async function pengumpulanSeed() {
    const pengumpulan1 = await prisma.pengumpulan.upsert({
        where: { id: 1 },
        update: {},
        create: {
            tugasId: 1,
            pengumpulId: 4,
            isi_pengumpulan: [
                { id: 1, answer: "Tokyo" },
                { id: 2, answer: "Merah dan Putih" }
            ]
        }
    });

    const pengumpulan2 = await prisma.pengumpulan.upsert({
        where: { id: 2 },
        update: {},
        create: {
            tugasId: 2,
            pengumpulId: 4,
            isi_pengumpulan: [
                { id: 3, answer: "Jupiter" },
                { id: 4, answer: "Alexander Graham Bell" }
            ]
        }
    });

    const pengumpulan3 = await prisma.pengumpulan.upsert({
        where: { id: 3 },
        update: {},
        create: {
            tugasId: 3,
            pengumpulId: 4,
            isi_pengumpulan: [
                { id: 5, answer: "H2O" },
                { id: 6, answer: "Canberra" }
            ]
        }
    });

    const pengumpulan4 = await prisma.pengumpulan.upsert({
        where: { id: 4 },
        update: {},
        create: {
            tugasId: 4,
            pengumpulId: 4,
            isi_pengumpulan: [
                { id: 7, answer: "J.K. Rowling" },
                { id: 8, answer: "Oxygen" }
            ]
        }
    });

    const pengumpulan5 = await prisma.pengumpulan.upsert({
        where: { id: 5 },
        update: {},
        create: {
            tugasId: 5,
            pengumpulId: 5,
            isi_pengumpulan: [
                { id: 9, answer: "Tokyo" },
                { id: 10, answer: "William Shakespeare" }
            ]
        }
    });

    const pengumpulan6 = await prisma.pengumpulan.upsert({
        where: { id: 6 },
        update: {},
        create: {
            tugasId: 6,
            pengumpulId: 5,
            isi_pengumpulan: [
                { id: 11, answer: "Jupiter" },
                { id: 12, answer: "Soekarno" }
            ]
        }
    });

    const pengumpulan7 = await prisma.pengumpulan.upsert({
        where: { id: 7 },
        update: {},
        create: {
            tugasId: 7,
            pengumpulId: 5,
            isi_pengumpulan: [
                { id: 13, answer: "H2O" },
                { id: 14, answer: "Merah dan Putih" }
            ]
        }
    });

    const pengumpulan8 = await prisma.pengumpulan.upsert({
        where: { id: 8 },
        update: {},
        create: {
            tugasId: 8,
            pengumpulId: 5,
            isi_pengumpulan: [
                { id: 15, answer: "J.K. Rowling" },
                { id: 16, answer: "Oxygen" }
            ]
        }
    });

    console.log('Seeding completed for Pengumpulan!')
}
