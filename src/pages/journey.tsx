import Viewport from "../components/viewport";
import SomethingScroll from "../components/somethingScroll";
import { useLocation, useNavigate } from "react-router-dom";

export default function Journey(){
    const navigate = useNavigate()
  
    window.onpopstate = () => {
        navigate("/");
        window.onpopstate = () => {}
    }

    const location = useLocation();
    let setViews : any = []

    const n = 6;
    let toLeft = true;

    for(let i = 0; i < n; i++){
        let CLASS : string | undefined;

        if(
            (location.state === null && i === 0)
            ||
            (location.state === i)
        ){
            CLASS = "viewing"
            toLeft = false
        }
        else if(toLeft){
            CLASS = "onLeft"
        }
        setViews.push(
            <Viewport className={CLASS} id={"p" + i}>
                <h1>teste {i}</h1>
            </Viewport>
        );
    }
    if(location.state == null){

    }

    return(
        <>
            <SomethingScroll direction="horizontal"/>
            {setViews}
        </>
    )
}