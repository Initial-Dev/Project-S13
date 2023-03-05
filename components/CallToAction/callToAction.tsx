import {FunctionComponent} from "react";
import {IoSend} from "react-icons/io5";

type Props = {
    className?: string
}

const callToAction: FunctionComponent<Props> = ({className}) => {
    return (
        <div className={`rounded-lg flex flex-row justify-center items-center gap-3 w-1/4 h-12 bg-[#FE5821] ${className}`}>
            <IoSend className={"h-6 w-6"}/>
            <span className={"text-lg font-skmodernistbold"}>Publier</span>
        </div>
    )
}

export default callToAction;