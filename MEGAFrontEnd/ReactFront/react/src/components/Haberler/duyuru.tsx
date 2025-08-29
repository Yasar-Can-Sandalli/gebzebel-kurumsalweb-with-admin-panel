import React, { useState, useEffect } from 'react';
import { Search, ChevronRight, Megaphone, CalendarDays, Eye, ChevronLeft } from 'lucide-react';
// framer-motion ekle
import { AnimatePresence, motion } from 'framer-motion';


interface Duyuru {
    id: number;
    baslik: string;
    ozet: string;
    tarih: string;
    kategori: string;
    okunmaSayisi: number;
    onemli: boolean;
    link?: string;
}

const DuyurularSayfasi: React.FC = () => {
    const [aramaMetni, setAramaMetni] = useState('');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const duyuruPerPage = 6;
    const maxPages = 5;

    // Slider state for güncel duyurular
    const [sliderCurrentIndex, setSliderCurrentIndex] = useState(0);
    const cardsPerView = 3; // Her seferinde gösterilecek kart sayısı

    // useEffect içindeki kategori bağımlılığı kaldırıldı
    useEffect(() => {
        setCurrentPage(1);
    }, [aramaMetni]);

    const duyurular: Duyuru[] = [
        {
            id: 1,
            baslik: "Gebze'de Yeni Park Alanları Açılıyor",
            ozet: "Şehrimizin çeşitli bölgelerinde yeni park ve yeşil alanlar vatandaşlarımızın hizmetine sunuluyor.",
            tarih: "2024-05-20",
            kategori: "Çevre",
            okunmaSayisi: 1250,
            onemli: true,

        },
        {
            id: 2,
            baslik: "Belediye Meclis Toplantısı Duyurusu",
            ozet: "Mayıs ayı olağan meclis toplantısı 25 Mayıs Cumartesi günü saat 14:00'da yapılacaktır.",
            tarih: "2024-05-18",
            kategori: "Toplantı",
            okunmaSayisi: 890,
            onemli: false
        },
        {
            id: 3,
            baslik: "Sosyal Yardım Başvuruları Başladı",
            ozet: "2024 yılı sosyal yardım başvuruları için gerekli belgeler ve başvuru koşulları açıklandı.",
            tarih: "2024-05-15",
            kategori: "Sosyal Hizmetler",
            okunmaSayisi: 2340,
            onemli: true
        },
        {
            id: 4,
            baslik: "Kültür Merkezi Etkinlik Programı",
            ozet: "Haziran ayında gerçekleştirilecek kültürel etkinlikler ve konser programı duyuruldu.",
            tarih: "2024-05-12",
            kategori: "Kültür",
            okunmaSayisi: 675,
            onemli: false
        },
        {
            id: 5,
            baslik: "Yol Bakım ve Onarım Çalışmaları",
            ozet: "Şehrin ana arterlerinde başlayacak asfalt ve bakım çalışmaları hakkında bilgilendirme.",
            tarih: "2024-05-10",
            kategori: "Ulaşım",
            okunmaSayisi: 1890,
            onemli: false
        },
        {
            id: 6,
            baslik: "Çevre Temizlik Kampanyası",
            ozet: "Vatandaşlarımız ile birlikte gerçekleştireceğimiz büyük çevre temizlik kampanyası başlıyor.",
            tarih: "2024-05-08",
            kategori: "Çevre",
            okunmaSayisi: 1456,
            onemli: true
        },
        {
            id: 7,
            baslik: "Yol Bakım ve Onarım Çalışmaları",
            ozet: "Şehrin ana arterlerinde başlayacak asfalt ve bakım çalışmaları hakkında bilgilendirme.",
            tarih: "2024-05-10",
            kategori: "Ulaşım",
            okunmaSayisi: 1890,
            onemli: false
        },
        {
            id: 8,
            baslik: "Yol Bakım ve Onarım Çalışmaları",
            ozet: "Şehrin ana arterlerinde başlayacak asfalt ve bakım çalışmaları hakkında bilgilendirme.",
            tarih: "2024-05-10",
            kategori: "Ulaşım",
            okunmaSayisi: 1890,
            onemli: false
        },
        {
            id: 9,
            baslik: "Yol Bakım ve Onarım Çalışmaları",
            ozet: "Şehrin ana arterlerinde başlayacak asfalt ve bakım çalışmaları hakkında bilgilendirme.",
            tarih: "2024-05-10",
            kategori: "Ulaşım",
            okunmaSayisi: 1890,
            onemli: false
        },
        {
            id: 10,
            baslik: "Yol Bakım ve Onarım Çalışmaları",
            ozet: "Şehrin ana arterlerinde başlayacak asfalt ve bakım çalışmaları hakkında bilgilendirme.",
            tarih: "2024-05-10",
            kategori: "Ulaşım",
            okunmaSayisi: 1890,
            onemli: false
        },
        {
            id: 11,
            baslik: "Yol Bakım ve Onarım Çalışmaları",
            ozet: "Şehrin ana arterlerinde başlayacak asfalt ve bakım çalışmaları hakkında bilgilendirme.",
            tarih: "2024-05-10",
            kategori: "Ulaşım",
            okunmaSayisi: 1890,
            onemli: false
        },
        {
            id: 11,
            baslik: "Yol Bakım ve Onarım Çalışmaları",
            ozet: "Şehrin ana arterlerinde başlayacak asfalt ve bakım çalışmaları hakkında bilgilendirme.",
            tarih: "2024-05-10",
            kategori: "Ulaşım",
            okunmaSayisi: 1890,
            onemli: false
        },
        {
            id: 11,
            baslik: "Yol Bakım ve Onarım Çalışmaları",
            ozet: "Şehrin ana arterlerinde başlayacak asfalt ve bakım çalışmaları hakkında bilgilendirme.",
            tarih: "2024-05-10",
            kategori: "Ulaşım",
            okunmaSayisi: 1890,
            onemli: false
        },
        {
            id: 11,
            baslik: "Yol Bakım ve Onarım Çalışmaları",
            ozet: "Şehrin ana arterlerinde başlayacak asfalt ve bakım çalışmaları hakkında bilgilendirme.",
            tarih: "2024-05-10",
            kategori: "Ulaşım",
            okunmaSayisi: 1890,
            onemli: false
        },

    ];

    // Sadece arama filtresi
    const filtrelenmisDuyurular = duyurular.filter(duyuru => {
        return duyuru.baslik.toLowerCase().includes(aramaMetni.toLowerCase()) ||
            duyuru.ozet.toLowerCase().includes(aramaMetni.toLowerCase());
    });

    // Pagination hesaplamaları (önemli olmayanlar için)
    const tumDuyurular = filtrelenmisDuyurular.filter(d => !d.onemli);
    const totalPages = Math.min(
        Math.ceil(tumDuyurular.length / duyuruPerPage),
        maxPages
    );
    const paginatedDuyurular = tumDuyurular.slice(
        (currentPage - 1) * duyuruPerPage,
        currentPage * duyuruPerPage
    );

    // Güncel duyurular slider fonksiyonları
    const guncelDuyurular = filtrelenmisDuyurular.filter(d => d.onemli);

    const nextSlide = () => {
        setSliderCurrentIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;
            // Sonsuz döngü: son karttan sonra başa dön
            return nextIndex >= guncelDuyurular.length ? 0 : nextIndex;
        });
    };

    const prevSlide = () => {
        setSliderCurrentIndex((prevIndex) => {
            const prevIdx = prevIndex - 1;
            // Sonsuz döngü: ilk karttan önce sona git
            return prevIdx < 0 ? guncelDuyurular.length - 1 : prevIdx;
        });
    };

    // Görünür kartları hesapla
    const getVisibleCards = () => {
        const cards = [];
        for (let i = 0; i < cardsPerView; i++) {
            const index = (sliderCurrentIndex + i) % guncelDuyurular.length;
            cards.push(guncelDuyurular[index]);
        }
        return cards;
    };

    const formatTarih = (tarih: string) => {
        return new Date(tarih).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };



    return (
        <div className="min-h-screen bg-gray-50">
            {/* Geri Dön Butonu kaldırıldı */}
            {/* Header Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                            <Megaphone className="w-6 h-6 text-blue-600" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Duyurular</h1>
                        <p className="text-base text-gray-600 max-w-xl mx-auto">
                            Gebze Belediyesi'nin güncel duyuru ve haberlerini takip edin
                        </p>
                    </div>

                    {/* Sadece Arama Çubuğu */}
                    <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
                        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
                            {/* Search */}
                            <div className="relative flex-1 w-full group">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 transition-all duration-300 group-hover:text-blue-500 group-focus-within:text-blue-500" />
                                <input
                                    type="text"
                                    placeholder="Duyurularda arama yapın..."
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-sm transition-all duration-300 hover:border-blue-300 hover:shadow-md transform hover:scale-105 focus:scale-105"
                                    value={aramaMetni}
                                    onChange={(e) => setAramaMetni(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid gap-6">
                    {/* Important Announcements - sadece ilk sayfada göster */}
                    {currentPage === 1 && guncelDuyurular.length > 0 && (
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                                    <span className="w-1 h-8 bg-red-500 mr-3"></span>
                                    Güncel Duyurular
                                </h2>

                                {/* Slider Navigation Buttons */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={prevSlide}
                                        className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 hover:border-red-400 transition-all duration-200 shadow-sm hover:shadow-md"
                                        aria-label="Önceki"
                                    >
                                        <ChevronLeft className="w-5 h-5 text-gray-600 hover:text-red-500" />
                                    </button>
                                    <button
                                        onClick={nextSlide}
                                        className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 hover:border-red-400 transition-all duration-200 shadow-sm hover:shadow-md"
                                        aria-label="Sonraki"
                                    >
                                        <ChevronRight className="w-5 h-5 text-gray-600 hover:text-red-500" />
                                    </button>
                                </div>
                            </div>

                            {/* Slider Container */}
                            <div className="overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={sliderCurrentIndex}
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
                                    >
                                        {getVisibleCards().map((duyuru, index) => (
                                            <motion.div
                                                key={`${duyuru.id}-${sliderCurrentIndex}-${index}`}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                                className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 border-l-4 border-red-500"
                                            >
                                                <div className="p-4">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">
                                                            GÜNCEL
                                                        </span>
                                                    </div>
                                                    <div className="flex items-start space-x-3 mb-2">
                                                        <Megaphone className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                                                        <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
                                                            {duyuru.baslik}
                                                        </h3>
                                                    </div>
                                                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                                                        {duyuru.ozet}
                                                    </p>
                                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                                                        <div className="flex items-center">
                                                            <CalendarDays className="w-4 h-4 mr-1" />
                                                            {formatTarih(duyuru.tarih)}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Eye className="w-4 h-4 mr-1" />
                                                            {duyuru.okunmaSayisi}
                                                        </div>
                                                    </div>
                                                    <button
                                                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center text-sm"
                                                        onClick={() => window.location.href = "/duyurudetay"}
                                                    >
                                                        Devamını Oku
                                                        <ChevronRight className="w-4 h-4 ml-1" />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Slider Indicators */}
                            <div className="flex justify-center mt-4 gap-2">
                                {guncelDuyurular.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSliderCurrentIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                            index === sliderCurrentIndex ? 'bg-red-500 w-6' : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                        aria-label={`Slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* All Announcements */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                            <span className="w-1 h-8 bg-blue-500 mr-3"></span>
                            Tüm Duyurular
                        </h2>
                        {/* Animasyonlu kartlar */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentPage}
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                transition={{ duration: 0.35, ease: "easeInOut" }}
                                className="space-y-6"
                            >
                                {paginatedDuyurular.map(duyuru => (
                                    <div key={duyuru.id} className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                                        <div className="md:flex">
                                            <div className="p-6 flex-1">
                                                <div className="flex items-center justify-between mb-3">
                                                    {duyuru.onemli && (
                                                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                                            ÖNEMLİ
                                                        </span>
                                                    )}
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <CalendarDays className="w-4 h-4 mr-1" />
                                                        {formatTarih(duyuru.tarih)}
                                                    </div>
                                                </div>
                                                <div className="flex items-start space-x-3 mb-3">
                                                    <Megaphone className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                                                    <h3 className="text-xl font-semibold text-gray-900">
                                                        {duyuru.baslik}
                                                    </h3>
                                                </div>
                                                <p className="text-gray-600 mb-4">
                                                    {duyuru.ozet}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <Eye className="w-4 h-4 mr-1" />
                                                        {duyuru.okunmaSayisi} görüntülenme
                                                    </div>
                                                    <button
                                                        className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                                                        onClick={() => window.location.href = "/duyurudetay"}
                                                    >
                                                        Devamını Oku
                                                        <ChevronRight className="w-4 h-4 ml-1" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>

                        {tumDuyurular.length === 0 && (
                            <div className="text-center py-12">
                                <Megaphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Duyuru bulunamadı</h3>
                                <p className="text-gray-500">Arama kriterlerinize uygun duyuru bulunmamaktadır.</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-8 gap-2">
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white border hover:bg-gray-100'}`}
                                >
                                    &lt;
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`px-3 py-1 rounded font-semibold ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white border hover:bg-gray-100'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white border hover:bg-gray-100'}`}
                                >
                                    &gt;
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DuyurularSayfasi;