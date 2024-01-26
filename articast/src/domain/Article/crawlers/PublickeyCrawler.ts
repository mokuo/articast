import axios from "axios";
import * as cheerio from "cheerio";

import { publickeyFeed } from "../../BlogFeed/BlogFeed";
import { IArticleCrawler } from "../ArticleCrawlerBuilder";

export default class PublickeyCrawler implements IArticleCrawler {
  readonly blogFeedUrl: string = publickeyFeed.url;

  public async crawl(url: string): Promise<string> {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);
    return $("div.entrybody").text();
  }
}
