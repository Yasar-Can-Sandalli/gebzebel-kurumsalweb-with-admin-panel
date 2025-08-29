import {useRef, useEffect, useCallback, useState} from "react";
import {Clock, Edit} from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";
import {useKeenSlider} from 'keen-slider/react';
import "keen-slider/keen-slider.min.css";
import {useNavigate} from "react-router-dom";
import {getAllDuyurular} from "./duyuruService.ts"
import { getAllHaberlerTariheGore} from "./haberlerService.ts"; // adjust the path as needed
import {getAllKategoriler} from "./kategoriService.ts";
import {
    Megaphone,
    CalendarDays,
    Info,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import {Link} from "react-router-dom";

// Define the Haberler interface
interface Haberler {
    id: number;
    baslik: string;
    tarih: string;
    aciklama: string;
    resim1?: string;
    resim2?: string | null;
    kategori: {
        id: number;
        ad: string;
    } | null;
}

function AnnouncementsSlider() {
    const [duyurular, setDuyurular] = useState<Duyurular[]>([]);
    const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
        loop: true,
        slides: {
            perView: 3,
            spacing: 16,
        },
        breakpoints: {
            "(max-width: 1024px)": {
                slides: {perView: 1, spacing: 12},
            },
            "(max-width: 640px)": {
                slides: {perView: 1, spacing: 8},
            },
        },
    });
    // Fetch duyurular from backend
    useEffect(() => {
        const fetchDuyurular = async () => {
            try {
                const data = await getAllDuyurular();
                setDuyurular(Array.isArray(data) ? data : []);
                setTimeout(() => slider.current?.update(), 100); // Force keen-slider to recalc after data loads
            } catch (error) {
                console.error("Error fetching duyurular:", error);
            }
        };
        fetchDuyurular();
    }, []);
    // Fix keen-slider width bug on resize/tab switch
    useEffect(() => {
        const handleResize = () => slider.current?.update();
        window.addEventListener('resize', handleResize);
        window.addEventListener('visibilitychange', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('visibilitychange', handleResize);
        };
    }, [slider]);
    // Otomatik döndürme
    useEffect(() => {
        if (!duyurular || duyurular.length === 0) return;
        const interval = setInterval(() => {
            if (slider.current && slider.current.track && slider.current.track.details) {
                slider.current.next();
            }
        }, 4000);
        return () => clearInterval(interval);
    }, [slider, duyurular]);
    const navigate = useNavigate();
    const handleViewAllAnnouncements = () => {
        navigate('/duyuru');
    };
    interface Duyurular {
        id: number;
        baslik: string;
        ozet: string;
        tarih: string;
        kategori: { id: number; ad: string } | null;
        onemli: number;
    }
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
                                <ChevronLeft className="w-5 h-5 text-gray-600"/>
                            </button>
                            <button
                                onClick={() => slider.current?.next()}
                                className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
                            >
                                <ChevronRight className="w-5 h-5 text-gray-600"/>
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={handleViewAllAnnouncements}
                        className="px-5 py-2.5 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 transition shadow-md flex items-center gap-2 text-base font-medium"
                    >
                        <span>Tüm Duyurular</span>
                        <ChevronRight className="w-5 h-5"/>
                    </button>
                </div>
                {/* Slider */}
                <div ref={sliderRef} className="keen-slider">
                    {duyurular.map((item: Duyurular) => (
                        <div
                            key={item.id}
                            className="keen-slider__slide bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Megaphone className="text-blue-600 w-5 h-5"/>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {item.baslik}
                                </h3>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mb-3">
                                <CalendarDays className="w-4 h-4 mr-1"/>
                                <span>{item.tarih}</span>
                            </div>
                            <p className="text-gray-700 mb-4 text-sm">{item.ozet}</p>
                            <div className="flex items-center text-sm text-gray-500 mb-3">
                                <span className="font-medium">{item.kategori ? item.kategori.ad : 'Kategorisiz'}</span>                                {item.onemli > 0 && (
                                    <span className="ml-2 text-red-600 font-semibold">Önemli!</span>
                                )}
                            </div>
                            <Link
                                to={`/haberdetay/${item.id}`}
                                className="flex items-center text-blue-600 hover:underline text-sm font-medium"
                            >
                                <Info className="w-4 h-4 mr-1"/>
                                Ayrıntılı Bilgi
                            </Link>
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

    // Slider refs and logic
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const slideWidth = 380 + 16; // Card width + gap
    const visibleSlides = 3; // Show 3 cards at once
    const scrollAmount = slideWidth * visibleSlides;

    // NewsPage component state
    const [activeCategory, setActiveCategory] = useState("Tümü");
    const [isMobile, setIsMobile] = useState(false);
    const [haberlerList, setHaberlerList] = useState<Haberler[]>([]);
    const [categories, setCategories] = useState<string[]>(["Tümü"]);

    // Pagination için state
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 6;
    const maxPages = 5;


    // Fetch haberler from backend
    useEffect(() => {
        getAllHaberlerTariheGore()
            .then((data) => {
                console.log('getAllHaberler By Tarih response:', data);
                setHaberlerList(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                console.error("Failed to fetch haberler:", err);
                setHaberlerList([]); // Ensure it's always an array on error
            });
    }, []);

    // Fetch kategoriler from backend
    useEffect(() => {
        getAllKategoriler()
            .then((data) => {
                console.log('getAllKategoriler response:', data);
                if (Array.isArray(data)) {
                    const kategoriNames = data.map((k: any) => k.ad).filter(Boolean);
                    setCategories(["Tümü", ...kategoriNames]);
                }
            })
            .catch((err) => console.error("Failed to fetch kategoriler:", err));
    }, []);

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
        const initialScroll = Math.floor(haberlerList.length / 2) * slideWidth;
        slider.scrollLeft = initialScroll;

        const handleScroll = () => {
            if (!slider) return;

            if (slider.scrollLeft <= 0) {
                slider.scrollLeft = haberlerList.length * slideWidth;
            } else if (slider.scrollLeft >= slideWidth * haberlerList.length * 2) {
                slider.scrollLeft = haberlerList.length * slideWidth;
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

        if (newScrollLeft >= slideWidth * haberlerList.length * 3) {
            // Reset to start invisibly
            slider.scrollLeft = slideWidth * haberlerList.length;
            slider.scrollTo({
                left: slider.scrollLeft + amount,
                behavior: 'smooth'
            });
        } else if (newScrollLeft <= 0) {
            // Reset to end invisibly
            slider.scrollLeft = slideWidth * haberlerList.length * 2;
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
    }, [haberlerList.length, slideWidth]);

    // Auto-scroll interval
    useInterval(() => {
        if (sliderRef.current && !isMouseOver.current) {
            scrollByAmount(scrollAmount);
        }
    }, 4000); // 5000ms'den 4000ms'ye değiştirildi

    // Filter news by category
    const filteredNews =
        activeCategory === "Tümü"
            ? haberlerList
            : haberlerList.filter((haber) => haber.kategori?.ad === activeCategory);

    // Prepare heroPost and featuredArticles from filteredNews (not all news)
    const heroPost = filteredNews[0]
        ? {
            id: filteredNews[0].id,
            image: filteredNews[0].resim1 || filteredNews[0].resim2 || '',
            category: filteredNews[0].kategori?.ad || 'Kategorisiz',  // Extract just the category name
            categoryClass: "bg-blue-600",
            title: filteredNews[0].baslik,
            date: filteredNews[0].tarih,
        }
        : null;

    const featuredArticles = filteredNews.slice(1, 4).map((haber, idx) => ({
        id: haber.id,
        image: haber.resim1 || haber.resim2 || '',
        category: haber.kategori?.ad || 'Kategorisiz',  // Extract just the category name
        categoryClass: idx === 0 ? "bg-yellow-500" : "bg-blue-600",
        title: haber.baslik,
        date: haber.tarih,
    }));

    // Prepare slides for the slider from filteredNews (or use a fallback if empty)
    const slides = Array.isArray(filteredNews) ? filteredNews.slice(0, 10).map((haber) => ({
        id: haber.id,
        image: haber.resim1 || haber.resim2,
        title: haber.baslik,
        category: haber.kategori,
        categoryClass: "bg-blue-600",
        date: haber.tarih,
    })) : [];

    // Pagination hesaplamaları
    const totalPages = Math.min(
        Math.ceil(filteredNews.length / newsPerPage),
        maxPages
    );
    const paginatedNews = filteredNews.slice(
        (currentPage - 1) * newsPerPage,
        currentPage * newsPerPage
    );


    const renderHeroCard = (article: Article) => (
        <div className="relative overflow-hidden rounded h-full w-full">
            <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover rounded-lg"
            />
            <div
                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                <div
                    className={`inline-block px-4 py-1 text-sm font-bold text-white rounded mb-3 ${article.categoryClass}`}>
                    {article.category}
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                    <a href="#" className="hover:underline">{article.title}</a>
                </h2>
                <div className="flex items-center text-white text-sm">
                    <div className="flex items-center mr-4">
                        <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        <span>{article.date}</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderMainArticle = (article: Article) => (
        <div className="relative overflow-hidden rounded h-full w-full">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover"/>
            <div
                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                <div
                    className={`inline-block px-4 py-1 text-sm font-bold text-white rounded mb-3 ${article.categoryClass}`}>
                    {article.category}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                    <a href="#" className="hover:underline">{article.title}</a>
                </h3>
                <div className="flex items-center text-white text-sm">
                    <div className="flex items-center mr-4">
                        <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
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
        category: string;  // Keep this as string since we'll format it before passing
        categoryClass: string;
        title: string;
        date: string;
        author?: string;
        authorImage?: string;
    }

    const renderSmallArticle = (article: Partial<Article> & Required<Pick<Article, 'id' | 'image' | 'category' | 'categoryClass' | 'title'>>, categoryClass: string) => (
        <div className="relative overflow-hidden rounded h-full w-full">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover"/>
            <div
                className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
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

    // News Slider Section with Duyurular Button - Full width
    const [newsSliderRef, newsSlider] = useKeenSlider<HTMLDivElement>({
        loop: true,
        slides: {
            perView: 3,
            spacing: 16,
        },
        breakpoints: {
            "(max-width: 1024px)": {
                slides: {perView: 2, spacing: 12},
            },
            "(max-width: 640px)": {
                slides: {perView: 1, spacing: 8},
            },
        },
    });
    useEffect(() => {
        const interval = setInterval(() => {
            newsSlider.current?.next();
        }, 4000);
        return () => clearInterval(interval);
    }, [newsSlider]);

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
                            {heroPost && renderHeroCard(heroPost)}
                        </div>

                        {/* Right side */}
                        <div className="grid grid-rows-[1fr_auto] gap-6">
                            {/* Top square */}
                            <div className="aspect-w-1 aspect-h-11">
                                {featuredArticles[0] ? renderMainArticle(featuredArticles[0]) : null}
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
                    <div className="mb-1">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                                <h2 className="text-3xl font-bold mr-4">Son Haberler</h2>
                                {/* Navigation Buttons */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => newsSlider.current?.prev()}
                                        className="size-10 bg-white ring-1 ring-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                                    >
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                            <path d="M19 12H5" stroke="currentColor" strokeWidth="2"
                                                  strokeLinecap="round"/>
                                            <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2"
                                                  strokeLinecap="round"/>
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => newsSlider.current?.next()}
                                        className="size-10 bg-white ring-1 ring-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                                    >
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                            <path d="M5 12H19" stroke="currentColor" strokeWidth="2"
                                                  strokeLinecap="round"/>
                                            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2"
                                                  strokeLinecap="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Slider container */}
                        {slides.length > 0 && (
                            <div ref={newsSliderRef} className="keen-slider">
                                {slides.map((slide, index) => (
                                    <div
                                        key={slide.id}
                                        className="keen-slider__slide bg-white rounded-xl shadow-md flex border border-gray-200 h-32"
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
                                                <div
                                                    className={`text-xs font-semibold text-white px-2 py-0.5 rounded inline-block ${slide.categoryClass}`}>
                                                    {typeof slide.category === 'object' && slide.category !== null
                                                        ? slide.category.ad
                                                        : typeof slide.category === 'string'
                                                            ? slide.category
                                                            : 'Kategorisiz'}
                                                </div>
                                            </div>
                                            <div className="flex items-center text-gray-500">
                                                <Clock size={10} className="mr-1"/>
                                                <span className="text-xs">{slide.date}</span>
                                            </div>
                                            <div className="mt-2">
                                                <Link
                                                    to={`/haberlerdetay/${slide.id}`}
                                                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium transition"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    Detaylı Bilgi
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* AnnouncementsSlider bileşeni */}
                    <div className="mt-2 mb-8"> {/* mt-4'ten mt-2'ye düşürüldü */}
                        <AnnouncementsSlider/>
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
                        <div
                            className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'}`}>
                            <AnimatePresence mode="wait">
                                {paginatedNews.map((news) => (
                                    <motion.div
                                        key={news.id}
                                        initial={{opacity: 0, y: 30}}
                                        animate={{opacity: 1, y: 0}}
                                        exit={{opacity: 0, y: -30}}
                                        transition={{duration: 0.4, ease: "easeInOut"}}
                                        layout
                                        className="bg-gray-50 rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full cursor-pointer"
                                    >
                                        {isMobile ? (
                                            <div className="w-full relative pt-[56.25%]">
                                                <img
                                                    src={news.resim1 || news.resim2}
                                                    alt={news.baslik}
                                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-full h-48 overflow-hidden">
                                                <img
                                                    src={news.resim1 || news.resim2}
                                                    alt={news.baslik}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <div
                                            className={`${isMobile ? 'p-3' : 'p-4'} flex flex-col justify-between flex-grow`}>
                                            <div className="flex items-center gap-2 mb-2">
                                            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded">
                                                {typeof news.kategori === 'object' && news.kategori !== null
                                                    ? news.kategori.ad
                                                    : typeof news.kategori === 'string'
                                                        ? news.kategori
                                                        : 'Kategorisiz'}
                                            </span></div>
                                            <h2 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-gray-800 ${isMobile ? 'line-clamp-2' : ''}`}>{news.baslik}</h2>
                                            <p className={`text-gray-600 mt-2 ${isMobile ? 'text-xs line-clamp-3' : 'text-sm'} flex-grow`}>
                                                {news.aciklama}
                                            </p>
                                            <div className="mt-4">
                                                <a
                                                    href={`/haberlerdetay/${news.id}`}
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
                                {Array.from({length: totalPages}, (_, i) => (
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
