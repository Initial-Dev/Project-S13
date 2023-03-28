import models from "../../../../db/index";

const DB: any = models;
const { videos } = DB;

export default async (uuid: string) => {
  const video = await videos.findOne({ 
    where: {s3name: uuid}
   });
  return video.s3url;
};
