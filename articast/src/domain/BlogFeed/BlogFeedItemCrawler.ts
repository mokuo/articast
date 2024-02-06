import Parser from "rss-parser";
import "reflect-metadata";
import { injectable } from "tsyringe";

import Article from "../Article/Article";

@injectable()
export default class BlogFeedItemCrawler {
  private parser: Parser;

  constructor() {
    this.parser = new Parser();
  }

  async getArticles(blogFeedItemUrl: string): Promise<Article[]> {
    const feed = await this.parser.parseURL(blogFeedItemUrl);
    return feed.items.map((item) => {
      return Article.createNew({
        url: item.link!,
        title: item.title || "",
        publishedAt: new Date(item.isoDate!),
        blogFeedUrl: blogFeedItemUrl,
      });
    });
  }
}
