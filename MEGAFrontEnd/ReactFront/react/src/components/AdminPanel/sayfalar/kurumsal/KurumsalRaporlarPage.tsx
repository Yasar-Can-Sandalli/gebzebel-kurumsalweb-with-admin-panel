// src/components/AdminPanel/sayfalar/kurumsal/KurumsalRaporlarPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
    getRaporCategoryById,
    getAllRaporCategories,
    createRapor,
    deleteRapor,
} from "../../services/raporlarService.ts"; // ← services doğru
import type { Rapor, RaporCategory } from "../../../../types/raporlar.ts";   // ← types doğru (.ts uzantılı)
import { CheckCircle2, CircleSlash, Calendar, FileText, Plus } from "lucide-react";

// input 'YYYY-MM-DD' -> ISO
function toIsoFromDateInput(d: string) {
    return d ? new Date(d + "T00:00:00").toISOString() : undefined;
}

type CatTab = { id: number; label: string };

const FALLBACK_CATEGORIES: CatTab[] = [
    { id: 12, label: "Stratejik Plan Raporları" },
    { id: 16, label: "Ercümen Kararı Raporları" },
    { id: 5,  label: "Finansal Raporlar" },
    { id: 1,  label: "Faaliyet Raporu" },
    { id: 4,  label: "Performans Raporları" },
    { id: 13, label: "İç Kontrol Eylem Planı Raporları" },
    { id: 15, label: "Meclis Kararı Raporları" },
    { id: 14, label: "Mali Durum ve Beklentiler Raporları" },
];

const Badge = ({ children, tone = "slate" }: { children: React.ReactNode; tone?: "green" | "slate" }) => {
    const tones = {
        green: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
        slate: "bg-slate-50 text-slate-600 ring-1 ring-slate-200",
    } as const;
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${tones[tone]}`}>
      {children}
    </span>
    );
};

export default function KurumsalRaporlarPage() {
    const nav = useNavigate();

    const [cats, setCats] = React.useState<CatTab[]>(FALLBACK_CATEGORIES);
    const [activeId, setActiveId] = React.useState<number>(FALLBACK_CATEGORIES[0].id);

    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [catData, setCatData] = React.useState<RaporCategory | null>(null);

    // Sadece “Yeni” için modal
    const [isOpen, setOpen] = React.useState<boolean>(false);
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
        return () => {
            live = false;
        };
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

    React.useEffect(() => {
        refresh(activeId);
    }, [activeId, refresh]);

    // CRUD
    const onNew = () => {
        resetForm();
        setOpen(true);
    };

    // /panel/kurumsal/raporlar/:id/duzenle
    const onEditGo = (r: Rapor) => nav(`/panel/kurumsal/raporlar/${r.raporId}/duzenle`);

    const onDelete = async (r: Rapor) => {
        if (!window.confirm(`Bu rapor silinsin mi?\n\n${r.raporBaslik}`)) return;
        setCatData((prev) => (prev ? { ...prev, raporlar: prev.raporlar.filter((x) => x.raporId !== r.raporId) } : prev));
        await deleteRapor(r.raporId);
        await refresh(activeId);
    };

    const onCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.raporBaslik.trim() || !form.raporUrl.trim()) return;

        await createRapor({
            raporBaslik: form.raporBaslik,
            raporUrl: form.raporUrl,
            categoryId: activeId,
            raporTarihi: toIsoFromDateInput(form.raporTarihInput),
            raporDurum: form.raporDurum,
        });

        setOpen(false);
        resetForm();
        await refresh(activeId);
    };

    return (
        <div className="p-4">
            {/* Başlık */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
                <div>
                    <div className="text-xs text-slate-500">Kurumsal /</div>
                    <h1 className="text-xl font-bold text-slate-900">Raporlar</h1>
                </div>

                <div className="flex gap-2">
                    {/* Kategori combobox */}
                    <label className="inline-flex items-center gap-2">
                        <span className="text-sm text-slate-600">Kategori</span>
                        <select
                            className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 shadow-sm hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
                            value={activeId}
                            onChange={(e) => setActiveId(Number(e.target.value))}
                        >
                            {cats.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.label}
                                </option>
                            ))}
                        </select>
                    </label>

                    <button
                        onClick={onNew}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-sky-600 text-white shadow-sm hover:bg-sky-700 active:bg-sky-800 transition"
                    >
                        <Plus size={16} />
                        Yeni Rapor
                    </button>
                </div>
            </div>

            {/* İçerik */}
            {loading && <div className="text-slate-600">Yükleniyor…</div>}
            {error && <div className="text-red-700">{error}</div>}

            {!loading && !error && (
                <div className="grid gap-3">
                    {(catData?.raporlar ?? []).map((r) => {
                        const active = !!r.raporDurum;
                        return (
                            <div
                                key={r.raporId}
                                className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow transition"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 grid place-items-center rounded-lg border border-slate-200 bg-slate-50">
                                        <FileText size={18} className="text-slate-500" />
                                    </div>

                                    <div className="space-y-1">
                                        <div className="font-medium text-slate-900">{r.raporBaslik}</div>
                                        <a
                                            href={r.raporUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-xs text-sky-700 underline break-all"
                                        >
                                            {r.raporUrl}
                                        </a>

                                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                                            <Badge tone="slate">
                                                <Calendar size={12} />
                                                {r.raporTarihi ? r.raporTarihi.slice(0, 10) : "—"}
                                            </Badge>

                                            {active ? (
                                                <Badge tone="green">
                                                    <CheckCircle2 size={12} />
                                                    Aktif
                                                </Badge>
                                            ) : (
                                                <Badge tone="slate">
                                                    <CircleSlash size={12} />
                                                    Pasif
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => onEditGo(r)}
                                        className="px-3 py-2 rounded-lg border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 active:bg-slate-100 transition"
                                    >
                                        Düzenle
                                    </button>
                                    <button
                                        onClick={() => onDelete(r)}
                                        className="px-3 py-2 rounded-lg border border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 active:bg-rose-200/40 transition"
                                    >
                                        Sil
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    {(catData?.raporlar?.length ?? 0) === 0 && (
                        <div className="text-slate-500 text-center py-8">Bu kategoride henüz rapor yok.</div>
                    )}
                </div>
            )}

            {/* YENİ KAYIT MODAL */}
            {isOpen && (
                <div className="fixed inset-0 z-50 grid place-items-center bg-black/40">
                    <div className="w-full max-w-lg rounded-xl bg-white p-5 shadow-2xl">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-semibold text-slate-900">Yeni Rapor</h2>
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    resetForm();
                                }}
                                className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
                            >
                                Kapat
                            </button>
                        </div>

                        <form onSubmit={onCreateSubmit} className="grid gap-3">
                            <label className="grid gap-1">
                                <span className="text-sm text-slate-700">Rapor Başlığı</span>
                                <input
                                    className="px-3 py-2 rounded-lg border border-slate-300"
                                    value={form.raporBaslik}
                                    onChange={(e) => setForm((f) => ({ ...f, raporBaslik: e.target.value }))}
                                    required
                                />
                            </label>

                            <label className="grid gap-1">
                                <span className="text-sm text-slate-700">Rapor URL (PDF)</span>
                                <input
                                    className="px-3 py-2 rounded-lg border border-slate-300"
                                    value={form.raporUrl}
                                    onChange={(e) => setForm((f) => ({ ...f, raporUrl: e.target.value }))}
                                    required
                                />
                            </label>

                            <div className="grid grid-cols-2 gap-3">
                                <label className="grid gap-1">
                                    <span className="text-sm text-slate-700">Rapor Tarihi</span>
                                    <input
                                        type="date"
                                        className="px-3 py-2 rounded-lg border border-slate-300"
                                        value={form.raporTarihInput}
                                        onChange={(e) => setForm((f) => ({ ...f, raporTarihInput: e.target.value }))}
                                    />
                                </label>

                                <label className="flex items-center gap-2 mt-6">
                                    <input
                                        type="checkbox"
                                        checked={form.raporDurum}
                                        onChange={(e) => setForm((f) => ({ ...f, raporDurum: e.target.checked }))}
                                        className="h-4 w-4"
                                    />
                                    <span className="text-sm text-slate-700">Aktif</span>
                                </label>
                            </div>

                            <div className="text-xs text-slate-500">
                                Kategori: <b>{cats.find((c) => c.id === activeId)?.label}</b> (id: {activeId})
                            </div>

                            <div className="flex justify-end gap-2 mt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setOpen(false);
                                        resetForm();
                                    }}
                                    className="px-3 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
                                >
                                    İptal
                                </button>
                                <button
                                    type="submit"
                                    className="px-3 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 active:bg-sky-800"
                                >
                                    Kaydet
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
