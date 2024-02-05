import CrawledContentPath from "./CrawledContentPath";

export default interface IArticleStorage {
  upload(articleUrl: CrawledContentPath, text: string): Promise<void>;
  download(path: CrawledContentPath): Promise<string>;
}
