const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.user.createMany({
        data: [
            {
                username: 'admin',
                password: '12345678',
                role: "admin",
            },
            {
                username: 'superadmin',
                password: '87654321',
                role: "superadmin",
            },
        ],
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
