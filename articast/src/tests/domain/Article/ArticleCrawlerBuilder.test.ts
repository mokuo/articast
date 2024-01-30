import ArticleCrawlerBuilder from "../../../domain/Article/ArticleCrawlerBuilder";
import PublickeyCrawler from "../../../domain/Article/crawlers/PublickeyCrawler";
import { publickeyFeed } from "../../../domain/BlogFeed/BlogFeed";

describe("ArticleCrawlerBuilder", () => {
  describe("#build", () => {
    describe("正常系", () => {
      it("returns an instance of IArticleCrawler", () => {
        const builder = new ArticleCrawlerBuilder();
        const crawler = builder.getCrawler(publickeyFeed.url);
        expect(crawler).toBeInstanceOf(PublickeyCrawler);
      });
    });

    describe("異常系", () => {
      it("throws an error when the crawler is not found", () => {
        const builder = new ArticleCrawlerBuilder();
        expect(() => builder.getCrawler("https://example.com")).toThrow("crawler not found: https://example.com");
      });
    });
  });
});
