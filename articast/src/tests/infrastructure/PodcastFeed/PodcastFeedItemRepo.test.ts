import { randomUUID } from "crypto";

import PodcastFeedItem from "../../../domain/PodcastFeed/PodcastFeedItem";
import PodcastFeedItemRepo from "../../../infrastructure/PodcastFeed/PodcastFeedItemRepo";

describe("PodcastFeedItemRepo", () => {
  describe("#bulkInsert, #findAll", () => {
    it("ポッドキャストフィードのアイテムを永続化し、再取得できる", async () => {
      const prismaClient = jestPrisma.client;

      const item = PodcastFeedItem.createNew({
        title: "エピソード1",
        enclosureUrl: "https://example.com/episode1.mp3",
        enclosureLength: 100,
        guid: randomUUID(),
        description: "エピソードの説明です。",
      });
      const repo = new PodcastFeedItemRepo();
      await repo.bulkInsert(prismaClient, [item]);

      const foundItems = await repo.findAll(prismaClient);
      expect(foundItems.length).toEqual(1);
      const foundItem = foundItems[0];

      expect(foundItem.title).toEqual(item.title);
      expect(foundItem.enclosureUrl).toEqual(item.enclosureUrl);
      expect(foundItem.enclosureLength).toEqual(item.enclosureLength);
      expect(foundItem.enclosureType).toEqual(item.enclosureType);
      expect(foundItem.guid).toEqual(item.guid);
      expect(foundItem.pubDate).toEqual(item.pubDate);
      expect(foundItem.description).toEqual(item.description);
    });
  });
});
