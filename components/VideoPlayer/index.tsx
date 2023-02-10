import VideoPlayer from './VideoPlayer';

export default function Index() {
	const videoJsOptions = {
		autoplay: true,
		controls: true,
		preload: 'metadata',
		sources: [
			{
				src: 'http://playertest.longtailvideo.com/adaptive/wowzaid3/playlist.m3u8',
				type: 'application/x-mpegURL',
			},
		],
	};
	const videoks = {
		autoplay: true,
		controls: true,
		preload: 'metadata',
		sources: [
			{
				src: 'http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8',
				type: 'application/x-mpegURL',
			},
		],
	};
	return (
		<>
			<VideoPlayer {...videoJsOptions} />
		</>
	);
}

//ON VA recevoir un tabl
