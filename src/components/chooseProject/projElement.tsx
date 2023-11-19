import { ImgHTMLAttributes, MouseEventHandler, useEffect, useRef, useState } from "react"
import { useNavigate, To } from "react-router-dom"
import LoadLink from "../loadLink"


interface XYZprops{
    x: number
    y: number
    z: number
}

interface Props{
    rotate?: XYZprops
    translate?: XYZprops
    direction?: 'rt' | 'tr' | undefined
    journeyIndex: number,
    name: string,
    src?: string | undefined
}

const setPX = (num : number) => num + 'px'
const setDeg = (num : number) => num + 'deg'

export default function ChooseProject({rotate, translate, direction, journeyIndex, name, src} : Props){

    //criação do estilho de cada elemento
    let style : React.CSSProperties | undefined = undefined
    let rotateString : string = ''
    let translateString : string = ''

    if(rotate !== undefined){
        rotateString = `
            rotateX(${setDeg(rotate.x)})
            rotateY(${setDeg(rotate.y)})
            rotateZ(${setDeg(rotate.z)})
        `
    }

    if(translate !== undefined){
        translateString = `
            translateX(${setPX(translate.x)})
            translateY(${setPX(translate.y)})
            translateZ(${setPX(translate.z)})
        `
    }

    const transString = (direction === undefined || direction === 'rt')
                        ? rotateString + " " + translateString
                        : translateString + " " + rotateString

    style = {
        transform: transString,
    };

    const imageElement = (src === undefined) ? <></> : <img alt="" src={src}/>;

    ///////////////////////
    ///////////////////////
    //ao clicar, abre-se uma certa parte do caminho '/journey'
    

    return(
        <li className="projElement" style={style}>
            {imageElement}
            <LoadLink to="/journey" options={{state: journeyIndex}}/>
        </li>
    )
}