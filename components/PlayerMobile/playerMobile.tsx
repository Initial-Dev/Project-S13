import { useEffect, useRef, useState } from 'react';

import 'vidstack/styles/base.css';
import 'vidstack/styles/ui/buttons.css';
import 'vidstack/styles/ui/sliders.css';

import {
	MediaOutlet,
	MediaPlayer,
	MediaSliderVideo,
	MediaTimeSlider,
} from '@vidstack/react';
import AvatarUserMobile from './avatarUserMobile';
import GameBadgeMobile from './gameBadgeMobile';

interface PlayerMobileProps {
	url: string;
	logo: string;
	gametitle: string;
	avatar: string;
	user: string;
	title: string;
}

const PlayerMobile = ({
	url,
	logo,
	gametitle,
	avatar,
	user,
	title,
}: PlayerMobileProps) => {
	const [playing, setPlaying] = useState(false);
	const videoRef = useRef(null);

	const onVideoPress = () => {
		if (playing) {
			(videoRef.current as unknown as HTMLVideoElement).pause();
			setPlaying(false);
		} else {
			(videoRef.current as unknown as HTMLVideoElement).play();
			setPlaying(true);
		}
	};

	const SliderThumb = () => (
		<div className="dragging:left-[var(--slider-pointer-percent)] absolute top-0 left-[var(--slider-fill-percent)] z-20 h-full w-[var(--thumb-size)] -translate-x-1/2 transform">
			<div className="interactive:opacity-100 absolute top-1/2 left-0 h-[var(--thumb-size)] w-[var(--thumb-size)] -translate-y-1/2 transform rounded-full bg-[#FE5821] opacity-0 transition-opacity duration-150 ease-in"></div>
		</div>
	);

	const SliderTrackFill = () => (
		<div
			className="absolute rounded-full top-1/2 left-0 z-20 h-[var(--track-height)] w-full -translate-y-1/2 scale-x-[var(--slider-fill-rate)] transform bg-[#FE5821] will-change-transform"
			style={{ transformOrigin: 'left center' }}
		/>
	);

	return (
		<div className="video">
			<MediaPlayer
				className="video__player"
				src={url}
				preload="auto"
				controls={false}
				loop
				ref={videoRef}
			>
				<MediaOutlet onClick={onVideoPress} />

				<div>
					<MediaTimeSlider
						className="mx-auto w-full h-full"
						style={{
							'--thumb-size': '14px',
							'--track-height': '4px',
						}}
					>
						<MediaSliderVideo src={url} slot="preview" />
						<SliderThumb />
						<SliderTrackFill />
					</MediaTimeSlider>
				</div>
				<h1 className="text-dark dark:text-light text-md font-skmodernistregular px-6 py-3">
					{title}
				</h1>

				<div className="  ">
					<AvatarUserMobile avatar={avatar} user={user} />
				</div>
			</MediaPlayer>
		</div>
	);
};

export default PlayerMobile;

// <div className="  ">
//					<GameBadgeMobile logo={logo} gametitle={gametitle} />
//				</div>
