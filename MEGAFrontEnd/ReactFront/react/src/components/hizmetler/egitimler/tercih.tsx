import React, { useEffect, useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

interface GeriDonusumDetayDTO {
    id: number;
    resim1: string;
    baslik: string;
    detay: string;
    konum: string;
    telefon: string;
    mail: string;
    buttonIcerik: string;
    kategori: string;
}

const Tercih: React.FC = () => {
    const [data, setData] = useState<GeriDonusumDetayDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:8080/api/hizmetler/geridonusum/7");
                if (!response.ok) throw new Error('Veri getirilemedi');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Veri yükleme hatası:", error);
                setError("Veri yüklenirken bir hata oluştu");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if (error) return (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 m-4 rounded">
            <div className="flex">
                <div className="ml-3">
                    <p className="text-sm text-red-700">Hata: {error}</p>
                </div>
            </div>
        </div>
    );

    if (!data) return (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 m-4 rounded">
            <p className="text-sm text-yellow-700">Veri bulunamadı</p>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col items-center px-4 py-6 space-y-4 animate-fadeIn">
            <div className="relative bg-white rounded-xl shadow-lg w-full max-w-4xl p-4 space-y-4">
                <div className="bg-blue-500 rounded-xl shadow-md w-full py-4 px-6 mb-2">
                    <h1 className="text-2xl md:text-3xl font-semibold text-white text-center">
                        {data.baslik}
                    </h1>
                </div>

                <div className="relative flex justify-center w-full my-4">
                    <div className="w-full rounded-xl overflow-hidden shadow-md">
                        {data.resim1 && (
                            <img
                                src={data.resim1}
                                alt={data.baslik}
                                className="w-full h-auto max-h-96 "
                                loading="lazy"
                            />
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <section className="text-justify space-y-4">

                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {data.detay}
                        </p>
                        <div className="mt-6">
                            <a
                                href={data.buttonIcerik}
                                className="font-semibold inline-block text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md transition-all shadow-md"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Kayıt Linki
                            </a>
                        </div>
                    </section>

                    <div className="w-full mt-4">
                        <div className="bg-blue-50 rounded-lg p-6 shadow-md">
                            <h3 className="text-xl font-semibold text-blue-800 mb-4">İletişim Bilgileri</h3>
                            <div className="space-y-4">
                                {data.konum && (
                                    <div className="flex items-start">
                                        <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                                        <p className="text-gray-700">{data.konum}</p>
                                    </div>
                                )}
                                {data.telefon && (
                                    <div className="flex items-center">
                                        <Phone className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                                        <a
                                            href={`tel:${data.telefon.replace(/\s+/g, '')}`}
                                            className="text-gray-700 hover:text-blue-600 transition-colors"
                                        >
                                            {data.telefon}
                                        </a>
                                    </div>
                                )}
                                {data.mail && (
                                    <div className="flex items-center">
                                        <Mail className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                                        <a
                                            href={`mailto:${data.mail}`}
                                            className="text-gray-700 hover:text-blue-600 transition-colors"
                                        >
                                            {data.mail}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tercih;