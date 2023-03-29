import { sign } from 'crypto';
import nextConnect from 'next-connect';
import models from '../../../../db/index';

const DB: any = models;
const { videos } = DB;

export default async (vidname: string, vidS3name: string) => {
	const _vidname = vidname.toString();
	const _vidS3name = vidS3name.toString();
	await videos.create({
		name: _vidname,
		taille: 0,
		s3name: _vidS3name,
		s3url:
			'https://d2fowughg4eudk.cloudfront.net/' +
			_vidS3name +
			'/' +
			_vidS3name +
			'.m3u8',
	});
};
