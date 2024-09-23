import { INestApplication } from "@nestjs/common";
import { closeAppInstance, getAppInstance } from "../setup";
import { loginAdminTest } from "./auth/login-admin.test";
import { loginGuruTest } from "./auth/login-guru.test";
import { loginSiswaTest } from "./auth/login-siswa.test";
import { logoutTest } from "./auth/logout.test";
import { registerUser } from "./auth/register-user.test";
import { generateGuru, generateSiswa } from "../helper";
import { autoLoginTest, getMeTest } from "./auth/getme-autologin.test";

describe('Auth Controller (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        app = await getAppInstance();
    });

    afterAll(async () => {
        await closeAppInstance();
    });

    describe('Login Admin', () => {
        it('Berhasil login sebagai pengguna role Admin', async () => {
            await loginAdminTest(app);
        });
    });

    describe('Login Guru', () => {
        it('Berhasil login sebagai pengguna role Guru', async () => {
            await loginGuruTest(app)
        });
    });

    describe('Login Siswa', () => {
        it('Berhasil login sebagai pengguna role Siswa', async () => {
            await loginSiswaTest(app)
        });
    });

    describe('Register Guru', () => {
        const guru = generateGuru()
        it('Harus berhasil mendaftar sebagai Guru', async () => {
            await registerUser(app, 'Guru', guru)
        })
    })

    describe('Register Siswa', () => {
        const siswa = generateSiswa()
        it('Harus berhasil mendaftar sebagai Siswa', async () => {
            await registerUser(app, 'Siswa', siswa)
        })
    })

    describe('AutoLogin', () => {
        it('Berhasil auto-login', async () => {
            await autoLoginTest(app);
        });
    });

    describe('Get Me', () => {
        it('Berhasil mendapatkan informasi user', async () => {
            await getMeTest(app);
        });
    });

    // describe('Logout Admin', () => {
    //     it('/auth/logout (POST)', async () => {
    //         const tokenFilePath = path.join(__dirname, '../refresh-token/refreshTokenAdmin.txt');
    //         const refreshToken = fs.readFileSync(tokenFilePath, 'utf8');

    //         await logoutTest(app, refreshToken);
    //     })
    // })

    // describe('Logout Guru', () => {
    //     it('/auth/logout (POST)', async () => {
    //         const tokenFilePath = path.join(__dirname, '../refresh-token/refreshTokenGuru.txt');
    //         const refreshToken = fs.readFileSync(tokenFilePath, 'utf8');

    //         await logoutTest(app, refreshToken);
    //     })
    // })

    // describe('Logout Siswa', () => {
    //     it('/auth/logout (POST)', async () => {
    //         const tokenFilePath = path.join(__dirname, '../refresh-token/refreshTokenSiswa.txt');
    //         const refreshToken = fs.readFileSync(tokenFilePath, 'utf8');

    //         await logoutTest(app, refreshToken);
    //     })
    // })
});
