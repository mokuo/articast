import { TransactionClient } from "../../prisma/utils";

import Article from "./Article";

export default interface IArticleRepo {
  bulkInsertOrSkip(transactionClient: TransactionClient, articles: Article[]): Promise<void>;
}
