import ImageSlide from "../imageSlide"

import logo_on from "../../assets/img/topicos/1 - design vetorial/logo_on.jpg"
import evolucao from "../../assets/img/topicos/1 - design vetorial/Evolução Da Terra.png"

export default function VetorialSection(){
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
                        Assim, comecei a ter também interesse no rigor. A utilização de grelhas e proporções são o que
                        me faziam dar mais valor ao que criava, o lado mais matemático da construção, o suporte do resultado final.
                    </p>
                </div>
                <div className="image">
                    <ImageSlide imagens={[logo_on, evolucao]}/>
                    <span>Algumas criações antigas no âmbito do design vetorial</span>
                </div>
            </div>
            
            <h3>DESIGN VETORIAL</h3>
        </>
    )
}