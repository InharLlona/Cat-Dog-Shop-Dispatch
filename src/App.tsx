
import React from "react";
import {HashRouter, Routes, Route} from 'react-router-dom';
import {  MyContextProvider,MyChartContextProvider,MySendChartContextProvider } from "./Contextos";
import { CatPage } from "./catPage";
import { DogPage } from "./dogPage";
import {ChartPage} from "./chartPage"

export const App: React.FC = () => {
    
    return (
    <div>       
        <MyContextProvider> 
            <MyChartContextProvider>
                <MySendChartContextProvider>
                <HashRouter>
                    <Routes>
                        <Route  path="/" element={<CatPage />}/> 
                        <Route  path="/catPage" element={<CatPage />}/>    
                        <Route  path="/dogPage" element={<DogPage />}/>
                        <Route  path="/chartPage" element={<ChartPage />}/>     
                    </Routes>
                </HashRouter> 
                </MySendChartContextProvider>
            </MyChartContextProvider>
        </MyContextProvider>
    </div>
    )
};
