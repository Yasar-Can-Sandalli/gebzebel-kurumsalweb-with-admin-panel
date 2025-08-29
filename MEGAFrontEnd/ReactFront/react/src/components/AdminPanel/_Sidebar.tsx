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
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 ${
                active ? "bg-blue-50 text-blue-600" : "text-gray-700"
            }`}
        >
            {icon}
            <span className="text-sm">{label}</span>
        </Link>
    </li>
);

export default function Sidebar({ open, onClose }: SidebarProps) {
    const { pathname } = useLocation();

    return (
        <aside
            className={`
        fixed inset-y-0 left-0 z-50 w-72
        bg-white border-r shadow-sm flex flex-col
        transform transition-transform duration-300 ease-out
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
            aria-hidden={!open}
        >
            {/* Logo + profil */}
            <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                    <img
                        src={gebzeLogo}
                        alt="Gebze Belediyesi"
                        width={120}
                        height={28}
                        className="block h-auto w-auto object-contain"
                    />
                </div>

                <div className="mt-4 bg-gray-50 rounded-xl p-4 text-center shadow">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gray-200" />
                    <div className="mt-2 font-semibold text-gray-800">İSİM SOYİSİM</div>
                    <div className="text-xs text-gray-500">KADEME</div>
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

                    <li>
                        <details className="group">
                            <summary className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-50 text-gray-700">
                                <Briefcase size={16} />
                                <span className="text-sm flex-1">Kurumsal</span>
                                <ChevronRight
                                    size={16}
                                    className="transition-transform group-open:rotate-90 text-gray-500"
                                />
                            </summary>
                            <ul className="ml-7 mt-1 space-y-1 text-sm">
                                <li>
                                    <Link
                                        to="/panel/sayfalar/kurumsal?tab=yonetim"
                                        className="block px-2 py-1 hover:text-blue-600"
                                    >
                                        Yönetim
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/panel/sayfalar/kurumsal?tab=vizyon"
                                        className="block px-2 py-1 hover:text-blue-600"
                                    >
                                        Vizyon-Misyon-İlke
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/panel/sayfalar/kurumsal?tab=raporlar"
                                        className="block px-2 py-1 hover:text-blue-600"
                                    >
                                        Raporlar
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/panel/sayfalar/kurumsal?tab=komisyonlar"
                                        className="block px-2 py-1 hover:text-blue-600"
                                    >
                                        Komisyonlar
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>

                    <Item
                        to="/admin/sayfalar?tab=haberler"
                        label="Haberler"
                        icon={<FileText size={16} />}
                        active={pathname.includes("/sayfalar") && pathname.includes("haber")}
                    />

                    <li>
                        <details className="group">
                            <summary className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-50 text-gray-700">
                                <MapPin size={16} />
                                <span className="text-sm flex-1">Gebze</span>
                                <ChevronRight
                                    size={16}
                                    className="transition-transform group-open:rotate-90 text-gray-500"
                                />
                            </summary>
                            <ul className="ml-7 mt-1 space-y-1 text-sm">
                                <li>
                                    <Link
                                        to="/admin/sayfalar?tab=gebze-tarihce"
                                        className="block px-2 py-1 hover:text-blue-600"
                                    >
                                        Tarihten Günümüze Gebze
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/sayfalar?tab=gebze-yonetim"
                                        className="block px-2 py-1 hover:text-blue-600"
                                    >
                                        Gebze Yönetim
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/sayfalar?tab=gebze-sanal-tur"
                                        className="block px-2 py-1 hover:text-blue-600"
                                    >
                                        360 Sanal Tur
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>

                    <Item to="/admin/sayfalar?tab=hizmetler" label="Hizmetler" icon={<Layers size={16} />} />
                    <Item to="/admin/sayfalar?tab=etkinlikler" label="Etkinlikler" icon={<CalendarDays size={16} />} />
                    <Item to="/admin/sayfalar?tab=yayinlar" label="Yayınlarımız" icon={<BookOpen size={16} />} />
                    <Item to="/admin/sayfalar?tab=iletisim" label="İletişim" icon={<Mail size={16} />} />
                    <Item to="/admin/users" label="Kullanıcılar" icon={<Users size={16} />} />
                </ul>
            </nav>

            {/* Mobil kapatma butonu */}
            <button
                onClick={onClose}
                className="md:hidden m-3 px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
                Menüyü Kapat
            </button>
        </aside>
    );
}
