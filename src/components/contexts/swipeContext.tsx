import React, { useContext, useEffect, useState } from "react";
import { maxSwipeTime, minSwipeLength } from "../../_universal/constants";
import { useEventListener } from "../../_universal/miscFunctions";


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
    
    // state para ajudar na identificação de um swipe (a diferença entre um swipe e somente um touch 'drag')
    // um swipe é quase instantâneo
    const [inicialDate, setInitialDate] = useState<number>(Date.now())



    const body = document.body;

    const start = (e : TouchEvent) => {
        const initialPos = setPosition(e.targetTouches[0].clientX, e.targetTouches[0].clientY)
        setTriggerEnd(false)
        setTriggerMoving(initialPos)
        setTriggerStart(initialPos)

        setInitialDate(Date.now())
    }
    const moving = (e : TouchEvent) => {
        const movingPosition = setPosition(e.targetTouches[0].clientX, e.targetTouches[0].clientY)
        setTriggerMoving(movingPosition)
    }
    const end = (e : TouchEvent) => { setTriggerEnd(true) }

    useEventListener(body, 'touchstart', (e : TouchEvent) => { start(e) })
    useEventListener(body, 'touchmove', (e : TouchEvent) => { moving(e) })
    useEventListener(body, 'touchend', (e : TouchEvent) => { end(e) })

    useEffect(
        () => {
            let timeout : number
            // data do final do touch para verificar se de facto é um swipe
            const finDate = Date.now()

            if(triggerEnd && finDate - inicialDate <= maxSwipeTime){
                const delta = {
                    x: triggerMoving.x - triggerStart.x,
                    y: triggerMoving.y - triggerStart.y
                }



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