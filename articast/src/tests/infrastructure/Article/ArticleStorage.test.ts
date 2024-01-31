import ArticleStorage, { ARTICLES_BUCKET_NAME } from "../../../infrastructure/Article/ArticleStorage";
import { deleteObject } from "../../__utils__/S3Commands";

describe("ArticleStorage", () => {
  describe("#upload", () => {
    const articleStorage = new ArticleStorage();

    afterEach(async () => {
      await deleteObject(ARTICLES_BUCKET_NAME, "example.com/article");
    });

    it("uploads text to S3", async () => {
      const url = "https://example.com/article";
      const text = "This is a text.";

      await articleStorage.upload(url, text);
      const downloadText = await articleStorage.download(url);

      expect(text).toEqual(downloadText);
    });
  });
});
