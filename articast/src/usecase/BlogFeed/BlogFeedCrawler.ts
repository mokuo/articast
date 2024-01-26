import { PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";

import BlogFeedItemCrawler from "../../domain/BlogFeed/BlogFeedItemCrawler";
import ArticleRepo from "../../infrastructure/Article/ArticleRepo";

@injectable()
export default class BlogFeedCrawler {
  constructor(private itemCrawler: BlogFeedItemCrawler, private articleRepo: ArticleRepo) {}

  async crawl(prismaClient: PrismaClient, blogFeedUrl: string) {
    const articles = await this.itemCrawler.getArticles(blogFeedUrl);
    await prismaClient.$transaction(async (tx) => {
      await this.articleRepo.bulkInsertOrSkip(tx, articles);
    });
  }
}
