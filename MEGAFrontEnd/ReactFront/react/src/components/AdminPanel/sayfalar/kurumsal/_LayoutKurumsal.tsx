import { Outlet, NavLink } from "react-router-dom";

export default function _LayoutKurumsal() {
    return (
        <div className="p-6">
            <div className="mb-4 flex gap-3 text-sm">
                <NavLink to="yonetim" className={({isActive}) => isActive ? "text-blue-600" : "text-gray-600"}>Yönetim</NavLink>
                <NavLink to="BMVI" className={({isActive}) => isActive ? "text-blue-600" : "text-gray-600"}>Baskan-Vizyon-Misyon-İlke</NavLink>
                <NavLink to="raporlar" className={({isActive}) => isActive ? "text-blue-600" : "text-gray-600"}>Raporlar</NavLink>
                <NavLink to="mudurlukler" className={({isActive}) => isActive ? "text-blue-600" : "text-gray-600"}>Müdürlükler</NavLink>
            </div>
            <Outlet />
        </div>
    );
}
