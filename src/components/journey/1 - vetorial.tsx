import ImageSlide from "../imageSlide"
import { useContext, useEffect, useState } from "react"
import { WindowDimensionContext } from "../contexts/dimensionContext"


import logo_on from "../../assets/img/topicos/1 - design vetorial/logo_on.jpg"
import evolucao from "../../assets/img/topicos/1 - design vetorial/evoTerra.jpg"
import landscape from "../../assets/img/topicos/1 - design vetorial/landscape.jpg"
import cavalo from "../../assets/img/topicos/1 - design vetorial/cavalo.jpg"


export default function VetorialSection(){
    const { windowWidth } = useContext(WindowDimensionContext)
    const normalDsn = <>DESIGN VETORIAL</>
    const breakDsn = <>DESIGN<br/>VETORIAL</>
    const [dsnVetorial, setDV] = useState(normalDsn)

    useEffect(
        () => {
            if(windowWidth <= 550) setDV(breakDsn)
            else if(windowWidth > 550) setDV(normalDsn)

        }, [windowWidth]
    )

    return(
        <>
            <div className="centerTextImg">
                <div className="text">
                    <p>
                        O design vetorial entrou um dia de paraquedas na minha frente e facilmente fascinou-me.
                    </p>
                    <p>
                        Havia alguma coisa que suscitava um grande interesse no que era possível com os desenhos vetoriais.
                        Desde a criação de icons, logos, mas sobretudo nas ilustrações.
                    </p>
                    <p>
                        Assim, comecei a ter também interesse no rigor. A utilização de grelhas e proporções são o lado
                        mais matemático, o que dão suporte às criações.
                    </p>
                </div>
                <div className="image">
                    <ImageSlide
                        imagens={[logo_on, evolucao, landscape, cavalo]}
                        descricao={[
                            "um logo criado enquanto estava a explorar a área",
                            "infografia criada em âmbito escolar",
                            "landscape para a minha primeira conta de testes",
                            "exploração de guias e proporções"
                        ]}
                    />
                </div>
            </div>
            
            <h3>{dsnVetorial}</h3>
        </>
    )
}