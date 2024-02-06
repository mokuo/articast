import "reflect-metadata";
import { injectable } from "tsyringe";

import ArticleCrawlerBuilder from "../../domain/Article/ArticleCrawlerBuilder";
import CrawledContentPath from "../../domain/Article/CrawledContentPath";
import ArticleRepo from "../../infrastructure/Article/ArticleRepo";
import ArticleStorage from "../../infrastructure/Article/ArticleStorage";
import { PrismaTxClient } from "../../prisma/utils";
import { chunk } from "../../utils/array-utils";

@injectable()
export default class ArticleCrawler {
  constructor(
    private builder: ArticleCrawlerBuilder,
    private articleRepo: ArticleRepo,
    private articleStorage: ArticleStorage,
  ) {}

  async crawl(prismaClient: PrismaTxClient, blogFeedUrl: string) {
    const articleCrawler = this.builder.getCrawler(blogFeedUrl);

    const articles = await this.articleRepo.findAll(prismaClient, { blogFeedUrl, status: "uncrawled" });
    const chunkedArticles = chunk(articles, 5);
    for (const arts of chunkedArticles) {
      await Promise.all(
        arts.map(async (article) => {
          const text = await articleCrawler.getText(article.url);
          const path = CrawledContentPath.createNew(article.url);
          await this.articleStorage.upload(path, text);

          article.saveCrawledContentPath(path);
          await this.articleRepo.update(prismaClient, article);
        }),
      );
    }
  }
}
