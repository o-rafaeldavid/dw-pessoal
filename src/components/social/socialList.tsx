import { useContext, useEffect, useRef } from 'react'
import { MousePosContext } from '../contexts/mouseContext'
import { distancia, mapear, useEventListener } from '../../_universal/miscFunctions'

interface Props{
    to: string,
    icon: JSX.Element
}

export default function SocialList({to, icon} : Props){
    const { mousePagePos } = useContext(MousePosContext)
    let listRef = useRef<HTMLLIElement>()

    useEffect(
        () => {
            const current = listRef.current
            if(current !== undefined){
                const SVG = current.querySelector('svg');
                current.style.transform = SVG.style.transform = ""

                const bounds = current.getBoundingClientRect()

                const centro = {
                    x: bounds.x + bounds.width * 0.5,
                    y: bounds.y + bounds.height * 0.5
                }

                const dist = distancia(
                    {x: mousePagePos.x, y: mousePagePos.y},
                    {x: centro.x, y: centro.y},
                )

                const angle = Math.atan2(mousePagePos.x - centro.x, - (mousePagePos.y - centro.y) )*(180 / Math.PI);      
                const tY = Math.pow(mapear(dist, 0, window.innerWidth, 2, 0), 5);

                if(dist > bounds.width){
                    current.style.transform = `rotate(${angle}deg) translateY(-${tY}px)`
                    SVG.style.transform = `rotate(${-angle}deg)`
                }
                else{
                    const diferenca = {
                        x: mousePagePos.x - centro.x,
                        y: mousePagePos.y - centro.y
                    }
                    current.style.transform = `translate(${diferenca.x}px, ${diferenca.y}px)`
                }
            }
        }, [mousePagePos]
    )



    return(
        <li ref={listRef}>
            <a href={to} target='_blank'>
                {icon}
            </a>
        </li>
    )
}