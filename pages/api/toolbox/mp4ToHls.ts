import * as process from "process";
import fs from 'fs-extra';
import sendToS3 from './sendToS3';
import rimraf from 'rimraf';

export default async function mp4ToHls (filename: String) {
    const ffmpeg = require('fluent-ffmpeg');
    const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');

    ffmpeg.setFfmpegPath(ffmpegInstaller.path);

    console.log(process.cwd())

    const filesname = filename.split('.')[0];
    const foldername = filename.split('.')[0];
    fs.ensureDirSync(`${process.cwd()}/pages/api/hls/${foldername}`);

    let state = false;
    ffmpeg(`${process.cwd()}/pages/api/tmp/${filename}`, {
        timeout: 432000
    }).addOptions([
        '-profile:v baseline',
        '-level 3.0',
        '-start_number 0',
        '-hls_time 6',
        '-hls_list_size 0',
        '-f hls'
    ]).output(`${process.cwd()}/pages/api/hls/${foldername}/${filesname}.m3u8`).on('end', () => {
        console.log('conversion fini !')
        sendToS3(`${process.cwd()}/pages/api/hls/${foldername}`, 'kamegroundbucket', foldername).finally(() => {
            rimraf(`${process.cwd()}/pages/api/hls/${foldername}`);
            rimraf(`${process.cwd()}/pages/api/tmp/${filename}`);
    })}).run();

}