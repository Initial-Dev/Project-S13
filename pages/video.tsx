import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Player from '../components/player';

const Home: NextPage = () => {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center py-2">
			<Head>
				<title>Kameground | video player</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
				<Player />
			</main>
		</div>
	);
};

export default Home;
