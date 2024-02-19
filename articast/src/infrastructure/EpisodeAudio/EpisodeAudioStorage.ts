import { HeadObjectCommand } from "@aws-sdk/client-s3";
import "reflect-metadata";
import { injectable } from "tsyringe";

import IEpisodeAudioStorage from "../../domain/EpisodeAudio/IEpisodeAudioStorage";
import { s3Client } from "../../utils/aws-clients";

import { AUDIO_FILES_BUCKET_NAME } from "./TextToSpeechApiClient";

@injectable()
export default class EpisodeAudioStorage implements IEpisodeAudioStorage {
  getUrl(audioFilePath: string): string {
    return `https://${AUDIO_FILES_BUCKET_NAME}.s3-ap-northeast-1.amazonaws.com${audioFilePath}`;
  }

  async getByteSize(audioFilePath: string): Promise<number> {
    const command = new HeadObjectCommand({
      Bucket: AUDIO_FILES_BUCKET_NAME,
      Key: audioFilePath,
    });

    const response = await s3Client.send(command);
    return response.ContentLength!;
  }
}
