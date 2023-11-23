import ChooseProject from '../components/chooseProject/chooseProject'
import Paragrafo from '../components/paragrafo/paragrafo'

import SomethingScroll from '../components/somethingScroll'

import Viewport from '../components/viewport'
import ShowText from '../components/showText/showText'
import Social from '../components/social/social'
import MeuNome from '../components/greetingsMeuNome'

import '../styles/index.scss'
import "../styles/showText.scss"


function Index() {
  return (
    <>
     <SomethingScroll direction="vertical"/>
     <Social/>


      <Viewport id="meuNome" className="viewing">
        <div id="greetings">
          <ShowText doShow={true} rotate={false} doRotate={false}>
            <h4>OLÁ! EU SOU</h4>
          </ShowText>

          <ShowText doShow={true} rotate={false} doRotate={false}>
            <MeuNome/>
          </ShowText>

          <ShowText doShow={true} rotate={false} doRotate={false}>
            <h5>dando novas criações à web</h5>
          </ShowText>
        </div>
      </Viewport>


      {/* =========== */}
      {/* =========== */}
      {/* =========== */}

      <Paragrafo/>
      <ChooseProject/>
    </>
  )
}

export default Index
