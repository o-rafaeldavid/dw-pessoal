import React, { useState, useEffect, useMemo } from "react"
import { useEventListener } from "../../_universal/miscFunctions"

interface WindowDimensionContextProps {
    windowWidth: number
    setWindowWidth: React.Dispatch<React.SetStateAction<number>>
    windowHeight: number
    setWindowHeight: React.Dispatch<React.SetStateAction<number>>
}

export const WindowDimensionContext = React.createContext({} as WindowDimensionContextProps);

interface Props {
    children: JSX.Element | JSX.Element[] 
}

export default function WindowDimensionProvider({children} : Props){
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [windowHeight, setWindowHeight] = useState(window.innerHeight)

    const setarWidth = (e) => setWindowWidth(window.innerWidth)
    const setarHeight = (e) => setWindowHeight(window.innerHeight)

    useEventListener(window, "resize", setarWidth);
    useEventListener(window, "resize", setarHeight);
    
    return(
        <WindowDimensionContext.Provider value={{windowWidth, setWindowWidth, windowHeight, setWindowHeight}}>{children}</WindowDimensionContext.Provider>
    );
}