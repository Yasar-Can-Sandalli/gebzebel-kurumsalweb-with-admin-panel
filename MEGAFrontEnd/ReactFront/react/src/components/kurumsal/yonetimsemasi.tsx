import { useState, useEffect } from 'react';
import axios from 'axios';

interface Mudurluk {
    ad: string;
    mudur: string;
}

interface Yonetici {
    id: number;
    isimSoyisim: string;
    resimUrl: string;
    pozisyon: string;
    siraNo: number;
    mudurlukler: string; // JSON formatında
}

interface YonetimSemasi {
    baskan: Yonetici[];
    baskanYardimcilari: Yonetici[];
}

const ManagementChart = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [yonetimSemasi, setYonetimSemasi] = useState<YonetimSemasi | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get<YonetimSemasi>("http://localhost:8080/api/kurumsal/yonetimsemasi");
                setYonetimSemasi(response.data);
                setError(null);
            } catch (err) {
                setError('Veriler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const parseMudurlukler = (mudurluklerJson: string): Mudurluk[] => {
        try {
            if (!mudurluklerJson) return [];
            const temizJson = mudurluklerJson.replace(/\s+/g, ' ').trim();
            return JSON.parse(temizJson);
        } catch {
            return [];
        }
    };

    // Belediye meclisi sayfasındaki gibi doğrudan resim URL kullanımı
    const getImageUrl = (resimUrl: string): string => {
        if (!resimUrl) return "/api/placeholder/250/230";
        
        // Veri tabanından gelen URL'lerden backend kısmını kaldır
        // Örnek: /images/kurumsal/belediyemeclisi/zinnurbuyukgoz.jpg -> /images/kurumsal/belediyemeclisi/zinnurbuyukgoz.jpg
        const imagePath = resimUrl.startsWith('/') ? resimUrl : `/${resimUrl}`;
        
        // Public klasöründeki resmi kullan
        return imagePath;
    };

    const renderYoneticiCard = (yonetici: Yonetici) => {
        const mudurlukler = parseMudurlukler(yonetici.mudurlukler);

        return (
            <div key={yonetici.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Image */}
                        <div className="w-full md:w-48 lg:w-64 flex-shrink-0">
                            <div className="relative pb-[125%]">
                                <img
                                    className="absolute h-full w-full object-cover rounded-lg"
                                    src={getImageUrl(yonetici.resimUrl)}
                                    alt={yonetici.isimSoyisim}
                                    onError={(e) => {
                                        // Meclis sayfasıyla aynı şekilde hata durumunda placeholder göster
                                        (e.target as HTMLImageElement).src = "/api/placeholder/250/230";
                                    }}
                                />
                            </div>
                        </div>
                        {/* Details */}
                        <div className="flex-1">
                            <h2 className="text-xl md:text-2xl font-bold text-blue-900">{yonetici.isimSoyisim}</h2>
                            <p className="text-gray-600">{yonetici.pozisyon}</p>
                            <hr className="my-3 border-gray-200" />
                            <h3 className="text-gray-600 font-semibold mb-3 text-center">İlgili Müdürlükler</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {mudurlukler && mudurlukler.length > 0 ? (
                                    mudurlukler.map((mudurluk, index) => (
                                        <div key={index} className="bg-blue-800 hover:bg-blue-900 text-white p-3 rounded-lg shadow transition-colors">
                                            <p className="font-medium">{mudurluk.ad}</p>
                                            <p className="text-sm">{mudurluk.mudur}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full text-center text-gray-500">
                                        Bağlı müdürlük bulunamadı
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Hata durumu - Misyon sayfası ile aynı tasarım
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
        <div id="pcoded" className="pcoded">
            <div className="pcoded-container navbar-wrapper bg-transparent">
                <div className="pcoded-main-container">
                    <div className="pcoded-wrapper">
                        <div className="pcoded-content">
                            <div className="pcoded-inner-content">
                                <div className="main-body">
                                    <div className="page-wrapper">
                                        <div className="flex justify-center">
                                            <div className="w-full max-w-6xl px-4">
                                                {/* Header */}
                                                <div className="shadow p-4 bg-white rounded-xl text-center mt-4 mb-6">
                                                    <h1 className="text-xl md:text-3xl font-bold">YÖNETİM ŞEMASI</h1>
                                                </div>

                                                {/* Content */}
                                                <div className="space-y-6">
                                                    {/* Başkan */}
                                                    {yonetimSemasi?.baskan && yonetimSemasi.baskan.length > 0 ? (
                                                        yonetimSemasi.baskan.map(baskan => renderYoneticiCard(baskan))
                                                    ) : (
                                                        <div className="bg-warning border-left-4 border-warning text-dark p-4 rounded shadow-md">
                                                            <p className="font-weight-bold">Uyarı</p>
                                                            <p>Başkan bilgisi bulunamadı</p>
                                                        </div>
                                                    )}
                                                    
                                                    {/* Başkan Yardımcıları */}
                                                    {yonetimSemasi?.baskanYardimcilari && yonetimSemasi.baskanYardimcilari.length > 0 ? (
                                                        yonetimSemasi.baskanYardimcilari.map(yardimci => renderYoneticiCard(yardimci))
                                                    ) : (
                                                        <div className="bg-warning border-left-4 border-warning text-dark p-4 rounded shadow-md">
                                                            <p className="font-weight-bold">Uyarı</p>
                                                            <p>Başkan yardımcısı bilgisi bulunamadı</p>
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
    );
};

export default ManagementChart;
