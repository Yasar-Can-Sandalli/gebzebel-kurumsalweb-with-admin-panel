import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { apiGet, apiPut } from "../../services/apiService";
import { apiPostForm } from "../../services/apiService2";

type Mudurluk = { id?: number; name: string; managerName: string; email: string; imageUrl?: string; [k: string]: any };
type UploadOk = { success?: boolean; fileName?: string; message?: string };

const API_BASE = "/rest/api/mudurlukler";
const API_LIST = `${API_BASE}/list`;
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

export default function KurumsalMudurluklerEditPage() {
    const { id } = useParams();
    const nav = useNavigate();
    const { state } = useLocation() as { state?: { record?: Mudurluk } };

    const [form, setForm] = useState<Mudurluk>({ name: "", managerName: "", email: "", imageUrl: "" });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ---- Kaydı getir (state -> get -> list fallback) ----
    useEffect(() => {
        (async () => {
            try {
                setError(null);
                if (state?.record) {
                    setForm({ ...state.record });
                    return;
                }
                const numId = Number(id);
                const tryFetch = async (p: string) => {
                    try { return await apiGet<Mudurluk>(p); } catch { return null; }
                };
                let data: Mudurluk | null = null;
                if (Number.isFinite(numId)) {
                    data = await tryFetch(API_GET_V1(numId)) ||
                        await tryFetch(API_GET_V2(numId)) ||
                        await tryFetch(API_GET_V3(numId));
                }
                if (!data) {
                    const list = (await apiGet<any>(API_LIST)) as any;
                    const arr: Mudurluk[] = Array.isArray(list?.content) ? list.content
                        : Array.isArray(list?.data) ? list.data
                            : Array.isArray(list) ? list : [];
                    data = arr.find((x) => Number(x?.id) === numId) || null;
                }
                if (!data) throw new Error("Kayıt bulunamadı.");
                setForm({ ...data });
            } catch (e: any) {
                setError(e?.response?.data?.message || e?.message || "Kayıt alınamadı");
            } finally { setLoading(false); }
        })();
    }, [id, state]);

    // ---- Upload ----
    const fileRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const preview = useMemo(() => (file ? URL.createObjectURL(file) : form.imageUrl || ""), [file, form.imageUrl]);
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
            setForm((s) => ({ ...s, imageUrl: url }));
        } catch (er: any) {
            setError(er?.message || "Resim yüklenemedi");
        }
    }

    // ---- Submit ----
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        setSaving(true);
        setError(null);
        try {
            if (!form.name?.trim() || !form.managerName?.trim())
                throw new Error("Müdürlük ismi ve Ad Soyad zorunlu");
            await apiPut(API_UPDATE(Number(id)), {
                name: form.name.trim(),
                managerName: form.managerName.trim(),
                email: (form.email || "").trim(),
                imageUrl: (form.imageUrl || "").trim(),
            });
            nav("/panel/kurumsal/mudurlukler");
        } catch (err: any) {
            const msg =
                err?.response?.data?.message || err?.message || "Güncelleme hatası";
            setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
        } finally { setSaving(false); }
    };

    if (loading) return <div className="p-6">Yükleniyor…</div>;

    return (
        <div className="mx-auto max-w-[1200px]">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                <div className="flex items-center justify-between py-4">
                    <div className="min-w-0">
                        <div className="text-xs text-slate-500">Kurumsal • Müdürlük • ID: {id}</div>
                        <h1 className="text-2xl font-semibold text-slate-800">Sayfayı Düzenle</h1>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            to="/panel/kurumsal/mudurlukler"
                            className="rounded-lg px-3 py-2 ring-1 ring-slate-200 hover:bg-slate-50"
                        >
                            İptal
                        </Link>
                        <button
                            onClick={submit}
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
                    {/* Sol */}
                    <div className="space-y-5">
                        <div>
                            <label className={label}>Müdürlük İsmi *</label>
                            <input className={input} value={form.name || ""}
                                   onChange={(e) => setForm({ ...form, name: e.target.value })}/>
                        </div>
                        <div>
                            <label className={label}>Ad Soyad *</label>
                            <input className={input} value={form.managerName || ""}
                                   onChange={(e) => setForm({ ...form, managerName: e.target.value })}/>
                        </div>
                        <div>
                            <label className={label}>E-posta</label>
                            <input type="email" className={input} value={form.email || ""}
                                   onChange={(e) => setForm({ ...form, email: e.target.value })}/>
                        </div>
                    </div>

                    {/* Sağ: Görsel */}
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
                            value={form.imageUrl || ""}
                            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
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
