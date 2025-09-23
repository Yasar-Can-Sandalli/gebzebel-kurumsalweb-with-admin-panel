import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { apiDelete, apiGet } from "../services/apiService";
import { RefreshCw, Settings, Search } from "lucide-react";

// DB şemasıyla uyumlu tip (geriye dönük uyumluluk için alternatif adlar da eklendi)
type Duyuru = {
    id?: number;
    baslik: string;
    ozet?: string;          // DB: OZET
    icerik?: string;        // eski API uyumluluğu için
    tarih?: string;         // DB: TARIH (yyyy-MM-dd HH:mm:ss)
    duyuruTarih?: string;   // eski API uyumluluğu için
    onemli?: boolean | number; // DB: ONEMLI (1/0) veya boolean
};

function getDateDisplay(d?: string) {
    const raw = d?.trim();
    if (!raw) return "-";
    // "2025-05-21 15:17:21" -> "2025-05-21T15:17:21"
    const iso = raw.includes(" ") ? raw.replace(" ", "T") : raw;
    const dt = new Date(iso);
    if (isNaN(dt.getTime())) return raw;
    return dt.toLocaleString("tr-TR");
}
function isTrue(v: any) {
    return v === true || v === 1 || v === "1" || v === "true";
}

export default function DuyuruPage() {
    const [items, setItems] = useState<Duyuru[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    // filtre
    const [q, setQ] = useState("");

    // seçim / satır menüsü
    const [selected, setSelected] = useState<number[]>([]);
    const [rowMenuOpenId, setRowMenuOpenId] = useState<number | null>(null);

    const location = useLocation();

    const inputCls =
        "rounded-lg px-3 py-2 bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500/60 outline-none";

    const load = async () => {
        setError(null);
        setLoading(true);
        try {
            const data = await apiGet<Duyuru[]>("/api/duyurular");
            setItems(data || []);
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "Liste yüklenemedi";
            setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);
    // yeni/editten dönüşte tazele
    useEffect(() => { load(); /* eslint-disable-next-line */ }, [location.search, (location.state as any)?.refreshId]);

    const filtered = useMemo(() => {
        const term = q.trim().toLowerCase();
        return items.filter((e) => {
            const ozet = e.ozet ?? e.icerik ?? "";
            return (
                !term ||
                e.baslik?.toLowerCase().includes(term) ||
                ozet.toLowerCase().includes(term)
            );
        });
    }, [items, q]);

    const toggleOne = (id: number) =>
        setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

    const allIds = filtered.map((x) => x.id!).filter(Boolean);
    const allChecked = allIds.length > 0 && allIds.every((id) => selected.includes(id));
    const toggleAll = () =>
        setSelected((prev) =>
            allChecked ? prev.filter((id) => !allIds.includes(id)) : Array.from(new Set([...prev, ...allIds]))
        );

    const deleteOne = async (id: number) => {
        const rec = items.find((x) => x.id === id);
        if (!confirm(`${rec?.baslik || id} kaydını silmek istiyor musunuz?`)) return;
        setPending(true);
        setError(null);
        try {
            await apiDelete<boolean>(`/api/duyurular/delete/${id}`);
            setItems((prev) => prev.filter((e) => e.id !== id));
            setSelected((prev) => prev.filter((x) => x !== id));
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "Silme hatası";
            setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
        } finally {
            setPending(false);
            setRowMenuOpenId(null);
        }
    };

    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            const t = e.target as HTMLElement;
            if (!t.closest("[data-row-menu-root]")) setRowMenuOpenId(null);
        };
        document.addEventListener("click", onDocClick);
        return () => document.removeEventListener("click", onDocClick);
    }, []);

    if (loading) return <div className="p-6">Yükleniyor…</div>;

    return (
        <div className="space-y-5">
            <h1 className="text-2xl font-semibold text-slate-800">Duyurular</h1>

            <div className="bg-white rounded-2xl shadow-md shadow-blue-500/5 ring-1 ring-slate-200/60 overflow-hidden flex flex-col">
                {/* ÜST BAR — sticky */}
                <div className="sticky top-0 z-10 bg-white">
                    <div className="p-4 border-b">
                        <div className="grid gap-3 md:grid-cols-[1fr,auto] md:items-center">
                            {/* Filtreler */}
                            <div className="grid gap-3 md:grid-cols-2">
                                <div className="relative">
                                    <input
                                        value={q}
                                        onChange={(e) => setQ(e.target.value)}
                                        placeholder="Başlık / özet ara…"
                                        className={inputCls + " pr-9"}
                                    />
                                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                </div>
                                <button onClick={() => setQ("")} className="rounded-lg px-3 py-2 ring-1 ring-slate-200 hover:bg-slate-50">
                                    Temizle
                                </button>
                            </div>

                            {/* Aksiyonlar */}
                            <div className="flex items-center gap-2 justify-end">
                                {selected.length > 0 && (
                                    <button
                                        onClick={async () => {
                                            if (!confirm(`${selected.length} kayıt silinsin mi?`)) return;
                                            setPending(true);
                                            try {
                                                await Promise.all(selected.map((id) => apiDelete<boolean>(`/api/duyurular/delete/${id}`)));
                                                setItems((prev) => prev.filter((e) => !selected.includes(e.id!)));
                                                setSelected([]);
                                            } catch (err: any) {
                                                const msg = err?.response?.data?.message || err?.message || "Silme hatası";
                                                setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
                                            } finally {
                                                setPending(false);
                                            }
                                        }}
                                        disabled={pending}
                                        className="px-3 py-2 rounded-lg bg-red-500 text-white disabled:opacity-60"
                                    >
                                        Sil
                                    </button>
                                )}
                                <Link
                                    to="/panel/duyurular/yeni"
                                    className="px-3 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-sky-600 shadow-lg shadow-blue-500/20 hover:brightness-110"
                                >
                                    + Ekle
                                </Link>
                            </div>
                        </div>

                        {error && (
                            <div className="mt-3 text-red-600 bg-red-50 rounded-lg px-4 py-2 ring-1 ring-red-200">{error}</div>
                        )}
                    </div>
                </div>

                {/* LİSTE — scrollable */}
                <div className="overflow-y-auto" style={{ maxHeight: "70vh" }}>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-slate-50 text-slate-700">
                            <tr className="text-left">
                                <th className="px-4 py-3 w-10">
                                    <input type="checkbox" checked={allChecked} onChange={toggleAll} />
                                </th>
                                <th className="px-4 py-3">Başlık</th>
                                <th className="px-4 py-3 w-48">Tarih</th>
                                <th className="px-4 py-3">Özet</th>
                                <th className="px-4 py-3 w-28">Durum</th>
                                <th className="px-4 py-3 w-36">İşlemler</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-6 text-center text-slate-500">Kayıt bulunamadı.</td>
                                </tr>
                            ) : (
                                filtered.map((e) => {
                                    const t = e.tarih ?? e.duyuruTarih;
                                    const summary = e.ozet ?? e.icerik ?? "";
                                    return (
                                        <tr key={e.id} className="hover:bg-slate-50/60 transition-colors">
                                            <td className="px-4 py-3 align-top">
                                                {e.id !== undefined && (
                                                    <input
                                                        type="checkbox"
                                                        checked={selected.includes(e.id)}
                                                        onChange={() => toggleOne(e.id!)}
                                                    />
                                                )}
                                            </td>

                                            <td className="px-4 py-3 font-medium text-slate-800 align-top">{e.baslik}</td>

                                            <td className="px-4 py-3 text-slate-600 align-top">
                                                {getDateDisplay(t)}
                                            </td>

                                            <td className="px-4 py-3 max-w-[520px] text-slate-700 align-top">
                                                <span className="line-clamp-2" title={summary}>{summary}</span>
                                            </td>

                                            <td className="px-4 py-3 align-top">
                          <span className={"px-2 py-1 rounded text-xs " + (isTrue(e.onemli) ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600")}>
                            {isTrue(e.onemli) ? "Önemli" : "-"}
                          </span>
                                            </td>

                                            {/* İşlemler — Etkinlikler’deki menü tasarımı */}
                                            <td className="px-4 py-3 align-top">
                                                <div className="relative inline-block" data-row-menu-root>
                                                    <button
                                                        className="px-3 py-1.5 rounded-lg ring-1 ring-slate-200 hover:bg-slate-50 text-sky-600"
                                                        onClick={() => setRowMenuOpenId((cur) => (cur === e.id ? null : e.id!))}
                                                        aria-label="İşlemler"
                                                    >
                              <span className="relative inline-block h-5 w-5">
                                <RefreshCw className="absolute inset-0 h-5 w-5" strokeWidth={1.5} />
                                <Settings className="absolute inset-0 m-auto h-3.5 w-3.5" strokeWidth={1.5} />
                              </span>
                                                    </button>

                                                    {rowMenuOpenId === e.id && (
                                                        <div className="absolute left-0 top-full mt-1 w-32 rounded-md border bg-white shadow-lg z-20">
                                                            <Link
                                                                to={`/panel/duyurular/edit/${e.id}`}
                                                                className="block w-full px-3 py-2 text-left hover:bg-slate-50"
                                                                onClick={() => setRowMenuOpenId(null)}
                                                                state={{ record: e }}
                                                            >
                                                                Güncelle
                                                            </Link>
                                                            <button
                                                                className="w-full px-3 py-2 text-left text-red-600 hover:bg-red-50"
                                                                onClick={() => deleteOne(e.id!)}
                                                            >
                                                                Sil
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
