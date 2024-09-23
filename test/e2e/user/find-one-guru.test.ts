import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { saveResponseToFile } from '../../helper';

export const findOneGuru = (
    app: INestApplication,
    refreshToken: string,
    id: number,
    fileName: string,
) => {
    return request(app.getHttpServer())
        .get(`/users/find-one-guru/${id}`)
        .set('Authorization', `Bearer ${refreshToken}`)
        .expect(200)
        .expect(res => {
            expect(res.body.status).toBe('success');
            expect(res.body.message).toBe('Berhasil mengambil data');

            const guru = res.body.guru;

            expect(guru).toBeDefined();
            expect(typeof guru.id).toBe('number');
            expect(typeof guru.nama_lengkap).toBe('string');
            expect(typeof guru.username).toBe('string');
            expect(typeof guru.email).toBe('string');
            expect(typeof guru.isActive).toBe('boolean');
            expect(typeof guru.asal_sekolah === 'string' || guru.asal_sekolah === null).toBe(true);
            expect(guru.role).toBeDefined();
            expect(typeof guru.role.id).toBe('number');
            expect(typeof guru.role.role).toBe('string');
            expect(guru.createdPelajaran).toBeDefined();
            expect(guru.createdPelajaran.length).toBeGreaterThanOrEqual(0);

            saveResponseToFile(res, fileName);
        });
};
