import Article from "../../../domain/Article/Article";
import { publickeyFeed } from "../../../domain/BlogFeed/BlogFeed";
import ArticleRepo from "../../../infrastructure/Article/ArticleRepo";
import BlogFeedRepo from "../../../infrastructure/BlogFeed/BlogFeedRepo";

describe("ArticleRepo", () => {
  describe("#bulkInsertOrSkip", () => {
    const prismaClient = jestPrisma.client;

    it("保存されていない記事のみ保存する", async () => {
      // setup
      const blogFeedRepo = new BlogFeedRepo();
      await blogFeedRepo.bulkInsert(prismaClient, [publickeyFeed]);

      const articleRepo = new ArticleRepo();
      const article1 = new Article({
        url: "https://example.com/1",
        title: "title1",
        blogFeedUrl: publickeyFeed.url,
        publishedAt: new Date("2020-01-01T00:00:00Z"),
      });
      await articleRepo.bulkInsertOrSkip(prismaClient, [article1]);

      // test
      const article2 = new Article({
        url: "https://example.com/2",
        title: "title2",
        blogFeedUrl: publickeyFeed.url,
        publishedAt: new Date("2020-01-02T00:00:00Z"),
      });
      await articleRepo.bulkInsertOrSkip(prismaClient, [article2]);

      const articles = await prismaClient.article.findMany({ include: { articleSource: true } });
      expect(articles.length).toBe(2);

      const foundArticle2 = articles.find((article) => article.url === "https://example.com/2");
      expect(foundArticle2?.title).toBe("title2");
      expect(foundArticle2?.status).toBe("notCrawled");
      expect(foundArticle2?.articleSource?.blogFeedUrl).toBe(publickeyFeed.url);
    });
  });
});
