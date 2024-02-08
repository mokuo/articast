import { promises as fs } from "fs";
import path from "path";

import ArticleHtmlCrawler from "../../../domain/Article/ArticleHtmlCrawler";
import { mockHttpRequest } from "../../__utils__/mockHttpRequest";

describe("ArticleHtmlCrawler", () => {
  const url = "https://www.publickey1.jp/blog/24/awsfinchwindows.html";

  describe("#getSimpleHtml", () => {
    it("URL にアクセスし、不要なタグを削除した HTML を返す", async () => {
      // setup
      await mockHttpRequest(url, "tests/__fixtures__/html/www.publickey1.jp/blog/24/awsfinchwindows.html");

      // test
      const crawler = new ArticleHtmlCrawler();
      const html = await crawler.getSimpleHtml(url);

      const expectedHtml = await fs.readFile(
        path.resolve("tests/__fixtures__/html/www.publickey1.jp/blog/24/awsfinchwindows.simple.html"),
        "utf-8",
      );

      expect(html).toEqual(expectedHtml);
    });
  });
});
