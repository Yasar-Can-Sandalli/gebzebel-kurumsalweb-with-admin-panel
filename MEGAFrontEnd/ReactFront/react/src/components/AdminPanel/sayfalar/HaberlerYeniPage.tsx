import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createHaber, getAllHaberCategories } from "../services/haberlerService";
import type { HaberCategorySummary } from "../types/haberler";
import { apiPostForm } from "../services/apiService2"; // <- YÜKLEME İÇİN

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

    // --- YÜKLEME DURUMLARI & INPUT REFLERİ ---
    const [uploading1, setUploading1] = useState(false);
    const [uploading2, setUploading2] = useState(false);
    const fileRef1 = useRef<HTMLInputElement>(null);
    const fileRef2 = useRef<HTMLInputElement>(null);

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

    const inputCls =
        "rounded-lg px-3 py-2 bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500/60 outline-none";

    // --- TEK DOSYA YÜKLE ---
    const uploadOne = async (file: File) => {
        const fd = new FormData();
        fd.append("file", file);
        const res = await apiPostForm<any>("/api/files/upload", fd);
        const fileName = (res as any)?.fileName as string | undefined;
        if (!fileName) throw new Error((res as any)?.message || "Yükleme başarısız");
        return toPublicPath(fileName);
    };

    // --- RESİM 1 SEÇ ---
    const onPick1 = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        try {
            setError(null);
            setUploading1(true);
            const url = await uploadOne(f);
            setForm((p) => ({ ...p, haberResim1: url }));
        } catch (er: any) {
            setError(er?.message || "Resim 1 yüklenemedi");
        } finally {
            setUploading1(false);
            if (fileRef1.current) fileRef1.current.value = "";
        }
    };

    // --- RESİM 2 SEÇ ---
    const onPick2 = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        try {
            setError(null);
            setUploading2(true);
            const url = await uploadOne(f);
            setForm((p) => ({ ...p, haberResim2: url }));
        } catch (er: any) {
            setError(er?.message || "Resim 2 yüklenemedi");
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
            await createHaber({
                ...form,
                categoryId: form.categoryId,
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
                    <input
                        type="text"
                        placeholder="Başlık"
                        className={inputCls}
                        value={form.haberBaslik}
                        onChange={(e) => setForm({ ...form, haberBaslik: e.target.value })}
                        required
                    />

                    <input
                        type="date"
                        className={inputCls}
                        value={form.haberTarih}
                        onChange={(e) => setForm({ ...form, haberTarih: e.target.value })}
                        required
                    />

                    <select
                        className={inputCls}
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

                    {/* Resim 1 URL + Dosya Seç */}
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Resim 1 URL"
                            className={inputCls + " flex-1"}
                            value={form.haberResim1}
                            onChange={(e) => setForm({ ...form, haberResim1: e.target.value })}
                        />
                        <button
                            type="button"
                            onClick={() => fileRef1.current?.click()}
                            disabled={uploading1}
                            className="rounded-md px-3 py-2 ring-1 ring-slate-200 hover:bg-slate-50 text-xs"
                        >
                            {uploading1 ? "Yükleniyor…" : "Dosya Seç"}
                        </button>
                        <input ref={fileRef1} type="file" accept="image/*" className="hidden" onChange={onPick1} />
                    </div>

                    {/* Resim 2 URL + Dosya Seç (geniş satırdaki yapıyı bozmayalım diye col-span-2 korundu) */}
                    <div className="flex items-center gap-2 col-span-2">
                        <input
                            type="text"
                            placeholder="Resim 2 URL"
                            className={inputCls + " flex-1"}
                            value={form.haberResim2}
                            onChange={(e) => setForm({ ...form, haberResim2: e.target.value })}
                        />
                        <button
                            type="button"
                            onClick={() => fileRef2.current?.click()}
                            disabled={uploading2}
                            className="rounded-md px-3 py-2 ring-1 ring-slate-200 hover:bg-slate-50 text-xs"
                        >
                            {uploading2 ? "Yükleniyor…" : "Dosya Seç"}
                        </button>
                        <input ref={fileRef2} type="file" accept="image/*" className="hidden" onChange={onPick2} />
                    </div>

                    <textarea
                        placeholder="Açıklama / İçerik"
                        rows={3}
                        className={inputCls + " col-span-2"}
                        value={form.haberAciklama}
                        onChange={(e) => setForm({ ...form, haberAciklama: e.target.value })}
                    />
                </div>

                <div className="flex gap-3 mt-4">
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