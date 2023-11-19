import React, { useState, useEffect } from "react"

interface PositionProps{
    x: number
    y: number
}
interface MousePosContextProps {
    mousePagePos: PositionProps
    setMousePagePos: React.Dispatch<React.SetStateAction<PositionProps>>
}

export const MousePosContext = React.createContext({} as MousePosContextProps);

interface Props {
    children: JSX.Element | JSX.Element[] 
}

export default function MousePagePosProvider({children} : Props){
    const [mousePagePos, setMousePagePos] = useState({
        x: 0,
        y: 0
    });

    const setarRato = (e : MouseEvent) => {
        setMousePagePos({
            x: e.pageX,
            y: e.pageY
        })
    }

    useEffect(
        () => {
            document.addEventListener("mousemove", setarRato);

            return () => {
                document.removeEventListener("mousemove", setarRato);
            }
        }, []
    );

    
    return(
        <MousePosContext.Provider value={{mousePagePos, setMousePagePos}}>{children}</MousePosContext.Provider>
    );
}