import React, { useContext, useEffect, useState } from "react";

interface WheelContextProps {
    isWheel: boolean,
    theWheelEvent: WheelEvent
}

export const WheelContext = React.createContext({} as WheelContextProps);

interface Props {
    children: JSX.Element | JSX.Element[] 
}

export default function WheelProvider({children} : Props){
    const espera_entre_wheels = 500; /* (está em ms) */


    const [isWheel, setWheel] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const [theWheelEvent, setTWE] = useState<WheelEvent>();

    const body = document.body;

    const doWheel = (e : WheelEvent) => {
        if(!isWheel){ setWheel(true); setTrigger(true); console.log(isWheel); setTWE(e)}
    }

    useEffect(
        () => {
            body.addEventListener('wheel', (e) => { doWheel(e) })
            return () => {
                body.removeEventListener('wheel', (e) => { doWheel(e) })
            }
        }, []
    );

    useEffect(
        () => {
            let timeout : number | undefined = undefined;
            if(trigger){
                timeout = setTimeout(
                    () => { setWheel(false); setTrigger(false); }, espera_entre_wheels
                );
            }
            return () => {
                clearTimeout(timeout);
            }
        }, [trigger]
    );


    return(
        <WheelContext.Provider value={{isWheel, theWheelEvent}}>{children}</WheelContext.Provider>
    )
}