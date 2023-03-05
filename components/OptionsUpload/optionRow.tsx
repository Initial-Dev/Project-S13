import {FunctionComponent} from "react";
import {category} from "./optionsUpload";
import {RxCaretRight} from "react-icons/rx";
import Slider from "./Slider";

type Props = {
    className?: string,
    category: category
}

const optionRow: FunctionComponent<Props> = ({className, category}) => {
    return (
        <div className={"w-full flex flex-row items-center justify-between"}>
            <div className={"flex flex-row items-center gap-5"}>
                <div className={"h-6 w-6"}>
                    {category.icon}
                </div>
                <div className={"flex flex-col"}>
                    <span className={"text-xs"}>
                        {category.name}
                    </span>
                    <span>
                        {category.value}
                    </span>
                </div>
            </div>
            <div className={""}>
                { category.slider ? (
                    <Slider />
                ) : (
                    <RxCaretRight className={"h-8 w-8"} />
                )}
            </div>
        </div>
    )
}

export default optionRow;