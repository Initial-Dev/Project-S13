import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { BiLogOutCircle, BiMovie } from 'react-icons/bi';
import { BsBookmark, BsCircle, BsDiscord } from 'react-icons/bs';
import { FaDiscord, FaUserCircle } from 'react-icons/fa';
import {
	RiClipboardLine,
	RiCompassDiscoverLine,
	RiDiscordLine,
	RiHeart2Fill,
	RiLayoutGridFill,
	RiMoonLine,
	RiSunLine,
	RiUpload2Line,
	RiUserLine,
} from 'react-icons/ri';
import styles from './header.module.css';

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

	const { data: session, status } = useSession();
	const loading = status === 'loading';

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

				<div className="flex items-center flex-shrink-0 space-x-4  absolute right-0">
					<p
						className={`nojs-show ${
							!session && loading ? styles.loading : styles.loaded
						}`}
					>
						{!session && (
							<>
								<button
									className="gap-2 inline-flex items-center rounded-lg overflow-hidden bg-primary backdrop-blur px-3.5 py-1.5 text-sm font-medium text-white"
									onClick={() => signIn('discord')}
								>
									<FaDiscord />
									Connexion
								</button>
							</>
						)}
					</p>
					{session?.user && (
						<>
							<button className="gap-2 inline-flex items-center rounded-lg overflow-hidden bg-primary backdrop-blur px-3.5 py-1.5 text-sm font-medium text-white  ">
								<BiMovie />
								Créer
							</button>
							<Menu
								as="div"
								className="relative inline-block text-left"
							>
								<div>
									<Menu.Button className="inline-flex items-center justify-center gap-4 w-full rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
										{session?.user && (
											<>
												{session.user.image && (
													<span
														style={{
															backgroundImage: `url('${session.user.image}')`,
														}}
														className={
															styles.avatar
														}
													/>
												)}
												<span>
													<strong className="text-dark dark:text-light">
														{session.user.email ??
															session.user.name}
													</strong>
												</span>
											</>
										)}
									</Menu.Button>
								</div>
								<Transition
									as={Fragment}
									enter="transition ease-out duration-100"
									enterFrom="transform opacity-0 scale-95"
									enterTo="transform opacity-100 scale-100"
									leave="transition ease-in duration-75"
									leaveFrom="transform opacity-100 scale-100"
									leaveTo="transform opacity-0 scale-95"
								>
									<Menu.Items className="absolute  right-0 mt-2 w-56 origin-top-right divide-y divide-gray-200 dark:divide-gray-100/10  rounded-md bg-light dark:bg-dark shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
										<div className="px-1 py-1 ">
											<Menu.Item>
												{({ active }) => (
													<button
														className={`${
															active
																? 'bg-primary text-white'
																: 'text-dark dark:text-white'
														} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
													>
														<RiUserLine
															className="mr-2 h-5 w-5"
															aria-hidden="true"
														/>
														Profil
													</button>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<button
														className={`${
															active
																? 'bg-primary text-white'
																: 'text-dark dark:text-white'
														} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
													>
														<RiHeart2Fill
															className="mr-2 h-5 w-5"
															aria-hidden="true"
														/>
														Favoris
													</button>
												)}
											</Menu.Item>
										</div>

										<div className="px-1 py-1">
											<Menu.Item>
												{({ active }) => (
													<button
														className={`${
															active
																? 'bg-gray-100 dark:bg-light/10 text-white'
																: 'text-dark dark:text-white'
														} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
														onClick={(e) => {
															e.preventDefault();
															signOut();
														}}
													>
														<BiLogOutCircle
															className="mr-2 h-5 w-5 text-white"
															aria-hidden="true"
														/>
														Déconnexion
													</button>
												)}
											</Menu.Item>
										</div>
									</Menu.Items>
								</Transition>
							</Menu>
						</>
					)}
					<button
						className="p-2"
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
				</div>
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
