import { useEffect, useMemo, useState } from "react";
import { apiGet, apiDelete, apiPost, apiPut } from "../../services/apiService";

// Backend modeline uygun tip (entity alan adları)
type MudurlukBE = {
    id?: number;
    name: string;          // MUDURLUKISIM
    managerName: string;   // AD
    email: string;         // EMAIL
    imageUrl?: string;     // IMG_URL
    [key: string]: any;    // ekstra alanlar
};

// UI tipi
type MudurlukUI = {
    id?: number;
    MUDURLUKISIM: string;
    AD: string;
    EMAIL: string;
    IMG_URL?: string;
    __raw?: MudurlukBE; // güncelleme için orijinal
};

const inputCls =
    "rounded-lg px-3 py-2 bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500/60 outline-none";

// Controller base
const API_BASE = "/rest/api/mudurlukler";
const API_LIST = `${API_BASE}/list`;
const API_CREATE = `${API_BASE}/create`;
const API_DELETE_ONE = (id: number) => `${API_BASE}/delete/${id}`;
const API_UPDATE_ONE = (id: number) => `${API_BASE}/update/${id}`;

const mapToUI = (r: MudurlukBE): MudurlukUI => ({
    id: r.id,
    MUDURLUKISIM: r.name ?? "",
    AD: r.managerName ?? "",
    EMAIL: r.email ?? "",
    IMG_URL: r.imageUrl ?? "",
    __raw: r,
});

const toArray = (d: any): MudurlukBE[] => {
    if (Array.isArray(d)) return d as MudurlukBE[];
    if (Array.isArray(d?.content)) return d.content as MudurlukBE[]; // pageable
    if (Array.isArray(d?.data)) return d.data as MudurlukBE[];       // wrapper
    return [];
};

export default function KurumsalMudurluklerPage() {
    const [items, setItems] = useState<MudurlukUI[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);
    const [q, setQ] = useState("");
    const [selected, setSelected] = useState<number[]>([]);

    // Dinamik ekstra alanlar
    const [extraKeys, setExtraKeys] = useState<string[]>([]);

    // Ekle/Düzenle modal
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [creating, setCreating] = useState(false);
    const [form, setForm] = useState<any>({ name: "", managerName: "", email: "", imageUrl: "" });
    const isEmail = (v: string) => !v || v.includes("@");

    const fetchData = async () => {
        setError(null);
        setLoading(true);
        try {
            const res = await apiGet<any>(API_LIST);
            const arrBE = toArray(res);
            // listeden dinamik alanları çıkar
            const keys = new Set<string>();
            if (arrBE[0]) {
                Object.keys(arrBE[0]).forEach((k) => {
                    if (!["id", "name", "managerName", "email", "imageUrl"].includes(k)) keys.add(k);
                });
            }
            setExtraKeys(Array.from(keys));
            setItems(arrBE.map(mapToUI));
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "Liste yüklenemedi";
            setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const filtered = useMemo(() => {
        const term = q.trim().toLowerCase();
        if (!term) return items;
        return items.filter(
            (e) =>
                e.MUDURLUKISIM.toLowerCase().includes(term) ||
                e.AD.toLowerCase().includes(term) ||
                e.EMAIL.toLowerCase().includes(term)
        );
    }, [items, q]);

    const toggleOne = (id: number) =>
        setSelected((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
    const allIds = filtered.map((x) => x.id!).filter(Boolean);
    const allChecked = allIds.length > 0 && allIds.every((id) => selected.includes(id));
    const toggleAll = () =>
        setSelected((p) =>
            allChecked ? p.filter((id) => !allIds.includes(id)) : Array.from(new Set([...p, ...allIds]))
        );

    // TOPLU SİL
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
        } finally { setPending(false); }
    };

    // Modal aç/kapat & preload
    const openAdd = () => {
        const extrasInit = Object.fromEntries(extraKeys.map((k) => [k, ""]));
        setForm({ name: "", managerName: "", email: "", imageUrl: "", ...extrasInit });
        setEditingId(null);
        setAddOpen(true);
    };
    const openEdit = (row: MudurlukUI) => {
        const raw = row.__raw || {};
        const extrasInit: any = {};
        extraKeys.forEach((k) => (extrasInit[k] = raw[k] ?? ""));
        setForm({
            name: raw.name ?? "",
            managerName: raw.managerName ?? "",
            email: raw.email ?? "",
            imageUrl: raw.imageUrl ?? "",
            ...extrasInit,
        });
        setEditingId(row.id ?? null);
        setEditOpen(true);
    };
    const closeModals = () => { setAddOpen(false); setEditOpen(false); setEditingId(null); };

    // CREATE
    const handleCreate = async () => {
        if (!form.name?.trim() || !form.managerName?.trim()) return alert("Müdürlük ismi ve Ad Soyad zorunlu");
        if (form.email && !isEmail(form.email)) return alert("Geçerli bir e-posta girin");
        setCreating(true); setError(null);
        try {
            await apiPost(API_CREATE, form);
            closeModals();
            await fetchData();
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "Ekleme hatası";
            setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
        } finally { setCreating(false); }
    };

    // UPDATE
    const handleUpdate = async () => {
        if (editingId == null) return;
        if (!form.name?.trim() || !form.managerName?.trim()) return alert("Müdürlük ismi ve Ad Soyad zorunlu");
        if (form.email && !isEmail(form.email)) return alert("Geçerli bir e-posta girin");
        setCreating(true); setError(null);
        try {
            await apiPut(API_UPDATE_ONE(editingId), form);
            closeModals();
            await fetchData();
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "Güncelleme hatası";
            setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
        } finally { setCreating(false); }
    };

    if (loading) return <div className="p-6">Yükleniyor…</div>;

    return (
        <div className="space-y-5">
            <h1 className="text-2xl font-semibold text-slate-800">Müdürlükler</h1>

            <div className="bg-white rounded-2xl shadow-md shadow-blue-500/5 ring-1 ring-slate-200/60 overflow-hidden flex flex-col">
                {/* Üst bar */}
                <div className="sticky top-0 z-10 bg-white">
                    <div className="p-4 border-b">
                        <div className="grid gap-3 md:grid-cols-[1fr,auto] md:items-center">
                            <div className="grid gap-3 md:grid-cols-2">
                                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="İsim / E-posta ara…" className={inputCls} />
                                <button onClick={() => setQ("")} className="rounded-lg px-3 py-2 ring-1 ring-slate-200 hover:bg-slate-50">Temizle</button>
                            </div>
                            <div className="flex items-center gap-2 justify-end">
                                <button onClick={bulkDelete} disabled={selected.length === 0 || pending} className="px-3 py-2 rounded-lg bg-red-500 text-white disabled:opacity-60">Sil</button>
                                <button onClick={openAdd} className="px-3 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-sky-600 shadow-lg shadow-blue-500/20 hover:brightness-110">+ Ekle</button>
                            </div>
                        </div>
                        {error && <div className="mt-3 text-red-600 bg-red-50 rounded-lg px-4 py-2 ring-1 ring-red-200">{error}</div>}
                    </div>
                </div>

                {/* Tablo */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-slate-50 text-slate-700">
                        <tr className="text-left">
                            <th className="px-4 py-3 w-10"><input type="checkbox" checked={allChecked} onChange={toggleAll} /></th>
                            <th className="px-4 py-3 w-28">Resim</th>
                            <th className="px-4 py-3">Müdürlük</th>
                            <th className="px-4 py-3">Ad Soyad</th>
                            <th className="px-4 py-3">E-posta</th>
                            <th className="px-4 py-3 w-36">İşlemler</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                        {filtered.length === 0 ? (
                            <tr><td colSpan={6} className="px-4 py-6 text-center text-slate-500">Kayıt bulunamadı.</td></tr>
                        ) : (
                            filtered.map((e) => (
                                <tr key={e.id} className="hover:bg-slate-50/60 transition-colors">
                                    <td className="px-4 py-3 align-top">
                                        {e.id !== undefined && (
                                            <input type="checkbox"
                                                   checked={selected.includes(e.id!)}
                                                   onChange={() => setSelected((p) => (p.includes(e.id!) ? p.filter((x) => x !== e.id!) : [...p, e.id!]))}/>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 align-top">
                                        {e.IMG_URL && (
                                            <img src={e.IMG_URL} alt={e.AD}
                                                 className="w-16 h-16 object-cover rounded-full ring-1 ring-slate-200"
                                                 onError={(ev) => ((ev.currentTarget as HTMLImageElement).src = "/images/placeholder-avatar.jpg")} />
                                        )}
                                    </td>
                                    <td className="px-4 py-3 font-medium text-slate-800 align-top">{e.MUDURLUKISIM}</td>
                                    <td className="px-4 py-3 text-slate-600 align-top">{e.AD}</td>
                                    <td className="px-4 py-3 text-slate-600 align-top"><a className="text-blue-700 underline" href={`mailto:${e.EMAIL}`}>{e.EMAIL}</a></td>
                                    <td className="px-4 py-3 align-top">
                                        <button onClick={() => openEdit(e)} className="px-3 py-1.5 rounded-lg ring-1 ring-slate-200 hover:bg-slate-50">Güncelle</button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* EKLE & DÜZENLE MODAL */}
            {(addOpen || editOpen) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/30" onClick={closeModals} />
                    <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200">
                        <div className="flex items-center justify-between border-b px-5 py-3">
                            <h3 className="text-lg font-semibold">{editingId ? "Müdürlük Düzenle" : "Yeni Müdürlük"}</h3>
                            <button onClick={closeModals} className="rounded-md p-1 hover:bg-slate-100">✕</button>
                        </div>
                        <div className="px-5 py-5 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-slate-600 mb-1">Müdürlük İsmi *</label>
                                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="Örn. Bilgi İşlem" />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-600 mb-1">Ad Soyad *</label>
                                    <input value={form.managerName} onChange={(e) => setForm({ ...form, managerName: e.target.value })} className={inputCls} placeholder="Örn. Ali Veli" />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-600 mb-1">E-posta</label>
                                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} placeholder="ornek@domain.com" />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-600 mb-1">Resim URL</label>
                                    <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className={inputCls} placeholder="/images/personel.jpg" />
                                </div>

                                {extraKeys.map((k) => (
                                    <div key={k} className="md:col-span-1">
                                        <label className="block text-xs text-slate-600 mb-1">{k}</label>
                                        <input value={form[k] ?? ""} onChange={(e) => setForm({ ...form, [k]: e.target.value })} className={inputCls} />
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-2">
                                <button onClick={closeModals} className="rounded-xl px-4 py-2 hover:bg-slate-100">Vazgeç</button>
                                {editingId ? (
                                    <button onClick={handleUpdate} disabled={creating} className="rounded-xl bg-blue-600 px-4 py-2 text-white disabled:opacity-60">
                                        {creating ? "Kaydediliyor…" : "Güncelle"}
                                    </button>
                                ) : (
                                    <button onClick={handleCreate} disabled={creating} className="rounded-xl bg-blue-600 px-4 py-2 text-white disabled:opacity-60">
                                        {creating ? "Kaydediliyor…" : "Kaydet"}
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
