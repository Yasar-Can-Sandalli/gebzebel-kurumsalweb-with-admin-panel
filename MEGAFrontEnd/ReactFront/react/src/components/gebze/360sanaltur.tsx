import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import axios from 'axios';

interface Location {
    id: number;
    baslik: string;
    resimUrl: string;
    url: string;
    mapUrl: string;
    konum: string;
    type: string;
}

const VrGogglesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="white" className="bi bi-headset-vr" viewBox="0 0 16 16">
        <path d="M8 1.248c1.857 0 3.526.641 4.65 1.794a5 5 0 0 1 2.518 1.09C13.907 1.482 11.295 0 8 0 4.75 0 2.12 1.48.844 4.122a5 5 0 0 1 2.289-1.047C4.236 1.872 5.974 1.248 8 1.248"/>
        <path d="M12 12a4 4 0 0 1-2.786-1.13l-.002-.002a1.6 1.6 0 0 0-.276-.167A2.2 2.2 0 0 0 8 10.5c-.414 0-.729.103-.935.201a1.6 1.6 0 0 0-.277.167l-.002.002A4 4 0 1 1 4 4h8a4 4 0 0 1 0 8"/>
    </svg>
);

const VirtualTourGallery: React.FC = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                setIsLoading(true);
                console.log('Sanal turlar yükleniyor...');
                const response = await axios.get('http://localhost:8080/api/gebze/sanaltur');
                console.log('Sanal tur yanıtı:', response.data);

                if (Array.isArray(response.data)) {
                    setLocations(response.data);
                    console.log('Yüklenen sanal tur sayısı:', response.data.length);
                } else {
                    throw new Error('Geçersiz veri formatı');
                }
            } catch (err) {
                console.error('Sanal tur yükleme hatası:', err);
                setError("Sanal tur verileri yüklenirken bir hata oluştu.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchLocations();
    }, []);

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
        <div className="container mx-auto px-2 sm:px-4 py-8 max-w-screen-2xl">
            {/* Başlık üstüne bir satır boşluk */}
            <div className="h-8"></div>

            <div className="bg-blue-900 rounded-2xl p-2 flex justify-center items-center max-w-lg mx-auto mb-8">
                <img
                    src="/images/gebze/360sanaltur/gebze-belediyesi-sanal-tur.png"
                    alt="Gebze Belediyesi"
                    className="h-24 object-contain"
                />
            </div>

            {/* Başlık altına bir satır boşluk */}
            <div className="h-8"></div>

            {/* Adjusted to 3 columns with moderate spacing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {locations.map((location) => (
                    <div
                        key={location.id}
                        className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                        {/* Standard 16:9 aspect ratio */}
                        <div className="aspect-[16/9] w-full">
                            <img
                                src={location.resimUrl}
                                alt={location.baslik}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-2 rounded-lg text-sm md:text-base font-medium max-w-[90%]">
                            {location.baslik}
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                            <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity flex space-x-6 duration-300">
                                <a href={location.url} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform" title="Sanal Tur">
                                    <VrGogglesIcon />
                                </a>
                                <a href={location.konum} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform" title="Haritada Gör">
                                    <MapPin size={36} className="text-white hover:text-green-400 transition-colors" />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tüm resimlerin altına 2 satır boşluk */}
            <div className="h-16"></div>
        </div>
    );
};

export default VirtualTourGallery;