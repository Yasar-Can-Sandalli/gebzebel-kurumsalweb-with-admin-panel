import { Search, Bell, User } from 'lucide-react';
import { useSearch } from './context/SearchContext.tsx'; // Adjust the path based on your file structure


export default function Header() {
    const { searchQuery, setSearchQuery } = useSearch(); // Use the custom hook to access the context

    return (
        <header className="bg-white shadow flex items-center justify-between p-4">
            <div className="flex items-center w-1/2">
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        className="pl-4 pr-10 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <Search size={18} className="text-gray-400" />
                    </div>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <button className="p-2 rounded-lg hover:bg-gray-100">
                    <Bell size={20} />
                </button>
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                        <User size={16} />
                    </div>
                    <span className="ml-2 font-medium"></span>
                </div>
            </div>
        </header>
    );
}
