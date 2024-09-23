import { INestApplication } from "@nestjs/common";
import { BigIntToJSON } from "src/common/utils/bigint-to-json";
import * as request from 'supertest';
import * as fs from "fs"
import * as path from "path"

export const activateUser = (app: INestApplication, id: number, token: string) => {
    return request(app.getHttpServer())
        .patch(`/users/toggle-active/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            isActive: true,
        })
        .expect(200)
        .expect((res) => {
            const dirPathResponse = path.join(__dirname, '../../response');
            if (!fs.existsSync(dirPathResponse)) {
                fs.mkdirSync(dirPathResponse, { recursive: true });
            }

            const filePath = path.join(dirPathResponse, 'activateUserResponse.json');
            fs.writeFileSync(filePath, JSON.stringify(res.body, BigIntToJSON, 2));

            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        });
}