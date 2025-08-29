import {useEffect, useState} from 'react';

const CorporateMembershipCard = () => {
    const [membershipData, setMembershipData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMembershipData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/uye-oldugumuz-birlikler');

                if (!response.ok) {
                    throw new Error(`API yanıt hatası: ${response.status}`);
                }

                const data = await response.json();
                setMembershipData(data);
                setLoading(false);
            } catch (err) {
                console.error('Veri çekme hatası:', err);
                const {message}: any = err;
                setError(message);
                setLoading(false);
            }
        };

        fetchMembershipData();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 flex justify-center items-center">
                <p className="text-lg">Yükleniyor...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8 flex justify-center items-center">
                <p className="text-lg text-red-500">Hata: {error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 mt-4">
            {/* Başlık Kutusu */}
            <div className="bg-blue-900 rounded-2xl p-2 flex justify-center items-center max-w-[466px] mx-auto mb-6">
                <img
                    src="/images/gebze/uyeoldugumuzbirlikler/gebze-belediyesi-birlik.png"
                    alt="Gebze Belediyesi"
                    className="h-24 object-contain"
                />
            </div>

            {/* Kartlar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-white p-6 rounded-b-2xl shadow-lg">
                {membershipData.map(({baslik, logo, title, url}, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col"
                    >
                        <div className="p-6 flex flex-col items-center text-center flex-grow">
                            {/* Resim */}
                            <div className="mb-4 w-[200px] h-[200px] flex items-center justify-center">
                                <img
                                    src={logo}
                                    alt={title}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex-grow">
                                {baslik}
                            </h3>
                        </div>
                        <div className="p-4">
                            <button
                                onClick={() => window.open(url, "_blank")}
                                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Detaylı Bilgi
                            </button>
                        </div>
                    </div>
                ))}
            </div><br/>
        </div>
    );
};

export default CorporateMembershipCard;