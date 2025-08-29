import Sidebar from '../SideBar/sidebar.tsx';
import { Outlet, useLocation } from 'react-router-dom';
import { skurumsal } from '../_SayfaBilgileri/Sayfalar.tsx';

const KurumsalLayout = () => {
    const location = useLocation();
    const pagesWithoutSidebar = ['/login', '/signup','/kurumsal/eskibaskanlar', '/kurumsal/belediyemeclisi']; // Sidebar istemediğiniz sayfaların path'lerini ekleyin.

    const shouldDisplaySidebar = !pagesWithoutSidebar.includes(location.pathname);

    return (
        <div className="flex">
            {shouldDisplaySidebar && <Sidebar items={skurumsal} title="Kurumsal" />}
            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default KurumsalLayout;
