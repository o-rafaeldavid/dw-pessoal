import DynamicText from './dynamicText/dynamicText';
import { WindowDimensionContext } from '../components/contexts/dimensionContext'
import { useContext, useEffect, useRef, useState } from 'react'

import { isMobile } from 'react-device-detect'
import { getPosition } from '../_universal/miscFunctions';





export default function MeuNome(){

    // construção de um object para o caso de ser mobile/
    const { windowWidth, windowHeight } = useContext(WindowDimensionContext)
    const raio = windowWidth * 0.4
    const [angle, setAngle] = useState(0)
    const [object, setObject] = useState(getPosition(
        windowWidth * 0.5 + raio * Math.cos(angle),
        windowHeight * 0.5 + raio * Math.sin(angle)
    ));





    let refAnimation = useRef<any>()
    const animation = (time) => {
        setAngle(angle + 0.05)
        setObject(getPosition(
            windowWidth * 0.5 + raio * Math.cos(angle),
            windowHeight * 0.5 + raio * Math.sin(angle)
        ))
    }

    useEffect(
        () => {
            refAnimation.current = requestAnimationFrame(animation)
            return () => { cancelAnimationFrame(refAnimation.current) }
        }, [object]
    );





    /*
        trocar a formatação do nome dependendo do facto de ser mobile ou desktok
        e tb consoante o tamanho da largura da viewport
    */
    const horizontalMeuNome = <DynamicText mouse={true}>RAFAEL DAVID</DynamicText>
    const verticalMeuNome =
    <>
        <DynamicText mouse={true}>RAFAEL</DynamicText>
        <DynamicText mouse={true}>DAVID</DynamicText>
    </>
    
    // mutavel
    const [meuNome, setMeuNome] = useState(horizontalMeuNome)

    // definir a troca consoante o tamanho da windowWidth (tb é inicializado no começo)
    useEffect(
        () => {

            if(
            isMobile && windowWidth <= 1000 && meuNome !== verticalMeuNome
            ||
            windowWidth <= 700 && meuNome !== verticalMeuNome
            ) setMeuNome(verticalMeuNome)
            else if( !isMobile && windowWidth > 700 && meuNome !== horizontalMeuNome) setMeuNome(horizontalMeuNome)

        }, [windowWidth]
    )



    return(
        <>
            {
                (!isMobile)
                ? meuNome
                :
                <>
                    <DynamicText mouse={false} notMouseObject={object}>RAFAEL</DynamicText>
                    <DynamicText mouse={false} notMouseObject={object}>DAVID</DynamicText>
                </>
            }
        </>
    )
}