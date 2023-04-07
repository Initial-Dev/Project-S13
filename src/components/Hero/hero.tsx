import GameBadge from 'components/PlayerDesktop/gameBadge';
import videos from '../../videos.json';

export default function Hero() {
	const selectedVideo = videos[1]; // Replace 0 with the index of the video you want to display

	return (
		<>
			<div className="hidden lg:inline-block w-full h-96 overflow-hidden bg-gradient-to-t from-light dark:from-dark ">
				<video
					src={selectedVideo.url}
					className="absolute object-cover object-center w-full h-96 opacity-10"
					autoPlay
					loop
					muted
					style={{ zIndex: '-1' }}
				/>
				<div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
					<div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
						<h1 className="title-font sm:text-8xl text-3xl mb-4 font-medium text-dark dark:text-gray-200 font-skmodernistbold">
							Play, Clip <br className="hidden lg:inline-block" />
							and Share
						</h1>
					</div>
					<div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
						<GameBadge
							logo={selectedVideo.game.logo}
							gametitle={selectedVideo.game.title}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
