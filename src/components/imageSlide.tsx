import { useEffect, useState } from "react"

interface Props{
    imagens: string[]
}

export default function ImageSlide({imagens} : Props){
    const [src, setSRC] = useState(imagens[0])
    const [count, setCount] = useState(1)

    useEffect(
        () => {
            let timeout = setTimeout(
                () => {
                    setSRC(imagens[count % imagens.length])
                    setCount(count + 1)
                }, 3000
            )

            return () => { clearTimeout(timeout) }
        }, [src]
    )

    return(
        <>
            <img src={src} alt="" />
        </>
    )
}