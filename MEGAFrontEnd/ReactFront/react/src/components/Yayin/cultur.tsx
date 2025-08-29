import { FileText, ChevronLeft, ChevronRight, Book } from "lucide-react";
import React, { useState, useEffect } from "react";

const documents = [
    { name: "ÇOBAN MUSTAFA PAŞA KÜLLİYESİ", url: "https://www.gebze.bel.tr/dosya/20200807140647.pdf" },
    { name: "ÇOBAN MUSTAFA PAŞA KÜLLİYESİ 2", url: "https://www.gebze.bel.tr/dosya/20200807140647.pdf" },
    { name: "FATİH SULTAN MEHMED DÖNEMİ FERMAN VE ARŞİV BELGELERİ", url: "https://www.gebze.bel.tr/dosya/20200909134701.pdf" },
];

const sliderImages = [
    { image: "/images/yayınlar/kultur/paşa7.jpg" },
    { image: "/images/yayınlar/kultur/paşa8.jpg" },
    { image: "/images/yayınlar/kultur/paşa10.jpg" },
    { image: "/images/yayınlar/kultur/paşa11.jpg" },
];

export default function CombinedCard() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoplay, setIsAutoplay] = useState(true);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
    };

    useEffect(() => {
        let interval;
        if (isAutoplay) {
            interval = setInterval(() => {
                nextSlide();
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isAutoplay, currentSlide]);

    const handleMouseEnter = () => setIsAutoplay(false);
    const handleMouseLeave = () => setIsAutoplay(true);

    return (
        <div className="flex justify-center pt-6 pb-8 sm:pt-8 sm:pb-10 px-4">
            <div className="flex flex-col space-y-6 w-full max-w-[960px]">
                {/* Ana Kart */}
                <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Başlık (üstte sabit) */}
                    <div className="w-full flex justify-center p-4">
                        <div className="text-center text-xl md:text-2xl lg:text-3xl font-extrabold text-blue-900 bg-white border-2 border-blue-900 px-4 md:px-6 py-2 md:py-3 rounded-xl shadow-md">
                            GEBZE BELEDİYESİ KÜLTÜR YAYINLARI
                        </div>
                    </div>

                    {/* İçerik Container - Resim ve Metin için ortak padding */}
                    <div className="px-4 md:px-6 pb-4 md:pb-6">
                        {/* Slider Bölümü - Padding Yok */}
                        <div
                            className="w-full bg-white rounded-xl shadow-md overflow-hidden"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="relative h-64 md:h-80 lg:h-96">
                                {sliderImages.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                                    >
                                        <div className="absolute inset-0 z-10"></div>
                                        <img src={image.image} className="w-full h-full object-cover" alt="Kültür Yayını" />
                                    </div>
                                ))}

                                <button
                                    onClick={prevSlide}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white text-gray-700 p-2 sm:p-3 rounded-full shadow-md hover:scale-105 transition"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white text-gray-700 p-2 sm:p-3 rounded-full shadow-md hover:scale-105 transition"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>

                                <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2 z-30">
                                    {sliderImages.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentSlide(index)}
                                            className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? "bg-white w-6" : "bg-white/60 hover:bg-white/80"}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        {/* Mavi arka plan metin bölümü - Aynı genişlikte olacak */}
                        <div className="bg-blue-900 rounded-2xl p-4 md:p-6 text-white mt-4">
                            <h3 className="text-lg font-bold mb-2">Kültür Yayınlarımız</h3>
                            <p className="text-sm md:text-base">
                                Çoban Mustafa Paşa, aslen Bosnalıdır. Genç bir çoban iken Sultan Yavuz Selim ile Mısır Seferi'ne katılır, sonraları Piri Mehmet Paşa'nın koruyuculuğuna alınır. Zaman içerisinde çeşitli mevkilere yükselir. Sırası ile Kapıcıbaşı ve Rumeli Beylerbeyi olur. Sonraları Yavuz Sultan Selim'in kızı ile evlenip Hakan'ın damadı olur.
                                <br /><br />
                                Kanuni Sultan Süleyman zamanında Vezirlik görevini yürütür. İstanbul'da 1529 yılında vefat eden Çoban Mustafa Paşa, kendi adına yaptırmış olduğu Gebze'deki külliyede caminin kıble tarafında yer alan türbesine gömülür.
                                <br /><br />
                                Çoban Mustafa Paşa Külliyesi Kapısının üzerindeki Arapça kitabeye göre 1523/4 (H. 930) yılında yaptırılmıştır. Külliye cami, türbe, medrese, kütüphane, kervansaray, darüşşifa, imarethaneden meydana gelen bir yapı topluluğudur. Külliyede çok dengeli bir geometrik düzen göze çarpar. Cami avlusundan başka arkada geniş bir türbe avlusu vardır.
                            </p>
                        </div>
                    </div>
                    
                    {/* Yayınlarımız Bölümü */}
                    <div className="px-4 md:px-6 pb-4 md:pb-6">
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-4 border-b pb-3 border-blue-100">
                                <Book className="text-orange-500" size={28} />
                                <div className="text-lg md:text-xl font-bold text-blue-900">Yayınlarımız</div>
                            </div>

                            <div className="space-y-3">
                                {documents.map((doc, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col sm:flex-row sm:items-center justify-between bg-blue-50 hover:bg-blue-100 p-3 md:p-4 rounded-lg transition shadow-sm hover:shadow-md space-y-2 sm:space-y-0 sm:space-x-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            <FileText className="text-orange-500 flex-shrink-0" size={20} />
                                            <span className="text-blue-900 font-medium text-sm sm:text-base">
                                                {doc.name}
                                            </span>
                                        </div>
                                        <a
                                            href={doc.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white bg-blue-600 hover:bg-blue-900 px-4 py-1.5 rounded text-xs sm:text-sm whitespace-nowrap transition text-center"
                                        >
                                            Görüntüle
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
