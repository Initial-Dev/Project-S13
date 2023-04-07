import {FunctionComponent, useState} from "react";

type Props = {
    className?: string
}

const slider: FunctionComponent<Props> = ({className}) => {

    const [slider, setSlider] = useState<boolean>(false);

    return (
        <div className={`cursor-pointer w-10 h-5 ${ slider ? "bg-[#0BE09B]" : "bg-[#77777733]"} rounded-full relative ${className}`} onClick={() => setSlider(!slider)}>
            <div className={`w-5 h-5 bg-white rounded-full absolute ${slider ? 'right-0' : 'left-0'}`} />
        </div>
    )
}

export default slider;