import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiGet, apiDelete } from "../../services/apiService";
import { Mail, MoreVertical } from "lucide-react";

type MudurlukBE = {
    id?: number;
    name: string;
    managerName: string;
    email: string;
    imageUrl?: string;
    [key: string]: any;
};

type MudurlukUI = {
    id?: number;
    MUDURLUKISIM: string;
    AD: string;
    EMAIL: string;
    IMG_URL?: string;
    __raw?: MudurlukBE;
};

const inputCls =
    "rounded-lg px-3 py-2 bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500/60 outline-none";

const API_BASE = "/rest/api/mudurlukler";
const API_LIST = `${API_BASE}/list`;
const API_DELETE_ONE = (id: number) => `${API_BASE}/delete/${id}`;

const mapToUI = (r: MudurlukBE): MudurlukUI => ({
    id: r.id,
    MUDURLUKISIM: r.name ?? "",
    AD: r.managerName ?? "",
    EMAIL: r.email ?? "",
    IMG_URL: r.imageUrl ?? "",
    __raw: r,
});

const toArray = (d: any): MudurlukBE[] => {
    if (Array.isArray(d)) return d;
    if (Array.isArray(d?.content)) return d.content;
    if (Array.isArray(d?.data)) return d.data;
    return [];
};

export default function KurumsalMudurluklerPage() {
    const nav = useNavigate();
    const [items, setItems] = useState<MudurlukUI[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);
    const [q, setQ] = useState("");
    const [selected, setSelected] = useState<number[]>([]);
    const [openMenu, setOpenMenu] = useState<number | null>(null); // combobox

    const fetchData = async () => {
        setError(null);
        setLoading(true);
        try {
            const res = await apiGet<any>(API_LIST);
            setItems(toArray(res).map(mapToUI));
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "Liste yüklenemedi";
            setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => { fetchData(); }, []);

    useEffect(() => {
        const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpenMenu(null);
        window.addEventListener("keydown", onEsc);
        return () => window.removeEventListener("keydown", onEsc);
    }, []);

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

    const bulkDelete = async () => {
        if (selected.length === 0) return;
        if (!confirm(`${selected.length} kayıt silinsin mi?`)) return;
        setPending(true);
        try {
            await Promise.all(selected.map((id) => apiDelete<boolean>(API_DELETE_ONE(id))));
            setItems((prev) => prev.filter((e) => !selected.includes(e.id!)));
            setSelected([]);
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "Silme hatası";
            setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
        } finally { setPending(false); }
    };

    if (loading) return <div className="p-6">Yükleniyor…</div>;

    return (
        <div className="space-y-5">
            <h1 className="text-2xl font-semibold text-slate-800">Müdürlükler</h1>

            <div className="bg-white rounded-2xl shadow-md ring-1 ring-slate-200/60 overflow-hidden">
                <div className="p-4 border-b">
                    <div className="grid gap-3 md:grid-cols-[1fr,auto] md:items-center">
                        <div className="grid gap-3 md:grid-cols-2">
                            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="İsim / E-posta ara…" className={inputCls} />
                            <button onClick={() => setQ("")} className="rounded-lg px-3 py-2 ring-1 ring-slate-200 hover:bg-slate-50">Temizle</button>
                        </div>
                        <div className="flex items-center gap-2 justify-end">
                            {selected.length > 0 && (
                                <button onClick={bulkDelete} disabled={pending} className="px-3 py-2 rounded-lg bg-red-500 text-white disabled:opacity-60">Sil</button>
                            )}
                            <Link
                                to="yeni"
                                className="px-3 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-sky-600 shadow-lg"
                            >
                                + Ekle
                            </Link>
                        </div>
                    </div>
                    {error && <div className="mt-3 text-red-600 bg-red-50 rounded-lg px-4 py-2 ring-1 ring-red-200">{error}</div>}
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-slate-50 text-slate-700">
                        <tr className="text-left">
                            <th className="px-4 py-3 w-10"></th>
                            <th className="px-4 py-3 w-28">Resim</th>
                            <th className="px-4 py-3">Müdürlük</th>
                            <th className="px-4 py-3">Yönetici</th>
                            <th className="px-4 py-3">E-posta</th>
                            <th className="px-4 py-3 w-40">İşlemler</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                        {filtered.length === 0 ? (
                            <tr><td colSpan={6} className="px-4 py-6 text-center text-slate-500">Kayıt bulunamadı.</td></tr>
                        ) : filtered.map((e) => (
                            <tr key={e.id} className="hover:bg-slate-50/60">
                                <td className="px-4 py-3 align-top">
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(e.id!)}
                                        onChange={() =>
                                            setSelected((p) => p.includes(e.id!) ? p.filter((x) => x !== e.id!) : [...p, e.id!])
                                        }
                                    />
                                </td>
                                <td className="px-4 py-3 align-top">
                                    {e.IMG_URL ? (
                                        <img
                                            src={e.IMG_URL}
                                            alt={e.AD}
                                            className="w-16 h-16 object-cover rounded-full ring-1 ring-slate-200"
                                            onError={(ev) => ((ev.currentTarget as HTMLImageElement).src = "/images/placeholder-avatar.jpg")}
                                        />
                                    ) : <div className="w-16 h-16 rounded-full bg-slate-100 ring-1 ring-slate-200" />}
                                </td>
                                <td className="px-4 py-3 font-medium text-slate-800 align-top">{e.MUDURLUKISIM}</td>
                                <td className="px-4 py-3 text-slate-600 align-top">{e.AD}</td>
                                <td className="px-4 py-3 text-slate-600 align-top">
                                    {e.EMAIL ? (
                                        <div className="flex items-start gap-1 text-slate-600">
                                            <Mail size={12} className="mt-0.5" />
                                            <a href={`mailto:${e.EMAIL}`} className="text-sm break-all hover:underline">{e.EMAIL}</a>
                                        </div>
                                    ) : <span className="text-slate-400 text-sm">-</span>}
                                </td>

                                {/* İŞLEMLER COMBOBOX — eski görünüm (tek düğme, açılır menü) */}
                                <td className="px-4 py-3 align-top relative">
                                    <button
                                        className="px-3 py-1.5 rounded-lg ring-1 ring-slate-200 hover:bg-slate-50 inline-flex items-center gap-1"
                                        onClick={() => setOpenMenu(openMenu === e.id ? null : e.id!)}
                                        type="button"
                                    >
                                        📝 ▾
                                    </button>

                                    {openMenu === e.id && (
                                        <div
                                            className="absolute z-10 mt-2 w-36 rounded-lg border border-slate-200 bg-white shadow-lg"
                                            onMouseLeave={() => setOpenMenu(null)}
                                        >
                                            <Link
                                                to={`duzenle/${e.id}`}
                                                className="block w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50"
                                                onClick={() => setOpenMenu(null)}
                                                state={{}} // tam sayfa
                                            >
                                                Güncelle
                                            </Link>
                                            <button
                                                className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50"
                                                onClick={async () => {
                                                    setOpenMenu(null);
                                                    if (!confirm("Bu kaydı silmek istiyor musun?")) return;
                                                    await apiDelete<boolean>(API_DELETE_ONE(e.id!));
                                                    setItems((prev) => prev.filter((x) => x.id !== e.id));
                                                    setSelected((prev) => prev.filter((x) => x !== e.id));
                                                }}
                                            >
                                                Sil
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
