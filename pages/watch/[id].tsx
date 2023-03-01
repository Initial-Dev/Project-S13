import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import VideoDesktop from '../../components/PlayerDesktop';
import InfoKeyboard from '../../components/PlayerDesktop/infoKeyboard';
import VideoMobile from '../../components/PlayerMobile';
import videos from '../../videos.json';

export const VideoPlayer = () => {
	const router = useRouter();
	const [isMobile, setIsMobile] = useState(false);
	const [video, setVideo] = useState(null);
	const videosList = useMemo(
		() =>
			videos.map(({ id, title, user, url, poster, game, avatar }) => ({
				id,
				title,
				user,
				url,
				poster,
				game,
				avatar,
			})),
		[videos]
	);

	useEffect(() => {
		setIsMobile(/Mobi/.test(navigator.userAgent));
	}, []);

	useEffect(() => {
		const selectedVideo = videos.find(
			(item) => item.id === router.query.id
		);
		setVideo(selectedVideo);
	}, [router.query, videos]);

	useEffect(() => {
		if (video) {
			const { id: currentId } = router.query;
			if (currentId !== video.id) {
				router.push(`/watch/${video.id}`, undefined, {
					shallow: true,
				});
			}
		}
	}, [video]);

	return (
		<>
			{video && (
				<>
					{isMobile ? (
						<>
							<div className="app">
								<div className="app__videos">
									{videos.map((video, index) => (
										<>
											<VideoMobile
												key={video.id}
												url={video.url}
												logo={video.game.logo}
												gametitle={video.game.title}
												avatar={video.avatar}
												user={video.user}
												title={video.title}
												nextVideoUrl={
													index < videos.length - 1
														? videos[index + 1].url
														: null
												}
											/>
										</>
									))}
								</div>
							</div>
						</>
					) : (
						<div className="video-container">
							<div className="video-desktop">
								<VideoDesktop
									url={video.url}
									logo={video.game.logo}
									gametitle={video.game.title}
									avatar={video.avatar}
									user={video.user}
								/>
								<h1 className="text-dark dark:text-light text-sm md:text-lg lg:text-xl xl:text-2xl font-skmodernistbold">
									{video.title}
								</h1>
							</div>
							<div className="absolute left-0 right-0 z-[-1] flex justify-between">
								<img
									className="flex-1 self-start brightness-75 w-2/3 rounded-lg"
									src={
										videosList[
											(videosList.findIndex(
												(v) => v.id === video.id
											) +
												1) %
												videosList.length
										].poster
									}
									alt=""
									onClick={() => {
										const currentIndex =
											videosList.findIndex(
												(v) => v.id === video.id
											);
										const nextIndex =
											(currentIndex + 1) %
											videosList.length;
										setVideo(videosList[nextIndex]);
									}}
								/>
								<img
									className="flex-1 self-end brightness-75 w-2/3 rounded-lg"
									src={
										videosList[
											(videosList.findIndex(
												(v) => v.id === video.id
											) +
												videosList.length -
												1) %
												videosList.length
										].poster
									}
									alt=""
									onClick={() => {
										const currentIndex =
											videosList.findIndex(
												(v) => v.id === video.id
											);
										const previousIndex =
											(currentIndex +
												videosList.length -
												1) %
											videosList.length;
										setVideo(videosList[previousIndex]);
									}}
								/>
							</div>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default VideoPlayer;

/*
<>
							{videosList.map(
								({
									id,
									title,
									user,
									url,
									poster,
									game,
									avatar,
								}) => (
									<div
										className={`app ${
											id === video.id ? 'playing' : ''
										}`}
									>
										<div className="app__videos">
											<VideoMobile
												key={id}
												url={url}
												logo={undefined}
												gametitle={undefined}
												avatar={undefined}
												user={undefined}
											/>
										</div>
									</div>
								)
							)}
						</>
 */
