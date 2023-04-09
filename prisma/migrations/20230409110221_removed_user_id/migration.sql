/*
  Warnings:

  - You are about to drop the column `userId` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Format` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Text` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Translation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_userId_fkey";

-- DropForeignKey
ALTER TABLE "Format" DROP CONSTRAINT "Format_userId_fkey";

-- DropForeignKey
ALTER TABLE "Text" DROP CONSTRAINT "Text_userId_fkey";

-- DropForeignKey
ALTER TABLE "Translation" DROP CONSTRAINT "Translation_userId_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Format" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Text" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Translation" DROP COLUMN "userId";
