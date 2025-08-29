import {Route, Routes} from "react-router-dom";
import React from "react";
import Atolyeler from "./components/hizmetler/atolyeler.tsx";
import Evlendirme from "./components/hizmetler/evlendirme.tsx";
import Gures from "./components/hizmetler/gures.tsx";
import GeriDonusum from "./components/hizmetler/geri-donusum.tsx";
import Kutuphane from "./components/hizmetler/kutuphane.tsx";
import Merkezler from "./components/hizmetler/merkezler.tsx";
import Mesirealani from "./components/hizmetler/mesirealani.tsx";
import Guzide from "./components/hizmetler/atolyeler/guzide.tsx";
import Genclik from "./components/hizmetler/atolyeler/gençlik.tsx";
import Enderunokulları from "./components/hizmetler/atolyeler/enderun.tsx";
import Bakimevi from "./components/hizmetler/bakimevi.tsx"
import Egitimler from "./components/hizmetler/egitimler.tsx"
import Bebekbakim from "./components/hizmetler/bebekbakım/bebekbakim.tsx";
import Sportiff from "./components/hizmetler/atolyeler/sportiff.tsx";

import Fitness from "./components/hizmetler/egitimler/fitness.tsx";
import Genc from "./components/hizmetler/egitimler/genc.tsx";
import Tercih from "./components/hizmetler/egitimler/tercih.tsx";
import Yaz from "./components/hizmetler/egitimler/yaz.tsx";
import Aerobic from "./components/hizmetler/egitimler/Aerobic.tsx";
import Nislemleri from "./components/hizmetler/evlendirme/nikah.tsx";
import Guresss from "./components/hizmetler/güres/güress.tsx";
import Aile from "./components/hizmetler/merkezler/aile.tsx";
import Arapcesme from "./components/hizmetler/merkezler/arapcesme.tsx";
import Atli from "./components/hizmetler/merkezler/atli.tsx";
import Beylikbagi from "./components/hizmetler/merkezler/beylikbagi.tsx";
import Eray from "./components/hizmetler/merkezler/eray.tsx";
import Gebze from "./components/hizmetler/merkezler/gebze.tsx";
import Gesmek from "./components/hizmetler/merkezler/gesmek.tsx";
import Güzide from "./components/hizmetler/merkezler/güzide.tsx";
import İstasyon from "./components/hizmetler/merkezler/istasyon.tsx";
import Hayvan from "./components/hizmetler/merkezler/hayvan.tsx";
import Coban from "./components/hizmetler/kutuphane/coban.tsx";
import Arapbilim from "./components/hizmetler/kutuphane/arapbilim.tsx";
import Beylikbilim from "./components/hizmetler/kutuphane/beylikbilim.tsx";
import Baris from "./components/hizmetler/kutuphane/baris.tsx";
import İstasyonB from "./components/hizmetler/kutuphane/İstasyonbilim.tsx";
import Cumakoy from "./components/hizmetler/mesirealani/cumakoy.tsx";
import Gaziler from "./components/hizmetler/mesirealani/gaziler.tsx";
import Yumrukaya from "./components/hizmetler/mesirealani/yumrukaya.tsx";


import GeriDonusumDetayPage from "./components/hizmetler/geridonusum/ambalaj.tsx";
import BitkiselAtikYagPage from "./components/hizmetler/geridonusum/bitkisel.tsx";
import ElektronikAtikPage from "./components/hizmetler/geridonusum/elektronik.tsx";
import EvselAtikPage from "./components/hizmetler/geridonusum/evsel.tsx";
import IriHacimliAtikPage from "./components/hizmetler/geridonusum/hacimli.tsx";
import MolozAtiklariPage from "./components/hizmetler/geridonusum/moloz.tsx";
import SifirAtikPage from "./components/hizmetler/geridonusum/sifiratik.tsx";
import Piller from "./components/hizmetler/geridonusum/piller.tsx";
import TekstilAtiklariPage from "./components/hizmetler/geridonusum/tekstil.tsx";




const HizmetlerApp: React.FC =() => {

    return (
        <Routes>
            <Route path="/atolyeler" element={<Atolyeler/>}/>
            <Route path="/atolyeler/guzide" element={<Guzide/>}/>
            <Route path="/atolyeler/genclik" element={<Genclik/>}/>
            <Route path="/bakimevi" element={<Bakimevi/>}/>
            <Route path="/bebekbakım/bebekbakim" element={<Bebekbakim/>}/>
            <Route path="/egitimler" element={<Egitimler/>}/>
            <Route path="/egitimler/fitness" element={<Fitness/>}/>
            <Route path="/egitimler/genc" element={<Genc/>}/>
            <Route path="/egitimler/Aerobic" element={<Aerobic/>}/>
            <Route path="/egitimler/tercih" element={<Tercih/>}/>
            <Route path="/egitimler/yaz" element={<Yaz/>}/>
            <Route path="/atolyeler/enderun" element={<Enderunokulları/>}/>
            <Route path="/evlendirme" element={<Evlendirme/>}/>
            <Route path="/gures" element={<Gures/>}/>
            <Route path="/geridonusum" element={<GeriDonusum/>}/>
            <Route path="/geridonusum/ambalaj" element={<GeriDonusumDetayPage/>}/>
            <Route path="/geridonusum/bitkisel" element={<BitkiselAtikYagPage/>}/>
            <Route path="/geridonusum/elektronik" element={<ElektronikAtikPage/>}/>
            <Route path="/geridonusum/evsel" element={<EvselAtikPage/>}/>
            <Route path="/geridonusum/hacimli" element={<IriHacimliAtikPage/>}/>
            <Route path="/geridonusum/moloz" element={<MolozAtiklariPage/>}/>
            <Route path="/geridonusum/piller" element={<Piller/>}/>
            <Route path="/geridonusum/sifiratik" element={<SifirAtikPage/>}/>
            <Route path="/geridonusum/tekstil" element={<TekstilAtiklariPage/>}/>
            <Route path="/kutuphane" element={<Kutuphane/>}/>
            <Route path="/merkezler" element={<Merkezler/>}/>
            <Route path="/mesirealani" element={<Mesirealani/>}/>
            <Route path="/atolyeler/sportif" element={<Sportiff/>}/>
                <Route path="/evlendirme/nikah" element={<Nislemleri/>}/>
                <Route path="/güres/güress" element={<Guresss/>}/>
            <Route path="/merkezler/aile" element={<Aile/>}/>
            <Route path="/merkezler/arapcesme" element={<Arapcesme/>}/>
            <Route path="/merkezler/atli" element={<Atli/>}/>
            <Route path="/merkezler/beylikbagi" element={<Beylikbagi/>}/>
            <Route path="/merkezler/eray" element={<Eray/>}/>
            <Route path="/merkezler/gebze" element={<Gebze/>}/>
            <Route path="/merkezler/gesmek" element={<Gesmek/>}/>
            <Route path="/merkezler/güzide" element={<Güzide/>}/>
            <Route path="/merkezler/istasyon" element={<İstasyon/>}/>
            <Route path="/merkezler/Hayvan" element={<Hayvan/>}/>
                <Route path="/kutuphane/coban" element={<Coban/>}/>
                <Route path="/kutuphane/arapbilim" element={<Arapbilim/>}/>
                <Route path="/kutuphane/beylikbilim" element={<Beylikbilim/>}/>
                <Route path="/kutuphane/baris" element={<Baris/>}/>
                <Route path="/kutuphane/istasyonbilim" element={<İstasyonB/>}/>
            <Route path="/mesirealani/cumakoy" element={<Cumakoy/>}/>
            <Route path="/mesirealani/gaziler" element={<Gaziler/>}/>
            <Route path="/mesirealani/yumrukaya" element={<Yumrukaya/>}/>


        </Routes>
    );

}
export default HizmetlerApp