import React, { useState, useEffect, useMemo } from "react"
import { useEventListener, getPosition } from "../../_universal/miscFunctions"
import { Position } from "../../_universal/interfaces"

interface TouchMovePosContextProps {
    touchMovePos: Position
    setTouchMovePos: React.Dispatch<React.SetStateAction<Position>>
}

export const TouchMoveContext = React.createContext({} as TouchMovePosContextProps);

interface Props {
    children: JSX.Element | JSX.Element[] 
}

export default function TouchMoveProvider({children} : Props){
    const [touchMovePos, setTouchMovePos] = useState(getPosition(
        window.innerWidth*0.5,
        window.innerHeight*0.5
    ));

    const setarTouch = (e : TouchEvent) => {
        setTouchMovePos(getPosition(
            e.targetTouches[0].clientX,
            e.targetTouches[0].clientY
        ))
    }

    useEventListener(document, "touchmove", setarTouch);

    useMemo(
        () => {
            let timeout = setTimeout(
                () => {
                    setTouchMovePos(getPosition(
                        window.innerWidth*0.5,
                        window.innerHeight*0.5
                    ))
                }, 100
            )

            return () => { clearTimeout(timeout) }
        }, []
    )

    
    
    return(
        <TouchMoveContext.Provider value={{touchMovePos, setTouchMovePos}}>{children}</TouchMoveContext.Provider>
    );
}