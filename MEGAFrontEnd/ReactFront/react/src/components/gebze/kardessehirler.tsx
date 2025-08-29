import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import axios from 'axios';

// API yapılandırması - Backend URL'sini doğrudan belirtelim
const apiClient = axios.create({
  baseURL: 'http://localhost:8080', // Backend sunucusunun gerçek adresi
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// City Interface - Veritabanı modeliyle uyumlu
interface City {
    id?: number;
    name: string;
    city: string;
    country: string;
    flag: string;
    location: string; // "Yurt Ici" veya "Yurt Disi" olarak saklanır
}

// City Card Component
const CityCard: React.FC<{ city: City }> = ({ city }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl overflow-hidden transition-all"
    >
        <div className="p-4">
            <div className="block">
                {city.flag && (
                    <img
                        src={city.flag}
                        alt={city.country}
                        className="w-6 h-4 rounded-sm inline-block align-middle mr-2"
                    />
                )}
                <h2 className="text-xl font-semibold inline-block align-middle">{city.name}</h2>
            </div>
            <p className="text-gray-600 mt-2">{city.city}, {city.country}</p>
        </div>
    </motion.div>
);

// Örnek veri - API çalışmazsa kullanılacak
const sampleCities: City[] = [
    {
        id: 1,
        name: "Acıgöl Belediyesi",
        city: "Nevşehir",
        country: "Türkiye",
        flag: "https://flagcdn.com/w320/tr.png",
        location: "Yurt Ici"
    },
    {
        id: 2,
        name: "Gülşehir Belediyesi",
        city: "Nevşehir",
        country: "Türkiye",
        flag: "https://flagcdn.com/w320/tr.png",
        location: "Yurt Ici"
    },
    {
        id: 8,
        name: "Değirmenlik Belediyesi",
        city: "Değirmenlik",
        country: "KKTC",
        flag: "https://flagcdn.com/w320/cy.png",
        location: "Yurt Disi"
    },
    {
        id: 9,
        name: "Karakol Şehri",
        city: "Issık-Göl",
        country: "Kırgızistan",
        flag: "https://flagcdn.com/w320/kg.png",
        location: "Yurt Disi"
    }
];

// Sister Cities Component
const SisterCities: React.FC = () => {
    // State to store all cities
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Validate and transform city data
    const transformCityData = (data: any): City[] => {
        // HTML yanıtını kontrol et
        if (typeof data === 'string' && data.toLowerCase().includes('<!doctype html')) {
            console.error("API HTML yanıtı döndürdü, JSON yerine. API yolunu kontrol edin.");
            return sampleCities; // API başarısız olursa örnek veriyi kullan
        }

        // If data is null or undefined, return an empty array or sample data
        if (!data) return sampleCities;

        // If data is already an array, use it
        if (Array.isArray(data)) {
            return data.map(city => ({
                id: city?.id,
                name: city?.name || 'Bilinmeyen Şehir',
                city: city?.city || '',
                country: city?.country || 'Türkiye',
                flag: city?.flag || '/default-flag.png',
                location: city?.location || 'Yurt Ici'
            }));
        }

        // If data has a content property
        if (data.content && Array.isArray(data.content)) {
            return transformCityData(data.content);
        }

        // If data has a data property
        if (data.data && Array.isArray(data.data)) {
            return transformCityData(data.data);
        }

        console.warn('Tanınmayan veri yapısı:', data);
        return sampleCities; // Tanınmayan yapıda örnek veriyi kullan
    };

    // Fetch cities when component mounts
    useEffect(() => {
        const fetchCities = async () => {
            try {
                console.log("API'ye istek gönderiliyor...");
                // API'den veri almayı dene
                const response = await apiClient.get('/api/kardes-sehirler');
                console.log("API yanıtı:", response);
                
                if (response.status === 200) {
                    const allCities = transformCityData(response.data);
                    setCities(allCities);
                } else {
                    throw new Error("API yanıt vermedi");
                }
            } catch (err) {
                console.error('API hatası:', err);
                
                try {
                    // Alternatif endpoint'leri dene
                    console.log("Alternatif endpoints deneniyor...");
                    
                    // Yurt içi şehirler
                    const domesticResponse = await apiClient.get('/api/kardes-sehirler/domestic');
                    const domesticCities = transformCityData(domesticResponse.data);
                    
                    // Yurt dışı şehirler
                    const internationalResponse = await apiClient.get('/api/kardes-sehirler/international');
                    const internationalCities = transformCityData(internationalResponse.data);
                    
                    // Birleştir
                    setCities([...domesticCities, ...internationalCities]);
                } catch (fallbackErr) {
                    console.error('Alternatif API çağrısı başarısız:', fallbackErr);
                    console.log("Örnek veriler kullanılıyor");
                    setCities(sampleCities); // Son çare olarak örnek verileri kullan
                    setError("Veri kaynağına erişim sağlanamadı, örnek veriler gösteriliyor");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCities();
    }, []);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-[60vh] lg:ml-72 text-center pt-20">
                <div className="inline-block animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-900"></div>
            </div>
        );
    }

    // Veritabanında "Yurt Ici" ve "Yurt Disi" olarak kaydedildiği için bu değerlere göre ayrıştır
    const domesticCities = cities.filter(city => city.location === "Yurt Ici");
    const internationalCities = cities.filter(city => city.location === "Yurt Disi");

    return (
        <main className="pt-16 px-4 pb-10 w-full max-w-full overflow-x-hidden">
            <div className="bg-red-900 shadow-lg rounded-2xl p-3 mb-8 text-center">
                <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold text-white">
                    KARDEŞ ŞEHİRLER
                </h1>
            </div>

            {error && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                    <div className="block">
                        <div className="inline-block mr-3">
                            ⚠️
                        </div>
                        <div className="inline-block">
                            <p className="text-sm text-yellow-700">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Domestic Cities Section */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">
                    <span className="mr-2">🏠</span> Yurt İçi Kardeş Şehirler
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {domesticCities.length > 0 ? (
                        domesticCities.map((city, index) => (
                            <CityCard
                                key={`domestic-${city.id ?? index}`}
                                city={city}
                            />
                        ))
                    ) : (
                        <p className="text-gray-600 col-span-full text-center">
                            Yurt içi kardeş şehir bulunamadı.
                        </p>
                    )}
                </div>
            </section>

            {/* International Cities Section */}
            <section>
                <h2 className="text-2xl font-semibold mb-6">
                    <span className="mr-2">🌍</span> Yurt Dışı Kardeş Şehirler
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {internationalCities.length > 0 ? (
                        internationalCities.map((city, index) => (
                            <CityCard
                                key={`international-${city.id ?? index}`}
                                city={city}
                            />
                        ))
                    ) : (
                        <p className="text-gray-600 col-span-full text-center">
                            Yurt dışı kardeş şehir bulunamadı.
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
};

export default SisterCities;

