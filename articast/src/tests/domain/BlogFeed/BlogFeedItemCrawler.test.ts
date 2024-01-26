import BlogFeedItemCrawler from "../../../domain/BlogFeed/BlogFeedItemCrawler";
import expectedArticles from "../../__fixtures__/articles_publickey_20230124";
import { mockHttpRequest } from "../../__utils__/mockHttpRequest";

describe("BlogFeedItemCrawler", () => {
  describe("#getArticles", () => {
    const url = "https://www.publickey1.jp/atom.xml";

    it("returns articles", async () => {
      // setup
      await mockHttpRequest(url, "tests/__fixtures__/rss/publickey_20230124.xml");

      // test
      const crawler = new BlogFeedItemCrawler();
      const articles = await crawler.getArticles(url);
      expect(articles).toEqual(expectedArticles);
    });
  });
});
