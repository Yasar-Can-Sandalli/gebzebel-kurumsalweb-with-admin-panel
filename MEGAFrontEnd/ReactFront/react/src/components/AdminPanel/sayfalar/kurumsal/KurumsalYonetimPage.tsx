import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Loader from "../../../loader.tsx";
import { YonetimRow } from "../../services/pageService.tsx";
import { Search, Mail, Phone, User, X, Check, RefreshCw, Settings } from "lucide-react";
import { apiDelete, apiGet } from "../../services/apiService";

export default function KurumsalYonetimPage() {
    const [rows, setRows] = useState<YonetimRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [rowMenuOpenId, setRowMenuOpenId] = useState<number | null>(null);

    const navigate = useNavigate();
    const location = useLocation();

    const inputCls =
        "w-full rounded-lg px-3 py-2 bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500/60 outline-none";

    const load = async () => {
        setLoading(true);
        setError(null);
        try {
            // 🔁 Liste artık buradan geliyor:
            const d = await apiGet<YonetimRow[]>("/api/kurumsal/baskandanismanlari");
            setRows(Array.isArray(d) ? d : []);
        } catch (e: any) {
            setError(e?.message || "Yönetim listesi alınamadı");
        } finally {
            setLoading(false);
        }
    };

    // İlk yükleme
    useEffect(() => { load(); }, []);

    // 🔁 Sayfaya geri dönüldüğünde / query değiştiğinde tekrar çek
    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.key, location.search, (location.state as any)?.refreshId]);

    const filtered = useMemo(() => {
        const q = search.toLowerCase().trim();
        if (!q) return rows;
        return rows.filter(
            (r) =>
                r.isimSoyisim.toLowerCase().includes(q) ||
                String(r.id).includes(q) ||
                r.pozisyon?.toLowerCase().includes(q) ||
                r.email?.toLowerCase().includes(q) ||
                r.telefon?.includes(q) ||
                r.mudurlukler?.toLowerCase().includes(q)
        );
    }, [rows, search]);

    const toggleRowMenu = (id: number) => setRowMenuOpenId((cur) => (cur === id ? null : id));

    const openEdit = (r: YonetimRow) => {
        navigate(`/panel/kurumsal/yonetim/${r.id}/edit`, {
            state: { ...r, mode: "yonetim", tableName: "kurumsal_yonetim_semasi" },
        });
        setRowMenuOpenId(null);
    };

    const deleteOne = async (id: number) => {
        const rec = rows.find((x) => x.id === id);
        if (!confirm(`${rec?.isimSoyisim || id} kaydını silmek istiyor musunuz?`)) return;
        setError(null);
        try {
            await apiDelete<boolean>(`/api/kurumsal/yonetim/delete/${id}`);
            setRows((prev) => prev.filter((r) => r.id !== id));
            setRowMenuOpenId(null);
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "Silme hatası";
            setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
        }
    };

    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest("[data-row-menu-root]")) setRowMenuOpenId(null);
        };
        document.addEventListener("click", onDocClick);
        return () => document.removeEventListener("click", onDocClick);
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-slate-800">Yönetim</h2>
                <Link
                    to="/panel/kurumsal/yonetim/yeni"
                    className="px-3 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-sky-600 shadow-lg shadow-blue-500/20 hover:brightness-110"
                >
                    + Ekle
                </Link>
            </div>

            {error && <div className="text-red-600 bg-red-50 rounded-lg px-4 py-2 ring-1 ring-red-200">{error}</div>}

            <div className="bg-white rounded-xl p-4 shadow-md shadow-blue-500/5 ring-1 ring-slate-200/60">
                <div className="relative max-w-md">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="İsim, pozisyon, email, telefon ara..."
                        className={inputCls}
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                </div>
                <div className="mt-2 text-xs text-slate-500">{filtered.length} kayıt</div>
            </div>

            {/* Tablo */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-md shadow-blue-500/5 ring-1 ring-slate-200/60">
                <table className="w-full text-base min-w-[1000px]">
                    <thead className="bg-slate-50 text-slate-700">
                    <tr>
                        <th className="px-3 py-4 text-left w-12 font-semibold">ID</th>
                        <th className="px-3 py-4 text-left w-16 font-semibold">Resim</th>
                        <th className="px-3 py-4 text-left w-48 font-semibold">İsim Soyisim</th>
                        <th className="px-3 py-4 text-left w-40 font-semibold">Pozisyon</th>
                        <th className="px-3 py-4 text-left w-48 font-semibold">E-posta</th>
                        <th className="px-3 py-4 text-left w-32 font-semibold">Telefon</th>
                        <th className="px-3 py-4 text-center w-16 font-semibold">Durum</th>
                        <th className="px-3 py-4 text-left w-24 font-semibold">İşlemler</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    {filtered.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-3 py-4 font-mono text-sm text-slate-700 font-medium">{r.id}</td>
                            <td className="px-3 py-4">
                                <div className="w-12 h-12 rounded-lg overflow-hidden ring-1 ring-slate-200 bg-slate-100 flex items-center justify-center">
                                    {r.resimUrl ? (
                                        <img
                                            src={r.resimUrl}
                                            alt={r.isimSoyisim}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                const img = e.currentTarget;
                                                img.style.display = "none";
                                                (img.nextElementSibling as HTMLElement).style.display = "flex";
                                            }}
                                        />
                                    ) : null}
                                    <div
                                        className="w-full h-full hidden items-center justify-center text-slate-400"
                                        style={{ display: r.resimUrl ? "none" : "flex" }}
                                    >
                                        <User size={16} />
                                    </div>
                                </div>
                            </td>
                            <td className="px-3 py-4">
                                <div className="font-semibold text-slate-800 text-sm leading-tight break-words">
                                    {r.isimSoyisim}
                                </div>
                            </td>
                            <td className="px-3 py-4">
                                <div className="font-medium text-slate-700 text-sm leading-tight break-words">
                                    {r.pozisyon}
                                </div>
                            </td>
                            <td className="px-3 py-4">
                                {r.email ? (
                                    <div className="flex items-start gap-1 text-slate-600">
                                        <Mail size={12} className="mt-0.5 flex-shrink-0" />
                                        <span className="text-sm break-all leading-tight">{r.email}</span>
                                    </div>
                                ) : (
                                    <span className="text-slate-400 text-sm">-</span>
                                )}
                            </td>
                            <td className="px-3 py-4">
                                {r.telefon ? (
                                    <div className="flex items-center gap-1 text-slate-600">
                                        <Phone size={12} />
                                        <span className="text-sm">{r.telefon}</span>
                                    </div>
                                ) : (
                                    <span className="text-slate-400 text-sm">-</span>
                                )}
                            </td>
                            <td className="px-3 py-4">
                                <div className="flex items-center justify-center">
                                    {r.delta === 1 ? (
                                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                            <Check className="w-4 h-4 text-white" />
                                        </div>
                                    ) : (
                                        <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                                            <X className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </div>
                            </td>
                            <td className="px-4 py-3 align-center">
                                <div className="relative inline-block" data-row-menu-root>
                                    <button
                                        className="px-3 py-1.5 rounded-lg ring-1 ring-slate-200 hover:bg-slate-50 text-sky-600"
                                        onClick={() => toggleRowMenu(r.id)}
                                        aria-label="İşlemler"
                                    >
                      <span className="relative inline-block h-5 w-5">
                        <RefreshCw className="absolute inset-0 h-5 w-5" strokeWidth={1.5} />
                        <Settings className="absolute inset-0 m-auto h-3.5 w-3.5" strokeWidth={1.5} />
                      </span>
                                    </button>

                                    {rowMenuOpenId === r.id && (
                                        <div className="absolute z-20 mt-1 w-32 rounded-md border bg-white shadow-lg">
                                            <button
                                                className="w-full px-3 py-2 text-left hover:bg-slate-50"
                                                onClick={() => openEdit(r)}
                                            >
                                                Güncelle
                                            </button>
                                            <button
                                                className="w-full px-3 py-2 text-left text-red-600 hover:bg-red-50"
                                                onClick={() => deleteOne(r.id!)}
                                            >
                                                Sil
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}

                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                                <div className="flex flex-col items-center gap-2">
                                    <User size={32} className="text-slate-300" />
                                    <div>Kayıt bulunamadı.</div>
                                </div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
