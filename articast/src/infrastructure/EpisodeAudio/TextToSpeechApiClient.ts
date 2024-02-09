import { setTimeout } from "timers/promises";
import { URL } from "url";

import { PollyClient, StartSpeechSynthesisTaskCommand, GetSpeechSynthesisTaskCommand } from "@aws-sdk/client-polly";
import "reflect-metadata";
import { injectable } from "tsyringe";

import { appConfig } from "../../appConfig";
import ITextToSpeechApiClient from "../../domain/EpisodeAudio/ITextToSpeechApiClient";

export const AUDIO_FILES_BUCKET_NAME = "articles-audio-files";

// ref: https://docs.aws.amazon.com/ja_jp/polly/latest/dg/asynchronous.html
//      https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/polly/
//      https://docs.aws.amazon.com/ja_jp/sdk-for-javascript/v3/developer-guide/polly-examples.html
@injectable()
export default class TextToSpeechApiClient implements ITextToSpeechApiClient {
  private pollyClient: PollyClient;

  constructor() {
    this.pollyClient = new PollyClient({
      region: appConfig.awsRegion,
    });
  }

  async request(ssml: string, blogFeedUrl: string): Promise<string> {
    const url = new URL(blogFeedUrl); // ex) https://www.publickey1.jp/atom.xml
    // HACK: SnsTopicArn を指定すると、ステータス通知してもらえるかも
    const command = new StartSpeechSynthesisTaskCommand({
      OutputFormat: "mp3",
      OutputS3BucketName: AUDIO_FILES_BUCKET_NAME,
      OutputS3KeyPrefix: `${url.host}/${new Date().toISOString()}/`, // ex) www.publickey1.jp/2024-02-09T01:06:59.346Z/
      Text: ssml,
      TextType: "ssml",
      VoiceId: "Tomoko",
    });
    const res = await this.pollyClient.send(command);
    const synthesisTask = res.SynthesisTask!;

    let isCompleted = false;
    while (!isCompleted) {
      await setTimeout(3000);
      isCompleted = await this.isCompleted(synthesisTask.TaskId!);
    }

    return synthesisTask.OutputUri!.split(AUDIO_FILES_BUCKET_NAME)[1]; // ex) /www.publickey1.jp/2024-02-09T01:06:59.346Z/<task_id>.mp3
  }

  private async isCompleted(taskId: string): Promise<boolean> {
    const command = new GetSpeechSynthesisTaskCommand({
      TaskId: taskId,
    });
    const res = await this.pollyClient.send(command);
    const synthesisTask = res.SynthesisTask!;
    const status = synthesisTask.TaskStatus!;

    if (status === "failed") {
      throw new Error("音声合成タスクが失敗しました。");
    }

    return status == "completed";
  }
}
