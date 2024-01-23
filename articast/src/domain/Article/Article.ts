type ArticleStatus = "notCrawled" | "crawled" | "converted";

export default class Article {
  public readonly url: string;
  public readonly title: string;
  public readonly updatedAt: Date;
  public readonly status: ArticleStatus;
  public readonly blogFeedUrl: string;

  constructor({ url, title, blogFeedUrl }: { url: string; title: string; blogFeedUrl: string }) {
    this.url = url;
    this.title = title;
    this.updatedAt = new Date();
    this.status = "notCrawled";
    this.blogFeedUrl = blogFeedUrl;
  }
}
