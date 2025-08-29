import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Interface for the data structure
interface Mudur {
    id: number;
    name: string; // müdürlük ismi
    managerName: string; // müdür ismi
    email: string;
    imageUrl: string;
    mudAciklamasi: string;
    regulations: string;
    biography: string;
}

const MudurDetay = () => {
    const { id } = useParams<{ id: string }>();
    const [mudur, setMudur] = useState<Mudur | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('about');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios.defaults.baseURL = 'http://localhost:8080';
        axios.get(`http://localhost:8080/api/mudurluk/${id}`)
            .then(res => {
                setMudur(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Bir hata oluştu, lütfen tekrar deneyin.");
                setIsLoading(false);
            });
    }, [id]);

    // Empty data state
    if (!mudur) {
        return (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow-md">
                <p className="font-bold">Uyarı</p>
                <p>Müdürlük bilgisi bulunamadı.</p>
            </div>
        );
    }


    // Error state
    if (error) return (
        <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
            <div className="w-full max-w-2xl bg-white border-l-4 border-red-500 rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105">
                <div className="p-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-8 w-8 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h2 className="text-lg font-semibold text-gray-900">Hata</h2>
                            <p className="text-gray-600">{error}</p>
                            <button
                                className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors duration-200"
                                onClick={() => window.location.reload()}
                            >
                                Yeniden Dene
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Loading state with shimmering effect
    if (isLoading) return (
        <div className="w-full max-w-6xl mx-auto my-8 px-4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="animate-pulse">
                    <div className="md:flex">
                        <div className="md:w-1/3 bg-gray-200 h-64"></div>
                        <div className="p-6 md:w-2/3">
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
                            <div className="flex space-x-3">
                                <div className="h-10 bg-gray-200 rounded-full w-24"></div>
                                <div className="h-10 bg-gray-200 rounded-full w-24"></div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-100">
                        <div className="flex p-4 space-x-1">
                            <div className="h-8 bg-gray-200 rounded w-20"></div>
                            <div className="h-8 bg-gray-200 rounded w-20"></div>
                            <div className="h-8 bg-gray-200 rounded w-20"></div>
                        </div>
                        <div className="p-6">
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-full max-w-6xl mx-auto my-8 px-4 mt-3">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                {/* Hero Section */}
                <div className="md:flex">
                    <div className="md:w-1/3 relative group">
                        <img
                            className="h-64 w-full object-cover md:h-full transition-transform duration-500 group-hover:scale-105"
                            src={mudur.imageUrl}
                            alt={`${mudur.name} görsel`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="inline-block bg-blue-500 text-white px-3 py-1 text-xs font-semibold rounded-full">
                  Müdürlük ID: {mudur.id}
                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:w-2/3 md:flex md:flex-col md:justify-between">
                        <div>
                            <div className="flex items-center">
                                <div className="bg-blue-500 h-8 w-2 rounded-r mr-3"></div>
                                <h1 className="text-3xl font-bold text-gray-800">{mudur.name}</h1>
                            </div>

                            <div className="mt-6 space-y-4">
                                <div className="flex items-center">
                                    <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Müdür</p>
                                        <p className="font-medium text-gray-800">{mudur.managerName}</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <a href={`mailto:${mudur.email}`} className="font-medium text-blue-600 hover:text-blue-800 transition-colors">{mudur.email}</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 md:mt-0">
                            <div className="inline-flex rounded-md shadow-sm" role="group">
                                <button
                                    onClick={() => setActiveTab('biography')}
                                    className={`px-4 py-2 text-sm font-medium ${
                                        activeTab === 'biography'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-50'
                                    } border-t border-b border-gray-200`}
                                >
                                    Biyografi
                                </button>
                                <button
                                    onClick={() => setActiveTab('regulations')}
                                    className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                                        activeTab === 'regulations'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-50'
                                    } border border-gray-200`}
                                >
                                    Yönetmelik
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="border-t border-gray-100">
                    <div className="p-6">
                        {activeTab === 'about' && (
                            <div className="animate-fade-in">
                                <div className="flex items-center mb-4">
                                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h2 className="ml-3 text-xl font-semibold text-gray-800">Müdürlük Hakkında</h2>
                                </div>
                                <div className="ml-11">
                                    <div className="prose max-w-none">
                                        <p className="text-gray-600 leading-relaxed">{mudur.mudAciklamasi}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'biography' && (
                            <div className="animate-fade-in">
                                <div className="flex items-center mb-4">
                                    <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                        </svg>
                                    </div>
                                    <h2 className="ml-3 text-xl font-semibold text-gray-800">Müdür Biyografisi</h2>
                                </div>
                                <div className="ml-11">
                                    <div className="prose max-w-none">
                                        <p className="text-gray-600 leading-relaxed">{mudur.biography}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'regulations' && (
                            <div className="animate-fade-in">
                                <div className="flex items-center mb-4">
                                    <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h2 className="ml-3 text-xl font-semibold text-gray-800">Yönetmelik</h2>
                                </div>
                                <div className="ml-11">
                                    <div className="prose max-w-none bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-inner">
                                        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: mudur.regulations }} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MudurDetay;