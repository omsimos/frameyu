-- CreateTable
CREATE TABLE "Frame" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imgUrl" TEXT NOT NULL,
    "handle" TEXT,
    "caption" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Frame_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Frame_handle_key" ON "Frame"("handle");
