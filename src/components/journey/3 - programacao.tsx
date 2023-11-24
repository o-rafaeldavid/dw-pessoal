
import programacao_thumb from "../../assets/img/topicos/3 - programacao/thumbnail.jpg"

export default function ProgramacaoSection(){
    return(
        <>
            <div className="centerTextImg">
                <div className="text">
                    <p>
                        Mal a programação entrou na minha vida, fez-me ver horizontes que por alguma razão nunca havia descoberto.
                        Tudo começou-me a fazer mais sentido. Desde sempre que tive um fascínio pela matemática e o raciocínio lógico
                        e conseguir aliar isto à paixão de <i>«fazer design»</i>, fez-me ligar pontos incríveis.
                    </p>
                    <p>
                        <em>C#</em> foi a primeira linguagem com a qual tive contacto, no entanto, foi na Universidade que entendi
                        melhor como ter a programação como aleado à minha paixão.
                    </p>
                </div>
                <div className="image">
                    <img alt="" src={programacao_thumb}/>
                    <span>video de "a viagem a marte" | uma trabalho do secundário </span>
                </div>
            </div>
            
            <h3>PROGRAMAÇÃO</h3>
        </>
    )
}