import { INestApplication } from "@nestjs/common";
import * as request from 'supertest';
import { saveResponseToFile } from "../../helper";

export const getAllGuruTest = (app: INestApplication, refreshToken: string, fileName: string) => {
    return request(app.getHttpServer())
        .get('/users/get-all-guru')
        .set('Authorization', `Bearer ${refreshToken}`)
        .expect(200)
        .expect(res => {
            expect(res.body.status).toBe('success');
            expect(res.body.message).toBe('Berhasil mengambil data');
            expect(res.body.guru).toBeDefined();
            expect(Array.isArray(res.body.guru)).toBe(true);

            saveResponseToFile(res, fileName)
        })


}