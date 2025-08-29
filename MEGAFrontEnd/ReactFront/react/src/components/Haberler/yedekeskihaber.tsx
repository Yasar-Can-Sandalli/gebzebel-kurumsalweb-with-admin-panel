import { useRef, useEffect, useCallback, useState } from "react";
import { Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useKeenSlider } from 'keen-slider/react';
import "keen-slider/keen-slider.min.css";
import {
    Megaphone,
    CalendarDays,
    Info,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

type Announcement = {
    id: number;
    title: string;
    date: string;
    description: string;
    link?: string;
};

const announcements: Announcement[] = [
    {
        id: 1,
        title: "Su Kesintisi Duyurusu",
        date: "21 Mayıs 2025",
        description: "Bakım çalışmaları nedeniyle bazı mahallelerde su kesintisi yaşanacaktır.",
        link: "duyurudetay", // Linki güncelledik
    },
    {
        id: 2,
        title: "Halk Günü Etkinliği",
        date: "23 Mayıs 2025",
        description: "Belediye Başkanı vatandaşlarla bir araya geliyor.",
        link: "duyurudetay",

    },
    {
        id: 3,
        title: "Atık Toplama Günleri Değişti",
        date: "25 Mayıs 2025",
        description: "Yeni düzenleme ile mahallelere özel atık toplama günleri belirlendi.",
        link: "duyurudetay",
    },
    {
        id: 4,
        title: "Park Yenileme Projesi",
        date: "26 Mayıs 2025",
        description: "Şehir merkezindeki parkların bakım ve yenileme çalışmaları başladı.",
        link: "duyurudetay",
    },
    {
        id: 5,
        title: "İmar Planı Askıya Çıktı",
        date: "28 Mayıs 2025",
        description: "Yeni imar planı vatandaşların incelemesine sunulmuştur.",
        link: "duyurudetay",
    },
];

function AnnouncementsSlider() {
    const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
        loop: true,
        slides: {
            perView: 3,
            spacing: 16,
        },
        breakpoints: {
            "(max-width: 1024px)": {
                slides: { perView: 2, spacing: 12 },
            },
            "(max-width: 640px)": {
                slides: { perView: 1, spacing: 8 },
            },
        },
    });

    // Otomatik döndürme
    useEffect(() => {
        const interval = setInterval(() => {
            slider.current?.next();
        }, 4000);
        return () => clearInterval(interval);
    }, [slider]);

    // Tüm Duyurular butonuna tıklandığında çalışacak fonksiyon
    const handleViewAllAnnouncements = () => {
        // React Router kullanıyorsanız:
        // navigate('/duyuru');

        // Next.js kullanıyorsanız:
        // router.push('/duyuru');

        // Vanilla JS ile yönlendirme:
        window.location.href = '/duyuru';

        // Eğer dosya yapısı farklıysa:
        // window.location.href = './duyuru.tsx';
    };

    return (
        <section className="py-12 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Başlık, Tüm Duyurular Butonu ve Oklar Yan Yana */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <h2 className="text-3xl font-bold text-gray-800">Duyurular</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={() => slider.current?.prev()}
                                className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
                            >
                                <ChevronLeft className="w-5 h-5 text-gray-600" />
                            </button>
                            <button
                                onClick={() => slider.current?.next()}
                                className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
                            >
                                <ChevronRight className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </div>

                    {/* Tüm Duyurular butonu eklendi - büyütüldü ve rengi kurumsal yapıldı */}
                    <button
                        onClick={handleViewAllAnnouncements}
                        className="px-5 py-2.5 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 transition shadow-md flex items-center gap-2 text-base font-medium"
                    >
                        <span>Tüm Duyurular</span>
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Slider */}
                <div ref={sliderRef} className="keen-slider">
                    {announcements.map((item) => (
                        <div
                            key={item.id}
                            className="keen-slider__slide bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Megaphone className="text-blue-600 w-5 h-5" />
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {item.title}
                                </h3>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mb-3">
                                <CalendarDays className="w-4 h-4 mr-1" />
                                <span>{item.date}</span>
                            </div>
                            <p className="text-gray-700 mb-4 text-sm">{item.description}</p>
                            {item.link && (
                                <a
                                    href={item.link}
                                    className="flex items-center text-blue-600 hover:underline text-sm font-medium"
                                >
                                    <Info className="w-4 h-4 mr-1" />
                                    Detaylı bilgi
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Custom useInterval hook
function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delay !== null) {
            const id = setInterval(() => savedCallback.current(), delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export default function BlogLayout() {
    const heroPost = {
        id: 1,
        image: "/images/Haberler/habergörselleri/cevretemizligeridönüsüm/cevre1.jpg",
        category: "GERİ DÖNÜŞÜM",
        categoryClass: "bg-pink-500",
        title: "Atıkları dönüştürüyor, doğayı koruyoruz.",
        date: "Mayıs 29, 2022",
        link : "haberlerdetay"
    };

    const featuredArticles = [
        {
            id: 1,
            image: "/images/Haberler/habergörselleri/egitimvegenclik/egitim1.jpg",
            category: "EĞİTİM",
            categoryClass: "bg-green-600",
            title: "Eğitime erişimi önemsiyor, bilgiyle toplumu güçlendiriyoruz.",
            date: "Mayıs 29, 2022",
            link : "haberlerdetay"
        },
        {
            id: 2,
            image: "/images/Haberler/habergörselleri/projelervealtyapicalismalari/calismalar.jpg",
            category: "PROJELER",
            categoryClass: "bg-yellow-500",
            title: "Daha İyi Bir Kent !",
            date: "Mayıs 29, 2022",
            link : "haberlerdetay"
        },
        {
            id: 3,
            image: "/images/Haberler/habergörselleri/sosyalyardımvehizmetler/sosyal1.jpg",
            category: "SOSYAL YARDIM",
            categoryClass: "bg-blue-600",
            title: "Gebze'de Kimse Yalnız Değil",
            date: "Mayıs 29, 2022",
            link : "haberlerdetay"
        }
    ];

    // Slider data with added categoryClass property to match the main cards
    const slides = [
        {
            id: 1,
            image: "/images/Haberler/habergörselleri/projelervealtyapicalismalari/calismalar1-1.webp",
            category: "Güncel",
            categoryClass: "bg-indigo-500", // Added color class
            title: "Belediyemiz Yeni Projeleri Tanıttı",
            date: "14 Mayıs 2025",
            link : "haberlerdetay"
        },
        {
            id: 2,
            image: "/images/Haberler/habergörselleri/sosyalyardımvehizmetler/sosyal2.jpg",
            category: "Duyuru",
            categoryClass: "bg-amber-500", // Added color class
            title: "Yaz Şenliği Etkinlikleri Başlıyor",
            date: "10 Mayıs 2025",
            link : "haberlerdetay"
        },
        {
            id: 3,
            image: "/images/Haberler/habergörselleri/egitimvegenclik/egitim1-2.jpg",
            category: "Etkinlik",
            categoryClass: "bg-green-600", // Same as EĞİTİM
            title: "Başkanımızdan Gençlere Özel Mesaj",
            date: "8 Mayıs 2025",
            link : "haberlerdetay"
        },
        {
            id: 4,
            image: "/images/Haberler/habergörselleri/sosyalyardımvehizmetler/sosyal1-2.jpeg",
            category: "Haber",
            categoryClass: "bg-blue-600", // Same as SOSYAL YARDIM
            title: "Başkanımızdan Sosyal Yardım Destekleri",
            date: "5 Mayıs 2025",
            link : "haberlerdetay"
        },
    ];

    // NewsItem interface and data
    const newsData = [
        {
            id: 1,
            title: "Gebze'de Yeni Park Açılışı Yapıldı",
            image: "/images/Haberler/habergörselleri/cevretemizligeridönüsüm/cevre1.jpg",
            category: "Başkan'dan Mesajlar",
            description: "Yeni park hizmete açıldı, vatandaşlardan yoğun ilgi gördü.",
            link : "haberlerdetay"
        },
        {
            id: 2,
            title: "Çevre Temizlik Kampanyası Başladı",
            image: "/images/Haberler/habergörselleri/egitimvegenclik/egitim1.jpg",
            category: "Sıfır Atık",
            description: "Temizlik kampanyası geniş katılımla başladı.",
            link : "haberlerdetay"
        },
        {
            id: 3,
            title: "Yeni İmar Planları Onaylandı",
            image: "/images/Haberler/habergörselleri/projelervealtyapicalismalari/calismalar.jpg",
            category: "Eğitim & Gençlik",
            description: "Belediye meclisinde yeni imar planları oy birliğiyle kabul edildi.",
            link : "haberlerdetay"
        },
        {
            id: 4,
            title: "Geri Dönüşüm Eğitimi Verildi",
            image: "/images/Haberler/habergörselleri/sosyalyardımvehizmetler/sosyal1.jpg",
            category: "Sosyal Hizmetler",
            description: "Okullarda öğrencilere geri dönüşüm bilinci kazandırıldı.",
            link : "haberlerdetay"
        },
        {
            id: 5,
            title: "Geri Dönüşüm Eğitimi Verildi",
            image: "/images/Haberler/habergörselleri/sosyalyardımvehizmetler/sosyal1.jpg",
            category: "Projeler & Altyapı",
            description: "Okullarda öğrencilere geri dönüşüm bilinci kazandırıldı.",
            link : "haberlerdetay"
        },
        {
            id: 6,
            title: "Geri Dönüşüm Eğitimi Verildi",
            image: "/images/Haberler/habergörselleri/sosyalyardımvehizmetler/sosyal1.jpg",
            category: "Spor Faaliyetleri",
            description: "Okullarda öğrencilere geri dönüşüm bilinci kazandırıldı.",
            link : "haberlerdetay"
        },
        {
            id: 7,
            title: "Geri Dönüşüm Eğitimi Verildi",
            image: "/images/Haberler/habergörselleri/sosyalyardımvehizmetler/sosyal1.jpg",
            category: "Ziyaretler",
            description: "Okullarda öğrencilere geri dönüşüm bilinci kazandırıldı.",
            link : "haberlerdetay"
        },
        {
            id: 8,
            title: "Geri Dönüşüm Eğitimi Verildi",
            image: "/images/Haberler/habergörselleri/sosyalyardımvehizmetler/sosyal1.jpg",
            category: "Ziyaretler",
            description: "Okullarda öğrencilere geri dönüşüm bilinci kazandırıldı.",
            link : "haberlerdetay"
        },
        {
            id: 9,
            title: "Geri Dönüşüm Eğitimi Verildi",
            image: "/images/Haberler/habergörselleri/sosyalyardımvehizmetler/sosyal1.jpg",
            category: "Ziyaretler",
            description: "Okullarda öğrencilere geri dönüşüm bilinci kazandırıldı.",
            link : "haberlerdetay"
        },
    ];

    const categories = [
        "Tümü",
        "Başkan'dan Mesajlar",
        "Sıfır Atık",
        "Eğitim & Gençlik",
        "Sosyal Hizmetler",
        "Projeler & Altyapı",
        "Spor Faaliyetleri",
        "Ziyaretler",
    ];

    // Slider refs and logic
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const slideWidth = 380 + 16; // Card width + gap
    const visibleSlides = 3; // Show 3 cards at once
    const scrollAmount = slideWidth * visibleSlides;

    // NewsPage component state
    const [activeCategory, setActiveCategory] = useState("Tümü");
    const [isMobile, setIsMobile] = useState(false);

    // Pagination için state
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 6;
    const maxPages = 5;

    // Kategori değişince sayfa başa dönsün
    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory]);

    // Responsive ekran kontrolü için useEffect kullanımı
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // İlk yükleme kontrolü
        checkScreenSize();

        // Ekran boyutu değiştiğinde kontrol
        window.addEventListener("resize", checkScreenSize);

        // Component unmount olduğunda event listener'ı temizle
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    // Scroll control
    useEffect(() => {
        const slider = sliderRef.current as HTMLDivElement;
        if (!slider) return;

        // Center the view
        const initialScroll = Math.floor(slides.length / 2) * slideWidth;
        slider.scrollLeft = initialScroll;

        const handleScroll = () => {
            if (!slider) return;

            if (slider.scrollLeft <= 0) {
                slider.scrollLeft = slides.length * slideWidth;
            } else if (slider.scrollLeft >= slideWidth * slides.length * 2) {
                slider.scrollLeft = slides.length * slideWidth;
            }
        };

        slider.addEventListener("scroll", handleScroll);
        return () => slider.removeEventListener("scroll", handleScroll);
    }, []);

    const isMouseOver = useRef(false);

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const handleMouseEnter = () => {
            isMouseOver.current = true;
        };

        const handleMouseLeave = () => {
            isMouseOver.current = false;
        };

        slider.addEventListener('mouseenter', handleMouseEnter);
        slider.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            slider.removeEventListener('mouseenter', handleMouseEnter);
            slider.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const scrollByAmount = useCallback((amount: number) => {
        if (!sliderRef.current || isMouseOver.current) return;

        const slider = sliderRef.current;
        const newScrollLeft = slider.scrollLeft + amount;

        if (newScrollLeft >= slideWidth * slides.length * 3) {
            // Reset to start invisibly
            slider.scrollLeft = slideWidth * slides.length;
            slider.scrollTo({
                left: slider.scrollLeft + amount,
                behavior: 'smooth'
            });
        } else if (newScrollLeft <= 0) {
            // Reset to end invisibly
            slider.scrollLeft = slideWidth * slides.length * 2;
            slider.scrollTo({
                left: slider.scrollLeft + amount,
                behavior: 'smooth'
            });
        } else {
            // Normal scroll
            slider.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    }, [slides.length, slideWidth]);

    // Auto-scroll interval
    useInterval(() => {
        if (sliderRef.current && !isMouseOver.current) {
            scrollByAmount(scrollAmount);
        }
    }, 4000); // 5000ms'den 4000ms'ye değiştirildi

    // Filter news by category
    const filteredNews =
        activeCategory === "Tümü"
            ? newsData
            : newsData.filter((news) => news.category === activeCategory);

    // Pagination hesaplamaları
    const totalPages = Math.min(
        Math.ceil(filteredNews.length / newsPerPage),
        maxPages
    );
    const paginatedNews = filteredNews.slice(
        (currentPage - 1) * newsPerPage,
        currentPage * newsPerPage
    );

    // Handler for navigating to Duyurular page
    interface Article {
        image: string;
        title: string;
        category: string;
        categoryClass: string;
        date: string;
    }

    const renderHeroCard = (article: Article) => (
        <div className="relative overflow-hidden rounded h-full w-full">
            <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                <div className={`inline-block px-4 py-1 text-sm font-bold text-white rounded mb-3 ${article.categoryClass}`}>
                    {article.category}
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                    <a href="#" className="hover:underline">{article.title}</a>
                </h2>
                <div className="flex items-center text-white text-sm">
                    <div className="flex items-center mr-4">
                        <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>{article.date}</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderMainArticle = (article: Article) => (
        <div className="relative overflow-hidden rounded h-full w-full">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                <div className={`inline-block px-4 py-1 text-sm font-bold text-white rounded mb-3 ${article.categoryClass}`}>
                    {article.category}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                    <a href="#" className="hover:underline">{article.title}</a>
                </h3>
                <div className="flex items-center text-white text-sm">
                    <div className="flex items-center mr-4">
                        <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>{article.date}</span>
                    </div>
                </div>
            </div>
        </div>
    );

    interface Article {
        id: number;
        image: string;
        category: string;
        categoryClass: string;
        title: string;
        date: string;
        author?: string;
        authorImage?: string;
    }

    const renderSmallArticle = (article: Partial<Article> & Required<Pick<Article, 'id' | 'image' | 'category' | 'categoryClass' | 'title'>>, categoryClass: string) => (
        <div className="relative overflow-hidden rounded h-full w-full">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                <h3 className="text-xl font-bold text-white mb-2">
                    <a href="#" className="hover:underline">{article.title}</a>
                </h3>
                <div className="flex items-center justify-between">
                    <div className={`inline-block px-4 py-1 text-sm font-bold text-white rounded ${categoryClass}`}>
                        {article.category}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            {/* Main Card Container with shadow */}
            <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden relative">
                {/* Page content with padding */}
                <div className="px-6 py-6">
                    {/* Main Blog Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"> {/* mb-12'den mb-6'ya düşürüldü */}
                        {/* Left hero post */}
                        <div className="h-140 flex gap-6">
                            {renderHeroCard(heroPost)}
                        </div>

                        {/* Right side */}
                        <div className="grid grid-rows-[1fr_auto] gap-6">
                            {/* Top square */}
                            <div className="aspect-w-1 aspect-h-11">
                                {featuredArticles[0].date ? renderMainArticle(featuredArticles[0]) : null}
                            </div>

                            {/* Bottom two small boxes */}
                            <div className="grid grid-cols-2 gap-6 h-45">
                                <div>
                                    {featuredArticles[1] && renderSmallArticle(featuredArticles[1], "bg-yellow-500")}
                                </div>
                                <div>
                                    {featuredArticles[2] && renderSmallArticle(featuredArticles[2], "bg-blue-600")}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* News Slider Section with Duyurular Button - Full width */}
                    <div className="mb-1"> {/* mb-2'den mb-1'e düşürüldü */}
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                                <h2 className="text-3xl font-bold mr-4">Son Haberler</h2>
                                {/* Navigation Buttons */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => scrollByAmount(-scrollAmount)}
                                        className="size-10 bg-white ring-1 ring-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                                    >
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                            <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </button>

                                    <button
                                        onClick={() => scrollByAmount(scrollAmount)}
                                        className="size-10 bg-white ring-1 ring-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                                    >
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Slider container */}
                        <div className="w-full">
                            <div className="w-full overflow-hidden">
                                <div
                                    ref={sliderRef}
                                    className="flex space-x-4 w-full overflow-x-auto scroll-smooth"
                                    style={{ scrollbarWidth: "none" }}
                                >
                                    {/* Sonsuz döngü için slide'ları 3 kez tekrarla */}
                                    {Array(3).fill(slides).flat().map((slide, index) => (
                                        <div
                                            key={`${slide.id}-${index}`}
                                            className="flex-none w-[380px] h-32 bg-white rounded-xl shadow-md flex border border-gray-200"
                                        >
                                            {/* IMAGE AREA */}
                                            <div className="w-2/5 p-1.5">
                                                <img
                                                    src={slide.image}
                                                    alt={slide.title}
                                                    className="w-full h-full object-cover rounded-md"
                                                    draggable={false}
                                                />
                                            </div>

                                            {/* TEXT AREA */}
                                            <div className="w-3/5 px-2 py-1.5 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="text-xs font-bold line-clamp-2 leading-tight mb-1">{slide.title}</h3>
                                                    <div className={`text-xs font-semibold text-white px-2 py-0.5 rounded inline-block ${slide.categoryClass}`}>
                                                        {slide.category}
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-gray-500">
                                                    <Clock size={10} className="mr-1" />
                                                    <span className="text-xs">{slide.date}</span>
                                                </div>
                                                <div className="mt-2">
                                                    <a
                                                        href="/haberlerdetay"
                                                        className="flex items-center text-blue-600 hover:underline text-xs font-medium transition"
                                                        onClick={e => e.stopPropagation()}
                                                    >
                                                        {/* "i" ikonunun noktası olan versiyonu */}
                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <line x1="12" y1="16" x2="12" y2="12" />
                                                            <circle cx="12" cy="8" r="1.2" />
                                                        </svg>
                                                        Detaylı Bilgi
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <style>{`::-webkit-scrollbar { display: none; }`}</style>
                    </div>

                    {/* AnnouncementsSlider bileşeni */}
                    <div className="mt-2 mb-8"> {/* mt-4'ten mt-2'ye düşürüldü */}
                        <AnnouncementsSlider />
                    </div>

                    {/* NewsPage Component */}
                    <div className={`${isMobile ? 'w-full px-4 pt-0 pb-4' : 'max-w-full mx-auto pt-0 pb-8'}`}>
                        {/* Kategori Başlıkları - sağa yaslı */}
                        {isMobile ? (
                            <div className="mb-4 overflow-x-auto pb-2">
                                <div className="flex w-max gap-2 pl-4 justify-end">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setActiveCategory(category)}
                                            className={`relative px-3 py-1.5 text-xs font-semibold rounded-full border whitespace-nowrap transition-all duration-300
                                                ${
                                                activeCategory === category
                                                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-transparent shadow-md"
                                                    : "bg-gray-50 text-gray-800 border-gray-300 hover:bg-gray-100"
                                            }
                                            `}
                                        >
                                            <span className="z-10 relative">{category}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-3 mb-6 justify-end mr-4">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={`relative px-4 py-2 text-sm font-semibold rounded-full border transition-all duration-300
                                            ${
                                            activeCategory === category
                                                ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-transparent shadow-md scale-105"
                                                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 hover:shadow-sm"
                                        }
                                        `}
                                    >
                                        <span className="z-10 relative">{category}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                        <br/>

                        {/* Haber Kartları */}
                        <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'}`}>
                            <AnimatePresence mode="wait">
                                {paginatedNews.map((news) => (
                                    <motion.div
                                        key={news.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -30 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        layout
                                        className="bg-gray-50 rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full cursor-pointer"
                                    >
                                        {isMobile ? (
                                            <div className="w-full relative pt-[56.25%]">
                                                <img
                                                    src={news.image}
                                                    alt={news.title}
                                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-full h-48 overflow-hidden">
                                                <img
                                                    src={news.image}
                                                    alt={news.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <div className={`${isMobile ? 'p-3' : 'p-4'} flex flex-col justify-between flex-grow`}>
                                            <h2 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-gray-800 ${isMobile ? 'line-clamp-2' : ''}`}>
                                                {news.title}
                                            </h2>
                                            <p className={`text-gray-600 mt-2 ${isMobile ? 'text-xs line-clamp-3' : 'text-sm'} flex-grow`}>
                                                {news.description}
                                            </p>
                                            <div className="mt-4">
                                                <a
                                                    href="/haberlerdetay"
                                                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium transition"
                                                    onClick={e => e.stopPropagation()}
                                                >
                                                    Detaylı Bilgi
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-6 gap-2">
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
}