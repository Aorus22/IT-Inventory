/*
  Warnings:

  - You are about to drop the column `nama` on the `Transaksi` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `JenisBarang` table. All the data in the column will be lost.
  - You are about to drop the column `jenis` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `PurchaseOrder` table. All the data in the column will be lost.
  - Added the required column `jenis_transaksi` to the `Transaksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_customer` to the `Transaksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_project` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_jenis` to the `JenisBarang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `harga` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_item` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_pemesan` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaksi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "jenis_transaksi" TEXT NOT NULL,
    "nama_customer" TEXT NOT NULL,
    "itemId" INTEGER,
    "kuantitas" INTEGER NOT NULL,
    "tanggal" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Transaksi_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Transaksi" ("id", "kuantitas", "status", "tanggal") SELECT "id", "kuantitas", "status", "tanggal" FROM "Transaksi";
DROP TABLE "Transaksi";
ALTER TABLE "new_Transaksi" RENAME TO "Transaksi";
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama_project" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "tanggal_mulai" DATETIME NOT NULL,
    "tanggal_selesai" DATETIME NOT NULL
);
INSERT INTO "new_Project" ("deskripsi", "id", "status", "tanggal_mulai", "tanggal_selesai") SELECT "deskripsi", "id", "status", "tanggal_mulai", "tanggal_selesai" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE TABLE "new_JenisBarang" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama_jenis" TEXT NOT NULL
);
INSERT INTO "new_JenisBarang" ("id") SELECT "id" FROM "JenisBarang";
DROP TABLE "JenisBarang";
ALTER TABLE "new_JenisBarang" RENAME TO "JenisBarang";
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama_item" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "stok" INTEGER NOT NULL,
    "harga" INTEGER NOT NULL,
    "gambar" TEXT NOT NULL,
    "jenisBarangId" INTEGER,
    CONSTRAINT "Item_jenisBarangId_fkey" FOREIGN KEY ("jenisBarangId") REFERENCES "JenisBarang" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("deskripsi", "gambar", "id", "jenisBarangId", "stok") SELECT "deskripsi", "gambar", "id", "jenisBarangId", "stok" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE TABLE "new_PurchaseOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama_pemesan" TEXT NOT NULL,
    "itemId" INTEGER,
    "deskripsi" TEXT NOT NULL,
    "tanggal" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "PurchaseOrder_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_PurchaseOrder" ("deskripsi", "id", "status", "tanggal") SELECT "deskripsi", "id", "status", "tanggal" FROM "PurchaseOrder";
DROP TABLE "PurchaseOrder";
ALTER TABLE "new_PurchaseOrder" RENAME TO "PurchaseOrder";
PRAGMA foreign_key_check("Transaksi");
PRAGMA foreign_key_check("Project");
PRAGMA foreign_key_check("JenisBarang");
PRAGMA foreign_key_check("Item");
PRAGMA foreign_key_check("PurchaseOrder");
PRAGMA foreign_keys=ON;
