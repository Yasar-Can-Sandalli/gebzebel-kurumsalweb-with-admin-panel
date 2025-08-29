import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function HomePage() {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    // Genişletilmiş haber verisi - 24 haber
    const news = [
        {
            id: 1,
            title: "Başkan Büyükgöz Koltuğu Sultana Devretti",
            image: "/images/Haberler/habergörselleri/cevretemizligeridönüsüm/cevre1.jpg",
            date: "23 Nisan 2025"
        },
        {
            id: 2,
            title: "41 Genç'i başarılı öğrencileri Başkan Büyükgöz'e konuk oldu",
            image: "/images/Haberler/habergörselleri/egitimvegenclik/egitim1.jpg",
            date: "10 Nisan 2025"
        },
        {
            id: 3,
            title: "Başkan Büyükgöz Koltuğu Sultana Devretti",
            image: "/images/Haberler/habergörselleri/projelervealtyapicalismalari/calismalar.jpg",
            date: "23 Nisan 2024"
        },
        {
            id: 4,
            title: "Kocaeli'de Yeni Park Projeleri Başladı",
            image: "/images/Haberler/habergörselleri/cevretemizligeridönüsüm/cevre1.jpg",
            date: "22 Nisan 2025"
        },
        {
            id: 5,
            title: "Gençlik Merkezinde Spor Etkinlikleri",
            image: "/images/Haberler/habergörselleri/egitimvegenclik/egitim1.jpg",
            date: "21 Nisan 2025"
        },
        {
            id: 6,
            title: "Çevre Temizliği Kampanyası Devam Ediyor",
            image: "/images/Haberler/habergörselleri/cevretemizligeridönüsüm/cevre1.jpg",
            date: "20 Nisan 2025"
        },
        {
            id: 7,
            title: "Eğitim Bursu Başvuruları Başladı",
            image: "/images/Haberler/habergörselleri/egitimvegenclik/egitim1.jpg",
            date: "19 Nisan 2025"
        },
        {
            id: 8,
            title: "Kültür Merkezi Yenileme Çalışmaları",
            image: "/images/Haberler/habergörselleri/projelervealtyapicalismalari/calismalar.jpg",
            date: "18 Nisan 2025"
        },
        {
            id: 9,
            title: "Yeşil Alan Düzenleme Projesi Tamamlandı",
            image: "/images/Haberler/habergörselleri/cevretemizligeridönüsüm/cevre1.jpg",
            date: "17 Nisan 2025"
        },
        {
            id: 10,
            title: "Okul Öncesi Eğitim Kayıtları Devam Ediyor",
            image: "/images/Haberler/habergörselleri/egitimvegenclik/egitim1.jpg",
            date: "16 Nisan 2025"
        },
        {
            id: 11,
            title: "Altyapı Yenileme Çalışmaları Sürdürülüyor",
            image: "/images/Haberler/habergörselleri/projelervealtyapicalismalari/calismalar.jpg",
            date: "15 Nisan 2025"
        },
        {
            id: 12,
            title: "Çevre Dostu Projelere Destek",
            image: "/images/Haberler/habergörselleri/cevretemizligeridönüsüm/cevre1.jpg",
            date: "14 Nisan 2025"
        },
        {
            id: 13,
            title: "Gençlik Projeleri Yarışması Sonuçlandı",
            image: "/images/Haberler/habergörselleri/egitimvegenclik/egitim1.jpg",
            date: "13 Nisan 2025"
        },
        {
            id: 14,
            title: "Şehir Merkezi Güzelleştirme Çalışmaları",
            image: "/images/Haberler/habergörselleri/projelervealtyapicalismalari/calismalar.jpg",
            date: "12 Nisan 2025"
        },
        {
            id: 15,
            title: "Çevre Bilinci Eğitim Programları",
            image: "/images/Haberler/habergörselleri/cevretemizligeridönüsüm/cevre1.jpg",
            date: "11 Nisan 2025"
        },
        {
            id: 16,
            title: "Mesleki Eğitim Kursları Başlıyor",
            image: "/images/Haberler/habergörselleri/egitimvegenclik/egitim1.jpg",
            date: "10 Nisan 2025"
        },
        {
            id: 17,
            title: "Kentsel Dönüşüm Projeleri Devam Ediyor",
            image: "/images/Haberler/habergörselleri/projelervealtyapicalismalari/calismalar.jpg",
            date: "9 Nisan 2025"
        },
        {
            id: 18,
            title: "Geri Dönüşüm Kampanyası Genişletiliyor",
            image: "/images/Haberler/habergörselleri/cevretemizligeridönüsüm/cevre1.jpg",
            date: "8 Nisan 2025"
        },
        {
            id: 19,
            title: "Öğrenci Burs Programları Açıklandı",
            image: "/images/Haberler/habergörselleri/egitimvegenclik/egitim1.jpg",
            date: "7 Nisan 2025"
        },
        {
            id: 20,
            title: "Yol Genişletme Projesi Tamamlandı",
            image: "/images/Haberler/habergörselleri/projelervealtyapicalismalari/calismalar.jpg",
            date: "6 Nisan 2025"
        },
        {
            id: 21,
            title: "Doğa Koruma Projelerine Destek",
            image: "/images/Haberler/habergörselleri/cevretemizligeridönüsüm/cevre1.jpg",
            date: "5 Nisan 2025"
        },
        {
            id: 22,
            title: "Teknoloji Eğitimi Programları",
            image: "/images/Haberler/habergörselleri/egitimvegenclik/egitim1.jpg",
            date: "4 Nisan 2025"
        },
        {
            id: 23,
            title: "Sosyal Tesis Yenileme Çalışmaları",
            image: "/images/Haberler/habergörselleri/projelervealtyapicalismalari/calismalar.jpg",
            date: "3 Nisan 2025"
        },
        {
            id: 24,
            title: "Çevre Temizliği Gönüllüleri Aranıyor",
            image: "/images/Haberler/habergörselleri/cevretemizligeridönüsüm/cevre1.jpg",
            date: "2 Nisan 2025"
        }
    ];

    const services = [
        {
            id: 1,
            title: "Online İşlem",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
            ),
            description: "Hızlıca online işlemlerinizi yapın"
        },
        {
            id: 2,
            title: "E-Başvuru",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                    <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                    <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
            ),
            description: "Projeleriniz için başvuru yapın"
        },
        {
            id: 3,
            title: "Kent İçi Ulaşım",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="8" width="20" height="12" rx="2" ry="2"></rect>
                    <circle cx="7" cy="20" r="1"></circle>
                    <circle cx="17" cy="20" r="1"></circle>
                    <path d="M14 12h2"></path>
                    <path d="M8 12h2"></path>
                    <path d="M10 4v4"></path>
                    <path d="M14 4v4"></path>
                </svg>
            ),
            description: "Toplu taşıma ve ulaşım bilgileri"
        },
        {
            id: 4,
            title: "Sağlık Hizmetleri",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
            ),
            description: "Sağlık hizmetlerine erişin"
        },
        {
            id: 5,
            title: "Kültür-Sanat",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="10 8 16 12 10 16 10 8"></polygon>
                </svg>
            ),
            description: "Etkinlik ve sanat haberleri"
        },
        {
            id: 6,
            title: "Yardım Merkezi",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
            ),
            description: "Destek ve danışma"
        }
    ];

    const serviceRoutes = {
        1: "/online-islem",
        2: "/ebasvuru",
        3: "/ulasim",
        4: "/saglik",
        5: "/kultur-sanat",
        6: "/yardim-merkezi"
    };

    const announcements = [
        {
            id: 1,
            title: "Otobüs satın alınacaktır",
            date: "15 Nisan 2025",
        },
        {
            id: 2,
            title: "Kocaeli'de Bahar Festivali hazırlıkları başladı",
            date: "12 Nisan 2025"
        },
        {
            id: 3,
            title: "Emlak vergisi son ödeme tarihi uzatıldı",
            date: "10 Nisan 2025"
        },
        {
            id: 4,
            title: "Otobüs satın alınacaktır",
            date: "15 Nisan 2025"
        },
    ];

    const events = [
        {
            id: 1,
            title: "Orta Asya'dan Anadolu'ya Ortakmiras",
            date: "29 Nisan",
            location: "Kültür Merkezi",
            image: "/images/Haberler/habergörselleri/projelervealtyapicalismalari/calismalar1-1.webp",
            time: "18:00"
        },
        {
            id: 2,
            title: "Bahar Konseri",
            date: "30 Nisan",
            location: "Kent Meydanı",
            image: "/images/Haberler/habergörselleri/sosyalyardımvehizmetler/sosyal2.jpg",
            time: "19:30"
        }
    ];

    const discoverCategories = [
        {
            id: 1,
            title: "GEBZE'Yİ KEŞFET",
            image: "/images/Haberler/habergörselleri/egitimvegenclik/egitim1-2.jpg"
        },
        {
            id: 2,
            title: "GEZECEK",
            image: "/images/Haberler/habergörselleri/sosyalyardımvehizmetler/sosyal1-2.jpeg"
        },
        {
            id: 3,
            title: "MÜZELER",
            image: "/images/Haberler/habergörselleri/sosyalyardımvehizmetler/sosyal1-2.jpeg"
        },
        {
            id: 4,
            title: "ROTALAR",
            image: "/images/Haberler/habergörselleri/sosyalyardımvehizmetler/sosyal1-2.jpeg"
        },
        {
            id: 5,
            title: "ORMANLAR",
            image: "/images/Haberler/habergörselleri/sosyalyardımvehizmetler/sosyal1-2.jpeg"
        }
    ];

    const projects = [
        {
            id: 1,
            title: "Kandıra Sahil Çevresi Düzenleme Projesi",
            image: "/images/Haberler/habergörselleri/sosyalyardımvehizmetler/sosyal1-2.jpeg"
        },
        {
            id: 2,
            title: "Akçakoca İspinoz Köprüsü Yenileme Çalışması",
            image: "/images/Haberler/habergörselleri/sosyalyardımvehizmetler/sosyal1-2.jpeg"
        },
        {
            id: 3,
            title: "Derince Mahallesi Kreş ve Spor Merkezi",
            image: "/images/Haberler/habergörselleri/sosyalyardımvehizmetler/sosyal1-2.jpeg"
        },
        {
            id: 4,
            title: "Körfez Yol Genişletme Çalışması",
            image: "/images/Haberler/habergörselleri/sosyalyardımvehizmetler/sosyal1-2.jpeg"
        }
    ];

    // Slider fonksiyonları
    const itemsPerPage = 3; // Mobilde 1, tablette 2, masaüstünde 3
    const totalSlides = Math.ceil(news.length / itemsPerPage);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    // Otomatik kaydırma
    useEffect(() => {
        const interval = setInterval(nextSlide, 5000); // 5 saniyede bir
        return () => clearInterval(interval);
    }, []);

    // Gösterilecek haberleri hesapla
    const getCurrentSlideItems = () => {
        const start = currentSlide * itemsPerPage;
        return news.slice(start, start + itemsPerPage);
    };

    return (
        <div className="bg-gray-50 px-2 sm:px-4">
            {/* Hero Section ile video sadece üstte */}
            <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] flex justify-center items-center py-0 sm:py-0" style={{ position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', width: '100vw' }}>
                <div
                    className="relative w-full rounded-none overflow-hidden shadow-lg"
                    style={{ minHeight: 340, height: '72vh', maxHeight: 700 }}
                >
                    <video
                        className="absolute inset-0 w-full h-full object-cover"
                        src="/gebze.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
                    <div className="relative z-20">
                        {/* ...hero içerik... */}
                    </div>
                </div>
            </div>

            {/* Sayfa İçeriği */}
            <div className="relative z-10">
                {/* News Slider Section */}
                <section className="max-w-6xl mx-auto px-2 sm:px-4 py-8 sm:py-12">
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-2">
                        <h2 className="text-lg sm:text-xl font-bold text-blue-800">GÜNCEL HABERLER</h2>
                        <a
                            href="#"
                            className="text-xs sm:text-sm text-blue-500 hover:underline"
                            onClick={e => { e.preventDefault(); navigate("/haberler"); }}
                        >
                            Tüm Haberler
                        </a>
                    </div>

                    {/* Slider Container */}
                    <div className="relative">
                        {/* Slider */}
                        <div className="overflow-hidden">
                            <div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                            >
                                {Array.from({ length: totalSlides }, (_, slideIndex) => (
                                    <div key={slideIndex} className="w-full flex-shrink-0">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                            {news.slice(slideIndex * itemsPerPage, (slideIndex + 1) * itemsPerPage).map(item => (
                                                <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                                    <img src={item.image} alt={item.title} className="w-full h-40 sm:h-48 object-cover" />
                                                    <div className="p-3 sm:p-4">
                                                        <h3 className="font-bold text-base sm:text-lg mb-2 line-clamp-2">{item.title}</h3>
                                                        <p className="text-xs sm:text-sm text-gray-500">{item.date}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 hover:bg-white text-blue-600 p-2 rounded-full shadow-lg transition-all duration-200 z-10"
                            aria-label="Önceki"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 hover:bg-white text-blue-600 p-2 rounded-full shadow-lg transition-all duration-200 z-10"
                            aria-label="Sonraki"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 6 15 12 9 18"></polyline>
                            </svg>
                        </button>

                        {/* Dots Navigation */}
                        <div className="flex justify-center mt-6 space-x-2">
                            {Array.from({ length: totalSlides }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                        currentSlide === index
                                            ? 'bg-blue-600 scale-110'
                                            : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                    aria-label={`Slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Slide Counter */}
                        <div className="text-center mt-2 text-xs sm:text-sm text-gray-500">
                            {currentSlide + 1} / {totalSlides}
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="bg-blue-50 py-8 sm:py-12">
                    <div className="max-w-6xl mx-auto px-2 sm:px-4">
                        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-2">
                            <h2 className="text-lg sm:text-xl font-bold text-blue-800">KOLAY ERİŞİM</h2>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
                            {services.map(service => (
                                <button
                                    key={service.id}
                                    className="bg-white rounded-lg p-3 sm:p-4 text-center shadow hover:shadow-md transition focus:outline-none"
                                    onClick={() => navigate(serviceRoutes[service.id])}
                                    type="button"
                                >
                                    <div className="mb-2 sm:mb-3 w-10 h-10 sm:w-12 sm:h-12 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                        {service.icon}
                                    </div>
                                    <h3 className="font-bold text-xs sm:text-sm mb-1">{service.title}</h3>
                                    <p className="text-[10px] sm:text-xs text-gray-500">{service.description}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Announcements & Events Section */}
                <section className="max-w-6xl mx-auto px-2 sm:px-4 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                    {/* Announcements */}
                    <div>
                        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-2">
                            <h2 className="text-lg sm:text-xl font-bold text-blue-800"> DUYURULAR</h2>
                            <a
                                href="#"
                                className="text-xs sm:text-sm text-blue-500 hover:underline"
                                onClick={e => { e.preventDefault(); navigate("/duyuru"); }}
                            >
                                Tüm Duyurular
                            </a>
                        </div>

                        <div className="space-y-3 sm:space-y-4">
                            {announcements.map(item => (
                                <div key={item.id} className="flex items-start border-b pb-3 sm:pb-4">
                                    <div className="text-blue-500 mr-2 sm:mr-3 mt-1">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="12" y1="8" x2="12" y2="12"></line>
                                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium text-xs sm:text-sm">{item.title}</p>
                                        <p className="text-[10px] sm:text-xs text-gray-500 mt-1">{item.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <a
                            href="#"
                            className="mt-3 sm:mt-4 inline-block text-xs sm:text-sm text-blue-500 hover:underline"
                            onClick={e => { e.preventDefault(); navigate("/duyuru"); }}
                        >
                            Daha Fazlası
                        </a>
                    </div>

                    {/* Events */}
                    <div>
                        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-2">
                            <h2 className="text-lg sm:text-xl font-bold text-blue-800">KOCAELİ'DE ETKİNLİKLER</h2>
                            <a
                                href="#"
                                className="text-xs sm:text-sm text-blue-500 hover:underline"
                                onClick={e => { e.preventDefault(); navigate("/etkinlikler"); }}
                            >
                                Tüm Etkinlikler
                            </a>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            {events.map(event => (
                                <div key={event.id} className="bg-white rounded-lg shadow overflow-hidden">
                                    <img src={event.image} alt={event.title} className="w-full h-32 sm:h-40 object-cover" />
                                    <div className="p-3 sm:p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="bg-blue-100 text-blue-800 text-center py-1 px-2 sm:px-3 rounded-lg">
                                                <div className="font-bold text-base sm:text-lg">{event.date.split(" ")[0]}</div>
                                                <div className="text-xs">{event.date.split(" ")[1] || ""}</div>
                                            </div>
                                            <span className="text-xs sm:text-sm text-blue-500">{event.time}</span>
                                        </div>
                                        <h3 className="font-bold mb-1 text-sm sm:text-base">{event.title}</h3>
                                        <p className="text-[10px] sm:text-xs text-gray-500">{event.location}</p>

                                        <div className="mt-3 sm:mt-4 flex justify-between text-[10px] sm:text-xs text-gray-500">
                                            <button className="flex items-center">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                                </svg>
                                                <span className="ml-1">Beğen</span>
                                            </button>
                                            <button className="flex items-center">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1-3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                                </svg>
                                                <span className="ml-1">Yorum</span>
                                            </button>
                                            <button className="flex items-center">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="18" cy="5" r="3"></circle>
                                                    <circle cx="6" cy="12" r="3"></circle>
                                                    <circle cx="18" cy="19" r="3"></circle>
                                                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                                                </svg>
                                                <span className="ml-1">Paylaş</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Discover Section */}
                <section className="bg-gray-100 py-8 sm:py-12">
                    <div className="max-w-6xl mx-auto px-2 sm:px-4">
                        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-2">
                            <h2 className="text-lg sm:text-xl font-bold text-blue-800">KOCAELİ'Yİ KEŞFET</h2>
                            <div className="flex flex-wrap gap-2">
                                <button className="bg-white px-2 sm:px-3 py-1 rounded border text-xs sm:text-sm" onClick={() => navigate("/kesfet/turistik")}>Turistik</button>
                                <button className="bg-white px-2 sm:px-3 py-1 rounded border text-xs sm:text-sm" onClick={() => navigate("/kesfet/kultur-sanat")}>Kültür-Sanat</button>
                                <button className="bg-white px-2 sm:px-3 py-1 rounded border text-xs sm:text-sm" onClick={() => navigate("/kesfet/spor")}>Spor</button>
                                <button className="bg-white px-2 sm:px-3 py-1 rounded border text-xs sm:text-sm" onClick={() => navigate("/kesfet/engelsiz-yaslilar")}>Engelsiz ve Yaşlılar</button>
                                <button className="bg-white px-2 sm:px-3 py-1 rounded border text-xs sm:text-sm" onClick={() => navigate("/kesfet/saglik-temizlik")}>Sağlık ve Temizlik</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 h-fit">
                            {/* Sol taraf - büyük resim */}
                            <div className="relative md:col-span-1 md:row-span-2">
                                <div className="relative rounded-lg overflow-hidden h-86 sm:h-86 md:h-86">
                                    <img src={discoverCategories[0].image} alt={discoverCategories[0].title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 sm:p-6">
                                        <h3 className="text-white font-bold text-lg sm:text-xl">{discoverCategories[0].title}</h3>
                                    </div>
                                </div>
                            </div>

                            {/* Sağ taraf - küçük resimler */}
                            <div className="md:col-span-2 grid grid-cols-2 gap-4 sm:gap-6">
                                {discoverCategories.slice(1).map(category => (
                                    <div key={category.id} className="relative rounded-lg overflow-hidden h-50 sm:h-40 md:h-40 lg:h-40">
                                        <img src={category.image} alt={category.title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2 sm:p-4">
                                            <h3 className="text-white font-bold text-xs sm:text-base">{category.title}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section className="bg-gray-50 py-8 sm:py-12">
                    <div className="max-w-6xl mx-auto px-2 sm:px-4">
                        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-2">
                            <h2 className="text-lg sm:text-xl font-bold text-blue-800">DEVAM EDEN PROJELER</h2>
                            <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                                <button className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded" onClick={() => navigate("/projeler/tamamlananlar")}>Tamamlananlar</button>
                                <button className="bg-white px-2 sm:px-3 py-1 rounded border" onClick={() => navigate("/projeler/devam-eden")}>Devam Eden</button>
                                <button className="bg-white px-2 sm:px-3 py-1 rounded border" onClick={() => navigate("/projeler/ihale")}>İhale</button>
                                <button className="bg-white px-2 sm:px-3 py-1 rounded border" onClick={() => navigate("/projeler/planlama-tasari")}>Planlama ve Tasarı</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                            {projects.map(project => (
                                <div key={project.id} className="bg-white rounded-lg shadow overflow-hidden">
                                    <img src={project.image} alt={project.title} className="w-full h-28 sm:h-36 object-cover" />
                                    <div className="p-2 sm:p-3">
                                        <h3 className="font-bold text-xs sm:text-sm">{project.title}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}