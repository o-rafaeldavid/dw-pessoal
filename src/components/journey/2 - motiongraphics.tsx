import { WindowDimensionContext } from "../contexts/dimensionContext"
import { useContext, useEffect, useState } from "react";


import viagem_a_marte from "../../assets/img/topicos/2 - motion graphics/VIAGEM A MARTE THUMBNAIL.jpg"
import video_viagem_a_marte from "../../assets/video/VIAGEM A MARTE.mp4"

export default function MotionGraphicsSection(){
    const { windowWidth } = useContext(WindowDimensionContext)
    const normalMotion = <>MOTION GRAPHICS</>
    const breakMotion = <>MOTION<br/>GRAPHICS</>
    const [mtsGraphics, setMG] = useState(normalMotion)

    useEffect(
        () => {
            if(windowWidth <= 550) setMG(breakMotion)
            else if(windowWidth > 550) setMG(normalMotion)

        }, [windowWidth]
    )


    return(
        <>
            <div className="centerTextImg">
                <div className="text">
                    <p>
                        Como consequência da evolução no Design Vetorial, veio o interesse por Motion Graphics também nesse ramo.
                        Não foi algo que tenha explorado muito, mas foi e ainda é algo que me suscita muito fascínio.
                    </p>
                    <p>
                        Tive uma forte inspiração no canal <a href="https://www.youtube.com/@kurzgesagt" target="_blank">Kurzgesagt – In a Nutshell </a>.
                    </p>
                </div>
                <div className="image">
                    <video controls>
                        <source src={video_viagem_a_marte} type="video/mp4"/>
                    </video>
                    <span>video de "a viagem a marte" | uma trabalho do secundário </span>
                </div>
            </div>
            
            <h3>{mtsGraphics}</h3>
        </>
    )
}