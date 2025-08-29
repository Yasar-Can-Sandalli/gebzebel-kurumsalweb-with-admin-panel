import React, { useState, useEffect } from "react";
import axios from "axios";

interface Danisman {
    id: number;
    isimSoyisim: string;
    resimUrl: string;
    pozisyon: string;
    email?: string;
    telefon?: string;
    biyografi?: string;
    siraNo: number;
}

const BaskanDanismanlari: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [danismanlar, setDanismanlar] = useState<Danisman[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get<Danisman[]>("http://localhost:8080/api/kurumsal/baskandanismanlari");
                setDanismanlar(response.data);
                setError(null);
            } catch (err) {
                console.error("Başkan danışmanları verilerini alırken hata oluştu:", err);
                setError("Veriler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getImageUrl = (resimUrl: string): string => {
        if (!resimUrl) return "/api/placeholder/250/230";
        
        const imagePath = resimUrl.startsWith('/') ? resimUrl : `/${resimUrl}`;
        return imagePath;
    };

    // Hata durumu - Başkan sayfasıyla aynı tasarım
    if (error) {
        return (
            <div className="flex justify-content-center align-items-center min-h-screen p-4 bg-light">
                <div className="w-full max-w-2xl bg-white border-left border-danger rounded shadow-lg overflow-hidden">
                    <div className="p-4">
                        <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-8 w-8 text-danger" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h2 className="text-lg font-weight-bold text-dark">Hata</h2>
                                <p className="text-secondary">{error}</p>
                                <button
                                    className="mt-3 px-4 py-2 bg-danger text-white rounded hover:bg-danger"
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
    }

    // Yükleme durumu
    if (loading) {
        return (
            <div className="w-full max-w-4xl mx-auto my-4 px-4">
                <div className="bg-white rounded shadow-lg overflow-hidden">
                    <div className="animate-pulse">
                        <div className="h-48 bg-secondary w-full"></div>
                        <div className="p-4">
                            <div className="h-6 bg-secondary rounded w-50 mx-auto mb-4"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-secondary rounded"></div>
                                <div className="h-4 bg-secondary rounded"></div>
                                <div className="h-4 bg-secondary rounded"></div>
                                <div className="h-4 bg-secondary rounded w-75"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 shadow-inner min-h-screen p-10">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-xl shadow-md text-center py-4 mb-4">
                    <h1 className="text-2xl font-bold text-blue-900">BAŞKAN DANIŞMANLARI</h1>
                </div>

                <div className="space-y-6">
                    {danismanlar.length > 0 ? (
                        danismanlar.map((person) => (
                            <div key={person.id} className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex flex-col sm:flex-row gap-6">
                                    <div className="flex justify-center sm:justify-start">
                                        <img
                                            className="rounded-lg w-64 h-64 object-cover"
                                            src={getImageUrl(person.resimUrl)}
                                            alt={person.isimSoyisim}
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = "/api/placeholder/250/230";
                                            }}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold text-blue-900">{person.isimSoyisim}</h2>
                                        <p className="text-gray-600">Başkan Danışmanı</p>
                                        <hr className="my-3 border-gray-300" />

                                        {person.biyografi && (
                                            <div className="mb-4">
                                                <h3 className="text-md font-semibold mb-1">Biyografi</h3>
                                                <p className="text-gray-700 text-sm leading-relaxed">{person.biyografi}</p>
                                            </div>
                                        )}

                                        <div>
                                            <h3 className="text-md font-semibold mb-1">İletişim Bilgileri</h3>
                                            <p className="flex items-center text-gray-700 mb-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 mr-2 text-blue-700"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                    />
                                                </svg>
                                                <a href={`mailto:${person.email || 'info@gebze.bel.tr'}`} className="hover:text-blue-700 transition">
                                                    {person.email || 'info@gebze.bel.tr'}
                                                </a>
                                            </p>
                                            <p className="flex items-center text-gray-700">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 mr-2 text-blue-700"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                    />
                                                </svg>
                                                <a href={`tel:${(person.telefon || '0262 642 04 30').replace(/\s/g, "")}`} className="hover:text-blue-700 transition">
                                                    {person.telefon || '0262 642 04 30'}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-warning border-left-4 border-warning text-dark p-4 rounded shadow-md">
                            <p className="font-weight-bold">Uyarı</p>
                            <p>Danışman bilgisi bulunamadı</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BaskanDanismanlari;
