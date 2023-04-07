import * as process from "process";
import fs from "fs-extra";
import sendToS3 from "./sendToS3";
import rimraf from "rimraf";
import { v4 } from "uuid";
import sendVidToDB from "../request/video/saveInDb";
import searchUuidInDb from "../request/video/countByUuid";

export default async function mp4ToHls(filename: String) {
  const ffmpeg = require("fluent-ffmpeg");
  const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
  
  let _uuid = v4();
  
// Vérifie que l'uuid n'existe pas déjà dans la base de données
function verifyUUID(uuid: string) {
  searchUuidInDb(uuid).then((count) => {
    if (count > 0) {
      _uuid = v4();
      verifyUUID(_uuid);
      console.log("UUID déjà existant, nouveau UUID généré");
    }
  });
}
  verifyUUID(_uuid);

  ffmpeg.setFfmpegPath(ffmpegInstaller.path);

  console.log(process.cwd());

  const _filename = filename.split(".")[0].toString();

  //Création du dossier de destination des fichiers hls
  const foldername = _uuid;
  fs.ensureDirSync(`${process.cwd()}/pages/api/hls/${foldername}`);

  ffmpeg(`${process.cwd()}/pages/api/tmp/${filename}`, {
    timeout: 432000,
  })
    .addOptions([
      "-profile:v baseline",
      "-level 3.0",
      "-start_number 0",
      "-hls_time 6",
      "-hls_list_size 0",
      "-f hls",
    ])
    .output(`${process.cwd()}/pages/api/hls/${foldername}/${_uuid}.m3u8`)
    .on("end", () => {
      console.log("conversion fini !");
      sendToS3(
        `${process.cwd()}/pages/api/hls/${foldername}`,
        "kamegroundbucket",
        foldername
      ).finally(() => {
        sendVidToDB(_filename, _uuid);
        rimraf(`${process.cwd()}/pages/api/hls/${foldername}`); // Supprime le dossier temporaire
        rimraf(`${process.cwd()}/pages/api/tmp/${filename}`); // Supprime le fichier temporaire
      });
    })
    .run();
}
