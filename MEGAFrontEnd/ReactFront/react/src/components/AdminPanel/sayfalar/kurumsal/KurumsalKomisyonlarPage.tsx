import { useEffect, useState } from "react";
import { Search, Users, Edit, Trash2, FileText } from "lucide-react";
import Loader from "../../../loader.tsx";
import { apiGet } from "../../services/apiService";

interface KomisyonUyesi {
    id: number;
    ad: string;
    unvan: string;
    gorev: string;
    tip: string;
    imgUrl?: string;
}

export default function KurumsalKomisyonlarPage() {
    const [komisyonUyeleri, setKomisyonUyeleri] = useState<KomisyonUyesi[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    const inputCls =
        "w-full rounded-lg px-3 py-2 bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500/60 outline-none";

    useEffect(() => {
        let on = true;
        setLoading(true);
        setError(null);
        
        const fetchKomisyonUyeleri = async () => {
            try {
                const response = await apiGet<any>('/api/kurumsal/etik-komisyonu');
                if (on) {
                    // API'den gelen veri yapısına göre uyarlama
                    const uyeler = response.etikKomisyonu || response || [];
                    setKomisyonUyeleri(Array.isArray(uyeler) ? uyeler : []);
                }
            } catch (e: any) {
                if (on) {
                    setError(e?.message || "Komisyon üyeleri alınamadı");
                }
            } finally {
                if (on) {
                    setLoading(false);
                }
            }
        };

        fetchKomisyonUyeleri();
        
        return () => {
            on = false;
        };
    }, []);

    const filteredUyeler = komisyonUyeleri.filter(uye =>
        uye.ad.toLowerCase().includes(search.toLowerCase()) ||
        uye.unvan?.toLowerCase().includes(search.toLowerCase()) ||
        uye.gorev?.toLowerCase().includes(search.toLowerCase()) ||
        uye.tip?.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <Loader />;

    return (
        <div className="space-y-5">
            <style dangerouslySetInnerHTML={{
                __html: `
                    .line-clamp-1 {
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                    .line-clamp-2 {
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                `
            }} />
            
            {/* Başlık */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-slate-800">Etik Komisyonu</h2>
            </div>

            {/* Hata mesajı */}
            {error && (
                <div className="text-red-600 bg-red-50 rounded-lg px-4 py-2 ring-1 ring-red-200">
                    {error}
                </div>
            )}

            {/* Arama kutusu */}
            <div className="bg-white rounded-xl p-4 shadow-md shadow-blue-500/5 ring-1 ring-slate-200/60">
                <div className="relative max-w-md">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="İsim, unvan, görev ara..."
                        className={inputCls}
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                </div>
                <div className="mt-2 text-xs text-slate-500">{filteredUyeler.length} üye</div>
            </div>

            {/* Komisyon Üyeleri Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUyeler.map((uye) => (
                    <div key={uye.id} className="bg-white rounded-xl p-6 shadow-md shadow-blue-500/5 ring-1 ring-slate-200/60 hover:shadow-lg transition-shadow">
                        {/* Profil Fotoğrafı */}
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-slate-200 bg-slate-100 flex items-center justify-center">
                                {uye.imgUrl ? (
                                    <img
                                        src={uye.imgUrl.startsWith('http') ? uye.imgUrl : `http://localhost:8080/api/files/image/${uye.imgUrl}`}
                                        alt={uye.ad}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            const target = e.currentTarget as HTMLImageElement;
                                            const nextElement = target.nextElementSibling as HTMLElement;
                                            target.style.display = 'none';
                                            if (nextElement) {
                                                nextElement.style.display = 'flex';
                                            }
                                        }}
                                    />
                                ) : null}
                                <div className="w-full h-full flex items-center justify-center text-slate-400" style={{display: uye.imgUrl ? 'none' : 'flex'}}>
                                    <Users size={24} />
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-slate-800 text-lg">{uye.ad}</h3>
                                <p className="text-slate-600 text-sm">{uye.unvan}</p>
                            </div>
                        </div>

                        {/* Görev Bilgileri */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-600">
                                <FileText size={16} />
                                <span className="text-sm font-medium">Görev:</span>
                                <span className="text-sm">{uye.gorev || "Belirtilmemiş"}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-slate-600">
                                <Users size={16} />
                                <span className="text-sm font-medium">Tip:</span>
                                <span className="text-sm capitalize">{uye.tip || "Belirtilmemiş"}</span>
                            </div>
                        </div>

                        {/* İşlemler */}
                        <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-slate-100">
                            <button
                                className="p-2 rounded-lg hover:bg-green-50 text-green-600 transition-colors"
                                onClick={() => {
                                    // Düzenleme işlemi burada yapılacak
                                    console.log('Düzenle:', uye.id);
                                }}
                                title="Düzenle"
                            >
                                <Edit size={16} />
                            </button>
                            <button
                                className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                                onClick={() => {
                                    if (confirm(`${uye.ad} üyesini silmek istediğinizden emin misiniz?`)) {
                                        // Silme işlemi burada yapılacak
                                        console.log('Silinecek:', uye.id);
                                    }
                                }}
                                title="Sil"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}

                {filteredUyeler.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 text-slate-500">
                        <Users size={48} className="text-slate-300 mb-4" />
                        <h3 className="text-lg font-medium mb-2">Komisyon üyesi bulunamadı</h3>
                        <p className="text-sm">Arama kriterlerinize uygun komisyon üyesi bulunmamaktadır.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
