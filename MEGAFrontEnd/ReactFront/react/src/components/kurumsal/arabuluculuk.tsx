import { useState, useEffect } from "react";

interface KomisyonUye {
    id: number;
    ad: string;
    unvan: string;
    gorev: string;
    imgUrl?: string;
    tip?: string;
    ilke?: string | null;
}

const Arabuluculuk = () => {
    const [asilUyeler, setAsilUyeler] = useState<KomisyonUye[]>([]);
    const [yedekUyeler, setYedekUyeler] = useState<KomisyonUye[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        fetch("http://localhost:8080/api/kurumsal/arabuluculuk")
            .then(res => {
                if (!res.ok) throw new Error(`API hatası: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    // Sadece tip 'arabuluculuk' olanları al
                    const gecerliUyeler = data.filter(
                        (uye) => uye && uye.tip === 'arabuluculuk'
                    );
                    setAsilUyeler(
                        gecerliUyeler.filter(
                            (uye) => (uye.gorev || "").toLowerCase().includes("asıl")
                        )
                    );
                    setYedekUyeler(
                        gecerliUyeler.filter(
                            (uye) => (uye.gorev || "").toLowerCase().includes("yedek")
                        )
                    );
                } else {
                    setError("Veri formatı uygun değil");
                }
                setIsLoading(false);
            })
            .catch((err) => {
                setError("Arabuluculuk komisyonu verileri yüklenirken hata oluştu: " + err.message);
                setIsLoading(false);
            });
    }, []);

    if (error) return (
        <div className="flex justify-center items-center min-h-screen p-4 bg-light">
            <div className="w-full max-w-2xl bg-white border-left border-danger rounded shadow-lg overflow-hidden">
                <div className="p-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-8 w-8 text-danger" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h2 className="text-lg font-bold text-dark">Hata</h2>
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

    if (isLoading) return (
        <div className="w-full max-w-4xl mx-auto my-4 px-4">
            <div className="bg-white rounded shadow-lg overflow-hidden p-4">
                <div className="animate-pulse">
                    <div className="h-8 bg-secondary rounded w-1/4 mb-6"></div>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="h-20 bg-secondary rounded"></div>
                                <div className="h-20 bg-secondary rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row">
                <div className="flex-1">
                    <div className="bg-white shadow-lg rounded-lg p-4 md:p-6">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Arabuluculuk Komisyonu</h2>
                        <h3 className="text-lg font-semibold text-gray-700 mt-4">Asıl Üyeler</h3>
                        <div className="overflow-x-auto mt-2">
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                <tr className="bg-blue-600 text-white">
                                    <th className="border border-gray-300 p-2 text-left">Adı Soyadı</th>
                                    <th className="border border-gray-300 p-2 text-left">Ünvanı</th>
                                </tr>
                                </thead>
                                <tbody>
                                {asilUyeler.length > 0 ? (
                                    asilUyeler.map((uye) => (
                                        <tr key={uye.id}>
                                            <td className="border border-gray-300 p-2 bg-white">{uye.ad}</td>
                                            <td className="border border-gray-300 p-2 bg-white">{uye.unvan}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={2} className="border border-gray-300 p-2 bg-white text-center">
                                            Asıl üye bulunamadı
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mt-6">Yedek Üyeler</h3>
                        <div className="overflow-x-auto mt-2">
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                <tr className="bg-blue-600 text-white">
                                    <th className="border border-gray-300 p-2 text-left">Adı Soyadı</th>
                                    <th className="border border-gray-300 p-2 text-left">Ünvanı</th>
                                </tr>
                                </thead>
                                <tbody>
                                {yedekUyeler.length > 0 ? (
                                    yedekUyeler.map((uye) => (
                                        <tr key={uye.id}>
                                            <td className="border border-gray-300 p-2 bg-white">{uye.ad}</td>
                                            <td className="border border-gray-300 p-2 bg-white">{uye.unvan}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={2} className="border border-gray-300 p-2 bg-white text-center">
                                            Yedek üye bulunamadı
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
                            <p>Asıl üye sayısı: {asilUyeler.length}</p>
                            <p>Yedek üye sayısı: {yedekUyeler.length}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Arabuluculuk;

