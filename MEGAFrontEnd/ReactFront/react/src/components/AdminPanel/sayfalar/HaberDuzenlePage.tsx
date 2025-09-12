import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPut } from "../services/apiService";
import type { Haber } from "../types/Haber";

export default function HaberDuzenlePage() {
    const { id } = useParams();
    const rid = Number(id);
    const navigate = useNavigate();
    const [form, setForm] = useState<Haber | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const inputCls = "rounded-lg px-3 py-2 bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500/60 outline-none";

    useEffect(() => {
        (async () => {
            try {
                const data = await apiGet<Haber>(`/api/haberler/${rid}`);
                setForm(data);
            } catch (e: any) {
                setError(e?.message || "Yüklenemedi");
            } finally {
                setLoading(false);
            }
        })();
    }, [rid]);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form) return;

        setError(null);
        try {
            const ok = await apiPut<boolean>(`/api/haberler/${rid}`, {
                ...form,
                tarih: (form.tarih || "").trim(),
            });
            if (ok === false) throw new Error("Güncellenemedi");
            navigate("../..", { relative: "path" });
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.response?.data || err?.message || "Güncelleme hatası";
            setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
        }
    };

    if (loading) return <div className="p-6">Yükleniyor…</div>;
    if (!form) return <div className="p-6 text-red-500">Kayıt bulunamadı</div>;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-slate-800">Haber Güncelle</h1>
                <Link to="../.." relative="path" className="rounded-lg px-3 py-2 ring-1 ring-slate-200 hover:bg-slate-50">Listeye Dön</Link>
            </div>

            {error && (
                <div className="text-red-600 bg-red-50 rounded-lg px-4 py-2 ring-1 ring-red-200">{error}</div>
            )}

            <form onSubmit={submit} className="mx-auto max-w-2xl space-y-3 bg-white rounded-xl p-5 shadow-md shadow-blue-500/5 ring-1 ring-slate-200/60">
                <input className={inputCls} value={form.baslik} onChange={(e) => setForm({ ...form, baslik: e.target.value })} />
                <input type="date" className={inputCls} value={form.tarih} onChange={(e) => setForm({ ...form, tarih: e.target.value })} />
                <input className={inputCls} placeholder="Açıklama" value={form.aciklama} onChange={(e) => setForm({ ...form, aciklama: e.target.value })} />
                <input className={inputCls} placeholder="Resim 1 URL" value={form.resim1 || ""} onChange={(e) => setForm({ ...form, resim1: e.target.value })} />
                <input className={inputCls} placeholder="Resim 2 URL" value={form.resim2 || ""} onChange={(e) => setForm({ ...form, resim2: e.target.value })} />
                <input className={inputCls} placeholder="Kategori" value={form.kategori?.ad || ""} onChange={(e) => setForm({ ...form, kategori: { id: form.kategori?.id || 0, ad: e.target.value } })} />
                <div className="flex gap-3">
                    <button className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-sky-600 shadow-lg shadow-blue-500/20">Kaydet</button>
                    <Link to="../.." relative="path" className="px-4 py-2 rounded-lg ring-1 ring-slate-200 hover:bg-slate-50">İptal</Link>
                </div>
            </form>
        </div>
    );
}
