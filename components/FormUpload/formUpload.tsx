import {FunctionComponent} from "react";
import {dataToSend} from "../../pages/upload";

type Props = {
    className?: string,
}

const formUpload: FunctionComponent<Props> = ({className}) => {

    return (
        <div className={`flex flex-col w-full gap-2 ${className}`}>
            <div className={"flex flex-col gap-1"}>
                <input className={"rounded-xl px-3 py-1 font-skmodernistregular bg-[#77777722] border-transparent p-0 focus:border-transparent focus:ring-0"} type={"text"} placeholder={"Titre de ton clip"}/>
                <textarea className={"rounded-xl px-3 py-1 font-skmodernistregular resize-none bg-[#77777722] border-transparent p-0 focus:border-transparent focus:ring-0"} placeholder={"Tu peux mettre ici la description de ton clip"}/>
            </div>
            <div className={"flex flex-row gap-4 items-center"}>
                <div className={"w-8 h-8 bg-white rounded-full"}></div>
                <span className={"font-skmodernistregular"}>Tetsuya Kuroko</span>
            </div>
        </div>
    )
}

export default formUpload;