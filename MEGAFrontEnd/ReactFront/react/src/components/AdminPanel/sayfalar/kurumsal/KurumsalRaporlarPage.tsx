// src/components/AdminPanel/sayfalar/kurumsal/KurumsalRaporlarPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    getAllRaporCategories,
    getRaporCategoryById,
    deleteRapor,
    getAllRaporlar,
} from "../../services/raporlarService";
import type { Rapor, RaporCategory, RaporCategorySummary } from "../../types/raporlar";
import { CheckCircle2, CircleSlash, Calendar, FileText, Plus } from "lucide-react";

// Badge component (Değişiklik yok)
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
    const navigate = useNavigate();

    const [categories, setCategories] = useState<RaporCategorySummary[]>([]);
    const [raporlar, setRaporlar] = useState<Rapor[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [fetchedCategories, allRaporlar] = await Promise.all([
                    getAllRaporCategories(),
                    getAllRaporlar(),
                ]);
                setCategories(fetchedCategories || []);
                setRaporlar(allRaporlar || []);
            } catch (err) {
                console.error("Veriler yüklenirken hata oluştu:", err);
                setError("Raporlar veya kategoriler yüklenemedi.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // --- GÜNCELLENMİŞ FİLTRELEME FONKSİYONU ---
    // Bu fonksiyon, YayinlarPage'deki mantıkla birebir aynıdır.
    const handleCategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const id = parseInt(event.target.value, 10);
        setSelectedCategoryId(isNaN(id) ? null : id);

        setLoading(true);
        setError(null);

        try {
            if (isNaN(id)) {
                const allRaporlar = await getAllRaporlar();
                setRaporlar(allRaporlar);
            } else {
                const data = await getRaporCategoryById(id);
                setRaporlar(data.raporlar);
            }
        } catch (err) {
            console.error("Raporlar filtrelenirken hata oluştu:", err);
            setError("Raporlar yüklenemedi.");
        } finally {
            setLoading(false);
        }
    };

    // Silme sonrası listeyi yenilemek için
    const refreshList = async () => {
        setLoading(true);
        try {
            const data = selectedCategoryId === null
                ? await getAllRaporlar()
                : (await getRaporCategoryById(selectedCategoryId)).raporlar;
            setRaporlar(data);
        } catch (err) {
            setError("Liste yenilenirken bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (rapor: Rapor) => {
        if (!window.confirm(`Bu raporu silmek istediğinizden emin misiniz?\n\n"${rapor.raporBaslik}"`)) return;
        try {
            await deleteRapor(rapor.raporId);
            await refreshList();
        } catch (err) {
            console.error("Rapor silinirken hata:", err);
            alert("Rapor silinirken bir hata oluştu.");
        }
    };

    const handleEdit = (rapor: Rapor) => {
        navigate(`/panel/kurumsal/raporlar/${rapor.raporId}/edit`);
    };

    const handleCreateNew = () => {
        navigate('/panel/kurumsal/raporlar/yeni');
    };


    return (
        <div className="p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
                <div>
                    <div className="text-xs text-slate-500">Kurumsal /</div>
                    <h1 className="text-xl font-bold text-slate-900">Raporlar</h1>
                </div>
                <div className="flex gap-2">
                    <label className="inline-flex items-center gap-2">
                        <span className="text-sm text-slate-600">Kategori</span>
                        <select
                            className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 shadow-sm hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
                            value={selectedCategoryId ?? ""}
                            onChange={handleCategoryChange}
                            disabled={loading}
                        >
                            <option value="">Tüm Raporlar</option>
                            {/* ⬇️ HATA BURADAYDI, KEY PROP'U EKLENDİ ⬇️ */}
                            {categories.map((cat) => (
                                <option key={cat.categoryId} value={cat.categoryId}>
                                    {cat.categoryName}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button
                        onClick={handleCreateNew}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-sky-600 text-white shadow-sm hover:bg-sky-700 active:bg-sky-800 transition"
                    >
                        <Plus size={16} />
                        Yeni Rapor
                    </button>
                </div>
            </div>

            {loading && <div className="text-slate-600">Yükleniyor…</div>}
            {error && <div className="text-red-700">{error}</div>}

            {!loading && !error && (
                <div className="grid gap-3">
                    {raporlar.length > 0 ? (
                        raporlar.map((r) => (
                            <div key={r.raporId} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow transition">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 grid place-items-center rounded-lg border border-slate-200 bg-slate-50">
                                        <FileText size={18} className="text-slate-500" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="font-medium text-slate-900">{r.raporBaslik}</div>
                                        <a href={r.raporUrl} target="_blank" rel="noreferrer" className="text-xs text-sky-700 underline break-all">
                                            {r.raporUrl}
                                        </a>
                                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                                            <Badge tone="slate">
                                                <Calendar size={12} />
                                                {r.raporTarihi ? new Date(r.raporTarihi).toLocaleDateString('tr-TR') : "—"}
                                            </Badge>
                                            {r.raporDurum ? (
                                                <Badge tone="green"><CheckCircle2 size={12} />Aktif</Badge>
                                            ) : (
                                                <Badge tone="slate"><CircleSlash size={12} />Pasif</Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(r)} className="px-3 py-2 rounded-lg border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 active:bg-slate-100 transition">
                                        Düzenle
                                    </button>
                                    <button onClick={() => handleDelete(r)} className="px-3 py-2 rounded-lg border border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 active:bg-rose-200/40 transition">
                                        Sil
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-slate-500 text-center py-8">
                            {selectedCategoryId ? "Bu kategoride henüz rapor yok." : "Gösterilecek rapor bulunamadı."}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}