import { PrismaClient } from "@prisma/client";

import Article from "./Article";

export default interface IArticleRepo {
  bulkInsertOrSkip(prismaClient: PrismaClient, articles: Article[]): Promise<void>;
}
