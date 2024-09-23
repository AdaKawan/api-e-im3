import { INestApplication } from "@nestjs/common";
import * as request from 'supertest';
import { saveResponseToFile } from "../../helper";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export const createUserTest = (app: INestApplication, createUserDto: CreateUserDto, refreshToken: string, fileName: string) => {
    return request(app.getHttpServer())
        .post('/users/create')
        .set('Authorization', `Bearer ${refreshToken}`)
        .send(createUserDto)
        .expect(201)
        .expect(res => {
            expect(res.body.status).toBe('success');
            expect(res.body.user).toBeDefined();
            expect(res.body.user.username).toBe(createUserDto.username);

            saveResponseToFile(res, fileName)
        })
}