import { AddUserIcon } from '@vidstack/react';
interface AvatarTagProps {
	avatar: string;
	user: string;
}
export default function AvatarTag({ avatar, user }: AvatarTagProps) {
	return (
		<a target="_blank" href="" rel="noopener noreferrer">
			<div className="flex items-center h-10 gap-2 text-dark/90 dark:text-light/90 px-2 mr-auto">
				<img className="w-7 h-7 rounded-full" src={avatar} alt="" />
				<h4 className="font-skmodernistregular text-md text-white tracking-wider">
					{user} {/* Nom de l'utilisateur  */}
				</h4>
				<AddUserIcon size={24} />
			</div>
		</a>
	);
}
