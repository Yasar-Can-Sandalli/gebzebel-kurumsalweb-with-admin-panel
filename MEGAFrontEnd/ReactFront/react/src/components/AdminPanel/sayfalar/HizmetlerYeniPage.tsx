import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPost } from "../services/apiService";
import { apiPostForm } from "../services/apiService2";

type UploadOk = { success?: boolean; fileName?: string; message?: string };

const API_CREATE = "/api/hizmetler/create";          // POST
const UPLOAD_URL = "/api/files/upload";       // POST multipart
const toPublicPath = (name: string) =>
    name.startsWith("/images/resimler/") ? name : `/images/resimler/${name}`;

const input =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/60";
const label = "block text-[13px] font-medium text-slate-700 mb-1";

export default function HizmetlerYeniPage() {
    const nav = useNavigate();

    const [form, setForm] = useState({
        baslik: "",
        imgUrl: "",
        telefon: "",
        konum: "",
        buttonDetay: "",
        buttonKonum: "",
        mail: "",
        kategori: "",
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // --------- Upload ----------
    const fileRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const preview = useMemo(
        () => (file ? URL.createObjectURL(file) : form.imgUrl || ""),
        [file, form.imgUrl]
    );
    useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

    async function uploadOne(f: File) {
        const fd = new FormData();
        fd.append("file", f);
        const res = await apiPostForm<UploadOk>(UPLOAD_URL, fd);
        const fileName = (res as any)?.fileName as string | undefined;
        if (!fileName) throw new Error((res as any)?.message || "Yükleme başarısız");
        return toPublicPath(fileName);
    }
    async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0] || null;
        setFile(f);
        if (!f) return;
        try {
            setError(null);
            const url = await uploadOne(f);
            setForm((s) => ({ ...s, imgUrl: url }));
        } catch (er: any) {
            setError(er?.message || "Resim yüklenemedi");
        }
    }

    // --------- Submit ----------
    const submit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setSaving(true);
        setError(null);
        try {
            if (!form.baslik.trim()) throw new Error("Başlık zorunlu");
            await apiPost(API_CREATE, {
                ...form,
                imgUrl: (form.imgUrl || "").trim(), // /images/resimler/<ad>
            });
            // listeye dön (relative path güvenli)
            nav("..", { replace: true });
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "Ekleme hatası";
            setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="mx-auto max-w-[1200px]">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                <div className="flex items-center justify-between py-4">
                    <div className="min-w-0">
                        <div className="text-xs text-slate-500">Hizmetler</div>
                        <h1 className="text-2xl font-semibold text-slate-800">Sayfayı Oluştur</h1>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            to=""
                            relative="path"
                            className="rounded-lg px-3 py-2 ring-1 ring-slate-200 hover:bg-slate-50"
                        >
                            İptal
                        </Link>
                        <button
                            onClick={() => submit()}
                            disabled={saving}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow-lg disabled:opacity-60"
                        >
                            {saving ? "Kaydediliyor…" : "Kaydet"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Body */}
            {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-red-700">
                    {error}
                </div>
            )}

            <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Sol sütun */}
                    <div className="space-y-5">
                        <div>
                            <label className={label}>Başlık *</label>
                            <input
                                className={input}
                                value={form.baslik}
                                onChange={(e) => setForm({ ...form, baslik: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className={label}>Telefon</label>
                            <input
                                className={input}
                                value={form.telefon}
                                onChange={(e) => setForm({ ...form, telefon: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className={label}>Konum</label>
                            <input
                                className={input}
                                value={form.konum}
                                onChange={(e) => setForm({ ...form, konum: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className={label}>Buton (Detay)</label>
                            <input
                                className={input}
                                value={form.buttonDetay}
                                onChange={(e) => setForm({ ...form, buttonDetay: e.target.value })}
                                placeholder="/hizmetler/atolyeler/enderun"
                            />
                        </div>

                        <div>
                            <label className={label}>Buton (Konum)</label>
                            <input
                                className={input}
                                value={form.buttonKonum}
                                onChange={(e) => setForm({ ...form, buttonKonum: e.target.value })}
                                placeholder="https://maps.google.com/…"
                            />
                        </div>

                        <div>
                            <label className={label}>E-posta</label>
                            <input
                                type="email"
                                className={input}
                                value={form.mail}
                                onChange={(e) => setForm({ ...form, mail: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className={label}>Kategori</label>
                            <input
                                className={input}
                                value={form.kategori}
                                onChange={(e) => setForm({ ...form, kategori: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Sağ sütun — Görsel URL + Önizleme */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className={label + " mb-0"}>Görsel URL</label>
                            <button
                                type="button"
                                onClick={() => fileRef.current?.click()}
                                className="rounded-md px-3 py-1.5 ring-1 ring-slate-200 hover:bg-slate-50 text-xs"
                            >
                                Dosya Seç
                            </button>
                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={onPick}
                            />
                        </div>

                        <input
                            className={input}
                            placeholder="/images/resimler/..."
                            value={form.imgUrl}
                            onChange={(e) => setForm({ ...form, imgUrl: e.target.value })}
                        />

                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
                            <div className="aspect-[3/2] w-full overflow-hidden rounded-lg ring-1 ring-slate-200">
                                {preview ? (
                                    <img src={preview} alt="Önizleme" className="h-full w-full object-cover" />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                                        Önizleme yok
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
