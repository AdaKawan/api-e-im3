import { INestApplication } from "@nestjs/common";
import * as request from 'supertest';
import { saveResponseToFile } from "../../helper";

export const deleteUserTest = (app: INestApplication, userId: number, refreshToken: string) => {
    return request(app.getHttpServer())
        .delete(`/users/delete/${userId}`)
        .set('Authorization', `Bearer ${refreshToken}`)
        .expect(200)
        .expect(response => {
            saveResponseToFile(response, 'deleteUserResponse.json')
        });
}