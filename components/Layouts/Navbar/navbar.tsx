import classNames from 'classnames';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsBookmark, BsCircle } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import {
	RiCompassDiscoverLine,
	RiLayoutGridFill,
	RiMoonLine,
	RiSunLine,
} from 'react-icons/ri';
const navigation = [
	{ href: '/', name: 'Kameground', icon: RiCompassDiscoverLine },
];

const footerNavigation = [
	{ href: '/', name: 'Explorer', icon: RiCompassDiscoverLine },
	{ href: '/videos', name: 'Parcourir', icon: RiLayoutGridFill },
	{ href: '/games', name: 'Favoris', icon: BsBookmark },
	{ href: '/channels', name: 'Profil', icon: FaUserCircle },
];
const Navbar = () => {
	const [isMounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const { theme, setTheme } = useTheme();
	const onClickToggleDark = () =>
		setTheme(theme === 'dark' ? 'light' : 'dark');

	const { pathname } = useRouter();
	return (
		<>
			<nav className="sticky border-b-2 border-gray-800/10 bg-dark/10 dark:border-gray-100/10 font-skmodernistregular top-0 right-5 z-40 p-4 mx-auto flex flex-row items-center backdrop-blur md:px-0 lg:max-w-full">
				{navigation.map(({ href, name }, index) => (
					<Link key={href} href={href}>
						<div
							className={classNames(
								'sm:ml-6 md:ml-8 text-dark dark:text-light',
								{
									'ml-4': index > 0,
									'  cursor-not-allowed': pathname === href,
								}
							)}
						>
							{name}
						</div>
					</Link>
				))}
				<button
					className="ml-auto p-2 rounded"
					aria-label="Toggle Dark mode"
					onClick={onClickToggleDark}
				>
					{!isMounted ? (
						<BsCircle />
					) : theme === 'dark' ? (
						<RiSunLine />
					) : (
						<RiMoonLine className="fill-current" />
					)}
				</button>
			</nav>
			{/* Condition pour afficher la deuxième navbar uniquement sur les écrans de taille mobile */}
			{isMounted && (
				<nav className="fixed z-10 bg-dark/20 dark:bg-dark/40 rounded-t-xl border-t-2 border-gray-800/10 dark:border-gray-100/10 bottom-0 left-0 right-0 p-2 mx-auto flex flex-row items-center justify-center md:hidden backdrop-blur">
					<div className="flex flex-row justify-center gap-12">
						{footerNavigation.map(({ href, name, icon: Icon }) => (
							<a
								key={href}
								href={href}
								className="flex flex-col gap-1 items-center justify-center"
							>
								<span className="text-3xl text-dark dark:text-light ">
									<Icon />
								</span>
								<span className="text-xs text-dark/70 dark:text-light/70 font-skmodernistbold ">
									{name}
								</span>
							</a>
						))}
					</div>
				</nav>
			)}
		</>
	);
};

export default Navbar;
