import {FunctionComponent} from "react";

type Props = {
    className?: string
}
const optionsUpload: FunctionComponent<Props> = ({className}) => {
    return (
        <div className={`bg-indigo-400 ${className}`}>
            options
        </div>
    )
}

export default optionsUpload;
