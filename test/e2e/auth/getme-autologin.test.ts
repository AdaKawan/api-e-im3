import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as fs from 'fs';
import * as path from 'path';
import { saveResponseToFile } from '../../helper';

export const autoLoginTest = async (app: INestApplication) => {
    const tokenFilePath = path.join(__dirname, '../../refresh-token/refreshTokenAdmin.txt');
    const refreshToken = fs.readFileSync(tokenFilePath, 'utf8');

    await request(app.getHttpServer())
        .post('/auth/autologin')
        .set('Authorization', `Bearer ${refreshToken}`)
        .expect(200)
        .expect((res) => {
            const dirPathRefreshToken = path.join(__dirname, '../../refresh-token');
            if (!fs.existsSync(dirPathRefreshToken)) {
                fs.mkdirSync(dirPathRefreshToken, { recursive: true });
            }

            const tokenFilePath = path.join(dirPathRefreshToken, 'refreshTokenAdmin.txt');
            fs.writeFileSync(tokenFilePath, res.body.user.refresh_token, 'utf8');

            expect(res.body.status).toEqual('success');
            expect(res.body.message).toEqual('Berhasil login');
            expect(res.body.user).toHaveProperty('id');
            expect(res.body.user).toHaveProperty('nama_lengkap');
            expect(res.body.user).toHaveProperty('role');
            expect(res.body.user).toHaveProperty('asal_sekolah');
            expect(res.body.user).toHaveProperty('refresh_token');

            saveResponseToFile(res, 'autoLoginResponse.json');
        });
};

export const getMeTest = async (app: INestApplication) => {
    const tokenFilePath = path.join(__dirname, '../../refresh-token/refreshTokenAdmin.txt');
    const refreshToken = fs.readFileSync(tokenFilePath, 'utf8');

    await request(app.getHttpServer())
        .get('/auth/get-me')
        .set('Authorization', `Bearer ${refreshToken}`)
        .expect(200)
        .expect((res) => {
            saveResponseToFile(res, 'getMeResponse.json');

            expect(res.body.status).toEqual('success');
            expect(res.body.message).toEqual('Berhasil');
            expect(res.body.user).toHaveProperty('id');
            expect(res.body.user).toHaveProperty('nama_lengkap');
            expect(res.body.user).toHaveProperty('role');
            expect(res.body.user).toHaveProperty('asal_sekolah');
        });
};