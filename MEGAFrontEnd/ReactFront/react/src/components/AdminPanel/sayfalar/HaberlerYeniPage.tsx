import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createHaber, getAllHaberCategories } from "../services/haberlerService";
import type { HaberCategorySummary } from "../types/haberler";
import { apiPostForm } from "../services/apiService2";

type FormState = {
    haberBaslik: string;
    haberTarih: string;
    haberAciklama: string;
    haberResim1: string;
    haberResim2: string;
    categoryId: number | null;
};

const toPublicPath = (name: string) =>
    name.startsWith("/images/resimler/") ? name : `/images/resimler/${name}`;

export default function HaberYeniPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState<FormState>({
        haberBaslik: "",
        haberTarih: "",
        haberAciklama: "",
        haberResim1: "",
        haberResim2: "",
        categoryId: null,
    });

    const [kategoriler, setKategoriler] = useState<HaberCategorySummary[]>([]);
    const [loadingCats, setLoadingCats] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [uploading1, setUploading1] = useState(false);
    const [uploading2, setUploading2] = useState(false);
    const fileRef1 = useRef<HTMLInputElement>(null);
    const fileRef2 = useRef<HTMLInputElement>(null);

    const [preview1, setPreview1] = useState<string>("");
    const [preview2, setPreview2] = useState<string>("");

    useEffect(() => {
        (async () => {
            try {
                const data = await getAllHaberCategories();
                setKategoriler(data ?? []);
            } catch (e: any) {
                setError(e?.response?.data?.message || e?.message || "Kategoriler yüklenemedi");
            } finally {
                setLoadingCats(false);
            }
        })();
    }, []);

    const inputBase =
        "w-full rounded-lg px-3 py-2 bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500/60 outline-none";
    const card = "rounded-2xl bg-white ring-1 ring-slate-200/70 shadow-md shadow-blue-500/5";

    const uploadOne = async (file: File) => {
        const fd = new FormData();
        fd.append("file", file);
        const res = await apiPostForm<any>("/api/files/upload", fd);
        const fileName = (res as any)?.fileName as string | undefined;
        if (!fileName) throw new Error((res as any)?.message || "Yükleme başarısız");
        return toPublicPath(fileName);
    };

    const onPick1 = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        try {
            setError(null);
            setUploading1(true);
            setPreview1(URL.createObjectURL(f));
            const url = await uploadOne(f);
            setForm((p) => ({ ...p, haberResim1: url }));
        } catch (er: any) {
            setError(er?.message || "Resim 1 yüklenemedi");
            setPreview1("");
        } finally {
            setUploading1(false);
            if (fileRef1.current) fileRef1.current.value = "";
        }
    };

    const onPick2 = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        try {
            setError(null);
            setUploading2(true);
            setPreview2(URL.createObjectURL(f));
            const url = await uploadOne(f);
            setForm((p) => ({ ...p, haberResim2: url }));
        } catch (er: any) {
            setError(er?.message || "Resim 2 yüklenemedi");
            setPreview2("");
        } finally {
            setUploading2(false);
            if (fileRef2.current) fileRef2.current.value = "";
        }
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.categoryId) {
            setError("Lütfen bir kategori seçiniz.");
            return;
        }
        setError(null);
        setSaving(true);
        try {
            await createHaber({ ...form, categoryId: form.categoryId });
            navigate("..", { replace: true, relative: "path" });
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.response?.data || err?.message || "Kaydetme hatası";
            setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
        } finally {
            setSaving(false);
        }
    };

    const ImageCard = ({
                           title,
                           urlValue,
                           preview,
                           busy,
                           onPick,
                           fileRef,
                       }: {
        title: string;
        urlValue: string;
        preview?: string;
        busy: boolean;
        onPick: (e: React.ChangeEvent<HTMLInputElement>) => void;
        fileRef: React.RefObject<HTMLInputElement>;
    }) => (
        <div className={card}>
            <div className="flex items-center justify-between px-4 pt-4">
                <div className="text-sm font-medium text-slate-700">{title}</div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        disabled={busy}
                        className="rounded-md px-3 py-1.5 text-xs ring-1 ring-slate-200 hover:bg-slate-50"
                    >
                        {busy ? "Yükleniyor…" : "Dosya Seç"}
                    </button>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPick} />
                </div>
            </div>

            {/* Preview */}
            <div className="px-4 pb-4">
                <div className="mt-3 overflow-hidden rounded-xl ring-1 ring-slate-200 bg-slate-50">
                    <div className="aspect-video w-full">
                        {preview || urlValue ? (
                            <img
                                src={preview || urlValue}
                                alt="Önizleme"
                                className="h-full w-full object-contain bg-white"
                                onError={(e) => ((e.target as HTMLImageElement).style.visibility = "hidden")}
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                                Önizleme yok
                            </div>
                        )}
                    </div>
                </div>

                {/* URL (readOnly) */}
                <div className="mt-3">
                    <input
                        className={inputBase + " text-sm"}
                        placeholder="/images/resimler/…"
                        value={urlValue}
                        readOnly
                    />
                    <p className="mt-1 text-[11px] text-slate-500">
                        URL otomatik doldurulur. Görseli değiştirmek için tekrar “Dosya Seç”e basın.
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-4">
            {/* Üst bar */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-slate-800">Yeni Haber</h1>
                <Link to=".." relative="path" className="rounded-lg px-3 py-2 ring-1 ring-slate-200 hover:bg-slate-50">
                    Listeye Dön
                </Link>
            </div>

            {error && <div className="text-red-600 bg-red-50 rounded-lg px-4 py-2 ring-1 ring-red-200">{error}</div>}

            <form onSubmit={submit} className={card + " mx-auto max-w-5xl p-5"}>
                {/* Üst 3’lü satır */}
                <div className="grid gap-4 md:grid-cols-3">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Başlık</label>
                        <input
                            type="text"
                            className={inputBase}
                            value={form.haberBaslik}
                            onChange={(e) => setForm({ ...form, haberBaslik: e.target.value })}
                            required
                            placeholder="Haber başlığı"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Tarih</label>
                        <input
                            type="date"
                            className={inputBase}
                            value={form.haberTarih}
                            onChange={(e) => setForm({ ...form, haberTarih: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Kategori</label>
                        <select
                            className={inputBase}
                            value={form.categoryId ?? ""}
                            required
                            disabled={loadingCats}
                            onChange={(e) => setForm({ ...form, categoryId: e.target.value ? Number(e.target.value) : null })}
                        >
                            <option value="">{loadingCats ? "Kategoriler yükleniyor…" : "— Kategori Seç —"}</option>
                            {kategoriler.map((k) => (
                                <option key={k.categoryId} value={k.categoryId}>
                                    {k.categoryName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Görsel Kartları */}
                <div className="mt-5 grid gap-5 lg:grid-cols-2">
                    <ImageCard
                        title="Kapak Görseli (Resim 1)"
                        urlValue={form.haberResim1}
                        preview={preview1}
                        busy={uploading1}
                        onPick={onPick1}
                        fileRef={fileRef1}
                    />

                    <ImageCard
                        title="İçerik Görseli (Resim 2)"
                        urlValue={form.haberResim2}
                        preview={preview2}
                        busy={uploading2}
                        onPick={onPick2}
                        fileRef={fileRef2}
                    />
                </div>

                {/* Açıklama */}
                <div className="mt-5">
                    <label className="mb-1 block text-sm font-medium text-slate-700">Açıklama / İçerik</label>
                    <textarea
                        rows={5}
                        className={inputBase}
                        value={form.haberAciklama}
                        onChange={(e) => setForm({ ...form, haberAciklama: e.target.value })}
                        placeholder="Haberin kısa özeti veya içerik metni…"
                    />
                </div>

                {/* Aksiyonlar */}
                <div className="mt-6 flex items-center gap-3">
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-5 py-2.5 rounded-lg text-white bg-gradient-to-r from-blue-600 to-sky-600 shadow-md disabled:opacity-60"
                    >
                        {saving ? "Kaydediliyor..." : "Kaydet"}
                    </button>

                    <Link
                        to=".."
                        relative="path"
                        className="rounded-lg px-4 py-2 ring-1 ring-slate-200 hover:bg-slate-50 text-slate-700"
                    >
                        İptal
                    </Link>
                </div>
            </form>
        </div>
    );
}
