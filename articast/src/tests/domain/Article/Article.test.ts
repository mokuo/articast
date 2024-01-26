import { ZodError } from "zod";

import Article from "../../../domain/Article/Article";

describe("Article", () => {
  describe(".createNew", () => {
    it("新規記事を作成する", () => {
      const article = Article.createNew({
        url: "https://example.com",
        title: "title",
        publishedAt: new Date("2020-01-01T00:00:00Z"),
        blogFeedUrl: "https://example.com/feed",
      });

      expect(article.url).toBe("https://example.com");
      expect(article.title).toBe("title");
      expect(article.publishedAt).toEqual(new Date("2020-01-01T00:00:00Z"));
      expect(article.status).toBe("uncrawled");
      expect(article.blogFeedUrl).toBe("https://example.com/feed");
    });
  });

  describe(".reconstruct", () => {
    describe("正常系", () => {
      it("既存の記事を再構築する", () => {
        const article = Article.reconstruct({
          url: "https://example.com",
          title: "title",
          publishedAt: new Date("2020-01-01T00:00:00Z"),
          status: "uncrawled",
          blogFeedUrl: "https://example.com/feed",
        });

        expect(article.url).toBe("https://example.com");
        expect(article.title).toBe("title");
        expect(article.publishedAt).toEqual(new Date("2020-01-01T00:00:00Z"));
        expect(article.status).toBe("uncrawled");
        expect(article.blogFeedUrl).toBe("https://example.com/feed");
      });
    });

    describe("異常系", () => {
      it("statusが不正な値の場合、エラーを投げる", () => {
        expect(() => {
          Article.reconstruct({
            url: "https://example.com",
            title: "title",
            publishedAt: new Date("2020-01-01T00:00:00Z"),
            status: "invalid",
            blogFeedUrl: "https://example.com/feed",
          });
        }).toThrow(ZodError);
      });
    });
  });
});
