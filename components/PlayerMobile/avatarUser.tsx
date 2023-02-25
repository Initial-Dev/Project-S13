import { UserPlusIcon } from '@heroicons/react/24/outline';
export default function AvatarUser({ avatar, user }) {
	return (
		<div className="inline-flex items-center rounded-full text-white text-md px-6 py-1.5 gap-3  ">
			<button>
				<img
					src={avatar}
					alt="logo"
					className="h-3 w-3 rounded-full md:h-8 md:w-8"
				/>
			</button>
			<h1 className=" text-sm font-skmodernistregular">{user}</h1>
			<button>
				<UserPlusIcon className="h-3 w-3 md:h-5 md:w-5" />
			</button>
		</div>
	);
}
