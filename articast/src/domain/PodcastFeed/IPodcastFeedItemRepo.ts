import { PrismaTxClient, TransactionClient } from "../../prisma/utils";

import PodcastFeedItem from "./PodcastFeedItem";

export default interface IPodcastFeedItemRepo {
  bulkInsert(transactionClient: TransactionClient, items: PodcastFeedItem[]): Promise<void>;
  findAll(prismaClient: PrismaTxClient): Promise<PodcastFeedItem[]>;
}
