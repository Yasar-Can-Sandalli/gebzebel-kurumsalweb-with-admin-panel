// src/sayfalar/YayinlarPage.tsx

import React, { useEffect, useState } from "react";
import {
    getAllYayinCategories,
    getYayinCategoryById,
    getAllYayin,
    deleteYayin,
} from "../services/yayinlarService";

// İlgili tipleri güncel import ediyoruz
import type { Yayin, YayinCategorySummary } from "../types/yayinlar";
import { useNavigate } from "react-router-dom";
import { FileText, Plus } from "lucide-react";




const YayinlarPage = () => {
    const navigate = useNavigate();

    const [categories, setCategories] = useState<YayinCategorySummary[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [yayinlar, setYayinlar] = useState<Yayin[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [fetchedCategories, allYayinlar] = await Promise.all([
                    getAllYayinCategories(),
                    getAllYayin(),
                ]);

                setCategories(fetchedCategories);
                setYayinlar(allYayinlar);
            } catch (err) {
                console.error("Veriler yüklenirken hata oluştu:", err);
                setError("Veriler yüklenemedi.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const id = parseInt(event.target.value);
        setSelectedCategoryId(id);
        setLoading(true);
        setError(null);

        try {
            if (isNaN(id)) { // "Tüm Yayınlar" seçeneği
                const allYayinlar = await getAllYayin();
                setYayinlar(allYayinlar);
            } else { // Belirli bir kategori seçildiğinde
                const data = await getYayinCategoryById(id);
                setYayinlar(data.yayinlar);
            }
        } catch (err) {
            console.error("Yayınlar getirilirken hata oluştu:", err);
            setError("Yayınlar yüklenemedi.");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateNewYayin = () => {
        navigate("yeni");
    };

    const handleEditYayin = (yayinId: number) => {
        navigate(`duzenle/${yayinId}`);
    };

    const handleDeleteYayin = async (yayinId: number) => {
        if (window.confirm("Bu yayını silmek istediğinizden emin misiniz?")) {
            try {
                await deleteYayin(yayinId);
                setYayinlar(prevYayinlar => prevYayinlar.filter(yayin => yayin.yayinId !== yayinId));
                alert("Yayın başarıyla silindi.");
            } catch (err) {
                console.error("Yayın silinirken hata oluştu:", err);
                alert("Yayın silinirken bir hata oluştu.");
            }
        }
    };

    return (
        <div className="p-4">
            {/* Başlık */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Yayınlar</h1>
                </div>

                <div className="flex gap-2">
                    {/* Kategori combobox */}
                    <label className="inline-flex items-center gap-2">
                        <span className="text-sm text-slate-600">Kategori</span>
                        <select
                            className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 shadow-sm hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
                            value={selectedCategoryId ?? ''}
                            onChange={handleCategoryChange}
                        >
                            <option value={''}>Tüm Yayınlar</option>
                            {categories.map((cat) => (
                                <option key={cat.categoryId} value={cat.categoryId}>
                                    {cat.categoryName}
                                </option>
                            ))}
                        </select>
                    </label>

                    <button
                        onClick={handleCreateNewYayin}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-sky-600 text-white shadow-sm hover:bg-sky-700 active:bg-sky-800 transition"
                    >
                        <Plus size={16} />
                        Yeni Yayın
                    </button>
                </div>
            </div>

            {/* İçerik */}
            {loading && <div className="text-slate-600">Yükleniyor…</div>}
            {error && <div className="text-red-700">{error}</div>}

            {!loading && !error && (
                <div className="grid gap-3">
                    {yayinlar.map((yayin) => (
                        <div
                            key={yayin.yayinId}
                            className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow transition"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 grid place-items-center rounded-lg border border-slate-200 bg-slate-50">
                                    <FileText size={18} className="text-slate-500" />
                                </div>

                                <div className="space-y-1">
                                    <div className="font-medium text-slate-900">{yayin.yayinBaslik}</div>
                                    <a
                                        href={yayin.yayinUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-xs text-sky-700 underline break-all"
                                    >
                                        {yayin.yayinUrl}
                                    </a>
                                    {yayin.description && (
                                        <div className="text-xs text-slate-500">{yayin.description}</div>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEditYayin(yayin.yayinId)}
                                    className="px-3 py-2 rounded-lg border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 active:bg-slate-100 transition"
                                >
                                    Düzenle
                                </button>
                                <button
                                    onClick={() => handleDeleteYayin(yayin.yayinId)}
                                    className="px-3 py-2 rounded-lg border border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 active:bg-rose-200/40 transition"
                                >
                                    Sil
                                </button>
                            </div>
                        </div>
                    ))}
                    {yayinlar.length === 0 && (
                        <div className="text-slate-500 text-center py-8">Bu kategoride henüz yayın yok.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default YayinlarPage;