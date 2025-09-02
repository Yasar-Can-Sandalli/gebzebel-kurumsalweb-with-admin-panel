import { Menu, Search, Bell, User, LogOut } from "lucide-react";
import { useSearch } from "./context/SearchContext.tsx";
import { useNavigate } from "react-router-dom";
import { logout } from "./services/authService.tsx";

type HeaderProps = { onToggleSidebar: () => void };

export default function Header({ onToggleSidebar }: HeaderProps) {
    const { searchQuery, setSearchQuery } = useSearch();
    const navigate = useNavigate();

    return (
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
            {/* içerik */}
            <div className="h-14 grid grid-cols-[auto_1fr_auto] items-center gap-3 px-3 md:px-4">
                <button
                    onClick={onToggleSidebar}
                    aria-label="Menüyü aç/kapat"
                    className="p-2 rounded-md hover:bg-slate-100 transition"
                >
                    <Menu className="h-5 w-5" />
                </button>

                {/* arama */}
                <div className="mx-auto w-full max-w-[1100px]">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Arama yap..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 rounded-lg px-4 pr-10
                         ring-1 ring-slate-200 bg-white/90
                         focus:outline-none focus:ring-2 focus:ring-blue-500/60
                         shadow-inner"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    </div>
                </div>

                {/* sağ ikonlar */}
                <div className="flex items-center gap-2">
                    <button className="p-2 rounded-md hover:bg-slate-100 transition">
                        <Bell className="h-5 w-5" />
                    </button>
                    <div className="p-2 rounded-full bg-gradient-to-br from-blue-500 to-sky-500 text-white shadow-lg shadow-blue-500/20">
                        <User className="h-4 w-4" />
                    </div>
                    <button
                        onClick={() => {
                            try {
                                localStorage.removeItem("token");
                                localStorage.removeItem("user");
                                localStorage.removeItem("auth-storage");
                            } catch {}
                            logout(navigate);
                        }}
                        className="p-2 rounded-md hover:bg-slate-100 flex items-center gap-1 text-slate-700 transition"
                        aria-label="Çıkış yap"
                        title="Çıkış yap"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="hidden md:inline text-sm">Çıkış</span>
                    </button>
                </div>
            </div>

            {/* neon alt çizgi */}
            <div className="h-0.5 w-full bg-gradient-to-r from-blue-500 via-sky-400 to-transparent opacity-80" />
        </header>
    );
}
