import DynamicSpan from './dynamicSpan';
import '../../styles/dynamicText.scss'

interface NOTMouseObject {
    x: number | undefined
    y: number | undefined
}

interface Props {
    children: string,
    mouse: boolean
    notMouseObject?: NOTMouseObject
}


export default function DynamicText({children, mouse, notMouseObject} : Props){

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
            <h1>
                {spanMapping}
            </h1>
            <h1 className="blur">
                {spanMapping}
            </h1>
        </div>
        </>
    );
}