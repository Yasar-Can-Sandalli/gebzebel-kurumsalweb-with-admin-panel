import { useEffect, useState } from "react";
import { Search, FileText, Calendar, Download, Edit, Trash2, Filter } from "lucide-react";
import Loader from "../../../loader.tsx";
import { apiGet } from "../../services/apiService";

interface Rapor {
    id: number;
    baslik: string;
    dosyaUrl: string;
    tarih: string;
    kategori: string;
    aktif: number;
}

export default function KurumsalRaporlarPage() {
    const [raporlar, setRaporlar] = useState<Rapor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [selectedKategori, setSelectedKategori] = useState<string>("");

    const inputCls =
        "w-full rounded-lg px-3 py-2 bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500/60 outline-none";

    useEffect(() => {
        let on = true;
        setLoading(true);
        setError(null);
        
        const fetchRaporlar = async () => {
            try {
                const response = await apiGet<Rapor[]>('/api/kurumsal/kurumsal-raporlar');
                if (on) {
                    setRaporlar(response || []);
                }
            } catch (e: any) {
                if (on) {
                    setError(e?.message || "Raporlar alınamadı");
                }
            } finally {
                if (on) {
                    setLoading(false);
                }
            }
        };

        fetchRaporlar();
        
        return () => {
            on = false;
        };
    }, []);

    const filteredRaporlar = raporlar.filter(rapor => {
        const matchesSearch = rapor.baslik.toLowerCase().includes(search.toLowerCase()) ||
                            rapor.kategori?.toLowerCase().includes(search.toLowerCase());
        const matchesKategori = !selectedKategori || rapor.kategori === selectedKategori;
        return matchesSearch && matchesKategori;
    });

    const kategoriler = [...new Set(raporlar.map(r => r.kategori).filter(Boolean))];

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('tr-TR');
        } catch {
            return dateString;
        }
    };

    const getKategoriColor = (kategori: string) => {
        const colors: { [key: string]: string } = {
            'kurumsal_rapor': 'bg-blue-100 text-blue-800',
            'kurumsal_kimlik': 'bg-green-100 text-green-800',
            'kurumsal_doc': 'bg-purple-100 text-purple-800',
            'meclis_karari': 'bg-orange-100 text-orange-800',
        };
        return colors[kategori] || 'bg-gray-100 text-gray-800';
    };

    if (loading) return <Loader />;

    return (
        <div className="space-y-5">
            {/* Başlık */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-slate-800">Kurumsal Raporlar</h2>
            </div>

            {/* Hata mesajı */}
            {error && (
                <div className="text-red-600 bg-red-50 rounded-lg px-4 py-2 ring-1 ring-red-200">
                    {error}
                </div>
            )}

            {/* Filtreler */}
            <div className="bg-white rounded-xl p-4 shadow-md shadow-blue-500/5 ring-1 ring-slate-200/60">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Arama */}
                    <div className="relative flex-1">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Rapor başlığı veya kategori ara..."
                            className={inputCls}
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    </div>
                    
                    {/* Kategori Filtresi */}
                    <div className="relative">
                        <select
                            value={selectedKategori}
                            onChange={(e) => setSelectedKategori(e.target.value)}
                            className={inputCls}
                        >
                            <option value="">Tüm Kategoriler</option>
                            {kategoriler.map(kategori => (
                                <option key={kategori} value={kategori}>
                                    {kategori.replace(/_/g, ' ').toUpperCase()}
                                </option>
                            ))}
                        </select>
                        <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                    </div>
                </div>
                <div className="mt-2 text-xs text-slate-500">{filteredRaporlar.length} rapor</div>
            </div>

            {/* Raporlar Listesi */}
            <div className="space-y-4">
                {filteredRaporlar.map((rapor) => (
                    <div key={rapor.id} className="bg-white rounded-xl p-6 shadow-md shadow-blue-500/5 ring-1 ring-slate-200/60 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-lg font-semibold text-slate-800">{rapor.baslik}</h3>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getKategoriColor(rapor.kategori)}`}>
                                        {rapor.kategori.replace(/_/g, ' ').toUpperCase()}
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={16} />
                                        <span>{formatDate(rapor.tarih)}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FileText size={16} />
                                        <span>PDF Dosyası</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <a
                                        href={rapor.dosyaUrl.startsWith('http') ? rapor.dosyaUrl : `http://localhost:8080/api/files/${rapor.dosyaUrl}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <Download size={16} />
                                        İndir
                                    </a>
                                    
                                    <button
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                                        onClick={() => {
                                            // Önizleme işlemi burada yapılacak
                                            window.open(rapor.dosyaUrl.startsWith('http') ? rapor.dosyaUrl : `http://localhost:8080/api/files/${rapor.dosyaUrl}`, '_blank');
                                        }}
                                    >
                                        <FileText size={16} />
                                        Önizle
                                    </button>
                                </div>
                            </div>

                            {/* İşlemler */}
                            <div className="flex items-center gap-2 ml-4">
                                <button
                                    className="p-2 rounded-lg hover:bg-green-50 text-green-600 transition-colors"
                                    onClick={() => {
                                        // Düzenleme işlemi burada yapılacak
                                        console.log('Düzenle:', rapor.id);
                                    }}
                                    title="Düzenle"
                                >
                                    <Edit size={16} />
                                </button>
                                <button
                                    className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                                    onClick={() => {
                                        if (confirm(`${rapor.baslik} raporunu silmek istediğinizden emin misiniz?`)) {
                                            // Silme işlemi burada yapılacak
                                            console.log('Silinecek:', rapor.id);
                                        }
                                    }}
                                    title="Sil"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredRaporlar.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                        <FileText size={48} className="text-slate-300 mb-4" />
                        <h3 className="text-lg font-medium mb-2">Rapor bulunamadı</h3>
                        <p className="text-sm">Arama kriterlerinize uygun rapor bulunmamaktadır.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
