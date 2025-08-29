// components/AdminLayout.tsx
import { useState } from 'react';
import _Sidebar from './_Sidebar.tsx';
import _Header from './_Header.tsx';

interface AdminLayoutProps {
    children: React.ReactNode;
    onSearch?: (query: string) => void;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <_Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <_Header />

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}