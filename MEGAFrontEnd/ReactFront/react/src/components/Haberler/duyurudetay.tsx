import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // eklendi
import { Megaphone, FileText } from "lucide-react";

// Son Haberler için örnek veri (API'den çekilebilir)
const mockSonHaberler = [
    {
        id: 1,
        baslik: "Denizli Mahallesi 237 Ada 2 ve 6 Nolu Parsellerde Uygulama İlanı",
        gorsel: "/images/Haberler/habergörselleri/egitimvegenclik/egitim1.jpg",
    },
    {
        id: 2,
        baslik: "Pelitli Mahallesi 465 Ada 2 ve 3 Nolu Parselde Uygulama İlanı",
        gorsel: "/images/Haberler/habergörselleri/egitimvegenclik/egitim1-2.jpg",
    },
    {
        id: 3,
        baslik: "Sıhhi Tesisat Ve Sulama Sistemleri Satın Alınacaktır",
        gorsel: "/images/Haberler/habergörselleri/cevretemizligeridönüsüm/cevre1.jpg",
    },
    {
        id: 4,
        baslik: "Duraklı Mahallesi Eleşli - Kangıllı Yerleşik Ve Gelişim Alanı İmar Uygulaması 2. Askı İlanı" ,
        gorsel: "/images/Haberler/habergörselleri/egitimvegenclik/egitim2.jpg",
    },
    {
        id: 5,
        baslik: "İmar Plan İlanı",
        gorsel: "/images/Haberler/habergörselleri/sosyalyardımvehizmetler/sosyal1.jpg",
    },
];

// SonHaberlerSlider: Sürekli aşağıya doğru kayan slider
const SonHaberlerSlider = ({ haberler, navigate }: { haberler: typeof mockSonHaberler, navigate: any }) => {
    const visibleCount = 6;
    const [translateY, setTranslateY] = useState(0);

    const itemHeight = 64 + 8; // Her item + gap
    const sliderHeight = visibleCount * itemHeight - 8;

    // Sonsuz döngü için haberleri çok fazla çoğalt
    const extendedHaberler = Array(20).fill(haberler).flat();

    useEffect(() => {
        const interval = setInterval(() => {
            setTranslateY(prev => {
                const newValue = prev - itemHeight;
                // Eğer çok aşağı indiyse, yumuşak bir şekilde başa dön
                if (Math.abs(newValue) >= haberler.length * itemHeight * 10) {
                    return -itemHeight; // Tek item kadar aşağıdan başla
                }
                return newValue;
            });
        }, 2500);

        return () => clearInterval(interval);
    }, [itemHeight, haberler.length]);

    return (
        <div className="relative w-full flex flex-col items-center" style={{ minHeight: sliderHeight }}>
            <h2 className="text-xl font-bold text-gray-800 mb-4 mt-2">Son Duyurular</h2>
            <div className="overflow-hidden w-full" style={{ height: sliderHeight }}>
                <div
                    className="flex flex-col gap-2 transition-transform duration-700 ease-linear"
                    style={{
                        transform: `translateY(${translateY}px)`
                    }}
                >
                    {extendedHaberler.map((haber, idx) => (
                        <div
                            key={`${haber.id}-${idx}`}
                            className="flex items-center w-full bg-white border border-gray-200 rounded-lg p-2 shadow-sm min-h-[64px] transition-all duration-300 ease-in-out hover:bg-gray-50"
                        >
                            <Megaphone className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" />
                            <div className="flex flex-col flex-1">
                                <span className="text-gray-700 font-medium text-sm line-clamp-2">
                                    {haber.baslik}
                                </span>
                                <button
                                    onClick={() => navigate(`/haberdetay/${haber.id}`)}
                                    className="flex items-center text-blue-600 hover:underline text-xs mt-1 self-start"
                                >
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="8" x2="12" y2="12" />
                                        <circle cx="12" cy="16" r="1" />
                                    </svg>
                                    Detaylı Bilgi
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const HaberDetay = () => {
    const navigate = useNavigate();
    const { id } = { id: "1" }; // Mock params

    // Mock veri örneği
    const duyuru = {
        id,
        baslik: "Denizli Mahallesi 237 Ada 2 ve 6 Nolu Parsellerde Uygulama İlanı",
        tarih: "26 Mayıs 2025",
        icerik: [
            "İLAN",
            "GEBZE BELEDİYE BAŞKANLIĞIN'DAN",
            "BELEDİYEMİZ SINIRLARINDA YER ALAN DENİZLİ MAHALLESİ G23A11B2A UYGULAMA İMAR PLAN PAFTALARI DENİZLİ MAHALLESİ 237 ADA 2 VE 6 NOLU PARSELLERDE 3194 SAYILI İMAR KANUNUNUN 18. MADDESİNE GÖRE ARAZİ VE ARSA DÜZENLEMESİ (ŞUYULANDIRMA) YAPILMIŞ OLUP; PARSELASYON PLANI, İLAN VE DAĞITIM CETVELLERİ BELEDİYEMİZ ENCÜMENİNİN 06/05/2025 TARİH 2025/1863 SAYILI KARARI İLE ONAYLANMIŞTIR.",
            "14/05/2025 TARİHİNDEN İTİBAREN BELEDİYEMİZ EMLAK VE İSTİMLAK MÜDÜRLÜĞÜNDE BİR AY MÜDDETLE ASKIYA ÇIKARTMAK SÜRETİYLE İLAN EDİLECEKTİR.",
            "BÖLGEDE BULUNAN GAYRİMENKUL HAK SAHİPLERİNE İLANEN TEBLİĞ OLUNUR.",
            "GEBZE BELEDİYE BAŞKANLIĞI",
        ]
    };

    // PDF dosyası state'i
    const [pdfFile, setPdfFile] = useState<File | null>(null);

    // PDF seçildiğinde dosya state'ini güncelle
    const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPdfFile(e.target.files[0]);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-start justify-center py-8">
            <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
                {/* Orta: Detay Kartı */}
                <div className="flex-1 max-w-5xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto min-h-[600px] flex flex-col items-center justify-start">
                        <button
                            onClick={() => navigate(-1)}
                            className="mb-4 text-blue-600 hover:underline self-start"
                        >
                            ← Geri Dön
                        </button>
                        {/* Duyuru başlığı */}
                        <div className="mb-4 self-start">
                            <h2 className="text-3xl font-bold text-gray-800">{duyuru.baslik}</h2>
                        </div>
                        <div className="text-sm text-gray-500 mb-6 flex flex-wrap gap-4 w-full justify-start">
                            <span>📅 {duyuru.tarih}</span>
                        </div>
                        <div className="w-full flex flex-col items-center">
                            <div className="text-gray-700 leading-relaxed w-full text-xs font-semibold flex flex-col items-center">
                                {duyuru.icerik.map((paragraf, index) => {
                                    if (
                                        paragraf === "İLAN" ||
                                        paragraf === "GEBZE BELEDİYE BAŞKANLIĞIN'DAN"
                                    ) {
                                        // "GEBZE BELEDİYE BAŞKANLIĞIN'DAN" ise altına boşluk ekle
                                        return (
                                            <p
                                                key={index}
                                                className={`mb-0 w-full max-w-2xl text-center${paragraf === "GEBZE BELEDİYE BAŞKANLIĞIN'DAN" ? " mb-6" : ""}`}
                                            >
                                                {paragraf}
                                            </p>
                                        );
                                    }
                                    return (
                                        <p
                                            key={index}
                                            className="mb-0 text-justify w-full max-w-2xl"
                                            style={{ textAlign: "justify" }}
                                        >
                                            {paragraf}
                                        </p>
                                    );
                                })}
                            </div>
                            {/* PDF yükleme alanı */}
                            <div className="mt-8 w-full flex items-start justify-start">
                                <div
                                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3 shadow transition-transform hover:scale-105 cursor-pointer"
                                    // ← ml-8 kaldırıldı, kart artık yazıların başladığı hizadan başlar
                                    onClick={() => {
                                        if (pdfFile) {
                                            const url = URL.createObjectURL(pdfFile);
                                            const link = document.createElement('a');
                                            link.href = url;
                                            link.target = "_blank";
                                            link.download = pdfFile.name;
                                            document.body.appendChild(link);
                                            link.click();
                                            setTimeout(() => {
                                                document.body.removeChild(link);
                                                URL.revokeObjectURL(url);
                                            }, 100);
                                        }
                                    }}
                                >
                                    <label className="flex items-center cursor-pointer m-0" onClick={e => e.stopPropagation()}>
                                        <FileText className="w-10 h-10 text-red-600 mr-2 transition-transform duration-200 group-hover:scale-125" />
                                        <span className="text-sm font-medium text-gray-700">Uygulama Sınırı</span>
                                        <input
                                            type="file"
                                            accept="application/pdf"
                                            onChange={handlePdfChange}
                                            className="hidden"
                                        />
                                    </label>
                                    {pdfFile && (
                                        <span className="text-xs text-gray-600 ml-2">{pdfFile.name}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Sağ: Son Duyurular Slider */}
                <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-8">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 pt-6 flex flex-col items-center">
                        <SonHaberlerSlider haberler={mockSonHaberler} navigate={navigate} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HaberDetay;
