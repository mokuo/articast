import PublickeyCrawler from "./crawlers/PublickeyCrawler";

export interface IArticleCrawler {
  readonly blogFeedUrl: string;
  crawl(url: string): Promise<string>;
}

export default class ArticleCrawlerBuilder {
  private crawlers: IArticleCrawler[] = [new PublickeyCrawler()];

  build(blogFeedUrl: string): IArticleCrawler {
    const foundCrawler = this.crawlers.find((crawler) => crawler.blogFeedUrl === blogFeedUrl);
    if (foundCrawler === undefined) {
      throw new Error(`crawler not found: ${blogFeedUrl}`);
    }
    return foundCrawler;
  }
}
