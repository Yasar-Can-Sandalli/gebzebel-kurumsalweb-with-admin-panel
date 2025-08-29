import {MapPin, ChevronRight, ChevronLeft, X} from "lucide-react";
import {useEffect, useState} from "react";

const IlyasBeyCamiiPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    // Gallery images data
    const galleryImages = [
        {id: 3, path: "/images/gebze/tarihiyerler/ilyasbeycamii/sub1.JPG" },
        {id: 1, path: "/images/gebze/tarihiyerler/ilyasbeycamii/sub3.JPG" },
        {id: 4, path: "/images/gebze/tarihiyerler/ilyasbeycamii/9.JPG"},
        {id: 2, path: "/images/gebze/tarihiyerler/ilyasbeycamii/sub2.JPG"}
    ];

    // Lightbox functions
    const openLightbox = ({index}) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
        // Prevent scrolling when lightbox is open
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        // Re-enable scrolling
        document.body.style.overflow = 'auto';
    };

    const nextImage = () => {
        setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
    };

    const prevImage = () => {
        setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    // Close lightbox on ESC key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };

        if (lightboxOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [lightboxOpen]);

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

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="container mx-auto relative h-[500px] max-w-6xl mt-6">
                <div className="absolute inset-0 z-10" />
                <img
                    src="/images/gebze/tarihiyerler/ilyasbeycamii/9.JPG"
                    alt="İlyasBeyCamii"
                    className="h-full w-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
                    <h1 className="text-4xl md:text-5xl bg-[#022842]/60 font-bold text-white mb-4 rounded-xl px-2 py-2 inline-block">İLYAS BEY CAMİİ</h1>
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
                                        İlyas Bey Camii, Kocaeli'nin Gebze ilçesinde, Menzilhane Mahallesi'nde yer alan tarihi bir camidir. 1326 yılında, Gebze'nin Osmanlılar tarafından fethi sırasında Akçakoca'nın oğlu İlyas Bey tarafından inşa ettirilmiştir. Caminin yanında bir zaviye ve sıbyan mektebi de bulunmaktaydı; ancak bu yapılar günümüze ulaşamamıştır.
                                    </p>
                                    <p className="mb-4 text-justify">
                                        Zamanla harap olan cami, 2010 yılında yıkılarak yerine daha büyük kubbeli bir cami inşa edilmiştir. Bu yeni yapı, dikdörtgen planlı olup üzeri çatı ile örtülüdür. Giriş kapısı üzerinde caminin yapımıyla ilgili bir kitabe bulunmamaktadır. İbadet mekanı sade bir tasarıma sahip olup, içi beyaz badanalıdır. Duvarlarda altlı üstlü ikişer pencere bulunmaktadır; alt sıradakiler dikdörtgen söveli, üst sıradakiler ise kemerli ve alçı şebekelidir.
                                    </p>
                                </div>

                                <div className="mt-8">
                                    <h2 className="text-2xl font-bold text-blue-800 mb-4">Aktiviteler</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <h3 className="text-lg font-semibold text-blue-700 mb-2">🧘‍♂️ Ruhsal ve Dini </h3>
                                            <p className="text-gray-700 text-justify">
                                                Sessiz ve huzurlu ortamda namaz kılabilir, manevi bir atmosferde zaman geçirebilirsiniz.
                                            </p>
                                        </div>
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <h3 className="text-lg font-semibold text-blue-700 mb-2">🧭 Tarihi Gezi</h3>
                                            <p className="text-gray-700 text-justify">
                                                Caminin mimari detaylarını inceleyerek Osmanlı dönemi yapılarının özelliklerini keşfedebilirsiniz.
                                            </p>
                                        </div>
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <h3 className="text-lg font-semibold text-blue-700 mb-2">🌿 Sosyal ve Dinlendirici</h3>
                                            <p className="text-gray-700 text-justify">
                                                Cami çevresindeki sakin ortamda kısa bir mola verebilirsiniz.
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
                                        İlyas Bey Camii, Gebze ilçe merkezinde, İlyas Bey Caddesi üzerinde yer almaktadır. Toplu taşıma ile ulaşım sağlamak isteyen ziyaretçiler, Gebze merkezinden geçen otobüs ve minibüs hatlarını kullanabilirler. Özel araçla gelenler için ise cami çevresinde park alanları bulunmaktadır.
                                    </p>
                                    <a
                                        href="https://www.google.com/maps/place/%C4%B0lyas+Bey+Cami/@40.7995368,29.4381119,17z/data=!3m1!4b1!4m5!3m4!1s0x14cb208d2614d9ef:0x648c4ebb83eead8a!8m2!3d40.7995368!4d29.4403006?shorturl=1"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        <MapPin className="w-5 h-5 mr-2" />
                                        Haritada Gör
                                    </a>
                                </div>

                                {/* Updated Gallery Section with Lightbox */}
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
                                                onClick={() => openLightbox({index})}
                                            >
                                                <img
                                                    src={item.path}

                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0  transition-all duration-300 flex items-center justify-center">
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                                {visiblePlaces().map((place, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col"
                                    >
                                        {/* Resim alanı */}
                                        <div className="h-48 overflow-hidden">
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
                    <div className="relative w-full h-full flex items-center justify-center">
                        {/* Close button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 text-black bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition-all"
                            aria-label="Kapat"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Navigation buttons */}
                        <button
                            onClick={prevImage}
                            className="absolute left-4 text-black bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition-all"
                            aria-label="Önceki resim"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <button
                            onClick={nextImage}
                            className="absolute right-4 text-black bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition-all"
                            aria-label="Sonraki resim"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* Current image */}
                        <div className="max-w-4xl max-h-screen p-4">
                            <img
                                src={galleryImages[lightboxIndex].path}

                                className="max-w-full max-h-[80vh] object-contain"
                            />

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IlyasBeyCamiiPage;