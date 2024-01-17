import BlogFeed from "./BlogFeed";

export default interface IBlogFeedRepo {
  insertAll(blogFeeds: BlogFeed[]): Promise<void>;
}
