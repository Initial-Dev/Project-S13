import {FunctionComponent} from "react";
import {ImEarth, ImUsers} from "react-icons/im";
import {FiMessageSquare} from "react-icons/fi";
import OptionRow from "./optionRow";

type Props = {
    className?: string
}

export type category = {
    icon: JSX.Element,
    name: string,
    value: string,
    slider?: boolean
}
const optionsUpload: FunctionComponent<Props> = ({className}) => {

    const categories: category[]  = [
        {
            icon: <ImEarth className={"w-full h-full"} />,
            name: "Visibilité",
            value: "Publique",
        },
        {
            icon: <ImUsers className={"w-full h-full"} />,
            name: "Identification",
            value: "Identifier un jouer",
        },
        {
            icon: <FiMessageSquare className={"w-full h-full"} />,
            name: "Commentaires",
            value: "Autoriser les commentaires",
            slider: true
        }
    ]

    return (
        <div className={`h-full w-full flex flex-col justify-around ${className}`}>
            {
                categories.map((category, index) => {
                    return (
                        <OptionRow category={category} key={index}/>
                    )
                })
            }
        </div>
    )
}

export default optionsUpload;
