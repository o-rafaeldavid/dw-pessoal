import ChooseProject from '../components/chooseProject/chooseProject'
import Paragrafo from '../components/paragrafo/paragrafo'

import SomethingScroll from '../components/somethingScroll'

import Viewport from '../components/viewport'
import DynamicText from '../components/dynamicText/dynamicText'
import ShowText from '../components/showText/showText'
import Social from '../components/social/social'

import { WindowDimensionContext } from '../components/contexts/dimensionContext'
import { useContext, useEffect, useState } from 'react'

import { isMobile } from 'react-device-detect'

import '../styles/index.scss'
import "../styles/showText.scss"






function Index() {

  const { windowWidth } = useContext(WindowDimensionContext);

  const horizontalMeuNome = <DynamicText mouse={true}>RAFAEL DAVID</DynamicText>
  const verticalMeuNome = 
  <>
    <DynamicText mouse={true}>RAFAEL</DynamicText>
    <DynamicText mouse={true}>DAVID</DynamicText>
  </>

  const [meuNome, setMeuNome] = useState(horizontalMeuNome)


  /* useEffect(
    () => {

      if(windowWidth <= 1000 && meuNome !== verticalMeuNome) setMeuNome(verticalMeuNome)
      else if(windowWidth > 1000 && meuNome !== horizontalMeuNome) setMeuNome(horizontalMeuNome)

    }, [windowWidth]
  ) */

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
            {meuNome}
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
