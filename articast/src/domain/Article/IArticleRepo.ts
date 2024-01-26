import { PrismaTxClient, TransactionClient } from "../../prisma/utils";

import Article, { ArticleStatus } from "./Article";

export type FindAllParams = {
  blogFeedUrl?: string;
  status?: ArticleStatus;
};

export default interface IArticleRepo {
  bulkInsertOrSkip(transactionClient: TransactionClient, articles: Article[]): Promise<void>;
  findAll(prsimaClient: PrismaTxClient, params: FindAllParams): Promise<Article[]>;
}
