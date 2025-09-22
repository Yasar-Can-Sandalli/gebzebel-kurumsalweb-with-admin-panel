import {useEffect, useMemo, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
// YENİ: Kategori servisini ve tipini import et
import {getAllHaber, deleteHaber, getAllHaberCategories} from "../services/haberlerService";

// YENİ: Kategori tipini import et
import type {Haber, HaberCategorySummary} from "../types/haberler.ts";
import {RefreshCw, Settings} from "lucide-react";

export default function HaberlerPage() {
    // veri
    const [items, setItems] = useState<Haber[]>([]);
    const [categories, setCategories] = useState<HaberCategorySummary[]>([]); // YENİ: Kategoriler için state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    // filtreler
    const [q, setQ] = useState("");
    const [from, setFrom] = useState<string>("");
    const [to, setTo] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>(""); // YENİ: Seçili kategori için state

    // seçimler
    const [selected, setSelected] = useState<number[]>([]);

    // satır menüsü (📝 ▾)
    const [rowMenuOpenId, setRowMenuOpenId] = useState<number | null>(null);

    const navigate = useNavigate();

    const inputCls =
        "rounded-lg px-3 py-2 bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500/60 outline-none";

    // --- Data fetch (GÜNCELLENDİ) ---
    const fetchData = async () => {
        setError(null);
        setLoading(true);
        try {
            // YENİ: Hem haberleri hem de kategorileri aynı anda çek
            const [haberData, categoryData] = await Promise.all([
                getAllHaber(),
                getAllHaberCategories()
            ]);
            setItems(haberData || []);
            setCategories(categoryData || []);
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "Liste yüklenemedi";
            setError(`${msg}${err?.response?.status ? ` (status: ${err.response.status})` : ""}`);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => { fetchData(); }, []);

    // --- Filtreleme (GÜNCELLENDİ) ---
    const filtered = useMemo(() => {
        const term = q.trim().toLowerCase();
        const f = from ? new Date(from) : null;
        const t = to ? new Date(to) : null;
        return items.filter((h) => {
            const okQ = !term || h.haberBaslik.toLowerCase().includes(term);
            const d = new Date(h.haberTarih);
            const okFrom = !f || d >= f!;
            const okTo = !t || d <= t!;
            // YENİ: Kategori filtresi eklendi
            const okCategory = !selectedCategory || h.categoryId === Number(selectedCategory);
            return okQ && okFrom && okTo && okCategory;
        });
    }, [items, q, from, to, selectedCategory]); // YENİ: selectedCategory bağımlılık olarak eklendi

    // --- Seçim ---
    const allIds = filtered.map((x) => x.haberlerId).filter(Boolean);
    const allChecked = allIds.length > 0 && allIds.every((id) => selected.includes(id));
    const toggleAll = () =>
        setSelected((prev) =>
            allChecked ? prev.filter((id) => !allIds.includes(id)) : Array.from(new Set([...prev, ...allIds]))
        );
    const toggleOne = (id: number) =>
        setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

    // --- Satır menüsü (📝 ▾) işlemleri ---
    const toggleRowMenu = (id: number) =>
        setRowMenuOpenId((cur) => (cur === id ? null : id));

    const openEdit = (h: Haber) => {
        navigate(`duzenle/${h.haberlerId}`);
        setRowMenuOpenId(null);
    };

    const deleteOne = async (id: number) => {
        const rec = items.find((x) => x.haberlerId === id);
        if (!confirm(`${rec?.haberBaslik || id} kaydını silmek istiyor musunuz?`)) return;

        setPending(true);
        setError(null);
        try {
            await deleteHaber(id);
            setItems((prev) => prev.filter((h) => h.haberlerId !== id));
            setSelected((prev) => prev.filter((x) => x !== id));
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "Silme hatası";
            setError(`${msg}${err?.response?.status ? ` (status: ${err.response.status})` : ""}`);
        } finally {
            setPending(false);
            setRowMenuOpenId(null);
        }
    };

    const bulkDelete = async () => {
        if (selected.length === 0) return;
        if (!confirm(`${selected.length} haber silinsin mi?`)) return;

        setPending(true);
        setError(null);
        try {
            await Promise.all(selected.map((id) => deleteHaber(id)));
            setItems((prev) => prev.filter((h) => !selected.includes(h.haberlerId)));
            setSelected([]);
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "Silme hatası";
            setError(`${msg}${err?.response?.status ? ` (status: ${err.response.status})` : ""}`);
        } finally {
            setPending(false);
        }
    };

    // Dışarı tıklayınca menüyü kapat
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
            <h1 className="text-2xl font-semibold text-slate-800">Haberler</h1>

            <div className="bg-white rounded-2xl shadow-md shadow-blue-500/5 ring-1 ring-slate-200/60 overflow-hidden flex flex-col">
                {/* Üst şerit (filtre + aksiyonlar) */}
                <div className="sticky top-0 z-10 bg-white">
                    <div className="p-4 border-b">
                        <div className="grid gap-3 md:grid-cols-[1fr,auto] md:items-center">
                            {/* Filtreler */}
                            <div className="grid gap-3 md:grid-cols-4">
                                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Başlığa göre ara…" className={inputCls} />
                                <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className={inputCls} />
                                <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className={inputCls} />
                                <button onClick={() => { setQ(""); setFrom(""); setTo(""); setSelectedCategory(""); }} className="rounded-lg px-3 py-2 ring-1 ring-slate-200 hover:bg-slate-50">
                                    Temizle
                                </button>
                            </div>

                            {/* Aksiyonlar (Toplu Sil sadece seçim varsa görünür) (GÜNCELLENDİ) */}
                            <div className="flex items-center gap-2 justify-end">
                                {selected.length > 0 && (
                                    <button
                                        onClick={bulkDelete}
                                        disabled={pending}
                                        className="px-3 py-2 rounded-lg bg-red-500 text-white hover:brightness-110"
                                        title="Seçili haberleri sil"
                                    >
                                        Sil
                                    </button>
                                )}

                                {/* YENİ: Kategori Filtreleme Combobox'ı */}
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className={inputCls}
                                >
                                    <option value="">Tüm Kategoriler</option>
                                    {categories.map((cat) => (
                                        <option key={cat.categoryId} value={cat.categoryId}>
                                            {cat.categoryName}
                                        </option>
                                    ))}
                                </select>

                                <Link
                                    to="yeni"
                                    className="px-3 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-sky-600 shadow-lg shadow-blue-500/20 hover:brightness-110"
                                >
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

                {/* Tablo */}
                <div className="overflow-y-auto" style={{ maxHeight: "70vh" }}>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-slate-50 text-slate-700">
                            <tr className="text-left">
                                <th className="px-4 py-3 w-10">
                                    <input type="checkbox" checked={allChecked} onChange={toggleAll} />
                                </th>
                                <th className="px-4 py-3 w-28">Afiş 1</th>
                                <th className="px-4 py-3 w-28">Afiş 2</th>
                                <th className="px-4 py-3">Başlık</th>
                                <th className="px-4 py-3 w-40">Tarih</th>
                                <th className="px-4 py-3 w-36">Kategori</th>
                                <th className="px-4 py-3 w-36">İşlemler</th>
                            </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-4 py-6 text-center text-slate-500">
                                        Kayıt bulunamadı.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((h) => (
                                    <tr key={h.haberlerId} className="hover:bg-slate-50/60 transition-colors">
                                        <td className="px-4 py-3 align-top">
                                            <input
                                                type="checkbox"
                                                checked={selected.includes(h.haberlerId)}
                                                onChange={() => toggleOne(h.haberlerId)}
                                            />
                                        </td>

                                        {/* Afiş 1 */}
                                        <td className="px-4 py-3 align-top">
                                            {h.haberResim1 && (
                                                <img
                                                    src={h.haberResim1}
                                                    alt={`${h.haberBaslik} - Afiş 1`}
                                                    className="w-16 h-20 object-cover rounded-md ring-1 ring-slate-200"
                                                />
                                            )}
                                        </td>

                                        {/* Afiş 2 */}
                                        <td className="px-4 py-3 align-top">
                                            {h.haberResim2 && (
                                                <img
                                                    src={h.haberResim2}
                                                    alt={`${h.haberBaslik} - Afiş 2`}
                                                    className="w-16 h-20 object-cover rounded-md ring-1 ring-slate-200"
                                                />
                                            )}
                                        </td>

                                        <td className="px-4 py-3 font-medium text-slate-800">{h.haberBaslik}</td>
                                        <td className="px-4 py-3 text-slate-600">
                                            {new Date(h.haberTarih).toLocaleDateString("tr-TR")}
                                        </td>
                                        <td className="px-4 py-3">{h.categoryName || "-"}</td>

                                        {/* İşlemler — Kurumsal sayfadakiyle aynı (📝 ▾ + alt menü) */}
                                        <td className="px-4 py-3 align-center">
                                            <div className="relative inline-block" data-row-menu-root>
                                                <button
                                                    className="px-3 py-1.5 rounded-lg ring-1 ring-slate-200 hover:bg-slate-50 text-sky-600"
                                                    onClick={() => toggleRowMenu(h.haberlerId)}
                                                    aria-label="İşlemler"
                                                >
                                                    <span className="relative inline-block h-5 w-5">
                                                      <RefreshCw className="absolute inset-0 h-5 w-5" strokeWidth={1.5} />
                                                      <Settings  className="absolute inset-0 m-auto h-3.5 w-3.5" strokeWidth={1.5} />
                                                    </span>
                                                </button>
                                                {rowMenuOpenId === h.haberlerId && (
                                                    <div className="absolute z-20 mt-1 w-32 rounded-md border bg-white shadow-lg left-0 top-full">
                                                        <button
                                                            className="w-full px-3 py-2 text-left hover:bg-slate-50"
                                                            onClick={() => openEdit(h)}
                                                        >
                                                            Güncelle
                                                        </button>
                                                        <button
                                                            className="w-full px-3 py-2 text-left text-red-600 hover:bg-red-50"
                                                            onClick={() => deleteOne(h.haberlerId)}
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
        </div>
    );
}