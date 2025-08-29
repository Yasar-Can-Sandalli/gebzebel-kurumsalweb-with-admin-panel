import Sidebar from '../SideBar/sidebar.tsx';
import { Outlet, useLocation } from 'react-router-dom';
import {tarihiyerler} from '../_SayfaBilgileri/Sayfalar.tsx';

const tarihiyerlerLayout = () => {
    const location = useLocation();
    const pagesWithoutSidebar = ['/login', '/signup',]; // Sidebar istemediğiniz sayfaların path'lerini ekleyin.

    const shouldDisplaySidebar = !pagesWithoutSidebar.includes(location.pathname);

    return (
        <div className="flex">
            {shouldDisplaySidebar && <Sidebar items={tarihiyerler} title="Gebze" />}
            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default tarihiyerlerLayout;
