import React, { useState, useEffect } from 'react';
import { DropdownItem } from '../_SayfaBilgileri/types.tsx';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

interface SidebarProps {
    items: DropdownItem[];
    title?: string;
    autoCollapseWidth?: number; // Yeni prop: otomatik collapse olacağı ekran genişliği
}

const Sidebar: React.FC<SidebarProps> = ({ items, title, autoCollapseWidth = 1024 }) => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            // Eğer pencere genişliği belirtilen değerden küçükse collapse yap
            if (window.innerWidth <= autoCollapseWidth) {
                setCollapsed(true);
            } else {
                setCollapsed(false);
            }
        };

        // İlk yüklemede kontrol et
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [autoCollapseWidth]);

    return (
        <div
            className={`lg:block ${collapsed ? 'w-16' : 'w-72'} mr-[4vw] hidden shadow-lg rounded-2xl md:h-fit md:relative md:top-10 md:left-13 md:z-10 md:overflow-hidden md:transition-all duration-300`}
            style={{
                background: 'linear-gradient(180deg, #003366 0%, #00264d 100%)',
                borderTopLeftRadius: '1rem',
                borderTopRightRadius: '1rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
        >
            {/* Modern Sidebar Title */}
            <div
                className="p-4 relative"
                style={{
                    background: 'linear-gradient(135deg, #003366 0%, #00264d 100%)',
                    borderTopLeftRadius: '1rem',
                    borderTopRightRadius: '1rem',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
            >
                {/* Sidebar genişken: ortada başlık ve sağda ok ikonu */}
                {!collapsed && (
                    <>
                        {title && (
                            <div className="flex justify-center">
                                <h3 className="text-white font-bold text-lg tracking-wide text-center uppercase">
                                    {title}
                                </h3>
                            </div>
                        )}

                        <button
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-[#faa61a] transition-colors duration-200"
                            onClick={toggleSidebar}
                            aria-label="Kenar çubuğunu daralt"
                        >
                            <FontAwesomeIcon icon={faAnglesLeft} />
                        </button>
                    </>
                )}

                {/* Sidebar darken: ortada ok ikonu */}
                {collapsed && (
                    <div className="flex justify-center">
                        <button
                            className="text-white hover:text-[#faa61a] transition-colors duration-200"
                            onClick={toggleSidebar}
                            aria-label="Kenar çubuğunu genişlet"
                        >
                            <FontAwesomeIcon icon={faAnglesRight} />
                        </button>
                    </div>
                )}
            </div>

            {/* Sidebar Menu Items with modern styling */}
            <ul className="py-2">
                {items.length > 0 ? (
                    items.map((item, index) => {
                        const isActive = location.pathname === item.path;

                        return (
                            <li key={index}>
                                <Link
                                    to={item.path || "#"}
                                    className={`flex items-center ${collapsed ? 'justify-center' : ''} py-3 transition-all duration-200 
                                    ${isActive
                                        ? " text-[#faa61a] *:text-[#faa61a] font-semibold hover:no-underline"
                                        : "text-white hover:no-underline"}`}
                                >
                                    {!collapsed && (
                                        <div className="flex items-center w-full pl-6">
                                            <span className={`text-l ${isActive ? 'text-[#faa61a] hover:text-[#faa61a] ' : 'text-white'} mr-3`}>
                                                {item.icon}
                                            </span>
                                            <span className="font-medium">{item.title}</span>
                                        </div>
                                    )}
                                    {collapsed && (
                                        <span className={`text-l ${isActive ? 'text-[#faa61a] hover:text-[#faa61a] ' : 'text-white'}`}>
                                            {item.icon}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        );
                    })
                ) : (
                    <li className={`${collapsed ? 'text-center' : 'p-4'} text-white`}>
                        {collapsed ? '...' : 'Öğe bulunamadı'}
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Sidebar;