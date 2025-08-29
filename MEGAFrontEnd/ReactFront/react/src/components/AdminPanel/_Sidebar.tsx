import {Menu,File, X, Home, Users, LogOut, ChevronDown, ChevronRight} from 'lucide-react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {logout} from "./services/authService.tsx";
import { useState } from 'react';
import {useAuthStore} from "./store/authStore.ts";

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

interface SidebarLinkProps {
    to: string;
    icon: React.ReactNode;
    text: string;
    sidebarOpen: boolean;
    active?: boolean;
}
const categorizedPages = [
    {
        title: "Sayfalar",
        pages: [
            { key: "KURUMSAL", name: "KURUMSAL", path: "kurumsal", permission: "kurumsal" },
            { key: "GEBZE", name: "GEBZE", path: "gebze", permission: "gebze" },
            { key: "HİZMETLER", name: "HİZMETLER", path: "hizmetler", permission: "hizmetler" },
            { key: "YAYINLAR", name: "YAYINLAR", path: "yayinlar", permission: "yayinlar" },
            { key: "ETKİNLİKLER", name: "ETKİNLİKLER", path: "etkinlikler", permission: "etkinlikler" },
            { key: "HABERLER", name: "HABERLER", path: "haberler", permission: "haberler" },
            { key: "DUYURULAR", name: "DUYURULAR", path: "duyurular", permission: "duyurular" },


        ]
    }
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const [pagesOpenIndex, setPagesOpenIndex] = useState<number | null>(null);

    // Correct: use the hook inside the component
    const { hasPermission, user: currentUser, isAuthenticated } = useAuthStore();
    // If you need these, define them here:
    const canView = hasPermission('kullanıcılar', 'goruntuleme');
    const canEdit = hasPermission('kullanıcılar', 'duzenleme');
    const canDelete = hasPermission('kullanıcılar', 'silme');
    const canAdd = hasPermission('kullanıcılar', 'ekleme');

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className={`${sidebarOpen ? 'w-56' : 'w-16'} min-w-16 bg-gray-900 text-white transition-all duration-300 flex flex-col h-screen shadow-xl`}>
            {/* Header with logo and toggle button */}
            <div className="py-4 px-3 flex items-center justify-between border-b border-gray-800">
                {sidebarOpen ? (
                    <h1 className="text-xl font-bold text-indigo-400">Gebze Admin Panel</h1>
                ) : (
                    <div className="w-full flex justify-center">
                        <span className="font-bold text-lg text-indigo-400">A</span>
                    </div>
                )}

                {/* Toggle button always visible */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-1.5 rounded-md hover:bg-gray-800 text-gray-300 hover:text-indigo-400 z-10"
                >
                    {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
            </div>

            {/* Navigation items */}
            <div className="flex-1 py-3 overflow-y-auto">
                <div className="flex flex-col space-y-0.5 px-2">
                    <SidebarLink to={"/panel/dashboard"} icon={<Home size={20} />} text="Panel" sidebarOpen={sidebarOpen} active={location.pathname === "/panel/dashboard"}  />
                    {/* Only show Kullanıcılar if canView */}
                    {canView && (
                        <SidebarLink to={"/panel/users"} icon={<Users size={20} />} text="Kullanıcılar" sidebarOpen={sidebarOpen} active={location.pathname === "/panel/users"} />
                    )}
                    {categorizedPages.map((category, index) => (
                        <div key={index} className="pb-1">
                            <button
                                onClick={() => setPagesOpenIndex(pagesOpenIndex === index ? null : index)}
                                className={`flex items-center w-full rounded-md py-2.5 transition-all hover:bg-gray-800 ${
                                    sidebarOpen ? "px-3" : "justify-center px-2"
                                }`}
                            >
                                <div className={`flex justify-center ${sidebarOpen ? '' : 'w-full'}`}>
        <span className="text-gray-300">
          {pagesOpenIndex === index ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </span>
                                </div>
                                {sidebarOpen && (
                                    <span className="ml-3 text-sm font-medium text-gray-300">{category.title}</span>
                                )}
                            </button>

                            {pagesOpenIndex === index &&
                                category.pages
                                    .filter(page => hasPermission(page.permission, 'goruntuleme'))
                                    .map(page => (
                                        <SidebarLink
                                            key={page.key}
                                            to={`/panel/sayfalar/${page.path}`}
                                            icon={<File size={18} />}
                                            text={page.name}
                                            sidebarOpen={sidebarOpen}
                                            active={location.pathname === `/panel/sayfalar/${page.path}`}
                                        />
                                    ))}
                        </div>
                    ))}

                </div>
            </div>

            {/* Logout button */}
            <div className="mt-auto px-2 py-3">
                <a onClick={handleLogout} className={`flex items-center rounded-md py-2.5 transition-all hover:bg-gray-800 ${sidebarOpen ? 'px-3' : 'justify-center px-2'}`}>
                    <LogOut size={20} className="text-gray-300" />
                    {sidebarOpen && <span className="ml-3 text-sm font-medium text-gray-300">Çıkış Yap</span>}
                </a>
            </div>
        </div>
    );
}

const SidebarLink = ({ to, icon, text, sidebarOpen, active = false }: SidebarLinkProps) => {
    return (
        <Link
            to={to}
            className={`flex items-center rounded-md py-2.5 transition-all ${
                active ? "bg-indigo-500/20" : "hover:bg-gray-800"
            } ${sidebarOpen ? "px-3" : "justify-center px-2"}`}
        >
            <div className={`flex justify-center ${sidebarOpen ? '' : 'w-full'}`}>
                <div className={active ? "text-indigo-400" : "text-gray-300"}>
                    {icon}
                </div>
            </div>
            {sidebarOpen && (
                <span className={`ml-3 text-sm font-medium ${active ? "text-indigo-400" : "text-gray-300"}`}>
                    {text}
                </span>
            )}
        </Link>
    );
};