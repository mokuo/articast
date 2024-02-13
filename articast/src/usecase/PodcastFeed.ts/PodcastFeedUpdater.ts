import "reflect-metadata";
import { injectable } from "tsyringe";

import EpisodeAudioRepo from "../../infrastructure/EpisodeAudio/EpisodeAudioRepo";
import PodcastFeedStorage from "../../infrastructure/PodcastFeed/PodcastFeedStorage";
import { PrismaTxClient } from "../../prisma/utils";

@injectable()
export default class PodcastFeedUpdater {
  constructor(private episodeAudioRepo: EpisodeAudioRepo, private podcastFeedStorage: PodcastFeedStorage) {}

  async update(prismaClient: PrismaTxClient, blogFeedUrl: string) {
    // 未配信の EpisodeAudio をすべて取得する
    // PodcastFeedItem をすべて取得する
    // PodcastFeedItem を新規作成する
    // xml を更新する
    // PodcastFeedItem を保存する
  }
}
