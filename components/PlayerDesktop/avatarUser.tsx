import { UserPlusIcon } from '@heroicons/react/24/outline';
export default function AvatarUser({ avatar, user }) {
	return (
		<div className="inline-flex items-center  text-white  px-6 py-1.5 gap-3  ">
			<button>
				<img
					src={avatar}
					alt="logo"
					className="h-2 w-2 rounded-full md:h-8 md:w-8  "
				/>
			</button>
			<h1 className=" text-md font-skmodernistregular">{user}</h1>
			<button>
				<UserPlusIcon className="h-5 w-5" />
			</button>
		</div>
	);
}
