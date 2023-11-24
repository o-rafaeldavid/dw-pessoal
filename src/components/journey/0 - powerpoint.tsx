import ImageSlide from "../imageSlide"

import deuses_0 from "../../assets/img/topicos/0 - powerpoint/deuses_0.png"
import pombalina_0 from "../../assets/img/topicos/0 - powerpoint/pombalina_0.png"
import rawls_1 from "../../assets/img/topicos/0 - powerpoint/rawls_1.png"


export default function PowerpointSection(){
    return(
        <>
            <div className="centerTextImg">
                <div className="text">
                    <p>
                        Tudo começou com o interesse de querer melhorar as minhas apresentações do 3º ciclo.
                        Queria que fossem <em>mais minhas</em>, serem menos genéricas, destaca-las das demais.
                    </p>
                    <p>
                        Consequentemente comecei a interessar-me mais por um layout mais arrojado, cor, animações e afins.
                        Ao que nasce, assim, uma paixão.
                    </p>
                </div>
                <div className="image">
                    <ImageSlide imagens={[deuses_0, pombalina_0, rawls_1]}/>
                    <span>Powerpoints criados à uns anos</span>
                </div>
            </div>
            
            <h3>SLIDES</h3>
        </>
    )
}