import * as process from "process";
import fs from 'fs-extra';
import sendToS3 from './sendToS3';

export default async function mp4ToHls (filename: String) {
    const ffmpeg = require('fluent-ffmpeg');
    const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');

    ffmpeg.setFfmpegPath(ffmpegInstaller.path);

    console.log(process.cwd())
    
    const foldername = filename.split('.')[0];
    fs.ensureDirSync(`${process.cwd()}/pages/api/hls/${foldername}`);

    ffmpeg(`${process.cwd()}/pages/api/tmp/${filename}`, {
        timeout: 432000
    }).addOptions([
        '-profile:v baseline',
        '-level 3.0',
        '-start_number 0',
        '-hls_time 6',
        '-hls_list_size 0',
        '-f hls'
    ]).output(`${process.cwd()}/pages/api/hls/${foldername}/test.m3u8`).on('end', () => {
        console.log('conversion fini !')
    }).run();

    await sendToS3(`${process.cwd()}/pages/api/hls/${foldername}`, 'kamegroundbucket', foldername);

}