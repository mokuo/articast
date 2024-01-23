import BlogFeed from "./BlogFeed";
import { PrismaClient } from "@prisma/client";

export default interface IBlogFeedRepo {
  insertAll(prismaClient: PrismaClient, blogFeeds: BlogFeed[]): Promise<void>;
}
