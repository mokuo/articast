import "reflect-metadata";
import { container } from "tsyringe";

import { publickeyFeed } from "../../../domain/BlogFeed/BlogFeed";
import BlogFeedRepo from "../../../infrastructure/BlogFeed/BlogFeedRepo";
import BlogFeedCrawler from "../../../usecase/BlogFeed/BlogFeedCrawler";
import expectedArticles from "../../__fixtures__/articles_publickey_20230124";
import { mockHttpRequest } from "../../__utils__/mockHttpRequest";

describe("BlogFeedCrawler", () => {
  describe("#crawl", () => {
    const prismaClient = jestPrisma.client;
    const url = "https://www.publickey1.jp/atom.xml";

    it("RSS フィードをクロールして、記事を保存する", async () => {
      // setup
      const blogFeedRepo = new BlogFeedRepo();
      await blogFeedRepo.bulkInsert(prismaClient, [publickeyFeed]);
      await mockHttpRequest(url, "tests/__fixtures__/rss/publickey_20230124.xml");

      // test
      const crawler = container.resolve(BlogFeedCrawler);
      await crawler.crawl(prismaClient, url);

      const foundArticles = await prismaClient.article.findMany();

      expect(foundArticles.length).toBe(expectedArticles.length);
      expect(foundArticles.map((article) => article.url)).toEqual(
        expect.arrayContaining(expectedArticles.map((article) => article.url)),
      );
    });
  });
});
