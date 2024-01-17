import BlogAtomEntry from "./BlogAtomEntry";

export default interface IBlogAtomEntryRepo {
  insertAll(blogAtomEntries: BlogAtomEntry[]): Promise<void>;
}
