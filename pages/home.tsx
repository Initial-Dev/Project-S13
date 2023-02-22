import Link from 'next/link';
import { useState } from 'react';

const data = [
	{
		id: '00001',
		title: 'Gameplay Marvel Spider-man PS5',
		user: 'Taiga Kagami',
		url: '../videos/video1.mp4',
		poster: '../poster/video1Poster.png',
		avatar: '../avatar/kagami.jpg',
		game: {
			title: "Marvel's Spider-Man",
			logo: '../gameBadge/video1.png',
		},
	},
	{
		id: '00002',
		title: 'Dragon Ball FighterZ Gohan SSJ2',
		user: 'Tetsuya Kuroko',
		url: '../videos/video2.mp4',
		poster: '../poster/video2Poster.png',
		avatar: '../avatar/kuroko.jpg',
		game: {
			title: 'Dragon Ball FighterZ',
			logo: '../gameBadge/video2.png',
		},
	},
	{
		id: '00003',
		title: 'Shiro become Archer',
		user: 'Tetsuya Kuroko',
		url: '../videos/video.m3u8',
		poster: '../poster/video3Poster.png',
		avatar: '../avatar/kuroko.jpg',
		game: {
			title: 'Fate Stay Night',
			logo: '../gameBadge/video2.png',
		},
	},
];

export default function Home() {
	const [hoveredVideo, setHoveredVideo] = useState(null);

	return (
		<div className="bg-white py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:mx-0">
					<h2 className="text-3xl font-skmodernistbold tracking-tight text-gray-900 sm:text-4xl">
						Kameground (Video Player)
					</h2>
				</div>

				<ul
					role="list"
					className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
				>
					{data.map(
						({ id, title, user, url, poster, game, avatar }) => (
							<li
								key={id}
								onMouseEnter={() => setHoveredVideo(url)}
								onMouseLeave={() => setHoveredVideo(null)}
							>
								{hoveredVideo === url ? (
									<Link href={`/watch/${id}`}>
										<video
											className="aspect-[3/2] w-full rounded-2xl object-cover  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 "
											autoPlay
											muted
											poster={poster}
											src={url}
										/>

										<h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
											{title}
										</h3>
										<div className="flex items-center gap-3">
											<img
												className="aspect-[3/2] h-5 w-5 rounded-full object-cover"
												src={avatar}
												alt=""
											/>
											<p className="text-base leading-7 text-gray-600">
												{user}
											</p>
										</div>
									</Link>
								) : (
									<>
										<Link href={`/watch/${id}`}>
											<div className="relative">
												<img
													className="aspect-[3/2] w-full rounded-2xl object-cover"
													src={poster}
													alt=""
												/>
												<div className="absolute bottom-0 left-0">
													<span className="inline-flex items-center rounded-md bg-[#FE5821] px-2.5 py-0.5 text-sm font-medium text-white">
														{game.title}
													</span>
												</div>
											</div>

											<h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
												{title}
											</h3>
											<div className="flex items-center gap-3">
												<img
													className="aspect-[3/2] h-5 w-5 rounded-full object-cover"
													src={avatar}
													alt=""
												/>
												<p className="text-base leading-7 text-gray-600">
													{user}
												</p>
											</div>
										</Link>
									</>
								)}
							</li>
						)
					)}
				</ul>
			</div>
		</div>
	);
}
