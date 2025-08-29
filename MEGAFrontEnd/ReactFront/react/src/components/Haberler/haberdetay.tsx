import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

// Son Haberler için örnek veri (API'den çekilebilir)
const mockSonHaberler = [
    {
        id: 1,
        baslik: "Gebze'de Yeni Park Alanı Hizmete Açıldı",
        gorsel: "/images/Haberler/habergörselleri/egitimvegenclik/egitim1.jpg",
    },
    {
        id: 2,
        baslik: "Spor Kompleksi Açılışı",
        gorsel: "/images/Haberler/habergörselleri/egitimvegenclik/egitim1-2.jpg",
    },
    {
        id: 3,
        baslik: "Çevre Temizlik Kampanyası",
        gorsel: "/images/Haberler/habergörselleri/cevretemizligeridönüsüm/cevre1.jpg",
    },
    {
        id: 4,
        baslik: "Gençlik Festivali Başladı",
        gorsel: "/images/Haberler/habergörselleri/egitimvegenclik/egitim2.jpg",
    },
    {
        id: 5,
        baslik: "Yeni Kütüphane Açıldı",
        gorsel: "/images/Haberler/habergörselleri/sosyalyardımvehizmetler/sosyal1.jpg",
    },
    {
        id: 6,
        baslik: "Gebze'de Sağlık Semineri Düzenlendi",
        gorsel: "/images/Haberler/habergörselleri/sosyalyardımvehizmetler/sosyal1.jpg",
    },
];

// Haber tipi tanımı
interface Haber {
    id: number;
    baslik: string;
    gorsel: string;
}

// SonHaberlerSlider: Alt alta 5 haber ve kayma efekti
const SonHaberlerSlider = ({ haberler, navigate }: { haberler: Haber[], navigate: any }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % haberler.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [haberler.length]);

    // 5'li pencere, sonsuz döngü
    const getVisibleHaberler = () => {
        const visible = [];
        for (let i = 0; i < 5; i++) {
            visible.push(haberler[(current + i) % haberler.length]);
        }
        return visible;
    };
    getVisibleHaberler();
    // Kayma efekti için her haberin yüksekliği (ör: 96px) ve gap (ör: 12px)
    const itemHeight = 96 + 12;
    const sliderHeight = 5 * itemHeight - 12;

    return (
        <div className="relative w-full flex flex-col items-center" style={{ minHeight: sliderHeight }}>
            <h2 className="text-xl font-bold text-gray-800 mb-6 mt-3 text-center">Son Haberler</h2>
            <div className="overflow-hidden w-full" style={{ height: sliderHeight }}>
                <div
                    className="flex flex-col gap-3 transition-transform duration-700 ease-in-out"
                    style={{
                        transform: `translateY(-${current * itemHeight}px)`
                    }}
                >
                    {haberler.concat(haberler).map((haber, idx) => (
                        <div
                            key={haber.id + "-" + idx}
                            className="flex items-center w-full bg-transparent rounded-lg p-3 transition-all duration-500 ease-in-out hover:bg-gray-50"
                            style={{
                                opacity: 1,
                                marginTop: idx === 0 ? "0.5rem" : "0",
                                minHeight: "96px"
                            }}
                        >
                            <img
                                src={haber.gorsel}
                                alt={haber.baslik}
                                className="w-14 h-14 object-cover rounded-lg mr-3 shadow sm:w-16 sm:h-16"
                            />
                            <div className="flex flex-col flex-1">
                                <span className="text-gray-700 font-medium text-sm sm:text-base line-clamp-2 mb-2">{haber.baslik}</span>
                                <button
                                    onClick={() => navigate(`/haberdetay/${haber.id}`)}
                                    className="flex items-center text-blue-600 hover:underline text-xs sm:text-sm mt-1 self-start"
                                >
                                    <svg className="w-3 h-3 mr-1 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="8" x2="12" y2="12" />
                                        <circle cx="12" cy="16" r="1" />
                                    </svg>
                                    Detaylı Bilgi
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Haber detay tipi tanımı
interface HaberDetayType {
    id: string | undefined;
    baslik: string;
    tarih: string;
    kategori: string;
    gorsel: string;
    icerik: string[];
}

// Detay kartı için örnek galeri görselleri
const detayGorseller = [
    "/images/Haberler/habergörselleri/egitimvegenclik/egitim1.jpg",
    "/images/Haberler/habergörselleri/egitimvegenclik/egitim1-2.jpg",
    "/images/Haberler/habergörselleri/cevretemizligeridönüsüm/cevre1.jpg",
    "/images/Haberler/habergörselleri/egitimvegenclik/egitim2.jpg",
    "/images/Haberler/habergörselleri/sosyalyardımvehizmetler/sosyal1.jpg",
    "/images/Haberler/habergörselleri/sosyalyardımvehizmetler/sosyal1-2.jpg",
    "/images/Haberler/habergörselleri/sosyalyardımvehizmetler/sosyal2.jpg",
    "/images/Haberler/habergörselleri/sosyalyardımvehizmetler/sosyal2-2.jpg",
    "/images/Haberler/habergörselleri/sosyalyardımvehizmetler/sosyal3.jpg",
    "/images/Haberler/habergörselleri/egitimvegenclik/egitim1.jpg",
    "/images/Haberler/habergörselleri/egitimvegenclik/egitim1-2.jpg",
    "/images/Haberler/habergörselleri/cevretemizligeridönüsüm/cevre1.jpg",
    "/images/Haberler/habergörselleri/egitimvegenclik/egitim2.jpg",
    "/images/Haberler/habergörselleri/sosyalyardımvehizmetler/sosyal1.jpg",
    "/images/Haberler/habergörselleri/sosyalyardımvehizmetler/sosyal1-2.jpg",
    "/images/Haberler/habergörselleri/sosyalyardımvehizmetler/sosyal2.jpg",
    "/images/Haberler/habergörselleri/sosyalyardımvehizmetler/sosyal2-2.jpg",
    "/images/Haberler/habergörselleri/sosyalyardımvehizmetler/sosyal3.jpg",

];

const HaberDetay = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    // Mock veri örneği
    const haber: HaberDetayType = {
        id,
        baslik: "Gebze'de Yeni Park Alanı Hizmete Açıldı",
        tarih: "26 Mayıs 2025",
        kategori: "Çevre ve Şehircilik",
        gorsel: "/images/Haberler/habergörselleri/egitimvegenclik/egitim1.jpg",
        icerik: [
            "Gebze Belediyesi, vatandaşların sosyal alan ihtiyacını karşılamak amacıyla yeni bir park alanını hizmete açtı.",
            "Parkta çocuk oyun alanları, yürüyüş yolları, spor aletleri ve yeşil alanlar bulunuyor.",
            "Belediye Başkanı yaptığı açıklamada, 'Gebze'yi daha yaşanabilir bir şehir haline getirmek için çalışmalarımıza devam ediyoruz.' dedi."
        ]
    };

    // Ana görsel seçimi
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Galeri slider ayarları - 5'li grup sonsuz döngü
    const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
    const itemsPerView = 5;
    const itemWidth = 165 + 4;

    // Responsive için item width ayarı
    const [responsiveItemWidth, setResponsiveItemWidth] = useState(itemWidth);

    useEffect(() => {
        const updateItemWidth = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth < 640) { // sm
                setResponsiveItemWidth(135 + 4);
            } else if (screenWidth < 768) { // md
                setResponsiveItemWidth(150 + 4);
            } else {
                setResponsiveItemWidth(165 + 4);
            }
        };

        updateItemWidth();
        window.addEventListener('resize', updateItemWidth);
        return () => window.removeEventListener('resize', updateItemWidth);
    }, []);

    // Eğer resim sayısı 5 veya daha az ise sadece orijinal görselleri göster
    const isShortGallery = detayGorseller.length <= itemsPerView;
    const galleryGorseller = isShortGallery ? detayGorseller : [...detayGorseller, ...detayGorseller, ...detayGorseller];
    const totalGroups = Math.ceil(detayGorseller.length / itemsPerView);
    const groupWidth = itemsPerView * responsiveItemWidth;

    // Otomatik 5'li grup kayması (sadece fazla resim varsa çalışsın)
    useEffect(() => {
        if (isShortGallery) return;
        if (detayGorseller.length <= itemsPerView) return;

        const interval = setInterval(() => {
            setCurrentGroupIndex(prev => {
                return (prev + 1) % totalGroups;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [totalGroups, itemsPerView, isShortGallery, detayGorseller.length]);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-4 px-4 sm:py-8">
            <div className="w-full max-w-7xl flex flex-col xl:flex-row gap-4 sm:gap-8 justify-center items-start">
                {/* Ana İçerik - Detay Kartı */}
                <div className="flex-1 w-full max-w-5xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 min-h-[600px] sm:min-h-[900px]">
                        <button
                            onClick={() => navigate(-1)}
                            className="mb-4 text-blue-600 hover:underline text-sm sm:text-base"
                        >
                            ← Geri Dön
                        </button>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">{haber.baslik}</h1>
                        <div className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 flex flex-wrap gap-2 sm:gap-4">
                            <span>📅 {haber.tarih}</span>
                            <span className="bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                                {haber.kategori}
                            </span>
                        </div>

                        {/* Ana görsel */}
                        <div className="w-full flex flex-col items-center mb-4 sm:mb-6">
                            <div className="relative w-full flex items-center justify-center">
                                <img
                                    src={detayGorseller[selectedIndex]}
                                    alt="Haber görseli"
                                    className="w-full max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] object-cover rounded-lg shadow-md"
                                />
                            </div>

                            {/* Galeri slider - 5'li grup sonsuz döngü */}
                            {detayGorseller.length > 1 && (
                                <div className="flex flex-col justify-center items-center mt-3 sm:mt-4 w-full">
                                    <div className="overflow-hidden w-full">
                                        <div
                                            className={`flex items-center gap-1 ${!isShortGallery ? "transition-transform duration-1000 ease-in-out" : ""}`}
                                            style={
                                                isShortGallery
                                                    ? {}
                                                    : {
                                                        transform: `translateX(-${currentGroupIndex * groupWidth}px)`,
                                                        width: `${galleryGorseller.length * responsiveItemWidth}px`
                                                    }
                                            }
                                        >
                                            {galleryGorseller.map((gorsel, idx) => {
                                                const originalIndex = idx % detayGorseller.length;
                                                // Eğer az resim varsa sadece orijinal resimleri göster
                                                if (isShortGallery && idx >= detayGorseller.length) return null;
                                                return (
                                                    <button
                                                        key={`${originalIndex}-${idx}`}
                                                        onClick={() => setSelectedIndex(originalIndex)}
                                                        className={`border-2 rounded-lg transition-all duration-200 flex-shrink-0 ${
                                                            selectedIndex === originalIndex ? 'border-blue-500' : 'border-transparent'
                                                        }`}
                                                        style={{
                                                            width: `${responsiveItemWidth - 4}px`,
                                                            height: "90px"
                                                        }}
                                                    >
                                                        <img
                                                            src={gorsel}
                                                            alt={`Galeri ${originalIndex + 1}`}
                                                            className="w-full h-full object-cover rounded-lg"
                                                        />
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Nokta göstergeleri sadece fazla resim varsa göster */}
                                    {!isShortGallery && (
                                        <div className="flex justify-center items-center mt-2 sm:mt-3 gap-2">
                                            {Array.from({ length: totalGroups }, (_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setCurrentGroupIndex(idx)}
                                                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                                        currentGroupIndex === idx
                                                            ? 'bg-blue-500 scale-125'
                                                            : 'bg-gray-300 hover:bg-gray-400'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="text-gray-700 leading-relaxed text-justify text-sm sm:text-base">
                            {haber.icerik.map((paragraf, index) => (
                                <p key={index} className="mb-3 sm:mb-4">{paragraf}</p>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sağ: Son Haberler Slider */}
                <div className="w-full xl:w-80 flex-shrink-0 flex flex-col gap-4 sm:gap-8">
                    <div className="bg-white rounded-2xl shadow-2xl p-3 sm:p-4 flex flex-col items-center">
                        <SonHaberlerSlider haberler={mockSonHaberler} navigate={navigate} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HaberDetay;
