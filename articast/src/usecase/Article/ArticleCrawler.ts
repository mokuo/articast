import "reflect-metadata";
import { PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";

import ArticleCrawlerBuilder from "../../domain/Article/ArticleCrawlerBuilder";
import ArticleRepo from "../../infrastructure/Article/ArticleRepo";

@injectable()
export default class ArticleCrawler {
  constructor(private builder: ArticleCrawlerBuilder, private articleRepo: ArticleRepo) {}

  async crawl(prismaClient: PrismaClient, blogFeedUrl: string) {
    const articleCrawler = this.builder.getCrawler(blogFeedUrl);

    const articles = await this.articleRepo.findAll(new PrismaClient(), { blogFeedUrl, status: "uncrawled" });

    await Promise.all(
      articles.map(async (article) => {
        const text = await articleCrawler.getText(article.url);
        // S3 に保存する
      }),
    );

    // ArticleCrawling を保存する
  }
}
