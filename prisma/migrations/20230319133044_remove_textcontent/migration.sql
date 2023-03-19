/*
  Warnings:

  - You are about to drop the column `textContentId` on the `Text` table. All the data in the column will be lost.
  - You are about to drop the column `textContentId` on the `Translation` table. All the data in the column will be lost.
  - You are about to drop the `TextContent` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content` to the `Text` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Translation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Text" DROP CONSTRAINT "Text_textContentId_fkey";

-- DropForeignKey
ALTER TABLE "Translation" DROP CONSTRAINT "Translation_textContentId_fkey";

-- AlterTable
ALTER TABLE "Text" DROP COLUMN "textContentId",
ADD COLUMN     "content" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Translation" DROP COLUMN "textContentId",
ADD COLUMN     "content" TEXT NOT NULL;

-- DropTable
DROP TABLE "TextContent";
