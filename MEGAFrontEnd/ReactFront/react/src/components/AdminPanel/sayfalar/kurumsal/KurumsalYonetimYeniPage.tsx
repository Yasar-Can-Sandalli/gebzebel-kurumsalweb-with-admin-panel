import { useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPost } from "../../services/apiService";
import { apiPostForm } from "../../services/apiService";

type UploadOk = { success?: boolean; fileName?: string; message?: string };

const UPLOAD_URL = "/api/files/upload";
const CREATE_URL = "/api/kurumsal/yonetim/create";
const toPublicPath = (n: string) => (n.startsWith("/images/resimler/") ? n : `/images/resimler/${n}`);

const input =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/60";
const label = "block text-[13px] font-medium text-slate-700 mb-1";

export default function KurumsalYonetimYeniPage() {
    const nav = useNavigate();

    const [form, setForm] = useState({
        isimSoyisim: "",
        pozisyon: "",
        email: "",
        telefon: "",
        mudurlukler: "",
        resimUrl: "",
        delta: 1 as 1 | 0,
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fileRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const preview = useMemo(() => (file ? URL.createObjectURL(file) : form.resimUrl || ""), [file, form.resimUrl]);

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

    const submit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!form.isimSoyisim.trim() || !form.pozisyon.trim()) {
            setError("İsim Soyisim ve Pozisyon alanları zorunludur.");
            return;
        }
        setSaving(true);
        setError(null);
        try {
            await apiPost(CREATE_URL, { ...form, resimUrl: (form.resimUrl || "").trim() });
            // 🔁 Listeye dönerken “tazele” işareti gönder
            const stamp = Date.now();
            nav(`/panel/kurumsal/yonetim?r=${stamp}`, {
                replace: true,
                state: { refreshId: stamp },
            });
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "Ekleme hatası";
            setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="mx-auto max-w-[1100px]">
            <div className="flex items-center justify-between py-4">
                <div className="min-w-0">
                    <div className="text-xs text-slate-500">Kurumsal • Yönetim</div>
                    <h1 className="text-2xl font-semibold text-slate-800">Sayfayı Oluştur</h1>
                </div>
                <div className="flex gap-2">
                    <Link to="/panel/kurumsal/yonetim" className="rounded-lg px-3 py-2 ring-1 ring-slate-200 hover:bg-slate-50">
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

            {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-red-700">{error}</div>}

            <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-5">
                        <div>
                            <label className={label}>İsim Soyisim *</label>
                            <input className={input} value={form.isimSoyisim} onChange={(e) => setForm({ ...form, isimSoyisim: e.target.value })} />
                        </div>
                        <div>
                            <label className={label}>Pozisyon *</label>
                            <input className={input} value={form.pozisyon} onChange={(e) => setForm({ ...form, pozisyon: e.target.value })} />
                        </div>
                        <div>
                            <label className={label}>E-posta</label>
                            <input type="email" className={input} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                        </div>
                        <div>
                            <label className={label}>Telefon</label>
                            <input className={input} value={form.telefon} onChange={(e) => setForm({ ...form, telefon: e.target.value })} />
                        </div>
                        <div>
                            <label className={label}>Müdürlük(ler)</label>
                            <input className={input} value={form.mudurlukler} onChange={(e) => setForm({ ...form, mudurlukler: e.target.value })} />
                        </div>
                        <div className="flex items-center gap-3">
                            <input id="aktif" type="checkbox" checked={form.delta === 1} onChange={(e) => setForm({ ...form, delta: e.target.checked ? 1 : 0 })} />
                            <label htmlFor="aktif" className="text-sm text-slate-700">Aktif</label>
                        </div>
                    </div>

                    {/* Görsel */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className={label + " mb-0"}>Görsel URL</label>
                            <button type="button" onClick={() => fileRef.current?.click()} className="rounded-md px-3 py-1.5 ring-1 ring-slate-200 hover:bg-slate-50 text-xs">
                                Dosya Seç
                            </button>
                            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPick} />
                        </div>
                        <input className={input} placeholder="/images/resimler/..." value={form.resimUrl} readOnly />
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
                            <div className="aspect-[3/2] w-full overflow-hidden rounded-lg ring-1 ring-slate-200">
                                {preview ? (
                                    <img src={preview} alt="Önizleme" className="h-full w-full object-cover" />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">Önizleme yok</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
