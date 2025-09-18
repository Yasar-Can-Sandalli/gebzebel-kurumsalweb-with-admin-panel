// src/sayfalar/YayinlarYeniPage.tsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    getAllYayinCategories,
    createYayin,
} from "../services/yayinlarService";
import type { YayinCategorySummary } from "../types/yayinlar";

// Form verileri için tip tanımlıyoruz
type CreateYayinForm = {
    yayinBaslik: string;
    yayinUrl: string;
    description: string;
    categoryId: number | ''; // Başlangıçta boş olabilir
};

export default function YayinlarYeniPage() {
    const navigate = useNavigate();

    // Formun verilerini tutan state
    const [formData, setFormData] = useState<CreateYayinForm>({
        yayinBaslik: "",
        yayinUrl: "",
        description: "",
        categoryId: '',
    });

    const [categories, setCategories] = useState<YayinCategorySummary[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Input hataları için state
    const [titleError, setTitleError] = useState<string | null>(null);
    const [urlError, setUrlError] = useState<string | null>(null);
    const [categoryError, setCategoryError] = useState<string | null>(null);

    // Sayfa yüklendiğinde kategorileri getirir
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getAllYayinCategories();
                setCategories(fetchedCategories);
                // Eğer kategori varsa, ilkini varsayılan olarak seç
                if (fetchedCategories.length > 0) {
                    setFormData(prev => ({ ...prev, categoryId: fetchedCategories[0].categoryId }));
                }
            } catch (err) {
                console.error("Kategoriler yüklenirken hata oluştu:", err);
                setErrorMessage("Kategoriler yüklenemedi.");
            }
        };
        fetchCategories();
    }, []);

    // Form alanları değiştiğinde state'i güncelle
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'categoryId' ? Number(value) : value }));

        // Real-time validation
        if (name === 'yayinBaslik') {
            setTitleError(value.trim().length === 0 ? "Yayın Başlığı boş olamaz" : null);
        } else if (name === 'yayinUrl') {
            setUrlError(value.trim().length === 0 ? "Yayın URL'si boş olamaz" : null);
        }
    };

    // Form gönderimini ele alır
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Hata mesajlarını sıfırla
        setErrorMessage(null);
        setTitleError(null);
        setUrlError(null);
        setCategoryError(null);

        // Doğrulama
        let hasError = false;
        if (formData.yayinBaslik.trim().length === 0) {
            setTitleError("Yayın Başlığı boş olamaz");
            hasError = true;
        }
        if (formData.yayinUrl.trim().length === 0) {
            setUrlError("Yayın URL'si boş olamaz");
            hasError = true;
        }
        if (!formData.categoryId) {
            setCategoryError("Kategori seçimi zorunludur");
            hasError = true;
        }

        if (hasError) return;

        setIsSubmitting(true);
        try {
            await createYayin({
                yayinBaslik: formData.yayinBaslik,
                yayinUrl: formData.yayinUrl,
                description: formData.description,
                categoryId: formData.categoryId as number,
            });
            navigate("/panel/yayinlar");
        } catch (error: any) {
            console.error("Yayın oluşturma başarısız:", error);
            setErrorMessage(error?.message || "Yayın oluşturulurken bir hata oluştu.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputCls = "w-full rounded-lg px-3 py-2 bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500/60 outline-none";
    const labelCls = "text-sm text-slate-700";

    return (
        <div className="space-y-4 p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-slate-800">Yeni Yayın</h1>
                <Link to="/panel/yayinlar" className="rounded-lg px-3 py-2 ring-1 ring-slate-200 hover:bg-slate-50">
                    Geri Dön
                </Link>
            </div>

            {errorMessage && (
                <div className="text-red-600 bg-red-50 rounded-lg px-4 py-2 ring-1 ring-red-200">
                    {errorMessage}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-2xl space-y-3 bg-white rounded-xl p-5 shadow-md shadow-blue-500/5 ring-1 ring-slate-200/60"
            >
                <label className="grid gap-1">
                    <span className={labelCls}>Yayın Başlığı</span>
                    <input
                        type="text"
                        name="yayinBaslik"
                        value={formData.yayinBaslik}
                        onChange={handleChange}
                        className={`${inputCls} ${titleError ? 'ring-red-500' : ''}`}
                        placeholder="Başlık giriniz..."
                        required
                    />
                    {titleError && (
                        <div className="text-red-500 text-sm mt-1">{titleError}</div>
                    )}
                </label>

                <label className="grid gap-1">
                    <span className={labelCls}>Yayın URL</span>
                    <input
                        type="url"
                        name="yayinUrl"
                        value={formData.yayinUrl}
                        onChange={handleChange}
                        className={`${inputCls} ${urlError ? 'ring-red-500' : ''}`}
                        placeholder="URL giriniz (örn: https://...)"
                        required
                    />
                    {urlError && (
                        <div className="text-red-500 text-sm mt-1">{urlError}</div>
                    )}
                </label>

                <label className="grid gap-1">
                    <span className={labelCls}>Açıklama (isteğe bağlı)</span>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className={`${inputCls}`}
                        rows={3}
                        placeholder="Açıklama giriniz..."
                    />
                </label>

                <label className="grid gap-1">
                    <span className={labelCls}>Kategori</span>
                    <select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        className={`${inputCls} ${categoryError ? 'ring-red-500' : ''}`}
                        required
                    >
                        <option value={''}>Kategori Seçiniz</option>
                        {categories.map(cat => (
                            <option key={cat.categoryId} value={cat.categoryId}>
                                {cat.categoryName}
                            </option>
                        ))}
                    </select>
                    {categoryError && (
                        <div className="text-red-500 text-sm mt-1">{categoryError}</div>
                    )}
                </label>

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-sky-600 shadow-lg shadow-blue-500/20 disabled:opacity-60"
                    >
                        {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
                    </button>
                </div>
            </form>
        </div>
    );
}