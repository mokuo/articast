/*
  Warnings:

  - You are about to drop the column `updated_at` on the `articles` table. All the data in the column will be lost.
  - Added the required column `published_at` to the `articles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `articles` DROP COLUMN `updated_at`,
    ADD COLUMN `published_at` DATETIME(3) NOT NULL;
