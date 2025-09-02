import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPost } from "../services/apiService";
import type { Haber, Kategori } from "./HaberlerPage";

export default function HaberYeniPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState<Haber>({
        baslik: "",
        tarih: "",
        aciklama: "",
        resim1: "",
        resim2: "",
        kategori: null
    });
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    // Statik kategori listesi
    const kategoriler: Kategori[] = [
        { id: 1, ad: "Başkan" },
        { id: 21, ad: "Geri Dönüşüm" },
        { id: 22, ad: "Eğitim" },
        { id: 23, ad: "Projeler" },
        { id: 24, ad: "Sosyal Yardım" },
    ];

    const inputCls =
        "rounded-lg px-3 py-2 bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500/60 outline-none";

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSaving(true);
        try {
            // id göndermiyoruz → sadece gerekli alanları gönderiyoruz
            await apiPost<Haber>("/api/haberler/create", {
                baslik: form.baslik,
                tarih: (form.tarih || "").trim(),
                aciklama: form.aciklama,
                resim1: form.resim1,
                resim2: form.resim2,
                kategori: form.kategori ? { id: form.kategori.id } : null,
            });
            navigate("..", { replace: true, relative: "path" });
        } catch (err: any) {
            const msg =
                err?.response?.data?.message ||
                err?.response?.data ||
                err?.message ||
                "Kaydetme hatası";
            setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-slate-800">Yeni Haber</h1>
                <Link
                    to=".."
                    relative="path"
                    className="rounded-lg px-3 py-2 ring-1 ring-slate-200 hover:bg-slate-50"
                >
                    Listeye Dön
                </Link>
            </div>

            {error && (
                <div className="text-red-600 bg-red-50 rounded-lg px-4 py-2 ring-1 ring-red-200">
                    {error}
                </div>
            )}

            <form
                onSubmit={submit}
                className="mx-auto max-w-2xl bg-white rounded-xl p-5 shadow-md shadow-blue-500/5 ring-1 ring-slate-200/60"
            >
                <div className="grid grid-cols-2 gap-3">
                    <input
                        type="text"
                        placeholder="Başlık"
                        className={inputCls}
                        value={form.baslik}
                        onChange={(e) => setForm({ ...form, baslik: e.target.value })}
                        required
                    />

                    <input
                        type="date"
                        className={inputCls}
                        value={form.tarih}
                        onChange={(e) => setForm({ ...form, tarih: e.target.value })}
                        required
                    />

                    <select
                        className={inputCls}
                        value={form.kategori?.id || ""}
                        onChange={(e) => {
                            const id = Number(e.target.value);
                            const cat = kategoriler.find((k) => k.id === id) || null;
                            setForm({ ...form, kategori: cat });
                        }}
                        required
                    >
                        <option value="">— Kategori Seç —</option>
                        {kategoriler.map((k) => (
                            <option key={k.id} value={k.id}>
                                {k.ad}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        placeholder="Resim 1 URL"
                        className={inputCls}
                        value={form.resim1}
                        onChange={(e) => setForm({ ...form, resim1: e.target.value })}
                    />

                    <input
                        type="text"
                        placeholder="Resim 2 URL"
                        className={inputCls + " col-span-2"}
                        value={form.resim2}
                        onChange={(e) => setForm({ ...form, resim2: e.target.value })}
                    />

                    <textarea
                        placeholder="Açıklama / İçerik"
                        rows={3}
                        className={inputCls + " col-span-2"}
                        value={form.aciklama}
                        onChange={(e) => setForm({ ...form, aciklama: e.target.value })}
                    />
                </div>

                <div className="flex gap-3 mt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-sky-600 shadow-lg shadow-blue-500/20 disabled:opacity-60"
                    >
                        {saving ? "Kaydediliyor..." : "Kaydet"}
                    </button>
                </div>
            </form>
        </div>
    );
}