import Article from "../../../domain/Article/Article";
import CrawledContentPath from "../../../domain/Article/CrawledContentPath";
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
      const article1 = Article.createNew({
        url: "https://example.com/1",
        title: "title1",
        blogFeedUrl: publickeyFeed.url,
        publishedAt: new Date("2020-01-01T00:00:00Z"),
      });
      await articleRepo.bulkInsert(prismaClient, [article1]);

      // test
      const article2 = Article.createNew({
        url: "https://example.com/2",
        title: "title2",
        blogFeedUrl: publickeyFeed.url,
        publishedAt: new Date("2020-01-02T00:00:00Z"),
      });
      await articleRepo.bulkInsert(prismaClient, [article2]);

      const articles = await prismaClient.article.findMany({ include: { articleSource: true } });
      expect(articles.length).toBe(2);

      const foundArticle2 = articles.find((article) => article.url === "https://example.com/2");
      expect(foundArticle2?.title).toBe("title2");
      expect(foundArticle2?.status).toBe("uncrawled");
      expect(foundArticle2?.articleSource?.blogFeedUrl).toBe(publickeyFeed.url);
    });
  });

  describe("#findAll", () => {
    const prismaClient = jestPrisma.client;
    const blogFeedRepo = new BlogFeedRepo();
    const articleRepo = new ArticleRepo();

    describe("パラメーターを指定しない時", () => {
      it("全ての記事を取得する", async () => {
        // setup
        await blogFeedRepo.bulkInsert(prismaClient, [publickeyFeed]);

        const article1 = Article.createNew({
          url: "https://example.com/1",
          title: "title1",
          blogFeedUrl: publickeyFeed.url,
          publishedAt: new Date("2020-01-01T00:00:00Z"),
        });
        await articleRepo.bulkInsert(prismaClient, [article1]);

        const article2 = Article.reconstruct({
          url: "https://example.com/2",
          title: "title2",
          blogFeedUrl: publickeyFeed.url,
          status: "crawled",
          publishedAt: new Date("2020-01-02T00:00:00Z"),
        });
        await articleRepo.bulkInsert(prismaClient, [article2]);

        // test
        const articles = await articleRepo.findAll(prismaClient, {});
        expect(articles.length).toBe(2);
      });
    });

    describe("ブログフィードURLとステータスを指定した時", () => {
      it("該当する記事を全て取得する", async () => {
        // setup
        await blogFeedRepo.bulkInsert(prismaClient, [publickeyFeed]);

        const article1 = Article.createNew({
          url: "https://example.com/1",
          title: "title1",
          blogFeedUrl: publickeyFeed.url,
          publishedAt: new Date("2020-01-01T00:00:00Z"),
        });
        await articleRepo.bulkInsert(prismaClient, [article1]);

        const article2 = Article.reconstruct({
          url: "https://example.com/2",
          title: "title2",
          blogFeedUrl: publickeyFeed.url,
          status: "crawled",
          publishedAt: new Date("2020-01-02T00:00:00Z"),
        });
        await articleRepo.bulkInsert(prismaClient, [article2]);

        // test
        const articles = await articleRepo.findAll(prismaClient, {
          blogFeedUrl: publickeyFeed.url,
          status: "uncrawled",
        });
        expect(articles.length).toBe(1);
      });
    });
  });

  describe("#update", () => {
    const prismaClient = jestPrisma.client;
    const blogFeedRepo = new BlogFeedRepo();
    const articleRepo = new ArticleRepo();

    describe("ArticleCrawling が保存されていない時", () => {
      it("ArticleCrawling を保存し、ステータスを更新する", async () => {
        // setup
        await blogFeedRepo.bulkInsert(prismaClient, [publickeyFeed]);

        const article = Article.createNew({
          url: "https://example.com/test",
          title: "title",
          blogFeedUrl: publickeyFeed.url,
          publishedAt: new Date("2020-01-01T00:00:00Z"),
        });
        await articleRepo.bulkInsert(prismaClient, [article]);

        // test
        const path = CrawledContentPath.createNew("https://example.com/test");
        article.saveCrawledContentPath(path);
        await articleRepo.update(prismaClient, article);

        const articles = await articleRepo.findAll(prismaClient, {});
        expect(articles.length).toEqual(1);
        const updatedArticle = articles[0];
        expect(updatedArticle.status).toEqual("crawled");
        expect(updatedArticle.crawling!.crawledContentPath.toString()).toEqual("example.com/test");
      });
    });
  });
});
