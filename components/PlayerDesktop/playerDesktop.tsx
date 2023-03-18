import { useRef, useState } from 'react';
import 'vidstack/styles/base.css';
import 'vidstack/styles/ui/buttons.css';
import 'vidstack/styles/ui/sliders.css';
import PlayerUI from './PlayerUI';

import { MediaOutlet, MediaPlayer } from '@vidstack/react';
import styles from '../../styles/PlayerDesktop.module.scss';

interface playerDesktopProps {
	url: string;
	logo: string;
	gametitle: string;
	avatar: string;
	user: string;
}

const playerDesktop = ({
	url,
	logo,
	gametitle,
	avatar,
	user,
}: playerDesktopProps) => {
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
			(videoRef.current as unknown as HTMLVideoElement).pause();
			setPlaying(false);
		} else {
			(videoRef.current as unknown as HTMLVideoElement).play();
			setPlaying(true);
		}
	};

	return (
		<MediaPlayer
			className={'overflow-hidden rounded-lg'}
			src={url}
			preload="auto"
			autoplay
			ref={videoRef}
			onPlay={() => setIsPlaying(false)}
			onPause={() => setIsPlaying(true)}
		>
			{/* */}
			<div
				className="relative"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<MediaOutlet onClick={onVideoPress} />

				<div
					className={`media-ui ${
						showMediaUi ? 'opacity-100' : 'opacity-0 '
					} transition-opacity duration-300 font-skmodernistregular`}
				>
					<PlayerUI
						url={url}
						logo={logo}
						gametitle={gametitle}
						avatar={avatar}
						user={user}
					/>
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
