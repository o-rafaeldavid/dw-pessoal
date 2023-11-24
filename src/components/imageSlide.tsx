import { useEffect, useState } from "react"

interface Props{
    imagens: string[]
    descricao: string[]
}

export default function ImageSlide({imagens, descricao} : Props){
    const [src, setSRC] = useState(imagens[0])
    const [desc, setDest] = useState(descricao[0])
    const [count, setCount] = useState(1)

    useEffect(
        () => {
            let timeout = setTimeout(
                () => {
                    setSRC(imagens[count % imagens.length])
                    setDest(descricao[count % descricao.length])
                    setCount(count + 1)
                }, 3000
            )

            return () => { clearTimeout(timeout) }
        }, [src]
    )

    return(
        <>
            <img src={src} alt="" />
            <span>{desc}</span>
        </>
    )
}