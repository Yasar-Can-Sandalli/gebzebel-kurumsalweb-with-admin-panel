// pages/Dashboard.tsx
import {useEffect, useState} from 'react';
import { BarChart2, Users, Settings, User } from 'lucide-react';
import AdminLayout from './_LayoutAdminPanel.tsx';
import { useSearch } from './context/SearchContext';


// Define TypeScript interfaces
interface DataItem {
    id: number;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive' | 'pending';
    lastActive: string;
}

interface StatsCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    change: string;
    isPositive: boolean;
}

// Sample data
const mockData: DataItem[] = [
    { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Admin', status: 'active', lastActive: '2 mins ago' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Editor', status: 'active', lastActive: '1 hour ago' },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com', role: 'User', status: 'inactive', lastActive: '3 days ago' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'Admin', status: 'active', lastActive: '5 mins ago' },
    { id: 5, name: 'Robert Wilson', email: 'robert@example.com', role: 'User', status: 'pending', lastActive: '1 week ago' },
];

// StatsCard component
const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, change, isPositive }) => {
    return (
        <div className="bg-white rounded-lg shadow p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
                <div className="p-2 bg-blue-50 rounded-lg">{icon}</div>
            </div>
            <div className="flex flex-col">
                <span className="text-2xl font-bold mb-1">{value}</span>
                <span className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'} flex items-center`}>
          {isPositive ? '↑' : '↓'} {change} since last month
        </span>
            </div>
        </div>
    );
};

// Badge component for status
const StatusBadge: React.FC<{ status: 'active' | 'inactive' | 'pending' }> = ({ status }) => {
    const colors = {
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-red-100 text-red-800',
        pending: 'bg-yellow-100 text-yellow-800',
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
    );
};

// Main Dashboard component
export default function Dashboard() {
    const { searchQuery } = useSearch();
    const [filteredData, setFilteredData] = useState(mockData);




    // Update filtered data when search query changes
    useEffect(() => {
        const filtered = mockData.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchQuery]);

    return (
        <AdminLayout>
            <h2 className="text-2xl font-bold mb-6">Panel</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard
                    title="Total Users"
                    value="2,543"
                    icon={<Users size={24} className="text-blue-500" />}
                    change="12.5%"
                    isPositive={true}
                />
                <StatsCard
                    title="Total Revenue"
                    value="$42,389"
                    icon={<BarChart2 size={24} className="text-green-500" />}
                    change="8.2%"
                    isPositive={true}
                />
                <StatsCard
                    title="Active Sessions"
                    value="326"
                    icon={<User size={24} className="text-purple-500" />}
                    change="5.1%"
                    isPositive={false}
                />
                <StatsCard
                    title="Conversion Rate"
                    value="3.42%"
                    icon={<Settings size={24} className="text-orange-500" />}
                    change="2.4%"
                    isPositive={true}
                />
            </div>


        </AdminLayout>
    );
}