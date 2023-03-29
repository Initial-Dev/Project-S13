import { MediaOutlet, MediaPlayer, MediaPoster } from '@vidstack/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { RiCompassDiscoverLine } from 'react-icons/ri';
import useSWR from 'swr';

const Hero = dynamic(() => import('../components/Hero'), { ssr: false });

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
	const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
	const { data, error } = useSWR('/api/listAllVideos', fetcher);

	if (error)
		return (
			<div>Une erreur est survenue lors du chargement des données.</div>
		);
	if (!data) return <div>Chargement...</div>;

	return (
		<>
			<Head>
				<title>Kameground</title>
				<meta name="description" content="kamegroud | Discover" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Hero />
			<div className="py-12 sm:py-24 font-skmodernistregular">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl lg:mx-0">
						<div className="flex flex-row items-center gap-4 text-3xl font-skmodernistbold tracking-tight text-dark dark:text-light sm:text-4xl">
							<RiCompassDiscoverLine />
							<h2>Discover</h2>
						</div>
					</div>

					<ul
						role="list"
						className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4 "
					>
						{data.map((video) => (
							<li
								className="Transition"
								key={video.id}
								onMouseEnter={() =>
									setHoveredVideo(video.s3url)
								}
								onMouseLeave={() => setHoveredVideo(null)}
							>
								{hoveredVideo === video.url ? (
									<Link href={`/watch/${video.id}`}>
										<MediaPlayer
											className="rounded-2xl overflow-hidden"
											autoplay
											muted
											src={video.s3url}
											poster="./poster/video2Poster.png"
										>
											<MediaOutlet />
											<MediaPoster alt="" />
										</MediaPlayer>
										{/*<video
                                            className="rounded-2xl object-cover"
                                            autoPlay
                                            muted
											poster="./poster/video2Poster.png"
                                            src={url}
                                        />*/}

										<h3 className="mt-6 text-lg font-skmodernistbold leading-8 tracking-tight text-dark dark:text-light">
											{video.s3url}
										</h3>
										{/*<div className="flex items-center gap-3">
											<img
												className="aspect-[3/2] h-5 w-5 rounded-full object-cover"
												src={avatar}
												alt=""
											/>
											<p className="text-base leading-7 font-skmodernistregular text-gray-600 dark:text-gray-400">
												{user}
											</p>
										</div>*/}
									</Link>
								) : (
									<>
										<Link href={`/watch/${video.id}`}>
											<div className="relative">
												<img
													className="rounded-2xl object-cover"
													src={video.url}
													alt=""
												/>
												{/*<div className="absolute px-2 py-2 bottom-0 left-0">
													<span className="inline-flex items-center rounded-lg overflow-hidden bg-primary/40 backdrop-blur px-3.5 py-1.5 text-sm font-medium text-white">
														{game.title}
													</span>
												</div>*/}
											</div>

											<h3 className="mt-6 text-lg font-skmodernistbold leading-8 tracking-tight text-dark dark:text-light ">
												{video.name}
											</h3>
											{/*<div className="flex items-center gap-3 ">
												<img
													className="aspect-[3/2] h-5 w-5 rounded-full object-cover"
													src={avatar}
													alt=""
												/>
												<p className="text-base leading-7 font-skmodernistregular  text-gray-600 dark:text-gray-400">
													{user}
												</p>
											</div>*/}
										</Link>
									</>
								)}
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}
