import "reflect-metadata";
import { injectable } from "tsyringe";

import PublickeyCrawler from "./crawlers/PublickeyCrawler";

export interface IArticleCrawler {
  readonly blogFeedUrl: string;
  getText(url: string): Promise<string>;
}

@injectable()
export default class ArticleCrawlerBuilder {
  // NOTE: 新しいクローラーを実装したら、ここに追加する
  private crawlers: IArticleCrawler[] = [new PublickeyCrawler()];

  getCrawler(blogFeedUrl: string): IArticleCrawler {
    const foundCrawler = this.crawlers.find((crawler) => crawler.blogFeedUrl === blogFeedUrl);
    if (foundCrawler === undefined) {
      throw new Error(`crawler not found: ${blogFeedUrl}`);
    }
    return foundCrawler;
  }
}
