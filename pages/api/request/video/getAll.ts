import { json } from "node:stream/consumers";
import models from "../../../../db/index";

const DB: any = models;
const { videos } = DB;

export default async () => {
  const video = await videos.findAll();
  return video;
};
