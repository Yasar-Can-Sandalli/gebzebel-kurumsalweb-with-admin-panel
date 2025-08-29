import React, { useState, useEffect } from "react";
import axios from "axios";


type ImageType = {
    id: number;
    resimUrl: string;
    baslik: string;
    url: string;
    konum: string;
    type: string;
};

const Gallery: React.FC = () => {
    const [images, setImages] = useState<ImageType[]>([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('http://localhost:8080/api/gebze/fotograf');
                if (Array.isArray(response.data)) {
                    setImages(response.data);
                } else {
                    throw new Error('Geçersiz veri formatı');
                }
            } catch (err) {
                setError("Fotoğraflar yüklenirken bir hata oluştu.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchImages();
    }, [])

    const handleNext = () => {
        if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
            setSelectedImageIndex(selectedImageIndex + 1);
        }
    };

    const handlePrev = () => {
        if (selectedImageIndex !== null && selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-xl">Yükleniyor...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-xl text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="flex justify-center w-full">
            <div className="p-4 flex flex-col items-center w-full max-w-[1200px]">
                <div
                    className="bg-red-900 shadow-lg rounded-2xl p-3 mb-6 my-3 mx-auto w-full max-w-xl text-center">
                    <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold text-white">FOTOĞRAFLARLA GEBZE</h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                    {images.map((image, index) => (
                        <div key={image.id} className="flex justify-center">
                            <img
                                src={image.resimUrl}
                                alt={image.baslik || `Gebze Fotoğraf ${index + 1}`}
                                className="w-full h-[200px] object-cover border border-gray-300 rounded-2xl shadow-sm transition-all duration-300 hover:brightness-110 hover:scale-105"
                                onClick={() => setSelectedImageIndex(index)}
                            />
                        </div>
                    ))}
                </div>
                {selectedImageIndex !== null && (
                    <div
                        className="fixed inset-0 bg-[#022842]/80 flex items-center justify-center z-50"
                        onClick={() => setSelectedImageIndex(null)}
                    >
                        <div className="relative flex items-center max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                            <button
                                className="absolute left-0 bg-[#022842] ml-4 text-white text-3xl rounded-full w-12 h-12 flex items-center justify-center transition-all"
                                onClick={handlePrev}
                                disabled={selectedImageIndex === 0}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                                </svg>
                            </button>
                            <div className="flex flex-col items-center">
                                <img
                                    src={images[selectedImageIndex].resimUrl}
                                    alt={images[selectedImageIndex].baslik || "Selected"}
                                    className="max-h-[80vh] max-w-[80vw] rounded-2xl object-contain shadow-xl"
                                />
                                {images[selectedImageIndex].baslik && (
                                    <div className="text-white text-lg mt-2 text-center">
                                        {images[selectedImageIndex].baslik}
                                    </div>
                                )}
                            </div>
                            <button
                                className="absolute right-0 bg-[#022842] mr-4 text-white text-3xl rounded-full w-12 h-12 flex items-center justify-center transition-all"
                                onClick={handleNext}
                                disabled={selectedImageIndex === images.length - 1}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                </svg>
                            </button>


                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;