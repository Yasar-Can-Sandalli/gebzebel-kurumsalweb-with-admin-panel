import React, {useState, useEffect, useCallback} from "react";
import {useParams, useNavigate, useLocation} from "react-router-dom";
import {ArrowLeft, Save, X, AlertCircle, Eye} from "lucide-react";
import {BaskanAPI} from "../services/pageService";
import {apiGet, apiPut} from "../services/apiService";
import { getAllYayinCategories, getYayinById } from "../services/yayinlarService";
import type { Yayin, YayinCategorySummary } from "../types/yayinlar";

/* ------------------------- Basit Layout ------------------------- */
const SimpleLayout: React.FC<{ children: React.ReactNode }> = ({children}) => (
    <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
);

const DebugInfo: React.FC<{ data: any }> = ({data}) => (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
        <h4 className="font-semibold text-yellow-800 mb-2">Debug Info:</h4>
        <pre className="text-xs text-yellow-700 overflow-auto">
      {JSON.stringify(data, null, 2)}
    </pre>
    </div>
);

/* ------------------------------ Tipler ------------------------------ */
interface TableConfig {
    tableName: string;
    displayName: string;
    apiEndpoint: string;
    fields: FieldConfig[];
}

interface FieldConfig {
    name: string;
    label: string;
    type:
        | "text"
        | "textarea"
        | "editor"
        | "image"
        | "select"
        | "number"
        | "date"
        | "boolean";
    required?: boolean;
    options?: string[];
    placeholder?: string;
    maxLength?: number;
}

/* ----------------------- Kurumsal Konfigleri ----------------------- */
const TABLE_CONFIGS: Record<string, TableConfig> = {
    KURUMSAL_BASKAN_MISYON_VIZYON_ILKELERIMIZ: {
        tableName: "KURUMSAL_BASKAN_MISYON_VIZYON_ILKELERIMIZ",
        displayName: "Başkan, Misyon, Vizyon & İlkelerimiz",
        apiEndpoint: "/api/kurumsal/baskan-misyon-vizyon",
        fields: [
            {name: "resimUrl1", label: "Resim URL 1", type: "text"},
            {name: "imageUrl2", label: "Resim URL 2", type: "text"},
            {name: "ICERIK", label: "İçerik", type: "textarea", required: true},
            {name: "DELTA", label: "Delta", type: "text"},
            {
                name: "KATEGORI",
                label: "Kategori",
                type: "select",
                required: true,
                options: ["baskan", "misyon", "vizyon", "ilkelerimiz"],
            },
        ],
    },
    kurumsal_yonetim_semasi: {
        tableName: "KURUMSAL_YONETIM_SEMASI",
        displayName: "Yönetim Şeması",
        apiEndpoint: "/api/kurumsal/yonetim-semasi",
        fields: [
            {name: "isimSoyisim", label: "Isim Soyisim", type: "text"},
            {name: "resimUrl", label: "resimUrl", type: "text"},
            {name: "pozisyon", label: "pozisyon", type: "text"},
            {name: "siraNo", label: "siraNo", type: "text"},
            {name: "mudurlukler", label: "mudurlukler", type: "textarea"},
        ],
    },

    KURUMSAL_ETIK_ARABULUCULUK: {
        tableName: "KURUMSAL_ETIK_ARABULUCULUK",
        displayName: "Etik, Arabuluculuk",
        apiEndpoint: "/api/kurumsal/etik-arabuluculuk",
        fields: [
            {name: "Ad", label: "AD", type: "text"},
            {name: "unvan", label: "unvan", type: "text"},
            {name: "gorev", label: "gorev", type: "text"},
            {name: "tip", label: "tip", type: "text", required: true},
            {name: "ilke", label: "ilke", type: "textarea", required: true},
            {name: "delta", label: "delta", type: "text", required: true},
            {name: "resimUrl", label: "resim Url", type: "text"},
        ],
    },
};

const CATEGORY_TO_TABLE: Record<string, string> = {
    baskan: "KURUMSAL_BASKAN_MISYON_VIZYON_ILKELERIMIZ",
    misyon: "KURUMSAL_BASKAN_MISYON_VIZYON_ILKELERIMIZ",
    vizyon: "KURUMSAL_BASKAN_MISYON_VIZYON_ILKELERIMIZ",
    ilkelerimiz: "KURUMSAL_BASKAN_MISYON_VIZYON_ILKELERIMIZ",
    etik: "KURUMSAL_ETIK_ARABULUCULUK",
    arabuluculuk: "KURUMSAL_ETIK_ARABULUCULUK",
    eskibaskan: "KURUMSAL_MECLIS_ESKIBASKANLAR",
    yonetim: "kurumsal_yonetim_semasi",
};
// --- NEW: HİZMETLER ---
const HIZMETLER_CONFIG: TableConfig = {
    tableName: "HIZMETLER",
    displayName: "Hizmet",
    apiEndpoint: "/api/hizmetler",
    fields: [
        {name: "baslik", label: "Başlık", type: "text", required: true},
        {name: "imgUrl", label: "Görsel URL", type: "image"},
        {name: "telefon", label: "Telefon", type: "text"},
        {name: "konum", label: "Konum", type: "text"},
        {name: "buttonDetay", label: "Buton (Detay)", type: "text"},
        {name: "buttonKonum", label: "Buton (Konum)", type: "text"},
        {name: "mail", label: "E-Posta", type: "text"},
        {name: "kategori", label: "Kategori", type: "text"},
    ],
};

/* --- NEW: RAPORLAR --- */
const RAPORLAR_CONFIG: TableConfig = {
    tableName: "RAPORLAR",
    displayName: "Rapor",
    apiEndpoint: "/api/raporlar",
    fields: [
        {name: "raporBaslik", label: "Rapor Başlık", type: "text", required: true},
        {name: "raporUrl", label: "Rapor URL (PDF)", type: "text"},
        // İstersen burada 'select' yaparız ama hızlıca ilerlemek için ID giriyoruz:
        {name: "categoryId", label: "Kategori ID", type: "number", required: true},
        {name: "raporDurum", label: "Durum (Aktif/Pasif)", type: "boolean"},
        {name: "raporTarihi", label: "Rapor Tarihi", type: "date"},
    ],
};

// --- NEW: HABERLER ---
const HABERLER_CONFIG: TableConfig = {
    tableName: "HABERLER",
    displayName: "Haber",
    apiEndpoint: "/api/haberler",
    fields: [
        {name: "haberBaslik", label: "Haber Başlık", type: "text", required: true},
        {name: "tarih", label: "Tarih", type: "date", required: true},
        {name: "aciklama", label: "Açıklama", type: "textarea"},
        {name: "resim1", label: "Resim 1 URL", type: "text"},
        {name: "resim2", label: "Resim 2 URL", type: "text"},
        // Kategori listesini ileride select’e bağlayabiliriz; şimdilik ID ile güncelleyelim
        {name: "kategoriId", label: "Kategori ID", type: "number"},
    ],
};


/* -------------------------- ETKİNLİK KONFİG -------------------------- */
const EVENT_CONFIG: TableConfig = {
    tableName: "ETKINLIKLER",
    displayName: "Etkinlik",
    apiEndpoint: "/api/etkinlikler",
    fields: [
        {name: "baslik", label: "Başlık", type: "text", required: true},
        {name: "tarih", label: "Tarih", type: "date", required: true},
        {name: "resimUrl", label: "Resim URL", type: "text"},
        {name: "aciklama", label: "Açıklama", type: "textarea"},
    ],
};

// --- NEW: YAYINLAR ---
const YAYINLAR_CONFIG: TableConfig = {
    tableName: "YAYINLAR",
    displayName: "Yayın",
    apiEndpoint: "/api/yayinlar",
    fields: [
        { name: "yayinBaslik", label: "Yayın Başlığı", type: "text", required: true, maxLength: 90 },
        { name: "yayinUrl", label: "Yayın URL", type: "text", required: true },
        { name: "description", label: "Açıklama", type: "textarea" },
        { name: "categoryId", label: "Kategori", type: "select", required: true },
    ],
};

/* =============================== KOMPONENT =============================== */
const DynamicEditPageForm: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    const isInsidePanel = location.pathname.startsWith("/panel/");
    const isHaberMode = location.pathname.includes("/haberler/");
    const isEventMode = location.pathname.includes("/etkinlikler/");
    const isYonetimMode = location.pathname.includes("/kurumsal/yonetim");
    const isHizmetMode = location.pathname.includes("/hizmetler/");
    const isRaporMode = location.pathname.includes("/kurumsal/raporlar/");
    const isYayinMode = location.pathname.includes("/yayinlar/duzenle");
    const lowerPath = location.pathname.toLowerCase();
    const isKurumsalBMVIMode =
        lowerPath.includes("/kurumsal/bmvi/");

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isPreview, setIsPreview] = useState(false);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [debugMode, setDebugMode] = useState(false);
    const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [categories, setCategories] = useState<YayinCategorySummary[]>([]);

    /* ------------------------------ Helpers ------------------------------ */
    const isImageLike = (fieldName: string) =>
        /^(resim|image|img).*|.*(resim|image|img).*(url)?$/i.test(fieldName);

    const imageOrFallback = (url?: string) =>
        url && url.trim() !== "" ? url : "/images/placeholder-16x9.jpg";

    // --- üst kısma istersen sabit değer:
    const THUMB_HEIGHT = "h-40"; // ~160px

    const renderImageThumb = (url?: string) => (
        <div className="mt-2">
            <div
                className={`w-full ${THUMB_HEIGHT} rounded-xl overflow-hidden bg-slate-50 ring-1 ring-slate-200 flex items-center justify-center`}>
                <img
                    src={imageOrFallback(url)}
                    alt="Önizleme"
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => ((e.target as HTMLImageElement).src = "/images/placeholder-16x9.jpg")}
                />
            </div>
        </div>
    );

    /* ------------------------------ Fetch ------------------------------ */
    const fetchData = useCallback(
        async (recordId: string) => {
            setLoading(true);
            setError(null);
            try {
                const numericId = parseInt(recordId, 10);
                let data: any = null;
                let config: TableConfig | null = null;

                if (isHaberMode) {
                    try {
                        data = await apiGet<any>(`${HABERLER_CONFIG.apiEndpoint}/${numericId}`);
                        config = HABERLER_CONFIG;
                    } catch {
                        const all = await apiGet<any[]>(HABERLER_CONFIG.apiEndpoint);
                        data = all.find((x) => x.id === numericId);
                        config = HABERLER_CONFIG;
                    }
                } else if (isRaporMode) {
                    try {
                        data = await apiGet<any>(`${RAPORLAR_CONFIG.apiEndpoint}/find/${numericId}`);
                        config = RAPORLAR_CONFIG;
                    } catch {
                        try {
                            const all = await apiGet<any[]>(`${RAPORLAR_CONFIG.apiEndpoint}/list`);
                            data = all.find((x) => x.raporid === numericId || x.id === numericId);
                        } catch {
                            const all2 = await apiGet<any[]>(RAPORLAR_CONFIG.apiEndpoint);
                            data = all2.find((x) => x.raporid === numericId || x.id === numericId);
                        }
                        config = RAPORLAR_CONFIG;
                    }
                } else if (isEventMode) {
                    try {
                        data = await apiGet<any>(`/api/etkinlikler/${numericId}`);
                        config = EVENT_CONFIG;
                    } catch {
                        const all = await apiGet<any[]>("/api/etkinlikler");
                        data = all.find((x) => x.id === numericId);
                        config = EVENT_CONFIG;
                    }
                } else if (isHizmetMode) {
                    try {
                        data = await apiGet<any>(`${HIZMETLER_CONFIG.apiEndpoint}/${numericId}`);
                        config = HIZMETLER_CONFIG;
                    } catch {
                        const all = await apiGet<any[]>(HIZMETLER_CONFIG.apiEndpoint);
                        data = all.find((x) => x.id === numericId);
                        config = HIZMETLER_CONFIG;
                    }
                } else if (isYonetimMode) {
                    const cfg = TABLE_CONFIGS["kurumsal_yonetim_semasi"];
                    const raw = await apiGet<any>(`${cfg.apiEndpoint}/${numericId}`);
                    data = (raw && (raw.data ?? raw)) || null;
                    config = cfg;
                } else if (isKurumsalBMVIMode) {
                    let foundData: any = null;
                    let category = "";
                    const categories = ["baskan", "misyon", "vizyon", "ilkelerimiz"];
                    for (const kategori of categories) {
                        try {
                            const d = await BaskanAPI.getActiveByIdAndKategori(kategori, numericId);
                            if (d) {
                                foundData = d;
                                category = kategori;
                                break;
                            }
                        } catch { /* ignore */ }
                    }
                    data = foundData;
                    const tableKey = data ? CATEGORY_TO_TABLE[data.kategori || category] : null;
                    config = tableKey ? TABLE_CONFIGS[tableKey] : null;
                } else if (isYayinMode) {
                    data = await apiGet<any>(`${YAYINLAR_CONFIG.apiEndpoint}/find/${numericId}`);
                    config = YAYINLAR_CONFIG;
                }

                if (!data || !config) {
                    throw new Error("Uygun sayfa modu veya kayıt bulunamadı");
                }

                setTableConfig(config);

                const initial: Record<string, any> = {};

                if (config.tableName === "YAYINLAR") {
                    initial.yayinId = data.yayinId;
                    initial.yayinBaslik = data.yayinBaslik ?? "";
                    initial.yayinUrl = data.yayinUrl ?? "";
                    initial.description = data.description ?? "";
                    initial.categoryId = data.categoryId ?? "";
                } else {
                    config.fields.forEach((f) => {
                        const lower = f.name.toLowerCase();
                        initial[f.name] = data[f.name] ?? data[lower] ?? (f.type === "number" ? 0 : "");
                    });
                }

                setFormData(initial);
                setHasLoaded(true);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Veri yüklenemedi");
                setTableConfig(null);
            } finally {
                setLoading(false);
            }
        },
        [isEventMode, isHaberMode, isKurumsalBMVIMode, isYonetimMode, isHizmetMode, isRaporMode, isYayinMode]
    );


    useEffect(() => setHasLoaded(false), [id]);
    useEffect(() => {
        if (id && !hasLoaded) fetchData(id);
    }, [id, hasLoaded, fetchData]);

    useEffect(() => {
        if (isYayinMode) {
            const loadCategories = async () => {
                try {
                    const data = await getAllYayinCategories();
                    setCategories(data);
                } catch (err) {
                    console.error("Kategoriler yüklenemedi", err);
                }
            };
            loadCategories();
        }
    }, [isYayinMode]);

    /* ------------------------------ Save ------------------------------ */
    const handleSave = async () => {
        setSaving(true);
        setError(null);
        try {
            if (isEventMode) {
                const payload = {
                    baslik: (formData.baslik ?? "").trim(),
                    tarih: (formData.tarih ?? "").trim(),
                    resimUrl: formData.resimUrl ?? "",
                    aciklama: formData.aciklama ?? "",
                };
                await apiPut(`/api/etkinlikler/update/${formData.id}`, payload);
                alert("Etkinlik güncellendi!");
                return;
            }

            // HİZMETLER SAVE
            if (isHizmetMode) {
                const payload = {
                    baslik: (formData.baslik ?? "").trim(),
                    imgUrl: (formData.imgUrl ?? "").trim(),
                    telefon: (formData.telefon ?? "").trim(),
                    konum: (formData.konum ?? "").trim(),
                    buttonDetay: (formData.buttonDetay ?? "").trim(),
                    buttonKonum: (formData.buttonKonum ?? "").trim(),
                    mail: (formData.mail ?? "").trim(),
                    kategori: (formData.kategori ?? "").trim(),
                };
                await apiPut(`/api/hizmetler/update/${formData.id}`, payload);
                alert("Hizmet güncellendi!");
                return;
            }
            // handleSave içinde:
            if (isRaporMode) {
                const payload = {
                    raporBaslik: (formData.raporBaslik ?? "").trim(),
                    raporUrl: (formData.raporUrl ?? "").trim(),
                    categoryId: Number(formData.categoryId) || 0,
                    raporTarihi: (formData.raporTarihi ?? "").trim() || undefined, // boşsa yollama
                    raporDurum: Boolean(formData.raporDurum),
                };
                await apiPut(`/api/raporlar/update/${formData.id}`, payload);
                alert("Rapor güncellendi!");
                return;
            }

            // HABERLER SAVE
            if (isHaberMode) {
                const payload = {
                    baslik: (formData.baslik ?? "").trim(),
                    tarih: (formData.tarih ?? "").trim(),
                    aciklama: formData.aciklama ?? "",
                    resim1: formData.resim1 ?? "",
                    resim2: formData.resim2 ?? "",
                    // backend kategori objesi bekliyorsa:
                    ...(formData.kategoriId ? {kategori: {id: Number(formData.kategoriId)}} : {}),
                    // eğer backend kategoriId bekliyorsa üst satırı silip bunu kullan:
                    // ...(formData.kategoriId ? { kategoriId: Number(formData.kategoriId) } : {}),
                };
                await apiPut(`/api/haberler/update/${formData.id}`, payload);
                alert("Haber güncellendi!");
                return;
            }

            if (isYayinMode) {
                const payload = {
                    yayinBaslik: (formData.yayinBaslik ?? "").trim(),
                    yayinUrl: (formData.yayinUrl ?? "").trim(),
                    description: formData.description ?? "",
                    categoryId: Number(formData.categoryId),
                };
                await apiPut(`${YAYINLAR_CONFIG.apiEndpoint}/update/${formData.yayinId}`, payload);
                alert("Yayın başarıyla güncellendi!");
                return;
            }

            if (
                isKurumsalBMVIMode &&
                tableConfig?.tableName === "KURUMSAL_BASKAN_MISYON_VIZYON_ILKELERIMIZ"
            ) {
                const updateData = {
                    resimUrl1: formData.resimUrl1 || "",
                    imageUrl2: formData.imageUrl2 || "",
                    icerik: formData.ICERIK,
                    kategori: formData.KATEGORI,
                    aktif: true,
                };
                await BaskanAPI.updateBaskan(formData.ID, updateData);
                alert("Kayıt başarıyla güncellendi!");
                return;
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Kaydetme sırasında hata oluştu");
        } finally {
            setSaving(false);
        }
    };

    /* ---------------------------- Form Fields ---------------------------- */
    const handleInputChange = (field: string, value: any) =>
        setFormData((p) => ({...p, [field]: value}));

    const handleCancel = () => {
        if (confirm("Değişiklikler kaydedilmedi. Sayfadan çıkmak istediğinizden emin misiniz?")) {
            if (isEventMode) window.location.href = "/panel/etkinlikler";
            else if (isHaberMode) window.location.href = "/panel/haberler";
            else if (isHizmetMode) window.location.href = "/panel/hizmetler";
            else if (isRaporMode) window.location.href = "/panel/kurumsal/raporlar";
            else if (isYayinMode) navigate("/panel/yayinlar");
            else window.location.href = "/panel/kurumsal/BMVI";
        }
    };

    const renderField = (field: FieldConfig) => {
        const value = formData[field.name] ?? "";
        const common =
            "w-full border border-slate-200/80 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500/60 focus:border-transparent bg-white/80";

        // Görsel benzeri alanlar için text + canlı küçük önizleme
        if (field.type === "text" && isImageLike(field.name)) {
            return (
                <>
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className={common}
                        placeholder={field.placeholder || "https://..."}
                    />
                    {renderImageThumb(value)}
                </>
            );
        }

        switch (field.type) {
            case "text":
                return (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className={common}
                        placeholder={field.placeholder || field.label}
                    />
                );
            case "number":
                return (
                    <input
                        type="number"
                        value={value}
                        onChange={(e) =>
                            handleInputChange(
                                field.name,
                                e.target.value === "" ? "" : parseInt(e.target.value, 10) || 0
                            )
                        }
                        className={common}
                        disabled={field.name.toLowerCase() === "id"}
                    />
                );
            case "textarea":
                return (
                    <textarea
                        value={value}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className={`${common} min-h-[140px]`}
                        rows={5}
                    />
                );
            case "select":
                if (isYayinMode && field.name === "categoryId") {
                    return (
                        <select
                            value={formData.categoryId ?? ''}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            className={common}
                        >
                            <option value="">Kategori Seçiniz</option>
                            {categories.map((cat) => (
                                <option key={cat.categoryId} value={cat.categoryId}>
                                    {cat.categoryName}
                                </option>
                            ))}
                        </select>
                    );
                }
                return (
                    <select
                        value={value}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className={common}
                    >
                        <option value="">Seçiniz...</option>
                        {field.options?.map((opt) => (
                            <option key={opt} value={opt}>
                                {opt.charAt(0).toUpperCase() + opt.slice(1)}
                            </option>
                        ))}
                    </select>
                );
            case "boolean":
                return (
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={Boolean(value)}
                            onChange={(e) => handleInputChange(field.name, e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                        />
                        <label className="text-sm text-slate-700">Aktif</label>
                    </div>
                );
            case "date":
                return (
                    <input
                        type="date"
                        value={value}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className={common}
                    />
                );
            case "image":
                return (
                    <>
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            className={common}
                            placeholder="Görsel URL"
                        />
                        {renderImageThumb(value)}
                    </>
                );
            default:
                return (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className={common}
                    />
                );
        }
    };

    /* ------------------------------ Render ------------------------------ */
    const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
        isInsidePanel ? <>{children}</> : <SimpleLayout>{children}</SimpleLayout>;

    if (loading) {
        return (
            <Wrapper>
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg">Yükleniyor...</div>
                </div>
            </Wrapper>
        );
    }

    if (!tableConfig) {
        return (
            <Wrapper>
                <div className="text-center py-8">
                    <AlertCircle size={64} className="mx-auto text-red-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-500 mb-1">Tablo bulunamadı</h3>
                    <p className="text-gray-400 mb-6">Bu tablo yapılandırması mevcut değil.</p>
                    <button
                        onClick={() =>
                            isEventMode
                                ? (window.location.href = "/panel/etkinlikler")
                                : isHaberMode
                                    ? (window.location.href = "/panel/haberler")
                                    : isHizmetMode
                                        ? (window.location.href = "/panel/hizmetler")
                                        : isRaporMode
                                            ? (window.location.href = "/panel/kurumsal/raporlar")
                                            : (window.location.href = "/panel/kurumsal/BMVI")
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                        Geri Dön
                    </button>
                </div>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <div className="sticky top-0 z-10 -mx-4 px-4 py-3 mb-6 bg-white/60 backdrop-blur-md border-b border-white/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => navigate(-1)} // En doğru çözüm, bir önceki sayfaya dönmek
                        className="p-2 rounded-lg ring-1 ring-slate-200 text-slate-600 hover:bg-slate-50"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800 leading-none">Sayfayı Düzenle</h2>
                        <p className="text-xs text-slate-500 mt-1">
                            {tableConfig.displayName} • ID: {id}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setDebugMode((v) => !v)}
                        className="px-3 py-2 rounded-lg text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-800"
                    >
                        {debugMode ? "Debug Gizle" : "Debug Göster"}
                    </button>
                    <button
                        onClick={() => setIsPreview((v) => !v)}
                        className="px-3 py-2 rounded-lg text-sm bg-white ring-1 ring-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                        <Eye size={16}/>
                        {isPreview ? "Düzenleme" : "Önizleme"}
                    </button>
                    <button
                        onClick={handleCancel}
                        className="px-3 py-2 rounded-lg bg-slate-500 hover:bg-slate-600 text-white text-sm flex items-center gap-2"
                    >
                        <X size={16}/>
                        İptal
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm flex items-center gap-2"
                    >
                        <Save size={16}/>
                        {saving ? "Kaydediliyor..." : "Kaydet"}
                    </button>
                </div>
            </div>

            {debugMode && (
                <DebugInfo
                    data={{
                        urlParams: { id },
                        mode: isEventMode
                            ? "event"
                            : isHaberMode
                                ? "haber"
                                : isHizmetMode
                                    ? "hizmet"
                                    : isRaporMode
                                        ? "rapor"
                                        : isYayinMode
                                            ? "yayin"
                                            : isKurumsalBMVIMode
                                                ? "kurumsal_bvmi"
                                                : "unknown",
                        tableConfig: tableConfig?.tableName,
                        formData,
                    }}
                />
            )}

            {/* Cam gövdeli kutu */}
            <div className="rounded-2xl p-6 bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)]">
                {!isPreview ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {tableConfig.fields.map((f) => (
                            <div key={f.name} className={f.type === "textarea" ? "lg:col-span-2" : ""}>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    {f.label}
                                    {f.required ? " *" : ""}
                                </label>
                                {renderField(f)}
                            </div>
                        ))}
                    </div>
                ) : (
                    /* ----------------------------- ÖNİZLEME ----------------------------- */
                    <div className="space-y-6">
                        <h1 className="text-2xl font-semibold text-slate-900">
                            {tableConfig.displayName} • Önizleme
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {tableConfig.fields.map((f) => {
                                const v = formData[f.name];
                                // boş değerleri atla
                                if (!v && v !== 0 && v !== false) return null;
                                const label = (
                                    <h3 className="font-medium text-slate-700 mb-2">{f.label}</h3>
                                );

                                // Görsel alanlarını IMG olarak göster
                                if (f.type === "image" || isImageLike(f.name)) {
                                    return (
                                        <div key={f.name} className="bg-white rounded-xl ring-1 ring-slate-200 p-4">
                                            {label}
                                            <div className="aspect-video w-full overflow-hidden rounded-lg bg-slate-100">
                                                <img
                                                    src={imageOrFallback(String(v))}
                                                    alt={f.label}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) =>
                                                        ((e.target as HTMLImageElement).src =
                                                            "/images/placeholder-16x9.jpg")
                                                    }
                                                />
                                            </div>
                                            <div className="mt-2 text-xs text-slate-500 break-all">
                                                {String(v)}
                                            </div>
                                        </div>
                                    );
                                }

                                // HTML içeriği varsa zengin göster
                                if (
                                    f.name.toLowerCase() === "icerik" ||
                                    f.label.toLowerCase().includes("içerik") ||
                                    f.type === "editor"
                                ) {
                                    const html = String(v || "");
                                    return (
                                        <div key={f.name}
                                             className="bg-white rounded-xl ring-1 ring-slate-200 p-4 md:col-span-2">
                                            {label}
                                            <div
                                                className="prose prose-slate max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-1"
                                                dangerouslySetInnerHTML={{__html: html}}
                                            />
                                        </div>
                                    );
                                }

                                // Tarihi okunur formatla
                                if (f.type === "date") {
                                    return (
                                        <div key={f.name} className="bg-white rounded-xl ring-1 ring-slate-200 p-4">
                                            {label}
                                            <span className="text-slate-700">
                                                {new Date(String(v)).toLocaleDateString("tr-TR")}
                                            </span>
                                        </div>
                                    );
                                }

                                // Boolean rozet
                                if (f.type === "boolean") {
                                    return (
                                        <div key={f.name} className="bg-white rounded-xl ring-1 ring-slate-200 p-4">
                                            {label}
                                            <span
                                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs ${
                                                    v ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"
                                                }`}>
                        {v ? "Aktif" : "Pasif"}
                      </span>
                                        </div>
                                    );
                                }

                                // Varsayılan metin/numara/seçim
                                return (
                                    <div key={f.name} className="bg-white rounded-xl ring-1 ring-slate-200 p-4">
                                        {label}
                                        <span className="text-slate-700 break-words">{String(v)}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </Wrapper>
    );
};

export default DynamicEditPageForm;