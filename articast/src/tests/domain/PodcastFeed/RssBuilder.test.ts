import { articastChannel } from "../../../domain/PodcastFeed/PodcastFeedChannel";
import PodcastFeedItem from "../../../domain/PodcastFeed/PodcastFeedItem";
import RssBuilder from "../../../domain/PodcastFeed/RssBuilder";

describe("RssBuilder", () => {
  describe("#build", () => {
    it("RSS フィードのテキストを生成する", () => {
      const builder = new RssBuilder();
      const item = PodcastFeedItem.createNew({
        blogFeedTitle: "ブログタイトル",
        articles: [],
        enclosureUrl: "https://example.com/episode1.mp3",
        enclosureLength: 100,
      });
      const rss = builder.build(articastChannel, [item]);
      console.log(rss);
    });
  });
});
