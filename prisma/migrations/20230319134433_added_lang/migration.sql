/*
  Warnings:

  - Added the required column `language` to the `Translation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Translation" ADD COLUMN     "language" TEXT NOT NULL;
