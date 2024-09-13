import { prisma } from "./PrismaModule"
import * as argon2 from "argon2";

export async function userSeed() {
    const passwordAdmin = await argon2.hash('admin12345678');
    const passwordGuruKelas1A = await argon2.hash('gurukelas1A');
    const passwordGuruKelas1B = await argon2.hash('gurukelas1B');
    const passwordSiswaKelas1A = await argon2.hash('siswakelas1A');
    const passwordSiswaKelas1B = await argon2.hash('siswakelas1B');

    const admin = await prisma.user.upsert({
        where: { id: 1 },
        update: {},
        create: {
            nama_lengkap: 'Admin',
            email: 'admin@gmail.com',
            username: 'admin',
            password: passwordAdmin,
            roleId: 1,
        }
    })

    const guruKelas1A = await prisma.user.upsert({
        where: { id: 2 },
        update: {},
        create: {
            nama_lengkap: 'Guru Kelas 1A',
            email: 'guru_kelas_1A@gmail.com',
            username: 'guruKelas1A',
            password: passwordGuruKelas1A,
            roleId: 2,
        }
    })

    const guruKelas1B = await prisma.user.upsert({
        where: { id: 3 },
        update: {},
        create: {
            nama_lengkap: 'Guru Kelas 1B',
            email: 'guru_kelas_1B@gmail.com',
            username: 'guruKelas1B',
            password: passwordGuruKelas1B,
            roleId: 2,
        }
    })

    const siswaKelas1A = await prisma.user.upsert({
        where: { id: 4 },
        update: {},
        create: {
            nama_lengkap: 'Siswa Kelas 1A',
            email: 'siswa_kelas_1A@gmail.com',
            username: 'siswaKelas1A',
            password: passwordSiswaKelas1A,
            roleId: 3,
        }
    })

    const siswaKelas1B = await prisma.user.upsert({
        where: { id: 5 },
        update: {},
        create: {
            nama_lengkap: 'Siswa Kelas 1B',
            email: 'siswa_kelas_1B@gmail.com',
            username: 'siswaKelas1B',
            password: passwordSiswaKelas1B,
            roleId: 3,
        }
    })

    console.log('Seeding completed for User!')
}