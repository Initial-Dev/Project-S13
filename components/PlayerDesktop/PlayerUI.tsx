import {
	MediaFullscreenButton,
	MediaMuteButton,
	MediaPlayButton,
	MediaSliderThumbnail,
	MediaSliderValue,
	MediaTime,
	MediaTimeSlider,
	MediaVolumeSlider,
	useMediaPlayer,
} from '@vidstack/react';
import 'vidstack/styles/base.css';

import { useEffect, useState } from 'react';
import AvatarTag from './AvatarTag';
import GameTag from './GameTag';
import { SettingsPanel } from './SettingsPanel';

interface MediaPlayerUIProps {
	url: string;
	logo: string;
	gametitle: string;
	avatar: string;
	user: string;
}

const MediaPlayerUI = ({
	logo,
	gametitle,
	avatar,
	user,
}: MediaPlayerUIProps) => {
	const [open, setOpen] = useState(false);
	const [showControls, setShowControls] = useState(false);
	const player = useMediaPlayer();

	useEffect(() => {
		if (!player) return;

		player.subscribe(({ currentTime, duration, volume }) => {
			setVolume(parseInt(100 * volume));

			const minutes = Math.floor(currentTime / 60);
			const seconds = formatSeconds(currentTime);
			setTime(`${minutes}:${seconds}`);

			const rem = duration - currentTime;

			const rem_minutes = Math.floor(rem / 60);
			const rem_seconds = formatSeconds(rem);
			setRemaining(`${rem_minutes}:${rem_seconds}`);

			const dur_minutes = Math.floor(duration / 60);
			const dur_seconds = (duration % 60).toFixed(0).padStart(2, '0');
			setVideoDuration(`${dur_minutes}:${dur_seconds}`);
		});
	}, [player]);

	const [time, setTime] = useState('00:00');
	const [volume, setVolume] = useState(100);
	const [remaining, setRemaining] = useState('00:00');
	const [videoDuration, setVideoDuration] = useState('00:00');

	function formatSeconds(time: number) {
		return (time % 60).toFixed(0).padStart(2, '0');
	}

	return (
		<div>
			<div className={`media-overlay ${showControls ? 'opened' : ''}`}>
				<div className={`top-bar ${showControls ? 'opened' : ''}`}>
					<AvatarTag avatar={avatar} user={user} />
					<GameTag logo={logo} gametitle={gametitle} />
				</div>
				<div
					className="media-controls"
					onClick={() => {
						setShowControls(!showControls);
					}}
				>
					<div
						className={`mobileControlsAboveProgress ${
							showControls ? 'opened' : ''
						}`}
					>
						<h4 className="videoTimeRemaining">{remaining}</h4>
						<MediaMuteButton></MediaMuteButton>
						<MediaFullscreenButton
							className="fullscreenMobile"
							onClick={() => {
								console.log('fullscreen');
								screen.orientation.lock('landscape');
							}}
						/>
					</div>
					<div className="progressWrapper">
						<MediaTime type="current" className="videoTime" />
						<MediaTimeSlider
							className={`videoTimeSlider ${
								showControls ? 'opened' : ''
							}`}
						>
							<div className="previewWrapper">
								<MediaSliderThumbnail
									src="./video1.mp4"
									slot="preview"
								/>
								<MediaSliderValue
									type="pointer"
									format="time"
									slot="preview"
								/>
							</div>
						</MediaTimeSlider>
						<MediaTime type="duration" className="videoTime" />
					</div>

					<div className="time">
						<div className="playPauseWrapper">
							<div className="playWrapper">
								<MediaPlayButton></MediaPlayButton>
							</div>
							<div className="volume-controls">
								<MediaMuteButton></MediaMuteButton>
								<MediaVolumeSlider></MediaVolumeSlider>
								<div className="volumePercentageWrapper">
									{volume}%
								</div>
							</div>
						</div>
						<div className="media-controls-buttons">
							<MediaFullscreenButton />
						</div>
					</div>
					<SettingsPanel
						setIsOpen={setOpen}
						isOpen={open}
						sources={[]}
						subtitles={[]}
					/>
				</div>
			</div>
		</div>
	);
};

export default MediaPlayerUI;
