import gebzeLogo from "../../assets/images/gebze.png";
import { Link, useLocation } from "react-router-dom";
import {
    Home,
    Briefcase,
    FileText,
    MapPin,
    Layers,
    CalendarDays,
    BookOpen,
    Mail,
    Users,
    ChevronRight,
} from "lucide-react";

type SidebarProps = {
    open: boolean;
    onClose: () => void;
};

const Item = ({
                  to,
                  icon,
                  label,
                  active,
              }: {
    to: string;
    icon: React.ReactNode;
    label: string;
    active?: boolean;
}) => (
    <li>
        <Link
            to={to}
            className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg
                  hover:bg-slate-50 transition text-sm
                  ${active ? "bg-gradient-to-r from-blue-50 to-transparent text-blue-700 ring-1 ring-blue-200" : "text-slate-700"}`}
        >
            {/* küçük neon bar (hover’da görünür) */}
            <span
                className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full
                   bg-gradient-to-b from-blue-500 to-sky-400 opacity-0
                   group-hover:opacity-100 transition"
            />
            {icon}
            <span>{label}</span>
        </Link>
    </li>
);

export default function Sidebar({ open, onClose }: SidebarProps) {
    const { pathname } = useLocation();
    const isKurumsal = pathname.startsWith("/panel/kurumsal");
    const isGebze = pathname.startsWith("/panel/gebze");

    return (
        <aside
            className={`
        fixed inset-y-0 left-0 z-50 w-72
        bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70
        shadow-xl ring-1 ring-slate-200/60
        flex flex-col transform transition-transform duration-300 ease-out
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
            aria-hidden={!open}
        >
            {/* Logo + profil */}
            <div className="p-4 border-b border-transparent">
                <div className="flex items-center gap-3">
                    <img
                        src={gebzeLogo}
                        alt="Gebze Belediyesi"
                        width={120}
                        height={28}
                        className="block h-auto w-auto object-contain"
                    />
                </div>

                <div className="mt-4 rounded-xl p-4 text-center bg-white shadow-md shadow-blue-500/5 ring-1 ring-slate-200/60">
                    <div className="w-16 h-16 mx-auto rounded-full bg-slate-200" />
                    <div className="mt-2 font-semibold text-slate-800">İSİM SOYİSİM</div>
                    <div className="text-xs text-slate-500">KADEME</div>
                </div>
            </div>

            {/* Menü */}
            <nav className="p-4 flex-1 overflow-y-auto">
                <ul className="space-y-1">
                    <Item
                        to="/panel/dashboard"
                        label="Anasayfa"
                        icon={<Home size={16} />}
                        active={pathname.startsWith("/panel/dashboard")}
                    />

                    {/* Kurumsal */}
                    <li>
                        <details className="group" open={isKurumsal}>
                            <summary className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 text-slate-700">
                                <Briefcase size={16} />
                                <span className="text-sm flex-1">Kurumsal</span>
                                <ChevronRight size={16} className="transition-transform group-open:rotate-90 text-slate-500" />
                            </summary>
                            <ul className="ml-7 mt-1 space-y-1 text-sm">
                                {[
                                    { to: "/panel/kurumsal/yonetim", label: "Yönetim" },
                                    { to: "/panel/kurumsal/vizyon", label: "Vizyon-Misyon-İlke" },
                                    { to: "/panel/kurumsal/raporlar", label: "Raporlar" },
                                    { to: "/panel/kurumsal/komisyonlar", label: "Komisyonlar" },
                                ].map((x) => (
                                    <li key={x.to}>
                                        <Link
                                            to={x.to}
                                            className={`block px-2 py-1 rounded hover:bg-slate-50 hover:text-blue-600 ${
                                                pathname.startsWith(x.to) ? "text-blue-600" : ""
                                            }`}
                                        >
                                            {x.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    </li>

                    {/* Haberler */}
                    <Item
                        to="/panel/haberler"
                        label="Haberler"
                        icon={<FileText size={16} />}
                        active={pathname.startsWith("/panel/haberler")}
                    />

                    {/* Gebze */}
                    <li>
                        <details className="group" open={isGebze}>
                            <summary className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 text-slate-700">
                                <MapPin size={16} />
                                <span className="text-sm flex-1">Gebze</span>
                                <ChevronRight size={16} className="transition-transform group-open:rotate-90 text-slate-500" />
                            </summary>
                            <ul className="ml-7 mt-1 space-y-1 text-sm">
                                {[
                                    { to: "/panel/gebze/tarihce", label: "Tarihten Günümüze Gebze" },
                                    { to: "/panel/gebze/yonetim", label: "Gebze Yönetim" },
                                    { to: "/panel/gebze/sanal-tur", label: "360 Sanal Tur" },
                                ].map((x) => (
                                    <li key={x.to}>
                                        <Link
                                            to={x.to}
                                            className={`block px-2 py-1 rounded hover:bg-slate-50 hover:text-blue-600 ${
                                                pathname.startsWith(x.to) ? "text-blue-600" : ""
                                            }`}
                                        >
                                            {x.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    </li>

                    {/* Diğer */}
                    <Item
                        to="/panel/hizmetler"
                        label="Hizmetler"
                        icon={<Layers size={16} />}
                        active={pathname.startsWith("/panel/hizmetler")}
                    />
                    <Item
                        to="/panel/etkinlikler"
                        label="Etkinlikler"
                        icon={<CalendarDays size={16} />}
                        active={pathname.startsWith("/panel/etkinlikler")}
                    />
                    <Item
                        to="/panel/yayinlar"
                        label="Yayınlarımız"
                        icon={<BookOpen size={16} />}
                        active={pathname.startsWith("/panel/yayinlar")}
                    />
                    <Item
                        to="/panel/iletisim"
                        label="İletişim"
                        icon={<Mail size={16} />}
                        active={pathname.startsWith("/panel/iletisim")}
                    />
                    <Item
                        to="/panel/users"
                        label="Kullanıcılar"
                        icon={<Users size={16} />}
                        active={pathname.startsWith("/panel/users")}
                    />
                </ul>
            </nav>

            {/* Mobil kapatma */}
            <button
                onClick={onClose}
                className="md:hidden m-3 px-3 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
                Menüyü Kapat
            </button>
        </aside>
    );
}