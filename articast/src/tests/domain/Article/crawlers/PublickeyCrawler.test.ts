import PublickeyCrawler from "../../../../domain/Article/crawlers/PublickeyCrawler";
import { mockHttpRequest } from "../../../__utils__/mockHttpRequest";
import { readLocalFile } from "../../../__utils__/readLocalFile";

describe("PublickeyCrawler", () => {
  const crawler = new PublickeyCrawler();

  describe("#crawl", () => {
    const url = "https://www.publickey1.jp/blog/24/javascripttypescriptosbun_shelljavascriptbun.html";

    test("should return article text", async () => {
      // setup
      await mockHttpRequest(
        url,
        "tests/__fixtures__/html/www.publickey1.jp/blog/24/javascripttypescriptosbun_shelljavascriptbun.html",
      );

      // test
      const text = await crawler.getText(url);
      const expected = await readLocalFile(
        "tests/__fixtures__/html/www.publickey1.jp/blog/24/javascripttypescriptosbun_shelljavascriptbun.txt",
      );
      expect(text).toEqual(expected);
    });
  });
});
