/*
  Warnings:

  - You are about to drop the `SyobocalPage` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SongKind" AS ENUM ('opening', 'ending', 'insert', 'theme');

-- DropTable
DROP TABLE "SyobocalPage";

-- CreateTable
CREATE TABLE "SyobocalEntry" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SyobocalEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SyobocalSong" (
    "id" TEXT NOT NULL,
    "tid" INTEGER NOT NULL,
    "kind" "SongKind" NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "number" INTEGER,
    "artist" TEXT,
    "arranger" TEXT,
    "composer" TEXT,
    "lyricist" TEXT,
    "usedIn" TEXT,
    "note" TEXT,

    CONSTRAINT "SyobocalSong_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SyobocalSong" ADD CONSTRAINT "SyobocalSong_tid_fkey" FOREIGN KEY ("tid") REFERENCES "SyobocalEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
