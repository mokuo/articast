import "reflect-metadata";
import { injectable } from "tsyringe";

import Article from "../../domain/Article/Article";
import EpisodeAudio from "../../domain/EpisodeAudio/EpisodeAudio";
import SsmlBuilder, { ArticleAndHtml } from "../../domain/EpisodeAudio/SsmlBuilder";
import ArticleRepo from "../../infrastructure/Article/ArticleRepo";
import ArticleStorage from "../../infrastructure/Article/ArticleStorage";
import EpisodeAudioRepo from "../../infrastructure/EpisodeAudio/EpisodeAudioRepo";
import TextToSpeechApiClient from "../../infrastructure/EpisodeAudio/TextToSpeechApiClient";
import { PrismaTxClient } from "../../prisma/utils";
import { chunk } from "../../utils/array-utils";

@injectable()
export default class TextToSpeechConverter {
  constructor(
    private articleRepo: ArticleRepo,
    private articleStorage: ArticleStorage,
    private ssmlBuilder: SsmlBuilder,
    private apiClient: TextToSpeechApiClient,
    private episodeAudioRepo: EpisodeAudioRepo,
  ) {}

  async convert(prismaClient: PrismaTxClient, blogFeedUrl: string) {
    // crawled の articles をすべて取ってくる
    const articles = await this.articleRepo.findAll(prismaClient, { blogFeedUrl, status: "crawled" });
    const articleAndHtmlList = await this.getArticleAndHtmlList(articles);
    // テキストを生成
    const ssml = this.ssmlBuilder.build(blogFeedUrl, articleAndHtmlList);
    // 音声変換
    const audioFilePath = await this.apiClient.request(ssml, blogFeedUrl);
    // 音声ファイルパス保存
    const episodeAudio = EpisodeAudio.createNew({
      audioFilePath,
      blogFeedUrl,
      articleUrls: articles.map((article) => article.url),
    });
    await this.episodeAudioRepo.insert(prismaClient, episodeAudio);
    // Article のステータスを converted にする
    articles.forEach((article) => article.markAsConverted());
    await this.articleRepo.bulkInsert(prismaClient, articles);
  }

  private async getArticleAndHtmlList(articles: Article[]): Promise<ArticleAndHtml[]> {
    const articleAndHtmlList: ArticleAndHtml[] = [];
    for (const chunkedArticles of chunk(articles, 5)) {
      await Promise.all(
        chunkedArticles.map(async (article) => {
          const html = await this.articleStorage.download(article.crawling!.crawledContentPath);
          articleAndHtmlList.push({ article, html });
        }),
      );
    }
    return articleAndHtmlList;
  }
}
