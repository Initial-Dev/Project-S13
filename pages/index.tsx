import { MediaOutlet, MediaPlayer } from '@vidstack/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { RiCompassDiscoverLine } from 'react-icons/ri';
import videos from '../videos.json';
const Hero = dynamic(() => import('../components/Hero'), { ssr: false });
export default function Home() {
	const [hoveredVideo, setHoveredVideo] = useState(null);
	const videosList = useMemo(() => {
		return videos.map(({ id, title, user, url, poster, game, avatar }) => ({
			id,
			title,
			user,
			url,
			poster,
			game,
			avatar,
		}));
	}, [videos]);

	return (
		<>
			<Hero />
			<div className="py-12 sm:py-24">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl lg:mx-0">
						<div className="flex flex-row items-center gap-4 text-3xl font-skmodernistbold tracking-tight text-dark dark:text-light sm:text-4xl">
							<RiCompassDiscoverLine />
							<h2>Discover</h2>
						</div>
					</div>

					<ul
						role="list"
						className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 "
					>
						{videosList.map(
							({
								id,
								title,
								user,
								url,
								poster,
								game,
								avatar,
							}) => (
								<li
									className="Transition"
									key={id}
									onMouseEnter={() => setHoveredVideo(url)}
									onMouseLeave={() => setHoveredVideo(null)}
								>
									{hoveredVideo === url ? (
										<Link href={`/watch/${id}`}>
											{/* <MediaPlayer
											className="rounded-2xl overflow-hidden"
											autoplay
											muted
											poster={poster}
											src={url}
										>
											<MediaOutlet />
										</MediaPlayer> */}
											<video
												className="rounded-2xl object-cover"
												autoPlay
												muted
												poster={poster}
												src={url}
											/>

											<h3 className="mt-6 text-lg font-skmodernistbold leading-8 tracking-tight text-dark dark:text-light">
												{title}
											</h3>
											<div className="flex items-center gap-3">
												<img
													className="aspect-[3/2] h-5 w-5 rounded-full object-cover"
													src={avatar}
													alt=""
												/>
												<p className="text-base leading-7 font-skmodernistregular text-gray-600 dark:text-gray-400">
													{user}
												</p>
											</div>
										</Link>
									) : (
										<>
											<Link href={`/watch/${id}`}>
												<div className="relative">
													<img
														className="rounded-2xl object-cover"
														src={poster}
														alt=""
													/>
													<div className="absolute px-2 py-2 bottom-0 left-0">
														<span className="inline-flex items-center rounded-lg overflow-hidden bg-primary/40 backdrop-blur px-3.5 py-1.5 text-sm font-medium text-white">
															{game.title}
														</span>
													</div>
												</div>

												<h3 className="mt-6 text-lg font-skmodernistbold leading-8 tracking-tight text-dark dark:text-light ">
													{title}
												</h3>
												<div className="flex items-center gap-3 ">
													<img
														className="aspect-[3/2] h-5 w-5 rounded-full object-cover"
														src={avatar}
														alt=""
													/>
													<p className="text-base leading-7 font-skmodernistregular  text-gray-600 dark:text-gray-400">
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
		</>
	);
}
