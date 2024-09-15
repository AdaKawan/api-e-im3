import { prisma } from "./PrismaModule"

export async function materiSeed() {
    const materiAPelajaranAKelas1A = await prisma.materi.upsert({
        where: { id: 1 },
        update: {},
        create: {
            files: [
                {
                    "fileName": "3d0aace8-25cc-47ae-887b-8ebe06622e42.pdf",
                    "fileUrl": "http://localhost:6948/public/materi/documents/3d0aace8-25cc-47ae-887b-8ebe06622e42.pdf",
                    "originalName": "05-03-2020-09.54.01.pdf"
                },
                {
                    "fileName": "61f4442d-d592-41de-af3d-0a42e24082cd.mp4",
                    "fileUrl": "http://localhost:6948/public/materi/videos/61f4442d-d592-41de-af3d-0a42e24082cd.mp4",
                    "originalName": "720_30_4.04_Mar162020_01.mp4"
                },
                {
                    "fileName": "cea91c2e-1f10-4009-ad13-012bf19588a5.jpg",
                    "fileUrl": "http://localhost:6948/public/materi/images/cea91c2e-1f10-4009-ad13-012bf19588a5.jpg",
                    "originalName": "20200223_115237.jpg"
                }
            ],
            nama_materi: "Materi A Pelajaran A Kelas 1A",
            pelajaranId: 1,
            creatorId: 2,
            isi_materi: "<p>Konten untuk Materi A Pelajaran A Kelas 1A</p>"
        }
    })

    const materiBPelajaranAKelas1A = await prisma.materi.upsert({
        where: { id: 2 },
        update: {},
        create: {
            files: [
                {
                    "fileName": "3d0aace8-25cc-47ae-887b-8ebe06622e42.pdf",
                    "fileUrl": "http://localhost:6948/public/materi/documents/3d0aace8-25cc-47ae-887b-8ebe06622e42.pdf",
                    "originalName": "05-03-2020-09.54.01.pdf"
                },
                {
                    "fileName": "61f4442d-d592-41de-af3d-0a42e24082cd.mp4",
                    "fileUrl": "http://localhost:6948/public/materi/videos/61f4442d-d592-41de-af3d-0a42e24082cd.mp4",
                    "originalName": "720_30_4.04_Mar162020_01.mp4"
                },
                {
                    "fileName": "cea91c2e-1f10-4009-ad13-012bf19588a5.jpg",
                    "fileUrl": "http://localhost:6948/public/materi/images/cea91c2e-1f10-4009-ad13-012bf19588a5.jpg",
                    "originalName": "20200223_115237.jpg"
                }
            ],
            nama_materi: "Materi B Pelajaran A Kelas 1A",
            pelajaranId: 1,
            creatorId: 2,
            isi_materi: "<p>Konten untuk Materi B Pelajaran A Kelas 1A</p>"
        }
    })

    const materiAPelajaranBKelas1A = await prisma.materi.upsert({
        where: { id: 3 },
        update: {},
        create: {
            files: [
                {
                    "fileName": "3d0aace8-25cc-47ae-887b-8ebe06622e42.pdf",
                    "fileUrl": "http://localhost:6948/public/materi/documents/3d0aace8-25cc-47ae-887b-8ebe06622e42.pdf",
                    "originalName": "05-03-2020-09.54.01.pdf"
                },
                {
                    "fileName": "61f4442d-d592-41de-af3d-0a42e24082cd.mp4",
                    "fileUrl": "http://localhost:6948/public/materi/videos/61f4442d-d592-41de-af3d-0a42e24082cd.mp4",
                    "originalName": "720_30_4.04_Mar162020_01.mp4"
                },
                {
                    "fileName": "cea91c2e-1f10-4009-ad13-012bf19588a5.jpg",
                    "fileUrl": "http://localhost:6948/public/materi/images/cea91c2e-1f10-4009-ad13-012bf19588a5.jpg",
                    "originalName": "20200223_115237.jpg"
                }
            ],
            nama_materi: "Materi A Pelajaran B Kelas 1A",
            pelajaranId: 2,
            creatorId: 2,
            isi_materi: "<p>Konten untuk Materi A Pelajaran B Kelas 1A</p>"
        }
    })

    const materiBPelajaranBKelas1A = await prisma.materi.upsert({
        where: { id: 4 },
        update: {},
        create: {
            files: [
                {
                    "fileName": "3d0aace8-25cc-47ae-887b-8ebe06622e42.pdf",
                    "fileUrl": "http://localhost:6948/public/materi/documents/3d0aace8-25cc-47ae-887b-8ebe06622e42.pdf",
                    "originalName": "05-03-2020-09.54.01.pdf"
                },
                {
                    "fileName": "61f4442d-d592-41de-af3d-0a42e24082cd.mp4",
                    "fileUrl": "http://localhost:6948/public/materi/videos/61f4442d-d592-41de-af3d-0a42e24082cd.mp4",
                    "originalName": "720_30_4.04_Mar162020_01.mp4"
                },
                {
                    "fileName": "cea91c2e-1f10-4009-ad13-012bf19588a5.jpg",
                    "fileUrl": "http://localhost:6948/public/materi/images/cea91c2e-1f10-4009-ad13-012bf19588a5.jpg",
                    "originalName": "20200223_115237.jpg"
                }
            ],
            nama_materi: "Materi B Pelajaran B Kelas 1A",
            pelajaranId: 2,
            creatorId: 2,
            isi_materi: "<p>Konten untuk Materi B Pelajaran B Kelas 1A</p>"
        }
    })

    const materiAPelajaranAKelas1B = await prisma.materi.upsert({
        where: { id: 5 },
        update: {},
        create: {
            files: [
                {
                    "fileName": "3d0aace8-25cc-47ae-887b-8ebe06622e42.pdf",
                    "fileUrl": "http://localhost:6948/public/materi/documents/3d0aace8-25cc-47ae-887b-8ebe06622e42.pdf",
                    "originalName": "05-03-2020-09.54.01.pdf"
                },
                {
                    "fileName": "61f4442d-d592-41de-af3d-0a42e24082cd.mp4",
                    "fileUrl": "http://localhost:6948/public/materi/videos/61f4442d-d592-41de-af3d-0a42e24082cd.mp4",
                    "originalName": "720_30_4.04_Mar162020_01.mp4"
                },
                {
                    "fileName": "cea91c2e-1f10-4009-ad13-012bf19588a5.jpg",
                    "fileUrl": "http://localhost:6948/public/materi/images/cea91c2e-1f10-4009-ad13-012bf19588a5.jpg",
                    "originalName": "20200223_115237.jpg"
                }
            ],
            nama_materi: "Materi A Pelajaran A Kelas 1B",
            pelajaranId: 3,
            creatorId: 3,
            isi_materi: "<p>Konten untuk Materi A Pelajaran A Kelas 1B</p>"
        }
    })

    const materiBPelajaranAKelas1B = await prisma.materi.upsert({
        where: { id: 6 },
        update: {},
        create: {
            files: [
                {
                    "fileName": "3d0aace8-25cc-47ae-887b-8ebe06622e42.pdf",
                    "fileUrl": "http://localhost:6948/public/materi/documents/3d0aace8-25cc-47ae-887b-8ebe06622e42.pdf",
                    "originalName": "05-03-2020-09.54.01.pdf"
                },
                {
                    "fileName": "61f4442d-d592-41de-af3d-0a42e24082cd.mp4",
                    "fileUrl": "http://localhost:6948/public/materi/videos/61f4442d-d592-41de-af3d-0a42e24082cd.mp4",
                    "originalName": "720_30_4.04_Mar162020_01.mp4"
                },
                {
                    "fileName": "cea91c2e-1f10-4009-ad13-012bf19588a5.jpg",
                    "fileUrl": "http://localhost:6948/public/materi/images/cea91c2e-1f10-4009-ad13-012bf19588a5.jpg",
                    "originalName": "20200223_115237.jpg"
                }
            ],
            nama_materi: "Materi B Pelajaran A Kelas 1B",
            pelajaranId: 3,
            creatorId: 3,
            isi_materi: "<p>Konten untuk Materi B Pelajaran A Kelas 1B</p>"
        }
    })

    const materiAPelajaranBKelas1B = await prisma.materi.upsert({
        where: { id: 7 },
        update: {},
        create: {
            files: [
                {
                    "fileName": "3d0aace8-25cc-47ae-887b-8ebe06622e42.pdf",
                    "fileUrl": "http://localhost:6948/public/materi/documents/3d0aace8-25cc-47ae-887b-8ebe06622e42.pdf",
                    "originalName": "05-03-2020-09.54.01.pdf"
                },
                {
                    "fileName": "61f4442d-d592-41de-af3d-0a42e24082cd.mp4",
                    "fileUrl": "http://localhost:6948/public/materi/videos/61f4442d-d592-41de-af3d-0a42e24082cd.mp4",
                    "originalName": "720_30_4.04_Mar162020_01.mp4"
                },
                {
                    "fileName": "cea91c2e-1f10-4009-ad13-012bf19588a5.jpg",
                    "fileUrl": "http://localhost:6948/public/materi/images/cea91c2e-1f10-4009-ad13-012bf19588a5.jpg",
                    "originalName": "20200223_115237.jpg"
                }
            ],
            nama_materi: "Materi A Pelajaran B Kelas 1B",
            pelajaranId: 4,
            creatorId: 3,
            isi_materi: "<p>Konten untuk Materi A Pelajaran B Kelas 1B</p>"
        }
    })

    const materiBPelajaranBKelas1B = await prisma.materi.upsert({
        where: { id: 8 },
        update: {},
        create: {
            files: [
                {
                    "fileName": "3d0aace8-25cc-47ae-887b-8ebe06622e42.pdf",
                    "fileUrl": "http://localhost:6948/public/materi/documents/3d0aace8-25cc-47ae-887b-8ebe06622e42.pdf",
                    "originalName": "05-03-2020-09.54.01.pdf"
                },
                {
                    "fileName": "61f4442d-d592-41de-af3d-0a42e24082cd.mp4",
                    "fileUrl": "http://localhost:6948/public/materi/videos/61f4442d-d592-41de-af3d-0a42e24082cd.mp4",
                    "originalName": "720_30_4.04_Mar162020_01.mp4"
                },
                {
                    "fileName": "cea91c2e-1f10-4009-ad13-012bf19588a5.jpg",
                    "fileUrl": "http://localhost:6948/public/materi/images/cea91c2e-1f10-4009-ad13-012bf19588a5.jpg",
                    "originalName": "20200223_115237.jpg"
                }
            ],
            nama_materi: "Materi B Pelajaran B Kelas 1B",
            pelajaranId: 4,
            creatorId: 3,
            isi_materi: "<p>Konten untuk Materi B Pelajaran B Kelas 1B</p>"
        }
    })

    console.log('Seeding completed for Materi!')
}
