import Article from "../../../domain/Article/Article";
import { publickeyFeed } from "../../../domain/BlogFeed/BlogFeed";
import EpisodeAudio from "../../../domain/EpisodeAudio/EpisodeAudio";
import ArticleRepo from "../../../infrastructure/Article/ArticleRepo";
import BlogFeedRepo from "../../../infrastructure/BlogFeed/BlogFeedRepo";
import EpisodeAudioRepo from "../../../infrastructure/EpisodeAudio/EpisodeAudioRepo";

describe("EpisodeAudioRepo", () => {
  describe("#insert, #findAll", () => {
    it("EpisodeAudio を作成する", async () => {
      // setup
      const prismaClient = jestPrisma.client;

      const blogFeedRepo = new BlogFeedRepo();
      await blogFeedRepo.bulkInsert(prismaClient, [publickeyFeed]);

      const articleRepo = new ArticleRepo();
      const article = Article.createNew({
        url: "https://example.com/post.html",
        title: "title",
        blogFeedUrl: publickeyFeed.url,
        publishedAt: new Date("2020-01-01T00:00:00Z"),
      });
      await articleRepo.bulkInsertOrSkip(prismaClient, [article]);

      // test
      const episodeAudioRepo = new EpisodeAudioRepo();
      const episodeAudio = EpisodeAudio.createNew({
        audioFilePath: "hoge",
        blogFeedUrl: publickeyFeed.url,
        articleUrls: [article.url],
      });
      await episodeAudioRepo.insert(prismaClient, episodeAudio);

      const foundEpisodeAudios = await episodeAudioRepo.findAll(prismaClient, {
        blogFeedUrl: publickeyFeed.url,
        status: "generated",
      });
      expect(foundEpisodeAudios.length).toEqual(1);
      expect(foundEpisodeAudios[0].audioFilePath).toEqual("hoge");
    });
  });
});
