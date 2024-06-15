/*
  Warnings:

  - You are about to drop the column `itemId` on the `Transaksi` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaksi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "jenis_transaksi" TEXT NOT NULL,
    "nama_customer" TEXT NOT NULL,
    "id_item" INTEGER,
    "kuantitas" INTEGER NOT NULL,
    "tanggal" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Transaksi_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "Item" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Transaksi" ("id", "jenis_transaksi", "kuantitas", "nama_customer", "status", "tanggal") SELECT "id", "jenis_transaksi", "kuantitas", "nama_customer", "status", "tanggal" FROM "Transaksi";
DROP TABLE "Transaksi";
ALTER TABLE "new_Transaksi" RENAME TO "Transaksi";
PRAGMA foreign_key_check("Transaksi");
PRAGMA foreign_keys=ON;
