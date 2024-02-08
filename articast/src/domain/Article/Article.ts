import { z } from "zod";

import ArticleCrawling from "./ArticleCrawling";
import CrawledContentPath from "./CrawledContentPath";

const ARTICLE_STATUS = ["uncrawled", "crawled", "converted"] as const;
const ArticleStatusEnum = z.enum(ARTICLE_STATUS);
export type ArticleStatus = z.infer<typeof ArticleStatusEnum>;

const transitions: Record<ArticleStatus, ArticleStatus[]> = {
  uncrawled: ["crawled"],
  crawled: ["converted"],
  converted: [],
};

export default class Article {
  readonly url: string;
  readonly title: string;
  readonly publishedAt: Date;
  private _status: ArticleStatus;
  readonly blogFeedUrl: string;
  private _crawling?: ArticleCrawling;

  public get status(): string {
    return this._status;
  }

  public get crawling(): ArticleCrawling | undefined {
    return this._crawling;
  }

  private constructor({
    url,
    title,
    publishedAt,
    status,
    blogFeedUrl,
    crawling,
  }: {
    url: string;
    title: string;
    publishedAt: Date;
    status: ArticleStatus;
    blogFeedUrl: string;
    crawling?: ArticleCrawling;
  }) {
    this.url = url;
    this.title = title;
    this.publishedAt = publishedAt;
    this._status = status;
    this.blogFeedUrl = blogFeedUrl;
    this._crawling = crawling;
  }

  static createNew({
    url,
    title,
    publishedAt,
    blogFeedUrl,
  }: {
    url: string;
    title: string;
    publishedAt: Date;
    blogFeedUrl: string;
  }) {
    return new Article({
      url,
      title,
      publishedAt,
      status: "uncrawled",
      blogFeedUrl,
    });
  }

  static reconstruct({
    url,
    title,
    publishedAt,
    status,
    blogFeedUrl,
    crawling,
  }: {
    url: string;
    title: string;
    publishedAt: Date;
    status: string;
    blogFeedUrl: string;
    crawling?: ArticleCrawling;
  }) {
    return new Article({
      url,
      title,
      publishedAt,
      status: ArticleStatusEnum.parse(status),
      blogFeedUrl,
      crawling: crawling,
    });
  }

  saveCrawledContentPath(crawledContentPath: CrawledContentPath) {
    if (this._status !== "uncrawled") {
      throw new Error("クローリング済みの記事です");
    }

    this._crawling = ArticleCrawling.createNew({ crawledContentPath });
    this._status = "crawled";
  }
}
