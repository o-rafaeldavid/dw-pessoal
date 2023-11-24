import Viewport from "../components/viewport";
import SomethingScroll from "../components/somethingScroll";
import { WheelContext } from "../components/contexts/wheelContext";
import { SwipeContext } from "../components/contexts/swipeContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import Social from '../components/social/social'
import { journeySections } from "../_universal/objects";

import "../styles/journey.scss"
import "../styles/insideJourney.scss"

export default function Journey(){
    const navigate = useNavigate()
  
    window.onpopstate = () => {
        navigate("/");
        window.onpopstate = () => {}
    }

    const location = useLocation();
    let setViews : any = []

    const n = 6;
    let toLeft = true;

    for(let i = 0; i < n; i++){
        let CLASS : string | undefined;

        if(
            (location.state === null && i === 0)
            ||
            (location.state === i)
        ){
            CLASS = "viewing"
            toLeft = false
        }
        else if(toLeft){
            CLASS = "onLeft"
        }
        const Seccao = journeySections[i];
        setViews.push(
            <Viewport className={"journeyViewport " + CLASS} id={"p" + i} key={"tema-" + i}>
                <Seccao/>
            </Viewport>
        );
    }
    if(location.state == null){

    }


    ///////////////
    // quando se muda de projeto para se ver

    const [numeroIndex, setNI] = useState(location.state)

    const { isWheel, theWheelEvent } = useContext(WheelContext);
    const { isSwipe } = useContext(SwipeContext)


    useEffect(
        () => {
            let timeout : number
            
            if((isMobile || (!isMobile && isWheel && theWheelEvent !== undefined))){
                const firstCondition = (!isMobile) ? (!isMobile && isWheel) : isMobile;
                const secondConditionS = {
                    PROXIMO: (!isMobile) ? (theWheelEvent.deltaY < 0 && numeroIndex > 0) : (isSwipe.horizontal.direita && numeroIndex > 0),
                    ANTERIOR: (!isMobile) ? (theWheelEvent.deltaY > 0 && numeroIndex < 5) : (isSwipe.horizontal.esquerda && numeroIndex < 5)
                }


                if(numeroIndex >= 0 && numeroIndex <= 5){
                    const numeroDiv = document.getElementById('numero')
                    if(firstCondition && (secondConditionS.PROXIMO || secondConditionS.ANTERIOR)) numeroDiv.classList.add('transicionar')
                    
                    timeout = setTimeout(
                        () => {
                            console.log('TIMEOUT')
                            numeroDiv.classList.remove('transicionar')
                            if(secondConditionS.PROXIMO) setNI((anterior) => anterior - 1)
                            else if(secondConditionS.ANTERIOR) setNI((anterior) => anterior + 1)
                        }, 150
                    )
                }
            }

            return () => { clearTimeout(timeout) }
        }, [isWheel, isSwipe]
    )

    return(
        <>
            <SomethingScroll direction="horizontal"/>
            <Social/>
            
            {setViews}
            <div id="numero">
                <span>{numeroIndex}</span>
                <span>{numeroIndex}</span>
            </div>
        </>
    )
}