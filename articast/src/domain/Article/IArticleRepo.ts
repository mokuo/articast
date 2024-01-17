import Article from "./Article";

interface IArticleRepo {
  insertAll(articles: Article[]): Promise<void>;
}
