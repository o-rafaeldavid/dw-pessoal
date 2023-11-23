import React, { useContext, useEffect, useState, useRef } from "react"
import { MousePosContext } from "../contexts/mouseContext"
import { isMobile } from "react-device-detect"
import { WindowDimensionContext } from "../contexts/dimensionContext"
import { mapear } from "../../_universal/miscFunctions"


interface NOTMouseObject {
    x: number | undefined
    y: number | undefined
}

interface Props {
    children: string
    className: string
    mouse: boolean
    notMouseObject?: NOTMouseObject
}

export default function DynamicSpan({children, className, mouse, notMouseObject} : Props){
    const inicializar = useRef<boolean>(true);
    const dynamicSpan = useRef<HTMLSpanElement>(null);
    const {mousePagePos} = useContext(MousePosContext)
    const {windowWidth, windowHeight} = useContext(WindowDimensionContext)
    //const [variableWeight, setVariableWeight] = useState(0)
    //font-variation-settings 

    useEffect(
        () => {
            if(inicializar.current){
                inicializar.current = false;
                return;
            }

            const spanDinamico = dynamicSpan.current;
            if(spanDinamico !== null){
                const bounds = spanDinamico.getBoundingClientRect()

                const relative = (mouse) ? mousePagePos : notMouseObject
                const dist = Math.sqrt(
                    Math.pow(bounds.x - relative.x, 2) + Math.pow(bounds.y - relative.y, 2)
                )

                spanDinamico.style.setProperty(
                    "font-variation-settings", 
                    '"wght" ' + mapear(dist, 0, 5 * spanDinamico.offsetHeight, 800, 700)
                )
                spanDinamico.style.setProperty(
                    "scale",
                    "" + mapear(dist, 0, 5 * spanDinamico.offsetHeight , 1.2, 1)
                )
                spanDinamico.style.setProperty(
                    "margin",
                    "0 " + mapear(dist, 0, ((windowHeight / windowWidth < 1) ? 2 : 4) * spanDinamico.offsetHeight, mapear(windowWidth, 1920, 0, 10, 1), 0) + "px"
                )

                if(spanDinamico.parentElement?.classList.contains('blur')){
                    spanDinamico.style.setProperty(
                        "filter",
                        "blur(" + mapear(dist, 0, 7 * spanDinamico.offsetHeight, 30, 0) + "px)"
                    )
                }
            }
        }, [(mouse) ? mousePagePos : notMouseObject]
    );

    return(
        <span
            className={"dynamicSpan" + className}
            ref={dynamicSpan}
        >
            {children}
        </span>
    );
}