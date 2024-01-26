import "reflect-metadata";
import { injectable } from "tsyringe";

import Article from "../../domain/Article/Article";
import IArticleRepo from "../../domain/Article/IArticleRepo";
import { TransactionClient } from "../../prisma/utils";

@injectable()
export default class ArticleRepo implements IArticleRepo {
  public async bulkInsertOrSkip(transactionClient: TransactionClient, articles: Article[]): Promise<void> {
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
}
