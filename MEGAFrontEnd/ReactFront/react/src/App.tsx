import React, {useState, useEffect} from 'react';
import {Outlet, Route, Routes} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Loader from './components/loader';
import LoginForm from './components/Login_v3/LoginForm2.tsx';
import Footer from './components/Footer/Footer';
import CoolNavbar from './components/NavBar/CoolNavbar';
import SignUp from './components/SignUp/SignUp.tsx';
import HomePage from "./components/HomePage/HomePage.tsx";
import TEST from "./components/sablon/testsablon.tsx"
import Kurumsal from "./KurumsalApp.tsx";
import Hizmetler from "./HizmetlerApp.tsx";
import HizmetlerLayout from "./components/Layouts/hizmetlerLayout.tsx";
import Gebze from "./GebzeApp.tsx";
import EventsSection from "./components/Etkinlikler/etkinlikler.tsx";
import KurumsalLayout from './components/Layouts/kurumsalLayout.tsx';
import GebzeLayout from './components/Layouts/gebzeLayout.tsx';
import Yayin from "./YayinApp.tsx";
import Yayinpdf from "./components/Yayin/yayinpdf.tsx";
import Haberler from "./components/Haberler/haberler.tsx";
import YedekHaberler from "./components/Haberler/yedekeskihaber.tsx";
import EBelediye from "./components/e-belediye/e-belediye.tsx";
import Iletisim from "./components/İletişim/iletisim.tsx";
import AdminPanelApp from "./components/AdminPanel/_AdminApp.tsx";
import HizmetNoktalari from "./components/İletişim/hizmet-noktalarimiz.tsx";
import Jarvis from "./components/jarvis.tsx";
import Duyuru from './components/Haberler/duyuru.tsx';
import Duyurudetay from "./components/Haberler/duyurudetay.tsx";
import HaberlerDetay from './components/Haberler/haberdetay.tsx';
import { setupApiInterceptors } from "./components/AdminPanel/services/apiService";
import { useAuthStore } from "./components/AdminPanel/store/authStore"; // senin store yoluna göre

// token’ı store’dan ya da localStorage’dan oku
setupApiInterceptors(() => {
    const s = useAuthStore.getState().token;
    return s || localStorage.getItem("token");
});


const queryClient = new QueryClient();

const App: React.FC = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loader/>;
    }

    // Determine if the current route is the login page

    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                {/* Routes WITH navbar and footer */}
                <Route
                    element={
                        <>
                            <CoolNavbar/>

                            <Outlet/> {/* This is important! */}

<Jarvis/>
                            <Footer/>


                        </>
                    }
                >
                    <Route
                        path="/hizmetler/*"
                        element={<HizmetlerLayout />}
                    >
                        <Route path="*" element={<Hizmetler />} />
                    </Route>

                    {/* Navbar ve Footerli elemanlar burada olacak */}
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/test" element={<TEST/>}></Route>

                    <Route path="/etkinlikler" element={<EventsSection/>}/>
                    <Route path={"/duyuru"} element={<Duyuru/>}/>
                    <Route path={"/duyurudetay"} element={<Duyurudetay/>}/>

                    <Route path="/haberler" element={<Haberler/>}/>
                    <Route path="/yedekhaberler" element={<YedekHaberler/>}/>
                    <Route path="/haberlerdetay/:id" element={<HaberlerDetay/>}/>
                    <Route path="/e-belediye" element={<EBelediye/>}/>
                    <Route path="/iletisim" element={<Iletisim/>}/>
                    <Route path="/hizmet-noktalari" element={<HizmetNoktalari/>}/>
                    {/* Kurumsal gibi gebzede olması lazım */}
                    <Route
                        path="/kurumsal/*"
                        element={<KurumsalLayout />}
                    >
                        <Route path="*" element={<Kurumsal />} />
                    </Route>



                    <Route
                        path="/gebze/*"
                        element={<GebzeLayout />}
                    >
                        <Route path="*" element={<Gebze />} />
                    </Route>


                    <Route path="/yayin/*" element={<Yayin/>}/>
                    <Route path="/yayinpdf/*" element={<Yayinpdf/>}/>


                    {/* Add other routes that need navbar/footer here */}
                </Route>

                {/* Routes WITHOUT navbar and footer */}
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                {/* Admin routes */}
                <Route path="/panel/*" element={<AdminPanelApp />} />

            </Routes>
        </QueryClientProvider>
    );
};

export default App;
