/*
  Warnings:

  - A unique constraint covering the columns `[article_url]` on the table `article_sources` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `article_sources_article_url_key` ON `article_sources`(`article_url`);
