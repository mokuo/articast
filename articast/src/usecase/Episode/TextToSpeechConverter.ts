import "reflect-metadata";
import { injectable } from "tsyringe";

import Article from "../../domain/Article/Article";
import SsmlBuilder, { ArticleAndHtml } from "../../domain/Episode/SsmlBuilder";
import ArticleRepo from "../../infrastructure/Article/ArticleRepo";
import ArticleStorage from "../../infrastructure/Article/ArticleStorage";
import TextToSpeechApiClient from "../../infrastructure/Episode/TextToSpeechApiClient";
import { PrismaTxClient } from "../../prisma/utils";

@injectable()
export default class TextToSpeechConverter {
  constructor(
    private articleRepo: ArticleRepo,
    private articleStorage: ArticleStorage,
    private ssmlBuilder: SsmlBuilder,
    private apiClient: TextToSpeechApiClient,
  ) {}

  async convert(prismaClient: PrismaTxClient, blogFeedUrl: string) {
    // crawled の articles をすべて取ってくる
    const articles = await this.articleRepo.findAll(prismaClient, { blogFeedUrl, status: "crawled" });
    const articleAndHtmlList = await this.getArticleAndHtmlList(articles);
    // テキストを生成
    const ssml = this.ssmlBuilder.build(blogFeedUrl, articleAndHtmlList);
    // 音声変換
    const audioFilePath = await this.apiClient.request(ssml, blogFeedUrl);
    // 音声保存、記事を converted にする
  }

  // 後続の処理のため、順番通りにテキストを取得して返す
  private async getArticleAndHtmlList(articles: Article[]): Promise<ArticleAndHtml[]> {
    const articleAndHtmlList: ArticleAndHtml[] = [];
    for (const article of articles) {
      const html = await this.articleStorage.download(article.crawling!.crawledContentPath);
      articleAndHtmlList.push({ article, html });
    }
    return articleAndHtmlList;
  }
}
