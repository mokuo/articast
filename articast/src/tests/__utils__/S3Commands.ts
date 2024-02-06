import { DeleteObjectCommand } from "@aws-sdk/client-s3";

import { ARTICLES_BUCKET_NAME } from "../../infrastructure/Article/ArticleStorage";
import { s3Client } from "../../utils/aws-clients";

type BucketName = typeof ARTICLES_BUCKET_NAME;

export const deleteObject = async (bucketName: BucketName, key: string) => {
  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: key,
  });
  await s3Client.send(command);
};
