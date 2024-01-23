import { PrismaClient } from "@prisma/client";

import Article from "../../domain/Article/Article";
import IArticleRepo from "../../domain/Article/IArticleRepo";

export default class ArticleRepo implements IArticleRepo {
  public async bulkInsertOrSkip(prismaClient: PrismaClient, articles: Article[]): Promise<void> {
    await Promise.all(
      articles.map(async (article) => {
        await prismaClient.article.create({
          data: {
            url: article.url,
            title: article.title,
            updatedAt: article.updatedAt,
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
