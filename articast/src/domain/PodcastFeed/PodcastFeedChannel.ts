import PodcastFeedItem from "./PodcastFeedItem";

export default class PodcastFeedChannel {
  readonly title: string;
  // readonly itunesImage: string;
  readonly description: string;
  readonly itunesEmail: string;
  readonly itunesAuthor: string;
  readonly language: string;
  readonly itunesCategory: string;
  readonly itunesExplicit: "True" | "False";
  readonly items: PodcastFeedItem[];

  constructor({
    title,
    // itunesImage,
    description,
    itunesEmail,
    itunesAuthor,
    language,
    itunesCategory,
    itunesExplicit,
    items,
  }: {
    title: string;
    // itunesImage: string;
    description: string;
    itunesEmail: string;
    itunesAuthor: string;
    language: string;
    itunesCategory: string;
    itunesExplicit: "True" | "False";
    items: PodcastFeedItem[];
  }) {
    this.title = title;
    // // this.itunesImage = itunesImage;
    this.description = description;
    this.itunesEmail = itunesEmail;
    this.itunesAuthor = itunesAuthor;
    this.language = language;
    this.itunesCategory = itunesCategory;
    this.itunesExplicit = itunesExplicit;
    this.items = items;
  }
}

export const articastChannel = new PodcastFeedChannel({
  title: "Article2Podcast",
  description: "Web 上のテック系記事を自動音声で配信するポッドキャスト",
  itunesEmail: "tennis10988.yk@gmail.com",
  itunesAuthor: "mokuo",
  language: "ja",
  itunesCategory: "Tech News",
  itunesExplicit: "False",
  items: [],
});
