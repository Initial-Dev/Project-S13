import { MediaOutlet, MediaPlayer } from '@vidstack/react';
import 'vidstack/styles/base.css';
import 'vidstack/styles/ui/buttons.css';
import 'vidstack/styles/ui/sliders.css';

export default function PlayerGrid({ url, poster }) {
	return (
		<MediaPlayer
			className="rounded-xl overflow-hidden"
			src={url}
			poster={poster}
			preload="auto"
			autoplay
			loop
			muted
		>
			<MediaOutlet />
		</MediaPlayer>
	);
}
