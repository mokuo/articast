import { promises as fs } from "fs";
import path from "path";

import nock from "nock";

import BlogFeedItemCrawler from "../../../domain/BlogFeed/BlogFeedItemCrawler";
import expectedArticles from "../../__fixtures__/articles_publickey_20230124";

describe("BlogFeedItemCrawler", () => {
  describe("#getArticles", () => {
    it("returns articles", async () => {
      // setup
      const blogFeedText = await fs.readFile(path.resolve("tests/__fixtures__/rss/publickey_20230124.xml"), "utf-8");
      nock("https://www.publickey1.jp").get("/atom.xml").reply(200, blogFeedText);

      // test
      const crawler = new BlogFeedItemCrawler();
      const articles = await crawler.getArticles("https://www.publickey1.jp/atom.xml");
      expect(articles).toEqual(expectedArticles);
    });
  });
});
