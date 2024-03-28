/*
  Warnings:

  - Added the required column `title` to the `Frame` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Frame" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "handle" TEXT,
    "caption" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Frame_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Frame" ("caption", "handle", "id", "imgUrl", "userId") SELECT "caption", "handle", "id", "imgUrl", "userId" FROM "Frame";
DROP TABLE "Frame";
ALTER TABLE "new_Frame" RENAME TO "Frame";
CREATE UNIQUE INDEX "Frame_handle_key" ON "Frame"("handle");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
