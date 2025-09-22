// src/pages/EtkinlikYeniPage.tsx
import { useMemo, useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPost } from "../services/apiService";
import { apiPostForm } from "../services/apiService2";

type EtkinlikForm = {
    baslik: string;
    tarih: string;     // yyyy-MM-dd
    resimUrl: string;  // DB'ye gönderilecek alan
    aciklama: string;
};

type UploadOk = { success?: boolean; fileName?: string; message?: string };

const UPLOAD_URL = "/api/files/upload";
// DB'ye yazılacak public yol şablonu
const toPublicPath = (fileName: string) => `/images/resimler/${fileName}`;

export default function EtkinlikYeniPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState<EtkinlikForm>({
        baslik: "",
        tarih: "",
        resimUrl: "",
        aciklama: "",
    });

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fileRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);

    const preview = useMemo(
        () => (file ? URL.createObjectURL(file) : form.resimUrl || ""),
        [file, form.resimUrl]
    );
    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const inputCls =
        "rounded-lg px-3 py-2 bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500/60 outline-none";

    // --- Dosya yükleme ---
    async function uploadOne(f: File): Promise<string> {
        if (!f.type.startsWith("image/")) throw new Error("Yalnızca resim dosyası yükleyin.");
        if (f.size > 1_000_000) throw new Error("Dosya 1 MB’tan büyük olamaz.");

        const fd = new FormData();
        fd.append("file", f); // BE: @RequestParam("file")
        const res = await apiPostForm<UploadOk>(UPLOAD_URL, fd);
        const fileName = (res as any)?.fileName as string | undefined;
        if (!fileName) throw new Error((res as any)?.message || "Yükleme başarısız.");

        // BE zaten /images/resimler/... döndürüyorsa tekrar prefixleme
        if (fileName.startsWith("/images/resimler/")) return fileName;
        return toPublicPath(fileName);
    }

    async function onPick() {
        const f = fileRef.current?.files?.[0] || null;
        setFile(f || null);
        if (!f) return;
        try {
            setError(null);
            const url = await uploadOne(f);
            setForm((s) => ({ ...s, resimUrl: url })); // DB'ye gidecek alan
        } catch (e: any) {
            setError(e?.message || "Yükleme hatası");
        }
    }

    // --- Kaydet ---
    const submit: React.FormEventHandler = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        try {
            // yyyy-MM-dd garantisi
            const raw = (form.tarih || "").trim();
            let tarih = raw;
            const dot = raw.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
            if (dot) tarih = `${dot[3]}-${dot[2]}-${dot[1]}`;
            if (!/^\d{4}-\d{2}-\d{2}$/.test(tarih)) tarih = raw.split("T")[0];

            await apiPost("/api/etkinlikler/create", {
                baslik: (form.baslik || "").trim(),
                aciklama: (form.aciklama || "").trim(),
                delta: 0,
                resimUrl: form.resimUrl, // <--- camelCase (ARTIK DOĞRU)
                tarih,
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
                <h1 className="text-2xl font-semibold text-slate-800">Yeni Etkinlik</h1>
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
                        placeholder="yyyy-mm-dd"
                        className={inputCls}
                        value={form.tarih}
                        onChange={(e) => setForm({ ...form, tarih: e.target.value })}
                        required
                    />

                    {/* Resim yükleme */}
                    <div className="col-span-2">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-700">Kapak Görseli</span>
                            <button
                                type="button"
                                onClick={() => fileRef.current?.click()}
                                className="text-xs px-2 py-1 rounded-md ring-1 ring-slate-200 hover:bg-slate-50"
                            >
                                Dosya Seç
                            </button>
                        </div>

                        <input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={onPick}
                        />

                        <div className="aspect-video rounded-xl ring-1 ring-slate-200 overflow-hidden flex items-center justify-center bg-slate-50">
                            {preview ? (
                                <img src={preview} alt="Önizleme" className="h-full w-full object-cover" />
                            ) : (
                                <span className="text-slate-400 text-sm">Önizleme yok</span>
                            )}
                        </div>

                        <input
                            type="text"
                            readOnly
                            placeholder="Yükleme sonrası otomatik dolar"
                            className={inputCls + " mt-2 w-full"}
                            value={form.resimUrl}
                        />
                    </div>

                    <textarea
                        placeholder="Açıklama"
                        rows={3}
                        className={inputCls + " col-span-2"}
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
