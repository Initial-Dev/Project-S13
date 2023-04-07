import {FunctionComponent, useEffect} from "react";
import {IoSend} from "react-icons/io5";

type Props = {
    className?: string,
    sendVideo?: any
}

const callToAction: FunctionComponent<Props> = ({className, sendVideo}) => {

    useEffect(() => {
        console.log(sendVideo)
    }, [])

    return (
        <div onClick={() => sendVideo()} className={`cursor-pointer rounded-lg flex flex-row justify-center items-center gap-3 w-1/4 h-12 bg-[#FE5821] ${className}`}>
            <IoSend className={"h-6 w-6"}/>
            <span className={"text-lg font-skmodernistbold"}>Publier</span>
        </div>
    )
}

export default callToAction;