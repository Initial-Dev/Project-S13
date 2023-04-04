import {
	AnimatePresence,
	motion,
	PanInfo,
	useMotionValue,
	useTransform,
} from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import VideoDesktop from '../../components/PlayerDesktop';
import InfoKeyboard from '../../components/PlayerDesktop/infoKeyboard';
import VideoMobile from '../../components/PlayerMobile';
import videos from '../../videos.json';

const fetcher = (url) => fetch(url).then((res) => res.json());

export const VideoPlayer = () => {
	const router = useRouter();
	const [isMobile, setIsMobile] = useState(false);
	const [video, setVideo] = useState<Video | null>(null);
	const [index, setIndex] = useState(0);
	const [exitX, setExitX] = useState('100%');

<<<<<<< HEAD
	const videosList = useMemo(
		() =>
			videos.map(({ id, title, user, url, poster, game, avatar }) => ({
				id,
				title,
				user,
				url,
				poster,
				game,
				avatar,
			})),
		[videos] //useMemo pour garder eb cache les données
	);
=======
	const { data: videos, error } = useSWR('/api/listAllVideos', fetcher);

	if (error)
		return (
			<div>Une erreur est survenue lors du chargement des données.</div>
		);
	if (!videos) return <div>Chargement...</div>;
>>>>>>> origin/feature/VidUpload

	interface CardProps {
		title?: string;
		imageSrc?: string;
		description?: string;
		drag?: any;
		initial: any;
		animate: any;
		transition: any;
		exitX?: any;
	}

	type Video = {
		id: any;
		title: any;
		user: any;
		url: any;
		poster: any;
		game: any;
		avatar: any;
	};

	function Card(props: CardProps) {
		const x = useMotionValue(0);
		const scale = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]); //animation de zoom
		const rotate = useTransform(x, [-150, 0, 150], [-45, 0, 45], {
			clamp: false,
		}); //animation de rotation

		return (
			<>
				<motion.div
					style={{
						width: '50%',
						height: 500,
						position: 'absolute',
						top: 0,
						left: 10,
						x: x,
						cursor: 'grab',
					}}
					whileTap={{ cursor: 'grabbing' }}
					drag={props.drag} //activation du drag
					dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }} //contraintes de drag
					initial={props.initial}
					animate={props.animate}
					transition={props.transition}
					exit={{
						x: props.exitX,
						opacity: 0,
						scale: 0.5,
						transition: { duration: 0.2 }, //animation de sortie
					}}
				>
					<img
						className="rounded-xl"
						src={
							videos[
								(videos.findIndex(
									(v) => v.id === (video ? video.id : null)
								) +
									videos.length -
									1) %
<<<<<<< HEAD
									videosList.length
							].poster //image de gauche
=======
									videos.length
							].poster
>>>>>>> origin/feature/VidUpload
						}
						alt=""
					/>
				</motion.div>
			</>
		);
	}

	function CardR(props: CardProps) {
		const x = useMotionValue(0); //position de la carte
		const scale = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]); //animation de zoom
		const rotate = useTransform(x, [-150, 0, 150], [-45, 0, 45], {
			clamp: false,
		}); //animation de rotation

		return (
			<>
				<motion.div
					style={{
						width: '50%',
						height: 500,
						position: 'absolute',
						top: 0,
						right: 10,
						x: x,
						cursor: 'grab',
					}}
					whileTap={{ cursor: 'grabbing' }}
					drag={props.drag}
					dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
					initial={props.initial}
					animate={props.animate}
					transition={props.transition}
					exit={{
						x: props.exitX,
						opacity: 0,
						scale: 0.5,
						transition: { duration: 0.2 },
					}}
				>
					<img
						className="rounded-xl"
						src={
							videos[
								(videos.findIndex(
									(v) => v.id === (video ? video.id : null)
								) +
									1) %
<<<<<<< HEAD
									videosList.length
							].poster //image de droite
=======
									videos.length
							].poster
>>>>>>> origin/feature/VidUpload
						}
						alt=""
					/>
				</motion.div>
			</>
		);
	}

	interface CardNextProps {
		index: number;
		setIndex: (index: number) => void;
		handleNext?: () => void;
		handlePrevious?: () => void;
		setExitX: any;
		drag: any;
		initial?: any;
		animate: any;
		transition: any;
		exitX: any;
		videosList: any;
	} //interface pour le composant CardNext
	//Video Player Desktop situé au milieu de la page avec son animation de drag
	function CardNext(props: CardNextProps) {
		const x = useMotionValue(0);

		const scale = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]); //animation de scale
		const rotate = useTransform(x, [-150, 0, 150], [-45, 0, 45], {
			clamp: false,
		}); //animation de rotation

		function handleDragEnd(event: MouseEvent, info: PanInfo) {
			//fonction de grab vidéo
			if (info.offset.x < -100) {
				props.setExitX(-250);
				props.setIndex(props.index + 1);
				handlePrevious();
			}
			if (info.offset.x > 100) {
				props.setExitX(250);
				props.setIndex(props.index + 1);
				handleNext();
			}
		}

		function handleNext() {
<<<<<<< HEAD
			const currentIndex = videosList.findIndex(
				//fonction vidéo suivante
=======
			const currentIndex = videos.findIndex(
>>>>>>> origin/feature/VidUpload
				(v) => v.id === (video ? video.id : null)
			);
			const nextIndex = (currentIndex + 1) % videos.length;
			setVideo(videos[nextIndex]);
		}

		function handlePrevious() {
<<<<<<< HEAD
			//fonction vidéo précédente
			const currentIndex = videosList.findIndex(
=======
			const currentIndex = videos.findIndex(
>>>>>>> origin/feature/VidUpload
				(v) => v.id === (video ? video.id : null)
			);
			const previousIndex =
				(currentIndex + videos.length - 1) % videos.length;
			setVideo(videos[previousIndex]);
		}

		return (
			<>
				<motion.div
					style={{
						width: '50%',
						height: '50%',
						position: 'absolute',
						top: 0,

						x: x,
						cursor: 'grab',
					}}
					whileTap={{ cursor: 'grabbing' }}
					drag={props.drag}
					dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
					onDragEnd={handleDragEnd}
					initial={props.initial}
					animate={props.animate}
					transition={props.transition}
					exit={{
						x: props.exitX,
						opacity: 0,
						scale: 0.5,
						transition: { duration: 0.2 },
					}}
				>
					<VideoDesktop
						url={video ? video.url : ''}
						logo={video ? video.game.logo : ''}
						gametitle={video ? video.game.title : ''}
						avatar={video ? video.avatar : ''}
						user={video ? video.user : ''}
					/>
					<h1 className="text-dark dark:text-light text-sm md:text-lg lg:text-xl xl:text-2xl font-skmodernistbold">
						{video ? video.title : ''}
					</h1>
				</motion.div>
			</>
		);
	}

	useEffect(() => {
		setIsMobile(/Mobi/.test(navigator.userAgent)); //Detecter si nous sommes sur mobile ou non, Change de VideoPlayer en fonction
	}, []);

	// useEffect pour mettre à jour la vidéo sélectionnée
	useEffect(() => {
<<<<<<< HEAD
		// On cherche dans la liste de vidéos l'élément qui a le même id que celui dans l'URL
=======
		if (!videos) return;

>>>>>>> origin/feature/VidUpload
		const selectedVideo = videos.find(
			(item) => item.id === router.query.id
		);
		// Si on a trouvé une vidéo correspondante, on la met à jour avec setVideo
		if (selectedVideo) {
			setVideo(selectedVideo);
		}
	}, [router.query, videos]);

	// useEffect pour mettre à jour l'URL de la page si la vidéo change
	useEffect(() => {
		// Si on a une vidéo sélectionnée
		if (video) {
			// On récupère l'id de la vidéo dans l'URL actuelle
			const { id: currentId } = router.query;
			// Si l'id dans l'URL est différent de l'id de la vidéo sélectionnée, on met à jour l'URL
			if (currentId !== video.id) {
				router.push(`/watch/${video.id}`, undefined, {
					shallow: true,
				});
			}
		}
	}, [video]);

	return (
		<>
			<Head>
				<title>{video ? video.title : ''}</title>
				<meta name="description" content="kamegroud | Discover" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{video && (
				<>
					{isMobile ? (
						<>
							<div className="app">
								<div className="app__videos">
									{videos.map((video, index) => (
										<>
											<VideoMobile
												key={video.id}
												url={video.url}
												logo={video.game.logo}
												gametitle={video.game.title}
												avatar={video.avatar}
												user={video.user}
												title={video.title}
												nextVideoUrl={
													index < videos.length - 1
														? videos[index + 1].url
														: null
												}
											/>
										</>
									))}
								</div>
							</div>
						</>
					) : (
						<motion.div
							style={{
								marginTop: '10px',
								marginBottom: '10px',
								width: '100%',
								height: '100%',
								position: 'relative',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<AnimatePresence initial={false}>
								<Card
									key={index + 1}
									initial={{ scale: 0, y: 105, opacity: 0 }}
									animate={{
										scale: 0.75,
										y: 30,
										opacity: 0.5,
									}}
									transition={{
										scale: { duration: 0.2 },
										opacity: { duration: 0.4 },
									}}
								/>

								<CardR
									key={index + 2}
									initial={{ scale: 0, y: 105, opacity: 0 }}
									animate={{
										scale: 0.75,
										y: 30,
										opacity: 0.5,
									}}
									transition={{
										scale: { duration: 0.2 },
										opacity: { duration: 0.4 },
									}}
								/>

								<CardNext
									videosList={videosList}
									key={index}
									animate={{ scale: 1, y: 0, opacity: 1 }}
									transition={{
										type: 'spring',
										stiffness: 300,
										damping: 20,
										opacity: { duration: 0.2 },
									}}
									exitX={exitX}
									setExitX={setExitX}
									index={index}
									setIndex={setIndex}
									drag="x"
								/>
							</AnimatePresence>
						</motion.div>
					)}
				</>
			)}
		</>
	);
};

export default VideoPlayer;
