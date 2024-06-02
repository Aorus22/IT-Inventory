-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "jenis" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "stok" INTEGER NOT NULL,
    "gambar" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "tanggal_mulai" DATETIME NOT NULL,
    "tanggal_selesai" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Transaksi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "kuantitas" INTEGER NOT NULL,
    "tanggal" DATETIME NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PurchaseOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "tanggal" DATETIME NOT NULL,
    "status" TEXT NOT NULL
);
