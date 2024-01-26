export default class BlogFeed {
  public readonly url: string;
  public readonly title: string;

  constructor({ url, title }: { url: string; title: string }) {
    this.url = url;
    this.title = title;
  }
}

export const publickeyFeed = new BlogFeed({
  url: "https://www.publickey1.jp/atom.xml",
  title: "Publickey",
});
