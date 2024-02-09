import "reflect-metadata";
import { injectable } from "tsyringe";

import ArticleHtmlCrawler from "../../domain/Article/ArticleHtmlCrawler";
import CrawledContentPath from "../../domain/Article/CrawledContentPath";
import ArticleRepo from "../../infrastructure/Article/ArticleRepo";
import ArticleStorage from "../../infrastructure/Article/ArticleStorage";
import { PrismaTxClient } from "../../prisma/utils";
import { chunk } from "../../utils/array-utils";

@injectable()
export default class ArticleCrawler {
  constructor(
    private crawler: ArticleHtmlCrawler,
    private articleRepo: ArticleRepo,
    private articleStorage: ArticleStorage,
  ) {}

  async crawl(prismaClient: PrismaTxClient, blogFeedUrl: string) {
    const articles = await this.articleRepo.findAll(prismaClient, { blogFeedUrl, status: "uncrawled" });
    const chunkedArticles = chunk(articles, 5);
    for (const arts of chunkedArticles) {
      await Promise.all(
        arts.map(async (article) => {
          const html = await this.crawler.getSimpleHtml(article.url);
          const path = CrawledContentPath.createNew(article.url);
          await this.articleStorage.upload(path, html);

          article.saveCrawledContentPath(path);
          await this.articleRepo.update(prismaClient, article);
        }),
      );
    }
  }
}
