import { publickeyFeed } from "../../../domain/BlogFeed/BlogFeed";
import BlogFeedRepo from "../../../infrastructure/BlogFeed/BlogFeedRepo";

describe("BlogFeedRepo", () => {
  describe("#insertAll", () => {
    const prismaClient = jestPrisma.client;

    it("inserts all blog feeds", async () => {
      const blogFeedRepo = new BlogFeedRepo();
      await blogFeedRepo.bulkInsert(prismaClient, [publickeyFeed]);
      const blogFeeds = await prismaClient.blogFeed.findMany();

      expect(blogFeeds.length).toBe(1);
      expect(blogFeeds[0].url).toBe(publickeyFeed.url);
      expect(blogFeeds[0].title).toBe(publickeyFeed.title);
    });
  });
});
