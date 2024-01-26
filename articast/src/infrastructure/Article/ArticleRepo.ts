import "reflect-metadata";
import { injectable } from "tsyringe";

import Article from "../../domain/Article/Article";
import IArticleRepo, { FindAllParams } from "../../domain/Article/IArticleRepo";
import { PrismaTxClient, TransactionClient } from "../../prisma/utils";

@injectable()
export default class ArticleRepo implements IArticleRepo {
  async bulkInsertOrSkip(transactionClient: TransactionClient, articles: Article[]): Promise<void> {
    await Promise.all(
      articles.map(async (article) => {
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

  async findAll(prsimaClient: PrismaTxClient, params: FindAllParams): Promise<Article[]> {
    const { blogFeedUrl, status } = params;

    const result = await prsimaClient.article.findMany({
      where: {
        articleSource: {
          blogFeedUrl: blogFeedUrl ?? undefined,
        },
        status: status ?? undefined,
      },
      include: {
        articleSource: true,
      },
    });

    return result.map((article) => {
      return Article.reconstruct({
        url: article.url,
        title: article.title,
        publishedAt: article.publishedAt,
        status: article.status,
        blogFeedUrl: article.articleSource!.blogFeedUrl,
      });
    });
  }
}
