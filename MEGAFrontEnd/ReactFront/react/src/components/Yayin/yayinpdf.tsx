import  { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const YayinPDF = () => {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);

    // PDF yüklendiğinde numPages bilgisini al
    const onLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 p-5">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Gebze Manşet PDF</h1>

            {/* PDF'yi Göster */}
            <div className="w-full max-w-4xl border rounded-lg shadow-lg bg-white overflow-hidden">
                <Document
                    file="/yayin/manset/manset.pdf"  // PDF dosyasının yolu
                    onLoadSuccess={onLoadSuccess}   // Yüklenme başarıyla tamamlandığında numPages'ı ayarla
                    loading="Yükleniyor..."
                    className="flex justify-center"
                >
                    <Page pageNumber={pageNumber} width={800} />
                </Document>
            </div>

            {/* Sayfa Geçiş Butonları */}
            <div className="mt-5 flex justify-between w-full max-w-4xl px-4">
                <button
                    onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))} // Sayfayı bir geriye al
                    disabled={pageNumber <= 1} // Eğer birinci sayfadaysa önceki sayfa butonu devre dışı kalsın
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Önceki Sayfa
                </button>

                {/* Sayfa numarasını göster */}
                <span className="font-semibold text-lg">
                    Sayfa {pageNumber} / {numPages}
                </span>

                <button
                    onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))} // Sayfayı bir ileri al
                    disabled={pageNumber >= numPages} // Eğer son sayfadaysa sonraki sayfa butonu devre dışı kalsın
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Sonraki Sayfa
                </button>
            </div>
        </div>
    );
};

export default YayinPDF;
