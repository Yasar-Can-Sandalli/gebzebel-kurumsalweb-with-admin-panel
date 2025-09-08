import React from "react";
import {
    getRaporCategoryById,
    getAllRaporCategories,
    createRapor,
    updateRapor,
    deleteRapor,
    uploadPdf, // ⬅ PDF upload
} from "../../services/raporlarService.ts";
import type { Rapor, RaporCategory } from "../../../../types/raporlar";

// 'YYYY-MM-DD' -> ISO
const toIsoFromDateInput = (d: string) =>
    d ? new Date(d + "T00:00:00").toISOString() : undefined;

type CatTab = { id: number; label: string };

const FALLBACK_CATEGORIES: CatTab[] = [
    { id: 12, label: "Stratejik Plan Raporları" },
    { id: 16, label: "Ercümen Kararı Raporları" },
    { id: 5,  label: "Finansal Raporlar" },
    { id: 1,  label: "Faaliyet Raporu" },
    { id: 4,  label: "Performans Raporları" },
    { id: 13, label: "İç Kontrol Eylem Planı Raporları" },
    { id: 15, label: "Meclis Kararı Raporları" },
    { id: 14, label: "Mali Durum Ve Beklentiler Raporları" },
];

export default function KurumsalRaporlarPage() {
    const [cats, setCats] = React.useState<CatTab[]>(FALLBACK_CATEGORIES);
    const [activeId, setActiveId] = React.useState<number>(FALLBACK_CATEGORIES[0].id);

    const [loading, setLoading]   = React.useState<boolean>(true);
    const [error, setError]       = React.useState<string | null>(null);
    const [catData, setCatData]   = React.useState<RaporCategory | null>(null);

    // Modal (hem yeni hem düzenle)
    const [isOpen, setOpen]       = React.useState<boolean>(false);
    const [editId, setEditId]     = React.useState<number | null>(null);
    const [saving, setSaving]     = React.useState<boolean>(false);
    const [form, setForm] = React.useState<{
        raporBaslik: string;
        raporUrl: string;
        raporTarihInput: string; // YYYY-MM-DD
        raporDurum: boolean;
    }>({
        raporBaslik: "",
        raporUrl: "",
        raporTarihInput: new Date().toISOString().slice(0, 10),
        raporDurum: true,
    });

    const resetForm = () => {
        setEditId(null);
        setForm({
            raporBaslik: "",
            raporUrl: "",
            raporTarihInput: new Date().toISOString().slice(0, 10),
            raporDurum: true,
        });
    };

    // Kategorileri dinamik çek (varsa)
    React.useEffect(() => {
        let live = true;
        (async () => {
            try {
                const list = await getAllRaporCategories();
                if (!live || !Array.isArray(list) || list.length === 0) return;
                const mapped = list.map((c) => ({ id: c.categoryId, label: c.categoryName }));
                setCats(mapped);
                setActiveId(mapped[0].id);
            } catch {
                // endpoint yoksa fallback
            }
        })();
        return () => { live = false; };
    }, []);

    // Seçili kategori raporlarını çek
    const refresh = React.useCallback(async (categoryId: number) => {
        try {
            setLoading(true);
            setError(null);
            const d = await getRaporCategoryById(categoryId);
            setCatData(d);
        } catch (e) {
            console.error(e);
            setError("Raporlar yüklenemedi.");
        } finally {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => { refresh(activeId); }, [activeId, refresh]);

    // Yeni
    const onNew = () => {
        resetForm();
        setOpen(true);
    };

    // Düzenle (modal içinde)
    const onEdit = (r: Rapor) => {
        setEditId(r.raporId);
        setForm({
            raporBaslik: r.raporBaslik,
            raporUrl:    r.raporUrl,
            raporTarihInput: r.raporTarihi ? r.raporTarihi.slice(0,10) : new Date().toISOString().slice(0,10),
            raporDurum:  !!r.raporDurum,
        });
        setOpen(true);
    };

    const onDelete = async (r: Rapor) => {
        if (!window.confirm(`Silinsin mi?\n\n${r.raporBaslik}`)) return;
        // optimistic
        setCatData(prev => prev ? ({ ...prev, raporlar: prev.raporlar.filter(x => x.raporId !== r.raporId) }) : prev);
        await deleteRapor(r.raporId);
        await refresh(activeId);
    };

    // PDF seç & yükle
    const onSelectPdf = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const res = await uploadPdf(file); // { url }
            setForm(f => ({ ...f, raporUrl: res.url }));
        } catch (err) {
            console.error(err);
            alert("PDF yüklenemedi.");
        } finally {
            // aynı dosyayı tekrar seçebilmek için
            e.target.value = "";
        }
    };

    // Kaydet (yeni/düzenle)
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.raporBaslik.trim() || !form.raporUrl.trim()) return;

        setSaving(true);
        try {
            if (editId == null) {
                await createRapor({
                    raporBaslik: form.raporBaslik,
                    raporUrl: form.raporUrl,
                    categoryId: activeId,
                    raporTarihi: toIsoFromDateInput(form.raporTarihInput),
                    raporDurum: form.raporDurum,
                });
            } else {
                await updateRapor(editId, {
                    raporBaslik: form.raporBaslik,
                    raporUrl: form.raporUrl,
                    categoryId: activeId, // aynı kategoride kalıyor
                    raporTarihi: toIsoFromDateInput(form.raporTarihInput),
                    raporDurum: form.raporDurum,
                });
            }
            setOpen(false);
            resetForm();
            await refresh(activeId);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-4">
            {/* Başlık */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <div className="text-xs text-slate-500">Kurumsal /</div>
                    <h1 className="text-xl font-bold">Raporlar</h1>
                </div>
                <button onClick={onNew} className="px-3 py-2 rounded bg-blue-600 text-white">
                    + Yeni Rapor
                </button>
            </div>

            {/* Kategoriler */}
            <div className="flex flex-wrap gap-2 mb-4">
                {cats.map((c) => (
                    <button
                        key={c.id}
                        onClick={() => setActiveId(c.id)}
                        className={`px-3 py-2 rounded-full border ${
                            activeId === c.id ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-white text-slate-800 border-slate-200"
                        }`}
                    >
                        {c.label}
                    </button>
                ))}
            </div>

            {/* İçerik */}
            {loading && <div className="text-slate-600">Yükleniyor…</div>}
            {error && <div className="text-red-700">{error}</div>}

            {!loading && !error && (
                <div className="grid gap-3">
                    {(catData?.raporlar ?? []).map((r) => (
                        <div key={r.raporId}
                             className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white shadow">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 grid place-items-center rounded-lg border bg-white">📄</div>
                                <div>
                                    <div className="font-semibold text-slate-900">{r.raporBaslik}</div>
                                    <a href={r.raporUrl} target="_blank" rel="noreferrer"
                                       className="text-xs text-blue-700 underline break-all">{r.raporUrl}</a>
                                    <div className="text-xs text-slate-500 mt-1">
                                        {r.raporTarihi ? r.raporTarihi.slice(0, 10) : "—"} • {r.raporDurum ? "Aktif" : "Pasif"}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => onEdit(r)}
                                        className="px-3 py-2 rounded border border-slate-200 hover:bg-slate-50">Düzenle</button>
                                <button onClick={() => onDelete(r)} className="px-3 py-2 rounded bg-red-600 text-white">Sil</button>
                            </div>
                        </div>
                    ))}
                    {(catData?.raporlar?.length ?? 0) === 0 && (
                        <div className="text-slate-500 text-center py-8">Bu kategoride henüz rapor yok.</div>
                    )}
                </div>
            )}

            {/* Modal (Yeni + Düzenle) */}
            {isOpen && (
                <div className="fixed inset-0 z-50 grid place-items-center bg-black/40">
                    <div className="w-full max-w-lg rounded-xl bg-white p-5 shadow-2xl">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-semibold">
                                {editId == null ? "Yeni Rapor" : `Raporu Düzenle #${editId}`}
                            </h2>
                            <button onClick={() => { setOpen(false); resetForm(); }}
                                    className="px-3 py-1 rounded bg-slate-100">Kapat</button>
                        </div>

                        <form onSubmit={onSubmit} className="grid gap-3">
                            <label className="grid gap-1">
                                <span className="text-sm text-slate-700">Rapor Başlığı</span>
                                <input
                                    className="px-3 py-2 rounded border border-slate-300"
                                    value={form.raporBaslik}
                                    onChange={(e) => setForm((f) => ({ ...f, raporBaslik: e.target.value }))}
                                    required
                                />
                            </label>

                            <div className="grid gap-1">
                                <span className="text-sm text-slate-700">Rapor PDF</span>
                                <div className="flex gap-2">
                                    <input
                                        className="flex-1 px-3 py-2 rounded border border-slate-300"
                                        value={form.raporUrl}
                                        onChange={(e) => setForm((f) => ({ ...f, raporUrl: e.target.value }))}
                                        placeholder="https://... (veya Dosya Seç ile yükle)"
                                        required
                                    />
                                    <label className="px-3 py-2 rounded bg-slate-100 cursor-pointer">
                                        Dosya Seç
                                        <input type="file" accept="application/pdf" className="hidden" onChange={onSelectPdf}/>
                                    </label>
                                </div>
                                {form.raporUrl && (
                                    <a className="text-xs text-blue-700 underline break-all" href={form.raporUrl} target="_blank" rel="noreferrer">
                                        {form.raporUrl}
                                    </a>
                                )}
                            </div>

                            <label className="grid gap-1">
                                <span className="text-sm text-slate-700">Rapor Tarihi</span>
                                <input
                                    type="date"
                                    className="px-3 py-2 rounded border border-slate-300"
                                    value={form.raporTarihInput}
                                    onChange={(e) => setForm((f) => ({ ...f, raporTarihInput: e.target.value }))}
                                />
                            </label>

                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={form.raporDurum}
                                    onChange={(e) => setForm((f) => ({ ...f, raporDurum: e.target.checked }))}
                                />
                                <span className="text-sm text-slate-700">Aktif</span>
                            </label>

                            <div className="text-xs text-slate-500">
                                Kategori: <b>{cats.find((c) => c.id === activeId)?.label}</b> (id: {activeId})
                            </div>

                            <div className="flex justify-end gap-2 mt-2">
                                <button type="button" onClick={() => { setOpen(false); resetForm(); }}
                                        className="px-3 py-2 rounded border border-slate-200">İptal</button>
                                <button type="submit" disabled={saving}
                                        className="px-3 py-2 rounded bg-blue-600 text-white">
                                    {saving ? "Kaydediliyor…" : "Kaydet"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
