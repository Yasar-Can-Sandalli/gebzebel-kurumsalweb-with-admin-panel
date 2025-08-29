import { useState } from "react";
import Header from "./_Header";
import Sidebar from "./_Sidebar";

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

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
                    sidebarOpen ? "md:ml-72" : "md:ml-0"
                }`}
            >
                <Header onToggleSidebar={() => setSidebarOpen((v) => !v)} />

                {/* içerik alanı: merkezli + card'lar için uniform padding */}
                <main className="flex-1 overflow-y-auto">
                    <div className="mx-auto max-w-[1200px] p-6">{children}</div>
                </main>
            </div>
        </div>
    );
}
