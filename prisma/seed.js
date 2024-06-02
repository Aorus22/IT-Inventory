const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const faker = require('faker');

async function main() {
    // Generate data for Item table
    for (let i = 0; i < 20; i++) {
        await prisma.item.create({
            data: {
                nama: faker.commerce.productName(),
                jenis: faker.commerce.department(),
                deskripsi: faker.lorem.sentence(),
                stok: faker.datatype.number({ min: 1, max: 100 }),
                gambar: faker.image.imageUrl(),
            },
        });
    }

    // Generate data for Project table
    for (let i = 0; i < 20; i++) {
        await prisma.project.create({
            data: {
                nama: faker.company.companyName(),
                deskripsi: faker.lorem.paragraph(),
                status: faker.random.arrayElement(['ongoing', 'completed', 'pending']),
                tanggal_mulai: faker.date.past(),
                tanggal_selesai: faker.date.future(),
            },
        });
    }

    // Generate data for Transaksi table
    for (let i = 0; i < 20; i++) {
        await prisma.transaksi.create({
            data: {
                nama: faker.name.findName(),
                kuantitas: faker.datatype.number({ min: 1, max: 100 }),
                tanggal: faker.date.recent(),
                status: faker.random.arrayElement(['pending', 'completed', 'cancelled']),
            },
        });
    }

    // Generate data for PurchaseOrder table
    for (let i = 0; i < 20; i++) {
        await prisma.purchaseOrder.create({
            data: {
                nama: faker.name.findName(),
                deskripsi: faker.lorem.sentence(),
                tanggal: faker.date.recent(),
                status: faker.random.arrayElement(['ordered', 'received', 'cancelled']),
            },
        });
    }

    console.log('Database seeding completed');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
