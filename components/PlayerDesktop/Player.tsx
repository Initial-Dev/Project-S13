import { useRef, useState } from 'react';
import 'vidstack/styles/base.css';
import 'vidstack/styles/ui/buttons.css';
import 'vidstack/styles/ui/sliders.css';

import {
	MediaFullscreenButton,
	MediaMuteButton,
	MediaOutlet,
	MediaPlayButton,
	MediaPlayer,
	MediaSliderVideo,
	MediaTime,
	MediaTimeSlider,
	MediaVolumeSlider,
} from '@vidstack/react';
import Avatar from './avatar';
import GameBadge from './gameBadge';

const playerDesktop = ({ url, logo, gametitle, avatar, user }) => {
	const [showMediaUi, setShowMediaUi] = useState(false); // Afficher ou non les boutons de la vidéo
	const [isPlaying, setIsPlaying] = useState(false); // Afficher ou non les boutons de la vidéo
	const [playing, setPlaying] = useState(false); // Mettre en pause ou en play la vidéo
	const videoRef = useRef(null); // Référence de la vidéo
	// Fonction pour afficher les boutons de la vidéo lorsque je suis dessus
	const handleMouseEnter = () => {
		setShowMediaUi(true);
	};
	// Fonction pour cacher les boutons de la vidéo lorsque je ne suis pas dessus
	const handleMouseLeave = () => {
		if (!isPlaying) {
			setShowMediaUi(false);
		}
	};
	// Fonction pour mettre en pause ou en play la vidéo lorsque je clique dessus
	const onVideoPress = () => {
		if (playing) {
			videoRef.current.pause();
			setPlaying(false);
		} else {
			videoRef.current.play();
			setPlaying(true);
		}
	};
	// Fonction pour le slider de la vidéo
	function SliderThumb() {
		return (
			<div className="dragging:left-[var(--slider-pointer-percent)] absolute top-0 left-[var(--slider-fill-percent)] z-20 h-full w-[var(--thumb-size)] -translate-x-1/2 transform">
				<div className="interactive:opacity-100 absolute top-1/2 left-0 h-[var(--thumb-size)] w-[var(--thumb-size)] -translate-y-1/2 transform rounded-full bg-[#FE5821] opacity-0 transition-opacity duration-150 ease-in"></div>
			</div>
		);
	}
	// Fonction pour le slider de la vidéo
	function SliderTrackFill() {
		return (
			<div
				className="absolute rounded-full top-1/2 left-0 z-20 h-[var(--track-height)] w-full -translate-y-1/2 scale-x-[var(--slider-fill-rate)] transform bg-[#FE5821] will-change-transform"
				style={{ transformOrigin: 'left center' }}
			/>
		);
	}
	return (
		<MediaPlayer
			className="rounded-xl overflow-hidden"
			src={url}
			preload="auto"
			autoplay
			loop
			ref={videoRef}
			onPlay={() => setIsPlaying(false)}
			onPause={() => setIsPlaying(true)}
		>
			{/*  */}
			<div
				className="relative"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<MediaOutlet onClick={onVideoPress} />
				<div
					className={`media-ui ${
						showMediaUi ? 'opacity-100' : 'opacity-0'
					} transition-opacity duration-300 font-skmodernistregular`}
				>
					<div className="absolute bottom-16 left-5 right-5 gap-3 flex justify-center items-center">
						<div className="absolute left-0 text-white font-skmodernistbold px-2 py-1">
							<MediaTime type="current" />
						</div>
						<MediaTimeSlider
							className="mx-auto w-96 md:w-10/12 lg:w-10/12"
							style={{
								'--thumb-size': '14px',
								'--track-height': '4px',
							}}
						>
							<MediaSliderVideo src={url} slot="preview" />
							<SliderThumb />
							<SliderTrackFill />
						</MediaTimeSlider>
						<div className="absolute right-0 text-white font-skmodernistbold px-2 py-1">
							<MediaTime type="current" remainder />
						</div>
					</div>

					<div className="flex flex-row justify-between items-center absolute bottom-5 left-5">
						<div className="flex">
							<MediaPlayButton />
							<MediaMuteButton />
							<div className="mx-auto w-44 ">
								<MediaVolumeSlider />
							</div>
						</div>
					</div>

					<div className="absolute bottom-5 right-5">
						<MediaFullscreenButton />
					</div>
					<div className="absolute top-5 right-5 ">
						<GameBadge logo={logo} gametitle={gametitle} />
					</div>
					<div className="absolute top-5 left-5 ">
						<Avatar avatar={avatar} user={user} />
					</div>
				</div>
			</div>
			{/* Bottom track color mousse leave */}
			<div
				className={`media-ui ${
					showMediaUi ? 'opacity-0' : 'opacity-100'
				} transition-opacity duration-300`}
			>
				<div className="relative h-0.5 w-full bg-gray-200/50 ">
					<div className="media-waiting:bg-sky-500 absolute top-0 left-0 h-full w-full origin-left scale-x-[calc(var(--media-current-time)/var(--media-duration))] transform bg-[#FE5821] will-change-transform"></div>
				</div>
			</div>
		</MediaPlayer>
	);
};
export default playerDesktop;
