import {FunctionComponent} from "react";
import {dataToSend} from "../../app/upload/page";

type Props = {
    data: dataToSend
}
const uploadMobile: FunctionComponent<Props> = (data) => {
    return (
        <div>
            <h1>Mobile Upload</h1>
        </div>
    );
};

export default uploadMobile;