import { UserPlusIcon } from '@heroicons/react/24/outline';
export default function AvatarUser({ avatar, user }) {
	return (
		<div className="inline-flex items-center rounded-full text-white text-md px-6 py-1.5 gap-3  ">
			<button>
				<img src={avatar} alt="logo" className="h-8 w-8 rounded-full" />
			</button>
			<h1 className=" font-skmodernistregular">{user}</h1>
			<button>
				<UserPlusIcon className="h-5 w-5" />
			</button>
		</div>
	);
}
