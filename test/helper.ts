import * as request from 'supertest';
import { customFaker } from './customFaker';
import * as path from 'path'
import * as fs from 'fs'
import { BigIntToJSON } from 'src/common/utils/bigint-to-json';

export const loginAdmin = async (app: any, username: string, password: string, rememberMe: boolean) => {
    const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username, password, rememberMe })
        .expect(200);

    return response.body;
};

export const loginGuru = async (app: any, username: string, password: string) => {
    const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username, password })
        .expect(200);

    return response.body;
};

export const loginSiswa = async (app: any, username: string, password: string) => {
    const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username, password })
        .expect(200);

    return response.body;
};

export const daftarSekolah = [
    "SMP NEGERI 1 MAGETAN",
    "SMP NEGERI 2 MAGETAN",
    "SMP NEGERI 3 MAGETAN",
    "SMP NEGERI 4 MAGETAN",
    "SMP IBS Tahfidzul Quran Al-Qolam",
    "SMP ISLAMIC INTERNATIONAL SCHOOL PSM",
    "SMP IT BAITUL QURAN AL JAHRA",
    "SMP KATOLIK PANCASILA MAGETAN",
    "SMP MUHAMMADIYAH 1 MAGETAN",
    "SMP NAHDLATUL ULAMA UNGGULAN MAGETAN",
    "SMPIT AL USWAH MAGETAN",
    "SMP NEGERI 1 KAWEDANAN",
    "SMP NEGERI 2 KAWEDANAN",
    "SMP NEGERI 3 KAWEDANAN",
    "SMP ISLAM EXCELLENT HIDAYATUL UMMAH",
    "SMPK EMMANUEL KAWEDANAN",
    "SMP NEGERI 1 PLAOSAN",
    "SMP NEGERI 2 PLAOSAN",
    "SMP NEGERI 3 PLAOSAN",
    "SMP BAKTI",
    "SMP ISLAM HIDAYATUL MUBTADIIN",
    "SMP NEGERI 1 PANEKAN",
    "SMP NEGERI 2 PANEKAN",
    "SMP MUHAMMADIYAH PANEKAN",
    "SMP PANCA BHAKTI 5 MAGETAN",
    "SMP NEGERI 1 PARANG",
    "SMP NEGERI 2 PARANG",
    "SMP NEGERI 3 PARANG",
    "SMP KATHOLIK GARUDA PARANG",
    "SMP NEGERI 1 MAOSPATI",
    "SMP NEGERI 2 MAOSPATI",
    "SMP NEGERI 3 MAOSPATI",
    "SMP PERSATUAN MAOSPATI",
    "SMP NEGERI 1 BENDO",
    "SMP NEGERI 2 BENDO",
    "SMP NEGERI 1 LEMBEYAN",
    "SMP NEGERI 2 LEMBEYAN",
    "SMP NEGERI 1 SUKOMORO",
    "SMP NEGERI 2 SUKOMORO",
    "SMP NEGERI 1 NGARIBOYO",
    "SMP NEGERI 2 NGARIBOYO",
    "SMP NEGERI 1 TAKERAN",
    "SMP NEGERI 1 PONCOL",
    "SMP NEGERI 2 PONCOL",
    "SMP NEGERI SATU ATAP PONCOL ASLI",
    "SMP NEGERI 1 BARAT",
    "SMP NEGERI 2 BARAT",
    "SMP NEGERI 1 SIDOREJO",
    "SMP NEGERI 2 SIDOREJO",
    "SMP NEGERI 1 KARAS",
    "SMP MAARIF DARUS SHOLIKHIN",
    "SMP PSM TAJI",
    "SMP NEGERI 1 KARTOHARJO",
    "SMP Islam Al-Ikhlas Karasan",
    "SMP NEGERI 1 KARANGREJO",
    "SMP NEGERI 2 KARANGREJO",
    "SMP IT AL IKHLAS",
    "SMP NEGERI 1 NGUNTORONADI",
];

export function generateGuru() {
    var fullName = `${customFaker.person.fullName()}, ${customFaker.person.suffix()}`;
    const splitFullName = fullName.split(' ')
    if (splitFullName.length === 4) {
        if (splitFullName[0] === splitFullName[1]) {
            const filteredName = splitFullName.filter((_, index) => index !== 0);
            fullName = filteredName.join(' ');
        }
    }

    const firstName = fullName.split(' ')[0]
    const lastName = fullName.split(' ')[1]
    const email = customFaker.internet.email({
        firstName,
        lastName
    }).toLowerCase();

    const username = customFaker.internet.userName({
        firstName,
        lastName
    }).toLowerCase();

    const asalSekolah = customFaker.helpers.arrayElement(daftarSekolah)

    return {
        nama_lengkap: fullName,
        email,
        username,
        password: '1234567890',
        confPassword: '1234567890',
        roleId: 2,
        asal_sekolah: asalSekolah.toLowerCase(),
        isActive: false,
    };
}

export function generateSiswa() {
    var fullName = `${customFaker.person.fullName()}`;
    const splitFullName = fullName.split(' ')
    if (splitFullName.length === 3) {
        if (splitFullName[0] === splitFullName[1]) {
            const filteredName = splitFullName.filter((_, index) => index !== 0);
            fullName = filteredName.join(' ');
        }
    }
    const firstName = fullName.split(' ')[0]
    const lastName = fullName.split(' ')[1]
    const email = customFaker.internet.email({
        firstName,
        lastName
    }).toLowerCase();

    const username = customFaker.internet.userName({
        firstName,
        lastName
    }).toLowerCase();

    return {
        nama_lengkap: fullName,
        email,
        username,
        password: '1234567890',
        confPassword: '1234567890',
        roleId: 3,
        isActive: false,
    };
}

export function generateUpdateGuru() {
    var fullName = `${customFaker.person.fullName()}, ${customFaker.person.suffix()}`;
    const splitFullName = fullName.split(' ')
    if (splitFullName.length === 4) {
        if (splitFullName[0] === splitFullName[1]) {
            const filteredName = splitFullName.filter((_, index) => index !== 0);
            fullName = filteredName.join(' ');
        }
    }

    const firstName = fullName.split(' ')[0]
    const lastName = fullName.split(' ')[1]
    const email = customFaker.internet.email({
        firstName,
        lastName
    }).toLowerCase();

    const username = customFaker.internet.userName({
        firstName,
        lastName
    }).toLowerCase();

    const asalSekolah = customFaker.helpers.arrayElement(daftarSekolah)

    return {
        nama_lengkap: fullName,
        email,
        username,
        password: '1234567890',
        confPassword: '1234567890',
        roleId: 2,
        asal_sekolah: asalSekolah.toLowerCase(),
        isActive: true,
    };
}

export function generateUpdateProfileGuru() {
    var fullName = `${customFaker.person.fullName()}, ${customFaker.person.suffix()}`;
    const splitFullName = fullName.split(' ')
    if (splitFullName.length === 4) {
        if (splitFullName[0] === splitFullName[1]) {
            const filteredName = splitFullName.filter((_, index) => index !== 0);
            fullName = filteredName.join(' ');
        }
    }

    const firstName = fullName.split(' ')[0]
    const lastName = fullName.split(' ')[1]
    const email = customFaker.internet.email({
        firstName,
        lastName
    }).toLowerCase();

    const username = customFaker.internet.userName({
        firstName,
        lastName
    }).toLowerCase();

    const asalSekolah = customFaker.helpers.arrayElement(daftarSekolah)

    return {
        nama_lengkap: fullName,
        email,
        username,
        password: '1234567890',
        confPassword: '1234567890',
        roleId: 2,
        asal_sekolah: asalSekolah.toLowerCase(),
    };
}

export function generateUpdateSiswa() {
    var fullName = `${customFaker.person.fullName()}`;
    const splitFullName = fullName.split(' ')
    if (splitFullName.length === 3) {
        if (splitFullName[0] === splitFullName[1]) {
            const filteredName = splitFullName.filter((_, index) => index !== 0);
            fullName = filteredName.join(' ');
        }
    }
    const firstName = fullName.split(' ')[0]
    const lastName = fullName.split(' ')[1]
    const email = customFaker.internet.email({
        firstName,
        lastName
    }).toLowerCase();

    const username = customFaker.internet.userName({
        firstName,
        lastName
    }).toLowerCase();

    return {
        nama_lengkap: fullName,
        email,
        username,
        password: '1234567890',
        confPassword: '1234567890',
        roleId: 3,
        isActive: false,
    };
}

export const saveResponseToFile = (res: any, fileName: string) => {
    const dirPathResponse = path.join(__dirname, 'response');

    if (!fs.existsSync(dirPathResponse)) {
        fs.mkdirSync(dirPathResponse, { recursive: true });
    }

    const filePath = path.join(dirPathResponse, fileName);

    fs.writeFileSync(filePath, JSON.stringify(res.body, BigIntToJSON, 2));
};

export const getRefreshTokenAdmin = () => {
    const tokenFilePath = path.join(__dirname, 'refresh-token/refreshTokenAdmin.txt');
    const refreshToken = fs.readFileSync(tokenFilePath, 'utf8');

    return refreshToken
}

export const getRefreshTokenGuru = () => {
    const tokenFilePath = path.join(__dirname, 'refresh-token/refreshTokenGuru.txt');
    const refreshToken = fs.readFileSync(tokenFilePath, 'utf8');
    return refreshToken
}

export const getRefreshTokenSiswa = () => {
    const tokenFilePath = path.join(__dirname, 'refresh-token/refreshTokenSiswa.txt');
    const refreshToken = fs.readFileSync(tokenFilePath, 'utf8');
    return refreshToken
}