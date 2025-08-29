import { FileText, Book } from "lucide-react";
const documents = [
    { name: "SÖZ VERDİĞİMİZ GİBİ", url: "https://www.gebze.bel.tr/dosya/20200807140647.pdf" },
];

export default function CombinedCard() {
    return (
        <div className="flex justify-center pt-6 pb-8 sm:pt-8 sm:pb-10 px-4">
            <div className="flex flex-col space-y-6 w-full max-w-[960px]">
                {/* Ana Kart */}
                <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Başlık */}
                    <div className="w-full flex justify-center p-4">
                        <div className="text-center text-xl md:text-2xl lg:text-3xl font-extrabold text-blue-900 bg-white border-2 border-blue-900 px-4 md:px-6 py-2 md:py-3 rounded-xl shadow-md">
                            GEBZE BELEDİYESİ PROJELERİ
                        </div>
                    </div>

                    {/* Sabit Görsel Kartı */}
                    <div className="px-4 md:px-6 pb-4 md:pb-6 flex justify-center">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-[700px] aspect-[4/3]">
                            <div className="relative w-full h-full">
                                <div className="absolute inset-0 z-10"></div>
                                <img
                                    src="/images/yayınlar/yayınlar.png"
                                    className="w-full h-full object-cover"
                                    alt="Kültür Yayını"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Yayınlarımız Bölümü */}
                    <div className="p-4 md:p-6">
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-4 border-b pb-3 border-blue-100">
                                <Book className="text-orange-500" size={28} />
                                <div className="text-lg md:text-xl font-bold text-blue-900">Yayınlarımız</div>
                            </div>

                            <div className="space-y-3">
                                {documents.map((doc, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col sm:flex-row sm:items-center justify-between bg-blue-50 hover:bg-blue-100 p-3 md:p-4 rounded-lg transition shadow-sm hover:shadow-md space-y-2 sm:space-y-0 sm:space-x-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            <FileText className="text-orange-500 flex-shrink-0" size={20} />
                                            <span className="text-blue-900 font-medium text-sm sm:text-base">
                                                {doc.name}
                                            </span>
                                        </div>
                                        <a
                                            href={doc.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded text-xs sm:text-sm whitespace-nowrap transition text-center"
                                        >
                                            Görüntüle
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}