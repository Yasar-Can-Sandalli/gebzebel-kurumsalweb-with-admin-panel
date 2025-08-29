import React, { useState, useEffect } from "react";

interface Muhtar {
    id: number;
    resimUrl: string;
    ad: string;
    soyad: string;
    mahalle: string;
    telefon: string;
    konum: string;
    eposta: string | null;
    tamIsim: string;
    mahalleGorev: string;
}

// Modal bileşeni
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    muhtar: Muhtar | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, muhtar }) => {
    if (!isOpen || !muhtar) return null;

    return (
        <div className="fixed inset-0 bg-[#022842]/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-2xl w-full">
                <div className="flex justify-end p-2">
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <span className="text-2xl">&times;</span>
                    </button>
                </div>
                <div className="flex flex-row">
                    {/* Left side - Image */}
                    <div className="w-1/3 p-4">
                        <img
                            src={muhtar.resimUrl}
                            alt={muhtar.ad}
                            className="w-full object-cover rounded-lg shadow-md"
                            onError={(e) => (e.currentTarget.src = "/api/placeholder/250/230")}
                        />
                    </div>

                    {/* Right side - Information */}
                    <div className="w-2/3 p-4">
                        <div className="border-b pb-3 mb-4">
                            <h4 className="text-lg font-bold text-gray-800">{muhtar.mahalle} </h4>
                            <h3 className="text-xl font-semibold text-gray-800">{muhtar.ad}&nbsp;{muhtar.soyad}</h3>
                        </div>

                        <div className="space-y-3">
                            {muhtar.telefon && (
                                <div className="flex items-center">
                                    <div className="bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-600 mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="font-semibold">Telefon:</span> {muhtar.telefon}
                                    </div>
                                </div>
                            )}

                            {muhtar.eposta && (
                                <div className="flex items-center">
                                    <div className="bg-red-100 h-8 w-8 rounded-full flex items-center justify-center text-red-600 mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="font-semibold">E-posta:</span> {muhtar.eposta}
                                    </div>
                                </div>
                            )}

                            {muhtar.konum && (
                                <div className="flex items-start text-left">
                                    <div className="bg-green-100 h-8 w-8 rounded-full flex items-center justify-center text-green-600 mr-3 mt-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <span className="font-semibold">Adres:</span> {muhtar.konum}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MuhtarCard: React.FC<{ muhtar: Muhtar }> = ({ muhtar }) => {
    const [showModal, setShowModal] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-xs mx-auto text-center">
            <div
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={openModal}
            >
                <div className="w-full h-48 overflow-hidden">
                    <img
                        src={muhtar.resimUrl}
                        alt={muhtar.tamIsim}
                        className="w-full h-full object-cover object-center"
                        onError={(e) => (e.currentTarget.src = "/api/placeholder/300/200")}
                    />
                </div>
                <div
                    className={`absolute inset-0 flex items-center justify-center ${isHovered ? 'bg-black bg-opacity-40' : 'bg-opacity-0'} transition-all duration-300 cursor-pointer`}
                >
                    <div className={`bg-white text-black py-2 px-4 rounded-lg shadow-lg ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                        Detaylı Bilgi
                    </div>
                </div>
            </div>
            <div className="p-4">
                <h4 className="text-lg font-medium text-gray-800 mb-1">{muhtar.tamIsim}</h4>
                <span className="text-gray-600 font-medium text-sm">{muhtar.mahalleGorev}</span>
            </div>
            <Modal isOpen={showModal} onClose={closeModal} muhtar={muhtar} />
        </div>
    );
};

const MuhtarlarPage: React.FC = () => {
    const [muhtarlar, setMuhtarlar] = useState<Muhtar[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredMuhtarlar, setFilteredMuhtarlar] = useState<Muhtar[]>([]);

    useEffect(() => {
        const fetchMuhtarlar = async () => {
            try {
                setLoading(true);
                // API endpoint'i düzeltildi
                const response = await fetch("http://localhost:8080/api/muhtarlar");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log("API Response:", data); // Response kontrolü için log eklendi
                setMuhtarlar(data);
                setFilteredMuhtarlar(data);
                setLoading(false);
            } catch (err) {
                console.error("API Error:", err); // Hata detayı için log eklendi
                setError("Muhtarlar yüklenirken bir hata oluştu.");
                setLoading(false);
            }
        };

        fetchMuhtarlar();
    }, []);

    useEffect(() => {
        console.log("Arama terimi değişti:", searchTerm);
        if (searchTerm.trim() === "") {
            setFilteredMuhtarlar(muhtarlar);
        } else {
            const lowercasedSearch = searchTerm.toLowerCase();
            const filtered = muhtarlar.filter(
                (muhtar) =>
                    muhtar.tamIsim.toLowerCase().includes(lowercasedSearch) ||
                    muhtar.mahalle.toLowerCase().includes(lowercasedSearch)
            );
            console.log("Filtrelenmiş muhtarlar:", filtered);
            setFilteredMuhtarlar(filtered);
        }
    }, [searchTerm, muhtarlar]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Başlık */}
                <div className="text-center mb-8">
                    <div className="bg-red-900 shadow-lg rounded-2xl p-6 mx-auto max-w-2xl">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                            MAHALLE MUHTARLARI
                        </h1>
                    </div>
                </div>

                {/* Arama kutusu */}
                <div className="max-w-md mx-auto mb-8">
                    <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border border-gray-300 shadow-sm">
                        <div className="grid place-items-center h-full w-12 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            className="peer h-full w-full outline-none text-sm text-gray-700 pr-4"
                            type="text"
                            id="search"
                            placeholder="Muhtar veya mahalle ara..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>

                {/* İçerik */}
                <div className="w-full">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-900"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center">
                            <div className="inline-block bg-red-100 text-red-600 p-6 rounded-lg shadow-sm">
                                <p className="text-lg">{error}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full">
                            {filteredMuhtarlar.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
                                    {filteredMuhtarlar.map((muhtar) => (
                                        <MuhtarCard key={muhtar.id} muhtar={muhtar} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
                                        <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        <p className="text-gray-600 text-lg">Arama kriterlerine uygun muhtar bulunamadı.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MuhtarlarPage;