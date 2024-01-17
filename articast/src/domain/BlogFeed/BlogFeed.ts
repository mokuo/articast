export default class BlogFeed {
  public readonly id: string;
  public readonly url: string;
  public readonly title: string;

  constructor({ id, url, title }: { id: string; url: string; title: string }) {
    this.id = id;
    this.url = url;
    this.title = title;
  }
}

export const publickeyFeed = new BlogFeed({
  id: "tag:www.publickey1.jp,2011-12-29://2",
  url: "https://www.publickey1.jp/atom.xml",
  title: "Publickey",
});
