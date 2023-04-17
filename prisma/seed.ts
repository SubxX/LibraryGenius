import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const seedData = await prisma.manager.create({
        data: {
            email: "subhambhattacharya700@gmail.com",
            name: "Subham Bhattacharya",
            password: "tomrider",
            isVerified: true,
            isAdmin: true
        }
    })

    console.log(seedData)
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