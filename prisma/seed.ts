import { materiSeed } from "./seeds/materi";
import { nilaiSeed } from "./seeds/nilai";
import { pelajaranSeed } from "./seeds/pelajaran";
import { pengumpulanSeed } from "./seeds/pengumpulan";
import { prisma } from "./seeds/PrismaModule";
import { roleSeed } from "./seeds/role";
import { tugasSeed } from "./seeds/tugas";
import { userSeed } from "./seeds/user";

async function main() {
    await roleSeed()
    await userSeed()
    await pelajaranSeed()
    // await materiSeed()
    // await tugasSeed()
    // await pengumpulanSeed()
    // await nilaiSeed()
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })