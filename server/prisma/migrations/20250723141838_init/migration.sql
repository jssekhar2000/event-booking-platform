/*
  Warnings:

  - You are about to drop the column `description` on the `Event` table. All the data in the column will be lost.
  - Added the required column `longDescription` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescription` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalTickets` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "description",
ADD COLUMN     "amenities" TEXT[],
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "longDescription" TEXT NOT NULL,
ADD COLUMN     "mapUrl" TEXT,
ADD COLUMN     "originalPrice" DOUBLE PRECISION,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "rating" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "restrictions" TEXT,
ADD COLUMN     "reviewsCount" INTEGER DEFAULT 0,
ADD COLUMN     "shortDescription" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "totalTickets" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
