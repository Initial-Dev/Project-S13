import VideoPlayer from './VideoPlayer';

const Page = () => {
	return (
		<div style={{ width: '80%', height: '80%', margin: '0 auto' }}>
			<VideoPlayer src="http://playertest.longtailvideo.com/adaptive/wowzaid3/playlist.m3u8" />
		</div>
	);
};

export default Page;
