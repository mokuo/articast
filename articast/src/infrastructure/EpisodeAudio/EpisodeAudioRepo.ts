import "reflect-metadata";
import { injectable } from "tsyringe";

import EpisodeAudio from "../../domain/EpisodeAudio/EpisodeAudio";
import IEpisodeAudioRepo from "../../domain/EpisodeAudio/IEpisodeAudioRepo";
import { PrismaTxClient } from "../../prisma/utils";

@injectable()
export default class EpisodeAudioRepo implements IEpisodeAudioRepo {
  async insert(prismaClient: PrismaTxClient, episodeAudio: EpisodeAudio): Promise<void> {
    await prismaClient.episodeAudio.create({
      data: {
        id: episodeAudio.id,
        audioFilePath: episodeAudio.audioFilePath,
        generatedAt: episodeAudio.generatedAt,
        status: episodeAudio.status,
        episodeAudioOrigin: {
          create: {
            blogFeedUrl: episodeAudio.blogFeedUrl,
          },
        },
        episodeAudioArticles: {
          createMany: {
            data: episodeAudio.articleUrls.map((articleUrl) => ({
              articleUrl,
            })),
          },
        },
      },
    });
  }

  async findAll(
    prismaClient: PrismaTxClient,
    { blogFeedUrl, status }: { blogFeedUrl: string; status: "generated" | "streamed" },
  ): Promise<EpisodeAudio[]> {
    const prismaEpisodeAudios = await prismaClient.episodeAudio.findMany({
      where: {
        status,
        episodeAudioOrigin: {
          blogFeedUrl,
        },
      },
      include: {
        episodeAudioOrigin: true,
        episodeAudioArticles: true,
      },
    });
    return prismaEpisodeAudios.map((ea) =>
      EpisodeAudio.reconstruct({
        id: ea.id,
        audioFilePath: ea.audioFilePath,
        generatedAt: ea.generatedAt,
        status: ea.status,
        blogFeedUrl: ea.episodeAudioOrigin!.blogFeedUrl,
        articleUrls: ea.episodeAudioArticles.map((eaa) => eaa.articleUrl),
      }),
    );
  }
}
