import {useEffect, useMemo, useRef, useState} from "react";
import AdminLayout from "../_LayoutAdminPanel.tsx";
import {useSearch} from "../context/SearchContext.tsx";
import {useAuthStore} from "../store/authStore.ts";
import {Link, useLocation} from "react-router-dom";
import {Eye, MoreHorizontal, Plus, Trash, Edit} from "lucide-react";
import Loader from "../../loader.tsx";
import {useClickOutside} from "../../useClickOutside.tsx";
import {kurumsalService, KurumsalRow, PageResult, KurumsalTab} from "../services/kurumsalService.ts";

/* ---- URL'den tab okuma ---- */
const useTab = (): KurumsalTab => {
    const sp = new URLSearchParams(useLocation().search);
    const raw = (sp.get("tab") || "yonetim").toLowerCase();
    if (["vizyon","vizyon-misyon-ilke","misyon","ilkeler","ilkelerimiz"].includes(raw)) return "vizyon";
    if (raw === "raporlar") return "raporlar";
    if (raw === "komisyonlar") return "komisyonlar";
    return "yonetim";
};

const TAB_UI: Record<KurumsalTab, {title: string; crumbs: string[]; showAdd?: boolean;}> = {
    yonetim:    { title:"YÖNETİM",                  crumbs:["Kurumsal","Yönetim"],                 showAdd:true },
    vizyon:     { title:"VİZYON MİSYON VE İLKELER", crumbs:["Kurumsal","Vizyon-Misyon-İlke"],      showAdd:false },
    raporlar:   { title:"RAPORLAR",                 crumbs:["Kurumsal","Raporlar"],                showAdd:true },
    komisyonlar:{ title:"KOMİSYONLAR",              crumbs:["Kurumsal","Komisyonlar"],             showAdd:true },
};

type StatusFilter = "" | "Yayınlandı" | "Taslak" | "Arşivlendi";

export default function KurumsalPage() {
    const tab = useTab();
    const {title, crumbs, showAdd} = TAB_UI[tab];

    const {hasPermission} = useAuthStore();
    const canView = hasPermission("kurumsal","goruntuleme");
    const canEdit = hasPermission("kurumsal","duzenleme");
    const canDelete = hasPermission("kurumsal","silme");
    const canAdd = hasPermission("kurumsal","ekleme");

    const {searchQuery, setSearchQuery} = useSearch();

    // server-state
    const [data, setData] = useState<PageResult<KurumsalRow> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);

    // query params
    const [status, setStatus] = useState<StatusFilter>("");
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(20);
    const sort = "updatedAt,desc";

    // UI state
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [openAction, setOpenAction] = useState<number|null>(null);
    const actionRef = useRef<HTMLDivElement>(null);
    useClickOutside(actionRef, ()=>setOpenAction(null));

    // fetcher
    useEffect(()=>{
        let on = true;
        setLoading(true);
        setError(null);
        kurumsalService.list(tab, { q: searchQuery, status, page, size, sort })
            .then(res => { if(on) setData(res); })
            .catch(err => { if(on) setError(err?.message || "Veri alınamadı"); })
            .finally(()=> on && setLoading(false));
        return ()=>{ on = false; };
    }, [tab, searchQuery, status, page, size]);

    const rows = data?.content ?? [];

    const toggleAll = ()=>{
        if (selectedIds.length === rows.length) setSelectedIds([]);
        else setSelectedIds(rows.map(r=>r.id));
    };
    const toggleOne = (id:number)=>{
        setSelectedIds(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
    };

    const clearFilters = ()=>{
        setSearchQuery?.("");
        setStatus("");
        setPage(1);
    };

    const handleDelete = async (id:number)=>{
        if (!window.confirm("Silmek istediğinize emin misiniz?")) return;
        try {
            await kurumsalService.remove(tab, id);
            // yeniden yükle
            kurumsalService.list(tab, { q: searchQuery, status, page, size, sort })
                .then(setData);
            setOpenAction(null);
        } catch (e:any) {
            alert(e?.message || "Silme başarısız");
        }
    };

    if (loading) return <Loader/>;
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

    return (
        <AdminLayout>
            <main className="flex-1 overflow-y-auto p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                        <p className="text-gray-500">{crumbs.join(" / ")}</p>
                    </div>
                    {showAdd && canAdd && (
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
                            <Plus size={20} className="mr-2"/> Ekle
                        </button>
                    )}
                </div>

                {/* Hata */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-sm text-red-700">{error}</div>
                )}

                {/* Filtreler */}
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <div className="flex flex-wrap items-center gap-3">
                        <input
                            value={searchQuery}
                            onChange={(e)=>setSearchQuery?.(e.target.value)}
                            placeholder="Ara..."
                            className="px-3 py-2 bg-gray-100 rounded-lg outline-none"
                        />
                        <select
                            value={status}
                            onChange={(e)=>setStatus(e.target.value as StatusFilter)}
                            className="px-3 py-2 bg-gray-100 rounded-lg">
                            <option value="">Tüm Durumlar</option>
                            <option value="Yayınlandı">Yayınlandı</option>
                            <option value="Taslak">Taslak</option>
                            <option value="Arşivlendi">Arşivlendi</option>
                        </select>
                        {(searchQuery || status) && (
                            <button onClick={clearFilters} className="text-blue-600 text-sm">Filtreleri temizle</button>
                        )}
                        {selectedIds.length>0 && (
                            <span className="ml-auto text-sm text-gray-600">{selectedIds.length} seçili</span>
                        )}
                    </div>
                </div>

                {/* Tablo */}
                <div className="bg-white rounded-lg shadow">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left">
                                    <input type="checkbox" className="rounded border-gray-300 text-blue-500"
                                           checked={rows.length>0 && selectedIds.length===rows.length}
                                           onChange={toggleAll}/>
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sayfa Başlığı</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Son Güncelleme</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yazar</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {rows.map(r=>(
                                <tr key={r.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-4">
                                        <input type="checkbox"
                                               className="rounded border-gray-300 text-blue-500"
                                               checked={selectedIds.includes(r.id)}
                                               onChange={()=>toggleOne(r.id)}/>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="text-sm font-medium text-gray-900">{r.title}</div>
                                        {r.slug && <div className="text-sm text-gray-500">/{r.slug}</div>}
                                    </td>
                                    <td className="px-4 py-4">{r.category}</td>
                                    <td className="px-4 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        r.status==='Yayınlandı' ? 'bg-green-100 text-green-800'
                            : r.status==='Taslak' ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                    }`}>{r.status}</span>
                                    </td>
                                    <td className="px-4 py-4">{new Date(r.updatedAt).toLocaleDateString('tr-TR')}</td>
                                    <td className="px-4 py-4">{r.author ?? "—"}</td>
                                    <td className="px-4 py-4 text-right relative">
                                        <button className="text-gray-500 hover:text-gray-700"
                                                onClick={()=>setOpenAction(openAction===r.id?null:r.id)}>
                                            <MoreHorizontal size={16}/>
                                        </button>
                                        {openAction===r.id && (
                                            <div ref={actionRef} className="absolute right-4 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                                                <ul className="py-1 text-sm">
                                                    <li>
                                                        <button className="flex items-center px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-100">
                                                            <Eye size={16} className="mr-2"/> Görüntüle
                                                        </button>
                                                    </li>
                                                    <li>
                                                        {canEdit ? (
                                                            r.tableName ? (
                                                                <Link
                                                                    to={`/panel/sayfalar/edit/${r.tableName}/${r.id}`}
                                                                    onClick={()=>setOpenAction(null)}
                                                                    className="flex items-center px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-100">
                                                                    <Edit size={16} className="mr-2"/> Düzenle
                                                                </Link>
                                                            ) : (
                                                                <button disabled className="flex items-center px-4 py-2 w-full text-left text-gray-400 cursor-not-allowed">
                                                                    <Edit size={16} className="mr-2"/> Düzenle
                                                                </button>
                                                            )
                                                        ) : null}
                                                    </li>
                                                    <li>
                                                        {canDelete && (
                                                            <button
                                                                onClick={()=>handleDelete(r.id)}
                                                                className="flex items-center px-4 py-2 w-full text-left text-red-600 hover:bg-gray-100">
                                                                <Trash size={16} className="mr-2"/> Sil
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

                    {/* pagination */}
                    <div className="px-6 py-4 flex items-center justify-between border-t">
                        <div className="text-sm text-gray-500">
                            Toplam <span className="font-medium">{rows.length}</span> /{" "}
                            <span className="font-medium">{data?.totalElements ?? 0}</span> kayıt
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                disabled={page<=1}
                                onClick={()=>setPage(p=>Math.max(1, p-1))}
                                className="px-3 py-1 border rounded text-sm disabled:opacity-50">Previous</button>
                            <span className="px-3 py-1 text-sm">{page}</span>
                            <button
                                disabled={!!data && page>= (data.totalPages || 1)}
                                onClick={()=>setPage(p=>p+1)}
                                className="px-3 py-1 border rounded text-sm disabled:opacity-50">Next</button>
                        </div>
                    </div>
                </div>
            </main>
        </AdminLayout>
    );
}
