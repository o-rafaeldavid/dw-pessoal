import { useEffect, useContext, useRef } from "react";
import { WheelContext } from '../components/contexts/wheelContext'
import { SwipeContext } from "./contexts/swipeContext";
import { isMobile } from "react-device-detect";


interface Props {
    direction: "vertical" | "horizontal"
}




export default function SomethingScroll({direction} : Props){
    const { isWheel, theWheelEvent } = useContext(WheelContext);
    const { isSwipe } = useContext(SwipeContext)

    const classes = {
        anterior: (direction === "vertical") ? "onTop" : "onLeft"
    }

    //USE EFFECT ATIVADO TANTO EM DESKTOP COMO EM MOBILE
    //onWheel e onTouch (Swipe)
    useEffect(
        () => {
          let theTimeout : number | undefined;
          const WHEEL_DESKTOP = (!isMobile && isWheel)
    
          if((isMobile) || WHEEL_DESKTOP){
            const dy = (WHEEL_DESKTOP) ? theWheelEvent.deltaY : 0;

            const viewingElement = document.querySelector('.viewing');
            const nextElement = viewingElement?.nextElementSibling;
            const prevElement = viewingElement?.previousElementSibling;
    

            
            if(
              ( (WHEEL_DESKTOP && dy > 0) //DESKTOP: wheel para baixo (vai para cima ou para a esquerda dependendo da orientação)
                ||
                isMobile && (isSwipe.vertical.cima || isSwipe.horizontal.esquerda) //MOBILE: Swipe para cima/esquerda (vai para o proximo)
              )
              && nextElement !== null && nextElement.classList.contains('viewport')){

              viewingElement?.classList.remove('viewing');
              if( WHEEL_DESKTOP ||
                  isMobile &&
                    ( (isSwipe.vertical.cima && direction === "vertical")
                      ||
                      (isSwipe.horizontal.esquerda && direction === "horizontal") ) ) viewingElement?.classList.add(classes.anterior);
    
              theTimeout = setTimeout(
                () => {
                  nextElement?.classList.add('viewing');
                }, 150
              );
            }
            else if(
              ( (WHEEL_DESKTOP && dy < 0) //DESKTOP: wheel para cima (vai para baixo ou para a direita dependendo da orientação)
                ||
                isMobile && (isSwipe.vertical.baixo || isSwipe.horizontal.direita) //MOBILE: Swipe para baixo/direita (volta para o anterior)
              )
              && prevElement !== null && prevElement.classList.contains('viewport')){

              viewingElement?.classList.remove('viewing');
    
              theTimeout = setTimeout(
                () => {
                  if( WHEEL_DESKTOP ||
                      isMobile &&
                      ( (isSwipe.vertical.baixo && direction === "vertical")
                        ||
                        (isSwipe.horizontal.direita && direction === "horizontal") ) ){

                          console.log(classes.anterior)
                    prevElement?.classList.remove(classes.anterior)
                    prevElement?.classList.add('viewing')
                  }
                  prevElement?.classList.remove(classes.anterior)
                  prevElement?.classList.add('viewing')
                }, 150
              );
            }
          }
          
    
          return () => {
            clearTimeout(theTimeout)
          }
        }, [isWheel, isSwipe]
    );


    let startIt = useRef("loadingScroll");
    useEffect(
        () => {
            if(startIt.current === "loadingScroll") startIt.current = "doDirection"
            else if(startIt.current === "doDirection"){
                document.querySelectorAll('.viewport').forEach(
                    (view) => {
                        view.classList.add(direction);
                    }
                );
            }
            return () => {}
        }, [startIt]
    )


    return(
        <></>
    )
}