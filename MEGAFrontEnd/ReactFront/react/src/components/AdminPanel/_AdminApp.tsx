
// AdminApp.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./_LayoutAdminPanel";
import HomePanel from "./HomePanel";

import { SearchProvider } from "./context/SearchContext";

// --- Kurumsal (nested)
import KurumsalLayout from "./sayfalar/kurumsal/_LayoutKurumsal.tsx";
import KurumsalYonetimPage from "./sayfalar/kurumsal/KurumsalYonetimPage.tsx";
import KurumsalBVMI from "./sayfalar/kurumsal/KurumsalBVMI.tsx";
import KurumsalRaporlarPage from "./sayfalar/kurumsal/KurumsalRaporlarPage.tsx";
import KurumsalMudurluklerPage from "./sayfalar/kurumsal/KurumsalMudurluklerPage.tsx";
import KurumsalMudurluklerYeniPage from "./sayfalar/kurumsal/KurumsalMudurluklerYeniPage.tsx";
import KurumsalMudurluklerEditPage from "./sayfalar/kurumsal/KurumsalMudurluklerEditPage.tsx";

// --- Gebze (nested)
import GebzeLayout from "./sayfalar/gebze/_LayoutGebze";
import GebzeTarihcePage from "./sayfalar/gebze/GebzeTarihcePage";
import GebzeYonetimPage from "./sayfalar/gebze/GebzeYonetimPage";
import GebzeSanalTurPage from "./sayfalar/gebze/GebzeSanalTurPage";

// --- Diğer modüller
import HaberlerPage from "./sayfalar/HaberlerPage";
import HaberlerYeniPage from "./sayfalar/HaberlerYeniPage.tsx"
import HizmetlerPage from "./sayfalar/HizmetlerPage";
import EtkinliklerPage from "./sayfalar/EtkinliklerPage";
import EtkinlikYeniPage from "./sayfalar/EtkinlikYeniPage";
import EditPage from "./sayfalar/EditPage";
import YayinlarPage from "./sayfalar/YayinlarPage";
import IletisimPage from "./sayfalar/IletisimPage";

// --- Kullanıcı sayfaları
// NOT: Dosyan senin örneğinde `src/sayfalar/kurumsal/UsersPage.tsx` altında.
// O yüzden import'ı buna göre düzeltelim:
import UsersPage from "./sayfalar/UsersPage";
import EditUserPage from "./users/EditUserPage";
import AddUserPage from "./users/AddUserPage";

// --- Ayarlar sayfası
import SettingsPage from "./settings/SettingsPage";
import RaporEditPage from "./sayfalar/kurumsal/RaporEditPage.tsx";

export default function AdminPanelApp() {
    return (
        <SearchProvider>
            <AdminLayout>
                <Routes>
                    {/* /panel → /panel/mainPage */}
                    <Route index element={<Navigate to="mainPage" replace />} />
                    <Route path="mainPage" element={<HomePanel />} />

                    {/* Kullanıcılar (relative path) */}
                    <Route path="users" element={<UsersPage />} />
                    <Route path="users/yeni" element={<AddUserPage />} />
                    <Route path="users/:id/edit" element={<EditUserPage />} />

                    {/* Ayarlar */}
                    <Route path="settings" element={<SettingsPage />} />

                    {/* Kurumsal (nested) */}
                    <Route path="kurumsal" element={<KurumsalLayout />}>
                        <Route index element={<Navigate to="yonetim" replace />} />
                        <Route path="yonetim" element={<KurumsalYonetimPage />} />
                        <Route path="/kurumsal/yonetim/:id/edit" element={<EditPage />} />
                        <Route path="/kurumsal/BMVI" element={<KurumsalBVMI />} />
                        <Route path="/kurumsal/BMVI/:id/edit" element={<EditPage />} />
                        <Route path="raporlar" element={<KurumsalRaporlarPage />} />
                        <Route path="raporlar/:id/duzenle" element={<RaporEditPage />} />
                        <Route path="komisyonlar" element={<KurumsalMudurluklerPage />} />
                        <Route path="/kurumsal/mudurlukler" element={<KurumsalMudurluklerPage />} />
                        <Route path="/kurumsal/mudurlukler/yeni" element={<KurumsalMudurluklerYeniPage />} />
                        <Route path="/kurumsal/mudurlukler/duzenle/:id" element={<KurumsalMudurluklerEditPage />} />
                    </Route>

                    {/* Gebze (nested) */}
                    <Route path="gebze" element={<GebzeLayout />}>
                        <Route index element={<Navigate to="tarihce" replace />} />
                        <Route path="tarihce" element={<GebzeTarihcePage />} />
                        <Route path="yonetim" element={<GebzeYonetimPage />} />
                        <Route path="sanal-tur" element={<GebzeSanalTurPage />} />
                    </Route>

                    {/* Diğer modüller (relative path'ler) */}
                    <Route path="haberler" element={<HaberlerPage />} />
                    <Route path="haberler/yeni" element={<HaberlerYeniPage />} />
                    <Route path="haberler/duzenle/:id" element={<EditPage />} />
                    <Route path="hizmetler" element={<HizmetlerPage />} />
                    <Route path="hizmetler/yeni" element={<HizmetlerPage />} />
                    <Route path="hizmetler/:id/duzenle" element={<EditPage />} />
                    <Route path="etkinlikler" element={<EtkinliklerPage />} />
                    <Route path="etkinlikler/yeni" element={<EtkinlikYeniPage />} />
                    <Route path="etkinlikler/:id/duzenle" element={<EditPage />} />
                    <Route path="yayinlar" element={<YayinlarPage />} />
                    <Route path="iletisim" element={<IletisimPage />} />

                    {/* 404 */}
                    <Route path="*" element={<div className="p-6">Bulunamadı</div>} />
                </Routes>
            </AdminLayout>
        </SearchProvider>
    );
}
