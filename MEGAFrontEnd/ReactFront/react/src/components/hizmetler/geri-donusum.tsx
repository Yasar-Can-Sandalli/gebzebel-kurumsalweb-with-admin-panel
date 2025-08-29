import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface GeriDonusum {
    id: number;
    baslik: string;
    imgUrl: string;
    metin: string;
    telefon: string;
    mail: string;
    buttonDetay: string;
    buttonKonum: string;
    icon: string;
}

const GeriDonusumPage = () => {
    const [activeButtons, setActiveButtons] = useState<Record<number, string>>({});
    const [geriDonusumler, setGeriDonusumler] = useState<GeriDonusum[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGeriDonusum = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8080/api/geri-donusum', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });

                console.log('API Yanıtı:', response.data);

                if (Array.isArray(response.data)) {
                    setGeriDonusumler(response.data);
                } else {
                    throw new Error('API yanıtı geçersiz format');
                }
            } catch (err: any) {
                console.error("API Hatası:", err.message);
                setError(`Veri yüklenirken hata: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchGeriDonusum();
    }, []);

    const handleActionClick = (cardIndex: number, buttonType: string, detailPage: string, mapLink: string) => {
        setActiveButtons({ [cardIndex]: buttonType });

        if (buttonType === "detayli") {
            navigate(`/${detailPage}`);
        } else if (buttonType === "konum") {
            window.open(mapLink, "_blank");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-green-50 flex items-center justify-center">
                <div className="text-2xl text-green-800">Yükleniyor...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-green-50 flex items-center justify-center">
                <div className="text-2xl text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-green-50 text-gray-800 font-sans py-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <header className="bg-green-100 rounded-2xl shadow-md mb-8">
                    <div className="px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                        <div className="text-5xl sm:text-6xl">♻️</div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-green-800 mb-3">
                                Geri Dönüşüm Noktaları
                            </h1>
                            <div className="bg-white border-l-4 border-green-600 p-3 rounded shadow text-sm sm:text-base text-gray-700 max-w-2xl">
                                Atıkların doğru yere atılması, temiz bir gelecek için atılmış büyük bir adımdır. Buradan hangi atığı nereye bırakabileceğinizi öğrenebilirsiniz.
                            </div>
                        </div>
                    </div>
                </header>

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {geriDonusumler.map((item, index) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full transform hover:-translate-y-1 hover:scale-[1.01] transition-transform"
                        >
                            <div className="relative">
                                <img
                                    src={item.imgUrl}
                                    alt={item.baslik}
                                    className="w-full h-52 "
                                />
                                <div className="absolute top-0 right-0 bg-green-100 text-green-800 p-2 rounded-bl-lg text-xl">
                                    {item.icon}
                                </div>
                            </div>

                            <div className="p-5 flex-grow flex flex-col">
                                <h2 className="text-xl font-semibold text-green-900 mb-3 line-clamp-2">
                                    {item.baslik}
                                </h2>
                                <p className="text-gray-700 mb-4 text-sm flex-grow">
                                    {item.metin}
                                </p>

                                <div className="mt-auto">
                                    <div className="grid grid-cols-2 gap-3 mb-3">
                                        <button
                                            onClick={() => handleActionClick(index, "detayli", item.buttonDetay, item.buttonKonum)}
                                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center justify-center ${
                                                activeButtons[index] === "detayli"
                                                    ? "bg-green-700 text-white"
                                                    : "bg-green-50 text-green-800 border border-green-300 hover:bg-green-100"
                                            }`}
                                        >
                                            <span>ℹ️ Hakkında</span>
                                        </button>
                                        <button
                                            onClick={() => handleActionClick(index, "konum", item.buttonDetay, item.buttonKonum)}
                                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center justify-center ${
                                                activeButtons[index] === "konum"
                                                    ? "bg-green-700 text-white"
                                                    : "bg-green-50 text-green-800 border border-green-300 hover:bg-green-100"
                                            }`}
                                        >
                                            <span>🚩 Konum</span>
                                        </button>
                                    </div>

                                    <div className="flex justify-between items-center border-t border-gray-100 pt-3 text-xs text-gray-500">
                                        <div className="flex items-center">
                                            <span className="mr-1">📞</span>
                                            <span>{item.telefon}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="mr-1">📩</span>
                                            <span>{item.mail}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GeriDonusumPage;