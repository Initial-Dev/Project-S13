import {FunctionComponent, useEffect, useState} from "react";
import UploadMobile from "./uploadMobile";
import UploadDesktop from "./uploadDesktop";

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
        title: "",
        description: "",
        visibility: false,
        tags: [],
        allowComments: false,
        idUser: 0
    })

    const [video, setVideo] = useState<File | null>(null);

    useEffect(() => {
        console.log(dataToSend.video);
    }, [dataToSend.video]);

    const sendVideo = async () => {
        if (!video) {
            console.error("Missing data");
            return;
        }
        const formData = new FormData();
        formData.append("video", video ? video : "");
        /*
        formData.append("video", dataToSend.video);
        formData.append("thumbnail", dataToSend.thumbnail);
        formData.append("title", dataToSend.title);
        formData.append("description", dataToSend.description);
        formData.append("visibility", dataToSend.visibility ? "1" : "0");
        formData.append("tags", dataToSend.JSON.stringify(tags));
        formData.append("allowComments", dataToSend.allowComments ? "1" : "0");
        formData.append("idUser", dataToSend.idUser.toString());

        const response = await fetch("http://localhost:3000/api/upload", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        console.log(data);*/
        const response = await fetch("https://kameground.com/api/upload", {
            method: "POST",
            body: formData
        }).then((response) => {
            if (response.ok) {
                console.log("upload successful")
            } else {
                console.log("Error upload")
            }
        });

    }

    return (
        <div className={"w-full"}>
            {
                isMobile ? (
                    <UploadMobile data={dataToSend}  />
                ) : (
                    <UploadDesktop sendVideo={sendVideo} video={{video, setVideo}} data={dataToSend} />
                )
            }
        </div>
    );
};

export default upload;
