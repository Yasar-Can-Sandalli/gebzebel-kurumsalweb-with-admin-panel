import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet, apiDelete } from "../services/apiService";

export interface Etkinlik {
    id?: number;
    baslik: string;
    tarih: string;     // "YYYY-MM-DD"
    resimUrl: string;
    aciklama: string;
}

export default function EtkinliklerPage() {
    const [items, setItems] = useState<Etkinlik[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pendingId, setPendingId] = useState<number | null>(null); // silme işlemi

    // filtreler
    const [q, setQ] = useState("");
    const [from, setFrom] = useState<string>("");
    const [to, setTo] = useState<string>("");

    const inputCls =
        "rounded-lg px-3 py-2 bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500/60 outline-none";

    const fetchData = async () => {
        setError(null);
        setLoading(true);
        try {
            const data = await apiGet<Etkinlik[]>("/api/etkinlikler");
            setItems(data || []);
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "Liste yüklenemedi";
            setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const filtered = useMemo(() => {
        const term = q.trim().toLowerCase();
        const f = from ? new Date(from) : null;
        const t = to ? new Date(to) : null;
        return items.filter((e) => {
            const okQ = !term || e.baslik.toLowerCase().includes(term);
            const d = new Date(e.tarih);
            const okFrom = !f || d >= f!;
            const okTo = !t || d <= t!;
            return okQ && okFrom && okTo;
        });
    }, [items, q, from, to]);

    const handleDelete = async (id: number) => {
        if (!confirm("Bu etkinliği silmek istiyor musunuz?")) return;
        setError(null);
        try {
            setPendingId(id);
            const ok = await apiDelete<boolean>(`/api/etkinlikler/delete/${id}`);
            if (ok === false) throw new Error("Silinemedi");
            // optimistic remove
            setItems((prev) => prev.filter((x) => x.id !== id));
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "Silme hatası";
            setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
        } finally {
            setPendingId(null);
        }
    };

    if (loading) return <div className="p-6">Yükleniyor…</div>;

    return (
        <div className="space-y-5">
            {/* Üst bar */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-slate-800">Etkinlikler</h1>
                <Link
                    to="yeni"
                    className="px-3 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-sky-600 shadow-lg shadow-blue-500/20 hover:brightness-110"
                >
                    + Yeni Etkinlik
                </Link>
            </div>

            {/* Filtreler */}
            <div className="bg-white rounded-xl p-4 shadow-md shadow-blue-500/5 ring-1 ring-slate-200/60">
                <div className="grid gap-3 md:grid-cols-4">
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Başlığa göre ara…"
                        className={inputCls}
                    />
                    <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className={inputCls} />
                    <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className={inputCls} />
                    <button
                        onClick={() => { setQ(""); setFrom(""); setTo(""); }}
                        className="rounded-lg px-3 py-2 ring-1 ring-slate-200 hover:bg-slate-50"
                    >
                        Temizle
                    </button>
                </div>
            </div>

            {error && (
                <div className="text-red-600 bg-red-50 rounded-lg px-4 py-2 ring-1 ring-red-200">
                    {error}
                </div>
            )}

            {/* Data Grid */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-md shadow-blue-500/5 ring-1 ring-slate-200/60">
                <table className="min-w-full text-sm">
                    <thead className="bg-slate-50 text-slate-700">
                    <tr className="text-left">
                        <th className="px-4 py-3 w-28">Afiş</th>
                        <th className="px-4 py-3">Başlık</th>
                        <th className="px-4 py-3 w-40">Tarih</th>
                        <th className="px-4 py-3">Açıklama</th>
                        <th className="px-4 py-3 w-44">İşlemler</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    {filtered.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                                Kayıt bulunamadı.
                            </td>
                        </tr>
                    ) : (
                        filtered.map((e) => (
                            <tr key={e.id} className="hover:bg-slate-50/60 transition-colors">
                                <td className="px-4 py-3">
                                    {e.resimUrl && (
                                        <img
                                            src={e.resimUrl}
                                            alt={e.baslik}
                                            className="w-20 h-24 object-cover rounded-md ring-1 ring-slate-200"
                                        />
                                    )}
                                </td>
                                <td className="px-4 py-3 font-medium text-slate-800">{e.baslik}</td>
                                <td className="px-4 py-3 text-slate-600">
                                    {new Date(e.tarih).toLocaleDateString("tr-TR")}
                                </td>
                                <td className="px-4 py-3 max-w-[520px] text-slate-700">
                    <span className="line-clamp-2" title={e.aciklama}>
                      {e.aciklama}
                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <Link
                                            to={`${e.id}/duzenle`}
                                            className="px-3 py-1.5 rounded-lg ring-1 ring-slate-200 hover:bg-slate-50"
                                        >
                                            Güncelle
                                        </Link>
                                        <button
                                            onClick={() => e.id && handleDelete(e.id)}
                                            disabled={pendingId === e.id}
                                            className="px-3 py-1.5 rounded-lg ring-1 ring-red-200 text-red-600 hover:bg-red-50 disabled:opacity-60"
                                        >
                                            {pendingId === e.id ? "Siliniyor…" : "Sil"}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
