import { INestApplication } from "@nestjs/common";
import * as request from 'supertest';
import { saveResponseToFile } from "../../helper";
import { UpdateUserDto } from "src/user/dto/update-user.dto";

export const updateUserTest = (
    app: INestApplication,
    updateUserDto: UpdateUserDto,
    userId: number,
    refreshToken: string,
    fileName: string
) => {
    return request(app.getHttpServer())
        .patch(`/users/update/${userId}`)
        .set('Authorization', `Bearer ${refreshToken}`)
        .send(updateUserDto)
        .expect(200)
        .expect(response => {
            expect(response.body.status).toBe('success');
            expect(response.body.user).toBeDefined();
            expect(response.body.user.username).toBe(updateUserDto.username);

            saveResponseToFile(response, fileName)
        });
}