import { INestApplication } from "@nestjs/common";
import * as request from 'supertest';
import { saveResponseToFile } from "../../helper";

export const getAllSiswa = (app: INestApplication, refreshToken: string, fileName: string) => {
    return request(app.getHttpServer())
        .get('/users/get-all-siswa')
        .set('Authorization', `Bearer ${refreshToken}`)
        .expect(200)
        .expect(res => {
            expect(res.body.status).toBe('success');
            expect(res.body.siswa).toBeDefined();
            expect(Array.isArray(res.body.siswa)).toBe(true);

            res.body.siswa.forEach((siswa: any) => {
                expect(typeof siswa.id).toBe('number');
                expect(typeof siswa.nama_lengkap).toBe('string');
                expect(typeof siswa.email).toBe('string');
                expect(typeof siswa.username).toBe('string');
                expect(typeof siswa.roleId).toBe('number');
                expect(typeof siswa.isActive).toBe('boolean');
                expect(siswa.asal_sekolah === null || typeof siswa.asal_sekolah === 'string').toBe(true); // nullable field

                expect(siswa.password).toBeUndefined();
            });

            saveResponseToFile(res, fileName)
        })
}