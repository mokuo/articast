import { z } from "zod";

type EnclosureType = "audio/mpeg"; // ref: https://docs.aws.amazon.com/ja_jp/polly/latest/dg/API_SynthesizeSpeech.html#API_SynthesizeSpeech_ResponseSyntax
const AUDIO_MPEG: EnclosureType = "audio/mpeg";

export default class PodcastFeedItem {
  readonly title: string;
  readonly enclosureUrl: string;
  readonly enclosureLength: number;
  readonly enclosureType: EnclosureType;
  readonly guid: string;
  readonly pubDate: Date;
  readonly description: string;

  private constructor({
    title,
    enclosureUrl,
    enclosureLength,
    enclosureType,
    guid,
    pubDate,
    description,
  }: {
    title: string;
    enclosureUrl: string;
    enclosureLength: number;
    enclosureType: EnclosureType;
    guid: string;
    pubDate: Date;
    description: string;
  }) {
    this.title = title;
    this.enclosureUrl = enclosureUrl;
    this.enclosureLength = enclosureLength;
    this.enclosureType = enclosureType;
    this.guid = guid;
    this.pubDate = pubDate;
    this.description = description;
  }

  static createNew({
    title,
    enclosureUrl,
    enclosureLength,
    guid,
    description,
  }: {
    title: string;
    enclosureUrl: string;
    enclosureLength: number;
    guid: string;
    description: string;
  }) {
    return new PodcastFeedItem({
      title,
      enclosureUrl,
      enclosureLength,
      enclosureType: AUDIO_MPEG,
      guid,
      pubDate: new Date(),
      description,
    });
  }

  static reconstruct({
    title,
    enclosureUrl,
    enclosureLength,
    enclosureType,
    guid,
    pubDate,
    description,
  }: {
    title: string;
    enclosureUrl: string;
    enclosureLength: number;
    enclosureType: string;
    guid: string;
    pubDate: Date;
    description: string;
  }) {
    return new PodcastFeedItem({
      title,
      enclosureUrl,
      enclosureLength,
      enclosureType: z.literal(AUDIO_MPEG).parse(enclosureType),
      guid,
      pubDate,
      description,
    });
  }
}
