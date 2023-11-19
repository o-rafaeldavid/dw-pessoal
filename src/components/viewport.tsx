import React from "react";

interface Props {
    children?: string | JSX.Element[] | JSX.Element
    className?: string | undefined
    id?: string | undefined
}

export default function Viewport({children, className, id} : Props){
    return(
        <>
            <div
                className={"viewport " + ((className === undefined) ? "" : className)}
                id={id}
            >
                {React.Children.toArray(children)}
            </div>
        </>
    )
}