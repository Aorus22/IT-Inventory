/*
  Warnings:

  - Added the required column `kuantitas` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PurchaseOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama_pemesan" TEXT NOT NULL,
    "id_item" INTEGER,
    "kuantitas" INTEGER NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "tanggal" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "PurchaseOrder_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "Item" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_PurchaseOrder" ("deskripsi", "id", "id_item", "nama_pemesan", "status", "tanggal") SELECT "deskripsi", "id", "id_item", "nama_pemesan", "status", "tanggal" FROM "PurchaseOrder";
DROP TABLE "PurchaseOrder";
ALTER TABLE "new_PurchaseOrder" RENAME TO "PurchaseOrder";
PRAGMA foreign_key_check("PurchaseOrder");
PRAGMA foreign_keys=ON;
