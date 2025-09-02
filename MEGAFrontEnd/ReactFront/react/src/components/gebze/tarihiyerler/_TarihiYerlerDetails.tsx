import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapPin, ChevronRight, ChevronLeft, X, Loader, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import _TarihiYerlerService, { TarihiYerler } from "./_TarihiYerlerService";

const TarihiYerDetay: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [tarihiYerDetay, setTarihiYerDetay] = useState<TarihiYerler | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
    const [lightboxImageIndex, setLightboxImageIndex] = useState<number>(0);
    console.log("ID from useParams:", id);

    useEffect(() => {
        if (id) {
            const fetchDetay = async () => {
                setLoading(true);
                setError(null);
                try {
                    const yerId = parseInt(id, 10);
                    if (isNaN(yerId)) {
                        setError("Geçersiz ID formatı.");
                        setLoading(false);
                        return;
                    }
                    const [yerDetay, aktiviteler, galeri] = await Promise.all([
                        _TarihiYerlerService.getTarihiYerById(yerId),
                        _TarihiYerlerService.getAktivitelerByYerId(yerId),
                        _TarihiYerlerService.getGaleriByYerId(yerId),
                    ]);
                    setTarihiYerDetay({
                        ...yerDetay,
                        aktiviteler,
                        galeri
                    });

                } catch (err) {
                    console.error("Detaylar yüklenirken hata:", err);
                    setError("Tarihi yer detayları yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.");
                } finally {
                    setLoading(false);
                }
            };
            fetchDetay();
        } else {
            setError("Tarihi yer ID'si bulunamadı.");
            setLoading(false);
        }
    }, [id]);

    // Klavye olaylarını dinle (lightbox için)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!lightboxOpen || !tarihiYerDetay || !tarihiYerDetay.galeri || tarihiYerDetay.galeri.length === 0) return;

            if (e.key === "Escape") {
                closeLightbox();
            } else if (e.key === "ArrowRight") {
                nextLightboxImage();
            } else if (e.key === "ArrowLeft") {
                prevLightboxImage();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [lightboxOpen, lightboxImageIndex, tarihiYerDetay]);

    // Get gallery images for display
    const galleryImagesForDisplay = tarihiYerDetay?.galeri || [];

    // Lightbox kontrolü
    const openLightbox = (index: number) => {
        setLightboxImageIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = 'auto';
    };

    const nextLightboxImage = () => {
        if (!tarihiYerDetay || !tarihiYerDetay.galeri || tarihiYerDetay.galeri.length === 0) return;
        setLightboxImageIndex((prev) => (prev + 1) % tarihiYerDetay.galeri.length);
    };

    const prevLightboxImage = () => {
        if (!tarihiYerDetay || !tarihiYerDetay.galeri || tarihiYerDetay.galeri.length === 0) return;
        setLightboxImageIndex((prev) => (prev - 1 + tarihiYerDetay.galeri.length) % tarihiYerDetay.galeri.length);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <Loader className="w-16 h-16 animate-spin text-red-700" />
                <p className="ml-4 text-xl text-gray-700">Detaylar Yükleniyor...</p>
            </div>
        );
    }

    if (error || !tarihiYerDetay) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4">
                <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
                <h2 className="text-2xl font-semibold text-red-700 mb-2">Bir Hata Oluştu</h2>
                <p className="text-gray-600 text-center max-w-md">
                    {error || "Tarihi yer detayları bulunamadı. Lütfen geçerli bir sayfa olduğundan emin olun veya ana sayfaya dönüp tekrar deneyin."}
                </p>
                {/* Ana sayfaya dönüş linki eklenebilir:
                <a href="/" className="mt-6 bg-red-700 text-white px-6 py-2 rounded-md hover:bg-red-800 transition-colors">
                    Ana Sayfaya Dön
                </a>
                */}
            </div>
        );
    }

    return (
        <div className="max-w-[75%] md:max-w-[%95] w-full mx-auto min-h-screen bg-gray-50 pb-12">
            {/* Hero Section */}
            <div className="container mx-auto relative h-[400px] md:h-[500px] mt-6">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 rounded-lg" />
                <img
                    src={tarihiYerDetay.resimUrl}
                    alt={tarihiYerDetay.yerIsmi}
                    className="h-full w-full object-cover rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
                    <h1 className="text-4xl md:text-5xl bg-black/60 font-bold text-white mb-4 rounded-xl px-4 py-2 inline-block shadow-md">
                        {tarihiYerDetay.yerIsmi.toLocaleUpperCase('tr-TR')}
                    </h1>
                    {tarihiYerDetay.konumEtiketi && (
                        <div className="flex items-center text-white bg-red-700/80 backdrop-blur-sm px-4 py-2 rounded-full shadow">
                            <MapPin className="w-5 h-5 mr-2" />
                            <span>{tarihiYerDetay.konumEtiketi}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-3 py-9">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="p-6 md:p-8">
                        <div className="flex flex-col lg:flex-row md:flex-row  gap-8">
                            {/* Sol Taraf - Bilgiler ve Aktiviteler */}
                            <div className="lg:w-2/3 md:w-2/3">
                                <h2 className="text-2xl md:text-3xl font-bold text-red-800 mb-3 border-b-2 border-red-200 pb-2">
                                    Tarihçe ve Genel Bilgi
                                </h2>
                                <div className="prose prose-lg max-w-none text-gray-700 text-justify leading-relaxed">
                                    <p>{tarihiYerDetay.genelBilgi}</p>
                                </div>

                                {tarihiYerDetay.aktiviteler && tarihiYerDetay.aktiviteler.length > 0 && (
                                    <div className="mt-8">
                                        <h2 className="text-2xl md:text-3xl font-bold text-red-800 mb-4 border-b-2 border-red-200 pb-2">
                                            Yapılabilecek Aktiviteler
                                        </h2>
                                        <ul className="space-y-3">
                                            {tarihiYerDetay.aktiviteler.map((aktivite, index) => (
                                                <li key={index} className="bg-blue-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                                    <h3 className="text-lg font-semibold text-blue-700">
                                                        {aktivite.baslik}
                                                    </h3>
                                                    <p>{aktivite.aciklama}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Sağ Taraf - Nasıl Gidilir ve Galeri */}
                            <div className="lg:w-1/3 md:w-1/3">
                                <div className="bg-blue-50 p-5 rounded-lg shadow-md mb-6 sticky top-6">
                                    <h3 className="text-xl font-bold text-blue-800 mb-3">
                                        <MapPin className="inline-block w-6 h-6 mr-2 -mt-1" />
                                        Nasıl Gidilir?
                                    </h3>
                                    <p className="text-gray-700 mb-4 text-justify">
                                        {tarihiYerDetay.nasilGidilir}
                                    </p>
                                    <a
                                        href={tarihiYerDetay.konum}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center w-full bg-blue-700 text-white px-4 py-2.5 rounded-md hover:bg-blue-800 transition-colors font-semibold"
                                    >
                                        <MapPin className="w-5 h-5 mr-2" />
                                        Haritada Görüntüle
                                    </a>
                                </div>

                                {galleryImagesForDisplay.length > 0 && (
                                    <div className="bg-gray-100 p-5 rounded-lg shadow-md sticky top-[calc(6rem+180px)]">
                                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                            <span className="mr-2 text-red-700">🖼️</span>
                                            Fotoğraf Galerisi
                                        </h3>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2.5">
                                            {galleryImagesForDisplay.slice(0, 6).map((item, index) => (
                                                <div
                                                    key={item.id}
                                                    className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg cursor-pointer relative group shadow hover:shadow-xl transition-shadow"
                                                    onClick={() => openLightbox(index)}
                                                >
                                                    <img
                                                        src={item.path}
                                                        alt={`${tarihiYerDetay.yerIsmi} - Galeri ${index + 1}`}
                                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                                        <div className="opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                                                            <div className="bg-white/80 rounded-full p-1.5">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m0 0v6m0-6h6m-6 0H4" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {galleryImagesForDisplay.length > 6 && (
                                            <div className="text-center mt-4">
                                                <button
                                                    onClick={() => openLightbox(0)}
                                                    className="text-blue-700 hover:text-blue-900 text-sm font-semibold"
                                                >
                                                    Tüm resimleri görüntüle ({galleryImagesForDisplay.length})
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lightbox */}
                {lightboxOpen && galleryImagesForDisplay.length > 0 && (
                    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={closeLightbox}>
                        <div className="absolute top-4 right-4 z-[102]">
                            <button
                                onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                                className="text-white/80 hover:text-white p-2 rounded-full bg-black/30 hover:bg-black/50 transition-all"
                                aria-label="Kapat"
                            >
                                <X className="w-7 h-7" />
                            </button>
                        </div>

                        <button
                            onClick={(e) => { e.stopPropagation(); prevLightboxImage(); }}
                            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 p-2 md:p-3 rounded-full text-black transition-all z-[101]"
                            aria-label="Önceki"
                            disabled={galleryImagesForDisplay.length <= 1}
                        >
                            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                        </button>

                        <div className="max-w-4xl w-full max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={lightboxImageIndex}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex justify-center items-center h-full"
                                >
                                    <img
                                        src={galleryImagesForDisplay[lightboxImageIndex].path}
                                        alt={`${tarihiYerDetay.yerIsmi} - Resim ${lightboxImageIndex + 1}`}
                                        className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <button
                            onClick={(e) => { e.stopPropagation(); nextLightboxImage(); }}
                            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 p-2 md:p-3 rounded-full text-black transition-all z-[101]"
                            aria-label="Sonraki"
                            disabled={galleryImagesForDisplay.length <= 1}
                        >
                            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                        </button>
                        {/* Resim Sayacı */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1.5 rounded-full z-[101]">
                            {lightboxImageIndex + 1} / {galleryImagesForDisplay.length}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TarihiYerDetay;