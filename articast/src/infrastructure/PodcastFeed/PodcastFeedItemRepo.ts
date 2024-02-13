import IPodcastFeedItemRepo from "../../domain/PodcastFeed/IPodcastFeedItemRepo";
import PodcastFeedItem from "../../domain/PodcastFeed/PodcastFeedItem";
import { PrismaTxClient, TransactionClient } from "../../prisma/utils";
import { chunk } from "../../utils/array-utils";

export default class PodcastFeedItemRepo implements IPodcastFeedItemRepo {
  async bulkInsert(transactionClient: TransactionClient, items: PodcastFeedItem[]): Promise<void> {
    for (const chunkedItems of chunk(items, 5)) {
      await transactionClient.podcastFeedItem.createMany({
        data: chunkedItems.map((item) => ({
          title: item.title,
          enclosureUrl: item.enclosureUrl,
          enclosureLength: item.enclosureLength,
          enclosureType: item.enclosureType,
          guid: item.guid,
          pubDate: item.pubDate,
          description: item.description,
        })),
      });
    }
  }

  async findAll(prismaClient: PrismaTxClient): Promise<PodcastFeedItem[]> {
    const prismaItems = await prismaClient.podcastFeedItem.findMany();
    return prismaItems.map((prismaItem) =>
      PodcastFeedItem.reconstruct({
        title: prismaItem.title,
        enclosureUrl: prismaItem.enclosureUrl,
        enclosureLength: prismaItem.enclosureLength,
        enclosureType: prismaItem.enclosureType,
        guid: prismaItem.guid,
        pubDate: prismaItem.pubDate,
        description: prismaItem.description,
      }),
    );
  }
}
