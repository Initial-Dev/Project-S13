import models from "../../../../db/index";

const DB: any = models;
const { videos } = DB;

export default async (uuid: string) => {
  const _vidS3name = uuid.toString();
  await videos.get({ s3name: _vidS3name });
  const count = await videos.count();
  return count;
};
