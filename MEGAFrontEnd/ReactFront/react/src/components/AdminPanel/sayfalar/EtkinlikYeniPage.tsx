import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPost } from "../services/apiService";
import type { Etkinlik } from "./EtkinliklerPage";

export default function EtkinlikYeniPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState<Etkinlik>({
        baslik: "",
        tarih: "",
        resimUrl: "",
        aciklama: ""
    });
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    const inputCls =
        "rounded-lg px-3 py-2 bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500/60 outline-none";

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); setSaving(true);
        try {
            await apiPost<Etkinlik>("/api/etkinlikler/create", {
                ...form,
                tarih: (form.tarih || "").trim()
            });
            navigate("..", { replace: true, relative: "path" });
        } catch (err: any) {
            const msg = err?.response?.data?.message ||
                err?.response?.data || err?.message ||
                "Kaydetme hatası";
            setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-slate-800">Yeni Etkinlik</h1>
                <Link to=".." relative="path" className="rounded-lg px-3 py-2 ring-1 ring-slate-200 hover:bg-slate-50">
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
                className="mx-auto max-w-2xl space-y-3 bg-white rounded-xl p-5 shadow-md shadow-blue-500/5 ring-1 ring-slate-200/60"
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
                <input
                    type="text"
                    placeholder="Resim URL"

                    className={inputCls}
                    value={form.resimUrl}
                    onChange={(e) => setForm({ ...form, resimUrl: e.target.value })}
                />
                <textarea
                    placeholder="Açıklama"
                    rows={3}
                    className={inputCls}
                    value={form.aciklama}
                    onChange={(e) => setForm({ ...form, aciklama: e.target.value })}
                />
                </div>
                <div className="flex gap-3">
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
