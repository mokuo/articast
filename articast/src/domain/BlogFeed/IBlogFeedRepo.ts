import { PrismaClient } from "@prisma/client";

import BlogFeed from "./BlogFeed";

export default interface IBlogFeedRepo {
  bulkInsert(prismaClient: PrismaClient, blogFeeds: BlogFeed[]): Promise<void>;
}
