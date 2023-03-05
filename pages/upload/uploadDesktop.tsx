import {FunctionComponent} from "react";
import {dataToSend} from "./types";
import Title from "../../components/Title";
import FormUpload from "../../components/FormUpload";

type Props = {
    data: dataToSend
}
const uploadDesktop: FunctionComponent<Props> = (data) => {
    return (
        <div className={"w-full h-screen absolute top-0 flex flex-col items-center justify-center"}>
            <div className={"flex flex-col items-center h-3/5 w-3/4 bg-[#77777733] rounded-3xl"}>
                <Title className={""}/>
                <div className={"h-full w-5/6 flex flex-col mt-3"}>
                    <FormUpload className={""}/>
                    <div className={"bg-red-600 mt-5"}>

                    </div>
                    <div className={"mt-5"}>
                        hop
                    </div>
                </div>
            </div>
        </div>
    );
};

export default uploadDesktop;