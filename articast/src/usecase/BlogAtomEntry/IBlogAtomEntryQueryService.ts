export default interface IBlogAtomEntryQueryService {
  findAllIds(blogFeedId: string): Promise<string[]>;
}
