import {Route, Routes} from "react-router-dom";

import React from "react";

import HanibalAniti from "./components/gebze/tarihiyerler/anibalinmezari.tsx";
import Ballikayalar from "./components/gebze/tarihiyerler/ballikayalar.tsx";
import Külliyesi from  "./components/gebze/tarihiyerler/külliyesi.tsx";
import Hamam from "./components/gebze/tarihiyerler/hamami.tsx";
import Sadırvani from "./components/gebze/tarihiyerler/sadirvani.tsx";
import Cesmesi from "./components/gebze/tarihiyerler/cesmesi.tsx";
import Kalesi from "./components/gebze/tarihiyerler/kalesi.tsx";
import Hünkar from "./components/gebze/tarihiyerler/hunkarcayiri.tsx";
import İbrahimPasaCesmesi from "./components/gebze/tarihiyerler/ibrahimpasacesmesi.tsx";
import İlyasBeyCamii from "./components/gebze/tarihiyerler/ilyasbeycamii.tsx";
import OsmanHamdiBeyYalisi from "./components/gebze/tarihiyerler/yalisi.tsx";
import SultanOrhanCamii from "./components/gebze/tarihiyerler/sultanorhancamii.tsx";



const TarihiApp: React.FC =() => {

    return (
        <Routes>
            <Route path="/hanibalınmezarı" element={<HanibalAniti/>}/>
            <Route path="/ballikayalar" element={<Ballikayalar/>}/>
            <Route path="/külliyesi" element={<Külliyesi/>}/>
            <Route path="/hamami" element={<Hamam/>}/>
            <Route path="/sadirvani" element={<Sadırvani/>}/>
            <Route path="/cesmesi" element={<Cesmesi/>}/>
            <Route path="/kalesi" element={<Kalesi/>}/>
            <Route path="/hünkar" element={<Hünkar/>}/>
            <Route path="/ibrahimpasacesmesi" element={<İbrahimPasaCesmesi/>}/>
            <Route path="/ilyasbeycamii" element={<İlyasBeyCamii/>}/>
            <Route path="/osmanhamdibeyyalisi" element={<OsmanHamdiBeyYalisi/>}/>
            <Route path="/sultanorhancamii" element={<SultanOrhanCamii/>}/>
        </Routes>
    );

}
export default TarihiApp