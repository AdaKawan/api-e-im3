import { INestApplication } from "@nestjs/common";
import { Convert } from "../RegisterResponse";
import { closeAppInstance, getAppInstance } from "../setup";
import { activateUser } from "./user/activate-user.test";
import * as path from "path";
import * as fs from "fs";
import { loginNewUserTest } from "./auth/login-new-user.test";

describe('Auth New User (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        app = await getAppInstance();
    });

    afterAll(async () => {
        await closeAppInstance();
    });

    describe('Login New User Guru', () => {
        it('Berhasil login pengguna baru role guru', async () => {
            const registerUserFilePath = path.join(__dirname, '../response/registerGuruResponse.json');
            const json = fs.readFileSync(registerUserFilePath, 'utf8');
            const user = Convert.toRegisterResponse(json).user

            await loginNewUserTest(app, {
                username: user.username,
                password: '1234567890',
                rememberMe: true
            });
        });
    });

    describe('Login New User Siswa', () => {
        it('Berhasil login pengguna baru role siswa', async () => {
            const registerUserFilePath = path.join(__dirname, '../response/registerSiswaResponse.json');
            const json = fs.readFileSync(registerUserFilePath, 'utf8');
            const user = Convert.toRegisterResponse(json).user

            await loginNewUserTest(app, {
                username: user.username,
                password: '1234567890',
                rememberMe: true
            });
        });
    });
})