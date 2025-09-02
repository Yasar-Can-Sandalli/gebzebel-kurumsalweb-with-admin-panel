import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet, apiDelete, apiPut } from "../services/apiService";
import type { Haber } from "../types/Haber";

export default function HaberlerPage() {
    const [items, setItems] = useState<Haber[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    // filtreler
    const [q, setQ] = useState("");
    const [from, setFrom] = useState<string>("");
    const [to, setTo] = useState<string>("");

    // seçimler
    const [selected, setSelected] = useState<number[]>([]);

    const inputCls =
        "rounded-lg px-3 py-2 bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500/60 outline-none";

    const fetchData = async () => {
        setError(null);
        setLoading(true);
        try {
            const data = await apiGet<Haber[]>("/api/haberler/tarihe-gore");
            setItems(data || []);
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "Liste yüklenemedi";
            setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    // filtreleme
    const filtered = useMemo(() => {
        const term = q.trim().toLowerCase();
        const f = from ? new Date(from) : null;
        const t = to ? new Date(to) : null;
        return items.filter((h) => {
            const okQ = !term || h.baslik.toLowerCase().includes(term);
            const d = new Date(h.tarih);
            const okFrom = !f || d >= f!;
            const okTo = !t || d <= t!;
            return okQ && okFrom && okTo;
        });
    }, [items, q, from, to]);

    // seçim
    const toggleOne = (id: number) =>
        setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

    const allIds = filtered.map((x) => x.id!).filter(Boolean);
    const allChecked = allIds.length > 0 && allIds.every((id) => selected.includes(id));
    const toggleAll = () =>
        setSelected((prev) => (allChecked ? prev.filter((id) => !allIds.includes(id)) : Array.from(new Set([...prev, ...allIds]))));

    // TOPLU SİL
    const bulkDelete = async () => {
        if (selected.length === 0) return;
        if (!confirm(`${selected.length} haber silinsin mi?`)) return;

        setError(null);
        setPending(true);
        try {
            await Promise.all(selected.map((id) => apiDelete<boolean>(`/api/haberler/${id}`)));
            setItems((prev) => prev.filter((h) => !selected.includes(h.id!)));
            setSelected([]);
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "Silme hatası";
            setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
        } finally {
            setPending(false);
        }
    };

    // TOPLU ARŞİVLE
    const bulkArchive = async () => {
        if (selected.length === 0) return;
        if (!confirm(`${selected.length} haber arşivlensin mi?`)) return;

        setError(null);
        setPending(true);
        try {
            await Promise.all(selected.map((id) => apiPut(`/api/haberler/${id}/arsivle`, {})));
            setItems((prev) => prev.filter((h) => !selected.includes(h.id!))); // arşivlenenler listeden düşsün
            setSelected([]);
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "Arşivleme hatası";
            setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
        } finally {
            setPending(false);
        }
    };

    if (loading) return <div className="p-6">Yükleniyor…</div>;

    return (
        <div className="space-y-5">
            <h1 className="text-2xl font-semibold text-slate-800">Haberler</h1>

            <div className="bg-white rounded-2xl shadow-md shadow-blue-500/5 ring-1 ring-slate-200/60 overflow-hidden flex flex-col">

                {/* STICKY ÜST BAR */}
                <div className="sticky top-0 z-10 bg-white">
                    <div className="p-4 border-b">
                        <div className="grid gap-3 md:grid-cols-[1fr,auto] md:items-center">
                            {/* Filtreler */}
                            <div className="grid gap-3 md:grid-cols-4">
                                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Başlığa göre ara…" className={inputCls} />
                                <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className={inputCls} />
                                <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className={inputCls} />
                                <button onClick={() => { setQ(""); setFrom(""); setTo(""); }} className="rounded-lg px-3 py-2 ring-1 ring-slate-200 hover:bg-slate-50">Temizle</button>
                            </div>

                            {/* Aksiyonlar */}
                            <div className="flex items-center gap-2 justify-end">
                                {/* Arşivle */}
                                <button onClick={bulkArchive} disabled={selected.length === 0 || pending} className="px-3 py-2 rounded-lg bg-amber-500 text-white disabled:opacity-60" title="Seçili haberleri arşivle">
                                    Arşivle
                                </button>
                                {/* Toplu Sil */}
                                <button onClick={bulkDelete} disabled={selected.length === 0 || pending} className="px-3 py-2 rounded-lg bg-red-500 text-white disabled:opacity-60" title="Seçili haberleri sil">
                                    Sil
                                </button>
                                {/* + Yeni Haber */}
                                <Link to="yeni" className="px-3 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-sky-600 shadow-lg shadow-blue-500/20 hover:brightness-110">
                                    + Yeni Haber
                                </Link>
                            </div>
                        </div>

                        {error && (
                            <div className="mt-3 text-red-600 bg-red-50 rounded-lg px-4 py-2 ring-1 ring-red-200">
                                {error}
                            </div>
                        )}
                    </div>
                </div>

                {/* TABLO */}
                <div className="overflow-y-auto" style={{ maxHeight: "70vh" }}>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-slate-50 text-slate-700">
                            <tr className="text-left">
                                <th className="px-4 py-3 w-10">
                                    <input type="checkbox" checked={allChecked} onChange={toggleAll} />
                                </th>
                                <th className="px-4 py-3">Başlık</th>
                                <th className="px-4 py-3 w-40">Tarih</th>
                                <th className="px-4 py-3 w-36">Kategori</th>
                                <th className="px-4 py-3 w-36">İşlemler</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-6 text-center text-slate-500">Kayıt bulunamadı.</td>
                                </tr>
                            ) : (
                                filtered.map((h) => (
                                    <tr key={h.id} className="hover:bg-slate-50/60 transition-colors">
                                        <td className="px-4 py-3">
                                            {h.id !== undefined && (
                                                <input type="checkbox" checked={selected.includes(h.id)} onChange={() => toggleOne(h.id!)} />
                                            )}
                                        </td>
                                        <td className="px-4 py-3 font-medium text-slate-800">{h.baslik}</td>
                                        <td className="px-4 py-3 text-slate-600">{new Date(h.tarih).toLocaleDateString("tr-TR")}</td>
                                        <td className="px-4 py-3">{h.kategori?.ad || "-"}</td>
                                        <td className="px-4 py-3">
                                            <Link to={`duzenle/${h.id}`} className="px-3 py-1.5 rounded-lg ring-1 ring-slate-200 hover:bg-slate-50">Güncelle</Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}