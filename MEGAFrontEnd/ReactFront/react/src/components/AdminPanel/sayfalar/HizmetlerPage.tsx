import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet, apiDelete } from "../services/apiService";

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

    const inputCls =
        "rounded-lg px-3 py-2 bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500/60 outline-none";

    const fetchData = async () => {
        setError(null);
        setLoading(true);
        try {
            const data = await apiGet<Hizmet[]>("/api/hizmetler");
            setItems(data || []);
        } catch (err: any) {
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                "Liste yüklenemedi";
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
        return items.filter((e) =>
            !term || e.baslik.toLowerCase().includes(term)
        );
    }, [items, q]);

    // seçim kontrolleri
    const toggleOne = (id: number) =>
        setSelected((prev) =>
            prev.includes(id)
                ? prev.filter((x) => x !== id)
                : [...prev, id]
        );

    const allIds = filtered.map((x) => x.id!).filter(Boolean);
    const allChecked =
        allIds.length > 0 && allIds.every((id) => selected.includes(id));
    const toggleAll = () =>
        setSelected((prev) =>
            allChecked
                ? prev.filter((id) => !allIds.includes(id))
                : Array.from(new Set([...prev, ...allIds]))
        );

    // TOPLU SİL
    const bulkDelete = async () => {
        if (selected.length === 0) return;
        if (!confirm(`${selected.length} kayıt silinsin mi?`)) return;

        setError(null);
        setPending(true);
        try {
            await Promise.all(
                selected.map((id) =>
                    apiDelete<boolean>(`/api/hizmetler/${id}`)
                )
            );
            setItems((prev) =>
                prev.filter((e) => !selected.includes(e.id!))
            );
            setSelected([]);
        } catch (err: any) {
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                "Silme hatası";
            setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
        } finally {
            setPending(false);
        }
    };

    if (loading) return <div className="p-6">Yükleniyor…</div>;

    return (
        <div className="space-y-5">
            <h1 className="text-2xl font-semibold text-slate-800">
                Hizmetler
            </h1>

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
                                <button
                                    onClick={bulkDelete}
                                    disabled={selected.length === 0 || pending}
                                    className="px-3 py-2 rounded-lg bg-red-500 text-white disabled:opacity-60"
                                >
                                    Sil
                                </button>

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
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-slate-50 text-slate-700">
                            <tr className="text-left">
                                <th className="px-4 py-3 w-10">
                                    <input
                                        type="checkbox"
                                        checked={allChecked}
                                        onChange={toggleAll}
                                    />
                                </th>
                                <th className="px-4 py-3 w-28">Resim</th>
                                <th className="px-4 py-3">Başlık</th>
                                <th className="px-4 py-3">Telefon</th>
                                <th className="px-4 py-3">Kategori</th>
                                <th className="px-4 py-3">Mail</th>
                                <th className="px-4 py-3">Konum</th>
                                <th className="px-4 py-3 w-36">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={8}
                                        className="px-4 py-6 text-center text-slate-500"
                                    >
                                        Kayıt bulunamadı.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((e) => (
                                    <tr
                                        key={e.id}
                                        className="hover:bg-slate-50/60 transition-colors"
                                    >
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
                                            {e.telefon}
                                        </td>
                                        <td className="px-4 py-3 text-slate-600 align-top">
                                            {e.kategori}
                                        </td>
                                        <td className="px-4 py-3 text-slate-600 align-top">
                                            {e.mail}
                                        </td>
                                        <td className="px-4 py-3 text-slate-600 align-top">
                                            {e.konum}
                                        </td>
                                        <td className="px-4 py-3 align-top">
                                            <Link
                                                to={`${e.id}/duzenle`}
                                                className="px-3 py-1.5 rounded-lg ring-1 ring-slate-200 hover:bg-slate-50"
                                            >
                                                Güncelle
                                            </Link>
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
