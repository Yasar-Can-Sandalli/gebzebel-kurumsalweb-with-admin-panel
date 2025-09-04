import { useState } from "react";
import Header from "./_Header";
import Sidebar from "./_Sidebar";

interface AdminLayoutProps {
    children: React.ReactNode;
    /** Edit vb. sayfalarda üst header'ı gizlemek için */
    hideHeader?: boolean;
    /** İçerik genişliği modu: normal | wide | fluid */
    contentWidth?: "normal" | "wide" | "fluid";
}

export default function AdminLayout({
                                        children,
                                        hideHeader = false,
                                        contentWidth = "wide", // ⬅️ varsayılanı geniş yaptım
                                    }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

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
                    sidebarOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
            />

            {/* İç alan */}
            <div
                className={`flex flex-col h-full transition-[margin] duration-300 ${
                    sidebarOpen ? "md:ml-72" : "md:ml-0"
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
