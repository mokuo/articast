import { z } from "zod";

const ARTICLE_STATUS = ["uncrawled", "crawled", "converted"] as const;
const ArticleStatusEnum = z.enum(ARTICLE_STATUS);
export type ArticleStatus = z.infer<typeof ArticleStatusEnum>;

export default class Article {
  public readonly url: string;
  public readonly title: string;
  public readonly publishedAt: Date;
  public readonly status: ArticleStatus;
  public readonly blogFeedUrl: string;

  private constructor({
    url,
    title,
    publishedAt,
    status,
    blogFeedUrl,
  }: {
    url: string;
    title: string;
    publishedAt: Date;
    status: ArticleStatus;
    blogFeedUrl: string;
  }) {
    this.url = url;
    this.title = title;
    this.publishedAt = publishedAt;
    this.status = status;
    this.blogFeedUrl = blogFeedUrl;
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
  }: {
    url: string;
    title: string;
    publishedAt: Date;
    status: string;
    blogFeedUrl: string;
  }) {
    return new Article({
      url,
      title,
      publishedAt,
      status: ArticleStatusEnum.parse(status),
      blogFeedUrl,
    });
  }
}
