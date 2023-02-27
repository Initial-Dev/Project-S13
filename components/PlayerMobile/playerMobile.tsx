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
		<div className="absolute">
			<MediaPlayer src={url} preload="auto" autoplay loop ref={videoRef}>
				<div onTouchStart={handleScreenClick}>
					<MediaOutlet />
					<div
						className={`media-ui-controller ${
							showControls
								? 'opacity-100'
								: 'opacity-0 pointer-events-none'
						} transition-opacity duration-300`}
					>
						<div className="absolute bottom-0 left-0 w-full h-full z-1">
							<div className="flex w-full h-full justify-center items-center opacity-70 ">
								<MediaPlayButton />
							</div>
						</div>
						<div className="media-controls-container">
							<div className="media-controls">
								<MediaTimeSlider>
									<SliderThumb />
									<SliderTrackFill />
								</MediaTimeSlider>
								<MediaFullscreenButton />
							</div>
						</div>

						<div className="absolute top-4 right-5">
							<GameBadgeMobile
								logo={logo}
								gametitle={gametitle}
							/>
						</div>
						<div className="absolute top-4 left-0">
							<AvatarUserMobile avatar={avatar} user={user} />
						</div>
					</div>
				</div>
			</MediaPlayer>
		</div>
	);
};

export default PlayerMobile;
