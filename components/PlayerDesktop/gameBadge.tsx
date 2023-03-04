import { ChevronRightIcon } from '@heroicons/react/24/outline';
interface GameBadgeProps {
	logo: string;
	gametitle: string;
}
export default function GameBadge({ logo, gametitle }: GameBadgeProps) {
	return (
		<button className=" inline-flex items-center rounded-full px-6 py-0.5 text-white/90 font-skmodernistregular bg-black/15 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100/20 gap-3  ">
			<img
				src={logo}
				alt="logo"
				className="h-3 w-3 rounded-sm md:h-8 md:w-8 md:rounded-lg "
			/>
			<div className="hidden text-sm sm:block font-skmodernistregular">
				{gametitle}
			</div>
			<ChevronRightIcon className="h-3 w-3" />
		</button>
	);
}
