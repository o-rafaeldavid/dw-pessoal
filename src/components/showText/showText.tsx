import React from "react"
import "../../styles/showText.scss"

interface Props {
    children: String | JSX.Element | JSX.Element[]
    doShow: boolean
    rotate: boolean
    doRotate: boolean
}

export default function ShowText({children, doShow, rotate, doRotate} : Props){
    let texto : any = [];


    if(typeof children !== "string"){
        texto = React.Children.toArray(children);
    }
    else{
        texto = <p>
            {children}
        </p>
    }



    return(
        <>
        <div className={
            "showText" + 
            ((doShow) ? " show" : "") +
            ((rotate) ? " showRotate" : "") +
            ((doRotate) ? " doRotate" : "")
        }>
            {texto}
        </div>
        </>
    )
}