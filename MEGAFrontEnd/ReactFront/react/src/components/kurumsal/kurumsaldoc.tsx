import { useState, useEffect } from "react";
import { FileText } from "lucide-react";

// API'den gelen veri yapısı
interface KurumsalDoc {
    id: number;
    baslik: string;
    dosyaUrl: string;
    tarih: string;
    aktif: number;
    kategori: string;
}

const KurumsalDoc = () => {
    const [docs, setDocs] = useState<KurumsalDoc[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        fetch("http://localhost:8080/api/kurumsal/kurumsal-doc")
            .then((response) => {
                if (!response.ok) throw new Error("Sunucu hatası");
                return response.json();
            })
            .then((data) => {
                setDocs(data);
                setIsLoading(false);
            })
            .catch(() => {
                setError("Kurumsal dokümanlar yüklenirken hata oluştu.");
                setIsLoading(false);
            });
    }, []);

    const formatTarih = (tarihStr: string) => {
        const tarih = new Date(tarihStr);
        return new Intl.DateTimeFormat('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(tarih);
    };

    if (error) return (
        <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
            <div className="w-full max-w-2xl bg-white border-l-4 border-red-500 rounded shadow-lg overflow-hidden">
                <div className="p-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-8 w-8 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h2 className="text-lg font-bold text-gray-900">Hata</h2>
                            <p className="text-gray-600">{error}</p>
                            <button
                                className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
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

    if (isLoading) return (
        <div className="w-full max-w-7xl mx-auto my-4 px-2">
            <div className="bg-white rounded shadow-lg overflow-hidden p-4">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="h-20 bg-gray-300 rounded"></div>
                                <div className="h-20 bg-gray-300 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div
            id="kurumsaldoc"
            style={{ minHeight: '100vh' }}
            className="opacity-0 animate-[fadeIn_0.8s_ease-in_forwards] -mt-4"
        >
            <div className="pcoded-overlay-box"></div>
            <div className="pcoded-container navbar-wrapper">
                <div className="pcoded-main-container-left">
                    <div className="pcoded-wrapper">
                        <div className="pcoded-content">
                            <div className="pcoded-inner-content">
                                <div className="main-body">
                                    <div className="page-wrapper">
                                        <div className="flex flex-col lg:flex-row justify-center items-start mt-0 p-1 md:p-2">
                                            <div className="w-full lg:w-11/12">
                                                <div className="bg-white shadow rounded-2xl p-5 transform translate-y-0 opacity-0 animate-[slideUp_0.6s_ease-out_0.1s_forwards]">
                                                    <div className="flex border-b mb-4 overflow-x-auto">
                                                        <span className="whitespace-nowrap px-6 py-3 font-bold text-sm md:text-base border-b-2 border-blue-600 text-blue-600 shadow-sm rounded-t-xl">
                                                            Kurumsal Dokümanlar
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                                                        {docs.length > 0 ? (
                                                            docs.map((doc, index) => (
                                                                <div
                                                                    key={doc.id}
                                                                    className="bg-blue-50 p-4 rounded-xl transition-all duration-300 flex flex-col items-center shadow-md border border-blue-100 h-full hover:scale-105 hover:shadow-lg hover:bg-blue-100 opacity-0 animate-[fadeInUp_0.5s_ease-out_forwards]"
                                                                    style={{ animationDelay: `${index * 0.1}s` }}
                                                                >
                                                                    <div className="flex items-center justify-center mb-3 transition-transform duration-300 hover:scale-110 hover:rotate-12">
                                                                        <FileText className="text-red-500 w-16 h-16" />
                                                                    </div>

                                                                    <a
                                                                        href={doc.dosyaUrl}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-blue-700 font-semibold text-center text-sm md:text-base break-words hover:underline mt-2 transition-colors duration-200"
                                                                    >
                                                                        {doc.baslik}
                                                                    </a>
                                                                    <div className="text-gray-600 text-sm mt-2">
                                                                        {formatTarih(doc.tarih)}
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="col-span-full text-center p-8 bg-blue-50 rounded-xl shadow-sm opacity-0 animate-[fadeIn_0.5s_ease-in_0.2s_forwards]">
                                                                <p className="text-blue-700 font-semibold">Veri bulunamadı.</p>
                                                            </div>
                                                        )}
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

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default KurumsalDoc;