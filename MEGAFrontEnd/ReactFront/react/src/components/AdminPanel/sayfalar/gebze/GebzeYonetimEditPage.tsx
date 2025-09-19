import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPut } from "../../services/apiService";
import { apiPostForm } from "../../services/apiService2";

type Muhtar = {
    id?: number;
    ad: string;
    soyad: string;
    mahalle: string;
    telefon?: string;
    eposta?: string;
    resimUrl?: string;
    konum?: string;
    [k: string]: any;
};

type UploadOk = { success?: boolean; fileName?: string; message?: string };

const API_BASE = "/api/muhtarlar";
const API_LIST = `${API_BASE}`;
const API_GET_V1 = (id: number) => `${API_BASE}/${id}`;
const API_GET_V2 = (id: number) => `${API_BASE}/get/${id}`;
const API_GET_V3 = (id: number) => `${API_BASE}/find/${id}`;
const API_UPDATE = (id: number) => `${API_BASE}/update/${id}`;

const UPLOAD_URL = "/api/files/upload";
const toPublicPath = (name: string) =>
    name.startsWith("/images/resimler/") ? name : `/images/resimler/${name}`;

const input =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/60";
const label = "block text-[13px] font-medium text-slate-700 mb-1";

export default function GebzeYonetimEditPage() {
    const { id } = useParams();
    const nav = useNavigate();
    const { state } = useLocation() as { state?: { record?: Muhtar } };

    const [form, setForm] = useState<Muhtar>({
        ad: "",
        soyad: "",
        mahalle: "",
        telefon: "",
        eposta: "",
        resimUrl: "",
        konum: "",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ---- Kaydı getir (state -> GET fallback’ları -> list fallback) ----
    useEffect(() => {
        (async () => {
            try {
                if (state?.record) {
                    setForm({ ...state.record });
                    return;
                }
                const numId = Number(id);
                const tryFetch = async (p: string) => { try { return await apiGet<Muhtar>(p); } catch { return null; } };
                let data: Muhtar | null = null;
                if (Number.isFinite(numId)) {
                    data = await tryFetch(API_GET_V1(numId)) ||
                        await tryFetch(API_GET_V2(numId)) ||
                        await tryFetch(API_GET_V3(numId));
                }
                if (!data) {
                    const res = await apiGet<any>(API_LIST);
                    const arr: Muhtar[] = Array.isArray(res?.content) ? res.content
                        : Array.isArray(res?.data) ? res.data
                            : Array.isArray(res) ? res : [];
                    data = arr.find((x) => Number(x?.id) === numId) || null;
                }
                if (!data) throw new Error("Kayıt bulunamadı.");
                setForm({ ...data });
            } catch (e: any) {
                setError(e?.response?.data?.message || e?.message || "Kayıt alınamadı");
            } finally {
                setLoading(false);
            }
        })();
    }, [id, state]);

    // ---- Upload ----
    const fileRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const preview = useMemo(
        () => (file ? URL.createObjectURL(file) : form.resimUrl || ""),
        [file, form.resimUrl]
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
            setForm((s) => ({ ...s, resimUrl: url }));
        } catch (er: any) {
            setError(er?.message || "Resim yüklenemedi");
        }
    }

    // ---- Submit ----
    const submit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!id) return;
        setSaving(true);
        setError(null);
        try {
            if (!form.ad?.trim() || !form.soyad?.trim() || !form.mahalle?.trim())
                throw new Error("Ad, Soyad ve Mahalle zorunlu");
            await apiPut(API_UPDATE(Number(id)), {
                ...form,
                resimUrl: (form.resimUrl || "").trim(), // /images/resimler/<ad>
            });
            nav("/panel/gebze/yonetim");
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "Güncelleme hatası";
            setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-6">Yükleniyor…</div>;

    return (
        <div className="mx-auto max-w-[1200px]">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                <div className="flex items-center justify-between py-4">
                    <div className="min-w-0">
                        <div className="text-xs text-slate-500">Kurumsal • Gebze Yönetim • ID: {id}</div>
                        <h1 className="text-2xl font-semibold text-slate-800">Sayfayı Düzenle</h1>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            to="/panel/kurumsal/gebze-yonetim"
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
                            <label className={label}>Ad *</label>
                            <input className={input} value={form.ad || ""}
                                   onChange={(e) => setForm({ ...form, ad: e.target.value })}/>
                        </div>
                        <div>
                            <label className={label}>Soyad *</label>
                            <input className={input} value={form.soyad || ""}
                                   onChange={(e) => setForm({ ...form, soyad: e.target.value })}/>
                        </div>
                        <div>
                            <label className={label}>Mahalle *</label>
                            <input className={input} value={form.mahalle || ""}
                                   onChange={(e) => setForm({ ...form, mahalle: e.target.value })}/>
                        </div>
                        <div>
                            <label className={label}>Telefon</label>
                            <input className={input} value={form.telefon || ""}
                                   onChange={(e) => setForm({ ...form, telefon: e.target.value })}/>
                        </div>
                        <div>
                            <label className={label}>E-posta</label>
                            <input type="email" className={input} value={form.eposta || ""}
                                   onChange={(e) => setForm({ ...form, eposta: e.target.value })}/>
                        </div>
                        <div>
                            <label className={label}>Konum (adres veya “41.0,29.0”)</label>
                            <input className={input} value={form.konum || ""}
                                   onChange={(e) => setForm({ ...form, konum: e.target.value })}/>
                        </div>
                    </div>

                    {/* Sağ sütun – Görsel URL + Önizleme */}
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
                            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPick}/>
                        </div>

                        <input
                            className={input}
                            placeholder="/images/resimler/..."
                            value={form.resimUrl || ""}
                            onChange={(e) => setForm({ ...form, resimUrl: e.target.value })}
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
