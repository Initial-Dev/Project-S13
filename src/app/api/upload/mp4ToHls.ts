import * as process from "process";
import fs from "fs-extra";
import { v4 } from "uuid";
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";

export default function mp4ToHls(filename: string) {
  const UUID = v4();

  ffmpeg.setFfmpegPath(ffmpegInstaller.path);

  console.log(process.cwd());

  // const filenameWithoutExtension = filename.split(".")[0].toString();

  //Création du dossier de destination des fichiers hls
  const folderName = UUID;
  fs.ensureDirSync(`${process.cwd()}/pages/api/hls/${folderName}`);

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
    .output(`${process.cwd()}/pages/api/hls/${folderName}/${UUID}.m3u8`)
    .on("end", () => {
      console.log("conversion fini !");
    })
    .run();
}
