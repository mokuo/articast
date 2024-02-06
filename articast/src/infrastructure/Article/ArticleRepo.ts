import "reflect-metadata";
import { injectable } from "tsyringe";

import Article from "../../domain/Article/Article";
import ArticleCrawling from "../../domain/Article/ArticleCrawling";
import IArticleRepo, { FindAllParams } from "../../domain/Article/IArticleRepo";
import { PrismaTxClient, TransactionClient } from "../../prisma/utils";
import { chunk } from "../../utils/array-utils";

@injectable()
export default class ArticleRepo implements IArticleRepo {
  async bulkInsertOrSkip(transactionClient: TransactionClient, articles: Article[]): Promise<void> {
    const chunkedArticles = chunk(articles, 5);
    for (const arts of chunkedArticles) {
      await Promise.all(
        arts.map(async (article) => {
          await transactionClient.article.create({
            data: {
              url: article.url,
              title: article.title,
              publishedAt: article.publishedAt,
              status: article.status,
              articleSource: {
                create: {
                  blogFeedUrl: article.blogFeedUrl,
                },
              },
            },
          });
        }),
      );
    }
  }

  async findAll(prismaClient: PrismaTxClient, params: FindAllParams): Promise<Article[]> {
    const { blogFeedUrl, status } = params;

    const result = await prismaClient.article.findMany({
      where: {
        articleSource: {
          blogFeedUrl: blogFeedUrl ?? undefined,
        },
        status: status ?? undefined,
      },
      include: {
        articleSource: true,
        articleCrawling: true,
      },
    });

    return result.map((article) => {
      return Article.reconstruct({
        url: article.url,
        title: article.title,
        publishedAt: article.publishedAt,
        status: article.status,
        blogFeedUrl: article.articleSource!.blogFeedUrl,
        crawling: article.articleCrawling
          ? ArticleCrawling.reconstruct({
              crawledContentPath: article.articleCrawling?.crawledContentPath,
              crawledAt: article.articleCrawling?.crawledAt,
            })
          : undefined,
      });
    });
  }

  async update(prismaClient: PrismaTxClient, article: Article): Promise<void> {
    await prismaClient.article.update({
      where: {
        url: article.url,
      },
      data: {
        title: article.title,
        status: article.status,
        articleCrawling: article.crawling && {
          upsert: {
            create: {
              crawledContentPath: article.crawling.crawledContentPath.toString(),
              crawledAt: article.crawling.crawledAt,
            },
            update: {
              crawledContentPath: article.crawling.crawledContentPath.toString(),
              crawledAt: article.crawling.crawledAt,
            },
          },
        },
      },
    });
  }
}
