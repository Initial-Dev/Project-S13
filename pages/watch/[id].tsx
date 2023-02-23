import {
	ChatBubbleOvalLeftEllipsisIcon,
	EyeIcon,
	HeartIcon,
} from '@heroicons/react/24/outline';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import VideoDesktop from '../../components/PlayerDesktop';
import InfoKeyboard from '../../components/PlayerDesktop/infoKeyboard';
import VideoMobile from '../../components/PlayerMobile';

import videos from '../../videos.json';

export const VideoPlayer = () => {
	const router = useRouter();
	const [isMobile, setIsMobile] = useState(false);
	const [video, setVideo] = useState(null);

	useEffect(() => {
		setIsMobile(/Mobi/.test(navigator.userAgent));
	}, []);

	useEffect(() => {
		if (videos) {
			const selectedVideo = videos.find(
				(item) => item.id === router.query.id
			);
			setVideo(selectedVideo);
		}
	}, [router.query]);
	return (
		<div>
			{isMobile ? (
				<VideoMobile
					url={video.url}
					logo={video.game.logo}
					gametitle={video.game.title}
					avatar={video.avatar}
					user={video.user}
				/>
			) : (
				<div className="  h-auto max-w-full py-32 lg:pb-40 bg-[#1F2123]">
					<div className="mx-auto max-w-7xl px-6 lg:px-8 h-full w-full">
						{video && (
							<div className="h-screen w-full">
								<VideoDesktop
									url={video.url}
									logo={video.game.logo}
									gametitle={video.game.title}
									avatar={video.avatar}
									user={video.user}
								/>
								<h1 className="text-white text-2xl font-skmodernistbold float-left">
									{video.title}
								</h1>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default VideoPlayer;

/*<InfoKeyboard />*/

/* <div className="gap-8 inline-flex items-center float-right ">
									<ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-white" />
									<HeartIcon className="h-6 w-6 text-white" />
									<EyeIcon className="h-6 w-6 text-white" />
								</div> */
