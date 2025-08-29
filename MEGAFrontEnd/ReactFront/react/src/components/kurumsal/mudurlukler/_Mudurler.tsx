import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

interface Department {
    id: number;
    name: string;
    managerName: string;
    email: string;
    imageUrl: string;
}

const Layout: React.FC = () => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:8080/api/mudurluk")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then((text) => {
                try {
                    const data = JSON.parse(text);
                    setDepartments(data);
                    setLoading(false);
                } catch (error) {
                    console.error("Error parsing JSON:", error, "Response text:", text);
                    setError("Error parsing data");
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error("Error fetching departments:", error);
                setError("Error loading departments");
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 mx-4">
            {/* Page Title */}
            <div className="bg-white rounded-xl shadow-md text-center py-4 mb-4">
                <h1 className="text-2xl font-bold text-blue-900">MÜDÜRLÜKLER</h1>
            </div>

            <div className="container mx-auto px-4 pb-12 max-w-6xl">
                {/* Main Content - Full Width */}
                <div className="w-full">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            <p className="mt-2 text-gray-600">Yükleniyor...</p>
                        </div>
                    ) : error ? (
                        <div className="bg-red-100 p-4 rounded-lg text-red-700">
                            {error}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {departments.map((dept) => (
                                <div
                                    key={dept.id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col h-full"
                                    onClick={() => navigate(`${dept.id}`)}
                                >
                                    <div className="w-full aspect-[3/4] overflow-hidden">
                                        <img
                                            src={dept.imageUrl}
                                            alt={dept.managerName}
                                            className="w-full h-full object-cover object-top"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = "/api/placeholder/150/150";
                                            }}
                                        />
                                    </div>
                                    <div className="p-4 flex flex-col flex-1">
                                        <h2 className="text-sm font-bold text-gray-800 mb-1">{dept.name}</h2>
                                        <p className="text-gray-600 text-xs mb-1">Yönetici: {dept.managerName}</p>
                                        <p className="text-blue-600 text-xs mt-auto">{dept.email}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Layout;