import { useEffect, useRef, useState } from 'react';
import 'vidstack/styles/base.css';
import 'vidstack/styles/ui/buttons.css';
import 'vidstack/styles/ui/sliders.css';

import {
	MediaFullscreenButton,
	MediaOutlet,
	MediaPlayButton,
	MediaPlayer,
	MediaTimeSlider,
} from '@vidstack/react';
import AvatarUserMobile from './avatarUserMobile';
import GameBadgeMobile from './gameBadgeMobile';

const PlayerMobile = ({ url, logo, gametitle, avatar, user }) => {
	const videoRef = useRef(null);
	const [showControls, setShowControls] = useState(true);
	const [timer, setTimer] = useState(null);

	const handleScreenClick = () => {
		setShowControls(true);
		if (timer) {
			clearTimeout(timer);
		}
		setTimer(setTimeout(() => setShowControls(false), 2000));
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
		// mettre le player à l'hroizontale
		<div className="media-controls-container">
			<MediaPlayer
				className="rotate-90"
				src={url}
				preload="auto"
				autoplay
				loop
				ref={videoRef}
			>
				<MediaOutlet />
			</MediaPlayer>
		</div>
	);
};

export default PlayerMobile;
