// src/pages/HaberlerYeniPage.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiGet, apiPost, apiPostForm } from "../services/apiService2";

interface Kategori { id: number; ad: string }

type HaberCreate = {
    baslik: string;
    tarih: string;        // "yyyy-MM-dd"
    aciklama: string;
    resim1?: string | null;
    resim2?: string | null;
    kategoriId: number | null;
};

type UploadOk = { success?: boolean; fileName?: string; message?: string };

const UPLOAD_URL = "/api/files/upload";
// DB'ye yazılacak NİHAİ format (Etkinlik sayfasıyla aynı)
const toPublicPath = (fileName: string) => `/images/resimler/${fileName}`;
const MAX_BYTES = 1_000_000;

export default function HaberYeniPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState<HaberCreate>({
        baslik: "",
        tarih: "",
        aciklama: "",
        resim1: null,
        resim2: null,
        kategoriId: null,
    });

    const [kategoriler, setKategoriler] = useState<Kategori[]>([]);
    const [loadingCats, setLoadingCats] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // --- Dosya girişleri (Etkinlik mimarisi) ---
    const file1Ref = useRef<HTMLInputElement>(null);
    const file2Ref = useRef<HTMLInputElement>(null);
    const [file1, setFile1] = useState<File | null>(null);
    const [file2, setFile2] = useState<File | null>(null);

    const preview1 = useMemo(
        () => (file1 ? URL.createObjectURL(file1) : form.resim1 || ""),
        [file1, form.resim1]
    );
    const preview2 = useMemo(
        () => (file2 ? URL.createObjectURL(file2) : form.resim2 || ""),
        [file2, form.resim2]
    );

    useEffect(() => {
        (async () => {
            try {
                const data = await apiGet<Kategori[]>("/api/kategoriler");
                setKategoriler(data ?? []);
            } catch (e: any) {
                setError(e?.response?.data || e?.message || "Kategoriler yüklenemedi");
            } finally {
                setLoadingCats(false);
            }
        })();
    }, []);

    useEffect(() => {
        return () => {
            if (preview1) URL.revokeObjectURL(preview1);
            if (preview2) URL.revokeObjectURL(preview2);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const inputCls =
        "rounded-xl px-3 py-2 bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500/60 outline-none";

    function validateFile(f: File | null): string | null {
        if (!f) return null;
        if (!f.type.startsWith("image/")) return "Yalnızca resim dosyası yükleyin.";
        if (f.size > MAX_BYTES) return "Dosya 1 MB’tan büyük olamaz.";
        return null;
    }

    // Tek dosya yükleme → fileName al → /images/resimler/<ad> üret
    async function uploadOne(f: File): Promise<string> {
        const err = validateFile(f);
        if (err) throw new Error(err);

        const fd = new FormData();
        fd.append("file", f); // BE: @RequestParam("file")
        const res = await apiPostForm<UploadOk>(UPLOAD_URL, fd);
        const fileName = (res as any)?.fileName as string | undefined;
        if (!fileName) throw new Error((res as any)?.message || "Yükleme başarısız.");

        // BE zaten /images/resimler/... döndürüyorsa yeniden prefixleme
        if (fileName.startsWith("/images/resimler/")) return fileName;
        return toPublicPath(fileName);
    }

    // Seçilmiş dosyaları (varsa) yükle → URL'leri form'a yaz
    async function uploadIfAny() {
        const u1 = file1 ? await uploadOne(file1) : (form.resim1 ?? "");
        const u2 = file2 ? await uploadOne(file2) : (form.resim2 ?? "");
        return { url1: u1, url2: u2 };
    }

    async function handlePick1(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0] || null;
        setFile1(f);
        if (!f) return;
        try {
            setError(null);
            const url = await uploadOne(f);
            setForm((s) => ({ ...s, resim1: url }));
        } catch (er: any) {
            setError(er?.message || "Resim 1 yüklenemedi");
        }
    }

    async function handlePick2(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0] || null;
        setFile2(f);
        if (!f) return;
        try {
            setError(null);
            const url = await uploadOne(f);
            setForm((s) => ({ ...s, resim2: url }));
        } catch (er: any) {
            setError(er?.message || "Resim 2 yüklenemedi");
        }
    }

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSaving(true);

        try {
            // 1) resim URL'lerini hazırla (dosya seçildiyse yüklenir)
            const { url1, url2 } = await uploadIfAny();

            // 2) alanlar & tarih formatı
            const baslik = (form.baslik || "").trim();
            const aciklama = (form.aciklama || "").trim();
            const kategoriIdNum = Number(form.kategoriId);

            if (!baslik) throw new Error("Başlık zorunlu.");
            if (!Number.isFinite(kategoriIdNum)) throw new Error("Geçerli bir kategori seçiniz.");
            if (!form.tarih) throw new Error("Tarih zorunlu.");

            const raw = form.tarih.trim();
            let tarih = raw;
            const dot = raw.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
            if (dot) tarih = `${dot[3]}-${dot[2]}-${dot[1]}`;
            if (!/^\d{4}-\d{2}-\d{2}$/.test(tarih)) tarih = raw.split("T")[0];
            if (!/^\d{4}-\d{2}-\d{2}$/.test(tarih)) throw new Error("Tarih 'yyyy-MM-dd' olmalı.");

            // 3) resim alanlarını boş bırakma
            const safeResim1 = (url1 || "").trim();
            const safeResim2 = (url2 || safeResim1 || "").trim();

            // 4) POST payload (backend'in kullandığı isimlendirme ile)
            const payload = {
                baslik,
                aciklama,
                tarih,
                resim1: safeResim1, // <-- /images/resimler/<dosyaAdı>
                resim2: safeResim2, // <-- /images/resimler/<dosyaAdı>
                kategoriId: kategoriIdNum,
            };

            await apiPost("/api/haberler/create", payload);

            navigate("..", { replace: true, relative: "path" });
        } catch (err: any) {
            const raw = err?.response?.data;
            const msg =
                (typeof raw === "string" && raw) ||
                raw?.message ||
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
                className="mx-auto max-w-3xl bg-white rounded-2xl p-6 shadow-md ring-1 ring-slate-200/70"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        className={inputCls + " md:col-span-2"}
                        value={form.kategoriId ?? ""}
                        required
                        disabled={loadingCats}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                kategoriId: e.target.value ? Number(e.target.value) : null,
                            })
                        }
                    >
                        <option value="">
                            {loadingCats ? "Kategoriler yükleniyor…" : "— Kategori Seç —"}
                        </option>
                        {kategoriler.map((k) => (
                            <option key={k.id} value={k.id}>
                                {k.ad}
                            </option>
                        ))}
                    </select>

                    {/* Resim 1 */}
                    <div className="md:col-span-1">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-700">Resim 1</span>
                            <button
                                type="button"
                                onClick={() => file1Ref.current?.click()}
                                className="text-xs px-2 py-1 rounded-md ring-1 ring-slate-200 hover:bg-slate-50"
                            >
                                Dosya Seç
                            </button>
                        </div>
                        <input
                            ref={file1Ref}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handlePick1}
                        />
                        <div className="aspect-video rounded-xl ring-1 ring-slate-200 overflow-hidden flex items-center justify-center bg-slate-50">
                            {preview1 ? (
                                <img src={preview1} alt="resim1" className="h-full w-full object-cover" />
                            ) : (
                                <span className="text-slate-400 text-sm">Önizleme yok</span>
                            )}
                        </div>
                        <input
                            type="text"
                            readOnly
                            className={inputCls + " mt-2 w-full"}
                            value={form.resim1 ?? ""}
                            placeholder="/images/resimler/..."
                        />
                    </div>

                    {/* Resim 2 */}
                    <div className="md:col-span-1">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-700">Resim 2</span>
                            <button
                                type="button"
                                onClick={() => file2Ref.current?.click()}
                                className="text-xs px-2 py-1 rounded-md ring-1 ring-slate-200 hover:bg-slate-50"
                            >
                                Dosya Seç
                            </button>
                        </div>
                        <input
                            ref={file2Ref}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handlePick2}
                        />
                        <div className="aspect-video rounded-xl ring-1 ring-slate-200 overflow-hidden flex items-center justify-center bg-slate-50">
                            {preview2 ? (
                                <img src={preview2} alt="resim2" className="h-full w-full object-cover" />
                            ) : (
                                <span className="text-slate-400 text-sm">Önizleme yok</span>
                            )}
                        </div>
                        <input
                            type="text"
                            readOnly
                            className={inputCls + " mt-2 w-full"}
                            value={form.resim2 ?? ""}
                            placeholder="/images/resimler/..."
                        />
                    </div>

                    <textarea
                        placeholder="Açıklama / İçerik"
                        rows={4}
                        className={inputCls + " md:col-span-2"}
                        value={form.aciklama}
                        onChange={(e) => setForm({ ...form, aciklama: e.target.value })}
                    />
                </div>

                <div className="flex gap-3 mt-5">
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-sky-600 shadow-lg disabled:opacity-60"
                    >
                        {saving ? "Kaydediliyor..." : "Kaydet"}
                    </button>
                </div>
            </form>
        </div>
    );
}
