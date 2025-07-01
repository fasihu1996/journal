-- CreateTable
CREATE TABLE "entries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mood" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "favorited" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT
);

