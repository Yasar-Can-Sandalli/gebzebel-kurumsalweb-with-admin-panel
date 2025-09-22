// src/sayfalar/HizmetlerPage.tsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet, apiDelete } from "../services/apiService";
import { Mail, Phone, RefreshCw, Settings } from "lucide-react";

export interface Hizmet {
    id?: number;
    baslik: string;
    imgUrl: string;
    telefon: string;
    konum: string;
    buttonDetay: string;
    buttonKonum: string;
    mail: string;
    kategori: string;
}

export default function HizmetlerPage() {
    const [items, setItems] = useState<Hizmet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    // filtreler
    const [q, setQ] = useState("");

    // seçimler (toplu sil için)
    const [selected, setSelected] = useState<number[]>([]);

    // satır menüsü (📝 ▾)
    const [rowMenuOpenId, setRowMenuOpenId] = useState<number | null>(null);

    const inputCls =
        "rounded-lg px-3 py-2 bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500/60 outline-none";

    const fetchData = async () => {
        setError(null);
        setLoading(true);
        try {
            const data = await apiGet<Hizmet[]>("/api/hizmetler");
            setItems(data || []);
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "Liste yüklenemedi";
            setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filtered = useMemo(() => {
        const term = q.trim().toLowerCase();
        return items.filter((e) => !term || e.baslik.toLowerCase().includes(term));
    }, [items, q]);

    function toMapsLink(addressOrCoords?: string) {
        if (!addressOrCoords) return undefined;
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressOrCoords)}`;
    }

    // seçim kontrolleri
    const toggleOne = (id: number) =>
        setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

    const allIds = filtered.map((x) => x.id!).filter(Boolean);
    const allChecked = allIds.length > 0 && allIds.every((id) => selected.includes(id));
    const toggleAll = () =>
        setSelected((prev) =>
            allChecked ? prev.filter((id) => !allIds.includes(id)) : Array.from(new Set([...prev, ...allIds]))
        );

    // TEKİL SİL
    const deleteOne = async (id: number) => {
        const rec = items.find((x) => x.id === id);
        if (!confirm(`${rec?.baslik || id} kaydını silmek istiyor musunuz?`)) return;

        setPending(true);
        setError(null);
        try {
            await apiDelete<boolean>(`/api/hizmetler/${id}`);
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

    // TOPLU SİL
    const bulkDelete = async () => {
        if (selected.length === 0) return;
        if (!confirm(`${selected.length} kayıt silinsin mi?`)) return;

        setError(null);
        setPending(true);
        try {
            await Promise.all(selected.map((id) => apiDelete<boolean>(`/api/hizmetler/${id}`)));
            setItems((prev) => prev.filter((e) => !selected.includes(e.id!)));
            setSelected([]);
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "Silme hatası";
            setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
        } finally {
            setPending(false);
        }
    };

    // satır menüsü kontrolü
    const toggleRowMenu = (id: number) =>
        setRowMenuOpenId((cur) => (cur === id ? null : id));

    // dışarı tıklayınca menüyü kapat
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
            <h1 className="text-2xl font-semibold text-slate-800">Hizmetler</h1>

            <div className="bg-white rounded-2xl shadow-md shadow-blue-500/5 ring-1 ring-slate-200/60 overflow-hidden flex flex-col">
                {/* STICKY ÜST BAR */}
                <div className="sticky top-0 z-10 bg-white">
                    <div className="p-4 border-b">
                        <div className="grid gap-3 md:grid-cols-[1fr,auto] md:items-center">
                            {/* Filtreler */}
                            <div className="grid gap-3 md:grid-cols-2">
                                <input
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    placeholder="Başlığa göre ara…"
                                    className={inputCls}
                                />
                                <button
                                    onClick={() => setQ("")}
                                    className="rounded-lg px-3 py-2 ring-1 ring-slate-200 hover:bg-slate-50"
                                >
                                    Temizle
                                </button>
                            </div>

                            {/* Aksiyonlar */}
                            <div className="flex items-center gap-2 justify-end">
                                {/* Toplu Sil: SADECE seçim varsa görünür */}
                                {selected.length > 0 && (
                                    <button
                                        onClick={bulkDelete}
                                        disabled={pending}
                                        className="px-3 py-2 rounded-lg bg-red-500 text-white disabled:opacity-60"
                                    >
                                        Sil
                                    </button>
                                )}

                                <Link
                                    to="yeni"
                                    className="px-3 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-sky-600 shadow-lg shadow-blue-500/20 hover:brightness-110"
                                >
                                    + Ekle
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
                        {/* tablo/list bileşenin  tamamı (İÇERİĞE DOKUNMA) */}
                    </div>
                    <table className="min-w-full text-sm">
                        <thead className="bg-slate-50 text-slate-700">
                        <tr className="text-left">
                            <th className="px-4 py-3 w-10">
                                <input type="checkbox" checked={allChecked} onChange={toggleAll} />
                            </th>
                            <th className="px-4 py-3 w-28">Resim</th>
                            <th className="px-4 py-3">Başlık</th>
                            <th className="px-4 py-3">Telefon</th>
                            <th className="px-4 py-3">Kategori</th>
                            <th className="px-4 py-3">E-posta</th>
                            <th className="px-4 py-3">Konum</th>
                            <th className="px-4 py-3 w-36">İşlemler</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="px-4 py-6 text-center text-slate-500">
                                    Kayıt bulunamadı.
                                </td>
                            </tr>
                        ) : (
                            filtered.map((e) => (
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
                                    <td className="px-4 py-3 align-top">
                                        {e.imgUrl && (
                                            <img
                                                src={e.imgUrl}
                                                alt={e.baslik}
                                                className="w-16 h-20 object-cover rounded-md ring-1 ring-slate-200"
                                            />
                                        )}
                                    </td>
                                    <td className="px-4 py-3 font-medium text-slate-800 align-top">
                                        {e.baslik}
                                    </td>
                                    <td className="px-4 py-3 text-slate-600 align-top">
                                        {e.telefon ? (
                                            <div className="flex items-start gap-1 text-slate-600">
                                                <Phone size={12} className="mt-0.5 flex-shrink-0" />
                                                <a
                                                    href={`tel:${e.telefon.replace(/[^+\d]/g, "")}`}
                                                    className="text-sm leading-tight hover:underline whitespace-nowrap text-blue-700"
                                                    title={e.telefon}
                                                >
                                                    {e.telefon}
                                                </a>
                                            </div>
                                        ) : (
                                            <span className="text-slate-400 text-sm">-</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-slate-600 align-top">{e.kategori}</td>
                                    <td className="px-4 py-3 text-slate-600 align-top">
                                        {e.mail ? (
                                            <div className="flex items-start gap-1 text-slate-600">
                                                <Mail size={12} className="mt-0.5 flex-shrink-0" />
                                                <a
                                                    href={`mailto:${e.mail}`}
                                                    className="text-sm break-all leading-tight hover:underline"
                                                    title={e.mail}
                                                >
                                                    {e.mail}
                                                </a>
                                            </div>
                                        ) : (
                                            <span className="text-slate-400 text-sm">-</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-slate-600 align-top">
                                        {e.konum ? (
                                            <a
                                                href={toMapsLink(e.konum)}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-blue-700"
                                            >
                                                📍 Haritada göster
                                            </a>
                                        ) : (
                                            "-"
                                        )}
                                    </td>

                                    {/* İşlemler — istenen tasarım: 📝 ▾ butonu + altında menü */}
                                    <td className="px-4 py-3 align-top">
                                        <div className="relative inline-block" data-row-menu-root>
                                            <button
                                                className="px-3 py-1.5 rounded-lg ring-1 ring-slate-200 hover:bg-slate-50 text-sky-600"
                                                onClick={() => toggleRowMenu(e.id!)}
                                                aria-label="İşlemler"
                                            >
  <span className="relative inline-block h-5 w-5">
    <RefreshCw className="absolute inset-0 h-5 w-5" strokeWidth={1.5} />
    <Settings  className="absolute inset-0 m-auto h-3.5 w-3.5" strokeWidth={1.5} />
  </span>
                                            </button>

                                            {rowMenuOpenId === e.id && (
                                                <div className="absolute left-0 top-full mt-1 w-32 rounded-md border bg-white shadow-lg z-20">
                                                    <Link
                                                        to={`${e.id}/duzenle`}
                                                        className="block w-full px-3 py-2 text-left hover:bg-slate-50"
                                                        onClick={() => setRowMenuOpenId(null)}
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
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
