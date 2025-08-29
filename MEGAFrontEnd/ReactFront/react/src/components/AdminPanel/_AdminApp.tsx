import React, {useEffect} from "react";
import {Route, Routes, Navigate, Outlet, useNavigate} from "react-router-dom";
import Users from "./users/User2.tsx";
import Dashboard from './HomePanel.tsx';
import Sayfalar from './sayfalar/template_sayfalar.tsx'
import {SearchProvider} from './context/SearchContext.tsx';
import {isAuthenticated, setupAuthListener} from './services/authService.tsx';
import KurumsalSayfa from './sayfalar/sayfaKurumsal.tsx';
import EditSayfaTest from './sayfalar/EditPage.tsx';

import EditUserPage from './users/EditUserPage.tsx';
const AdminRoute = () => {
    // Check these return the expected values
    // console.log('Is authenticated:', isAuthenticated());
    // console.log('Is admin:', isAdmin());
    if (!isAuthenticated()) {
        return <Navigate to="/login"/>;
    }


    return <Outlet />; // This will render the child routes
};


const _AdminApp: React.FC = () => {

    const navigate = useNavigate();
    useEffect(() => {
        setupAuthListener(navigate);
    }, [navigate]);

    return (
        <SearchProvider> {/* Wrap ALL routes that need search context */}
            <Routes>
                {/* All routes here are relative to /admin */}
                <Route element={<AdminRoute />}>
                    {/* /admin/dashboard */}
                    <Route path="dashboard" element={<Dashboard />} />

                    {/* /admin/users */}
                    <Route path="users" element={<Users />} />

                    <Route path="sayfalar" element={<Sayfalar />} />
                    <Route path="sayfalar/kurumsal" element={<KurumsalSayfa />} />
                    <Route path="sayfalar/edit/:tableName/:id" element={<EditSayfaTest />} />
                    <Route path="users/:id/edit" element={<EditUserPage />} />
                    {/* Redirect /admin to /admin/dashboard */}
                    <Route index element={<Navigate to="dashboard" replace />} />
                </Route>
            </Routes>
        </SearchProvider>
    );
};
export default _AdminApp;
