import "reflect-metadata";
import { injectable } from "tsyringe";

import Article from "../../domain/Article/Article";
import ArticleRepo from "../../infrastructure/Article/ArticleRepo";
import ArticleStorage from "../../infrastructure/Article/ArticleStorage";
import { PrismaTxClient } from "../../prisma/utils";

@injectable()
export default class TextToSpeechConverter {
  constructor(private articleRepo: ArticleRepo, private articleStorage: ArticleStorage) {}

  async convert(prismaClient: PrismaTxClient, blogFeedUrl: string) {
    // crawled の articles をすべて取ってくる
    const articles = await this.articleRepo.findAll(prismaClient, { blogFeedUrl, status: "crawled" });
    const articleTexts = await this.getArticleTexts(articles);
    // テキストを生成
    // 音声変換
    // 音声保存、記事を converted にする
  }

  // 後続の処理のため、順番通りにテキストを取得して返す
  private async getArticleTexts(articles: Article[]) {
    const texts: string[] = [];
    for (const article of articles) {
      const downloadedText = await this.articleStorage.download(article.crawling!.crawledContentPath);
      texts.push(downloadedText);
    }
    return texts;
  }
}
