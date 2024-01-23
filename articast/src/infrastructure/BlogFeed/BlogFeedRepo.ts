import { PrismaClient } from "@prisma/client";

import BlogFeed from "../../domain/BlogFeed/BlogFeed";
import IBlogFeedRepo from "../../domain/BlogFeed/IBlogFeedRepo";

export default class BlogFeedRepo implements IBlogFeedRepo {
  async bulkInsert(prismaClient: PrismaClient, blogFeeds: BlogFeed[]): Promise<void> {
    await prismaClient.blogFeed.createMany({
      data: blogFeeds.map((blogFeed) => ({
        url: blogFeed.url,
        title: blogFeed.title,
      })),
    });
  }
}
