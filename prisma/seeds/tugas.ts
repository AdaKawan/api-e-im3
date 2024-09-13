import { prisma } from "./PrismaModule";

export async function tugasSeed() {
    const tugas1KelasA = await prisma.tugas.upsert({
        where: { id: 1 },
        update: {},
        create: {
            materiId: 1,
            nama_tugas: "Tugas 1 - Materi A Pelajaran A Kelas 1A",
            deadline: new Date("2024-08-30T23:59:59.999Z"),
            creatorId: 2,
            isi_tugas: [
                {
                    id: 1,
                    title: "Apa ibu kota dari Jepang?",
                    content: "Apa ibu kota dari Jepang?",
                    answer: "Tokyo",
                    points: 5
                },
                {
                    id: 2,
                    title: "Apa warna bendera Indonesia?",
                    content: "Apa warna bendera Indonesia?",
                    type: "multiple-choice",
                    options: [
                        { text: "Merah dan Putih", isCorrect: true },
                        { text: "Biru dan Putih", isCorrect: false },
                        { text: "Hijau dan Putih", isCorrect: false },
                        { text: "Merah dan Biru", isCorrect: false }
                    ],
                    points: 10
                }
            ]
        }
    });

    const tugas2KelasA = await prisma.tugas.upsert({
        where: { id: 2 },
        update: {},
        create: {
            materiId: 2,
            nama_tugas: "Tugas 2 - Materi B Pelajaran A Kelas 1A",
            deadline: new Date("2024-08-30T23:59:59.999Z"),
            creatorId: 2,
            isi_tugas: [
                {
                    id: 3,
                    title: "Apa nama planet terbesar di tata surya kita?",
                    content: "Apa nama planet terbesar di tata surya kita?",
                    answer: "Jupiter",
                    points: 5
                },
                {
                    id: 4,
                    title: "Siapa penemu telepon?",
                    content: "Siapa penemu telepon?",
                    type: "multiple-choice",
                    options: [
                        { text: "Thomas Edison", isCorrect: false },
                        { text: "Alexander Graham Bell", isCorrect: true },
                        { text: "Nikola Tesla", isCorrect: false },
                        { text: "Albert Einstein", isCorrect: false }
                    ],
                    points: 10
                }
            ]
        }
    });

    const tugas3KelasA = await prisma.tugas.upsert({
        where: { id: 3 },
        update: {},
        create: {
            materiId: 3,
            nama_tugas: "Tugas 3 - Materi A Pelajaran B Kelas 1A",
            deadline: new Date("2024-08-30T23:59:59.999Z"),
            creatorId: 2,
            isi_tugas: [
                {
                    id: 5,
                    title: "Apa simbol kimia untuk air?",
                    content: "Apa simbol kimia untuk air?",
                    answer: "H2O",
                    points: 5
                },
                {
                    id: 6,
                    title: "Apa ibu kota dari Australia?",
                    content: "Apa ibu kota dari Australia?",
                    type: "multiple-choice",
                    options: [
                        { text: "Sydney", isCorrect: false },
                        { text: "Melbourne", isCorrect: false },
                        { text: "Canberra", isCorrect: true },
                        { text: "Brisbane", isCorrect: false }
                    ],
                    points: 10
                }
            ]
        }
    });

    const tugas4KelasA = await prisma.tugas.upsert({
        where: { id: 4 },
        update: {},
        create: {
            materiId: 4,
            nama_tugas: "Tugas 4 - Materi B Pelajaran B Kelas 1A",
            deadline: new Date("2024-08-30T23:59:59.999Z"),
            creatorId: 2,
            isi_tugas: [
                {
                    id: 7,
                    title: "Siapa penulis novel 'Harry Potter'?",
                    content: "Siapa penulis novel 'Harry Potter'?",
                    answer: "J.K. Rowling",
                    points: 5
                },
                {
                    id: 8,
                    title: "Apa nama unsur kimia dengan simbol 'O'?",
                    content: "Apa nama unsur kimia dengan simbol 'O'?",
                    type: "multiple-choice",
                    options: [
                        { text: "Osmium", isCorrect: false },
                        { text: "Oxygen", isCorrect: true },
                        { text: "Gold", isCorrect: false },
                        { text: "Silver", isCorrect: false }
                    ],
                    points: 10
                }
            ]
        }
    });

    const tugas1KelasB = await prisma.tugas.upsert({
        where: { id: 5 },
        update: {},
        create: {
            materiId: 5,
            nama_tugas: "Tugas 1 - Materi A Pelajaran A Kelas 1B",
            deadline: new Date("2024-08-30T23:59:59.999Z"),
            creatorId: 3,
            isi_tugas: [
                {
                    id: 9,
                    title: "Apa ibu kota dari Jepang?",
                    content: "Apa ibu kota dari Jepang?",
                    answer: "Tokyo",
                    points: 5
                },
                {
                    id: 10,
                    title: "Siapa yang menulis 'Romeo and Juliet'?",
                    content: "Siapa yang menulis 'Romeo and Juliet'?",
                    type: "multiple-choice",
                    options: [
                        { text: "Charles Dickens", isCorrect: false },
                        { text: "William Shakespeare", isCorrect: true },
                        { text: "Mark Twain", isCorrect: false },
                        { text: "Jane Austen", isCorrect: false }
                    ],
                    points: 10
                }
            ]
        }
    });

    const tugas2KelasB = await prisma.tugas.upsert({
        where: { id: 6 },
        update: {},
        create: {
            materiId: 6,
            nama_tugas: "Tugas 2 - Materi B Pelajaran A Kelas 1B",
            deadline: new Date("2024-08-30T23:59:59.999Z"),
            creatorId: 3,
            isi_tugas: [
                {
                    id: 11,
                    title: "Apa nama planet terbesar di tata surya kita?",
                    content: "Apa nama planet terbesar di tata surya kita?",
                    answer: "Jupiter",
                    points: 5
                },
                {
                    id: 12,
                    title: "Siapa presiden pertama Indonesia?",
                    content: "Siapa presiden pertama Indonesia?",
                    type: "multiple-choice",
                    options: [
                        { text: "Soekarno", isCorrect: true },
                        { text: "Soeharto", isCorrect: false },
                        { text: "Habibie", isCorrect: false },
                        { text: "Gus Dur", isCorrect: false }
                    ],
                    points: 10
                }
            ]
        }
    });

    const tugas3KelasB = await prisma.tugas.upsert({
        where: { id: 7 },
        update: {},
        create: {
            materiId: 7,
            nama_tugas: "Tugas 3 - Materi A Pelajaran B Kelas 1B",
            deadline: new Date("2024-08-30T23:59:59.999Z"),
            creatorId: 3,
            isi_tugas: [
                {
                    id: 13,
                    title: "Apa simbol kimia untuk air?",
                    content: "Apa simbol kimia untuk air?",
                    answer: "H2O",
                    points: 5
                },
                {
                    id: 14,
                    title: "Apa warna bendera Indonesia?",
                    content: "Apa warna bendera Indonesia?",
                    type: "multiple-choice",
                    options: [
                        { text: "Merah dan Putih", isCorrect: true },
                        { text: "Biru dan Putih", isCorrect: false },
                        { text: "Hijau dan Putih", isCorrect: false },
                        { text: "Merah dan Biru", isCorrect: false }
                    ],
                    points: 10
                }
            ]
        }
    });

    const tugas4KelasB = await prisma.tugas.upsert({
        where: { id: 8 },
        update: {},
        create: {
            materiId: 8,
            nama_tugas: "Tugas 4 - Materi B Pelajaran B Kelas 1B",
            deadline: new Date("2024-08-30T23:59:59.999Z"),
            creatorId: 3,
            isi_tugas: [
                {
                    id: 15,
                    title: "Siapa penulis novel 'Harry Potter'?",
                    content: "Siapa penulis novel 'Harry Potter'?",
                    answer: "J.K. Rowling",
                    points: 5
                },
                {
                    id: 16,
                    title: "Apa nama unsur kimia dengan simbol 'O'?",
                    content: "Apa nama unsur kimia dengan simbol 'O'?",
                    type: "multiple-choice",
                    options: [
                        { text: "Osmium", isCorrect: false },
                        { text: "Oxygen", isCorrect: true },
                        { text: "Gold", isCorrect: false },
                        { text: "Silver", isCorrect: false }
                    ],
                    points: 10
                }
            ]
        }
    });

    console.log('Seeding completed for Tugas!')
}
