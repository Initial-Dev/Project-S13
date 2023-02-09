import Hls from 'hls.js';
import { useEffect, useRef } from 'react';

const VideoPlayer = ({ src }) => {
	const videoRef = useRef(null);

	useEffect(() => {
		if (Hls.isSupported()) {
			const hls = new Hls();
			hls.loadSource(src);
			hls.attachMedia(videoRef.current);
			hls.on(Hls.Events.MANIFEST_PARSED, () => {
				videoRef.current.play();
			});
		}
	}, [src]);

	return (
		<video
			ref={videoRef}
			style={{ width: '100%', height: '100%' }}
			controls
		/>
	);
};

export default VideoPlayer;
