import { z } from "zod";

export const appConfig = {
  awsRegion: "ap-northeast-1",
  awsEndpointUrl: process.env.AWS_ENDPOINT_URL,
  awsAccessKeyId: z.string().parse(process.env.AWS_ACCESS_KEY_ID),
  awsSecretAccessKey: z.string().parse(process.env.AWS_SECRET_ACCESS_KEY),
};
