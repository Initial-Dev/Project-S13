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
						<VideoMobile
							url={video.url}
							logo={video.game.logo}
							gametitle={video.game.title}
							avatar={video.avatar}
							user={video.user}
						/>
					) : (
						<div className="relative flex flex-col justify-center items-center snap-x lg:h-full xl:h-full my-6">
							<>
								<div className="z-10 w-full sm:max-w-screen-sm md:max-w-screen-md snap-center lg:max-w-full-lg xl:max-w-screen-xl mb-4 relative">
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
								<>
									<div>
										<img
											className="z-0 brightness-75 absolute w-7/12 h-7/12 md:w-6/12 my-auto inset-y-0 right-10 object-fit-cover rounded-lg"
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
											className="z-0 brightness-75 absolute w-7/12 h-7/12 md:w-6/12   my-auto inset-y-0 left-10 object-fit-cover rounded-lg"
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
												setVideo(
													videosList[previousIndex]
												);
											}}
										/>
									</div>
								</>
							</>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default VideoPlayer;
