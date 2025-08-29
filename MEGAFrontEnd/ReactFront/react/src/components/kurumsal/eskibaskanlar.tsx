import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface FormerMayor {
    id: number;
    isimSoyisim: string;
    resimUrl: string;
    gorev: string;
    siraNo: number;
}

const FormerMayors: React.FC = () => {
    const [formerMayors, setFormerMayors] = useState<FormerMayor[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        fetch("http://localhost:8080/api/kurumsal/eskibaskanlar")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // API artık sadece eski başkanları döndürecektir
                setFormerMayors(data);
                setIsLoading(false);
                
                console.log("Eski Başkanlar Verileri:", data);
            })
            .catch(err => {
                console.error("Eski başkanlar verileri yüklenirken hata oluştu:", err);
                setError("Veriler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
                setIsLoading(false);
            });
    }, []);

    // Person card component
    const PersonCard: React.FC<{ person: FormerMayor }> = ({ person }) => {
        return (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-xs mb-5">
                <div className="text-center">
                    <div className="relative">
                        <img
                            src={person.resimUrl}
                            alt={person.isimSoyisim}
                            className="w-full h-64 lg:h-[20vw] object-cover"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/api/placeholder/250/230";
                            }}
                        />
                    </div>
                    <div className="p-4">
                        <h4 className="text-lg font-medium text-gray-800">{person.isimSoyisim}</h4>
                        {/* Görev bilgisi kaldırıldı */}
                    </div>
                </div>
            </div>
        );
    };

    // Yükleme durumu
    if (isLoading) {
        return (
            <div className="min-h-screen bg-white p-4 flex justify-center items-center">
                <div className="animate-pulse text-center">
                    <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                        {Array(12).fill(0).map((_, index) => (
                            <div key={index} className="bg-gray-300 h-48 rounded-lg"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Hata durumu - Baskan sayfasıyla aynı tasarım
    if (error && formerMayors.length === 0) {
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

    return (
        <div id="pcoded" className="pcoded">
            <div className="pcoded-container navbar-wrapper">
                <div className="pcoded-main-container">
                    <div className="pcoded-wrapper">
                        <div className="pcoded-content">
                            <div className="pcoded-inner-content">
                                <div className="main-body">
                                    <div className="page-wrapper">
                                        <div className="flex flex-col gap-4 p-4">

                                            {/* Header */}
                                            <motion.div
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6 }}
                                                className="mb-8 text-center"
                                            >
                                                <div className="text-4xl text-white font-bold px-5 py-3 rounded-2xl" style={{ background: 'linear-gradient(180deg, #003366 0%, #00264d 100%)' }}>
                                                    ESKİ BELEDİYE BAŞKANLARI
                                                </div>
                                                <br/> <br/>
                                            </motion.div>

                                            {/* Content in box with shadow */}
                                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                                    {formerMayors.map((mayor) => (
                                                        <PersonCard key={mayor.id} person={mayor} />
                                                    ))}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormerMayors;

