// src/sayfalar/kurumsal/KurumsalYonetimPage.tsx
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../loader.tsx";
import { fetchYonetimRows, YonetimRow } from "../../services/pageService.tsx";
import { Search, Mail, Phone, User, Edit, Trash2, X, Check } from "lucide-react";

export default function KurumsalYonetimPage() {
    const [rows, setRows] = useState<YonetimRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const inputCls =
        "w-full rounded-lg px-3 py-2 bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500/60 outline-none";

    useEffect(() => {
        let on = true;
        setLoading(true);
        setError(null);
        fetchYonetimRows()
            .then((d) => on && setRows(d))
            .catch((e) => on && setError(e?.message || "Yönetim listesi alınamadı"))
            .finally(() => on && setLoading(false));
        return () => {
            on = false;
        };
    }, []);

    const filtered = useMemo(() => {
        const q = search.toLowerCase().trim();
        if (!q) return rows;
        return rows.filter(
            (r) =>
                r.isimSoyisim.toLowerCase().includes(q) ||
                String(r.id).includes(q) ||
                r.pozisyon?.toLowerCase().includes(q) ||
                r.email?.toLowerCase().includes(q) ||
                r.telefon?.includes(q) ||
                r.mudurlukler?.toLowerCase().includes(q)
        );
    }, [rows, search]);

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
                <h2 className="text-2xl font-semibold text-slate-800">Yönetim</h2>
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
                        placeholder="İsim, pozisyon, email, telefon ara..."
                        className={inputCls}
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                </div>
                <div className="mt-2 text-xs text-slate-500">{filtered.length} kayıt</div>
            </div>

            {/* Tablo */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-md shadow-blue-500/5 ring-1 ring-slate-200/60">
                <table className="w-full text-base min-w-[1000px]">
                    <thead className="bg-slate-50 text-slate-700">
                    <tr>
                        <th className="px-3 py-4 text-left w-12 font-semibold">ID</th>
                        <th className="px-3 py-4 text-left w-16 font-semibold">Resim</th>
                        <th className="px-3 py-4 text-left w-48 font-semibold">İsim Soyisim</th>
                        <th className="px-3 py-4 text-left w-40 font-semibold">Pozisyon</th>
                        <th className="px-3 py-4 text-left w-48 font-semibold">Email</th>
                        <th className="px-3 py-4 text-left w-32 font-semibold">Telefon</th>
                        <th className="px-3 py-4 text-center w-16 font-semibold">Durum</th>
                        <th className="px-3 py-4 text-right w-20 font-semibold">İşlemler</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    {filtered.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-3 py-4 font-mono text-sm text-slate-700 font-medium">{r.id}</td>
                            
                            {/* Resim */}
                            <td className="px-3 py-4">
                                <div className="w-12 h-12 rounded-lg overflow-hidden ring-1 ring-slate-200 bg-slate-100 flex items-center justify-center">
                                    {r.resimUrl ? (
                                        <img
                                            src={r.resimUrl}
                                            alt={r.isimSoyisim}
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
                                    <div className="w-full h-full flex items-center justify-center text-slate-400" style={{display: r.resimUrl ? 'none' : 'flex'}}>
                                        <User size={16} />
                                    </div>
                                </div>
                            </td>
                            
                            {/* İsim Soyisim */}
                            <td className="px-3 py-4">
                                <div className="font-semibold text-slate-800 text-sm leading-tight break-words">
                                    {r.isimSoyisim}
                                </div>
                                {r.biyografi && (
                                    <div className="text-xs text-slate-500 mt-1 line-clamp-1 leading-tight">
                                        {r.biyografi.length > 40 ? `${r.biyografi.substring(0, 40)}...` : r.biyografi}
                                    </div>
                                )}
                            </td>
                            
                            {/* Pozisyon */}
                            <td className="px-3 py-4">
                                <div className="font-medium text-slate-700 text-sm leading-tight break-words">
                                    {r.pozisyon}
                                </div>
                            </td>
                            
                            {/* Email */}
                            <td className="px-3 py-4">
                                {r.email ? (
                                    <div className="flex items-start gap-1 text-slate-600">
                                        <Mail size={12} className="mt-0.5 flex-shrink-0" />
                                        <span className="text-sm break-all leading-tight">{r.email}</span>
                                    </div>
                                ) : (
                                    <span className="text-slate-400 text-sm">-</span>
                                )}
                            </td>
                            
                            {/* Telefon */}
                            <td className="px-3 py-4">
                                {r.telefon ? (
                                    <div className="flex items-center gap-1 text-slate-600">
                                        <Phone size={12} />
                                        <span className="text-sm">{r.telefon}</span>
                                    </div>
                                ) : (
                                    <span className="text-slate-400 text-sm">-</span>
                                )}
                            </td>
                            
                            {/* Durum */}
                            <td className="px-3 py-4">
                                <div className="flex items-center justify-center">
                                    {r.delta === 1 ? (
                                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                            <Check className="w-4 h-4 text-white" />
                                        </div>
                                    ) : (
                                        <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                                            <X className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </div>
                            </td>
                            
                            {/* İşlemler */}
                            <td className="px-3 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <button
                                        className="p-2 rounded-lg hover:bg-green-50 text-green-600 transition-colors"
                                        onClick={() => {
                                            navigate(`/panel/kurumsal/yonetim/${r.id}/edit`, {
                                                state: { 
                                                    ...r, 
                                                    mode: 'yonetim',
                                                    tableName: 'kurumsal_yonetim_semasi'
                                                },
                                            });
                                        }}
                                        title="Düzenle"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                                        onClick={() => {
                                            if (confirm(`${r.isimSoyisim} kaydını silmek istediğinizden emin misiniz?`)) {
                                                // Silme işlemi burada yapılacak
                                                console.log('Silinecek:', r.id);
                                            }
                                        }}
                                        title="Sil"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}

                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                                <div className="flex flex-col items-center gap-2">
                                    <User size={32} className="text-slate-300" />
                                    <div>Kayıt bulunamadı.</div>
                                </div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
