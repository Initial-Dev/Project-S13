import * as process from "process";

export default function mp4ToHls (filename: String) {
    const ffmpeg = require('fluent-ffmpeg');
    const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');

    ffmpeg.setFfmpegPath(ffmpegInstaller.path);

    console.log(process.cwd())

    ffmpeg(`${process.cwd()}/pages/api/tmp/${filename}`, {
        timeout: 432000
    }).addOptions([
        '-profile:v baseline',
        '-level 3.0',
        '-start_number 0',
        '-hls_time 6',
        '-hls_list_size 0',
        '-f hls'
    ]).output(`${process.cwd()}/pages/api/hls/test.m3u8`).on('end', () => {
        console.log('conversion fini !')
    }).run();

}