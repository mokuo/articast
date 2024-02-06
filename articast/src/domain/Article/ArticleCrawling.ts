import CrawledContentPath from "./CrawledContentPath";

export default class ArticleCrawling {
  readonly crawledContentPath: CrawledContentPath;
  readonly crawledAt: Date;

  private constructor({ crawledContentPath, crawledAt }: { crawledContentPath: CrawledContentPath; crawledAt: Date }) {
    this.crawledContentPath = crawledContentPath;
    this.crawledAt = crawledAt;
  }

  static createNew({ crawledContentPath }: { crawledContentPath: CrawledContentPath }) {
    return new ArticleCrawling({
      crawledContentPath,
      crawledAt: new Date(),
    });
  }

  static reconstruct({ crawledContentPath, crawledAt }: { crawledContentPath: string; crawledAt: Date }) {
    return new ArticleCrawling({
      crawledContentPath: CrawledContentPath.reconstruct(crawledContentPath),
      crawledAt,
    });
  }
}
