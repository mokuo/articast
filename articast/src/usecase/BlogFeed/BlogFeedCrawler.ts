import { PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";

import Article from "../../domain/Article/Article";
import BlogFeedItemCrawler from "../../domain/BlogFeed/BlogFeedItemCrawler";
import ArticleRepo from "../../infrastructure/Article/ArticleRepo";

@injectable()
export default class BlogFeedCrawler {
  constructor(private itemCrawler: BlogFeedItemCrawler, private articleRepo: ArticleRepo) {}

  async crawl(prismaClient: PrismaClient, blogFeedUrl: string) {
    const articles = await this.itemCrawler.getArticles(blogFeedUrl);
    const alreadyCrawledArticles = await this.articleRepo.findAll(prismaClient, { blogFeedUrl });
    const uncrawledArticles = this.getUncrawledArticles(articles, alreadyCrawledArticles);
    await prismaClient.$transaction(async (tx) => {
      await this.articleRepo.bulkInsert(tx, uncrawledArticles);
    });
  }

  private getUncrawledArticles(articles: Article[], alreadyCrawledArticles: Article[]): Article[] {
    const alreadyCrawledArticleUrls: { [url: string]: boolean } = {};
    alreadyCrawledArticles.forEach((article) => {
      alreadyCrawledArticleUrls[article.url] = true;
    });
    return articles.filter((article) => !alreadyCrawledArticleUrls[article.url]);
  }
}
