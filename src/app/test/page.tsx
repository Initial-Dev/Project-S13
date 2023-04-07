import PlayerDesktop from '../../components/PlayerDesktop';

export default function Test() {
	return (
		<div>
			<PlayerDesktop
				url={
					'https://kamegroundbucket.s3.eu-west-3.amazonaws.com/8ac43c65-0b45-40b4-bad6-c3f61f287644/8ac43c65-0b45-40b4-bad6-c3f61f287644.m3u8'
				}
				logo={''}
				gametitle={''}
				avatar={''}
				user={''}
			/>
		</div>
	);
}
