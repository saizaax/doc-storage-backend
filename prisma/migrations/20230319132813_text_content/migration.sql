/*
  Warnings:

  - You are about to drop the column `content` on the `Text` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Translation` table. All the data in the column will be lost.
  - Added the required column `textContentId` to the `Text` table without a default value. This is not possible if the table is not empty.
  - Added the required column `textContentId` to the `Translation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Text" DROP COLUMN "content",
ADD COLUMN     "textContentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Translation" DROP COLUMN "content",
ADD COLUMN     "textContentId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "TextContent" (
    "id" TEXT NOT NULL,
    "pages" TEXT[],

    CONSTRAINT "TextContent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Text" ADD CONSTRAINT "Text_textContentId_fkey" FOREIGN KEY ("textContentId") REFERENCES "TextContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_textContentId_fkey" FOREIGN KEY ("textContentId") REFERENCES "TextContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
