import CrawledContentPath from "../../../domain/Article/CrawledContentPath";

describe("CrawledContentPath", () => {
  describe(".createNew", () => {
    describe("正しいURLを渡した時", () => {
      it("CrawledContentPath を返す", () => {
        const path = CrawledContentPath.createNew("https://example.com/test1/");
        expect(path.toString()).toEqual("example.com/test1/");
      });
    });

    describe("不正なURLを渡した時", () => {
      it("エラーになる", () => {
        expect(() => {
          CrawledContentPath.createNew("hoge");
        }).toThrow(new TypeError("Invalid URL"));
      });
    });
  });
});
