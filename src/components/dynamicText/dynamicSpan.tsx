import React, { useContext, useEffect, useState, useRef } from "react"
import { MousePosContext } from "../contexts/mouseContext"

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
    const {mousePagePos, setMousePagePos} = useContext(MousePosContext)
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

                if(!spanDinamico.classList.contains('loading')){
                    const bounds = spanDinamico.getBoundingClientRect()

                    const relative = (mouse) ? mousePagePos : notMouseObject
                    const dist = Math.sqrt(
                        Math.pow(bounds.x - relative.x, 2) + Math.pow(bounds.y - relative.y, 2)
                    )

                    spanDinamico.style.setProperty("font-variation-settings",  '"wght" ' + mapping(dist, 0, 5*spanDinamico.offsetHeight, 800, 700))
                    spanDinamico.style.setProperty("scale", "" + mapping(dist, 0, 3*spanDinamico.offsetHeight, 1.2, 1))
                    spanDinamico.style.setProperty("margin", "0 " + mapping(dist, 0, 2*spanDinamico.offsetHeight, 10, 0) + "px")

                    if(spanDinamico.parentElement?.classList.contains('blur')) spanDinamico.style.setProperty("filter", "blur(" + mapping(dist, 0, 7*spanDinamico.offsetHeight, 30, 0) + "px)")
                }
                else{
                    if(spanDinamico.parentElement?.classList.contains('blur')) spanDinamico.style.setProperty("filter", "blur(10px)")
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

function mapping(
    input: number,
    inputMin: number,
    inputMax: number,
    outputMin: number,
    outputMax: number
){
    return outputMin + ((outputMax - outputMin) / (inputMax - inputMin)) * (input - inputMin)
}