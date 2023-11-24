import ocap from "../../assets/img/topicos/4 - web/ocap.jpg"

export default function WebSection(){
    return(
        <>
            <div className="centerTextImg">
                <div className="text">
                    <p>
                        A web começou a ser o ramo pelo qual quero me profissionalizar melhor.
                        É uma coisa que nunca me tinha passado pela cabeça... criar websites e ter interesse em como
                        eles funcionam. Mas até faz sentido! Relaciona-se com o que me fez ficar curioso pelo Design Gráfico:
                        a criação de slides, ou seja, de layouts.
                    </p>
                    <p>
                        O meu interesse pela web vai para além da especialização como front-end, mas um dia vir a ser
                        full-stack e ter domínio em web3, que julgo que vejo a ser o futuro e também se relaciona com
                        interesses pessoais do meu <i>«eu»</i> do passado.
                    </p>
                </div>
                <div className="image">
                    <img alt="" src={ocap}/>
                    <span>OCAP | Primeiro website criado</span>
                </div>
            </div>
            
            <h3>WEB</h3>
        </>
    )
}