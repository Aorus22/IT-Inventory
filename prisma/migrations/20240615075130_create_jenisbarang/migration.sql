-- CreateTable
CREATE TABLE "JenisBarang" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "jenis" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "stok" INTEGER NOT NULL,
    "gambar" TEXT NOT NULL,
    "jenisBarangId" INTEGER,
    CONSTRAINT "Item_jenisBarangId_fkey" FOREIGN KEY ("jenisBarangId") REFERENCES "JenisBarang" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("deskripsi", "gambar", "id", "jenis", "nama", "stok") SELECT "deskripsi", "gambar", "id", "jenis", "nama", "stok" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check("Item");
PRAGMA foreign_keys=ON;
