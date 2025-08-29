import { Outlet, NavLink } from "react-router-dom";

export default function _LayoutKurumsal() {
    return (
        <div className="p-6">
            <div className="mb-4 flex gap-3 text-sm">
                <NavLink to="yonetim" className={({isActive}) => isActive ? "text-blue-600" : "text-gray-600"}>Yönetim</NavLink>
                <NavLink to="vizyon" className={({isActive}) => isActive ? "text-blue-600" : "text-gray-600"}>Vizyon-Misyon-İlke</NavLink>
                <NavLink to="raporlar" className={({isActive}) => isActive ? "text-blue-600" : "text-gray-600"}>Raporlar</NavLink>
                <NavLink to="komisyonlar" className={({isActive}) => isActive ? "text-blue-600" : "text-gray-600"}>Komisyonlar</NavLink>
            </div>
            <Outlet />
        </div>
    );
}
