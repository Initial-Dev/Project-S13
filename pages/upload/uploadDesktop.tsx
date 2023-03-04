import {FunctionComponent} from "react";
import {dataToSend} from "./types";

type Props = {
    data: dataToSend
}
const uploadDesktop: FunctionComponent<Props> = (data) => {
    return (
        <div className={"flex flex-grow items-center justify-center w-screen bg-white "}>
            <div className={"w-full h-full "}>
                Upload Desktop
            </div>
        </div>
    );
};

export default uploadDesktop;