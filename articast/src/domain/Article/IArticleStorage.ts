export default interface IArticleStorage {
  upload(articleUrl: string, text: string): Promise<void>;
}
