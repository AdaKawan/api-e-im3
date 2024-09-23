import { INestApplication } from "@nestjs/common";
import { Convert } from "../RegisterResponse";
import { closeAppInstance, getAppInstance } from "../setup";
import { activateUser } from "./user/activate-user.test";
import * as path from "path";
import * as fs from "fs";
import { generateGuru, generateUpdateGuru, generateUpdateProfileGuru, getRefreshTokenAdmin, getRefreshTokenGuru } from "../helper";
import { getAllGuruTest } from "./user/get-all-guru.test";
import { getAllSiswa } from "./user/get-all-siswa.test";
import { createUserTest } from "./user/create-user.test";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { getAllUser } from "./user/get-all-user.test";
import { updateUserTest } from "./user/user-update.test";
import { deleteUserTest } from "./user/delete-user.test";
import { getMe } from "./user/getme-user.test";
import { updateProfile } from "./user/update-profile.test";
import { findOneGuru } from "./user/find-one-guru.test";
import { findOneSiswa } from "./user/find-one-siswa.test";

describe('Users Controller Admin (e2e)', () => {
    let app: INestApplication;
    let refreshTokenAdmin: string;
    let refreshTokenGuru: string;
    let guru: CreateUserDto;

    beforeEach(async () => {
        app = await getAppInstance();
        refreshTokenAdmin = getRefreshTokenAdmin()
        refreshTokenGuru = getRefreshTokenGuru()
    });

    afterAll(async () => {
        await closeAppInstance();
    });

    describe('Activate Guru', () => {
        it('Admin harus berhasil mengaktifkan user yang sudah mendaftar', async () => {
            const registerUserFilePath = path.join(__dirname, '../response/registerGuruResponse.json');
            const json = fs.readFileSync(registerUserFilePath, 'utf8');
            const user = Convert.toRegisterResponse(json)

            await activateUser(app, user.user.id, refreshTokenAdmin)
        })
    })

    describe('Activate Siswa', () => {
        it('Admin harus berhasil mengaktifkan user yang sudah mendaftar', async () => {

            const registerUserFilePath = path.join(__dirname, '../response/registerSiswaResponse.json');
            const json = fs.readFileSync(registerUserFilePath, 'utf8');
            const user = Convert.toRegisterResponse(json)

            await activateUser(app, user.user.id, refreshTokenAdmin)
        })
    })

    describe('Get All Guru', () => {
        it('/users/get-all-guru (GET)', async () => {
            await getAllGuruTest(app, refreshTokenAdmin, 'getAllGuruResponseAdmin.json')
        });
    })

    describe('Get All Siswa', () => {
        it('/users/get-all-siswa (GET)', async () => {
            await getAllSiswa(app, refreshTokenAdmin, 'getAllSiswaResponseAdmin.json')
        });
    })

    describe('Find One Guru', () => {
        it('/users/find-one-guru/:id (GET)', async () => {
            await findOneGuru(app, refreshTokenAdmin, 2, 'findOneGuruResponseAdmin.json')
        });
    })

    describe('Find One Siswa', () => {
        it('/users/find-one-siswa/:id (GET)', async () => {
            await findOneSiswa(app, refreshTokenAdmin, 4, 'findOneSiswaResponseAdmin.json')
        });
    })

    describe('Create User', () => {
        it('/users/create (POST)', async () => {
            const createGuruguru = generateGuru()
            createGuruguru.isActive = true
            guru = createGuruguru
            await createUserTest(app, createGuruguru, refreshTokenAdmin, 'createUserResponse.json')
        });
    })

    describe('Get All User', () => {
        it('/users/get-all (GET)', async () => {
            await getAllUser(app, refreshTokenAdmin, 'getAllUserResponse.json')
        });
    })

    describe('Update User', () => {
        it('/users/update/:id (PATCH)', async () => {
            const registerUserFilePath = path.join(__dirname, '../response/createUserResponse.json');
            const json = fs.readFileSync(registerUserFilePath, 'utf8');
            const user = Convert.toRegisterResponse(json).user

            const updateUser = generateUpdateGuru()

            await updateUserTest(app, updateUser, user.id, refreshTokenAdmin, 'updateUserResponse.json')
        });
    })

    describe('Delete User', () => {
        it('/users/delete/:id (DELETE)', async () => {
            const registerUserFilePath = path.join(__dirname, '../response/createUserResponse.json');
            const json = fs.readFileSync(registerUserFilePath, 'utf8');
            const user = Convert.toRegisterResponse(json).user
            const userId = user.id;

            await deleteUserTest(app, userId, refreshTokenAdmin)
        });
    })

    describe('Get Me User', () => {
        it('/users/get-me (GET)', async () => {
            await getMe(app, refreshTokenGuru, 'getmeGuru.json')
        });
    })

    describe('Update Profile', () => {
        it('/users/update-profile (PATCH)', async () => {
            const updateProfileGuru = generateUpdateProfileGuru()
            await updateProfile(app, refreshTokenGuru, 'updateProfile.json', updateProfileGuru)
        });
    })
})