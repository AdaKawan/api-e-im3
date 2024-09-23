import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { saveResponseToFile } from '../../helper';
import { UpdateUserProfileDto } from 'src/user/dto/update-user-profile.dto';

export const updateProfile = (
    app: INestApplication,
    refreshToken: string,
    fileName: string,
    updateUserProfileDto: UpdateUserProfileDto
) => {
    return request(app.getHttpServer())
        .patch('/users/update-profile')
        .set('Authorization', `Bearer ${refreshToken}`)
        .send(updateUserProfileDto)
        .expect(200)
        .expect(res => {
            expect(res.body.status).toBe('success');
            expect(res.body.message).toBe('Berhasil mengubah data');

            const updatedUser = res.body.user;

            expect(updatedUser).toBeDefined();
            expect(typeof updatedUser.id).toBe('number');
            expect(typeof updatedUser.nama_lengkap).toBe('string');
            expect(typeof updatedUser.email).toBe('string');
            expect(typeof updatedUser.username).toBe('string');
            expect(updatedUser.roleId).toBeDefined();
            expect(typeof updatedUser.roleId).toBe('number');
            expect(updatedUser.asal_sekolah === null || typeof updatedUser.asal_sekolah === 'string').toBe(true);
            expect(typeof updatedUser.isActive).toBe('boolean');
            expect(typeof updatedUser.createdAt).toBe('string');
            expect(typeof updatedUser.updatedAt).toBe('string');

            expect(updatedUser.password).toBeUndefined();

            saveResponseToFile(res, fileName);
        });
};
