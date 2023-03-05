import Head from 'next/head';
import { FunctionComponent, useState } from 'react';
import UploadDesktop from './uploadDesktop';
import UploadMobile from './uploadMobile';

export type dataToSend = {
	video: File | null;
	thumbnail: File | null;
	title: string;
	description: string;
	visibility: boolean;
	tags: number[];
	allowComments: boolean;
	idUser: number;
};
const upload: FunctionComponent = () => {
	const isMobile = false;

	const [dataToSend, setDataToSend] = useState<dataToSend>({
		video: null,
		thumbnail: null,
		title: '',
		description: '',
		visibility: false,
		tags: [],
		allowComments: false,
		idUser: 0,
	});

	const sendVideo = async () => {
		if (
			!dataToSend.video ||
			!dataToSend.thumbnail ||
			!dataToSend.title ||
			!dataToSend.description ||
			!dataToSend.visibility ||
			!dataToSend.tags ||
			!dataToSend.allowComments ||
			!dataToSend.idUser
		) {
			console.error('Missing data');
			return;
		}
		/*const formData = new FormData();
        formData.append("video", dataToSend.video);
        formData.append("thumbnail", dataToSend.thumbnail);
        formData.append("title", dataToSend.title);
        formData.append("description", dataToSend.description);
        formData.append("visibility", dataToSend.visibility ? "1" : "0");
        formData.append("tags", dataToSend.JSON.stringify(tags));
        formData.append("allowComments", dataToSend.allowComments ? "1" : "0");
        formData.append("idUser", dataToSend.idUser.toString());

        const response = await fetch("http://localhost:3000/api/videos", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        console.log(data);*/
		console.log('Video sent');
	};

	return (
		<>
			<Head>
				<title>Kameground | Upload</title>
				<meta name="description" content="kamegroud | Discover" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<div className={'w-full'}>
					{isMobile ? (
						<UploadMobile data={dataToSend} />
					) : (
						<UploadDesktop data={dataToSend} />
					)}
				</div>
			</main>
		</>
	);
};

export default upload;
