import Viewport from "../components/viewport";
import SomethingScroll from "../components/somethingScroll";
import { WheelContext } from "../components/contexts/wheelContext";
import { SwipeContext } from "../components/contexts/swipeContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";


import "../styles/journey.scss"
import { isMobile } from "react-device-detect";

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
        setViews.push(
            <Viewport className={CLASS} id={"p" + i} key={"tema-" + i}>
                
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

            if((!isMobile && isWheel)){
                if(numeroIndex > 0 && numeroIndex < 5){
                    const numeroDiv = document.getElementById('numero')
                    numeroDiv.classList.add('transicionar')
                    
                    timeout = setTimeout(
                        () => {
                            numeroDiv.classList.remove('transicionar')
                            if(theWheelEvent.deltaY < 0 && numeroIndex > 0) setNI((anterior) => anterior - 1);
                            else if(theWheelEvent.deltaY > 0 && numeroIndex < 5 ) setNI((anterior) => anterior + 1);
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
            
            {setViews}
            <div id="numero">
                <span>{numeroIndex}</span>
                <span>{numeroIndex}</span>
            </div>
        </>
    )
}