import { UserPlusIcon } from '@heroicons/react/24/outline';
export default function AvatarUserMobile({ avatar, user }) {
	return (
		<div className="inline-flex items-center rounded-full px-6 py-1.5 gap-3  ">
			<button>
				<img
					src={avatar}
					alt="logo"
					className="h-4 w-4 rounded-full "
				/>
			</button>
			<h1 className="text-xs text-white font-skmodernistregular">
				{user}
			</h1>
			<button>
				<UserPlusIcon className="h-3 w-3 md:h-5 md:w-5" />
			</button>
		</div>
	);
}
