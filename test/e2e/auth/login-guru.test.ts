import { INestApplication } from "@nestjs/common";
import * as request from 'supertest';
import * as fs from "fs"
import * as path from "path"

export const loginGuruTest = (app: INestApplication) => {
    return request(app.getHttpServer())
        .post('/auth/login')
        .send({
            username: 'guruSmpNegeri2Barat',
            password: 'gurusmpnegeri2barat',
            rememberMe: true,
        })
        .expect(200)
        .expect((res) => {
            const dirPathRefreshToken = path.join(__dirname, '../../refresh-token');
            if (!fs.existsSync(dirPathRefreshToken)) {
                fs.mkdirSync(dirPathRefreshToken, { recursive: true });
            }

            const tokenFilePath = path.join(dirPathRefreshToken, 'refreshTokenGuru.txt');
            fs.writeFileSync(tokenFilePath, res.body.user.refresh_token, 'utf8');

            expect(res.body.status).toEqual('success');
            expect(res.body.message).toEqual('Berhasil login');
            expect(res.body.user).toHaveProperty('id');
            expect(res.body.user).toHaveProperty('nama_lengkap');
            expect(res.body.user).toHaveProperty('role');
            expect(res.body.user).toHaveProperty('asal_sekolah');
            expect(res.body.user).toHaveProperty('refresh_token');
        });
}