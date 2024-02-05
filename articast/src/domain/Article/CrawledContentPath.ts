import { URL } from "url";

export default class CrawledContentPath {
  private constructor(private readonly path: string) {}

  static createNew(articleUrl: string): CrawledContentPath {
    const url = new URL(articleUrl);
    return new CrawledContentPath(`${url.host}${url.pathname}`);
  }

  static reconstruct(path: string): CrawledContentPath {
    return new CrawledContentPath(path);
  }

  toString(): string {
    return this.path;
  }
}
