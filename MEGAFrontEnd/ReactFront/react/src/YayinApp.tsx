import Manset from "./components/Yayin/manset.tsx";
import Cultur from "./components/Yayin/cultur.tsx";
import Projeler from "./components/Yayin/projeler.tsx";
import {Route, Routes} from "react-router-dom";
import React from "react";


const YayinApp: React.FC =() => {

    return (
        <Routes>
            <Route path="/manset" element={<Manset/>}/>
            <Route path="/kultur" element={<Cultur/>}/>
            <Route path="/projeler" element={<Projeler/>}/>
        </Routes>
    );

}
export default YayinApp;