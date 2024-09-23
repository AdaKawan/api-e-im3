import { INestApplication } from "@nestjs/common";
import { BigIntToJSON } from "src/common/utils/bigint-to-json";
import * as request from 'supertest';
import * as fs from "fs"
import * as path from "path"

type User = {
    nama_lengkap: string;
    email: string;
    username: string;
    password: string;
    confPassword: string;
    roleId: number;
    asal_sekolah: string;
    isActive: boolean;
}

export const registerUser = (app: INestApplication, role: string, user: Partial<User>) => {
    return request(app.getHttpServer())
        .post('/auth/register')
        .send(user)
        .expect(201)
        .expect((res) => {
            const dirPathResponse = path.join(__dirname, '../../response');
            if (!fs.existsSync(dirPathResponse)) {
                fs.mkdirSync(dirPathResponse, { recursive: true });
            }

            const filePath = path.join(dirPathResponse, `register${role}Response.json`);
            fs.writeFileSync(filePath, JSON.stringify(res.body, BigIntToJSON, 2));

            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('user');
        });
}