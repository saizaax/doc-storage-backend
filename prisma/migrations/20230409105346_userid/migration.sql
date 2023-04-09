/*
  Warnings:

  - Added the required column `userId` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Format` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Text` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Translation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Format" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Text" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Translation" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Format" ADD CONSTRAINT "Format_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Text" ADD CONSTRAINT "Text_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
