import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllHaberlerTariheGore } from "../Haberler/haberlerService";
import { getAllDuyurular } from "../Haberler/duyuruService";
import { getAllKategoriler } from "../Haberler/kategoriService.ts";
import { ProjeService, Proje } from "../Haberler/ProjeService";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function HomePage() {
    const navigate = useNavigate();
    // State for API data
    const [news, setNews] = useState<any[]>([]);
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [categories, setCategories] = useState<string[]>(["Tümü"]);
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 3;
    const totalPages = Math.ceil(news.length / newsPerPage);
    const paginatedNews = news.slice((currentPage - 1) * newsPerPage, currentPage * newsPerPage);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("Tümü");



    // ETKINLIKLER
    const [events, setEvents] = useState<any[]>([]);
    const [currentEventPage, setCurrentEventPage] = useState(1);
    const eventsPerPage = 4;

    useEffect(() => {
        fetch("http://localhost:8080/api/etkinlikler")
            .then(res => res.json())
            .then(data => {
                // Map backend fields to frontend fields
                const mapped = (Array.isArray(data) ? data : []).map(event => ({
                    id: event.id,
                    image: event.resimUrl,
                    title: event.baslik,
                    time: event.tarih?.split("T")[1]?.substring(0,5) || "", // or format as needed
                    location: event.aciklama,
                    date: event.tarih?.split("T")[0] || "",
                }));
                setEvents(mapped);
            });
    }, []);

    const totalEventPages = Math.ceil(events.length / eventsPerPage);
    const paginatedEvents = events.slice(
        (currentEventPage - 1) * eventsPerPage,
        currentEventPage * eventsPerPage
    );

    useEffect(() => {
        getAllHaberlerTariheGore().then(data => {
            // Map API data to match your card structure
            setNews(
                data.slice(0, 24).map((item: any) => ({
                    id: item.id,
                    title: item.baslik,
                    image: item.resim1 || "/images/default-news.jpg",
                    date: item.tarih // Format if needed
                }))
            );
        });
        getAllDuyurular().then(data => {
            setAnnouncements(
                data.slice(0, 6).map((item: any) => ({
                    id: item.id,
                    title: item.baslik,
                    date: item.tarih // Format if needed
                }))
            );
        });
        getAllKategoriler()
            .then((data) => {
                console.log('getAllKategoriler response:', data);
                if (Array.isArray(data)) {
                    const kategoriNames = data.map((k: any) => k.ad).filter(Boolean);
                    setCategories(["Tümü", ...kategoriNames]);
                }
            })


    }, []);


    // Slider news
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

// After fetching news, update the slider
    useEffect(() => {
        if (slider.current) {
            setTimeout(() => slider.current?.update(), 100);
        }
    }, [news, slider]);

    const newsToShow = news.slice(0, 24);
    // 3. Auto-slide effect
    useEffect(() => {
        if (!slider.current) return;
        const interval = setInterval(() => {
            slider.current?.next();
        }, 4000); // 4 seconds
        return () => clearInterval(interval);
    }, [slider]);
    const slidesCount = newsToShow.length;

    /*
    const news = [
        {
            id: 1,
            title: "Başkan Büyükgöz Koltuğu Sultana Devretti",
            image: "/images/Haberler/habergörselleri/cevretemizligeridönüsüm/cevre1.jpg",
            date: "23 Nisan 2025"
        },
        {
            id: 2,
            title: "41 Genç`i başarılı öğrencileri Başkan Büyükgöz`e konuk oldu",
            image: "/images/Haberler/habergörselleri/egitimvegenclik/egitim1.jpg",
            date: "10 Nisan 2025"
        },
        {
            id: 3,
            title: "Başkan Büyükgöz Koltuğu Sultana Devretti",
            image: "/images/Haberler/habergörselleri/projelervealtyapicalismalari/calismalar.jpg",
            date: "23 Nisan 2024"
        }
    ];
*/
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

    /*
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
*/

        const discoverCategories = [
            {
                id: 1,
                title: "GEBZE'Yİ KEŞFET",
                image: "/images/gebze/fotoğraflarlagebze/2.JPG",
                slug: "gebze/bugunkugebze",
                category: "Kültür-Sanat"
            },
            {
                id: 2,
                title: "GEZECEK",
                image: "/images/gebze/fotoğraflarlagebze/IMG_8201.JPG",
                slug: "gebze/tarihiyerler",
                category: "Tarih"

            },
            {
                id: 3,
                title: "MÜZELER",
                image: "/images/gebze/360sanaltur/9.jpg",
                slug: "gebze/tarihiyerler",
                category: "Tarih"
            },
            {
                id: 4,
                title: "ROTALAR",
                image: "/images/gebze/360sanaltur/1.jpg",
                slug: "gebze/360sanaltur",
                category: "Kültür-Sanat"
            },
            {
                id: 5,
                title: "ORMANLAR",
                image: "/images/gebze/360sanaltur/6.jpg",
                slug: "gebze/tarihiyerler",
                category: "Doğa"
            }
        ];
    // Filtered categories for display
    const filteredCategories = selectedCategory === "Tümü"
        ? discoverCategories
        : discoverCategories.filter(cat => cat.category === selectedCategory);



    const [projects, setProjects] = useState<Proje[]>([]);
    const [projectCategories, setProjectCategories] = useState<string[]>([]);
    const [selectedProjectCategory, setSelectedProjectCategory] = useState<string>("Tümü");

    useEffect(() => {
        ProjeService.getAllProjeler()
            .then(data => {
                setProjects(data);
                // Extract unique categories from 'durumu' field
                const uniqueCats = Array.from(new Set(data.map((p: Proje) => p.durumu)));
                setProjectCategories(["Tümü", ...uniqueCats]);
            })
            .catch(error => {
                console.error("Error fetching projects:", error);
            });
    }, []);

    const filteredProjects = selectedProjectCategory === "Tümü"
        ? projects
        : projects.filter(p => p.durumu === selectedProjectCategory);

    const uniqueCategories = Array.from(
        new Set(discoverCategories.map(cat => cat.category))
    );

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
                    <div ref={sliderRef} className="keen-slider">
                        {newsToShow.map(item => (
                            <div key={item.id} className="keen-slider__slide bg-white rounded-lg shadow overflow-hidden">
                                <img src={item.image} alt={item.title} className="w-full h-40 sm:h-48 object-cover" />
                                <div className="p-3 sm:p-4">
                                    <h3 className="font-bold text-base sm:text-lg mb-2">{item.title}</h3>
                                    <p className="text-xs sm:text-sm text-gray-500">{item.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-4 gap-2">
                        <button
                            className="size-10 bg-white ring-1 ring-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                            onClick={() => slider.current?.prev()}
                            aria-label="Previous"
                        >
                            <FiChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            className="size-10 bg-white ring-1 ring-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                            onClick={() => slider.current?.next()}
                            aria-label="Next"
                        >
                            <FiChevronRight className="w-5 h-5" />
                        </button>

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
                            <h2 className="text-lg sm:text-xl font-bold text-blue-800">GEBZE'DE ETKİNLİKLER</h2>
                            <a
                                href="#"
                                className="text-xs sm:text-sm text-blue-500 hover:underline"
                                onClick={e => { e.preventDefault(); navigate("/etkinlikler"); }}
                            >
                                Tüm Etkinlikler
                            </a>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            {paginatedEvents.map(event => (
                                <div key={event.id} className="bg-white rounded-lg shadow overflow-hidden">
                                    <img src={event.image} alt={event.title} className="w-full h-32 sm:h-40 object-cover" />
                                    <div className="p-3 sm:p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="bg-blue-100 text-blue-800 text-center py-1 px-2 sm:px-3 rounded-lg">
                                                <div className="font-bold text-base sm:text-lg">{event.date}</div>
                                            </div>
                                            <span className="text-xs sm:text-sm text-blue-500">{event.time}</span>
                                        </div>
                                        <h3 className="font-bold mb-1 text-sm sm:text-base">{event.title}</h3>
                                        <p className="text-[10px] sm:text-xs text-gray-500">{event.location}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {totalEventPages > 1 && (
                            <div className="flex justify-center mt-6 gap-2">
                                <button
                                    onClick={() => setCurrentEventPage(p => Math.max(1, p - 1))}
                                    disabled={currentEventPage === 1}
                                    className={`px-3 py-1 rounded ${currentEventPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white border hover:bg-gray-100'}`}
                                >
                                    &lt;
                                </button>
                                {Array.from({ length: totalEventPages }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setCurrentEventPage(i + 1)}
                                        className={`px-3 py-1 rounded font-semibold ${currentEventPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white border hover:bg-gray-100'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentEventPage(p => Math.min(totalEventPages, p + 1))}
                                    disabled={currentEventPage === totalEventPages}
                                    className={`px-3 py-1 rounded ${currentEventPage === totalEventPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white border hover:bg-gray-100'}`}
                                >
                                    &gt;
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* Discover Section */}
                <section className="bg-gray-100 py-8 sm:py-12">
                    <div className="max-w-6xl mx-auto px-2 sm:px-4">
                        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-2">
                            <h2 className="text-lg sm:text-xl font-bold text-blue-800">GEBZE'Yİ KEŞFET</h2>
                            <div className="flex flex-wrap gap-2">
                                {["Tümü", ...uniqueCategories].map(category => (
                                    <button
                                        key={category}
                                        className={`
                                            px-3 sm:px-4 py-1.5 rounded-full border font-semibold shadow-sm transition-all duration-200
                                            ${selectedCategory === category
                                                ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white border-blue-600 scale-105 ring-2 ring-blue-200 shadow-md'
                                                : 'bg-white text-blue-800 border-blue-300 hover:bg-blue-50 hover:border-blue-400 hover:shadow'}
                                            focus:outline-none focus:ring-2 focus:ring-blue-300
                                        `}
                                        style={{
                                            letterSpacing: "0.02em",
                                            minWidth: 80,
                                        }}
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 h-fit">
                            {filteredCategories.length > 0 && (
                                <>
                                    {/* Large left image */}
                                    <div className="relative md:col-span-1 md:row-span-2">
                                        <div className="relative rounded-lg overflow-hidden h-50 sm:h-86 md:h-86" onClick={() => navigate(`/${filteredCategories[0].slug}`)}>
                                            <img src={filteredCategories[0].image} alt={filteredCategories[0].title} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 sm:p-6">
                                                <h3 className="text-white font-bold text-lg sm:text-xl">{filteredCategories[0].title}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Right grid for the rest */}
                                    <div className="md:col-span-2 grid grid-cols-2 gap-4 sm:gap-6">
                                        {filteredCategories.slice(1).map(category => (
                                            <div key={category.id} className="relative rounded-lg overflow-hidden h-50 sm:h-40 md:h-40 lg:h-40" onClick={() => navigate(`/${category.slug}`)}>
                                                <img src={category.image} alt={category.title} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2 sm:p-4">
                                                    <h3 className="text-white font-bold text-xs sm:text-base">{category.title}</h3>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section className="bg-gray-50 py-8 sm:py-12">
                    <div className="max-w-6xl mx-auto px-2 sm:px-4">
                        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-2">
                            <h2 className="text-lg sm:text-xl font-bold text-blue-800">PROJELER</h2>
                            <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                                {projectCategories.map((category) => (
                                    <button
                                        key={category}
                                        className={`
                                            px-3 sm:px-4 py-1.5 rounded-full border font-semibold shadow-sm transition-all duration-200
                                            ${selectedProjectCategory === category
                                                ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white border-blue-600 scale-105 ring-2 ring-blue-200 shadow-md'
                                                : 'bg-white text-blue-800 border-blue-300 hover:bg-blue-50 hover:border-blue-400 hover:shadow'}
                                            focus:outline-none focus:ring-2 focus:ring-blue-300
                                        `}
                                        style={{
                                            letterSpacing: "0.02em",
                                            minWidth: 80,
                                        }}
                                        onClick={() => setSelectedProjectCategory(category)}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                            {filteredProjects.map(project => (
                                <div key={project.id} className="bg-white rounded-lg shadow overflow-hidden">
                                    <img src={project.resimUrl} alt={project.baslik} className="w-full h-28 sm:h-36 object-cover" />
                                    <div className="p-2 sm:p-3">
                                        <h3 className="font-bold text-xs sm:text-sm">{project.baslik}</h3>
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