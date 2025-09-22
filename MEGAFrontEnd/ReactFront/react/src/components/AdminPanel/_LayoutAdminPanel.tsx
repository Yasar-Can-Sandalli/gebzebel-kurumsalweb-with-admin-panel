import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./_Header";
import Sidebar from "./_Sidebar";

interface AdminLayoutProps {
    children: React.ReactNode;
    /** Edit vb. sayfalarda üst header'ı gizlemek için */
    hideHeader?: boolean;
    /** İçerik genişliği modu: normal | wide | fluid */
    contentWidth?: "normal" | "wide" | "fluid";
}

const LS_KEY = "sidebar-open-desktop"; // sadece masaüstünde tercih sakla

export default function AdminLayout({
                                        children,
                                        hideHeader = false,
                                        contentWidth = "wide", // varsayılan geniş
                                    }: AdminLayoutProps) {
    const { pathname } = useLocation();

    // matchMedia nesnesini bir kez üret (re-renderlarda yeniden yaratma)
    const mq = useMemo(() => {
        if (typeof window === "undefined") {
            // SSR güvenliği (yoksa false kabul et)
            return { matches: false, addEventListener() {}, removeEventListener() {} } as unknown as MediaQueryList;
        }
        return window.matchMedia("(min-width: 768px)");
    }, []);

    // İlk açılışta durumu belirle:
    // - Masaüstünde: localStorage tercihi varsa onu kullan, yoksa açık başla
    // - Mobilde: kapalı başla
    const getInitialOpen = () => {
        if (typeof window === "undefined") return false;
        if (mq.matches) {
            const saved = localStorage.getItem(LS_KEY);
            return saved ? JSON.parse(saved) : true;
        }
        return false;
    };

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(getInitialOpen);

    // Breakpoint değişimini dinle → masaüstüne geçince tercihi yükle, mobile geçince kapat
    useEffect(() => {
        const handler = (e: MediaQueryListEvent) => {
            if (e.matches) {
                const saved = localStorage.getItem(LS_KEY);
                setSidebarOpen(saved ? JSON.parse(saved) : true);
            } else {
                setSidebarOpen(false);
            }
        };
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, [mq]);

    // Route değişince mobilde otomatik kapat
    useEffect(() => {
        if (!mq.matches) setSidebarOpen(false);
    }, [pathname, mq]);

    // Masaüstündeyken kullanıcı tercihini kaydet
    useEffect(() => {
        if (mq.matches) {
            localStorage.setItem(LS_KEY, JSON.stringify(sidebarOpen));
        }
    }, [sidebarOpen, mq]);

    // İç konteyner genişlik/padding haritası
    const widthMap = {
        normal:
        // ~1280-1440px tavan, kenarlarda standart padding
            "mx-auto w-full max-w-screen-xl xl:max-w-[1280px] px-4 sm:px-5 lg:px-6 py-5",
        wide:
        // ~1600-1800px tavan, kenarlarda daha dar padding
            "mx-auto w-full max-w-[1600px] 2xl:max-w-[1800px] px-3 sm:px-4 lg:px-5 py-5",
        fluid:
        // neredeyse tam genişlik, sadece küçük kenar boşlukları
            "w-full px-3 sm:px-4 lg:px-5 py-5",
    } as const;

    return (
        <div className="h-screen bg-slate-50">
            {/* Sidebar */}
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Mobil overlay */}
            <div
                onClick={() => setSidebarOpen(false)}
                className={`fixed inset-0 bg-black/30 md:hidden transition-opacity ${
                    sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            />

            {/* İç alan */}
            <div
                className={`flex flex-col h-full transition-[margin] duration-300 ${
                    // Masaüstünde ve sidebar açıksa içerik sağa kaydır
                    mq.matches && sidebarOpen ? "md:ml-72" : ""
                }`}
            >
                {!hideHeader && (
                    <Header onToggleSidebar={() => setSidebarOpen((v) => !v)} />
                )}

                {/* içerik alanı */}
                <main className="flex-1 overflow-y-auto">
                    <div className={widthMap[contentWidth]}>{children}</div>
                </main>
            </div>
        </div>
    );
}
