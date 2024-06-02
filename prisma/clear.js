const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clearTables() {
    try {
        await prisma.item.deleteMany();
        await prisma.project.deleteMany();
        await prisma.transaksi.deleteMany();
        await prisma.purchaseOrder.deleteMany();
        console.log('All tables have been cleared');
    } catch (error) {
        console.error('Error clearing tables:', error);
    } finally {
        await prisma.$disconnect();
    }
}

clearTables();
