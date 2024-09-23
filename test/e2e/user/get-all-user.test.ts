import { INestApplication } from "@nestjs/common";
import * as request from 'supertest';
import { saveResponseToFile } from "../../helper";

export const getAllUser = (app: INestApplication, refreshToken: string, fileName: string) => {
    return request(app.getHttpServer())
        .get('/users/get-all')
        .set('Authorization', `Bearer ${refreshToken}`)
        .expect(200)
        .expect(response => {
            expect(response.body.status).toBe('success');
            expect(response.body.users).toBeDefined();
            expect(Array.isArray(response.body.users)).toBe(true);

            saveResponseToFile(response, fileName)
        });
}