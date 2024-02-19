import "reflect-metadata";
import { Prisma, PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";

import { getBlogFeed } from "../../domain/BlogFeed/BlogFeed";
import EpisodeAudio from "../../domain/EpisodeAudio/EpisodeAudio";
import PodcastFeedItem from "../../domain/PodcastFeed/PodcastFeedItem";
import ArticleRepo from "../../infrastructure/Article/ArticleRepo";
import EpisodeAudioRepo from "../../infrastructure/EpisodeAudio/EpisodeAudioRepo";
import EpisodeAudioStorage from "../../infrastructure/EpisodeAudio/EpisodeAudioStorage";
import PodcastFeedItemRepo from "../../infrastructure/PodcastFeed/PodcastFeedItemRepo";
import PodcastFeedStorage from "../../infrastructure/PodcastFeed/PodcastFeedStorage";

@injectable()
export default class PodcastFeedUpdater {
  constructor(
    private episodeAudioRepo: EpisodeAudioRepo,
    private articleRepo: ArticleRepo,
    private episodeAudioStorage: EpisodeAudioStorage,
    private podcastFeedItemRepo: PodcastFeedItemRepo,
    private podcastFeedStorage: PodcastFeedStorage,
  ) {}

  async update(prismaClient: PrismaClient, blogFeedUrl: string) {
    // 未配信の EpisodeAudio をすべて取得する
    const audios = await this.episodeAudioRepo.findAll(prismaClient, { blogFeedUrl, status: "generated" });

    const blogFeed = getBlogFeed(blogFeedUrl);
    if (blogFeed === undefined) {
      throw new Error(`該当する BlogFeed がありません: ${blogFeedUrl}`);
    }
    // PodcastFeedItem を新規作成する
    const newItems = await Promise.all(
      audios.map(async (audio) => this.buildItem(prismaClient, audio, blogFeed.title)),
    );

    // PodcastFeedItem をすべて取得する
    const currentItems = await this.podcastFeedItemRepo.findAll(prismaClient);

    await prismaClient.$transaction(async (tx) => {
      // xml を更新する
      // PodcastFeedItem を保存する
      // EpisodeAudio のステータスを更新する
    });
  }

  private async buildItem(
    prismaClient: PrismaClient,
    audio: EpisodeAudio,
    blogFeedTitle: string,
  ): Promise<PodcastFeedItem> {
    const articles = await this.articleRepo.findAll(prismaClient, { articleUrls: audio.articleUrls });
    const enclosureLength = await this.episodeAudioStorage.getByteSize(audio.audioFilePath);

    // TODO: Item を作成して返す
    return PodcastFeedItem.createNew({
      blogFeedTitle,
      articles,
      enclosureUrl: this.episodeAudioStorage.getUrl(audio.audioFilePath),
      enclosureLength,
    });
  }
}
