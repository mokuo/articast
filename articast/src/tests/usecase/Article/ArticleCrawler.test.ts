import "reflect-metadata";
import { container } from "tsyringe";

import Article from "../../../domain/Article/Article";
import { publickeyFeed } from "../../../domain/BlogFeed/BlogFeed";
import ArticleRepo from "../../../infrastructure/Article/ArticleRepo";
import ArticleStorage from "../../../infrastructure/Article/ArticleStorage";
import BlogFeedRepo from "../../../infrastructure/BlogFeed/BlogFeedRepo";
import ArticleCrawler from "../../../usecase/Article/ArticleCrawler";
import { mockHttpRequest } from "../../__utils__/mockHttpRequest";

describe("Article Crawler", () => {
  describe("#crawl", () => {
    it("未クローリング記事をすべてクロールする", async () => {
      // setup
      const prismaClient = jestPrisma.client;

      const blogFeedRepo = new BlogFeedRepo();
      await blogFeedRepo.bulkInsert(prismaClient, [publickeyFeed]);

      const article1 = Article.createNew({
        url: "https://example.com/1",
        title: "title1",
        blogFeedUrl: publickeyFeed.url,
        publishedAt: new Date("2020-01-01T00:00:00Z"),
      });
      const article2 = Article.createNew({
        url: "https://example.com/2",
        title: "title2",
        blogFeedUrl: publickeyFeed.url,
        publishedAt: new Date("2020-01-01T00:00:00Z"),
      });
      const articleRepo = container.resolve(ArticleRepo);
      await articleRepo.bulkInsertOrSkip(prismaClient, [article1, article2]);

      await mockHttpRequest(
        "https://example.com/1",
        "tests/__fixtures__/html/www.publickey1.jp/blog/24/javascripttypescriptosbun_shelljavascriptbun.html",
      );
      await mockHttpRequest(
        "https://example.com/2",
        "tests/__fixtures__/html/www.publickey1.jp/blog/24/javascripttypescriptosbun_shelljavascriptbun.html",
      );

      // test
      const articleCrawler = container.resolve(ArticleCrawler);
      await articleCrawler.crawl(prismaClient, publickeyFeed.url);

      const foundArticles = await articleRepo.findAll(prismaClient, {});
      expect(foundArticles.length).toEqual(2);
      expect(foundArticles[0].status).toEqual("crawled");
      expect(foundArticles[1].status).toEqual("crawled");

      const articleStorage = container.resolve(ArticleStorage);
      const text1 = await articleStorage.download(foundArticles[0].crawling!.crawledContentPath);
      const text2 = await articleStorage.download(foundArticles[1].crawling!.crawledContentPath);
      expect(text1).toEqual(expect.stringContaining("Bun"));
      expect(text2).toEqual(expect.stringContaining("Bun"));
    });
  });
});
