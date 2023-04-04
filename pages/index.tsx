import { MediaOutlet, MediaPlayer, MediaPoster } from '@vidstack/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { memo, useEffect, useMemo, useState } from 'react';
import { RiCompassDiscoverLine } from 'react-icons/ri';
import useSWR from 'swr';

const Hero = dynamic(() => import('../components/Hero'), { ssr: false });

const fetcher = (url) => fetch(url).then((res) => res.json());

async function generateThumbnail(videoPath) {
	const response = await fetch('/api/generate-thumbnail', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ videoPath }),
	});

	if (response.ok) {
		const data = await response.json();
		return data.thumbnailPath;
	} else {
		console.error(
			'Erreur lors de la génération de la miniature :',
			await response.text()
		);
		return null;
	}
}

const VideoItem = memo(
	({ video, hoveredVideo, setHoveredVideo, thumbnail }) => (
		<li
			key={video.id}
			onMouseEnter={() => setHoveredVideo(video.s3url)}
			onMouseLeave={() => setHoveredVideo(null)}
		>
			{hoveredVideo === video.s3url ? (
				<Link href={`/watch/${video.id}`}>
					<MediaPlayer
						className="rounded-2xl overflow-hidden"
						muted
						autoplay
						src={`/api/proxy?url=${encodeURIComponent(
							video.s3url
						)}`}
						poster={video.s3url}
					>
						<MediaOutlet />
					</MediaPlayer>
				</Link>
			) : (
				<>
					<Link href={`/watch/${video.id}`}>
						<div className="relative">
							<img
								className="rounded-2xl overflow-hidden"
								src={thumbnail}
							/>
						</div>
						<h3 className="mt-6 text-lg font-skmodernistbold leading-8 tracking-tight text-dark dark:text-light ">
							{video.name}
						</h3>
					</Link>
				</>
			)}
		</li>
	)
);

export default function Home() {
<<<<<<< HEAD
	const [hoveredVideo, setHoveredVideo] = useState<string | null>(null); //fonction si la souris se place au deçu de la miniature d'une des vidéos
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
	}, [videos]); //Recupere toutes les videos en bdd avec son id , titre, utilisateur, l'url, le poster, le jeu et l'avater de l'utilisateur
	//UseMemo pour charger une fois et garcher en cache les éléments déjà chargé
=======
	const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
	const { data, error } = useSWR('/api/listAllVideos', fetcher);

	const [thumbnails, setThumbnails] = useState({});

	useEffect(() => {
		if (data) {
			(async () => {
				const thumbnailsPromises = data.map(async (video) => {
					const thumbnailPath = await generateThumbnail(video.s3url);
					return { videoId: video.id, thumbnailPath };
				});

				const generatedThumbnails = await Promise.all(
					thumbnailsPromises
				);
				const thumbnailsMap = generatedThumbnails.reduce(
					(acc, { videoId, thumbnailPath }) => {
						acc[videoId] = thumbnailPath;
						return acc;
					},
					{}
				);

				setThumbnails(thumbnailsMap);
			})();
		}
	}, [data]);

	if (error)
		return (
			<div>Une erreur est survenue lors du chargement des données.</div>
		);
	if (!data) return <div>Chargement...</div>;
>>>>>>> origin/feature/VidUpload

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
							<VideoItem
								key={video.id}
								video={video}
								hoveredVideo={hoveredVideo}
								setHoveredVideo={setHoveredVideo}
								thumbnail={thumbnails}
							/>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}
