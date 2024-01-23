import BlogFeedRepo from "../../../infrastructure/BlogFeed/BlogFeedRepo";
import { publickeyFeed } from "../../../domain/BlogFeed/BlogFeed";

describe("BlogFeedRepo", () => {
  describe("#insertAll", () => {
    const prismaClient = jestPrisma.client;

    it("inserts all blog feeds", async () => {
      const blogFeedRepo = new BlogFeedRepo();
      await blogFeedRepo.insertAll(prismaClient, [publickeyFeed]);
      const blogFeeds = await prismaClient.blogFeed.findMany();

      expect(blogFeeds.length).toBe(1);
      expect(blogFeeds[0].url).toBe(publickeyFeed.url);
    });
  });
});
