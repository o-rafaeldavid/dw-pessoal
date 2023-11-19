import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Index from "./pages"
import Journey from "./pages/journey"
import LoadingScreen from "./components/loadingScreen"



function Ruas(){
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />}/>
                <Route path="/journey" element={<Journey />}/>
                <Route path="/loading" element={<LoadingScreen />}/>
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default Ruas