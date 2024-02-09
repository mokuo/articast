import { PrismaTxClient } from "../../prisma/utils";

import EpisodeAudio, { EpisodeAudioStatus } from "./EpisodeAudio";

export default interface IEpisodeAudioRepo {
  insert(prismaClient: PrismaTxClient, episodeAudio: EpisodeAudio): Promise<void>;
  findAll(
    prismaClient: PrismaTxClient,
    params: {
      blogFeedUrl: string;
      status: EpisodeAudioStatus;
    },
  ): Promise<EpisodeAudio[]>;
}
