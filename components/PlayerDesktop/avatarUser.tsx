import { PlusCircleIcon } from '@heroicons/react/24/outline';
export default function AvatarUser({ avatar, user }) {
	return (
		<div className="inline-flex items-center  text-white  px-6 py-1.5 gap-3  ">
			<button>
				<img
					src={avatar}
					alt="logo"
					className="h-4 w-4 rounded-full md:h-8 md:w-8 lg:h-10 lg:w-10 xl:h-10 xl:w-10 "
				/>
			</button>
			<h1 className=" text-md md:text-md lg:text-lg xl:text-2xl font-skmodernistregular">
				{user}
			</h1>
			<button>
				<PlusCircleIcon className="h-4 w-4 rounded-full md:h-8 md:w-8 lg:h-10 lg:w-10 xl:h-7 xl:w-7" />
			</button>
		</div>
	);
}
