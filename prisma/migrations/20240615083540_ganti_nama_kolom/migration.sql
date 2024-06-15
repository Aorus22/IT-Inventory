/*
  Warnings:

  - You are about to drop the column `itemId` on the `PurchaseOrder` table. All the data in the column will be lost.
  - You are about to drop the column `jenisBarangId` on the `Item` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PurchaseOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama_pemesan" TEXT NOT NULL,
    "id_item" INTEGER,
    "deskripsi" TEXT NOT NULL,
    "tanggal" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "PurchaseOrder_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "Item" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_PurchaseOrder" ("deskripsi", "id", "nama_pemesan", "status", "tanggal") SELECT "deskripsi", "id", "nama_pemesan", "status", "tanggal" FROM "PurchaseOrder";
DROP TABLE "PurchaseOrder";
ALTER TABLE "new_PurchaseOrder" RENAME TO "PurchaseOrder";
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama_item" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "stok" INTEGER NOT NULL,
    "harga" INTEGER NOT NULL,
    "gambar" TEXT NOT NULL,
    "id_jenis_barang" INTEGER,
    CONSTRAINT "Item_id_jenis_barang_fkey" FOREIGN KEY ("id_jenis_barang") REFERENCES "JenisBarang" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("deskripsi", "gambar", "harga", "id", "nama_item", "stok") SELECT "deskripsi", "gambar", "harga", "id", "nama_item", "stok" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check("PurchaseOrder");
PRAGMA foreign_key_check("Item");
PRAGMA foreign_keys=ON;
