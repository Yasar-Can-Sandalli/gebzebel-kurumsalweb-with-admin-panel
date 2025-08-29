import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

const Genclik: React.FC = () => {
    const [data, setData] = useState<GeriDonusumDetayDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:8080/api/hizmetler/geridonusum/3");
                if (!response.ok) {
                    throw new Error('Veri getirilemedi');
                }
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

    if (loading) return <div>Yükleniyor...</div>;
    if (error) return <div>Hata: {error}</div>;
    if (!data) return <div>Veri bulunamadı</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col items-center px-4 py-6 space-y-4"
        >
            <div className="relative bg-white rounded-xl shadow-lg w-full max-w-[950px] p-4 space-y-4">
                <div className="bg-blue-500 rounded-xl shadow-lg w-full py-4 px-6 mb-2">
                    <div className="text-2xl md:text-3xl font-semibold text-white text-center">
                        {data.baslik}
                    </div>
                </div>
                <br/>
                <div className="relative flex justify-center w-full mb-2">
                    <div className="w-full max-w-[850px] rounded-xl overflow-hidden">
                        <img
                            src={data.resim1}
                            alt={data.baslik}
                            className="w-full h-auto max-h-[440px] object-cover"
                        />
                    </div>
                </div>
                <br/>
                <div className="flex flex-col gap-4">
                    <section className="text-justify space-y-4">
                        <h3 className="text-lg font-semibold text-blue-700">{data.buttonIcerik}</h3>
                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                            {data.detay}
                        </p>
                    </section>

                    <div className="w-full">
                        <div className="bg-blue-50 rounded-lg p-4 shadow-sm">
                            <h3 className="text-xl font-semibold text-blue-800 mb-4">İletişim Bilgileri</h3>
                            <div className="space-y-3">
                                {data.konum && (
                                    <div className="flex items-start">
                                        <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                                        <p className="text-gray-700 text-sm">{data.konum}</p>
                                    </div>
                                )}
                                {data.telefon && (
                                    <div className="flex items-center">
                                        <Phone className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                                        <p className="text-gray-700 text-sm">{data.telefon}</p>
                                    </div>
                                )}
                                {data.mail && (
                                    <div className="flex items-center">
                                        <Mail className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                                        <p className="text-gray-700 text-sm">{data.mail}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Genclik;