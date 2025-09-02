// src/sayfalar/kurumsal/KurumsalYonetimPage.tsx
import { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../loader.tsx";
import { fetchYonetimRows, YonetimRow } from "../../services/pageService.tsx";
import { MoreHorizontal, Search } from "lucide-react";
import { useClickOutside } from "../../../useClickOutside.tsx";

export default function KurumsalYonetimPage() {
    const [rows, setRows] = useState<YonetimRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [openAction, setOpenAction] = useState<number | null>(null);

    const actionRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    useClickOutside(actionRef, () => setOpenAction(null));

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
                String(r.id).includes(q)
        );
    }, [rows, search]);

    if (loading) return <Loader />;

    return (
        <div className="space-y-5">
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
                        placeholder="İsim / ID ara..."
                        className={inputCls}
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                </div>
                <div className="mt-2 text-xs text-slate-500">{filtered.length} kayıt</div>
            </div>

            {/* Tablo */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-md shadow-blue-500/5 ring-1 ring-slate-200/60">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-700">
                    <tr>
                        <th className="px-4 py-3 text-left w-20">ID</th>
                        <th className="px-4 py-3 text-left">İsim Soyisim</th>
                        <th className="px-4 py-3 text-left">Resim URL</th>
                        <th className="px-4 py-3 text-left">Pozisyon</th>
                        <th className="px-4 py-3 text-right w-24">İşlemler</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    {filtered.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-4 py-3">{r.id}</td>
                            <td className="px-4 py-3">{r.isimSoyisim}</td>
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={r.resimUrl}
                                        alt={r.isimSoyisim}
                                        className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                                        onError={(e) =>
                                            (e.currentTarget.style.visibility = "hidden")
                                        }
                                    />
                                    <code className="text-xs text-slate-600 break-all">
                                        {r.resimUrl}
                                    </code>
                                </div>
                            </td>
                            <td className="px-4 py-3">{r.pozisyon}</td>
                            <td className="px-4 py-3 text-right relative">
                                <button
                                    className="p-2 rounded-md hover:bg-slate-100 text-slate-600"
                                    onClick={() =>
                                        setOpenAction(openAction === r.id ? null : r.id)
                                    }
                                >
                                    <MoreHorizontal size={16} />
                                </button>

                                {/* Action menu */}
                                {openAction === r.id && (
                                    <div
                                        ref={actionRef}
                                        className="absolute right-4 top-full mt-2 w-44 bg-white rounded-xl shadow-lg shadow-blue-500/10 ring-1 ring-slate-200/60 z-20 overflow-hidden"
                                    >
                                        <button
                                            className="block w-full text-left px-3 py-2 hover:bg-slate-50"
                                            onClick={() => {
                                                setOpenAction(null);
                                                navigate(`/panel/kurumsal/yonetim/${r.id}/edit`, {
                                                    // İstersen formu hızla doldurmak için state ile ön veri de gönderebilirsin
                                                    state: r,
                                                });
                                            }}
                                        >
                                            Düzenle
                                        </button>
                                        <button className="block w-full text-left px-3 py-2 hover:bg-slate-50">
                                            Detay
                                        </button>
                                        <button className="block w-full text-left px-3 py-2 text-red-600 hover:bg-slate-50">
                                            Sil
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}

                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                                Kayıt bulunamadı.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
