import { useState, useEffect } from "react";
import { MapPin, ChevronRight, ChevronLeft, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AnibalinMezariPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImage, setLightboxImage] = useState(0);

    // Galeri resimleri
    const galleryImages = [
        { id: 1, path: "/images/gebze/tarihiyerler/anibal/sub1.jpg" },
        { id: 2, path: "/images/gebze/tarihiyerler/anibal/sub2.JPG" },
        { id: 3, path: "/images/gebze/tarihiyerler/anibal/sub3.jpg" },
        { id: 4, path: "/images/gebze/tarihiyerler/anibal/sub4.JPG" }
    ];

    // Diğer Tarihi Yerler için veri ve route bilgileri
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

    // Klavye olaylarını dinle (lightbox için)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!lightboxOpen) return;

            if (e.key === "Escape") {
                setLightboxOpen(false);
            } else if (e.key === "ArrowRight") {
                nextLightboxImage();
            } else if (e.key === "ArrowLeft") {
                prevLightboxImage();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [lightboxOpen, lightboxImage]);

    // Slider için otomatik geçiş
    useEffect(() => {
        if (lightboxOpen) return; // Lightbox açıkken otomatik geçişi durdur

        const interval = setInterval(() => {
            nextSlide();
        }, 5000); // 5 saniyede bir

        return () => clearInterval(interval); // Temizlik
    }, [lightboxOpen, currentIndex]);

    // Lightbox kontrolü
    const openLightbox = ({index}: { index: any }) => {
        setLightboxImage(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden'; // Arka planın kaymasını önle
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = 'auto'; // Arka planın kaymasını tekrar etkinleştir
    };

    const nextLightboxImage = () => {
        setLightboxImage((prev) => (prev + 1) % galleryImages.length);
    };

    const prevLightboxImage = () => {
        setLightboxImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    const nextSlide = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCurrentIndex(prev => {
                if (prev + 4 < otherPlaces.length) {
                    return prev + 1;
                } else {
                    return 0;
                }
            });
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    const prevSlide = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCurrentIndex(prev => {
                if (prev > 0) {
                    return prev - 1;
                } else {
                    return Math.max(0, otherPlaces.length - 4);
                }
            });
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    // Görüntülenecek kartlar
    const visiblePlaces = () => {
        const places = [];
        for (let i = 0; i < 4; i++) {
            if (currentIndex + i < otherPlaces.length) {
                places.push(otherPlaces[currentIndex + i]);
            }
        }
        return places;
    };

    // Sayfa numarası hesaplama
    const totalPages = Math.ceil(otherPlaces.length / 4);
    const currentPage = Math.floor(currentIndex / 4) + 1;

    return (
        <div className="max-w-[95%] w-full mx-auto min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="container mx-auto relative h-[500px] mt-6">
                <div className="absolute inset-0 z-10" />
                <img
                    src="/images/gebze/tarihiyerler/anibal/sub1.jpg"
                    alt="AnibalinMezari"
                    className="h-full w-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
                    <h1 className="text-4xl md:text-5xl bg-[#022842]/60 font-bold text-white mb-4 rounded-xl px-2 py-2 inline-block">
                        ANİBALIN MEZARI
                    </h1>

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
                                        Gebze Anibal Mezarı, Kocaeli'nin Gebze ilçesinde, Eskihisar Kalesi yakınlarında yer alan tarihi bir anıttır.
                                        MÖ 183 yılında ölen ünlü Kartacalı komutan Anibal Barca'ya ithafen yapılmıştır.
                                        Anibal, Roma İmparatorluğu'nun en büyük düşmanlarından biri olarak kabul edilir ve özellikle II. Pön Savaşı'ndaki cesur taktikleriyle tarihe geçmiştir.

                                        Mustafa Kemal Atatürk, Anibal'in askeri dehasını takdir ederek onun anısını yaşatmak istemiş ve 1930'lu yıllarda bu sembolik mezarın yapılmasını sağlamıştır.
                                    </p>
                                </div>

                                <div className="mt-8">
                                    <h2 className="text-2xl font-bold text-blue-800 mb-4">Aktiviteler</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <h3 className="text-lg font-semibold text-blue-700 mb-2">🧭 Tarihi Gezi</h3>
                                            <p className="text-gray-700 text-justify">
                                                Anibal'in anıt mezarını ve çevresindeki Eskihisar Kalesi gibi tarihi yapıları gezebilirsiniz.
                                            </p>
                                        </div>
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <h3 className="text-lg font-semibold text-blue-700 mb-2">📸 Fotoğrafçılık</h3>
                                            <p className="text-gray-700 text-justify">
                                                Çevredeki doğal patikalarda kısa yürüyüşler yapabilir, doğayla baş başa kalabilirsiniz.
                                            </p>
                                        </div>
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <h3 className="text-lg font-semibold text-blue-700 mb-2">📖 Panolarını İnceleme</h3>
                                            <p className="text-gray-700 text-justify">
                                                Anıt çevresinde yer alan panolar aracılığıyla Anibal'in hayatı ve ölümü hakkında bilgi edinebilirsiniz.
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
                                        href="https://www.google.com/maps/place/Hannibal+an%C4%B1t%C4%B1/@40.782282,29.4417079,628m/data=!3m2!1e3!4b1!4m6!3m5!1s0x14cb2042af222be3:0xd11c044aa3d2711!8m2!3d40.782282!4d29.4417079!16s%2Fg%2F11cftyh3b?entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoASAFQAw%3D%3D"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center bg-blue-600 text-black px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        <MapPin className="w-5 h-5 mr-2" />
                                        Haritada Gör
                                    </a>
                                </div>

                                {/* Galeri - İyileştirilmiş Bölüm */}
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
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0  group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
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

                {/* Lightbox - İyileştirilmiş Bölüm */}
                {lightboxOpen && (
                    <div className="fixed inset-0 bg-[#022842]/60 bg-opacity-90 z-50 flex items-center justify-center">
                        <div className="absolute top-4 right-4 z-10 flex space-x-2">
                            <button
                                onClick={closeLightbox}
                                className="text-black p-2  rounded-full bg-white bg-opacity-50 hover:bg-opacity-70 transition-all"
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
        </div>
    );
};

export default AnibalinMezariPage;