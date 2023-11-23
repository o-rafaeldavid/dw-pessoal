import Viewport from "../viewport";
import SpanParagrafo from "./spanParagrafo";
import { paragrafo } from "../../_universal/constants";

import '../../styles/paragrafo.scss'

export default function Paragrafo(){
    let spans = [];


    for(let c = 0; c < paragrafo.length; c++){
        spans.push(
            <SpanParagrafo key={"spanPar-" + c}>{paragrafo[c]}</SpanParagrafo>
        )
    }
    
    return(
        <Viewport id="paragrafo">
            <h2>UMA JORNADA</h2>
            <p>
                {spans}
            </p>
        </Viewport>
    )
}