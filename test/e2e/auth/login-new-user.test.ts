import { INestApplication } from "@nestjs/common";
import * as request from 'supertest';
import { LoginDto } from "src/auth/dto/login.dto";

export const loginNewUserTest = (app: INestApplication, loginDto: LoginDto) => {
    return request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(200)
        .expect((res) => {
            expect(res.body.status).toEqual('success');
            expect(res.body.message).toEqual('Berhasil login');
            expect(res.body.user).toHaveProperty('id');
            expect(res.body.user).toHaveProperty('nama_lengkap');
            expect(res.body.user).toHaveProperty('role');
            expect(res.body.user).toHaveProperty('asal_sekolah');
            expect(res.body.user).toHaveProperty('refresh_token');
        });
}