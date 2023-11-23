import { useContext, useEffect, useRef, useState } from "react"
import { MousePosContext } from "../contexts/mouseContext"
import { TouchMoveContext } from "../contexts/touchMoveContext"
import { isMobile } from "react-device-detect"


interface Props{
    children: string
}

export default function SpanParagrafo({children} : Props){
    let spanP = useRef<HTMLSpanElement>(undefined)
    const { mousePagePos } = useContext(MousePosContext)
    const { touchMovePos } = useContext(TouchMoveContext)

    const [startTimeout, setStartTimeout] = useState<boolean>(false)

    let CURSOR = (!isMobile) ? mousePagePos : touchMovePos

    useEffect(
        () => {
            let current = spanP.current
            
            if(current !== undefined){
                const bounds = current.getBoundingClientRect()
                
                if(
                    (
                        bounds.x < CURSOR.x && CURSOR.x < bounds.right
                        &&
                        bounds.y < CURSOR.y && CURSOR.y < bounds.bottom
                    )
                ){
                    
                    current.classList.add('change')
                    if(!startTimeout) setStartTimeout(true)
                }
            }

        }, [CURSOR]
    )

    

    useEffect(
        () => {
            let timeout : number

            if(startTimeout){
                timeout = setTimeout(
                    () => {
                        spanP.current.classList.remove('change')
                        setStartTimeout(false)
                    }, 300
                )
            }

            return () => { clearTimeout(timeout) }
        }, [startTimeout]
    )

    return(
        <span ref={spanP}>{children}</span>
    )
}