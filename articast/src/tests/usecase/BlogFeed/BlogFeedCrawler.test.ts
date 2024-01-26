import { promises as fs } from "fs";
import path from "path";

import nock from "nock";
import "reflect-metadata";
import { container } from "tsyringe";

import { publickeyFeed } from "../../../domain/BlogFeed/BlogFeed";
import BlogFeedRepo from "../../../infrastructure/BlogFeed/BlogFeedRepo";
import BlogFeedCrawler from "../../../usecase/BlogFeed/BlogFeedCrawler";
import expectedArticles from "../../__fixtures__/articles_publickey_20230124";

describe("BlogFeedCrawler", () => {
  describe("#crawl", () => {
    const prismaClient = jestPrisma.client;

    it("RSS フィードをクロールして、記事を保存する", async () => {
      // setup
      const blogFeedRepo = new BlogFeedRepo();
      await blogFeedRepo.bulkInsert(prismaClient, [publickeyFeed]);

      const blogFeedText = await fs.readFile(path.resolve("tests/__fixtures__/rss/publickey_20230124.xml"), "utf-8");
      nock("https://www.publickey1.jp").get("/atom.xml").reply(200, blogFeedText);

      // test
      const crawler = container.resolve(BlogFeedCrawler);
      await crawler.crawl(prismaClient, "https://www.publickey1.jp/atom.xml");

      const foundArticles = await prismaClient.article.findMany();

      expect(foundArticles.length).toBe(expectedArticles.length);
      expect(foundArticles.map((article) => article.url)).toEqual(
        expect.arrayContaining(expectedArticles.map((article) => article.url)),
      );
    });
  });
});
