const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const faker = require('faker');

async function main() {
    // Predefined data for JenisBarang table
    const jenisBarangNames = [
        'Kain', 'Benang', 'Jarum', 'Velcro', 'Zipper', 'Project', 'Sampel',
        'Kancing', 'Ribbon', 'Mesin', 'Misselenaiois'
    ];

    const jenisBarangData = [];
    for (const nama_jenis of jenisBarangNames) {
        jenisBarangData.push(await prisma.jenisBarang.create({
            data: { nama_jenis },
        }));
    }

    // Generate data for Item table with random JenisBarang association
    const itemData = [];
    for (let i = 0; i < 20; i++) {
        const randomJenisBarang = jenisBarangData[Math.floor(Math.random() * jenisBarangData.length)];
        itemData.push(await prisma.item.create({
            data: {
                nama_item: faker.commerce.productName(),
                deskripsi: faker.lorem.sentence(),
                stok: faker.datatype.number({ min: 1, max: 100 }),
                harga: faker.datatype.number({ min: 1000, max: 100000 }),
                gambar: faker.image.imageUrl(),
                id_jenis_barang: randomJenisBarang.id,
            },
        }));
    }

    // Generate data for Project table
    for (let i = 0; i < 20; i++) {
        await prisma.project.create({
            data: {
                nama_project: faker.company.companyName(),
                deskripsi: faker.lorem.paragraph(),
                status: faker.random.arrayElement(['ongoing', 'completed', 'pending']),
                tanggal_mulai: faker.date.past(),
                tanggal_selesai: faker.date.future(),
            },
        });
    }

    // Generate data for Transaksi table
    for (let i = 0; i < 100; i++) {
        const randomItem = itemData[Math.floor(Math.random() * itemData.length)];
        await prisma.transaksi.create({
            data: {
                jenis_transaksi: faker.random.arrayElement(['keluar', 'masuk']),
                nama_customer: faker.name.findName(),
                id_item: randomItem.id,
                kuantitas: faker.datatype.number({ min: 1, max: 100 }),
                tanggal: faker.date.between('2024-01-01', '2024-05-31'),
                status: faker.random.arrayElement(['pending', 'approved', 'rejected']),
            },
        });
    }

    // Generate data for PurchaseOrder table
    for (let i = 0; i < 20; i++) {
        const randomItem = itemData[Math.floor(Math.random() * itemData.length)];
        await prisma.purchaseOrder.create({
            data: {
                nama_pemesan: faker.name.findName(),
                id_item: randomItem.id,
                kuantitas: faker.datatype.number({ min: 1, max: 100 }),
                deskripsi: faker.lorem.sentence(),
                tanggal: faker.date.between('2024-01-01', '2024-05-31'),
                status: faker.random.arrayElement(['pending', 'approved', 'rejected']),
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
