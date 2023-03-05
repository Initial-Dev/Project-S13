import {FunctionComponent, ReactNode} from "react";
import {IconType} from "react-icons";

type Props = {
    className?: string,
    icon: ReactNode,
    description: string
}
const dragDrop: FunctionComponent<Props> = ({className, icon, description}) => {
    return (
        <>
            <input type={"file"} id={"upload"} className={"hidden"}/>
            <label htmlFor={"upload"} className={`flex flex-col items-center gap-3 h-36 w-1/2 rounded-lg border-dashed border-[1px] border-white ${className}`}>
                <div className={"mt-5 h-1/4 w-1/4"}>
                    { icon }
                </div>
                <div className={"text-xs text-center"}>
                    { description }
                </div>
            </label>
        </>
    )
}

export default dragDrop;
