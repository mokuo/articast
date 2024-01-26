import BlogFeed from "../../domain/BlogFeed/BlogFeed";
import IBlogFeedRepo from "../../domain/BlogFeed/IBlogFeedRepo";
import { PrismaTxClient } from "../../prisma/utils";

export default class BlogFeedRepo implements IBlogFeedRepo {
  async bulkInsert(prismaClient: PrismaTxClient, blogFeeds: BlogFeed[]): Promise<void> {
    await prismaClient.blogFeed.createMany({
      data: blogFeeds.map((blogFeed) => ({
        url: blogFeed.url,
        title: blogFeed.title,
      })),
    });
  }
}
