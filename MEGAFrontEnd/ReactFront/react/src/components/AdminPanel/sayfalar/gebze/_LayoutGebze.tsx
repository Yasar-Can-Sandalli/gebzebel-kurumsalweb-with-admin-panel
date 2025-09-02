import { Outlet, NavLink } from "react-router-dom";

export default function _LayoutGebze() {
    return (
        <div className="p-6">
            <div className="mb-4 flex gap-3 text-sm">
                <NavLink to="tarihce" className={({isActive}) => isActive ? "text-blue-600" : "text-gray-600"}>Tarihten Günümüze</NavLink>
                <NavLink to="yonetim" className={({isActive}) => isActive ? "text-blue-600" : "text-gray-600"}>Gebze Yönetim</NavLink>
                <NavLink to="sanal-tur" className={({isActive}) => isActive ? "text-blue-600" : "text-gray-600"}>360 Sanal Tur</NavLink>
            </div>
            <Outlet />
        </div>
    );
}
