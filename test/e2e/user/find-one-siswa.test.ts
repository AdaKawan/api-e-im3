import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { saveResponseToFile } from '../../helper';

export const findOneSiswa = (
    app: INestApplication,
    refreshToken: string,
    id: number,
    fileName: string,
) => {
    return request(app.getHttpServer())
        .get(`/users/find-one-siswa/${id}`)
        .set('Authorization', `Bearer ${refreshToken}`)
        .expect(200)
        .expect(res => {
            expect(res.body.status).toBe('success');
            expect(res.body.message).toBe('Berhasil mengambil data');

            const siswa = res.body.siswa;

            expect(siswa).toBeDefined();
            expect(typeof siswa.id).toBe('number');
            expect(typeof siswa.nama_lengkap).toBe('string');
            expect(typeof siswa.username).toBe('string');
            expect(typeof siswa.email).toBe('string');
            expect(typeof siswa.isActive).toBe('boolean');
            expect(siswa.materi).toBeDefined();
            expect(siswa.materi.length).toBeGreaterThanOrEqual(0);
            expect(siswa.pengumpulan).toBeDefined();
            expect(siswa.pengumpulan.length).toBeGreaterThanOrEqual(0);

            saveResponseToFile(res, fileName);
        });
};
