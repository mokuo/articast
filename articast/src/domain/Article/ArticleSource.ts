export default class ArticleSource {
  public readonly blog_feed_id: string;
  public readonly blog_feed_entry_id: string;
  public readonly article_url: string;

  constructor({
    blog_feed_id,
    blog_feed_entry_id,
    article_url,
  }: {
    blog_feed_id: string;
    blog_feed_entry_id: string;
    article_url: string;
  }) {
    this.blog_feed_id = blog_feed_id;
    this.blog_feed_entry_id = blog_feed_entry_id;
    this.article_url = article_url;
  }
}
