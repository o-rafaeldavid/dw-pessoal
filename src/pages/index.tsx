import ChooseProject from '../components/chooseProject/chooseProject'
import SomethingScroll from '../components/somethingScroll'

import Viewport from '../components/viewport'
import DynamicText from '../components/dynamicText/dynamicText'
import ShowText from '../components/showText/showText'
import '../styles/index.scss'
import "../styles/showText.scss"

function Index() {



  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  


  return (
    <>
     <SomethingScroll direction="vertical"/>


      <Viewport id="meuNome" className="viewing">
        <div id="greetings">
          <ShowText doShow={true} rotate={false} doRotate={false}>
            <h4>OLÁ! EU SOU</h4>
          </ShowText>

          <ShowText doShow={true} rotate={false} doRotate={false}>
            <DynamicText
              mouse={true}
            >
              RAFAEL DAVID
            </DynamicText>
          </ShowText>

          <ShowText doShow={true} rotate={false} doRotate={false}>
            <h5>dando novas criações à web</h5>
          </ShowText>
        </div>
      </Viewport>


      {/* =========== */}
      {/* =========== */}
      {/* =========== */}


      <ChooseProject/>
    </>
  )
}

export default Index
