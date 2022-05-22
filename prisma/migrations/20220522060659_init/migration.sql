-- CreateTable
CREATE TABLE "SyobocalPage" (
    "tid" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SyobocalPage_pkey" PRIMARY KEY ("tid")
);
