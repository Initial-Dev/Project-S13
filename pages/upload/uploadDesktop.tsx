import {FunctionComponent} from "react";
import {dataToSend} from "./types";
import Title from "../../components/Title";
import FormUpload from "../../components/FormUpload";
import DragDrop from "../../components/DragDrop";
import OptionsUpload from "../../components/OptionsUpload";
import {AiOutlineCloudUpload} from "react-icons/ai";
import {BiImage} from "react-icons/bi";
import CallToAction from "../../components/CallToAction";

type Props = {
    data: dataToSend
}
const uploadDesktop: FunctionComponent<Props> = (data) => {
    return (
        <div className={"w-full h-screen absolute top-0 flex flex-col items-center justify-center"}>
            <div className={"flex flex-col items-center h-3/5 w-3/4 bg-[#77777733] rounded-3xl"}>
                <Title className={""}/>
                <div className={"h-full w-5/6 flex flex-col justify-center"}>
                    <FormUpload className={""}/>
                    <div className={"mt-5 flex flex-row"}>
                        <div className={"w-1/2 flex flex-row p-5 gap-5 justify-center"}>
                            <DragDrop icon={<AiOutlineCloudUpload className={"w-full h-full"}/>} description={"MP4 ou WebM"} />
                            <DragDrop icon={<BiImage className={"h-full w-full"} />} description={"Couverture / Miniature"}/>
                        </div>
                        <div className={"w-1/2"}>
                            <OptionsUpload />
                        </div>
                    </div>
                    <div className={"mt-5 flex flex-row justify-end w-full"}>
                        <CallToAction />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default uploadDesktop;