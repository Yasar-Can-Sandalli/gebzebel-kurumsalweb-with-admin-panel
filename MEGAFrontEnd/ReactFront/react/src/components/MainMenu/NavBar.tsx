
{/*
import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import {
    FiHome,
    FiMapPin,
    FiBriefcase,
    FiFileText,
    FiCalendar,
    FiMessageCircle,
    FiGrid
} from 'react-icons/fi';

// Define types for menu items
interface SubMenuItem {
    title: string;
    link: string;
}

interface MenuItem {
    title: string;
    link?: string;
    icon: React.ReactNode;
    subMenuItems?: SubMenuItem[];
}

// Main menu items with submenus
const menuItems: MenuItem[] = [
    {
        title: 'Corporate',
        icon: <FiBriefcase className="text-gray-800" />,
        subMenuItems: [
            { title: 'About Us', link: '/about' },
            { title: 'Vision & Mission', link: '/vision-mission' },
            { title: 'Management', link: '/management' },
            { title: 'History', link: '/history' }
        ]
    },
    {
        title: 'Gebze',
        icon: <FiMapPin className="text-gray-800" />,
        subMenuItems: [
            { title: 'History of Gebze', link: '/gebze-history' },
            { title: 'Tourism', link: '/tourism' },
            { title: 'City Guide', link: '/city-guide' },
            { title: 'Photo Gallery', link: '/gallery' }
        ]
    },
    {
        title: 'Services',
        icon: <FiGrid className="text-gray-800" />,
        subMenuItems: [
            { title: 'Urban Services', link: '/urban-services' },
            { title: 'Social Services', link: '/social-services' },
            { title: 'Health Services', link: '/health-services' },
            { title: 'Cultural Services', link: '/cultural-services' }
        ]
    },
    {
        title: 'E-Municipality',
        icon: <FiHome className="text-gray-800" />,
        subMenuItems: [
            { title: 'Online Payments', link: '/payments' },
            { title: 'Tax Inquiry', link: '/tax-inquiry' },
            { title: 'Application Status', link: '/application-status' },
            { title: 'Smart City', link: '/smart-city' }
        ]
    },
    {
        title: 'Events',
        icon: <FiCalendar className="text-gray-800" />,
        subMenuItems: [
            { title: 'Upcoming Events', link: '/upcoming-events' },
            { title: 'Cultural Activities', link: '/cultural-activities' },
            { title: 'Sports Events', link: '/sports-events' },
            { title: 'Workshops', link: '/workshops' }
        ]
    },
    {
        title: 'News',
        icon: <FiFileText className="text-gray-800" />,
        subMenuItems: [
            { title: 'Latest News', link: '/latest-news' },
            { title: 'Announcements', link: '/announcements' },
            { title: 'Press Releases', link: '/press-releases' },
            { title: 'Newsletters', link: '/newsletters' }
        ]
    },
    {
        title: 'Contact',
        icon: <FiMessageCircle className="text-gray-800" />,
        subMenuItems: [
            { title: 'Contact Information', link: '/contact-info' },
            { title: 'Suggestion Form', link: '/suggestion' },
            { title: 'Complaint Form', link: '/complaint' },
            { title: 'Location Map', link: '/location' }
        ]
    }
];

// Types for our props
interface NavbarProps {
    // You can add any props needed
}

const Navbar: React.FC<NavbarProps> = () => {
    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">

                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold">Cal.com</span>
                            <span className="text-xs align-top">®</span>
                        </div>


                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {menuItems.map((item, index) => (
                                <div key={index} className="relative dropdown">
                                    <button
                                        className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300"
                                    >
                                        {item.title}
                                        {item.subMenuItems && <FiChevronDown className="ml-1" />}
                                    </button>


                                    {item.subMenuItems && (
                                        <div className="dropdown-menu absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 py-2">
                                            {item.subMenuItems.map((subItem, subIndex) => (
                                                <a
                                                    key={subIndex}
                                                    href={subItem.link}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    {subItem.title}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center">
                        <a href="#" className="ml-8 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                            Giriş yap
                        </a>
                        <a href="#" className="ml-4 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800">
                            Başlayın
                        </a>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .dropdown-menu {
          display: none;
        }

        .dropdown:hover .dropdown-menu {
          display: block;
        }
      `}</style>
        </nav>
    );
};

export default Navbar;
*/}