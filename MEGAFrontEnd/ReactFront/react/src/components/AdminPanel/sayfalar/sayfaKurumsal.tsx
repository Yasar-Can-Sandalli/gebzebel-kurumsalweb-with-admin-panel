// src/pages/PagesPage.tsx
import { useEffect, useRef, useState, useMemo } from 'react';
import { FileText, Filter, ChevronDown, ChevronUp, MoreHorizontal, Plus, Trash, Edit, Eye, AlertCircle } from 'lucide-react';
import AdminLayout from '../_LayoutAdminPanel.tsx';
import { useSearch } from '../context/SearchContext.tsx';
import { useClickOutside } from '../../useClickOutside.tsx';
import Loader from '../../loader.tsx';
import {
    CombinedPageService,
    BaskanAPI,
    YonetimSemasiAPI,
    PageEntity,
    handleApiError,
    convertDeltaToStatus
} from '../services/pageService.tsx';
import {Link} from "react-router-dom";
import {useAuthStore} from "../store/authStore.ts";

// Filter options
const categoryOptions = [
    'All Categories',
    'Kurumsal',
    'Yönetim',
    'Tarihi Yerler',
    'Hizmetler',
    'Fotoğraf ve Tur',
    'Meclis ve Belgeler',
    'Diğer'
];
const statusOptions = ['Tüm Durumlar', 'Yayınlandı', 'Taslak', 'Arşivlendi'];

// Main Pages component
export default function PagesPage() {
    const [pages, setPages] = useState<PageEntity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [selectedStatus, setSelectedStatus] = useState('Tüm Durumlar');
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const [sortField, setSortField] = useState<keyof PageEntity>('title');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [selectedPages, setSelectedPages] = useState<number[]>([]);
    const [actionDropdownId, setActionDropdownId] = useState<number | null>(null);
    const { searchQuery, setSearchQuery } = useSearch();
    const actionDropdownRef = useRef<HTMLDivElement>(null);

    // Get permissions from Zustand store
    const { hasPermission} = useAuthStore();
    // Check permissions
    const canView = hasPermission('kurumsal', 'goruntuleme');
    const canEdit = hasPermission('kurumsal', 'duzenleme');
    const canDelete = hasPermission('kurumsal', 'silme');
    const canAdd = hasPermission('kurumsal', 'ekleme');

    // Fetch data from multiple controllers
    useEffect(() => {
        const fetchPages = async () => {
            setLoading(true);
            setError(null);

            try {
                // 1. Fetch all data from combined service
                const allData = await CombinedPageService.getAllPageData();

                // 2. Convert different entity types to unified page format
                const allKurumsalData = [
                    ...allData.kurumsal.baskan,
                    ...allData.kurumsal.misyon,
                    ...allData.kurumsal.vizyon,
                    ...allData.kurumsal.ilkelerimiz,
                ];

                const allYonetimData = [
                    ...allData.yonetimSemasi.baskan,
                    ...allData.yonetimSemasi.baskanYardimcilari,
                    ...allData.yonetimSemasi.danismanlar,
                ];

                const convertedPages = CombinedPageService.convertToPageFormat(
                    allKurumsalData,
                    allYonetimData
                );

                /*
                let rawPages: PageEntity[] = [];
                try {
                    const pagesResponse = await PageAPI.getAllPages();
                    rawPages = pagesResponse.content.map(normalizePage);
                } catch (pageError) {
                    console.warn('PageAPI endpoint not available:', pageError);
                    // Continue without raw pages
                }
                    */
                // 4. Merge all pages
                const allPages = [...convertedPages];

                // 5. Set state
                setPages(allPages);

            } catch (err) {
                const errorInfo = handleApiError(err);
                setError(errorInfo.message);
                console.error('Failed to fetch pages:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPages();
    }, []);

    // Normalize page function (delta -> status conversion)
    const normalizePage = (page: PageEntity): PageEntity => ({
        ...page,
        status: convertDeltaToStatus(page.delta),
    });

    // Alternative method: Fetch data individually
    const fetchPagesIndividually = async () => {
        setLoading(true);
        setError(null);

        try {
            // Fetch from different controllers individually
            const [
                baskanData,
                misyonData,
                vizyonData,
                ilkelerimizData,
                yonetimSemasiData,
                danismanlarData,
            ] = await Promise.all([
                BaskanAPI.getActiveBaskan().catch(() => []),
                BaskanAPI.getActiveMisyon().catch(() => []),
                BaskanAPI.getActiveVizyon().catch(() => []),
                BaskanAPI.getActiveIlkelerimiz().catch(() => []),
                YonetimSemasiAPI.getYonetimSemasi().catch(() => ({ baskan: [], baskanYardimcilari: [] })),
                YonetimSemasiAPI.getBaskanDanismanlari().catch(() => []),
            ]);

            // Convert to page format
            const kurumsalPages = [
                ...baskanData,
                ...misyonData,
                ...vizyonData,
                ...ilkelerimizData,
            ];

            const yonetimPages = [
                ...yonetimSemasiData.baskan,
                ...yonetimSemasiData.baskanYardimcilari,
                ...danismanlarData,
            ];

            const convertedPages = CombinedPageService.convertToPageFormat(kurumsalPages, yonetimPages);

            // Try to get additional pages from PageAPI
            /*
            let rawPages: PageEntity[] = [];
            try {
                const pagesResponse = await PageAPI.getAllPages();
                rawPages = pagesResponse.content.map(normalizePage);
            } catch (pageError) {
                console.warn('PageAPI endpoint not available:', pageError);
            }
            */
            const allPages = [...convertedPages];
            setPages(allPages);

        } catch (err) {
            const errorInfo = handleApiError(err);
            setError(errorInfo.message);
            console.error('Failed to fetch pages individually:', err);
        } finally {
            setLoading(false);
        }
    };

    useClickOutside(actionDropdownRef, () => {
        setActionDropdownId(null);
    });

    const handleDeletePage = async (pageId: number) => {
        if (!window.confirm('Bu sayfayı silmek istediğinizden emin misiniz?')) {
            return;
        }

        try {
            // Check if this is a converted entity (ID > 10000 means YonetimSemasi)
            if (pageId > 10000) {
                console.log('Cannot delete YonetimSemasi entity from pages interface');
                alert('Bu sayfa yönetim şeması sayfasından silinmelidir.');
                return;
            }

            // Check if this is a Kurumsal entity (needs special handling)
            const pageToDelete = pages.find(p => p.id === pageId);
            if (pageToDelete?.category === 'Kurumsal') {
                alert('Kurumsal sayfalar kurumsal yönetim panelinden silinmelidir.');
                return;
            }

            /*
            // Try to delete via PageAPI
            try {
                await PageAPI.deletePage(pageId);
                setPages(pages.filter(page => page.id !== pageId));
                alert('Sayfa başarıyla silindi.');
            } catch (deleteError) {
                console.warn('PageAPI delete not available, removing from local state only');
                setPages(pages.filter(page => page.id !== pageId));
            }
            */
            setActionDropdownId(null);

        } catch (error) {
            const errorInfo = handleApiError(error);
            alert(`Silme işlemi başarısız: ${errorInfo.message}`);
            console.error('Failed to delete page:', error);
        }
    };

    const handleBulkDelete = async () => {
        if (selectedPages.length === 0) return;

        if (!window.confirm(`${selectedPages.length} sayfayı silmek istediğinizden emin misiniz?`)) {
            return;
        }

        try {
            // Separate different types of pages
            const yonetimSemasiIds = selectedPages.filter(id => id > 10000);
            const kurumsalIds: number[] = [];
            const regularPageIds: number[] = [];

            selectedPages.forEach(id => {
                const page = pages.find(p => p.id === id);
                if (page) {
                    if (id > 10000) {
                        // Already handled above
                    } else if (page.category === 'Kurumsal') {
                        kurumsalIds.push(id);
                    } else {
                        regularPageIds.push(id);
                    }
                }
            });

            let warningMessages: string[] = [];

            if (yonetimSemasiIds.length > 0) {
                warningMessages.push(`${yonetimSemasiIds.length} yönetim şeması sayfası yönetim panelinden silinmelidir.`);
            }

            if (kurumsalIds.length > 0) {
                warningMessages.push(`${kurumsalIds.length} kurumsal sayfa kurumsal panelinden silinmelidir.`);
            }

            if (warningMessages.length > 0) {
                alert(warningMessages.join('\n'));
            }

            // Delete regular pages
            /*
            if (regularPageIds.length > 0) {
                try {
                    await PageAPI.deletePages(regularPageIds);
                    setPages(pages.filter(page => !regularPageIds.includes(page.id)));
                } catch (deleteError) {
                    console.warn('PageAPI bulk delete not available, removing from local state only');
                    setPages(pages.filter(page => !regularPageIds.includes(page.id)));
                }
 */
            setSelectedPages([]);

        } catch (error) {
            const errorInfo = handleApiError(error);
            alert(`Toplu silme işlemi başarısız: ${errorInfo.message}`);
            console.error('Failed to bulk delete pages:', error);
        }
    };

    // Filter and sort pages
    const filteredAndSortedPages = useMemo(() => {
        return pages
            .filter((page) => {
                const title = page?.title?.toLowerCase() ?? '';
                const category = page?.category ?? '';
                const status = page?.status ?? '';
                const slug = page?.slug?.toLowerCase() ?? '';
                const searchLower = searchQuery.toLowerCase();

                const matchesSearch =
                    title.includes(searchLower) ||
                    slug.includes(searchLower) ||
                    category.toLowerCase().includes(searchLower);
                const matchesCategory = selectedCategory === 'All Categories' || category === selectedCategory;
                const matchesStatus = selectedStatus === 'Tüm Durumlar' || status === selectedStatus;

                return matchesSearch && matchesCategory && matchesStatus;
            })
            .sort((a, b) => {
                const fieldA = a[sortField] || '';
                const fieldB = b[sortField] || '';

                if (sortDirection === 'asc') {
                    return fieldA < fieldB ? -1 : fieldA > fieldB ? 1 : 0;
                } else {
                    return fieldA > fieldB ? -1 : fieldA < fieldB ? 1 : 0;
                }
            });
    }, [pages, searchQuery, selectedCategory, selectedStatus, sortField, sortDirection]);

    const handleSort = (field: keyof PageEntity) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const toggleSelectAll = () => {
        if (selectedPages.length === filteredAndSortedPages.length && filteredAndSortedPages.length > 0) {
            setSelectedPages([]);
        } else {
            setSelectedPages(filteredAndSortedPages.map((page) => page.id));
        }
    };

    const toggleSelectPage = (pageId: number) => {
        if (selectedPages.includes(pageId)) {
            setSelectedPages(selectedPages.filter((id) => id !== pageId));
        } else {
            setSelectedPages([...selectedPages, pageId]);
        }
    };

    const handleClearFilters = () => {
        setSelectedCategory('All Categories');
        setSelectedStatus('Tüm Durumlar');
        if (setSearchQuery) {
            setSearchQuery('');
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('tr-TR');
    };

    const retryFetch = () => {
        // Use the alternative fetch method on retry
        fetchPagesIndividually();
    };

    if (loading) {
        return <Loader />;
    }
    // If user doesn't have view permission
    if (!canView) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Yetkisiz Erişim</h2>
                        <p className="text-gray-600">Bu sayfayı görüntülemek için yetkiniz bulunmamaktadır.</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }
    return (
        <AdminLayout>
            <main className="flex-1 overflow-y-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Sayfalar</h2>
                        <p className="text-gray-500">Sayfaları Listele ve yönet</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
                        <Plus size={20} className="mr-2" />
                        Sayfa Ekle
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center">
                            <AlertCircle size={20} className="text-red-600 mr-2" />
                            <div>
                                <h3 className="text-red-800 font-medium">Veri yüklenirken hata oluştu</h3>
                                <p className="text-red-600 text-sm">{error}</p>
                                <button
                                    onClick={retryFetch}
                                    className="text-red-700 underline text-sm mt-1"
                                >
                                    Tekrar dene
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="text-gray-700 font-medium">Filters:</div>

                        {/* Category Filter */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                                    setIsStatusDropdownOpen(false);
                                }}
                                className="flex items-center px-3 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200"
                            >
                                <Filter size={16} className="mr-2" />
                                {selectedCategory}
                                {isCategoryDropdownOpen ? <ChevronUp size={16} className="ml-2" /> : <ChevronDown size={16} className="ml-2" />}
                            </button>
                            {isCategoryDropdownOpen && (
                                <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                                    <ul className="py-1">
                                        {categoryOptions.map((category) => (
                                            <li key={category}>
                                                <button
                                                    onClick={() => {
                                                        setSelectedCategory(category);
                                                        setIsCategoryDropdownOpen(false);
                                                    }}
                                                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                                                        selectedCategory === category ? 'bg-blue-50 text-blue-700' : ''
                                                    }`}
                                                >
                                                    {category}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Status Filter */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setIsStatusDropdownOpen(!isStatusDropdownOpen);
                                    setIsCategoryDropdownOpen(false);
                                }}
                                className="flex items-center px-3 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200"
                            >
                                <Filter size={16} className="mr-2" />
                                {selectedStatus}
                                {isStatusDropdownOpen ? <ChevronUp size={16} className="ml-2" /> : <ChevronDown size={16} className="ml-2" />}
                            </button>
                            {isStatusDropdownOpen && (
                                <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                                    <ul className="py-1">
                                        {statusOptions.map((status) => (
                                            <li key={status}>
                                                <button
                                                    onClick={() => {
                                                        setSelectedStatus(status);
                                                        setIsStatusDropdownOpen(false);
                                                    }}
                                                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                                                        selectedStatus === status ? 'bg-blue-50 text-blue-700' : ''
                                                    }`}
                                                >
                                                    {status}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {(selectedCategory !== 'All Categories' || selectedStatus !== 'Tüm Durumlar' || searchQuery) && (
                            <button onClick={handleClearFilters} className="text-blue-600 hover:text-blue-800 text-sm">
                                Filtreleri temizle
                            </button>
                        )}

                        {selectedPages.length > 0 && (
                            <div className="ml-auto flex items-center">
                                <span className="text-gray-700">{selectedPages.length} selected</span>
                                <button
                                    onClick={handleBulkDelete}
                                    className="ml-2 text-red-600 hover:text-red-800 text-sm"
                                >
                                    Seçilenleri Sil
                                </button>
                                <button
                                    onClick={() => setSelectedPages([])}
                                    className="ml-2 text-gray-600 hover:text-gray-800 text-sm"
                                >
                                    Seçimi temizle
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pages Table */}
                <div className="bg-white rounded-lg shadow">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                                            checked={filteredAndSortedPages.length > 0 && selectedPages.length === filteredAndSortedPages.length}
                                            onChange={toggleSelectAll}
                                            disabled={filteredAndSortedPages.length === 0}
                                        />
                                    </div>
                                </th>
                                <th className="px-4 py-3 text-left">
                                    <button
                                        onClick={() => handleSort('title')}
                                        className="flex items-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Sayfa Başlığı
                                        {sortField === 'title' && (
                                            sortDirection === 'asc' ? (
                                                <ChevronUp size={14} className="ml-1" />
                                            ) : (
                                                <ChevronDown size={14} className="ml-1" />
                                            )
                                        )}
                                    </button>
                                </th>
                                <th className="px-4 py-3 text-left">
                                    <button
                                        onClick={() => handleSort('category')}
                                        className="flex items-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Kategori
                                        {sortField === 'category' && (
                                            sortDirection === 'asc' ? (
                                                <ChevronUp size={14} className="ml-1" />
                                            ) : (
                                                <ChevronDown size={14} className="ml-1" />
                                            )
                                        )}
                                    </button>
                                </th>
                                <th className="px-4 py-3 text-left">
                                    <button
                                        onClick={() => handleSort('status')}
                                        className="flex items-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Durum
                                        {sortField === 'status' && (
                                            sortDirection === 'asc' ? (
                                                <ChevronUp size={14} className="ml-1" />
                                            ) : (
                                                <ChevronDown size={14} className="ml-1" />
                                            )
                                        )}
                                    </button>
                                </th>
                                <th className="px-4 py-3 text-left">
                                    <button
                                        onClick={() => handleSort('updatedAt')}
                                        className="flex items-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Son Güncelleme
                                        {sortField === 'updatedAt' && (
                                            sortDirection === 'asc' ? (
                                                <ChevronUp size={14} className="ml-1" />
                                            ) : (
                                                <ChevronDown size={14} className="ml-1" />
                                            )
                                        )}
                                    </button>
                                </th>
                                <th className="px-4 py-3 text-left">
                                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Yazar</span>
                                </th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {filteredAndSortedPages.map((page) => (
                                <tr key={page.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                                            checked={selectedPages.includes(page.id)}
                                            onChange={() => toggleSelectPage(page.id)}
                                        />
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                                                <FileText size={16} />
                                            </div>
                                            <div className="ml-3">
                                                <div className="text-sm font-medium text-gray-900">{page.title}</div>
                                                <div className="text-sm text-gray-500">/{page.slug}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{page.category}</div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                page.status === 'Yayınlandı'
                                                    ? 'bg-green-100 text-green-800'
                                                    : page.status === 'Taslak'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-gray-100 text-gray-800'
                                            }`}
                                        >
                                            {page.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{formatDate(page.updatedAt)}</div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{page.author}</div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActionDropdownId(actionDropdownId === page.id ? null : page.id);
                                            }}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <MoreHorizontal size={16} />
                                        </button>
                                        {actionDropdownId === page.id && (
                                            <div
                                                ref={actionDropdownRef}
                                                className="absolute right-4 mt-2 w-48 bg-white rounded-md shadow-lg z-20"
                                            >
                                                <ul className="py-1">
                                                    <li>
                                                        <button
                                                            onClick={() => {
                                                                // TODO: Implement view page functionality
                                                                console.log('View page:', page.id);
                                                                setActionDropdownId(null);
                                                            }}
                                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                        >
                                                            <Eye size={16} className="mr-2" />
                                                            Sayfayı Görüntüle
                                                        </button>
                                                    </li>
                                                    <li>
                                                        {canEdit && (
                                                            <Link
                                                                to={`/panel/sayfalar/edit/${page.tableName}/${page.id}`}
                                                                onClick={() => setActionDropdownId(null)} // Dropdown'ı kapatmak için onClick'i burada da kullanabilirsiniz.
                                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                            >
                                                                <Edit size={16} className="mr-2" />
                                                                Sayfayı Düzenle
                                                            </Link>
                                                        )}

                                                    </li>
                                                    <li>
                                                        {canDelete && (
                                                            <button
                                                            onClick={() => handleDeletePage(page.id)}
                                                                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                                                            >
                                                                <Trash size={16} className="mr-2" />
                                                                Sayfayı Sil
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

                    {filteredAndSortedPages.length === 0 && (
                        <div className="text-center py-8">
                            <FileText size={64} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-gray-500 mb-1">Sayfa bulunamadı</h3>
                            <p className="text-gray-400">Arama veya filtre kriterlerinizi ayarlamayı deneyin</p>
                        </div>
                    )}

                    <div className="px-6 py-4 flex items-center justify-between border-t">
                            <div className="text-sm text-gray-500">
                                Showing <span className="font-medium">{filteredAndSortedPages.length}</span> of{' '}
                                <span className="font-medium">{pages.length}</span> Sayfalar
                            </div>
                        <div className="flex items-center space-x-2">
                            <button className="px-3 py-1 border rounded text-sm disabled:opacity-50">Previous</button>
                            <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">1</button>
                            <button className="px-3 py-1 border rounded text-sm">Next</button>
                        </div>
                    </div>
                </div>
            </main>
        </AdminLayout>
    );
}