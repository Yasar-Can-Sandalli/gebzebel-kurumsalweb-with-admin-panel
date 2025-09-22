import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// GÜNCELLENDİ: API servisleri yerine spesifik servis fonksiyonları import edildi
import { createHaber, getAllHaberCategories } from "../services/haberlerService";
// GÜNCELLENDİ: Doğru tip tanımı import edildi
import type { HaberCategorySummary } from "../types/haberler";

// GÜNCELLENDİ: Formun state'i için kullanılacak tip, createHaber'in beklediği payload ile eşleşiyor
type FormState = {
    haberBaslik: string;
    haberTarih: string;
    haberAciklama: string;
    haberResim1: string;
    haberResim2: string;
    categoryId: number | null;
};

export default function HaberYeniPage() {
    const navigate = useNavigate();

    // GÜNCELLENDİ: State'in alan adları backend DTO ile uyumlu hale getirildi
    const [form, setForm] = useState<FormState>({
        haberBaslik: "",
        haberTarih: "",
        haberAciklama: "",
        haberResim1: "",
        haberResim2: "",
        categoryId: null,
    });

    // GÜNCELLENDİ: Kategori tipi HaberCategorySummary olarak değiştirildi
    const [kategoriler, setKategoriler] = useState<HaberCategorySummary[]>([]);
    const [loadingCats, setLoadingCats] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                // GÜNCELLENDİ: Kategori listesini çekmek için doğru servis fonksiyonu çağrıldı
                const data = await getAllHaberCategories();
                setKategoriler(data ?? []);
            } catch (e: any) {
                setError(e?.response?.data?.message || e?.message || "Kategoriler yüklenemedi");
            } finally {
                setLoadingCats(false);
            }
        })();
    }, []);

    const inputCls =
        "rounded-lg px-3 py-2 bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500/60 outline-none";

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.categoryId) {
            setError("Lütfen bir kategori seçiniz.");
            return;
        }

        setError(null);
        setSaving(true);
        try {
            // GÜNCELLENDİ: Yeni haber oluşturmak için doğru servis fonksiyonu ve payload kullanıldı
            await createHaber({
                ...form,
                categoryId: form.categoryId, // Typescript'in null olmama durumunu anlaması için
            });
            navigate("..", { replace: true, relative: "path" });
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.response?.data || err?.message || "Kaydetme hatası";
            setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-slate-800">Yeni Haber</h1>
                <Link to=".." relative="path" className="rounded-lg px-3 py-2 ring-1 ring-slate-200 hover:bg-slate-50">
                    Listeye Dön
                </Link>
            </div>

            {error && <div className="text-red-600 bg-red-50 rounded-lg px-4 py-2 ring-1 ring-red-200">{error}</div>}

            <form onSubmit={submit} className="mx-auto max-w-2xl bg-white rounded-xl p-5 shadow-md ring-1 ring-slate-200/60">
                <div className="grid grid-cols-2 gap-3">
                    {/* GÜNCELLENDİ: Tüm form elemanları yeni state adlarına göre güncellendi */}
                    <input type="text" placeholder="Başlık" className={inputCls}
                           value={form.haberBaslik} onChange={(e) => setForm({ ...form, haberBaslik: e.target.value })} required />
                    <input type="date" className={inputCls}
                           value={form.haberTarih} onChange={(e) => setForm({ ...form, haberTarih: e.target.value })} required />

                    <select className={inputCls} value={form.categoryId ?? ""} required disabled={loadingCats}
                            onChange={(e) => setForm({ ...form, categoryId: e.target.value ? Number(e.target.value) : null })}>
                        <option value="">{loadingCats ? "Kategoriler yükleniyor…" : "— Kategori Seç —"}</option>
                        {/* GÜNCELLENDİ: Kategori nesnesinin yeni alan adları (categoryId, categoryName) kullanıldı */}
                        {kategoriler.map(k => <option key={k.categoryId} value={k.categoryId}>{k.categoryName}</option>)}
                    </select>

                    <input type="text" placeholder="Resim 1 URL" className={inputCls}
                           value={form.haberResim1} onChange={(e) => setForm({ ...form, haberResim1: e.target.value })} />
                    <input type="text" placeholder="Resim 2 URL" className={inputCls + " col-span-2"}
                           value={form.haberResim2} onChange={(e) => setForm({ ...form, haberResim2: e.target.value })} />

                    <textarea placeholder="Açıklama / İçerik" rows={3} className={inputCls + " col-span-2"}
                              value={form.haberAciklama} onChange={(e) => setForm({ ...form, haberAciklama: e.target.value })} />
                </div>

                <div className="flex gap-3 mt-4">
                    <button type="submit" disabled={saving}
                            className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-sky-600 shadow-lg disabled:opacity-60">
                        {saving ? "Kaydediliyor..." : "Kaydet"}
                    </button>
                </div>
            </form>
        </div>
    );
}