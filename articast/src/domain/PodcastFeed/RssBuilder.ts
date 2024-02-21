import { XMLBuilder } from "fast-xml-parser";

import PodcastFeedChannel from "./PodcastFeedChannel";
import PodcastFeedItem from "./PodcastFeedItem";

export default class RssBuilder {
  private xmlBuilder: XMLBuilder;

  constructor() {
    this.xmlBuilder = new XMLBuilder({
      ignoreAttributes: false,
      attributeNamePrefix: "@",
      format: true,
      // ref: https://github.com/NaturalIntelligence/fast-xml-parser/blob/master/docs/v4/3.XMLBuilder.md#unpairedtags
      suppressUnpairedNode: false,
      unpairedTags: ["enclosure"],
    });
  }

  // ref: https://help.apple.com/itc/podcasts_connect/#/itcbaf351599
  //      https://help.apple.com/itc/podcasts_connect/#/itcb54353390
  build(channel: PodcastFeedChannel, items: PodcastFeedItem[]): string {
    const xmlData = {
      "?xml": {
        "@version": "1.0",
        "@encoding": "UTF-8",
      },
      rss: {
        "@version": "2.0",
        "@xmlns:itunes": "http://www.itunes.com/dtds/podcast-1.0.dtd",
        "@xmlns:content": "http://purl.org/rss/1.0/modules/content/",
        channel: {
          title: channel.title,
          description: channel.description,
          "itunes:image": channel.itunesImage,
          language: channel.language,
          "itunes:category": channel.itunesCategory,
          "itunes:explicit": channel.itunesExplicit,
          "itunes:author": channel.itunesAuthor,
          item: this.buildItems(items),
        },
      },
    };

    return this.xmlBuilder.build(xmlData);
  }

  private buildItems(items: PodcastFeedItem[]) {
    return items.map((item) => ({
      title: item.title,
      enclosure: {
        "@url": item.enclosureUrl,
        "@length": item.enclosureLength,
        "@type": item.enclosureType,
      },
      guid: item.guid,
      pubDate: item.pubDate.toUTCString(),
      description: item.description,
    }));
  }
}
