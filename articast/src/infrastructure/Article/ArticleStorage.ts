import { URL } from "url";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import IArticleStorage from "../../domain/Article/IArticleStorage";

export default class ArticleStorage implements IArticleStorage {
  async upload(articleUrl: string, text: string): Promise<void> {
    const url = new URL(articleUrl);
    const client = new S3Client({ region: "ap-northeast-1" });
    const command = new PutObjectCommand({
      Bucket: "articast-articles",
      Key: `${url.host}${url.pathname}`,
      Body: text,
    });
    await client.send(command);
  }
}
