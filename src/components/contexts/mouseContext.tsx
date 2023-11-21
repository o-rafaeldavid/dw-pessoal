import React, { useState, useEffect, useMemo } from "react"
import { useEventListener, getPosition } from "../../_universal/miscFunctions"
import { Position } from "../../_universal/interfaces"

interface MousePosContextProps {
    mousePagePos: Position
    setMousePagePos: React.Dispatch<React.SetStateAction<Position>>
}

export const MousePosContext = React.createContext({} as MousePosContextProps);

interface Props {
    children: JSX.Element | JSX.Element[] 
}

export default function MousePagePosProvider({children} : Props){
    const [mousePagePos, setMousePagePos] = useState(getPosition(
        window.innerWidth*0.5,
        window.innerHeight*0.5
    ));

    const setarRato = (e : MouseEvent) => {
        setMousePagePos(getPosition(
            e.pageX,
            e.pageY
        ))
    }

    useEventListener(document, "mousemove", setarRato);

    useMemo(
        () => {
            let timeout = setTimeout(
                () => {
                    setMousePagePos(getPosition(
                        window.innerWidth*0.5,
                        window.innerHeight*0.5
                    ))
                }, 100
            )

            return () => { clearTimeout(timeout) }
        }, []
    )

    
    
    return(
        <MousePosContext.Provider value={{mousePagePos, setMousePagePos}}>{children}</MousePosContext.Provider>
    );
}