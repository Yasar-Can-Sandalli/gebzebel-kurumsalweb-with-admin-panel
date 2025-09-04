import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Save, X, AlertCircle, Eye } from "lucide-react";
import { BaskanAPI } from "../services/pageService";
import { apiGet, apiPut } from "../services/apiService";

/* ------------------------- Basit Layout ------------------------- */
const SimpleLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
);

const DebugInfo: React.FC<{ data: any }> = ({ data }) => (
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
            { name: "ID", label: "ID", type: "number" },
            { name: "resimUrl1", label: "Resim URL 1", type: "text" },
            { name: "imageUrl2", label: "Resim URL 2", type: "text" },
            { name: "BASLIK", label: "Başlık", type: "text", required: true },
            { name: "ICERIK", label: "İçerik", type: "textarea", required: true },
            { name: "DELTA", label: "Delta", type: "text" },
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
            { name: "ID", label: "ID", type: "number" },
            { name: "isimSoyisim", label: "Isim Soyisim", type: "text" },
            { name: "resimUrl", label: "resimUrl", type: "text" },
            { name: "pozisyon", label: "pozisyon", type: "text" },
            { name: "siraNo", label: "siraNo", type: "text" },
            { name: "mudurlukler", label: "mudurlukler", type: "textarea" },
            { name: "delta", label: "delta", type: "text", required: true },
            { name: "email", label: "email", type: "text", required: true },
            { name: "telefon", label: "telefon", type: "text", required: true },
            { name: "biyografi", label: "biyografi", type: "textarea", required: true },
        ],
    },

    KURUMSAL_ETIK_ARABULUCULUK: {
        tableName: "KURUMSAL_ETIK_ARABULUCULUK",
        displayName: "Etik, Arabuluculuk",
        apiEndpoint: "/api/kurumsal/etik-arabuluculuk",
        fields: [
            { name: "ID", label: "ID", type: "number" },
            { name: "Ad", label: "AD", type: "text" },
            { name: "unvan", label: "unvan", type: "text" },
            { name: "gorev", label: "gorev", type: "text" },
            { name: "tip", label: "tip", type: "text", required: true },
            { name: "ilke", label: "ilke", type: "textarea", required: true },
            { name: "delta", label: "delta", type: "text", required: true },
            { name: "resimUrl", label: "resim Url", type: "text" },
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

/* -------------------------- ETKİNLİK KONFİG -------------------------- */
const EVENT_CONFIG: TableConfig = {
    tableName: "ETKINLIKLER",
    displayName: "Etkinlik",
    apiEndpoint: "/api/etkinlikler",
    fields: [
        { name: "id", label: "ID", type: "number" },
        { name: "baslik", label: "Başlık", type: "text", required: true },
        { name: "tarih", label: "Tarih", type: "date", required: true },
        { name: "resimUrl", label: "Resim URL", type: "text" },
        { name: "aciklama", label: "Açıklama", type: "textarea" },
    ],
};

/* =============================== KOMPONENT =============================== */
const DynamicEditPageForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    const isInsidePanel = location.pathname.startsWith("/panel/");
    const isEventMode = location.pathname.includes("/etkinlikler/");
    const isYonetimMode = location.pathname.includes("/kurumsal/yonetim");

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isPreview, setIsPreview] = useState(false);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [debugMode, setDebugMode] = useState(true);
    const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
    const [hasLoaded, setHasLoaded] = useState(false);

    /* ------------------------------ Fetch ------------------------------ */
    const fetchData = useCallback(
        async (recordId: string) => {
            setLoading(true);
            setError(null);
            try {
                const numericId = parseInt(recordId, 10);

                /* 1) ETKİNLİK */
                if (isEventMode) {
                    let data: any;
                    try {
                        data = await apiGet<any>(`/api/etkinlikler/${numericId}`);
                    } catch {
                        const all = await apiGet<any[]>("/api/etkinlikler");
                        data = all.find((x) => x.id === numericId);
                    }
                    if (!data) throw new Error("Record not found");

                    setTableConfig(EVENT_CONFIG);
                    setFormData({
                        id: data.id ?? "",
                        baslik: data.baslik ?? "",
                        tarih: data.tarih ?? "",
                        resimUrl: data.resimUrl ?? "",
                        aciklama: data.aciklama ?? "",
                    });
                    setHasLoaded(true);
                    return;
                }

                /* 2) YÖNETİM ŞEMASI — ÖNCE bunu dene */
                if (isYonetimMode) {
                    const cfg = TABLE_CONFIGS["kurumsal_yonetim_semasi"];
                    // apiGet’in dönüşü bazı projelerde direkt body, bazılarında {data} olabiliyor.
                    const raw = await apiGet<any>(`${cfg.apiEndpoint}/${numericId}`);
                    const data = (raw && (raw.data ?? raw)) || null;
                    if (!data) throw new Error("Record not found");

                    const initial: Record<string, any> = {};
                    cfg.fields.forEach((f) => {
                        const lower = f.name.toLowerCase();
                        initial[f.name] = data[f.name] ?? data[lower] ?? (f.type === "number" ? 0 : "");
                    });

                    setTableConfig(cfg);
                    setFormData(initial);
                    setHasLoaded(true);
                    return;
                }

                /* 3) KURUMSAL: Baskan/Misyon/Vizyon/İlkeler fallback */
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
                if (!foundData) throw new Error("Record not found");

                const tableKey = CATEGORY_TO_TABLE[foundData.kategori || category];
                const config = TABLE_CONFIGS[tableKey];

                const initial: Record<string, any> = {};
                config.fields.forEach((f) => {
                    const lower = f.name.toLowerCase();
                    initial[f.name] =
                        (foundData as any)[f.name] ??
                        (foundData as any)[lower] ??
                        (f.type === "number" ? 0 : "");
                });

                setTableConfig(config);
                setFormData(initial);
                setHasLoaded(true);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load data");
                setTableConfig(null);
            } finally {
                setLoading(false);
            }
        },
        [isEventMode, isYonetimMode]
    );


    useEffect(() => setHasLoaded(false), [id]);
    useEffect(() => {
        if (id && !hasLoaded) fetchData(id);
    }, [id, hasLoaded, fetchData]);

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

            // Kurumsal: mevcut akış
            const current = tableConfig?.tableName;
            if (current === "KURUMSAL_BASKAN_MISYON_VIZYON_ILKELERIMIZ") {
                const updateData = {
                    baslik: formData.BASLIK || "",
                    resimUrl1: formData.resimUrl1 || "",
                    imageUrl2: formData.imageUrl2 || "",
                    icerik: formData.ICERIK,
                    kategori: formData.KATEGORI,
                    aktif: true,
                };
                await BaskanAPI.updateBaskan(formData.ID, updateData);
                alert("Kayıt başarıyla güncellendi!");
            }
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Kaydetme sırasında hata oluştu"
            );
        } finally {
            setSaving(false);
        }
    };

    /* ---------------------------- Helpers ---------------------------- */
    const handleInputChange = (field: string, value: any) =>
        setFormData((p) => ({ ...p, [field]: value }));

    const handleCancel = () => {
        if (
            confirm("Değişiklikler kaydedilmedi. Sayfadan çıkmak istediğinizden emin misiniz?")
        ) {
            if (isEventMode) window.location.href = "/panel/etkinlikler";
            else if (tableConfig && tableConfig.tableName.startsWith("KURUMSAL_"))
                window.location.href = "/panel/sayfalar/kurumsal";
            else navigate(-1);
        }
    };

    const togglePreview = () => setIsPreview((v) => !v);

    const renderField = (field: FieldConfig) => {
        const value = formData[field.name] ?? "";
        switch (field.type) {
            case "text":
                return (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={field.name.toLowerCase() === "id"}
                    />
                );
            case "textarea":
                return (
                    <textarea
                        value={value}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={4}
                    />
                );
            case "select":
                return (
                    <select
                        value={value}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={Boolean(value)}
                            onChange={(e) => handleInputChange(field.name, e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 text-sm text-gray-700">Aktif</label>
                    </div>
                );
            case "date":
                return (
                    <input
                        type="date"
                        value={value}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                );
            default:
                return (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    <div className="text-lg">Loading...</div>
                </div>
            </Wrapper>
        );
    }

    if (!tableConfig) {
        return (
            <Wrapper>
                <div className="text-center py-8">
                    <AlertCircle size={64} className="mx-auto text-red-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-500 mb-1">
                        Tablo bulunamadı
                    </h3>
                    <p className="text-gray-400 mb-4">
                        Bu tablo yapılandırması mevcut değil.
                    </p>
                    <div className="text-sm text-gray-600 mb-4">
                        Available tables: {Object.keys(TABLE_CONFIGS).join(", ")}
                    </div>
                    <button
                        onClick={() =>
                            isEventMode
                                ? (window.location.href = "/panel/etkinlikler")
                                : navigate("/panel/sayfalar/kurumsal")
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
            {debugMode && (
                <DebugInfo
                    data={{
                        urlParams: { id },
                        mode: isEventMode ? "event" : "kurumsal",
                        tableConfig: tableConfig?.tableName,
                        formData,
                    }}
                />
            )}

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <button
                        onClick={() =>
                            isEventMode ? (window.location.href = "/panel/etkinlikler") : navigate(-1)
                        }
                        className="mr-4 p-2 text-gray-500 hover:text-gray-700 border rounded"
                    >
                        <ArrowLeft size={20} />
                    </button>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Sayfayı Düzenle</h2>
                    <p className="text-gray-500">
                        {tableConfig.displayName} - ID: {id}
                    </p>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => setDebugMode((v) => !v)}
                        className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-4 py-2 rounded-lg text-sm"
                    >
                        {debugMode ? "Hide" : "Show"} Debug
                    </button>
                    <button
                        onClick={togglePreview}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center"
                    >
                        <Eye size={16} className="mr-2" />
                        {isPreview ? "Düzenleme" : "Önizleme"}
                    </button>
                    <button
                        onClick={handleCancel}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center"
                    >
                        <X size={16} className="mr-2" />
                        İptal
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center"
                    >
                        <Save size={16} className="mr-2" />
                        {saving ? "Kaydediliyor..." : "Kaydet"}
                    </button>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                        <AlertCircle size={20} className="text-red-600 mr-2" />
                        <div>
                            <h3 className="text-red-800 font-medium">Hata</h3>
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Form */}
            <div className="bg-white rounded-lg shadow p-6">
                {!isPreview ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {tableConfig.fields.map((f) => (
                            <div
                                key={f.name}
                                className={f.type === "textarea" ? "lg:col-span-2" : ""}
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {f.label}
                                    {f.required ? " *" : ""}
                                </label>
                                {renderField(f)}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold text-gray-900">
                            {tableConfig.displayName} - Önizleme
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {tableConfig.fields.map((f) => {
                                const v = formData[f.name];
                                if (!v && v !== 0 && v !== false) return null;
                                return (
                                    <div key={f.name}>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="font-medium text-gray-700 mb-2">
                                                {f.label}
                                            </h3>
                                            <span className="text-gray-600">{String(v)}</span>
                                        </div>
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
