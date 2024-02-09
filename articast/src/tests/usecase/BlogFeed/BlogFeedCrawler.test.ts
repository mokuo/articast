import "reflect-metadata";
import { container } from "tsyringe";

import { publickeyFeed } from "../../../domain/BlogFeed/BlogFeed";
import ArticleRepo from "../../../infrastructure/Article/ArticleRepo";
import BlogFeedRepo from "../../../infrastructure/BlogFeed/BlogFeedRepo";
import BlogFeedCrawler from "../../../usecase/BlogFeed/BlogFeedCrawler";
import publickeyArticles from "../../__fixtures__/articles_publickey_20230124";
import { mockHttpRequest } from "../../__utils__/mockHttpRequest";

describe("BlogFeedCrawler", () => {
  describe("#crawl", () => {
    it("RSS フィードをクロールして、新しい記事を保存する", async () => {
      // setup
      const prismaClient = jestPrisma.client;
      const url = "https://www.publickey1.jp/atom.xml";

      const blogFeedRepo = new BlogFeedRepo();
      await blogFeedRepo.bulkInsert(prismaClient, [publickeyFeed]);
      await mockHttpRequest(url, "tests/__fixtures__/rss/publickey_20230124.xml");

      const articleRepo = new ArticleRepo();
      await articleRepo.bulkInsert(prismaClient, [publickeyArticles[0], publickeyArticles[1]]);

      // test
      const crawler = container.resolve(BlogFeedCrawler);
      await crawler.crawl(prismaClient, url);

      const foundArticles = await prismaClient.article.findMany();

      expect(foundArticles.length).toBe(publickeyArticles.length);
      expect(foundArticles.map((article) => article.url)).toEqual(
        expect.arrayContaining(publickeyArticles.map((article) => article.url)),
      );
    });
  });
});
