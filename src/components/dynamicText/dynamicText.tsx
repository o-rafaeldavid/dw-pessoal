import DynamicSpan from './dynamicSpan';
import '../../styles/dynamicText.scss'
import { isMobile, isTablet } from 'react-device-detect';

interface NOTMouseObject {
    x: number | undefined
    y: number | undefined
}

interface Props {
    children: string,
    mouse: boolean
    notMouseObject?: NOTMouseObject
    className?: string
}


export default function DynamicText({children, mouse, notMouseObject, className} : Props){
    const texto = children.split('');

    let spanMapping : JSX.Element[] = [];
    texto.forEach(
        (txt, index) => {

            const classname = ((txt === ' ') ? " space" : "");
            txt = (txt === ' ') ? "–" : txt;

            spanMapping.push(
                <DynamicSpan
                    key={txt + "-" + index}
                    className={classname}
                    mouse={mouse}
                    notMouseObject={notMouseObject}
                >
                    {txt}
                </DynamicSpan>
            );
        }
    );


    return(
        <>
        <div className="dynamicText">
            <h1 className={((isMobile || isTablet) ? "mobile" : "" ) + ((className !== undefined) ? (" " + className) : "")}>
                {spanMapping}
            </h1>
            <h1 className={"blur" + ((isMobile || isTablet) ? " mobile" : "") + ((className !== undefined) ? (" " + className) : "")}>
                {spanMapping}
            </h1>
        </div>
        </>
    );
}