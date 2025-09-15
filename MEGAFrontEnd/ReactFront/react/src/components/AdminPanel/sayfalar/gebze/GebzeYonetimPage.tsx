import { useEffect, useMemo, useState, useRef } from "react";
import { apiGet, apiDelete, apiPost, apiPut } from "../../services/apiService";

// --- Backend tipi ---
type MuhtarBE = {
    id?: number;
    ad: string;
    soyad: string;
    mahalle: string;
    telefon?: string;
    eposta?: string;
    resimUrl?: string;
    konum?: string;
};

// --- UI tipi ---
interface MuhtarUI {
    id?: number;
    AD: string;
    SOYAD: string;
    MAHALLE: string;
    TELEFON?: string;
    EPOSTA?: string;
    RESIM_URL?: string;
    KONUM?: string;
    __raw?: MuhtarBE;
}

const inputCls =
    "rounded-lg px-3 py-2 bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500/60 outline-none";

// --- API endpoints ---
const API_BASE = "/api/muhtarlar";
const API_LIST = `${API_BASE}`;
const API_CREATE = `${API_BASE}/create`;
const API_DELETE_ONE = (id: number) => `${API_BASE}/delete/${id}`;
const API_UPDATE_ONE = (id: number) => `${API_BASE}/update/${id}`;

// --- helpers ---
const mapToUI = (r: MuhtarBE): MuhtarUI => ({
    id: r.id,
    AD: r.ad ?? "",
    SOYAD: r.soyad ?? "",
    MAHALLE: r.mahalle ?? "",
    TELEFON: r.telefon ?? "",
    EPOSTA: r.eposta ?? "",
    RESIM_URL: r.resimUrl ?? "",
    KONUM: r.konum ?? "",
    __raw: r,
});

const toArray = (d: any): MuhtarBE[] => {
    if (Array.isArray(d)) return d as MuhtarBE[];
    if (Array.isArray(d?.content)) return d.content as MuhtarBE[];
    if (Array.isArray(d?.data)) return d.data as MuhtarBE[];
    return [];
};

function toMapsLink(addressOrCoords?: string) {
    if (!addressOrCoords) return undefined;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressOrCoords)}`;
}

export default function KurumsalMuhtarlarPage() {
    const [items, setItems] = useState<MuhtarUI[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    const [q, setQ] = useState("");
    const [selected, setSelected] = useState<number[]>([]);

    // Ekle / Düzenle modal state
    const [modalOpen, setModalOpen] = useState<"add" | "edit" | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState<MuhtarBE>({
        ad: "",
        soyad: "",
        mahalle: "",
        telefon: "",
        eposta: "",
        resimUrl: "",
        konum: "",
    });
    const [actionOpen, setActionOpen] = useState<number | null>(null);

    // file upload state & refs
    const [uploading, setUploading] = useState(false);
    const fileInputId = "muhtar-image-input";

    const fetchData = async () => {
        setError(null);
        setLoading(true);
        try {
            const res = await apiGet<any>(API_LIST);
            const arrBE = toArray(res);
            setItems(arrBE.map(mapToUI));
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "Liste yüklenemedi";
            setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filtered = useMemo(() => {
        const term = q.trim().toLowerCase();
        if (!term) return items;
        return items.filter(
            (e) =>
                e.AD.toLowerCase().includes(term) ||
                e.SOYAD.toLowerCase().includes(term) ||
                e.MAHALLE.toLowerCase().includes(term) ||
                e.EPOSTA?.toLowerCase().includes(term) ||
                e.TELEFON?.toLowerCase().includes(term)
        );
    }, [items, q]);

    const allIds = filtered.map((x) => x.id!).filter(Boolean);
    const allChecked = allIds.length > 0 && allIds.every((id) => selected.includes(id));
    const toggleAll = () =>
        setSelected((p) =>
            allChecked ? p.filter((id) => !allIds.includes(id)) : Array.from(new Set([...p, ...allIds]))
        );
    const toggleOne = (id: number) =>
        setSelected((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

    // --- CRUD ---
    const openAdd = () => {
        setForm({ ad: "", soyad: "", mahalle: "", telefon: "", eposta: "", resimUrl: "", konum: "" });
        setEditingId(null);
        setModalOpen("add");
    };
    const openEdit = (row: MuhtarUI) => {
        const raw = row.__raw || {};
        setForm({
            ad: raw.ad ?? row.AD ?? "",
            soyad: raw.soyad ?? row.SOYAD ?? "",
            mahalle: raw.mahalle ?? row.MAHALLE ?? "",
            telefon: raw.telefon ?? row.TELEFON ?? "",
            eposta: raw.eposta ?? row.EPOSTA ?? "",
            resimUrl: raw.resimUrl ?? row.RESIM_URL ?? "",
            konum: raw.konum ?? row.KONUM ?? "",
        });
        setEditingId(row.id ?? null);
        setModalOpen("edit");
    };
    const closeModal = () => {
        setModalOpen(null);
        setEditingId(null);
    };

    const validate = () => {
        if (!form.ad?.trim() || !form.soyad?.trim()) return "Ad ve Soyad zorunludur";
        if (!form.mahalle?.trim()) return "Mahalle zorunludur";
        if (form.eposta && !form.eposta.includes("@")) return "Geçerli bir e-posta girin";
        return null;
    };

    const handleCreate = async () => {
        const v = validate();
        if (v) return alert(v);
        setPending(true);
        setError(null);
        try {
            await apiPost(API_CREATE, form);
            closeModal();
            await fetchData();
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "Ekleme hatası";
            setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
        } finally {
            setPending(false);
        }
    };

    const handleUpdate = async () => {
        if (editingId == null) return;
        const v = validate();
        if (v) return alert(v);
        setPending(true);
        setError(null);
        try {
            await apiPut(API_UPDATE_ONE(editingId), form);
            closeModal();
            await fetchData();
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "Güncelleme hatası";
            setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
        } finally {
            setPending(false);
        }
    };

    const deleteOne = async (id: number) => {
        if (!confirm("Kayıt silinsin mi?")) return;
        setPending(true);
        try {
            await apiDelete<boolean>(API_DELETE_ONE(id));
            await fetchData();
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "Silme hatası";
            setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
        } finally {
            setPending(false);
            setActionOpen(null);
        }
    };

    const bulkDelete = async () => {
        if (selected.length === 0) return;
        if (!confirm(`${selected.length} kayıt silinsin mi?`)) return;
        setPending(true);
        setError(null);
        try {
            await Promise.all(selected.map((id) => apiDelete<boolean>(API_DELETE_ONE(id))));
            setItems((prev) => prev.filter((e) => !selected.includes(e.id!)));
            setSelected([]);
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "Silme hatası";
            setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
        } finally {
            setPending(false);
        }
    };

    // upload helper (FormData POST -> url döner beklentisi)
    async function uploadImage(file: File): Promise<string> {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        if (!res.ok) throw new Error("Görsel yüklenemedi");
        const data = await res.json();
        return data.url || data.path || data.location; // backend'e göre ayarla
    }

    if (loading) return <div className="p-6">Yükleniyor…</div>;

    return (
        <div className="space-y-5">
            <h1 className="text-2xl font-semibold text-slate-800">Muhtarlar</h1>

            <div className="bg-white rounded-2xl shadow-md ring-1 ring-slate-200/60 overflow-hidden flex flex-col">
                {/* Üst bar */}
                <div className="sticky top-0 z-10 bg-white">
                    <div className="p-4 border-b">
                        <div className="grid gap-3 md:grid-cols-[1fr,auto] md:items-center">
                            <div className="grid gap-3 md:grid-cols-2">
                                <input
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    placeholder="Ad / Soyad / Mahalle ara…"
                                    className={inputCls}
                                />
                                <button onClick={() => setQ("")} className="rounded-lg px-3 py-2 ring-1 ring-slate-200 hover:bg-slate-50">
                                    Temizle
                                </button>
                            </div>
                            <div className="flex items-center gap-2 justify-end">
                                {/* Sil butonu: yalnızca seçim olduğunda göster */}
                                {selected.length > 0 && (
                                    <button
                                        onClick={bulkDelete}
                                        disabled={pending}
                                        className="px-3 py-2 rounded-lg bg-red-500 text-white disabled:opacity-60"
                                    >
                                        Sil
                                    </button>
                                )}
                                <button
                                    onClick={openAdd}
                                    className="px-3 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-sky-600 shadow-lg shadow-blue-500/20 hover:brightness-110"
                                >
                                    + Ekle
                                </button>
                            </div>
                        </div>
                        {error && (
                            <div className="mt-3 text-red-600 bg-red-50 rounded-lg px-4 py-2 ring-1 ring-red-200">{error}</div>
                        )}
                    </div>
                </div>

                {/* Tablo */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-slate-50 text-slate-700">
                        <tr className="text-left">
                            <th className="px-4 py-3 w-10">
                                <input type="checkbox" checked={allChecked} onChange={toggleAll} />
                            </th>
                            <th className="px-4 py-3 w-28">Resim</th>
                            <th className="px-4 py-3">Ad Soyad</th>
                            <th className="px-4 py-3">Mahalle</th>
                            <th className="px-4 py-3">Telefon</th>
                            <th className="px-4 py-3">E-posta</th>
                            <th className="px-4 py-3">Konum</th>
                            <th className="px-4 py-3 w-36">İşlemler</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="px-4 py-6 text-center text-slate-500">
                                    Kayıt bulunamadı.
                                </td>
                            </tr>
                        ) : (
                            filtered.map((e) => (
                                <tr key={e.id} className="hover:bg-slate-50/60 transition-colors">
                                    <td className="px-4 py-3">
                                        {e.id !== undefined && (
                                            <input
                                                type="checkbox"
                                                checked={selected.includes(e.id!)}
                                                onChange={() => toggleOne(e.id!)}
                                            />
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        {e.RESIM_URL && (
                                            <img
                                                src={e.RESIM_URL}
                                                alt={`${e.AD} ${e.SOYAD}`}
                                                className="w-16 h-16 object-cover rounded-full ring-1 ring-slate-200"
                                                onError={(ev) =>
                                                    ((ev.currentTarget as HTMLImageElement).src = "/images/placeholder-avatar.jpg")
                                                }
                                            />
                                        )}
                                    </td>
                                    <td className="px-4 py-3 font-medium text-slate-800">
                                        {e.AD} {e.SOYAD}
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">{e.MAHALLE}</td>
                                    <td className="px-4 py-3 text-slate-600">{e.TELEFON || "-"}</td>
                                    <td className="px-4 py-3 text-slate-600">
                                        {e.EPOSTA ? (
                                            <a className="text-blue-700 underline" href={`mailto:${e.EPOSTA}`}>
                                                {e.EPOSTA}
                                            </a>
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">
                                        {e.KONUM ? (
                                            <a
                                                href={toMapsLink(e.KONUM)}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-blue-700 underline"
                                            >
                                                Haritada Aç
                                            </a>
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                    <td className="px-4 py-3 relative">
                                        {/* İşlemler kombosu */}
                                        <button
                                            className="px-3 py-1.5 rounded-lg ring-1 ring-slate-200 hover:bg-slate-50"
                                            onClick={() => setActionOpen(actionOpen === e.id ? null : (e.id ?? null))}
                                        >
                                            İşlemler ▾
                                        </button>
                                        {actionOpen === e.id && (
                                            <div className="absolute right-4 top-full mt-2 w-40 bg-white rounded-xl shadow-lg ring-1 ring-slate-200 z-20">
                                                <button
                                                    className="block w-full text-left px-3 py-2 hover:bg-slate-50"
                                                    onClick={() => {
                                                        setActionOpen(null);
                                                        openEdit(e);
                                                    }}
                                                >
                                                    Güncelle
                                                </button>
                                                <button
                                                    className="block w-full text-left px-3 py-2 text-red-600 hover:bg-slate-50"
                                                    onClick={() => deleteOne(e.id!)}
                                                >
                                                    Sil
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* EKLE & DÜZENLE MODAL */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/30" onClick={closeModal} />
                    <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200">
                        <div className="flex items-center justify-between border-b px-5 py-3">
                            <h3 className="text-lg font-semibold">{modalOpen === "edit" ? "Muhtar Düzenle" : "Yeni Muhtar"}</h3>
                            <button onClick={closeModal} className="rounded-md p-1 hover:bg-slate-100">✕</button>
                        </div>
                        <div className="px-5 py-5 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-slate-600 mb-1">Ad *</label>
                                    <input value={form.ad} onChange={(e) => setForm({ ...form, ad: e.target.value })} className={inputCls} />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-600 mb-1">Soyad *</label>
                                    <input value={form.soyad} onChange={(e) => setForm({ ...form, soyad: e.target.value })} className={inputCls} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs text-slate-600 mb-1">Mahalle *</label>
                                    <input value={form.mahalle} onChange={(e) => setForm({ ...form, mahalle: e.target.value })} className={inputCls} />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-600 mb-1">Telefon</label>
                                    <input value={form.telefon ?? ""} onChange={(e) => setForm({ ...form, telefon: e.target.value })} className={inputCls} />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-600 mb-1">E-posta</label>
                                    <input type="email" value={form.eposta ?? ""} onChange={(e) => setForm({ ...form, eposta: e.target.value })} className={inputCls} />
                                </div>

                                {/* Görsel seçimi: file picker + önizleme */}
                                <div className="md:col-span-2">
                                    <label className="block text-xs text-slate-600 mb-1">Resim</label>
                                    <div className="flex items-center gap-3">
                                        {form.resimUrl && (
                                            <img src={form.resimUrl} alt="preview" className="w-14 h-14 rounded-full object-cover ring-1 ring-slate-200" />
                                        )}
                                        <input id={fileInputId} type="file" accept="image/*" className="hidden" onChange={async (e) => {
                                            const f = e.target.files?.[0];
                                            if (!f) return;
                                            try {
                                                setUploading(true);
                                                const url = await uploadImage(f);
                                                setForm((p) => ({ ...p, resimUrl: url }));
                                            } catch (er) {
                                                alert("Görsel yüklenemedi. Lütfen tekrar deneyin.");
                                            } finally {
                                                setUploading(false);
                                            }
                                        }} />
                                        <button type="button" onClick={() => document.getElementById(fileInputId)?.click()} className="rounded-lg px-3 py-2 ring-1 ring-slate-200 hover:bg-slate-50">
                                            {uploading ? "Yükleniyor…" : (form.resimUrl ? "Değiştir" : "Resim Seç")}
                                        </button>
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-xs text-slate-600 mb-1">Konum (adres veya "41.0,29.0")</label>
                                    <input value={form.konum ?? ""} onChange={(e) => setForm({ ...form, konum: e.target.value })} className={inputCls} />
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-2">
                                <button onClick={closeModal} className="rounded-xl px-4 py-2 hover:bg-slate-100">Vazgeç</button>
                                {modalOpen === "edit" ? (
                                    <button onClick={handleUpdate} disabled={pending} className="rounded-xl bg-blue-600 px-4 py-2 text-white disabled:opacity-60">
                                        {pending ? "Kaydediliyor…" : "Güncelle"}
                                    </button>
                                ) : (
                                    <button onClick={handleCreate} disabled={pending} className="rounded-xl bg-blue-600 px-4 py-2 text-white disabled:opacity-60">
                                        {pending ? "Kaydediliyor…" : "Kaydet"}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
