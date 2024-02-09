import { randomUUID } from "crypto";

import { z } from "zod";

const EPISODE_AUDIO_STATUS = ["generated", "streamed"] as const;
const EpisodeAudioStatusEnum = z.enum(EPISODE_AUDIO_STATUS);
export type EpisodeAudioStatus = z.infer<typeof EpisodeAudioStatusEnum>;

export default class EpisodeAudio {
  readonly id: string;
  readonly audioFilePath: string;
  readonly generatedAt: Date;
  readonly status: EpisodeAudioStatus;
  readonly blogFeedUrl: string;
  readonly articleUrls: string[];

  private constructor({
    id,
    audioFilePath,
    generatedAt,
    status,
    blogFeedUrl,
    articleUrls,
  }: {
    id: string;
    audioFilePath: string;
    generatedAt: Date;
    status: EpisodeAudioStatus;
    blogFeedUrl: string;
    articleUrls: string[];
  }) {
    this.id = id;
    this.audioFilePath = audioFilePath;
    this.generatedAt = generatedAt;
    this.status = status;
    this.blogFeedUrl = blogFeedUrl;
    this.articleUrls = articleUrls;
  }

  static createNew({
    audioFilePath,
    blogFeedUrl,
    articleUrls,
  }: {
    audioFilePath: string;
    blogFeedUrl: string;
    articleUrls: string[];
  }) {
    return new EpisodeAudio({
      id: randomUUID(),
      audioFilePath,
      generatedAt: new Date(),
      status: "generated",
      blogFeedUrl,
      articleUrls,
    });
  }

  static reconstruct({
    id,
    audioFilePath,
    generatedAt,
    status,
    blogFeedUrl,
    articleUrls,
  }: {
    id: string;
    audioFilePath: string;
    generatedAt: Date;
    status: string;
    blogFeedUrl: string;
    articleUrls: string[];
  }) {
    return new EpisodeAudio({
      id,
      audioFilePath,
      generatedAt,
      status: EpisodeAudioStatusEnum.parse(status),
      blogFeedUrl,
      articleUrls,
    });
  }
}
