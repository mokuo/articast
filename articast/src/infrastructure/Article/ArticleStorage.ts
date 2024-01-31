import { URL } from "url";

import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

import IArticleStorage from "../../domain/Article/IArticleStorage";
import { s3Client } from "../../utils/aws-clients";

export const ARTICLES_BUCKET_NAME = "articast-articles";

export default class ArticleStorage implements IArticleStorage {
  async upload(articleUrl: string, text: string): Promise<void> {
    const url = new URL(articleUrl);
    const command = new PutObjectCommand({
      Bucket: ARTICLES_BUCKET_NAME,
      Key: `${url.host}${url.pathname}`,
      Body: text,
    });
    await s3Client.send(command);
  }

  async download(articleUrl: string): Promise<string> {
    const url = new URL(articleUrl);
    const command = new GetObjectCommand({
      Bucket: ARTICLES_BUCKET_NAME,
      Key: `${url.host}${url.pathname}`,
    });
    const res = await s3Client.send(command);
    const text = await res.Body?.transformToString();
    if (text === undefined) {
      throw new Error("Failed to download article.");
    }
    return text;
  }
}
