export default interface ITextToSpeechApiClient {
  request(ssml: string, audioFilePathPrefix: string): Promise<string>;
}
