import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import "reflect-metadata";
import { injectable } from "tsyringe";

import CrawledContentPath from "../../domain/Article/CrawledContentPath";
import IArticleStorage from "../../domain/Article/IArticleStorage";
import { s3Client } from "../../utils/aws-clients";

export const ARTICLES_BUCKET_NAME = "articast-articles";

@injectable()
export default class ArticleStorage implements IArticleStorage {
  async upload(path: CrawledContentPath, text: string): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: ARTICLES_BUCKET_NAME,
      Key: path.toString(),
      Body: text,
    });
    await s3Client.send(command);
  }

  async download(path: CrawledContentPath): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: ARTICLES_BUCKET_NAME,
      Key: path.toString(),
    });
    const res = await s3Client.send(command);
    const text = await res.Body?.transformToString();
    if (text === undefined) {
      throw new Error("Failed to download article.");
    }
    return text;
  }
}
