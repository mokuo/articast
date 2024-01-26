type ArticleStatus = "notCrawled" | "crawled" | "converted";

export default class Article {
  public readonly url: string;
  public readonly title: string;
  public readonly publishedAt: Date;
  public readonly status: ArticleStatus;
  public readonly blogFeedUrl: string;

  constructor({
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
    this.url = url;
    this.title = title;
    this.publishedAt = publishedAt;
    this.status = "notCrawled";
    this.blogFeedUrl = blogFeedUrl;
  }
}
