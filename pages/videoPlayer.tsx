import type { NextPage } from 'next';
import Head from 'next/head';
import VideoPlayer from '../components/VideoPlayer';

const Home: NextPage = () => {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center py-2">
			<Head>
				<title>Kameground | video player</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
				<VideoPlayer />
			</main>
		</div>
	);
};

export default Home;