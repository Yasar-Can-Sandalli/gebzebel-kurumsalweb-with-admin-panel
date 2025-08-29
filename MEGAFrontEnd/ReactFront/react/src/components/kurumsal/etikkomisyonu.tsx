import React, { useEffect, useState } from "react";

interface KomisyonUye {
    id: number;
    ad: string;
    unvan: string;
    gorev: string;
    imgUrl?: string;
}

interface EtikIlke {
    id: number;
    ilke: string;
    ad?: string;
}

interface EtikKomisyonuData {
    uyeler: KomisyonUye[];
    ilkeler: EtikIlke[];
    imgUrl: string;
}

const EtikKomisyonu: React.FC = () => {
    const [data, setData] = useState<EtikKomisyonuData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetch("http://localhost:8080/api/kurumsal/etik-komisyonu")
            .then(res => {
                console.log("Etik Komisyonu API Yanıt Durumu:", res.status);
                if (!res.ok) throw new Error(`API hatası: ${res.status}`);
                return res.json();
            })
            .then(resData => {
                console.log("Etik Komisyonu API'den gelen veri:", JSON.stringify(resData).substring(0, 100) + "...");

                // ilkeler array'i objelerden oluşuyorsa ve ilke alanı varsa, dönüştür
                if (resData && resData.ilkeler && Array.isArray(resData.ilkeler)) {
                    resData.ilkeler = resData.ilkeler
                        .filter((i: any) => i && (i.ilke || i.ad))
                        .map((i: any) => ({
                            id: i.id,
                            ilke: i.ilke || i.ad // veritabanında ilke alanı yoksa ad alanını kullan
                        }));
                }

                // uyeler array'i kontrolü
                if (resData && resData.uyeler && Array.isArray(resData.uyeler)) {
                    resData.uyeler = resData.uyeler
                        .filter((u: any) => u && u.ad && u.tip === 'etik');
                } else {
                    // Eğer uyeler array'i yoksa veya geçersizse, boş array atayalım
                    resData.uyeler = [];
                }

                setData(resData);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Etik Komisyonu API hatası:", err);
                setError("Etik komisyonu verileri yüklenirken hata oluştu: " + err.message);
                setLoading(false);
            });
    }, []);

    if (error) return (
        <div className="flex justify-center items-center min-h-screen p-4 bg-light">
            <div className="w-full max-w-2xl bg-white border-left border-danger rounded shadow-lg overflow-hidden">
                <div className="p-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-8 w-8 text-danger" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h2 className="text-lg font-bold text-dark">Hata</h2>
                            <p className="text-secondary">{error}</p>
                            <button
                                className="mt-3 px-4 py-2 bg-danger text-white rounded hover:bg-danger"
                                onClick={() => window.location.reload()}
                            >
                                Yeniden Dene
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    if (loading) return (
        <div className="w-full max-w-4xl mx-auto my-4 px-4">
            <div className="bg-white rounded shadow-lg overflow-hidden p-4">
                <div className="animate-pulse">
                    <div className="h-8 bg-secondary rounded w-1/4 mb-6"></div>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="h-20 bg-secondary rounded"></div>
                                <div className="h-20 bg-secondary rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="pt-4 px-4 flex justify-center">
            <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-6 sm:p-10">
                <div className="relative w-full h-48 sm:h-60 mb-6 rounded-xl overflow-hidden flex items-center justify-center">
                    <img
                        src={data?.imgUrl || "/images/etikkomisyonu/etik-ikonlar (5).png"}
                        alt="Etik Komisyonu Arka Plan"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black opacity-14" />
                </div>
                <div className="text-center mb-6">
                    <h1 className="text-3xl sm:text-4xl font-bold text-blue-700">
                        Etik Komisyonu
                    </h1>
                </div>
                <section className="mb-8">
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-lg">
                        <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4 text-center">
                            Etik Davranış İlkeleri
                        </h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 text-sm sm:text-base">
                            {(data?.ilkeler && data.ilkeler.length > 0
                                    ? data.ilkeler.map((ilke) => (
                                        <li key={ilke.id} className="flex items-start gap-2">
                                            <span className="text-blue-600 mt-1">✓</span>
                                            <span>{ilke.ilke}</span>
                                        </li>
                                    ))
                                    : [
                                        "Halka Hizmet Bilinci",
                                        "Hizmet Standartlarına Uymak",
                                        "Amaç ve Misyona Bağlılık",
                                        "Dürüstlük ve Tarafsızlık",
                                        "Saygınlık ve Güven",
                                        "Nezaket ve Saygı",
                                        "Ayrımcılık Yapmamak",
                                        "Saydamlık ve Katılımcılık",
                                        "Hediye Almamak",
                                        "Kamu Mallarını Korumak",
                                        "Savurganlıktan Kaçınmak",
                                        "Çıkar Çatışmasından Kaçınmak",
                                        "Hesap Verme Sorumluluğu",
                                        "İmtiyazsız Kamu Hizmeti",
                                        "Doğruluk"
                                    ].map((ilke, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-blue-600 mt-1">✓</span>
                                            <span>{ilke}</span>
                                        </li>
                                    ))
                            )}
                        </ul>
                    </div>
                </section>
                <section className="mt-6">
                    <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4 text-center">
                        Komisyon Üyeleri
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {data?.uyeler && data.uyeler.length > 0 ? (
                            data.uyeler.map((uye) => (
                                <div key={uye.id} className="bg-white border border-gray-200 rounded-lg p-5 text-center shadow-lg">
                                    <h3 className="text-lg font-bold text-gray-800">{uye.ad}</h3>
                                    <p className="text-sm text-gray-600">{uye.unvan}</p>
                                    <span className="mt-3 inline-block bg-blue-600 text-white text-xs px-4 py-1 rounded-full">
                                        {uye.gorev}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-3 text-center p-8 bg-blue-50 rounded-xl shadow-sm">
                                <p className="text-blue-700 font-semibold">Komisyon üyesi bulunamadı.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* API Debugger - Geliştirme sırasında */}
                <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
                    <p>İlke sayısı: {data?.ilkeler?.length || 0}</p>
                    <p>Üye sayısı: {data?.uyeler?.length || 0}</p>
                </div>
            </div>
        </div>
    );
};

export default EtikKomisyonu;