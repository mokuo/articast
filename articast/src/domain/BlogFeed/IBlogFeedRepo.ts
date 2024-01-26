import { PrismaTxClient } from "../../prisma/utils";

import BlogFeed from "./BlogFeed";

export default interface IBlogFeedRepo {
  bulkInsert(prismaClient: PrismaTxClient, blogFeeds: BlogFeed[]): Promise<void>;
}
