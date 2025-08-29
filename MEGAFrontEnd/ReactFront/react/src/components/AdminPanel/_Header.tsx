import { Menu, Search, Bell, User } from "lucide-react";
import { useSearch } from "./context/SearchContext.tsx";

type HeaderProps = { onToggleSidebar: () => void };

export default function Header({ onToggleSidebar }: HeaderProps) {
    const { searchQuery, setSearchQuery } = useSearch();

    return (
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
            {/* sol: toggle | orta: arama | sağ: ikonlar */}
            <div className="h-14 grid grid-cols-[auto_1fr_auto] items-center gap-3 px-3 md:px-4">
                <button
                    onClick={onToggleSidebar}
                    aria-label="Menüyü aç/kapat"
                    className="p-2 rounded-md hover:bg-gray-100"
                >
                    <Menu className="h-5 w-5" />
                </button>

                <div className="mx-auto w-full max-w-[1100px]">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Arama yap..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 rounded-lg border pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="p-2 rounded-md hover:bg-gray-100">
                        <Bell className="h-5 w-5" />
                    </button>
                    <div className="p-2 rounded-full bg-blue-500 text-white">
                        <User className="h-4 w-4" />
                    </div>
                </div>
            </div>
        </header>
    );
}
