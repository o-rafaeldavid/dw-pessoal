import { useEffect } from "react";
import { To } from "react-router-dom";
import { Position } from "./interfaces";

export function sendStateToLoading(stateToRoute : any, route : To, from : To){
    return {
        stateToRoute: stateToRoute,
        route: route,
        from: from
    }
}

export function useEventListener(
    DOC : HTMLElement | Window | Document,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
){
    useEffect(
        () => {
            (options !== undefined)
                ? DOC.addEventListener(type, listener, options)
                : DOC.addEventListener(type, listener)
            
            return () => {
                (options !== undefined)
                    ? DOC.removeEventListener(type, listener, options)
                    : DOC.removeEventListener(type, listener)
            }
        }
    )
}

export function mapear(
    number : number,
    inMin : number,
    inMax : number,
    outMin : number,
    outMax : number
) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}



export function getPosition(x: number, y: number){
    return { x: x, y: y }
}

export function distancia(pos1 : Position, pos2 : Position){
    return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2))
}