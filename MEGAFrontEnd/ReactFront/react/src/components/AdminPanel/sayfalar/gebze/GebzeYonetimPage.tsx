// src/sayfalar/kurumsal/GebzeYonetimPage.tsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet, apiDelete } from "../../services/apiService";
import { Mail, Phone } from "lucide-react";

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

const API_BASE = "/api/muhtarlar";
const API_LIST = `${API_BASE}`;
const API_DELETE_ONE = (id: number) => `${API_BASE}/delete/${id}`;

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
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        addressOrCoords
    )}`;
}

export default function GebzeYonetimPage() {
    const [items, setItems] = useState<MuhtarUI[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    const [q, setQ] = useState("");
    const [selected, setSelected] = useState<number[]>([]);
    const [actionOpen, setActionOpen] = useState<number | null>(null);

    useEffect(() => {
        (async () => {
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
        })();
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

    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest("[data-row-menu-root]")) setActionOpen(null);
        };
        document.addEventListener("click", onDocClick);
        return () => document.removeEventListener("click", onDocClick);
    }, []);

    if (loading) return <div className="p-6">Yükleniyor…</div>;

    return (
        <div className="space-y-5">
            <h1 className="text-2xl font-semibold text-slate-800">Muhtarlar</h1>

            <div className="bg-white rounded-2xl shadow-md ring-1 ring-slate-200/60 overflow-hidden flex flex-col">
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
                                <button
                                    onClick={() => setQ("")}
                                    className="rounded-lg px-3 py-2 ring-1 ring-slate-200 hover:bg-slate-50"
                                >
                                    Temizle
                                </button>
                            </div>
                            <div className="flex items-center gap-2 justify-end">
                                {selected.length > 0 && (
                                    <button
                                        onClick={bulkDelete}
                                        disabled={pending}
                                        className="px-3 py-2 rounded-lg bg-red-500 text-white disabled:opacity-60"
                                    >
                                        Sil
                                    </button>
                                )}

                                {/* POPUP: Yeni */}
                                <Link
                                    to="yeni"
                                    state={{ overlay: true }}
                                    className="px-3 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-sky-600 shadow-lg shadow-blue-500/20 hover:brightness-110"
                                >
                                    + Ekle
                                </Link>
                            </div>
                        </div>
                        {error && (
                            <div className="mt-3 text-red-600 bg-red-50 rounded-lg px-4 py-2 ring-1 ring-red-200">
                                {error}
                            </div>
                        )}
                    </div>
                </div>

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
                                                    ((ev.currentTarget as HTMLImageElement).src =
                                                        "/images/placeholder-avatar.jpg")
                                                }
                                            />
                                        )}
                                    </td>
                                    <td className="px-4 py-3 font-medium text-slate-800">
                                        {e.AD} {e.SOYAD}
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">{e.MAHALLE}</td>
                                    <td className="px-4 py-3 text-slate-600">
                                        {e.TELEFON ? (
                                            <div className="flex items-start gap-1 text-slate-600">
                                                <Phone size={12} className="mt-0.5 flex-shrink-0" />
                                                <a
                                                    href={`tel:${e.TELEFON.replace(/[^+\d]/g, "")}`}
                                                    className="text-sm leading-tight hover:underline whitespace-nowrap text-blue-700"
                                                    title={e.TELEFON}
                                                >
                                                    {e.TELEFON}
                                                </a>
                                            </div>
                                        ) : (
                                            <span className="text-slate-400 text-sm">-</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">
                                        {e.EPOSTA ? (
                                            <div className="flex items-start gap-1 text-slate-600">
                                                <Mail size={12} className="mt-0.5 flex-shrink-0" />
                                                <a
                                                    href={`mailto:${e.EPOSTA}`}
                                                    className="text-sm break-all leading-tight hover:underline"
                                                    title={e.EPOSTA}
                                                >
                                                    {e.EPOSTA}
                                                </a>
                                            </div>
                                        ) : (
                                            <span className="text-slate-400 text-sm">-</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">
                                        {e.KONUM ? (
                                            <a
                                                href={toMapsLink(e.KONUM)}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-blue-700"
                                            >
                                                📍Haritada göster
                                            </a>
                                        ) : (
                                            "-"
                                        )}
                                    </td>

                                    {/* İşlemler: açılır menü; Güncelle popup'a gider */}
                                    <td className="px-4 py-3 align-center">
                                        <div className="relative inline-block" data-row-menu-root>
                                            <button
                                                className="px-3 py-1.5 rounded-lg ring-1 ring-slate-200 hover:bg-slate-50"
                                                onClick={() =>
                                                    setActionOpen(actionOpen === e.id ? null : (e.id ?? null))
                                                }
                                            >
                                                📝 ▾
                                            </button>

                                            {actionOpen === e.id && (
                                                <div className="absolute left-0 top-full mt-1 w-32 rounded-md border bg-white shadow-lg z-20">
                                                    <Link
                                                        to={`duzenle/${e.id}`}
                                                        state={{ overlay: true, record: e.__raw }}
                                                        className="block w-full px-3 py-2 text-left hover:bg-slate-50"
                                                        onClick={() => setActionOpen(null)}
                                                    >
                                                        Güncelle
                                                    </Link>
                                                    <button
                                                        className="w-full px-3 py-2 text-left text-red-600 hover:bg-red-50"
                                                        onClick={async () => {
                                                            setActionOpen(null);
                                                            if (!e.id) return;
                                                            if (!confirm("Kayıt silinsin mi?")) return;
                                                            setPending(true);
                                                            try {
                                                                await apiDelete<boolean>(API_DELETE_ONE(e.id));
                                                                setItems((prev) => prev.filter((x) => x.id !== e.id));
                                                                setSelected((prev) => prev.filter((x) => x !== e.id));
                                                            } catch (err: any) {
                                                                alert(
                                                                    err?.response?.data?.message ||
                                                                    err?.message ||
                                                                    "Silme hatası"
                                                                );
                                                            } finally {
                                                                setPending(false);
                                                            }
                                                        }}
                                                    >
                                                        Sil
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
