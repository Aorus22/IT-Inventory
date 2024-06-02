/*
  Warnings:

  - You are about to drop the column `name` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Item` table. All the data in the column will be lost.
  - Added the required column `nama` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "tanggal_mulai" DATETIME NOT NULL,
    "tanggal_selesai" DATETIME NOT NULL
);
INSERT INTO "new_Project" ("deskripsi", "id", "status", "tanggal_mulai", "tanggal_selesai") SELECT "deskripsi", "id", "status", "tanggal_mulai", "tanggal_selesai" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "jenis" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "stok" INTEGER NOT NULL,
    "gambar" TEXT NOT NULL
);
INSERT INTO "new_Item" ("deskripsi", "gambar", "id", "jenis", "stok") SELECT "deskripsi", "gambar", "id", "jenis", "stok" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check("Project");
PRAGMA foreign_key_check("Item");
PRAGMA foreign_keys=ON;
