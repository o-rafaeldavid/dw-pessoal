import React, { useContext, useEffect, useState } from "react";
import { minSwipeLength } from "../../_universal/constants";


interface onSwipeContextProps {
    isSwipe: {
        horizontal: {
            esquerda: boolean
            direita: boolean
        }
        vertical: {
            cima: boolean
            baixo: boolean
        }
    }
}

interface Position {
    x: number
    y: number
}


const swipeConstructor = (right: boolean, left: boolean, top: boolean, bottom: boolean) => {
    return {
        horizontal: {
            direita: right,
            esquerda: left,
        },
        vertical: {
            cima: top,
            baixo: bottom
        }
    }
}

const setPosition = (x: number, y: number) => {return {x: x, y: y}}

export const SwipeContext = React.createContext({} as onSwipeContextProps);

interface Props {
    children: JSX.Element | JSX.Element[] 
}

export default function SwipeProvider({children} : Props){


    const [isSwipe, setSwipe] = useState(swipeConstructor(false, false, false, false));
    const [triggerStart, setTriggerStart] = useState<Position>(setPosition(0, 0));
    const [triggerMoving, setTriggerMoving] = useState<Position>(setPosition(0, 0));
    const [triggerEnd, setTriggerEnd] = useState<boolean>(false);



    const body = document.body;

    const start = (e : TouchEvent) => {
        const initialPos = setPosition(e.targetTouches[0].clientX, e.targetTouches[0].clientY)
        setTriggerEnd(false)
        setTriggerMoving(initialPos)
        setTriggerStart(initialPos)
    }
    const moving = (e : TouchEvent) => {
        const movingPosition = setPosition(e.targetTouches[0].clientX, e.targetTouches[0].clientY)
        setTriggerMoving(movingPosition)
    }
    const end = (e : TouchEvent) => { setTriggerEnd(true) }





    useEffect(
        () => {
            body.addEventListener('touchstart', (e) => { start(e) })
            body.addEventListener('touchmove', (e) => { moving(e) })
            body.addEventListener('touchend', (e) => { end(e) })
            return () => {
                body.removeEventListener('touchstart', (e) => { start(e) })
                body.removeEventListener('touchmove', (e) => { moving(e) })
                body.removeEventListener('touchend', (e) => { end(e) })
            }
        }, []
    );

    useEffect(
        () => {
            let timeout : number
            if(triggerEnd){
                const delta = {
                    x: triggerMoving.x - triggerStart.x,
                    y: triggerMoving.y - triggerStart.y
                }

                console.log(delta);

                setSwipe(
                    swipeConstructor(
                        delta.x > 0 && Math.abs(delta.x) > minSwipeLength, //swipe para a direita
                        delta.x < 0 && Math.abs(delta.x) > minSwipeLength, //swipe para a esquerda
                        delta.y < 0 && Math.abs(delta.y) > minSwipeLength, //swipe para cima
                        delta.y > 0 && Math.abs(delta.y) > minSwipeLength  //swipe para baixo
                    )
                )
            }

            return () => { clearTimeout(timeout) }
        }, [triggerEnd]
    );


    return(
        <SwipeContext.Provider value={{isSwipe}}>{children}</SwipeContext.Provider>
    )
}