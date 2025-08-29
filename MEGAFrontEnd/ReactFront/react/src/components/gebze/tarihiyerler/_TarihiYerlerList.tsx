import React, {useEffect, useState} from "react";
import { Info, Loader, MapPin } from "lucide-react";
import { _TarihiYerlerService } from './_TarihiYerlerService.tsx';

const TarihiYerlerList: React.FC = () => {

    interface TarihiYerler {
        id: number;
        resimUrl: string;
        yerIsmi: string;
        genelBilgi: string; // Bu bilgi de detay sayfasında gösterilebilir
        konum: string;
        aktiviteler: string[]; // Aktiviteler için string dizisi
        nasilGidilir: string; // Bu bilgi de detay sayfasında gösterilebilir
        galeri: string[];     // Galeri resim URL'leri için string dizisi
    }

    const [tarihiYerler, setTarihiYerler] = useState<TarihiYerler[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTarihiYerler = async () => {
            try {
                setLoading(true);
                // Muhtemelen tüm tarihi yerleri getiren bir fonksiyon olmalı:
                const dataFromApi = await _TarihiYerlerService.getAllTarihiYerler(); // Servis metodunuzu buna göre adlandırın/güncelleyin

                // Eğer aktiviteler ve galeri JSON string ise parse edin
                // Bu örnekte API'nin doğrudan string[] döndürdüğünü varsayıyoruz.
                // Eğer değilse:
                // const processedData = dataFromApi.map(item => ({
                //     ...item,
                //     aktiviteler: typeof item.aktiviteler === 'string' ? JSON.parse(item.aktiviteler) : item.aktiviteler,
                //     galeri: typeof item.galeri === 'string' ? JSON.parse(item.galeri) : item.galeri,
                // }));
                // setTarihiYerler(processedData);

                setTarihiYerler(dataFromApi);
                setError(null);
            } catch (err) {
                setError('Tarihi yerler yüklenirken bir hata oluştu. Örnek veriler gösteriliyor.');
                console.error("API'den veri çekme hatası:", err);
                // Hata durumunda fallbackData kullanılacağı için tarihiYerler'i boş bırakabiliriz veya fallback'i set edebiliriz.
                // Mevcut displayData mantığınız zaten bunu ele alıyor.
            } finally {
                setLoading(false);
            }
        };

        fetchTarihiYerler();
    }, []);
    // Create a function to generate the correct URL format based on the title
    const getDetailPageUrl = (title: number): string => {
        return `/gebze/tarihiyerler/${title}`;
    };

    // Fallback to static data if API fails or for development

    const fallbackData = [
        { id:1, resimUrl: "/images/gebze/tarihiyerler/anibal/1.JPG", yerIsmi: "ANİBALIN MEZARI", konum: "https://www.google.com/maps/place/Hannibalin+Mezar%C4%B1/@40.782282,29.4395192,17z/data=!3m1!4b1!4m5!3m4!1s0x14cb2042af222be3:0xd11c044aa3d2711!8m2!3d40.782282!4d29.4417079?shorturl=1" },
        { id:11,  resimUrl: "/images/gebze/tarihiyerler/ballikayalar/2.jpg", yerIsmi: "BALLIKAYALAR", konum:"https://www.google.com/maps/place/Ball%C4%B1+Kayalar+Tabiat+Park%C4%B1/@40.8299347,29.515808,15.25z/data=!4m5!3m4!1s0x14cb242bfea49fbf:0x8a949c7858da831d!8m2!3d40.8330952!4d29.516802?shorturl=1" },
        { id:12, resimUrl: "/images/gebze/tarihiyerler/külliye/3.JPG", yerIsmi: "ÇOBAN MUSTAFA PAŞA KÜLLİYESİ", konum:"https://www.google.com/maps/place/%C3%87oban+Mustafa+Pa%C5%9Fa+K%C3%BClliyesi/@40.799884,29.432153,15z/data=!4m5!3m4!1s0x0:0x1ab84b48f6e54236!8m2!3d40.799884!4d29.432153?shorturl=1"},
        { id:13, resimUrl: "/images/gebze/tarihiyerler/hamam/4.JPG", yerIsmi: "ÇOBAN MUSTAFA PAŞA HAMAMI", konum:"https://www.google.com/maps/place/Tarihi+%C3%87ar%C5%9F%C4%B1+Hamam%C4%B1/@40.7992254,29.4309593,17z/data=!4m5!3m4!1s0x14cb20894af6630f:0xda82440ad30b8594!8m2!3d40.7985669!4d29.4341429?shorturl=1"},
        { id:14, resimUrl: "/images/gebze/tarihiyerler/sadirvan/5.JPG", yerIsmi: "ÇOBAN MUSTAFA PAŞA ŞADIRVANI", konum:"https://www.google.com/maps/place/%C3%87oban+Mustafa+Pa%C5%9Fa+K%C3%BClliyesi/@40.798862,29.4298284,17z/data=!4m5!3m4!1s0x14cb208f33d5f6db:0x1ab84b48f6e54236!8m2!3d40.799884!4d29.432153?shorturl=1"},
        { id:15, resimUrl: "/images/gebze/tarihiyerler/eskihisarcesme/6.jpg", yerIsmi: "ESKİHİSAR ÇEŞMESİ", konum:"https://www.google.com/maps/place/Eskihisar+%C3%87e%C5%9Fmesi/@40.769591,29.4252723,17z/data=!3m1!4b1!4m5!3m4!1s0x14cb200fbb67de7d:0x8c7064d245464b3d!8m2!3d40.769591!4d29.427461?shorturl=1"},
        { id:16, resimUrl: "/images/gebze/tarihiyerler/kale/7.JPG", yerIsmi: "ESKİHİSAR KALESİ", konum:"https://www.google.com/maps/place/Eskihisar,+Eskihisar+Kalesi,+41400+Gebze%2FKocaeli/@40.7720176,29.4293137,17z/data=!3m1!4b1!4m5!3m4!1s0x14cb2012246f1bdf:0x210fd52d96efc378!8m2!3d40.7720176!4d29.4315024?shorturl=1"},
        { id:17, resimUrl: "/images/gebze/tarihiyerler/hünkar/8.JPG", yerIsmi: "HÜNKAR ÇAYIRI",  konum:"https://www.google.com/maps/place/H%C3%BCnkar+%C3%87ay%C4%B1r%C4%B1/@40.813967,29.3409963,17z/data=!3m1!4b1!4m5!3m4!1s0x14cade66bb4b566f:0x563611efabd51aa!8m2!3d40.813967!4d29.343185?shorturl=1" },
        { id:18, resimUrl: "/images/gebze/tarihiyerler/ibrahimpasacamii/2.JPG", yerIsmi: "İBRAHİM PAŞA ÇEŞMESİ", konum:"https://www.google.com/maps/place/%C4%B0brahim+Pa%C5%9Fa+%C3%87e%C5%9Fmesi+(Eski+%C3%87ar%C5%9F%C4%B1+%C3%87e%C5%9Fmesi)/@40.7983983,29.4316467,17z/data=!3m1!4b1!4m5!3m4!1s0x14cb2159ac7bdb4d:0x1128fdc4b678c96d!8m2!3d40.7983983!4d29.4338354?shorturl=1"},
        { id:177, resimUrl: "/images/gebze/tarihiyerler/ilyasbeycamii/9.JPG", yerIsmi: "İLYAS BEY CAMİİ", konum:"https://www.google.com/maps/place/%C4%B0lyas+Bey+Cami/@40.7995368,29.4381119,17z/data=!3m1!4b1!4m5!3m4!1s0x14cb208d2614d9ef:0x648c4ebb83eead8a!8m2!3d40.7995368!4d29.4403006?shorturl=1"},
        { id:143, resimUrl: "/images/gebze/tarihiyerler/yalı/11.JPG", yerIsmi: "OSMAN HAMDİ BEY YALISI", konum:"https://www.google.com/maps/place/Osman+Hamdi+Bey+Evi+ve+M%C3%BCzesi/@40.769348,29.4245433,17z/data=!3m1!4b1!4m5!3m4!1s0x14cb200fa27728bf:0xb8320b5bebc2a90a!8m2!3d40.769348!4d29.426732?shorturl=1"},
        { id:1123, resimUrl: "/images/gebze/tarihiyerler/sultanorhancami/12.jpg", yerIsmi: "SULTAN ORHAN CAMİİ", konum:"https://www.google.com/maps/place/Sultan+Orhan+Cami/@40.798083,29.4355794,17z/data=!3m1!4b1!4m5!3m4!1s0x14cb208c7bb7f3d5:0x805bf82146b0c733!8m2!3d40.798079!4d29.4377681?shorturl=1"}
    ];

    const displayData = error || tarihiYerler.length === 0 ? fallbackData : tarihiYerler;

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto px-5 pb-16">
                <div className="bg-red-900 shadow-lg rounded-4xl p-3 mb-4 mt-2 text-center">
                    <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold text-white">
                        GEBZE TARİHİ YERLER
                    </h1>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader className="w-8 h-8 animate-spin text-red-900" />
                    </div>
                ) : (
                    <>
                        {error && (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                                <p>{error}</p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                            {displayData.map((item) => (
                                <div
                                    key={item.id}
                                    className="relative rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl group w-full max-w-sm"
                                >
                                    <div className="w-full h-48 overflow-hidden flex items-center justify-center">
                                        <img
                                            src={item.resimUrl}
                                            alt={item.yerIsmi}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = 'https://via.placeholder.com/300x200?text=Resim+Bulunamadı';
                                            }}
                                        />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                                        <h2 className="text-white text-base font-semibold truncate">&nbsp;&nbsp;{item.yerIsmi}</h2>
                                        <div className="flex space-x-2 mt-1">
                                            <a
                                                href={getDetailPageUrl(item.id)}
                                                className="flex items-center text-white text-xs px-2 py-1 rounded-md hover:text-gray-200 transition-colors"
                                            >
                                                <Info className="w-4 h-4 mr-1" />
                                                Detaylı Bilgi
                                            </a>
                                            <a
                                                href={item.konum}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center text-white text-xs px-2 py-1 rounded-md hover:text-gray-200 transition-colors"
                                            >
                                                <MapPin className="w-4 h-4 mr-1" />
                                                Konum
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TarihiYerlerList;