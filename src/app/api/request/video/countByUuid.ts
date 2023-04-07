import models from "../../../../db/index";

const DB: any = models;
const { videos } = DB;

export default async (uuid: string) => {
  const count = await videos.count({ 
    where: {s3name: uuid}
   });
  return count;
};
