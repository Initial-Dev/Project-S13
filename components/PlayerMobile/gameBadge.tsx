import { ChevronRightIcon } from '@heroicons/react/24/outline';
export default function GameBadge({ logo, gametitle }) {
	return (
		<button className="inline-flex items-center rounded-full px-6 py-0.5 text-md text-white/90 font-skmodernistregular bg-black/15 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100/20 gap-3  ">
			<img src={logo} alt="logo" className="h-8 w-8 rounded-lg" />
			{gametitle}
			<ChevronRightIcon className=" h-3 w-3" />
		</button>
	);
}
