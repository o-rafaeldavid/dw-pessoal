import Viewport from "../viewport"
import ProjElement from "./projElement"

import { SwipeContext } from "../contexts/swipeContext";
import { useEffect, useContext, useRef, useState, MouseEvent, TouchEvent } from "react";
import { WindowDimensionContext } from "../contexts/dimensionContext";
import { isMobile } from "react-device-detect";
import { getPosition, mapear } from "../../_universal/miscFunctions";


import { Position } from "../../_universal/interfaces";
import { maxSwipeTime, minSwipeLength } from "../../_universal/constants";




import { projectsToChoose, chooseProjectThumbnail } from "../../_universal/objects";

import "../../styles/chooseProject.scss"

export default function ChooseProject(){
    //////////////////////////////////////////////
    //////// ROTAÇÃO POR "DRAG"
    //////////////////////////////////////////////

    const sceneRotation = {
        x: useState<number>(-20),
        y: useState<number>(-45),
        z: useState<number>(0)
    }

        //
        // posição do rato dependendo dos eventos

    const mousePosByEvent = {
        /*
            eventos para desktop (não é o evento drag, este visa mesmo levar um elemento para outro lado)
            o objetivo é detetar o rato a deslizar enquanto o botão esquerdo está ativado
            (para o mobile é o dedo)
        */
        onmouseDown: useState<Position | null>(null),
        onmouseMove: useState<Position>(getPosition(0, 0)),

        // eventos da posição do dedo
        ontouchStart: useState<Position | null>(null),
        ontouchMove: useState<Position>(getPosition(0, 0))
    }

        //
        // definindo os "triggers" (funções ativadas nestes eventos) em: <div className="scene" ......

    const [isMouseDown, setMouseDown] = useState<boolean>(false)
    const [isTouchStart, setTouchStart] = useState<boolean>(false)
        /*
            com isto, tinha-se ficado impossibilitado de voltar para trás com o swipe
            por isso, para evitar esse stresse, vamos verificar no proprio elemento se é efetuado um swipe
            */
        const [preventNotSwippingTimestamp, setPNSTimestamp] = useState<number | null>(null)
        const { setSwipe } = useContext(SwipeContext)



    const anteriorSceneRotation = {
        x: useState<number | null>(null),
        y: useState<number | null>(null),
        z: useState<number | null>(null)
    }

    const triggers = {
        // desktop
        onmouseDown: (e : MouseEvent) => {
            mousePosByEvent
                .onmouseDown[1](/**/getPosition(e.clientX, e.clientY)/**/)

            anteriorSceneRotation.x[1]( sceneRotation.x[0] )
            anteriorSceneRotation.y[1]( sceneRotation.y[0] )
            setMouseDown(true)
        },
        onmouseMove: (e: MouseEvent) => {
            if(isMouseDown && mousePosByEvent.onmouseDown[0] !== null){
                mousePosByEvent
                    .onmouseMove[1](/**/getPosition(e.clientX, e.clientY)/**/)

                const deltaX = mousePosByEvent.onmouseDown[0].x - e.clientX
                const deltaY = mousePosByEvent.onmouseDown[0].y - e.clientY

                if(anteriorSceneRotation.x[0] !== null) sceneRotation.x[1]( anteriorSceneRotation.x[0] - 0.1*deltaY)
                if(anteriorSceneRotation.y[0] !== null) sceneRotation.y[1]( anteriorSceneRotation.y[0] - 0.1*deltaX)
            }
        },
        onmouseUp: (e : MouseEvent) => {
            mousePosByEvent
                .onmouseDown[1](null)

            anteriorSceneRotation.x[1](null)
            anteriorSceneRotation.y[1](null)
            setMouseDown(false)
        },



        // mobile
        ontouchStart: (e: TouchEvent) => {
            mousePosByEvent
                .ontouchStart[1](/**/getPosition(e.targetTouches[0].clientX, e.targetTouches[0].clientY)/**/)

            setPNSTimestamp(Date.now())

            anteriorSceneRotation.x[1]( sceneRotation.x[0] )
            anteriorSceneRotation.y[1]( sceneRotation.y[0] )
            setTouchStart(true)
        },
        ontouchMove: (e: TouchEvent) => {
            if(isTouchStart && mousePosByEvent.ontouchStart[0] !== null){
                mousePosByEvent
                    .ontouchMove[1](/**/getPosition(e.targetTouches[0].clientX, e.targetTouches[0].clientY)/**/)

                const deltaX = mousePosByEvent.ontouchStart[0].x - e.targetTouches[0].clientX
                const deltaY = mousePosByEvent.ontouchStart[0].y - e.targetTouches[0].clientY

                if(anteriorSceneRotation.x[0] !== null) sceneRotation.x[1]( anteriorSceneRotation.x[0] - 0.1*deltaY)
                if(anteriorSceneRotation.y[0] !== null) sceneRotation.y[1]( anteriorSceneRotation.y[0] - 0.1*deltaX)
            }
        },
        ontouchEnd: (e : TouchEvent) => {
            const deltaYTouch = mousePosByEvent.ontouchMove[0].y - mousePosByEvent.ontouchStart[0].y;
            if(
                deltaYTouch <= minSwipeLength * 10 && deltaYTouch > 0
                &&
                Date.now() - preventNotSwippingTimestamp <= maxSwipeTime
            ){
                console.log('swipe nisto')
                setSwipe(
                    {
                        horizontal: {
                            direita: false,
                            esquerda: false,
                        },
                        vertical: {
                            cima: false,
                            baixo: true
                        }
                    }
                )
            }


            mousePosByEvent
                .ontouchStart[1](null)

            anteriorSceneRotation.x[1](null)
            anteriorSceneRotation.y[1](null)
            setTouchStart(false)
        }
    }




            //
            // para rodar sem ter de dar drag

    const requestRotateRef = useRef<any>()

    const rotate = (time) => {
        sceneRotation.y[1](((prevRotate) => prevRotate + 0.05))
        requestRotateRef.current = requestAnimationFrame(rotate)
    }
    useEffect(
        () => {
            requestRotateRef.current = requestAnimationFrame(rotate)
            return () => { cancelAnimationFrame(requestRotateRef.current) }
        }, []
    )
    

    //////////////////////////////////////////////
    //////// ELEMENTOS A SEREM ESCOLHIDOS
    //////////////////////////////////////////////
    const [wProject, setWProject] = useState(400)
    const { windowWidth, windowHeight } = useContext(WindowDimensionContext)
    
    let listaProjElement = [];
    const n = 6;
    for(let i = 0; i < n; i++){
        const angle = i * Math.PI * 2 / n;
        listaProjElement.push(
            <ProjElement
                key={"projElement-" + i}
                rotate={{
                    x: 10,
                    y: (Math.PI*0.5 - angle) * 180 / Math.PI,
                    z: 0
                }}
                translate={{
                    x: wProject * Math.cos(angle),
                    y: -30 * Math.cos(mapear(i, 0, n, 0, Math.PI * 2) + Math.PI*0.5),
                    z: wProject * Math.sin(angle)
                }}
                direction={'tr'}
                journeyIndex={i}
                name={projectsToChoose[i]}

                src={ chooseProjectThumbnail[i] }
            />
        );
    }

     



    useEffect(
        () => {
            if((windowWidth > 1220 && windowHeight > 900)) setWProject(400)
            else{
                if((windowWidth > 800 && windowHeight > 620)) setWProject(300)
                else{
                    if(windowWidth > 450 && windowHeight > 400) setWProject(200)
                    else setWProject(150)
                }
            }

        }, [windowWidth, windowHeight]
    )

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    return(
        <Viewport id="chooseProject">
            {/* O MEU TRAJETO QUANTO A DM
                =========== */}
            <h2>O PROCESSO</h2>


            <div className="sceneInfo">
                <strong>teste</strong>
                <br/>
                <span>info</span>
            </div>

            <div className="scene"
                
                onMouseDown={ (e) => {triggers.onmouseDown(e)} }
                onMouseMove={ (e) => {triggers.onmouseMove(e)} }
                onMouseUp={ (e) => {triggers.onmouseUp(e)} }

                onTouchStart={ (e) => {triggers.ontouchStart(e)} }
                onTouchMove={ (e) => {triggers.ontouchMove(e)} }
                onTouchEnd={ (e) => {triggers.ontouchEnd(e)} }
            >
                
                <ol
                    style={{
                        transform: `rotateX(${sceneRotation.x[0]}deg)
                                    rotateY(${sceneRotation.y[0]}deg)
                                    rotateZ(${sceneRotation.z[0]}deg)`
                    }}
                >
                    {listaProjElement}
                </ol>
            </div>
        </Viewport>
    )
}

/**
    * powerpoints
    * design vetorial - adobe illustrator (grids, ilustrações, logos, marca, cenas...)
    *** motion graphics (consequência do dzn vetorial)
    * programação
    * web ( foco )
    * apps & edição de vídeo
*/