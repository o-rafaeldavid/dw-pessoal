import React from 'react'
import ReactDOM from 'react-dom/client'
import Ruas from './routes.tsx'
import MousePagePosProvider from './components/contexts/mouseContext.tsx'
import WheelProvider from './components/contexts/wheelContext.tsx'
import SwipeProvider from './components/contexts/swipeContext.tsx'
import TouchMoveProvider from './components/contexts/touchMoveContext.tsx'
import WindowDimensionProvider from './components/contexts/dimensionContext.tsx'
import { isMobile } from 'react-device-detect'
import './styles/main.scss'


const SlideProvider = (!isMobile) ? WheelProvider : SwipeProvider
ReactDOM.createRoot(document.body!).render(
  <>
    <React.StrictMode>
      <WindowDimensionProvider>
        <TouchMoveProvider>
          <SlideProvider>
            <MousePagePosProvider>
              <Ruas />
            </MousePagePosProvider>
          </SlideProvider>
        </TouchMoveProvider>
      </WindowDimensionProvider>
    </React.StrictMode>
  </>
)

