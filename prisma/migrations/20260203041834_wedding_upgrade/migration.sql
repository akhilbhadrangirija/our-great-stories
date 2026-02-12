-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "weddingId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "guestCount" INTEGER NOT NULL DEFAULT 1,
    "meal" TEXT,
    "dietary" TEXT,
    "songRequest" TEXT,
    "message" TEXT,
    "plusOne" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Guest_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Guest" ("createdAt", "dietary", "email", "id", "meal", "name", "plusOne", "status", "updatedAt", "weddingId") SELECT "createdAt", "dietary", "email", "id", "meal", "name", "plusOne", "status", "updatedAt", "weddingId" FROM "Guest";
DROP TABLE "Guest";
ALTER TABLE "new_Guest" RENAME TO "Guest";
CREATE TABLE "new_Wedding" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "themeId" TEXT NOT NULL DEFAULT 'classic',
    "aiStyle" TEXT NOT NULL DEFAULT 'watercolor',
    "heroImageUrl" TEXT,
    "coupleNames" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "venueName" TEXT NOT NULL,
    "venueAddress" TEXT NOT NULL,
    "mapUrl" TEXT,
    "hasTimeline" BOOLEAN NOT NULL DEFAULT false,
    "timelineEvents" TEXT,
    "hasStory" BOOLEAN NOT NULL DEFAULT false,
    "story" TEXT,
    "hasRegistry" BOOLEAN NOT NULL DEFAULT false,
    "registryUrl" TEXT,
    "hasCountdown" BOOLEAN NOT NULL DEFAULT true,
    "hasDressCode" BOOLEAN NOT NULL DEFAULT false,
    "dressCode" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Wedding" ("coupleNames", "createdAt", "date", "id", "mapUrl", "slug", "story", "updatedAt", "venueAddress", "venueName") SELECT "coupleNames", "createdAt", "date", "id", "mapUrl", "slug", "story", "updatedAt", "venueAddress", "venueName" FROM "Wedding";
DROP TABLE "Wedding";
ALTER TABLE "new_Wedding" RENAME TO "Wedding";
CREATE UNIQUE INDEX "Wedding_slug_key" ON "Wedding"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
