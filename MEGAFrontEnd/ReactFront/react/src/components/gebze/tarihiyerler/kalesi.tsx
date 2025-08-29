import {MapPin, ChevronRight, ChevronLeft, X} from "lucide-react";
import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

const EskihisarKalesiPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImage, setLightboxImage] = useState(0);

    // Gallery images
    const galleryImages = [
        {id: 1, path: "/images/gebze/tarihiyerler/kale/sub1.JPG", alt: "EskihisarKalesi görünüm 1"},
        {id: 2, path: "/images/gebze/tarihiyerler/kale/sub2.JPG", alt: "EskihisarKalesi görünüm 2"},
        {id: 3, path: "/images/gebze/tarihiyerler/kale/sub3.JPG", alt: "EskihisarKalesi görünüm 3"},
        {id: 4, path: "/images/gebze/tarihiyerler/kale/sub4.JPG", alt: "EskihisarKalesi görünüm 4"}
    ];

    // Lightbox functions
    const openLightbox = ({index}) => {
        setLightboxImage(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const nextLightboxImage = () => {
        setLightboxImage((prev) => (prev + 1) % galleryImages.length);
    };

    const prevLightboxImage = () => {
        setLightboxImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    // Diğer Tarihi Yerler için veri
    const otherPlaces = [
        { name: "ESKİHİSAR KALESİ", imagePath: "/images/gebze/tarihiyerler/kale/7.JPG", route: "/gebze/tarihiyerler/eskihisarkalesi" },
        { name: "ANİBALIN MEZARI", imagePath: "/images/gebze/tarihiyerler/anibal/1.JPG", route: "/gebze/tarihiyerler/anibalinmezari" },
        { name: "ÇOBAN MUSTAFA PAŞA KÜLLİYESİ", imagePath: "/images/gebze/tarihiyerler/külliye/3.JPG", route: "/gebze/tarihiyerler/cobanmustafapasakulliyesi" },
        { name: "HÜNKAR ÇAYIRI", imagePath: "/images/gebze/tarihiyerler/hünkar/8.JPG", route: "/gebze/tarihiyerler/hunkarcayiri" },
        { name: "OSMAN HAMDİ BEY YALISI", imagePath: "/images/gebze/tarihiyerler/yalı/11.JPG", route: "/gebze/tarihiyerler/osmanhamdibeyyalisi" },
        { name: "ÇOBAN MUSTAFA PAŞA HAMAMI", imagePath: "/images/gebze/tarihiyerler/hamam/4.JPG", route: "/gebze/tarihiyerler/cobanmustafapasahamami" },
        { name: "BALLIKAYALAR", imagePath: "/images/gebze/tarihiyerler/ballikayalar/sub1.jpg", route: "/gebze/tarihiyerler/ballikayalar" },
        { name: "ÇOBAN MUSTAFA PAŞA ŞADIRVANI", imagePath: "/images/gebze/tarihiyerler/sadirvan/5.JPG", route: "/gebze/tarihiyerler/cobanmustafapasasadirvani" },
        { name: "ESKİHİSAR ÇEŞMESİ", imagePath: "/images/gebze/tarihiyerler/eskihisarcesme/6.jpg", route: "/gebze/tarihiyerler/eskihisarcesmesi" },
        { name: "İLYAS BEY CAMİİ", imagePath: "/images/gebze/tarihiyerler/ilyasbeycamii/9.JPG", route: "/gebze/tarihiyerler/ilyasbeycamii" },
        { name: "İBRAHİM PAŞA ÇEŞMESİ", imagePath: "/images/gebze/tarihiyerler/ibrahimpasacamii/2.JPG", route: "/gebze/tarihiyerler/ibrahimpasacesmesi" },
        { name: "SULTAN ORHAN CAMİİ", imagePath: "/images/gebze/tarihiyerler/sultanorhancami/12.jpg", route: "/gebze/tarihiyerler/sultanorhancamii" }
    ];

    // Slider için otomatik geçiş
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => {
                if (prev + 4 < otherPlaces.length) {
                    return prev + 1;
                } else {
                    return 0;
                }
            });
        }, 5000); // 5 saniyede bir

        return () => clearInterval(interval); // Temizlik
    }, []);

    const nextSlide = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCurrentIndex(prev => {
                const nextIndex = (prev + 1) % otherPlaces.length;
                return nextIndex;
            });
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0 && !isAnimating) {
            setIsAnimating(true);
            setCurrentIndex(prev => prev - 1);
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    // Görüntülenecek kartlar (her seferinde 4 kart)
    const visiblePlaces = () => {
        const places = [];
        for (let i = 0; i < 4; i++) {
            places.push(otherPlaces[(currentIndex + i) % otherPlaces.length]);
        }
        return places;
    };

    // Keyboard events for lightbox
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!lightboxOpen) return;

            switch (e.key) {
                case "ArrowRight":
                    nextLightboxImage();
                    break;
                case "ArrowLeft":
                    prevLightboxImage();
                    break;
                case "Escape":
                    closeLightbox();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [lightboxOpen]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="container mx-auto relative h-[500px] max-w-6xl mt-6">
                <div className="absolute inset-0 z-10" />
                <img
                    src="/images/gebze/tarihiyerler/kale/7.JPG"
                    alt="EskihisarKalesi"
                    className="h-full w-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
                    <h1 className="text-4xl md:text-5xl bg-[#022842]/60 font-bold text-white mb-4 rounded-xl px-2 py-2 inline-block">ESKİHİSAR KALESİ</h1>
                    <div className="flex items-center text-white bg-[#022842] px-4 py-2 rounded-full">
                        <MapPin className="w-5 h-5 mr-2" />
                        <span>Gebze, Kocaeli</span>
                    </div>
                </div>
            </div><br/>

            {/* Content Section */}
            <div className="container mx-auto px-3 py-9">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-2/3">
                                <h2 className="text-2xl font-bold text-blue-800 mb-4">Tarihçe ve Genel Bilgi</h2>
                                <div className="prose max-w-none text-gray-700">
                                    <p className="mb-4 text-justify">
                                        Eskihisar Kalesi, Kocaeli'nin Gebze ilçesine bağlı Eskihisar Mahallesi'nde, İzmit Körfezi'ne hâkim bir tepe üzerine kurulmuş tarihi bir yapıdır. Yapımının 12. yüzyıla, Bizans İmparatoru I. Manuel Komnenos dönemine dayandığı düşünülmektedir. Kale, antik çağda "Niketiaton" olarak bilinen liman kentini ve deniz geçişlerini korumak amacıyla inşa edilmiştir.

                                        Osmanlı döneminde de önemini sürdüren kale, 1998 yılında restore edilerek ziyarete açılmıştır. Dikdörtgen planlı yapının içinde 10 adet burç ve 4 adet kapı bulunmaktadır. Hem tarihî hem de doğal güzelliğiyle dikkat çeken Eskihisar Kalesi, İzmit Körfezi'ne karşı sunduğu panoramik manzara ile öne çıkar.
                                    </p>
                                </div>

                                <div className="mt-8">
                                    <h2 className="text-2xl font-bold text-blue-800 mb-4">Aktiviteler</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <h3 className="text-lg font-semibold text-blue-700 mb-2">🌅 Manzara İzleme </h3>
                                            <p className="text-gray-700 text-justify">
                                                Sessiz ve huzurlu ortamda namaz kılabilir, manevi bir atmosferde zaman geçirebilirsiniz.
                                            </p>
                                        </div>
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <h3 className="text-lg font-semibold text-blue-700 mb-2">🧭 Tarihi Gezi</h3>
                                            <p className="text-gray-700 text-justify">
                                                Kaleyi ve burçlarını gezerek Bizans ve Osmanlı dönemine ait izleri yakından inceleyebilirsiniz.
                                            </p>
                                        </div>
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <h3 className="text-lg font-semibold text-blue-700 mb-2">📸 Fotoğrafçılık</h3>
                                            <p className="text-gray-700 text-justify">
                                                Kale surları, burçlar ve İzmit Körfezi manzarası eşliğinde harika kareler yakalayabilirsiniz.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="md:w-1/3">
                                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                                    <h3 className="text-xl font-bold text-blue-800 mb-4">🚗 Nasıl Gidilir?</h3>
                                    <p className="text-gray-700 mb-4 text-justify">
                                        Gebze merkezinden hareket eden 411 ve 416 numaralı otobüslerle ulaşım sağlanabilir.

                                        D-100 Karayolu (E-5) veya TEM Otoyolu üzerinden Eskihisar-Feribot tabelaları takip edilerek ulaşılabilir.
                                    </p>
                                    <a
                                        href="https://www.google.com/maps/place/Eskihisar,+Eskihisar+Kalesi,+41400+Gebze%2FKocaeli/@40.7720178,29.431508,628m/data=!3m2!1e3!4b1!4m6!3m5!1s0x14cb2012246f1bdf:0x210fd52d96efc378!8m2!3d40.7720178!4d29.431508!16s%2Fg%2F11byl6ys8g?entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoASAFQAw%3D%3D"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center bg-blue-600 text-black px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        <MapPin className="w-5 h-5 mr-2" />
                                        Haritada Gör
                                    </a>
                                </div>

                                {/* Enhanced Gallery Section */}
                                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                                        <span className="mr-2">🖼️</span>
                                        <span>Galeri</span>
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {galleryImages.map((item, index) => (
                                            <div
                                                key={item.id}
                                                className="aspect-square overflow-hidden rounded-lg cursor-pointer relative group"
                                                onClick={() => openLightbox({index: index})}
                                            >
                                                <img
                                                    src={item.path}
                                                    alt={item.alt}
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                                    <div className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300">
                                                        <div className="bg-white bg-opacity-80 rounded-full p-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-center mt-3">
                                        <button
                                            onClick={() => openLightbox({index: 0})}
                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                        >
                                            Tüm resimleri görüntüle
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Other Places Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">DİĞER TARİHİ YERLER</h2>

                    <div className="relative">
                        {/* Navigation Buttons */}
                        <button
                            onClick={prevSlide}
                            className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 disabled:opacity-50"
                            aria-label="Önceki"
                            disabled={isAnimating}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {/* Slider Container */}
                        <div className="overflow-hidden">
                            <div
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2"
                            >
                                {visiblePlaces().map((place, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col"
                                    >
                                        {/* Resim alanı */}
                                        <div className="h-55 overflow-hidden">
                                            <img
                                                src={place.imagePath}
                                                alt={place.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>

                                        {/* İçerik alanı */}
                                        <div className="p-4 flex flex-col items-center justify-center text-center flex-grow">
                                            <h3 className="text-lg font-semibold mb-4">{place.name}</h3>
                                            <a
                                                href={place.route}
                                                className="text-blue-600 hover:text-blue-800 inline-flex items-center text-sm"
                                            >
                                                Detaylı bilgi
                                                <ChevronRight className="w-4 h-4 ml-1" />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={nextSlide}
                            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 disabled:opacity-50"
                            aria-label="Sonraki"
                            disabled={isAnimating}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center space-x-2 mt-6">
                        {Array.from({ length: Math.ceil(otherPlaces.length / 4) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    if (!isAnimating) {
                                        setIsAnimating(true);
                                        setCurrentIndex(index * 4);
                                        setTimeout(() => setIsAnimating(false), 500);
                                    }
                                }}
                                className={`h-2 rounded-full transition-all ${
                                    Math.floor(currentIndex / 4) === index ? 'w-6 bg-blue-600' : 'w-2 bg-gray-300'
                                }`}
                                aria-label={`Sayfa ${index + 1}`}
                                disabled={isAnimating}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
                <div className="fixed inset-0 bg-[#022842]/60 bg-opacity-90 z-50 flex items-center justify-center">
                    <div className="absolute top-4 right-4 z-10 flex space-x-2">
                        <button
                            onClick={closeLightbox}
                            className="text-black p-2 rounded-full bg-white bg-opacity-50 hover:bg-opacity-70 transition-all"
                            aria-label="Kapat"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <button
                        onClick={prevLightboxImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-3 rounded-full text-black hover:bg-opacity-70 transition-all"
                        aria-label="Önceki"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <div className="max-w-4xl max-h-[80vh] relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={lightboxImage}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="relative"
                            >
                                <img
                                    src={galleryImages[lightboxImage].path}
                                    alt={galleryImages[lightboxImage].alt}
                                    className="max-w-full max-h-[80vh] object-contain mx-auto"
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <button
                        onClick={nextLightboxImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-3 rounded-full text-black hover:bg-opacity-70 transition-all"
                        aria-label="Sonraki"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default EskihisarKalesiPage;