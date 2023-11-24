import { useState, useEffect, useMemo, useRef, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import Viewport from "./viewport"
import DynamicText from "./dynamicText/dynamicText"
import { getPosition, mapear } from "../_universal/miscFunctions"

import { WindowDimensionContext } from "./contexts/dimensionContext"

import "../styles/loadingScreen.scss"

export default function LoadingScreen(){
    ////////////////////////////////////////////////////////////
    /////////////////////// ONDULAÇÃO
    ////////////////////////////////////////////////////////////

    const {windowWidth, windowHeight} = useContext(WindowDimensionContext)
    // "limites" associados a onde o nosso ponto virtual irá se mover (simulação de um rato)
    const limites = {
        x: {
            min: windowWidth * 0.1,
            max: windowWidth * 0.9
        }
    }

    // posição do nosso ponto virtual
    const [px, setPX] = useState(Math.random() * (limites.x.max - limites.x.min) + limites.x.min);
    const [object, setObject] = useState(getPosition(
        px,
        windowHeight * 0.5
    ));

    //multiplicador associado à posição (1: para a direita; -1: para a esquerda)
    const [multi, setMulti] = useState(1);


    

    ////////////
    ////////////
    //animação para fazer o efeito do rato (ponto virtual)
    //para evitar chamar sempre um interval
   
    let refAnimation = useRef<any>()
    const animation = (time) => {
        //se o ponto virtual for contra um dos limites virtuais, ele inverte a direção
        if(
            px >= limites.x.max && multi === 1
            ||
            px <= limites.x.min && multi === -1

        ) setMulti(multi * (-1))


        //a posição do ponto virtual sofre constantemente alteração
        setPX(px + mapear(windowWidth, 0, 1920, 3, 25) * multi);

        //o object fica com o px anterior pq o px só será mudado na proxima iteração
        setObject(getPosition(
            px,
            windowHeight * 0.5
        ));
        refAnimation.current = requestAnimationFrame(animation)
    }
    
    useEffect(
        () => {
            refAnimation.current = requestAnimationFrame(animation)
            return () => { cancelAnimationFrame(refAnimation.current) }
        }, [px]
    );









    ////////////////////////////////////////////////////////////
    /////////////////////// VERIFICAÇÃO DE UM LOCATION STATE (submissão de dados) e a navegação para a próxima pagina
    ////////////////////////////////////////////////////////////

    const navigate = useNavigate()
    const location = useLocation()
    
    const [doEffectTo, setDET] = useState(false)
    useEffect(
        () => {
            let timeout : number


            if(doEffectTo){
                const recieved = location.state

                if(recieved.route !== undefined){
                    if(recieved.stateToRoute !== undefined){
                        timeout = setTimeout(
                            () => {
                                navigate(recieved.route, { state: recieved.stateToRoute })
                            }, 2000
                        )
                    }
                }
            }


            return () => { clearTimeout(timeout) }
        }, [doEffectTo]
    );

    /* 
        useMemo para ser utilizado somente uma vez
        (esta componente sofre re-render por conta do useEffect, assim, só se ativa oq está aqui dentro q vez)
    */
    const memo = useMemo(
        () => {
            const recieved = location.state
            if(recieved !== null) setDET(true)
        },
        []
    );

    

    return(
        <Viewport id="LOADINGSCREEN">
            <DynamicText
             className="loading"
              mouse={false}
              notMouseObject={object}
            >
              CARREGANDO
            </DynamicText>
        </Viewport>
    )
}