import { INestApplication } from "@nestjs/common";
import * as request from 'supertest';
import { saveResponseToFile } from "../../helper";

export const getMe = (app: INestApplication, refreshToken: string, fileName: string) => {
    return request(app.getHttpServer())
        .get('/users/get-me')
        .set('Authorization', `Bearer ${refreshToken}`)
        .expect(200)
        .expect(res => {
            expect(res.body.status).toBe('success');
            expect(res.body.message).toBe('Berhasil mengambil data');
            expect(res.body.user).toBeDefined();

            const user = res.body.user;

            expect(typeof user.id).toBe('number');

            expect(typeof user.nama_lengkap).toBe('string');
            expect(typeof user.email).toBe('string');
            expect(typeof user.username).toBe('string');
            expect(user.role).toBeDefined();
            expect(typeof user.role.role).toBe('string');
            expect(typeof user.isActive).toBe('boolean');
            expect(user.asal_sekolah === null || typeof user.asal_sekolah === 'string').toBe(true); // nullable field
            expect(typeof user.createdAt).toBe('string');
            expect(typeof user.updatedAt).toBe('string');

            expect(user.password).toBeUndefined();

            saveResponseToFile(res, fileName);
        });
};
