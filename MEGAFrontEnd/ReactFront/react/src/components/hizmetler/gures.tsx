import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, Info, X, Mail } from 'lucide-react';
import axios from 'axios';

// Define types
interface Gures {
    id: number;
    baslik: string;
    imgUrl: string;
    telefon: string;
    konum: string;
    buttonDetay: string;
    buttonKonum: string;
    mail: string | null;
    detaylar?: string;
}

// Extract the card component for better organization
const GuresCard = ({ center }: { center: Gures }) => {
    const [showDetails, setShowDetails] = useState(false);
    const navigate = useNavigate();

    const handleDetailsClick = () => {
        if (center.buttonDetay) {
            navigate(center.buttonDetay);
        } else {
            setShowDetails(!showDetails);
        }
    };

    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            className="w-full bg-white border border-orange-200 shadow-lg rounded-xl overflow-hidden transition-all relative flex flex-col h-auto mb-8"
        >
            <div className="flex flex-col sm:flex-row">
                {/* Sol: Resim */}
                <div className="w-full sm:w-2/4 h-[300px]">
                    <img
                        src={center.imgUrl}
                        alt={center.baslik}
                        className="w-full h-full rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
                    />
                </div>

                {/* Sağ: İçerik */}
                <div className="w-full sm:w-3/5 p-5 flex flex-col justify-between">
                    <div>
                        <Link
                            to={center.buttonDetay}
                            className="text-base md:text-xl font-bold text-blue-500 border-b-2 border-blue-400 pb-1 block truncate"
                        >
                            {center.baslik}
                        </Link>

                        <div className="mt-4 space-y-3 text-sm sm:text-base">
                            <div className="flex items-start">
                                <MapPin className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <p className="line-clamp-2">{center.konum}</p>
                            </div>

                            <div className="flex items-center">
                                <Phone className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                                <p>{center.telefon}</p>
                            </div>

                            {center.mail && (
                                <div className="flex items-center">
                                    <Mail className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                                    <p>{center.mail}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-5">
                        <a
                            href={center.buttonKonum}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-sky-500 to-sky-700 text-white rounded-md hover:from-sky-600 hover:to-sky-800 transition-all shadow-md text-sm flex-1"
                        >
                            <MapPin className="w-5 h-5 mr-1.5" />
                            Konum
                        </a>

                        <button
                            onClick={handleDetailsClick}
                            className={`flex items-center justify-center px-4 py-2.5 rounded-md transition-all shadow-md text-sm flex-1 ${
                                showDetails
                                    ? "bg-gradient-to-r from-rose-400 to-pink-500 text-white hover:from-rose-500 hover:to-pink-600"
                                    : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700"
                            }`}
                        >
                            {showDetails ? (
                                <>
                                    <X className="w-5 h-5 mr-1.5" />
                                    Gizle
                                </>
                            ) : (
                                <>
                                    <Info className="w-5 h-5 mr-1.5" />
                                    Detaylı Bilgi
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Detay içeriği (eğer gösteriliyorsa) */}
            {showDetails && (
                <div className="bg-gray-100 p-5 border-t border-gray-300">
                    <p className="text-sm md:text-base text-gray-700">{center.detaylar}</p>
                </div>
            )}
        </motion.div>
    );
};

// Loading component
const LoadingState = () => (
    <div className="flex flex-col min-h-screen">
        <div className="flex flex-1 justify-center items-center">
            <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-150"></div>
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-300"></div>
                <span className="text-lg ml-2">Yükleniyor...</span>
            </div>
        </div>
    </div>
);

// Error component
const ErrorState = ({ message }: { message: string }) => (
    <div className="flex flex-col min-h-screen">
        <div className="flex flex-1 justify-center items-center">
            <div className="text-red-500 text-lg flex items-center">
                <X className="w-6 h-6 mr-2" />
                {message}
            </div>
        </div>
    </div>
);

// Main component
export default function GuresPage() {
    const [guresler, setGuresler] = useState<Gures[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGuresler = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8080/api/hizmetler/kategori/GURES');

                if (Array.isArray(response.data)) {
                    const formattedData = response.data.map((item: any) => ({
                        id: item.id,
                        baslik: item.baslik,
                        imgUrl: item.imgUrl,
                        telefon: item.telefon || "Belirtilmemiş",
                        konum: item.konum,
                        buttonDetay: item.buttonDetay,
                        buttonKonum: item.buttonKonum,
                        mail: item.mail,
                        detaylar: item.detaylar || "Detay bilgisi bulunmamaktadır."
                    }));

                    setGuresler(formattedData);
                } else {
                    throw new Error('Geçersiz veri formatı');
                }
            } catch (err) {
                console.error("API Hatası:", err);
                setError('Güreş hizmetleri yüklenirken bir hata oluştu');
            } finally {
                setLoading(false);
            }
        };

        fetchGuresler();
    }, []);

    if (loading) {
        return <LoadingState />;
    }

    if (error) {
        return <ErrorState message={error} />;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-1">
                {/* Ana İçerik Alanı */}
                <div className="flex-1 px-4 sm:px-6 pt-4 pb-20 w-full">
                    {/* Güreş Merkezleri */}
                    <section className="mb-10 sm:mb-20">
                        <div className="mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="bg-blue-500 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl mb-6"
                            >
                                <div className="text-xl sm:text-2xl font-semibold text-white text-center">
                                    GELENEKSEL HÜNKAR ÇAYIRI YAĞLI GÜREŞLERİ
                                </div>
                            </motion.div>

                            {guresler.length === 0 ? (
                                <div className="text-center text-gray-500 p-6 sm:p-10">
                                    <Info className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                                    Herhangi bir güreş hizmeti bulunamadı.
                                </div>
                            ) : (
                                /* Kartlar */
                                <div className="flex flex-col items-center w-full">
                                    {guresler.map((center) => (
                                        <GuresCard key={center.id} center={center} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}