import axios from "axios";
import * as cheerio from "cheerio";
import "reflect-metadata";
import { injectable } from "tsyringe";

const unnecessarySelectors = [
  "iframe",
  "script",
  "style",
  "header",
  "footer",
  "aside",
  "svg",
  "nav",
  "div#header",
  "div#footer",
];

@injectable()
export default class ArticleHtmlCrawler {
  async getSimpleHtml(url: string): Promise<string> {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);
    $(unnecessarySelectors.join(",")).remove();
    return $.html();
  }
}
