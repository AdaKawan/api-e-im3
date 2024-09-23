import { INestApplication } from "@nestjs/common";
import { BigIntToJSON } from "src/common/utils/bigint-to-json";
import * as request from 'supertest';
import * as fs from "fs"
import * as path from "path"

export const logoutTest = (app: INestApplication, refreshToken: string) => {
    return request(app.getHttpServer())
        .post('/auth/logout')
        .set('Authorization', `Bearer ${refreshToken}`)
        .expect(200)
        .expect((res) => {
            const dirPath = path.join(__dirname, '../../response');
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }

            const filePath = path.join(dirPath, 'logoutResponse.json');
            fs.writeFileSync(filePath, JSON.stringify(res.body, BigIntToJSON, 2));

            expect(res.body.status).toEqual('success');
            expect(res.body.message).toEqual('Berhasil logout');
        });
}