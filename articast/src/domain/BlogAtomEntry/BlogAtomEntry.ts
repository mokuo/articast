export default class BlogAtomEntry {
  public readonly id: string;
  public readonly blogFeedId: string;
  public readonly title: string;
  public readonly updated: Date;
  public readonly pubslished: Date;
  public readonly summary: string;
  public readonly linkHref: string;

  constructor({
    id,
    blogFeedId,
    title,
    updated,
    pubslished,
    summary,
    linkHref,
  }: {
    id: string;
    blogFeedId: string;
    title: string;
    updated: Date;
    pubslished: Date;
    summary: string;
    linkHref: string;
  }) {
    this.id = id;
    this.blogFeedId = blogFeedId;
    this.title = title;
    this.updated = updated;
    this.pubslished = pubslished;
    this.summary = summary;
    this.linkHref = linkHref;
  }
}
