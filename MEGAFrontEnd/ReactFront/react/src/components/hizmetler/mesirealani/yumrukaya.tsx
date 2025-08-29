import React, { useEffect, useState } from 'react';
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";

interface GeriDonusumDetayDTO {
    id: number;
    resim1: string;
    resim2: string;
    resim3: string;
    baslik: string;
    detay: string;
    konum: string;
}

const Yumrukaya: React.FC = () => {
    const [data, setData] = useState<GeriDonusumDetayDTO | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/hizmetler/geridonusum/30");
                if (!response.ok) {
                    throw new Error('Veri çekilemedi');
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Bir hata oluştu');
                console.error('Veri çekme hatası:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center p-4">Yükleniyor...</div>;
    }

    if (error || !data) {
        return <div className="text-center text-red-500 p-4">{error || 'Veri bulunamadı'}</div>;
    }

    const images = [data.resim1, data.resim2, data.resim3].filter(Boolean);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-8">
            <div className="w-full max-w-5xl mx-auto">
                <div className="relative w-full aspect-[16/9] rounded-xl shadow-lg overflow-hidden">
                    <img
                        src={images[currentIndex]}
                        alt={`Slayt ${currentIndex + 1}`}
                        className="w-full h-full object-cover transition-opacity duration-500"
                    />

                    <div className="absolute inset-0 bg-black/30" />

                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                        <h1 className="text-4xl md:text-5xl bg-[#022842]/60 font-bold text-white mb-4 rounded-xl px-6 py-4">
                            {data.baslik}
                        </h1>
                        <a
                            href="https://www.google.com/maps/dir//Yumrukaya,+41400+Gebze%2FKocaeli/@40.8665595,29.4704623,14z/data=!4m9!4m8!1m0!1m5!1m1!1s0x14cb20e23882caa5:0xc711d053dffd2711!2m2!1d29.5046668!2d40.8665624!3e0?entry=ttu"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-white bg-[#022842] px-4 py-2 rounded-full hover:bg-[#033b60] transition"
                        >
                            <MapPin className="w-5 h-5 mr-2" />
                            <span>{data.konum}</span>
                        </a>
                    </div>

                    {images.length > 1 && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>

                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                {images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentIndex(idx)}
                                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                                            currentIndex === idx ? "bg-white scale-125" : "bg-white/50"
                                        }`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {data.detay && (
                    <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                        <div className="prose max-w-none"
                             dangerouslySetInnerHTML={{ __html: data.detay }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Yumrukaya;