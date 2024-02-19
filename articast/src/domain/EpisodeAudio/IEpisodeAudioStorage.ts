export default interface IEpisodeAudioStorage {
  getUrl(audioFilePath: string): string;
  getByteSize(audioFilePath: string): Promise<number>;
}
