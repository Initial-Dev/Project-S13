import aws from "aws-sdk";
import { readdir, readFile } from "fs-extra";

const path = require("path");

export default async function mp4ToHls(uuid: String) {
  // Configuration de AWS
  const s3 = new aws.S3({
    accessKeyId: "AKIAR4WLWUN5N3PLOQ5Z",
    secretAccessKey: "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",
    region: "eu-west-3",
  });

  const params = {
    Bucket: "kamegroundbucket",
    Key: uuid + ".m3u8",
  };

  await s3.listObjects(params).promise();
}
