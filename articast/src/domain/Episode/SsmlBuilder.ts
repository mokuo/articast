import * as cheerio from "cheerio";
import "reflect-metadata";
import { injectable } from "tsyringe";

import Article from "../Article/Article";
import { publickeyFeed } from "../BlogFeed/BlogFeed";

export type ArticleAndHtml = {
  article: Article;
  html: string;
};

// 記事本文のセレクター
const blogFeedUrlToSelector: { [url: string]: string } = {
  [publickeyFeed.url]: "div.entrybody",
};

// ref: https://docs.aws.amazon.com/ja_jp/polly/latest/dg/supportedtags.html
@injectable()
export default class SsmlBuilder {
  build(blogFeedUrl: string, articleAndHtmlList: ArticleAndHtml[]) {
    let speechText = "<speak>\n最初の記事です。\n";
    let isFirst = true;
    for (const articleAndHtml of articleAndHtmlList) {
      if (isFirst) {
        isFirst = false;
      } else {
        speechText += `${this.breakTag(1)}\n次の記事です。${this.breakTag(0.5)}\n`;
      }
      speechText += this.buildOne(blogFeedUrl, articleAndHtml);
    }
    speechText += "以上で終わりです。\n</speak>";
    return speechText;
  }

  private buildOne(blogFeedUrl: string, articleAndHtml: ArticleAndHtml): string {
    let result = "";
    const article = articleAndHtml.article;

    result += `タイトル${this.breakTag(0.5)}${article.title}${this.breakTag(1)}`;
    result += `公開日${this.breakTag(0.5)}${this.jaDate(article.publishedAt)}${this.breakTag(1)}\n`;
    result += this.buildText(blogFeedUrl, articleAndHtml.html);

    return result;
  }

  private breakTag(sec: number): string {
    return `<break time="${sec}s"/>`;
  }

  private jaDate(date: Date): string {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  }

  private elementToText(tagName: string, text: string): string {
    switch (tagName) {
      case "h1":
      case "h2":
      case "h3":
        return `${this.breakTag(1)}見出し${this.breakTag(0.5)}${text}${this.breakTag(1)}`;
      case "pre":
      case "code":
        return `${this.breakTag(1)}ここにコードが入ります。${this.breakTag(1)}`;
      default:
        return text;
    }
  }

  private buildText(blogFeedUrl: string, html: string): string {
    let text = "";
    const $ = cheerio.load(html);
    $(blogFeedUrlToSelector[blogFeedUrl])
      .children()
      .each((_i, el) => {
        text += this.elementToText(el.name, $(el).text());
      });
    return text;
  }
}
