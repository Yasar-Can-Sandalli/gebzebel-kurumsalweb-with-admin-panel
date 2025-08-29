import { useState, useEffect } from "react";
import { FileText } from "lucide-react";

// API'den gelecek veri tipi
interface KurumsalKimlikDosya {
    id: number;
    baslik: string;
    dosyaUrl: string;
    tarih: string;
    aktif: number;
    kategori: string;
}

const Kimlik = () => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [documents, setDocuments] = useState<KurumsalKimlikDosya[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoaded(true);
        setIsLoading(true);
        fetch("http://localhost:8080/api/kurumsal/kurumsal-kimlik")
            .then((response) => response.json())
            .then((data) => {
                setDocuments(data);
                setIsLoading(false);
            })
            .catch(() => {
                setDocuments([]);
                setIsLoading(false);
            });
    }, []);



    return (
        <div id="pcoded" className="pcoded">
            <div className="pcoded-overlay-box"></div>
            <div className="pcoded-container navbar-wrapper">
                <div className="pcoded-main-container">
                    <div className="pcoded-wrapper">
                        <div className="pcoded-content">
                            <div className="pcoded-inner-content">
                                <div className="main-body ">
                                    <div className="page-wrapper" style={{ marginTop: '20px', paddingLeft: '20px', paddingRight: '20px' }}>
                                        <div className="flex flex-col">
                                            <div className="flex-1 bg-white shadow-xl rounded-lg pb-[189px] mb-8">
                                                <div className="text-center mb-6 md:mb-8">
                                                    <h1 className="text-xl md:text-3xl font-bold text-white bg-red-900 border-2 border-gray-100 inline-block px-4 py-3 rounded-2xl">
                                                        KURUMSAL KİMLİK
                                                    </h1>
                                                </div>

                                                {/* Liste Görünümünde Doküman Kartları */}
                                                {isLoading ? (
                                                    <div className="text-center text-gray-500 py-8">Yükleniyor...</div>
                                                ) : (
                                                    <div className="flex flex-col gap-4 mb-6">
                                                        {documents.length === 0 ? (
                                                            <div className="text-center text-gray-500 py-8">Kayıt bulunamadı.</div>
                                                        ) : (
                                                            documents.map((doc, index) => (
                                                                <div
                                                                    key={doc.id}
                                                                    className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-between shadow-md"
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <FileText className="text-red-500" size={32} />
                                                                        <span className="text-sm font-medium text-blue-700">{doc.baslik}</span>
                                                                    </div>
                                                                    <a
                                                                        href={doc.dosyaUrl}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-blue-600 hover:underline text-sm"
                                                                    >
                                                                        Görüntüle
                                                                    </a>
                                                                </div>
                                                            ))
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Kimlik;