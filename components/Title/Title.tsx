import {FunctionComponent} from "react";
import classNames from "classnames";

type Props = {
    className?: string
}
const Title: FunctionComponent<Props> = ({className}) => {
    return (
        <div className={`w-full p-2 font- border-b-[1px] border-[#77777777] text-center ${className}`}>
            <h1 className={"font-skmodernistregular"}>Publier</h1>
        </div>
    );
};

export default Title;