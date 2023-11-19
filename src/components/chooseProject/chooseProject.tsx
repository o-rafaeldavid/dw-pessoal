import Viewport from "../viewport"
import ProjElement from "./projElement"

import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { getPosition, mapear } from "../../_universal/miscFunctions";

import { Position } from "../../_universal/interfaces";

import { projectsToChoose, chooseProjectThumbnail } from "../../_universal/objects";

import "../../styles/chooseProject.scss"


const wProject = 400;

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
        ontouchStart: useState<Position>(getPosition(0, 0)),
        ontouchMove: useState<Position>(getPosition(0, 0))
    }

        //
        // definindo os "triggers" (funções ativadas nestes eventos) em: <div className="scene" ......

    const [isMouseDown, setMouseDown] = useState<boolean>(false)
    const anteriorSceneRotation = {
        x: useState<number | null>(null),
        y: useState<number | null>(null),
        z: useState<number | null>(null)
    }

    const triggers = {
        onmouseDown: (e : React.MouseEvent) => {
            mousePosByEvent
                .onmouseDown[1](/**/getPosition(e.clientX, e.clientY)/**/)

            anteriorSceneRotation.x[1]( sceneRotation.x[0] )
            anteriorSceneRotation.y[1]( sceneRotation.y[0] )
            setMouseDown(true)
        },
        onmouseMove: (e: React.MouseEvent) => {
            if(isMouseDown && mousePosByEvent.onmouseDown[0] !== null){
                mousePosByEvent
                .onmouseMove[1](/**/getPosition(e.clientX, e.clientY)/**/)

                const deltaX = mousePosByEvent.onmouseDown[0].x - e.clientX
                const deltaY = mousePosByEvent.onmouseDown[0].y - e.clientY

                if(anteriorSceneRotation.x[0] !== null) sceneRotation.x[1]( anteriorSceneRotation.x[0] - 0.1*deltaY)
                if(anteriorSceneRotation.y[0] !== null) sceneRotation.y[1]( anteriorSceneRotation.y[0] - 0.1*deltaX)
            }
        },
        onmouseUp: (e : React.MouseEvent) => {
            mousePosByEvent
                .onmouseDown[1](null)

            anteriorSceneRotation.x[1](null)
            anteriorSceneRotation.y[1](null)
            setMouseDown(false)
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

    let listaProjElement : any = [];
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

                src={ (i < 3) ? chooseProjectThumbnail[i] : undefined }
            />
        );
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    /////////////////////////////////////////////
    return(
        <Viewport id="chooseProject">
            {/* O MEU TRAJETO QUANTO A DM
                =========== */}
            <h1>CONHECE O PROCESSO</h1>
            <div className="scene"
                
                onMouseDown={ (e) => {triggers.onmouseDown(e)} }
                onMouseMove={ (e) => {triggers.onmouseMove(e)} }
                onMouseUp={ (e) => {triggers.onmouseUp(e)} }
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