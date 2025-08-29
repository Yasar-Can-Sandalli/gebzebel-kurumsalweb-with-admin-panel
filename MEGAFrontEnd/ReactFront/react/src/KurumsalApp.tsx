import {Route, Routes} from "react-router-dom";
import React from "react";
import Eskibaskanlar from "./components/kurumsal/eskibaskanlar.tsx";
import ManagementChart from "./components/kurumsal/yonetimsemasi.tsx";
import VisionPage from "./components/kurumsal/vizyon.tsx";
import Misyon from "./components/kurumsal/misyon.tsx";
import İlkelerimiz from "./components/kurumsal/ilkelerimiz.tsx";
import MudurTest from "./components/kurumsal/mudurlukler/_Mudurler.tsx";
import Arabuluculuk from "./components/kurumsal/arabuluculuk.tsx";
import EtikKomisyonu from './components/kurumsal/etikkomisyonu.tsx';
import Baskanyardimcilari from "./components/kurumsal/baskanyardimcilari.tsx";
import Baskandanismanlari from "./components/kurumsal/baskandanismanlari.tsx";
import Baskan from "./components/kurumsal/baskan.tsx";
import BelediyeMeclisi from "./components/kurumsal/belediyemeclisi.tsx";
import KurumsalDoc from "./components/kurumsal/kurumsaldoc.tsx";
import MudurDetay from "./components/kurumsal/mudurlukler/_MudurDetay.tsx"
import Kimlik from "./components/kurumsal/kurumsalkimlik.tsx";
import Kraporlar from "./components/kurumsal/kurumsalr.tsx";
import Kararlar from "./components/kurumsal/mecliskararlari.tsx";






const Kurumsal: React.FC = () => {


    return (
        <Routes>
            <Route path="yonetimsemasi" element={<ManagementChart/>}></Route>
            <Route path="eskibaskanlar" element={<Eskibaskanlar/>}></Route>
            <Route path="baskan" element={<Baskan/>}/>
            <Route path="belediyemeclisi" element={<BelediyeMeclisi/>}/>
            <Route path="vizyon" element={<VisionPage/>}/>
            <Route path="misyon" element={<Misyon/>}/>
            <Route path="ilkelerimiz" element={<İlkelerimiz/>}/>
            <Route path="arabuluculuk" element={<Arabuluculuk/>}/>
            <Route path="baskanyardimcilari" element={<Baskanyardimcilari/>}/>
            <Route path="baskandanismanlari" element={<Baskandanismanlari/>}/>
            <Route path="etikkomisyonu" element={<EtikKomisyonu/>}/>
            <Route path="mudurlukler" element={<MudurTest/>}/>
            <Route path="arabuluculuk" element={<Arabuluculuk/>}/>
            <Route path="baskanyardimcilari" element={<Baskanyardimcilari/>}/>
            <Route path="baskandanismanlari" element={<Baskandanismanlari/>}/>
            <Route path="etikkomisyonu" element={<EtikKomisyonu/>}/>
            <Route path="mudurlukler/:id" element={<MudurDetay/>}/>
            <Route path="kurumsaldoc/" element={<KurumsalDoc/>}/>
            <Route path="kurumsalkimlik/" element={<Kimlik/>}/>
            <Route path="raporlar/" element={<Kraporlar/>}/>
            <Route path="mecliskararlari/" element={<Kararlar/>}/>
        </Routes>
    )

}
export default Kurumsal;