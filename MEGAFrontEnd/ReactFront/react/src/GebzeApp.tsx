import {Route, Routes} from "react-router-dom";
import KardesSehirler from "./components/gebze/kardessehirler.tsx";
import Muhtarlar from "./components/gebze/muhtarlar.tsx";
import Tarihce from "./components/gebze/tarihce.tsx";
import Fotograflarla from "./components/gebze/fotolarla.tsx";
import BugunkuGebze from "./components/gebze/bugunkugebze.tsx";
import React from "react";
import Gallarytest from "./components/gebze/tarihiyerler.tsx";
import TarihiYerlerListe from "./components/gebze/tarihiyerler/_TarihiYerlerList.tsx";
import TarihiYerDetay from "./components/gebze/tarihiyerler/_TarihiYerlerDetails.tsx";

import UyeOldugumuzBirlikler from "./components/gebze/uyeoldugumuzbirlikler.tsx";
import SanalTur from "./components/gebze/360sanaltur.tsx";
import HanibalAniti from "./components/gebze/tarihiyerler/anibalinmezari.tsx";
import Ballikayalar from "./components/gebze/tarihiyerler/ballikayalar.tsx";
import Kulliyesi from "./components/gebze/tarihiyerler/külliyesi.tsx";
import Hamam from "./components/gebze/tarihiyerler/hamami.tsx";
import Sadirvani from "./components/gebze/tarihiyerler/sadirvani.tsx";
import Cesmesi from "./components/gebze/tarihiyerler/cesmesi.tsx";
import Kalesi from "./components/gebze/tarihiyerler/kalesi.tsx";
import Hunkar from "./components/gebze/tarihiyerler/hunkarcayiri.tsx";
import IbrahimPasaCesmesi from "./components/gebze/tarihiyerler/ibrahimpasacesmesi.tsx";
import IlyasBeyCamii from "./components/gebze/tarihiyerler/ilyasbeycamii.tsx";
import OsmanHamdiBeyYalisi from "./components/gebze/tarihiyerler/yalisi.tsx";
import SultanOrhanCamii from "./components/gebze/tarihiyerler/sultanorhancamii.tsx";


const GebzeApp: React.FC = () => {

    return (
        <Routes>
            <Route path="/kardessehirler" element={<KardesSehirler/>}/>
            <Route path="/muhtarlar" element={<Muhtarlar/>}/>
            <Route path="/tarihce" element={<Tarihce/>}/>
            <Route path="/fotograflarlaGebze" element={<Fotograflarla/>}/>
            <Route path="/bugunkugebze" element={<BugunkuGebze/>}/>
            <Route path="/tarihiyerlereski" element={<Gallarytest/>}/>
            <Route path="/tarihiyerler" element={<TarihiYerlerListe/>}/>
                <Route path="/tarihiyerler/:id" element={<TarihiYerDetay />} />

            <Route path="/uyeoldugumuzbirlikler" element={<UyeOldugumuzBirlikler/>}/>
            <Route path="/360sanaltur" element={<SanalTur/>}/>
            <Route path="/tarihiyerler/anibalinmezari" element={<HanibalAniti/>}/>
            <Route path="/tarihiyerler/ballikayalar" element={<Ballikayalar/>}/>
            <Route path="/tarihiyerler/cobanmustafapasakulliyesi" element={<Kulliyesi/>}/>
            <Route path="/tarihiyerler/cobanmustafapasahamami" element={<Hamam/>}/>
            <Route path="/tarihiyerler/cobanmustafapasasadirvani" element={<Sadirvani/>}/>
            <Route path="/tarihiyerler/eskihisarcesmesi" element={<Cesmesi/>}/>
            <Route path="/tarihiyerler/eskihisarkalesi" element={<Kalesi/>}/>
            <Route path="/tarihiyerler/hunkarcayiri" element={<Hunkar/>}/>
            <Route path="/tarihiyerler/ibrahimpasacesmesi" element={<IbrahimPasaCesmesi/>}/>
            <Route path="/tarihiyerler/ilyasbeycamii" element={<IlyasBeyCamii/>}/>
            <Route path="/tarihiyerler/osmanhamdibeyyalisi" element={<OsmanHamdiBeyYalisi/>}/>
            <Route path="/tarihiyerler/sultanorhancamii" element={<SultanOrhanCamii/>}/>
        </Routes>
    );

}
export default GebzeApp