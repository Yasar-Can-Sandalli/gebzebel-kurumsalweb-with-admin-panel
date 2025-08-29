// components/AdminPanel/sayfalar/sayfaKurumsal.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import AdminLayout from "../_LayoutAdminPanel.tsx";
import { useSearch } from "../context/SearchContext.tsx";
import { useAuthStore } from "../store/authStore.ts";
import { Link, useLocation } from "react-router-dom";
import { Eye, MoreHorizontal, Plus, Trash, Edit } from "lucide-react";
import Loader from "../../loader.tsx";
import { useClickOutside } from "../../useClickOutside.tsx";
import {
    kurumsalService,
    KurumsalRow,
    PageResult as KurumsalPageResult,
    KurumsalTab,
} from "../services/kurumsalService.ts";

// 🔽 YENİ: yönetim listesi buradan gelecek
import {
    fetchYonetimRows,
    YonetimRow,
} from "../services/pageService.tsx";

/* ---- URL'den tab okuma ---- */
const useTab = (): KurumsalTab => {
    const sp = new URLSearchParams(useLocation().search);
    const raw = (sp.get("tab") || "yonetim").toLowerCase();
    if (["vizyon", "vizyon-misyon-ilke", "misyon", "ilkeler", "ilkelerimiz"].includes(raw))
        return "vizyon";
    if (raw === "raporlar") return "raporlar";
    if (raw === "komisyonlar") return "komisyonlar";
    return "yonetim";
};

const TAB_UI: Record<KurumsalTab, { title: string; crumbs: string[]; showAdd?: boolean }> = {
    yonetim: { title: "YÖNETİM", crumbs: ["Kurumsal", "Yönetim"], showAdd: false },
    vizyon: {
        title: "VİZYON MİSYON VE İLKELER",
        crumbs: ["Kurumsal", "Vizyon-Misyon-İlke"],
        showAdd: false,
    },
    raporlar: { title: "RAPORLAR", crumbs: ["Kurumsal", "Raporlar"], showAdd: true },
    komisyonlar: { title: "KOMİSYONLAR", crumbs: ["Kurumsal", "Komisyonlar"], showAdd: true },
};

type StatusFilter = "" | "Yayınlandı" | "Taslak" | "Arşivlendi";

export default function KurumsalPage() {
    const tab = useTab();
    const { title, crumbs, showAdd } = TAB_UI[tab];

    const { hasPermission } = useAuthStore();
    const canView = hasPermission("kurumsal", "goruntuleme");
    const canEdit = hasPermission("kurumsal", "duzenleme");
    const canDelete = hasPermission("kurumsal", "silme");
    const canAdd = hasPermission("kurumsal", "ekleme");

    const { searchQuery, setSearchQuery } = useSearch();

    /** ----------------- Server State: Kurumsal (vizyon/rapor/komisyon) ----------------- */
    const [kData, setKData] = useState<KurumsalPageResult<KurumsalRow> | null>(null);
    const [kLoading, setKLoading] = useState(true);
    const [kError, setKError] = useState<string | null>(null);

    /** Kurumsal liste için sorgu parametreleri */
    const [status, setStatus] = useState<StatusFilter>("");
    const [page, setPage] = useState(1);
    const [size] = useState(20);
    const sort = "updatedAt,desc";

    /** ----------------- Server State: Yönetim (Yönetim Şeması) ----------------- */
    const [yRows, setYRows] = useState<YonetimRow[]>([]);
    const [yLoading, setYLoading] = useState(false);
    const [yError, setYError] = useState<string | null>(null);

    /** ----------------- UI State ----------------- */
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [openAction, setOpenAction] = useState<number | null>(null);
    const actionRef = useRef<HTMLDivElement>(null);
    useClickOutside(actionRef, () => setOpenAction(null));

    /** ----------------- Fetchers ----------------- */
    // Kurumsal sekmeleri
    useEffect(() => {
        if (tab === "yonetim") return;
        let on = true;
        setKLoading(true);
        setKError(null);
        kurumsalService
            .list(tab, { q: searchQuery, status, page, size, sort })
            .then((res) => on && setKData(res))
            .catch((err) => on && setKError(err?.message || "Veri alınamadı"))
            .finally(() => on && setKLoading(false));
        return () => {
            on = false;
        };
    }, [tab, searchQuery, status, page, size]);

    // 🔽 Yönetim sekmesi (KURUMSAL_YONETIM_SEMASI)
    useEffect(() => {
        if (tab !== "yonetim") return;
        let on = true;
        setYLoading(true);
        setYError(null);
        fetchYonetimRows()
            .then((data) => on && setYRows(data))
            .catch((err) => on && setYError(err?.message || "Yönetim listesi alınamadı"))
            .finally(() => on && setYLoading(false));
        return () => {
            on = false;
        };
    }, [tab]);

    /** ----------------- Derived ----------------- */
    const kRows = kData?.content ?? [];

    // Yönetim listesinde arama (İsim/ID)
    const filteredYRows = useMemo(() => {
        if (!searchQuery) return yRows;
        const q = searchQuery.toLowerCase().trim();
        return yRows.filter(
            (r) => r.isimSoyisim.toLowerCase().includes(q) || String(r.id).includes(q)
        );
    }, [yRows, searchQuery]);

    /** ----------------- Selection ----------------- */
    const rowsLength = tab === "yonetim" ? filteredYRows.length : kRows.length;

    const toggleAll = () => {
        if (selectedIds.length === rowsLength) setSelectedIds([]);
        else {
            const ids = tab === "yonetim" ? filteredYRows.map((r) => r.id) : kRows.map((r) => r.id);
            setSelectedIds(ids);
        }
    };
    const toggleOne = (id: number) => {
        setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    };

    /** ----------------- Helpers ----------------- */
    const clearFilters = () => {
        setSearchQuery?.("");
        setStatus("");
        setPage(1);
    };

    // (İstersen yönetim satırı silme/düzenleme aksiyonlarını sonra ekleriz)

    /** ----------------- Loading & Auth Guard ----------------- */
    const loading = tab === "yonetim" ? yLoading : kLoading;
    const error = tab === "yonetim" ? yError : kError;

    if (loading) return <Loader />;

    if (!canView) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Yetkisiz Erişim</h2>
                        <p className="text-gray-600">Bu sayfayı görüntülemek için yetkiniz bulunmuyor.</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    /** ----------------- Render ----------------- */
    return (
        <AdminLayout>
            <main className="flex-1 overflow-y-auto p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                        <p className="text-gray-500">{crumbs.join(" / ")}</p>
                    </div>
                    {showAdd && canAdd && tab !== "yonetim" && (
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
                            <Plus size={20} className="mr-2" /> Ekle
                        </button>
                    )}
                </div>

                {/* Hata */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {/* Filtreler */}
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <div className="flex flex-wrap items-center gap-3">
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery?.(e.target.value)}
                            placeholder={tab === "yonetim" ? "İsim / ID ara..." : "Ara..."}
                            className="px-3 py-2 bg-gray-100 rounded-lg outline-none"
                        />
                        {/* Yönetim dışındaki sekmelerde yayın durumu filtresi */}
                        {tab !== "yonetim" && (
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value as StatusFilter)}
                                className="px-3 py-2 bg-gray-100 rounded-lg"
                            >
                                <option value="">Tüm Durumlar</option>
                                <option value="Yayınlandı">Yayınlandı</option>
                                <option value="Taslak">Taslak</option>
                                <option value="Arşivlendi">Arşivlendi</option>
                            </select>
                        )}
                        {(searchQuery || (tab !== "yonetim" && status)) && (
                            <button onClick={clearFilters} className="text-blue-600 text-sm">
                                Filtreleri temizle
                            </button>
                        )}
                        {selectedIds.length > 0 && (
                            <span className="ml-auto text-sm text-gray-600">{selectedIds.length} seçili</span>
                        )}
                    </div>
                </div>

                {/* Tablo */}
                <div className="bg-white rounded-lg shadow">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                            {tab === "yonetim" ? (
                                <tr>
                                    <th className="px-4 py-3 text-left">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-blue-500"
                                            checked={rowsLength > 0 && selectedIds.length === rowsLength}
                                            onChange={toggleAll}
                                        />
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        ID
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        İsim Soyisim
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Resim URL
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Pozisyon
                                    </th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            ) : (
                                <tr>
                                    <th className="px-4 py-3 text-left">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-blue-500"
                                            checked={rowsLength > 0 && selectedIds.length === rowsLength}
                                            onChange={toggleAll}
                                        />
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Sayfa Başlığı
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Kategori
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Durum
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Son Güncelleme
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Yazar
                                    </th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            )}
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                            {tab === "yonetim"
                                ? filteredYRows.map((r) => (
                                    <tr key={r.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-4">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 text-blue-500"
                                                checked={selectedIds.includes(r.id)}
                                                onChange={() => toggleOne(r.id)}
                                            />
                                        </td>
                                        <td className="px-4 py-4">{r.id}</td>
                                        <td className="px-4 py-4">{r.isimSoyisim}</td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={r.resimUrl}
                                                    alt={r.isimSoyisim}
                                                    className="w-8 h-8 rounded-full object-cover border"
                                                    onError={(e) => ((e.currentTarget.style.visibility = "hidden"))}
                                                />
                                                <code className="text-xs text-gray-600">{r.resimUrl}</code>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">{r.pozisyon}</td>
                                        <td className="px-4 py-4 text-right relative">
                                            <button
                                                className="text-gray-500 hover:text-gray-700"
                                                onClick={() => setOpenAction(openAction === r.id ? null : r.id)}
                                            >
                                                <MoreHorizontal size={16} />
                                            </button>
                                            {openAction === r.id && (
                                                <div
                                                    ref={actionRef}
                                                    className="absolute right-4 mt-2 w-48 bg-white rounded-md shadow-lg z-20"
                                                >
                                                    <ul className="py-1 text-sm">
                                                        <li>
                                                            <button className="flex items-center px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-100">
                                                                <Eye size={16} className="mr-2" /> Detay
                                                            </button>
                                                        </li>
                                                        {canEdit && (
                                                            <li>
                                                                <button
                                                                    className="flex items-center px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-100"
                                                                >
                                                                    <Edit size={16} className="mr-2" /> Düzenle
                                                                </button>
                                                            </li>
                                                        )}
                                                        {canDelete && (
                                                            <li>
                                                                <button
                                                                    className="flex items-center px-4 py-2 w-full text-left text-red-600 hover:bg-gray-100"
                                                                >
                                                                    <Trash size={16} className="mr-2" /> Sil
                                                                </button>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                                : kRows.map((r) => (
                                    <tr key={r.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-4">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 text-blue-500"
                                                checked={selectedIds.includes(r.id)}
                                                onChange={() => toggleOne(r.id)}
                                            />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm font-medium text-gray-900">{r.title}</div>
                                            {r.slug && <div className="text-sm text-gray-500">/{r.slug}</div>}
                                        </td>
                                        <td className="px-4 py-4">{r.category}</td>
                                        <td className="px-4 py-4">
                          <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  r.status === "Yayınlandı"
                                      ? "bg-green-100 text-green-800"
                                      : r.status === "Taslak"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-gray-100 text-gray-800"
                              }`}
                          >
                            {r.status}
                          </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            {new Date(r.updatedAt).toLocaleDateString("tr-TR")}
                                        </td>
                                        <td className="px-4 py-4">{r.author ?? "—"}</td>
                                        <td className="px-4 py-4 text-right relative">
                                            <button
                                                className="text-gray-500 hover:text-gray-700"
                                                onClick={() => setOpenAction(openAction === r.id ? null : r.id)}
                                            >
                                                <MoreHorizontal size={16} />
                                            </button>
                                            {openAction === r.id && (
                                                <div className="absolute right-4 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                                                    <ul className="py-1 text-sm">
                                                        <li>
                                                            <button className="flex items-center px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-100">
                                                                <Eye size={16} className="mr-2" /> Görüntüle
                                                            </button>
                                                        </li>
                                                        <li>
                                                            {hasPermission("kurumsal", "duzenleme") ? (
                                                                r.tableName ? (
                                                                    <Link
                                                                        to={`/panel/sayfalar/edit/${r.tableName}/${r.id}`}
                                                                        onClick={() => setOpenAction(null)}
                                                                        className="flex items-center px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-100"
                                                                    >
                                                                        <Edit size={16} className="mr-2" /> Düzenle
                                                                    </Link>
                                                                ) : (
                                                                    <button
                                                                        disabled
                                                                        className="flex items-center px-4 py-2 w-full text-left text-gray-400 cursor-not-allowed"
                                                                    >
                                                                        <Edit size={16} className="mr-2" /> Düzenle
                                                                    </button>
                                                                )
                                                            ) : null}
                                                        </li>
                                                        <li>
                                                            {hasPermission("kurumsal", "silme") && (
                                                                <button
                                                                    className="flex items-center px-4 py-2 w-full text-left text-red-600 hover:bg-gray-100"
                                                                >
                                                                    <Trash size={16} className="mr-2" /> Sil
                                                                </button>
                                                            )}
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* pagination (sadece kurumsal sekmeler için) */}
                    {tab !== "yonetim" && (
                        <div className="px-6 py-4 flex items-center justify-between border-t">
                            <div className="text-sm text-gray-500">
                                Toplam <span className="font-medium">{kRows.length}</span> /{" "}
                                <span className="font-medium">{kData?.totalElements ?? 0}</span> kayıt
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    disabled={page <= 1}
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    className="px-3 py-1 border rounded text-sm disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <span className="px-3 py-1 text-sm">{page}</span>
                                <button
                                    disabled={!!kData && page >= (kData.totalPages || 1)}
                                    onClick={() => setPage((p) => p + 1)}
                                    className="px-3 py-1 border rounded text-sm disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </AdminLayout>
    );
}
