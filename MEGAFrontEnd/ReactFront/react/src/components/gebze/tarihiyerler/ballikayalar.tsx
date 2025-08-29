import { useState, useEffect } from "react";
import { MapPin, ChevronRight, ChevronLeft, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BallikayalarPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showImageViewer, setShowImageViewer] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const galleryImages = [
        {id: 1, path: "/images/gebze/tarihiyerler/ballikayalar/2.jpg", alt: "Ballıkayalar görünüm 1"},
        {id: 2, path: "/images/gebze/tarihiyerler/ballikayalar/sub2.jpg", alt: "Ballıkayalar görünüm 2"},
        {id: 3, path: "/images/gebze/tarihiyerler/ballikayalar/sub3.jpg", alt: "Ballıkayalar görünüm 3"},
        {id: 4, path: "/images/gebze/tarihiyerler/ballikayalar/sub4.jpg", alt: "Ballıkayalar görünüm 4"}
    ];

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

        return () => clearInterval(interval);
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

    const visiblePlaces = () => {
        const places = [];
        for (let i = 0; i < 4; i++) {
            places.push(otherPlaces[(currentIndex + i) % otherPlaces.length]);
        }
        return places;
    };

    const openImageViewer = (index) => {
        setSelectedImageIndex(index);
        setShowImageViewer(true);
    };

    const closeImageViewer = () => {
        setShowImageViewer(false);
    };

    const nextImage = () => {
        setSelectedImageIndex((prev) => (prev + 1) % galleryImages.length);
    };

    const prevImage = () => {
        setSelectedImageIndex((prev) =>
            prev === 0 ? galleryImages.length - 1 : prev - 1);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                closeImageViewer();
            } else if (e.key === "ArrowRight" && showImageViewer) {
                nextImage();
            } else if (e.key === "ArrowLeft" && showImageViewer) {
                prevImage();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [showImageViewer]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="container mx-auto relative h-[500px] max-w-6xl mt-6">
                <div className="absolute inset-0 z-10" />
                <img
                    src="/images/gebze/tarihiyerler/ballikayalar/sub1.jpg"
                    alt="Ballıkayalar Tabiat Parkı"
                    className="h-full w-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
                    <h1 className="text-4xl md:text-5xl bg-[#022842]/60 font-bold text-white mb-4 rounded-xl px-2 py-2 inline-block">BALLIKAYALAR TABİAT PARKI</h1>
                    <div className="flex items-center text-white bg-[#022842] px-4 py-2 rounded-full">
                        <MapPin className="w-5 h-5 mr-2" />
                        <span>Gebze, Kocaeli</span>
                    </div>
                </div>
            </div><br/>
            <div className="container mx-auto px-3 py-9">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Main Content */}
                    <div className="p-6">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-2/3">
                                <h2 className="text-2xl font-bold text-blue-800 mb-4">Tarihçe ve Genel Bilgi</h2>
                                <div className="prose max-w-none text-gray-700">
                                    <p className="mb-4 text-justify">
                                        Ballıkayalar Vadisi, Kocaeli'nin Gebze ilçesinde yer alan doğal bir hazinedir.
                                        1995 yılında Tabiat Parkı olarak koruma altına alınan bu alan, İstanbul'a yaklaşık
                                        45 km uzaklıkta bulunuyor. Vadi, 1600 metrelik dar bir kanyondan oluşmakta ve
                                        etrafı 100 metreyi aşan yüksek kayalıklarla çevrilidir.
                                    </p>
                                    <p className="mb-4 text-justify">
                                        Ballıkayalar Vadisi, adını bölgedeki kayalıklarda yaşayan yaban arılarının
                                        oluşturduğu bal peteğine benzer yapılardan almıştır. Vadide yer alan
                                        şelaleler ve doğal göletler, ziyaretçilere eşsiz bir doğa deneyimi sunmaktadır.
                                    </p>
                                    <p className="mb-4 text-justify">
                                        Bölge, özellikle kaya tırmanışı meraklıları için önemli bir merkez haline gelmiştir.
                                        Farklı zorluk derecelerinde 100'den fazla tırmanış rotası bulunmaktadır. Ayrıca
                                        doğa yürüyüşü, kamp ve piknik için ideal alanlar içermektedir.
                                    </p>
                                    <p className="text-justify">
                                        Ballıkayalar'ın zengin flora ve faunası da görülmeye değerdir. Bölgede
                                        kızılçam, meşe, defne, kocayemiş gibi ağaçlar ve çeşitli yabani hayvanlar
                                        yaşamaktadır. Özellikle bahar aylarında bölge rengarenk çiçeklerle bezenmektedir.
                                    </p>
                                </div>
                                <div className="mt-8">
                                    <h2 className="text-2xl font-bold text-blue-800 mb-4">Aktiviteler</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <h3 className="text-lg font-semibold text-blue-700 mb-2">🧗‍♂️ Kaya Tırmanışı</h3>
                                            <p className="text-gray-700 text-justify">
                                                Türkiye'nin en önemli kaya tırmanış merkezlerinden biridir. 100+ rotalı kayalıklarda her seviyeye uygun parkurlar bulunur.
                                            </p>
                                        </div>
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <h3 className="text-lg font-semibold text-blue-700 mb-2">🌿 Doğa Yürüyüşü</h3>
                                            <p className="text-gray-700 text-justify">
                                                Vadi boyunca uzanan patikalarda doğa ile başbaşa yürüyüş yapabilirsiniz. İşaretli rotalar güvenli bir deneyim sunar.
                                            </p>
                                        </div>
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <h3 className="text-lg font-semibold text-blue-700 mb-2">🧺 Kamp ve Piknik</h3>
                                            <p className="text-gray-700 text-justify">
                                                Belirlenen alanlarda kamp ve piknik yapabilirsiniz. Temiz hava ve doğal ortamda dinlenme imkanı bulunur.
                                            </p>
                                        </div>
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <h3 className="text-lg font-semibold text-blue-700 mb-2">📸 Fotoğrafçılık</h3>
                                            <p className="text-gray-700 text-justify">
                                                Eşsiz manzaralar ve doğal güzellikler fotoğraf tutkunları için mükemmel kareler sunmaktadır.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-1/3">
                                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                                    <h3 className="text-xl font-bold text-blue-800 mb-4">🚗 Nasıl Gidilir?</h3>
                                    <p className="text-gray-700 mb-4 text-justify">
                                        İstanbul'dan özel araçla TEM Otoyolu üzerinden yaklaşık 45 dakikalık bir yolculukla
                                        ulaşılabilir. Gebze merkeze 15 km mesafededir.
                                    </p>
                                    <a
                                        href="https://www.google.com/maps/place/Ball%C4%B1kayalar+Tabiat+Park%C4%B1/@40.8299347,29.515808,2509m/data=!3m1!1e3!4m6!3m5!1s0x14cb242bfea49fbf:0x8a949c7858da831d!8m2!3d40.8332309!4d29.5168155!16s%2Fg%2F1thm0p0_?entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoASAFQAw%3D%3D"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center bg-blue-600 text-black px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        <MapPin className="w-5 h-5 mr-2" />
                                        Haritada Gör
                                    </a>
                                </div>
                                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                                    <div className="flex items-center mb-3">
                                        <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                                            <span className="mr-2">🖼️</span>
                                            <span>Galeri</span>
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {galleryImages.map((item, index) => (
                                            <div
                                                key={item.id}
                                                className="aspect-square overflow-hidden rounded-lg cursor-pointer relative group"
                                                onClick={() => openImageViewer(index)}
                                            >
                                                <img
                                                    src={item.path}
                                                    alt={item.alt}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-300">
                                                    <div className="flex flex-col items-center">
                                                        <div className="w-10 h-10 rounded-full bg-white bg-opacity-80 flex items-center justify-center mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                            </svg>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-center mt-4">
                                        <button
                                            onClick={() => openImageViewer(0)}
                                            className="text-gray-800 hover:text-blue-600 text-sm font-medium"
                                        >
                                            Tüm resimleri görüntüle
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">DİĞER TARİHİ YERLER</h2>
                    <div className="relative">
                        <button
                            onClick={prevSlide}
                            className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 disabled:opacity-50"
                            aria-label="Önceki"
                            disabled={isAnimating}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <div className="overflow-hidden min-h-[350px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.6 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
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
                                </motion.div>
                            </AnimatePresence>
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

            {/* Image Viewer */}
            {showImageViewer && (
                <div className="fixed inset-0 bg-[#022842]/60 bg-opacity-90 z-50 flex items-center justify-center">
                    <div className="relative w-full h-full flex flex-col items-center justify-center">
                        {/* Close button */}
                        <button
                            className="absolute top-4 right-4 text-black bg-white bg-gray-800 bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                            onClick={closeImageViewer}
                            aria-label="Kapat"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Image */}
                        <div className="relative max-w-4xl max-h-[80vh] w-full">
                            <img
                                src={galleryImages[selectedImageIndex].path}
                                alt={galleryImages[selectedImageIndex].alt}
                                className="max-w-full max-h-[80vh] object-contain mx-auto"
                            />
                        </div>

                        {/* Navigation buttons */}
                        <div className="flex justify-between w-full absolute top-1/2 -translate-y-1/2 px-4">
                            <button
                                className="bg-gray-800  bg-white bg-opacity-50 p-3 rounded-full hover:bg-opacity-70 transition-opacity"
                                onClick={prevImage}
                                aria-label="Önceki resim"
                            >
                                <ChevronLeft className="w-6 h-6 text-black" />
                            </button>
                            <button
                                className="bg-gray-800 bg-white bg-opacity-50 p-3 rounded-full hover:bg-opacity-70 transition-opacity"
                                onClick={nextImage}
                                aria-label="Sonraki resim"
                            >
                                <ChevronRight className="w-6 h-6 text-black" />
                            </button>
                        </div>

                        {/* Image counter */}

                    </div>
                </div>
            )}
        </div>
    );
};

export default BallikayalarPage;