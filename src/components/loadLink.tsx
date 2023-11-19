import { useEffect, useState } from "react";
import { NavigateOptions, To, useNavigate } from "react-router-dom"
import { sendStateToLoading } from "../_universal/miscFunctions";

interface Props {
    to: To
    options: NavigateOptions
}

export default function LoadLink({to, options} : Props){
    const [toJourney, setTJ] = useState(false)
    const navigate = useNavigate();


    useEffect(
        () => {
            let timeout : number | undefined
            
            if(toJourney){
                timeout = setTimeout(
                    () => {
                        navigate('/loading',
                        {
                            state: sendStateToLoading(
                                options.state,
                                to,
                                window.location.pathname
                            )
                        })
                    }, 300
                )
            }

            return () => { clearTimeout(timeout) }
            
        }, [toJourney]
    )




    return(
        <>
            <div className="toLoadingElement" onClick={() => {setTJ(true)}}></div>
        </>
    )
}