import { Dialog, Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { BiMovie } from 'react-icons/bi';
import { BsBookmark, BsCircle } from 'react-icons/bs';
import { FaDiscord, FaUserCircle } from 'react-icons/fa';
import {
	RiCompassDiscoverLine,
	RiLayoutGridFill,
	RiMoonLine,
	RiSunLine,
} from 'react-icons/ri';

import {
	HiArrowLeft,
	HiHeart,
	HiOutlineHeart,
	HiUserCircle,
} from 'react-icons/hi2';
import UserCommand from './userCommand';

const navigation = [
	{ href: '/', name: 'Kameground', icon: RiCompassDiscoverLine },
];

const footerNavigation = [
	{ href: '/', name: 'Explorer', icon: RiCompassDiscoverLine },
	{ href: '/videos', name: 'Parcourir', icon: RiLayoutGridFill },
];

const menuItems = [
	{
		id: 1,
		icon: <HiUserCircle className="mr-2 h-5 w-5" aria-hidden="true" />,
		label: 'Profil',
		onClick: () => console.log('Profil clicked'),
	},
	{
		id: 2,
		icon: <HiOutlineHeart className="mr-2 h-5 w-5" aria-hidden="true" />,
		label: 'Favoris',
		onClick: () => console.log('Favoris clicked'),
	},
	{
		id: 3,
		icon: <HiArrowLeft className="mr-2 h-5 w-5" aria-hidden="true" />,
		label: 'Déconnexion',
		onClick: signOut,
	},
];

const Navbar = () => {
	const [isMounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);
	const router = useRouter();

	const { theme, setTheme } = useTheme();
	const onClickToggleDark = () =>
		setTheme(theme === 'dark' ? 'light' : 'dark');

	const { pathname } = useRouter();

	const { data: session, status } = useSession();

	const ConnectedMenu = [
		{
			id: 1,
			icon: (
				<RiCompassDiscoverLine className="h-7 w-7" aria-hidden="true" />
			),
			label: 'Explorer',
			onClick: () => console.log('Explorer clicked'),
		},
		{
			id: 2,
			icon: <RiLayoutGridFill className="h-7 w-7" aria-hidden="true" />,
			label: 'Parcourir',
			onClick: () => console.log('Parcourir clicked'),
		},
		{
			id: 3,
			icon: <HiHeart className="h-7 w-7" aria-hidden="true" />,
			label: 'Favoris',
			onClick: signOut,
		},
		{
			id: 4,
			icon: <UserCommand />,
			label: 'Profil',
		},
	];

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
					<p>
						{!session && (
							<>
								<button
									className="gap-2 inline-flex items-center rounded-lg overflow-hidden bg-discord backdrop-blur px-3.5 py-1.5 text-sm font-skmodernistregular text-white"
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
							<div className="hidden xl:inline-block lg:inline-block md:inline-block sm:inline-block">
								<button
									className="gap-2 inline-flex items-center rounded-lg overflow-hidden bg-primary backdrop-blur px-3.5 py-1.5 text-sm font-medium text-white"
									onClick={() => router.push('/upload')}
								>
									<BiMovie />
									Créer
								</button>
							</div>
							<Menu
								as="div"
								className="relative inline-block text-left"
							>
								<div>
									<div className="hidden md:inline-block lg:inline-block xl:inline-block">
										<Menu.Button className=" inline-flex items-center justify-center gap-4 w-full rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
											{session?.user && (
												<>
													{session.user.image && (
														<span
															style={{
																backgroundImage: `url('${session.user.image}')`,
															}}
															className="rounded-full float-left h-8 w-8 bg-white bg-cover bg-no-repeat"
														/>
													)}
													<span>
														<strong className="text-dark dark:text-light">
															{session.user
																.email ??
																session.user
																	.name}
														</strong>
													</span>
												</>
											)}
										</Menu.Button>
									</div>
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
										{menuItems.map((item) => (
											<div
												key={item.id}
												className="px-1 py-1 "
											>
												<Menu.Item>
													{({ active }) => (
														<button
															className={`${
																active
																	? 'bg-light/10 text-white'
																	: 'text-dark dark:text-white'
															} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
															onClick={() =>
																item.onClick()
															}
														>
															{item.icon}
															{item.label}
														</button>
													)}
												</Menu.Item>
											</div>
										))}
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
				<nav className="fixed z-20 bg-dark/20 dark:bg-dark/40 rounded-t-xl border-t-2 border-gray-800/10 dark:border-gray-100/10 bottom-0 left-0 right-0 p-2 mx-auto flex flex-row items-center justify-center md:hidden backdrop-blur">
					<div className="flex flex-row justify-center gap-12">
						{!session && (
							<>
								{footerNavigation.map(
									({ href, name, icon: Icon }) => (
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
									)
								)}
							</>
						)}
						{session?.user && (
							<>
								<>
									{ConnectedMenu.map((item) => (
										<div className="flex flex-col gap-1 items-center justify-center">
											<span className="h-7 w-7 text-dark dark:text-light ">
												{item.icon}
											</span>
											<span className="text-xs text-dark/70 dark:text-light/70 font-skmodernistbold ">
												{item.label}
											</span>
										</div>
									))}
								</>
							</>
						)}
					</div>
				</nav>
			)}
		</>
	);
};

export default Navbar;
