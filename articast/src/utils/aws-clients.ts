import { S3Client } from "@aws-sdk/client-s3";

import { appConfig } from "../appConfig";

export const s3Client = new S3Client({
  region: appConfig.awsRegion,
  credentials: { accessKeyId: appConfig.awsAccessKeyId, secretAccessKey: appConfig.awsSecretAccessKey },
  endpoint: appConfig.awsEndpointUrl,
  forcePathStyle: process.env.NODE_ENV === "test",
});
