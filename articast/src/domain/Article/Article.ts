import ArticleSource from "./ArticleSource";

type ArticleStatus = "notCrawled" | "crawled" | "converted";

export default class Article {
  public readonly url: string;
  public readonly title: string;
  public readonly updatedAt: Date;
  public readonly status: ArticleStatus;
  public readonly source: ArticleSource;

  constructor({
    url,
    title,
    updatedAt,
    status,
    source,
  }: {
    url: string;
    title: string;
    updatedAt: Date;
    status: ArticleStatus;
    source: ArticleSource;
  }) {
    this.url = url;
    this.title = title;
    this.updatedAt = updatedAt;
    this.status = status;
    this.source = source;
  }
}
