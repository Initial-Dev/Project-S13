import { UserPlusIcon } from '@heroicons/react/24/outline';

interface AvatarUserMobileProps {
	avatar: string;
	user: string;
}
export default function AvatarUserMobile({
	avatar,
	user,
}: AvatarUserMobileProps) {
	return (
		<div className="flex justify-between items-center w-full px-6 py-1.5">
			<div className="flex items-center gap-3">
				<button>
					<img
						src={avatar}
						alt="logo"
						className="h-10 w-10 rounded-full"
					/>
				</button>
				<h1 className="text-md text-dark dark:text-white font-skmodernistbold">
					{user}
				</h1>
			</div>
			<button className="flex items-center gap-3 px-6 py-1.5 rounded-lg border-b-2 border-gray-800/10 bg-dark/10 dark:bg-light/10 dark:border-orange-100/10">
				<h1 className="text-md text-dark dark:text-white font-skmodernistbold">
					Suivre
				</h1>
				<UserPlusIcon className="h-5 w-5" />
			</button>
		</div>
	);
}
