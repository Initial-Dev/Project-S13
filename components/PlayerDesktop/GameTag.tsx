import { ChevronRightIcon } from '@vidstack/react';
interface GameBadgeProps {
	logo: string;
	gametitle: string;
}
export default function GameTag({ logo, gametitle }: GameBadgeProps) {
	return (
		<a target="_blank" href="" rel="noopener noreferrer">
			<div className="flex items-center h-10 gap-2 text-dark/90 dark:text-light/90 bg-black/15 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-900/20 dark:border-gray-100/20  rounded-full px-2 mr-auto">
				<img className="w-7 h-7 rounded-full" src={logo} alt="" />
				<h4 className="font-skmodernistregular text-md text-white tracking-wider">
					{gametitle} {/* Titre du jeu */}
				</h4>
				<ChevronRightIcon size={24} />
			</div>
		</a>
	);
}
