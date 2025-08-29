import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./_LayoutAdminPanel";
import HomePanel from "./HomePanel";

import { SearchProvider } from "./context/SearchContext";
// Kurumsal (nested)
import KurumsalLayout from "./sayfalar/kurumsal/_LayoutKurumsal.tsx";
import KurumsalYonetimPage from "./sayfalar/kurumsal/KurumsalYonetimPage.tsx";
import KurumsalVizyonPage from "./sayfalar/kurumsal/KurumsalVizyonPage.tsx";
import KurumsalRaporlarPage from "./sayfalar/kurumsal/KurumsalRaporlarPage.tsx";
import KurumsalKomisyonlarPage from "./sayfalar/kurumsal/KurumsalKomisyonlarPage.tsx";

// Gebze (nested) — bu dosyaları az sonra ekliyoruz
import GebzeLayout from "./sayfalar/gebze/_LayoutGebze";
import GebzeTarihcePage from "./sayfalar/gebze/GebzeTarihcePage";
import GebzeYonetimPage from "./sayfalar/gebze/GebzeYonetimPage";
import GebzeSanalTurPage from "./sayfalar/gebze/GebzeSanalTurPage";

// Diğer modüller (tek sayfa örnekleri; sende sayfalar klasöründe mevcut)
import HaberlerPage from "./sayfalar/HaberlerPage";
import HizmetlerPage from "./sayfalar/HizmetlerPage";
import EtkinliklerPage from "./sayfalar/EtkinliklerPage";
import EtkinlikYeniPage from "./sayfalar/EtkinlikYeniPage";
import EtkinlikDuzenlePage from "./sayfalar/EtkinlikDuzenlePage";
import YayinlarPage from "./sayfalar/YayinlarPage";
import IletisimPage from "./sayfalar/IletisimPage";
// Kullanıcı sayfaları
import UsersPage from "./sayfalar/UsersPage";
import EditUserPage from "./users/EditUserPage";

export default function AdminPanelApp() {
    return (
        <SearchProvider>
        <AdminLayout>
            <Routes>
                {/* /panel → /panel/mainPage */}
                <Route index element={<Navigate to="mainPage" replace />} />
                <Route path="mainPage" element={<HomePanel />} />

                {/* Kullanıcılar */}
                <Route path="/panel/users" element={<UsersPage />} />
                <Route path="/panel/users/:id/edit" element={<EditUserPage />} />

                {/* Kurumsal (nested) */}
                <Route path="kurumsal" element={<KurumsalLayout />}>
                    <Route index element={<Navigate to="yonetim" replace />} />
                    <Route path="yonetim" element={<KurumsalYonetimPage />} />
                    <Route path="vizyon" element={<KurumsalVizyonPage />} />
                    <Route path="raporlar" element={<KurumsalRaporlarPage />} />
                    <Route path="komisyonlar" element={<KurumsalKomisyonlarPage />} />
                </Route>

                {/* Gebze (nested) */}
                <Route path="gebze" element={<GebzeLayout />}>
                    <Route index element={<Navigate to="tarihce" replace />} />
                    <Route path="tarihce" element={<GebzeTarihcePage />} />
                    <Route path="yonetim" element={<GebzeYonetimPage />} />
                    <Route path="sanal-tur" element={<GebzeSanalTurPage />} />
                </Route>

                {/* Diğer modüller */}
                <Route path="haberler" element={<HaberlerPage />} />
                <Route path="hizmetler" element={<HizmetlerPage />} />
                <Route path="etkinlikler" element={<EtkinliklerPage />} />
                <Route path="etkinlikler/yeni" element={<EtkinlikYeniPage />} />
                <Route path="etkinlikler/:id/duzenle" element={<EtkinlikDuzenlePage />} />
                <Route path="yayinlar" element={<YayinlarPage />} />
                <Route path="iletisim" element={<IletisimPage />} />

                {/* 404 */}
                <Route path="*" element={<div className="p-6">Bulunamadı</div>} />
            </Routes>
        </AdminLayout>
</SearchProvider>
    );
}
