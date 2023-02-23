import classNames from 'classnames';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsCircle } from 'react-icons/bs';
import { FiMoon, FiSun } from 'react-icons/fi';

const navigation = [{ href: '/', name: 'Kameground' }];

const Navbar = () => {
	const [isMounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const { theme, setTheme } = useTheme();
	const onClickToggleDark = () =>
		setTheme(theme === 'dark' ? 'light' : 'dark');

	const { pathname } = useRouter();
	return (
		<nav className="sticky font-skmodernistregular top-0 right-5 z-10 p-4 max-w-2xl mx-auto my-4 flex flex-row items-center backdrop-blur md:px-0 lg:max-w-full">
			{navigation.map(({ href, name }, index) => (
				<Link key={href} href={href}>
					<div
						className={classNames(
							'sm:ml-6 md:ml-8 text-gray-900 dark:text-gray-100',
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
					<FiSun />
				) : (
					<FiMoon className="fill-current" />
				)}
			</button>
		</nav>
	);
};

export default Navbar;
