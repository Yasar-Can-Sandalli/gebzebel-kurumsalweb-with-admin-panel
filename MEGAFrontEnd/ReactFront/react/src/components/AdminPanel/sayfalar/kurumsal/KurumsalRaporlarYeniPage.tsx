import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    getAllRaporCategories,
    createRapor,
} from "../../services/raporlarService";
import type { RaporCategory } from "../../types/raporlar";

// Form verileri için bir tip tanımı yapıyoruz
type CreateRaporForm = {
    raporBaslik: string;
    raporUrl: string;
    raporTarihi: string; // YYYY-MM-DD formatında
    raporDurum: boolean;
    categoryId: number | ''; // Başlangıçta boş olabilir
};

export default function KurumsalRaporlarYeniPage() {
    const navigate = useNavigate();

    // Formun verilerini tutan state
    const [formData, setFormData] = useState<CreateRaporForm>({
        raporBaslik: "",
        raporUrl: "",
        raporTarihi: new Date().toISOString().slice(0, 10), // Varsayılan olarak bugünün tarihi
        raporDurum: true,
        categoryId: '',
    });

    const [categories, setCategories] = useState<RaporCategory[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Form alanları için hata state'leri
    const [baslikError, setBaslikError] = useState<string | null>(null);
    const [urlError, setUrlError] = useState<string | null>(null);
    const [categoryError, setCategoryError] = useState<string | null>(null);

    // Sayfa yüklendiğinde kategorileri API'den getir
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getAllRaporCategories();
                setCategories(fetchedCategories);
            } catch (err) {
                console.error("Kategoriler yüklenirken hata oluştu:", err);
                setErrorMessage("Kategori listesi yüklenemedi. Lütfen daha sonra tekrar deneyin.");
            }
        };
        fetchCategories();
    }, []);

    // Formdaki herhangi bir değişiklik olduğunda state'i güncelle
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        // Checkbox için özel durum
        const newValue = (type === 'checkbox') ? (e.target as HTMLInputElement).checked : value;

        setFormData(prev => ({ ...prev, [name]: name === 'categoryId' ? Number(value) : newValue }));

        // Yazarken anlık doğrulama
        if (name === 'raporBaslik') {
            setBaslikError(value.trim().length === 0 ? "Rapor Başlığı boş bırakılamaz." : null);
        } else if (name === 'raporUrl') {
            setUrlError(value.trim().length === 0 ? "Rapor URL'si boş bırakılamaz." : null);
        }
    };

    // Form gönderildiğinde
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);
        setBaslikError(null);
        setUrlError(null);
        setCategoryError(null);

        // Göndermeden önce son bir doğrulama yap
        let hasError = false;
        if (formData.raporBaslik.trim().length === 0) {
            setBaslikError("Rapor Başlığı boş bırakılamaz.");
            hasError = true;
        }
        if (formData.raporUrl.trim().length === 0) {
            setUrlError("Rapor URL'si boş bırakılamaz.");
            hasError = true;
        }
        if (!formData.categoryId) {
            setCategoryError("Lütfen bir kategori seçin.");
            hasError = true;
        }
        if (hasError) return;

        setIsSubmitting(true);
        try {
            await createRapor({
                raporBaslik: formData.raporBaslik,
                raporUrl: formData.raporUrl,
                categoryId: formData.categoryId as number,
                raporTarihi: formData.raporTarihi,
                raporDurum: formData.raporDurum,
            });
            // Başarılı olursa raporlar listesine yönlendir
            navigate("/panel/kurumsal/raporlar");
        } catch (error: any) {
            console.error("Rapor oluşturma başarısız:", error);
            setErrorMessage(error?.message || "Rapor oluşturulurken beklenmedik bir hata oluştu.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Stil sınıfları
    const inputCls = "w-full rounded-lg px-3 py-2 bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-sky-500 outline-none transition";
    const labelCls = "text-sm font-medium text-slate-700";

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold text-slate-800">Yeni Rapor Ekle</h1>
                <Link to="/panel/kurumsal/raporlar" className="px-3 py-2 rounded-lg text-sm bg-white ring-1 ring-slate-200 hover:bg-slate-50 transition">
                    Listeye Geri Dön
                </Link>
            </div>

            {errorMessage && (
                <div className="p-3 mb-4 text-red-700 bg-red-50 rounded-lg border border-red-200">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <label className="grid gap-1.5">
                    <span className={labelCls}>Rapor Başlığı</span>
                    <input
                        type="text"
                        name="raporBaslik"
                        value={formData.raporBaslik}
                        onChange={handleChange}
                        className={`${inputCls} ${baslikError ? 'ring-red-500' : ''}`}
                        placeholder="Örn: 2024 Yılı Faaliyet Raporu"
                        required
                    />
                    {baslikError && <div className="text-sm text-red-600">{baslikError}</div>}
                </label>

                <label className="grid gap-1.5">
                    <span className={labelCls}>Rapor URL (PDF)</span>
                    <input
                        type="url"
                        name="raporUrl"
                        value={formData.raporUrl}
                        onChange={handleChange}
                        className={`${inputCls} ${urlError ? 'ring-red-500' : ''}`}
                        placeholder="https://.../rapor.pdf"
                        required
                    />
                    {urlError && <div className="text-sm text-red-600">{urlError}</div>}
                </label>

                <label className="grid gap-1.5">
                    <span className={labelCls}>Kategori</span>
                    <select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        className={`${inputCls} ${categoryError ? 'ring-red-500' : ''}`}
                        required
                    >
                        <option value="">Lütfen bir kategori seçin...</option>
                        {categories.map(cat => (
                            <option key={cat.categoryId} value={cat.categoryId}>
                                {cat.categoryName}
                            </option>
                        ))}
                    </select>
                    {categoryError && <div className="text-sm text-red-600">{categoryError}</div>}
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <label className="grid gap-1.5">
                        <span className={labelCls}>Rapor Tarihi</span>
                        <input
                            type="date"
                            name="raporTarihi"
                            value={formData.raporTarihi}
                            onChange={handleChange}
                            className={inputCls}
                        />
                    </label>

                    <div className="flex items-center pt-6">
                        <input
                            type="checkbox"
                            id="raporDurum"
                            name="raporDurum"
                            checked={formData.raporDurum}
                            onChange={handleChange}
                            className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                        />
                        <label htmlFor="raporDurum" className="ml-2 text-sm text-slate-800">
                            Rapor yayında ve aktif mi?
                        </label>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-5 py-2.5 rounded-lg font-semibold text-white bg-sky-600 hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        {isSubmitting ? "Kaydediliyor..." : "Raporu Kaydet"}
                    </button>
                </div>
            </form>
        </div>
    );
}