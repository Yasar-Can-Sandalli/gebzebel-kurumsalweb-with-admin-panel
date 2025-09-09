import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Save, X, AlertCircle, Eye, Upload, User, Edit, Building, Plus, Trash2 } from "lucide-react";
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
        apiEndpoint: "api/kurumsal/baskan-misyon-vizyon",
        fields: [
            { name: "resimUrl1", label: "Resim URL 1", type: "text" },
            { name: "imageUrl2", label: "Resim URL 2", type: "text" },
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
        apiEndpoint: "api/kurumsal/yonetim-semasi",
        fields: [
            { name: "isimSoyisim", label: "İsim Soyisim", type: "text", required: true },
            { name: "resimUrl", label: "Profil Fotoğrafı", type: "image" },
            { name: "pozisyon", label: "Pozisyon", type: "text", required: true },
            { name: "siraNo", label: "Sıra No", type: "number" },
            { name: "email", label: "E-posta", type: "text" },
            { name: "telefon", label: "Telefon", type: "text" },
            { name: "mudurlukler", label: "Müdürlükler", type: "textarea" },
            { name: "biyografi", label: "Biyografi", type: "textarea" },
            { name: "aktif", label: "Durum", type: "boolean" },
        ],
    },

    KURUMSAL_ETIK_ARABULUCULUK: {
        tableName: "KURUMSAL_ETIK_ARABULUCULUK",
        displayName: "Etik, Arabuluculuk",
        apiEndpoint: "api/kurumsal/etik-arabuluculuk",
        fields: [
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
// --- NEW: HİZMETLER ---
const HIZMETLER_CONFIG: TableConfig = {
    tableName: "HIZMETLER",
    displayName: "Hizmet",
    apiEndpoint: "api/hizmetler",
    fields: [
        { name: "baslik",       label: "Başlık",       type: "text",   required: true },
        { name: "imgUrl",       label: "Görsel URL",   type: "image" },
        { name: "telefon",      label: "Telefon",      type: "text" },
        { name: "konum",        label: "Konum",        type: "text" },
        { name: "buttonDetay",  label: "Buton (Detay)",type: "text" },
        { name: "buttonKonum",  label: "Buton (Konum)",type: "text" },
        { name: "mail",         label: "E-Posta",      type: "text" },
        { name: "kategori",     label: "Kategori",     type: "text" },
    ],
};


// --- NEW: HABERLER ---
const HABERLER_CONFIG: TableConfig = {
    tableName: "HABERLER",
    displayName: "Haber",
    apiEndpoint: "api/haberler",
    fields: [
        { name: "tarih",     label: "Tarih",      type: "date",   required: true },
        { name: "aciklama",  label: "Açıklama",   type: "textarea" },
        { name: "resim1",    label: "Resim 1 URL",type: "text" },
        { name: "resim2",    label: "Resim 2 URL",type: "text" },
        // Kategori listesini ileride select’e bağlayabiliriz; şimdilik ID ile güncelleyelim
        { name: "kategoriId",label: "Kategori ID",type: "number" },
    ],
};


/* -------------------------- ETKİNLİK KONFİG -------------------------- */
const EVENT_CONFIG: TableConfig = {
    tableName: "ETKINLIKLER",
    displayName: "Etkinlik",
    apiEndpoint: "api/etkinlikler",
    fields: [
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
    const isHaberMode = location.pathname.includes("/haberler/");
    const isEventMode = location.pathname.includes("/etkinlikler/");
    const isYonetimMode = location.pathname.includes("/kurumsal/yonetim");
    const isHizmetMode = location.pathname.includes("/hizmetler/");
    const lowerPath = location.pathname.toLowerCase();
    const isKurumsalBMVIMode =
        lowerPath.includes("/kurumsal/bmvi/");

    // Debug logging
    console.log("EditPage Debug:", {
        pathname: location.pathname,
        id,
        isYonetimMode,
        isInsidePanel,
        isHaberMode,
        isEventMode,
        isHizmetMode,
        isKurumsalBMVIMode
    });

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isPreview, setIsPreview] = useState(false);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [debugMode, setDebugMode] = useState(false);
    const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    /* ------------------------------ Helpers ------------------------------ */
    const isImageLike = (fieldName: string) =>
        /^(resim|image|img).*|.*(resim|image|img).*(url)?$/i.test(fieldName);

    const imageOrFallback = (url?: string) => {
        if (!url || url.trim() === "") return "/images/placeholder-16x9.jpg";
        
        // Eğer URL zaten tam URL ise (http ile başlıyorsa) olduğu gibi döndür
        if (url.startsWith('http')) return url;
        
        // Yönetim modunda yonetimsemasi klasörünü kullan
        if (isYonetimMode) {
            return `/images/yonetimsemasi/${url}`;
        }
        
        // Eğer yüklenen dosya ise (images klasöründen) API URL'i oluştur
        if (url.includes('images') || !url.includes('/')) {
            return `http://localhost:8080/api/files/image/${url}`;
        }
        
        return url;
    };

    // --- üst kısma istersen sabit değer:
    const THUMB_HEIGHT = "h-40"; // ~160px

    const renderImageThumb = (url?: string) => (
        <div className="mt-3">
            <div className={`w-full ${THUMB_HEIGHT} rounded-xl overflow-hidden bg-slate-50 ring-1 ring-slate-200 flex items-center justify-center`}>
                <img
                    src={imageOrFallback(url)}
                    alt="Önizleme"
                    className="max-h-full max-w-full object-cover"
                    onError={(e) => ((e.target as HTMLImageElement).src = "/images/placeholder-16x9.jpg")}
                />
            </div>
            {url && (
                <p className="text-xs text-slate-500 mt-2 text-center break-all">
                    📁 {url}
                </p>
            )}
        </div>
    );

    // Profil fotoğrafı yükleme
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 1 * 1024 * 1024) {
                setUploadMessage({ type: 'error', text: 'Dosya boyutu 1MB\'dan küçük olmalıdır.' });
                return;
            }
            
            if (!file.type.startsWith('image/')) {
                setUploadMessage({ type: 'error', text: 'Lütfen sadece resim dosyası seçin.' });
                return;
            }

            setUploading(true);
            setUploadMessage(null);

            try {
                const uploadFormData = new FormData();
                uploadFormData.append('file', file);
                // Yönetim modunda yonetimsemasi klasörünü kullan
                const directory = isYonetimMode ? 'yonetimsemasi' : 'images';
                uploadFormData.append('directory', directory);

                const response = await fetch('http://localhost:8080/api/files/upload', {
                    method: 'POST',
                    body: uploadFormData,
                });

                const result = await response.json();

                if (result.success) {
                    // Eski dosyayı sil (eğer varsa)
                    const currentValue = formData[fieldName];
                    if (currentValue && currentValue.trim() !== '') {
                        try {
                            const directory = isYonetimMode ? 'yonetimsemasi' : 'images';
                            await fetch(`http://localhost:8080/api/files/delete`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ 
                                    fileName: currentValue,
                                    directory: directory
                                }),
                            });
                        } catch (deleteError) {
                            console.warn('Eski dosya silinemedi:', deleteError);
                        }
                    }

                    // Yeni dosya adını form verisine kaydet
                    handleInputChange(fieldName, result.fileName);
                    setUploadMessage({ type: 'success', text: 'Resim başarıyla yüklendi.' });
                } else {
                    setUploadMessage({ type: 'error', text: result.message || 'Resim yüklenemedi.' });
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                setUploadMessage({ type: 'error', text: 'Resim yüklenirken hata oluştu.' });
            } finally {
                setUploading(false);
            }
        }
    };

    // Profil fotoğrafını kaldırma
    const removeImage = async (fieldName: string) => {
        const currentValue = formData[fieldName];
        if (currentValue && currentValue.trim() !== '') {
            try {
                const directory = isYonetimMode ? 'yonetimsemasi' : 'images';
                await fetch(`http://localhost:8080/api/files/delete`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        fileName: currentValue,
                        directory: directory
                    }),
                });
            } catch (deleteError) {
                console.warn('Dosya silinemedi:', deleteError);
            }
        }
        
        handleInputChange(fieldName, '');
        setUploadMessage({ type: 'success', text: 'Resim kaldırıldı.' });
    };

    /* ------------------------------ Fetch ------------------------------ */
    const fetchData = useCallback(
        async (recordId: string) => {
            setLoading(true);
            setError(null);
            try {
                const numericId = parseInt(recordId, 10);

                /* HABERLER */
                if (isHaberMode) {
                    let data: any;
                    try {
                        data = await apiGet<any>(`${HABERLER_CONFIG.apiEndpoint}/${numericId}`);
                    } catch {
                        const all = await apiGet<any[]>(HABERLER_CONFIG.apiEndpoint);
                        data = all.find((x) => x.id === numericId);
                    }
                    if (!data) throw new Error("Record not found");

                    setTableConfig(HABERLER_CONFIG);
                    setFormData({
                        id: data.id ?? "",
                        baslik: data.baslik ?? "",
                        tarih: data.tarih ?? "",
                        aciklama: data.aciklama ?? "",
                        resim1: data.resim1 ?? "",
                        resim2: data.resim2 ?? "",
                        kategoriId: data.kategori?.id ?? "",
                        kategori: data.kategori ?? null, // elde dursun
                    });
                    setHasLoaded(true);
                    return;
                }

                /* ETKİNLİK */
                if (isEventMode) {
                    let data: any;
                    try {
                        data = await apiGet<any>(`api/etkinlikler/${numericId}`);
                    } catch {
                        const all = await apiGet<any[]>("api/etkinlikler");
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

                if (isHizmetMode) {
                    let data: any;
                    try {
                        data = await apiGet<any>(`${HIZMETLER_CONFIG.apiEndpoint}/${numericId}`);
                    } catch {
                        const all = await apiGet<any[]>(HIZMETLER_CONFIG.apiEndpoint);
                        data = all.find((x) => x.id === numericId);
                    }
                    if (!data) throw new Error("Record not found");

                    setTableConfig(HIZMETLER_CONFIG);
                    setFormData({
                        id:           data.id ?? "",
                        baslik:       data.baslik ?? "",
                        imgUrl:       data.imgUrl ?? "",
                        telefon:      data.telefon ?? "",
                        konum:        data.konum ?? "",
                        buttonDetay:  data.buttonDetay ?? "",
                        buttonKonum:  data.buttonKonum ?? "",
                        mail:         data.mail ?? "",
                        kategori:     data.kategori ?? "",
                    });
                    setHasLoaded(true);
                    return;
                }

                /* YÖNETİM ŞEMASI */
                if (isYonetimMode) {
                    console.log("Yönetim mode detected, fetching data for ID:", numericId);
                    const cfg = TABLE_CONFIGS["kurumsal_yonetim_semasi"];
                    console.log("API endpoint:", `${cfg.apiEndpoint}/${numericId}`);
                    const raw = await apiGet<any>(`${cfg.apiEndpoint}/${numericId}`);
                    console.log("Raw API response:", raw);
                    const data = (raw && (raw.data ?? raw)) || null;
                    console.log("Processed data:", data);
                    if (!data) throw new Error("Record not found");

                    const initial: Record<string, any> = {
                        id: data.id ?? "",
                        isimSoyisim: data.isimSoyisim ?? "",
                        resimUrl: data.resimUrl ?? "",
                        pozisyon: data.pozisyon ?? "",
                        siraNo: data.siraNo ?? "",
                        email: data.email ?? "",
                        telefon: data.telefon ?? "",
                        mudurlukler: data.mudurlukler ?? "",
                        biyografi: data.biyografi ?? "",
                        aktif: data.delta === 1, // delta field'ını aktif boolean'ına çevir
                    };

                    setTableConfig(cfg);
                    setFormData(initial);
                    setHasLoaded(true);
                    return;
                }

                /* KURUMSAL: BVMI */
                if (isKurumsalBMVIMode) {
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
                    return;
                }

                throw new Error("Uygun sayfa modu bulunamadı");
            } catch (err) {
                console.error("Error in fetchData:", err);
                setError(err instanceof Error ? err.message : "Failed to load data");
                setTableConfig(null);
            } finally {
                setLoading(false);
            }
        },
        [isEventMode, isHaberMode, isKurumsalBMVIMode, isYonetimMode, isHizmetMode]
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
                await apiPut(`api/etkinlikler/update/${formData.id}`, payload);
                alert("Etkinlik güncellendi!");
                return;
            }

            // HİZMETLER SAVE
            if (isHizmetMode) {
                const payload = {
                    baslik:      (formData.baslik ?? "").trim(),
                    imgUrl:      (formData.imgUrl ?? "").trim(),
                    telefon:     (formData.telefon ?? "").trim(),
                    konum:       (formData.konum ?? "").trim(),
                    buttonDetay: (formData.buttonDetay ?? "").trim(),
                    buttonKonum: (formData.buttonKonum ?? "").trim(),
                    mail:        (formData.mail ?? "").trim(),
                    kategori:    (formData.kategori ?? "").trim(),
                };
                await apiPut(`api/hizmetler/update/${formData.id}`, payload);
                alert("Hizmet güncellendi!");
                return;
            }

            // HABERLER SAVE
            if (isHaberMode) {
                const payload = {
                    baslik: (formData.baslik ?? "").trim(),
                    tarih:  (formData.tarih  ?? "").trim(),
                    aciklama: formData.aciklama ?? "",
                    resim1:   formData.resim1 ?? "",
                    resim2:   formData.resim2 ?? "",
                    // backend kategori objesi bekliyorsa:
                    ...(formData.kategoriId ? { kategori: { id: Number(formData.kategoriId) } } : {}),
                    // eğer backend kategoriId bekliyorsa üst satırı silip bunu kullan:
                    // ...(formData.kategoriId ? { kategoriId: Number(formData.kategoriId) } : {}),
                };
                await apiPut(`api/haberler/update/${formData.id}`, payload);
                alert("Haber güncellendi!");
                return;
            }

            // YÖNETİM ŞEMASI SAVE
            if (isYonetimMode) {
                const payload = {
                    id: Number(formData.id),
                    isimSoyisim: (formData.isimSoyisim ?? "").trim(),
                    resimUrl: (formData.resimUrl ?? "").trim(),
                    pozisyon: (formData.pozisyon ?? "").trim(),
                    siraNo: formData.siraNo ? Number(formData.siraNo) : null,
                    mudurlukler: (formData.mudurlukler ?? "").trim(),
                    email: (formData.email ?? "").trim(),
                    telefon: (formData.telefon ?? "").trim(),
                    biyografi: (formData.biyografi ?? "").trim(),
                    delta: formData.aktif ? 1 : 0, // aktif field'ını delta'ya çevir
                };
                await apiPut(`api/kurumsal/yonetim-semasi/${formData.id}`, payload);
                alert("Yönetim kaydı güncellendi!");
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
    const handleInputChange = useCallback((field: string, value: any) => {
        setFormData((p) => ({ ...p, [field]: value }));
    }, []);

    const handleCancel = () => {
        if (confirm("Değişiklikler kaydedilmedi. Sayfadan çıkmak istediğinizden emin misiniz?")) {
            // Hızlı yönlendirme için navigate kullan
            if (isEventMode) navigate("/panel/etkinlikler");
            else if (isHaberMode) navigate("/panel/haberler");
            else if (isYonetimMode) navigate("/panel/kurumsal/yonetim");
            else if (isHizmetMode) navigate("/panel/hizmetler");
            else if (tableConfig && tableConfig.tableName.startsWith("KURUMSAL_"))
                navigate("/panel/kurumsal/BMVI");
            else navigate(-1);
        }
    };

    // Müdürlükler için özel render fonksiyonu
    const renderMudurluklerField = (field: FieldConfig) => {
        const value = formData[field.name] ?? "";
        const mudurluklerList = value ? (typeof value === 'string' ? JSON.parse(value) : value) : [];
        const [newMudurluk, setNewMudurluk] = useState('');

        const addMudurluk = () => {
            if (newMudurluk.trim()) {
                const updatedList = [...mudurluklerList, newMudurluk.trim()];
                handleInputChange(field.name, JSON.stringify(updatedList));
                setNewMudurluk('');
            }
        };

        const removeMudurluk = (index: number) => {
            const updatedList = mudurluklerList.filter((_: any, i: number) => i !== index);
            handleInputChange(field.name, JSON.stringify(updatedList));
        };

        return (
            <div className="space-y-4">
                {/* Mevcut müdürlükler listesi */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Mevcut Müdürlükler</label>
                    {mudurluklerList.length > 0 ? (
                        <div className="space-y-2">
                            {mudurluklerList.map((mudurluk: string, index: number) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                                    <span className="text-sm text-slate-700">{mudurluk}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeMudurluk(index)}
                                        className="p-1 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                                        title="Müdürlüğü Sil"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-4 text-center text-slate-500 bg-slate-50 rounded-lg border border-slate-200">
                            Henüz müdürlük eklenmemiş
                        </div>
                    )}
                </div>

                {/* Yeni müdürlük ekleme */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Yeni Müdürlük Ekle</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newMudurluk}
                            onChange={(e) => setNewMudurluk(e.target.value)}
                            placeholder="Müdürlük adını girin..."
                            className="flex-1 border border-slate-200/80 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500/60 focus:border-transparent bg-white/80"
                            onKeyPress={(e) => e.key === 'Enter' && addMudurluk()}
                        />
                        <button
                            type="button"
                            onClick={addMudurluk}
                            disabled={!newMudurluk.trim()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                        >
                            <Plus size={16} />
                            Ekle
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const renderField = (field: FieldConfig) => {
        const value = formData[field.name] ?? "";
        const common =
            "w-full border border-slate-200/80 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500/60 focus:border-transparent bg-white/80";

        // Görsel benzeri alanlar için sadece upload + önizleme
        if (field.type === "text" && isImageLike(field.name)) {
            return (
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <label className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                            <Upload size={16} />
                            <span className="font-medium">
                                {uploading ? 'Yükleniyor...' : 'Profil Fotoğrafı Yükle'}
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e, field.name)}
                                className="hidden"
                                disabled={uploading}
                            />
                        </label>
                        {value && (
                            <button
                                type="button"
                                onClick={() => removeImage(field.name)}
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                <X size={16} />
                                <span className="font-medium">Kaldır</span>
                            </button>
                        )}
                    </div>
                    {renderImageThumb(value)}
                </div>
            );
        }

        switch (field.type) {
            case "text":
                return (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => {
                            const newValue = e.target.value;
                            handleInputChange(field.name, newValue);
                        }}
                        className={common}
                        placeholder={field.placeholder || field.label}
                    />
                );
            case "number":
                return (
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => {
                            const newValue = e.target.value === "" ? "" : parseInt(e.target.value, 10) || 0;
                            // Sıra No için minimum 1 kontrolü
                            if (field.name.toLowerCase() === "sirano" && typeof newValue === 'number' && newValue < 1) {
                                setUploadMessage({ type: 'error', text: 'Sıra No 1\'den küçük olamaz.' });
                                return;
                            }
                            handleInputChange(field.name, newValue);
                        }}
                        min={field.name.toLowerCase() === "sirano" ? 1 : undefined}
                        className={common}
                        disabled={field.name.toLowerCase() === "id"}
                    />
                );
            case "textarea":
                return (
                    <div className="space-y-2">
                        <textarea
                            value={value}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                handleInputChange(field.name, newValue);
                            }}
                            className={`${common} min-h-[140px]`}
                            rows={5}
                            placeholder={field.name.toLowerCase().includes('mudurluk') 
                                ? "Her satıra bir müdürlük yazın:\nÖrnek:\nMüdürlük 1\nMüdürlük 2\nMüdürlük 3" 
                                : field.placeholder || field.label
                            }
                        />
                        {field.name.toLowerCase().includes('mudurluk') && (
                            <p className="text-xs text-slate-500">
                                💡 Her satıra bir müdürlük yazın. JSON formatına gerek yok.
                            </p>
                        )}
                    </div>
                );
            case "select":
                return (
                    <select
                        value={value}
                        onChange={(e) => {
                            const newValue = e.target.value;
                            handleInputChange(field.name, newValue);
                        }}
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
                            onChange={(e) => {
                                const newValue = e.target.checked;
                                handleInputChange(field.name, newValue);
                            }}
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
                        onChange={(e) => {
                            const newValue = e.target.value;
                            handleInputChange(field.name, newValue);
                        }}
                        className={common}
                    />
                );
            case "image":
                return (
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <label className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                <Upload size={16} />
                                <span className="font-medium">
                                    {uploading ? 'Yükleniyor...' : 'Resim Yükle'}
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(e, field.name)}
                                    className="hidden"
                                    disabled={uploading}
                                />
                            </label>
                            {value && (
                                <button
                                    type="button"
                                    onClick={() => removeImage(field.name)}
                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    <X size={16} />
                                    <span className="font-medium">Kaldır</span>
                                </button>
                            )}
                        </div>
                        {renderImageThumb(value)}
                    </div>
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
                    <div className="text-lg">Loading... (ID: {id}, Mode: {isYonetimMode ? 'Yönetim' : 'Other'})</div>
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
            {/* Sticky üst bar (cam efektli) */}
            <div className="sticky top-0 z-10 -mx-4 px-4 py-3 mb-6 bg-white/60 backdrop-blur-md border-b border-white/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => {
                            if (isEventMode) navigate("/panel/etkinlikler");
                            else if (isHaberMode) navigate("/panel/haberler");
                            else if (isYonetimMode) navigate("/panel/kurumsal/yonetim");
                            else if (isHizmetMode) navigate("/panel/hizmetler");
                            else if (tableConfig && tableConfig.tableName.startsWith("KURUMSAL_"))
                                navigate("/panel/kurumsal/BMVI");
                            else navigate(-1);
                        }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        title="Geri Dön"
                    >
                        <ArrowLeft size={16} />
                        <span className="text-sm font-medium">Geri Dön</span>
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
                        <Eye size={16} />
                        {isPreview ? "Düzenleme" : "Önizleme"}
                    </button>

                    <button
                        onClick={handleCancel}
                        className="px-3 py-2 rounded-lg bg-slate-500 hover:bg-slate-600 text-white text-sm flex items-center gap-2"
                    >
                        <X size={16} />
                        İptal
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm flex items-center gap-2"
                    >
                        <Save size={16} />
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
                                    : isKurumsalBMVIMode
                                        ? "kurumsal_bvmi"
                                        : "unknown",
                        tableConfig: tableConfig?.tableName,
                        formData,
                    }}
                />
            )}

            {/* Error Message */}
            {error && (
                <div className="p-4 rounded-lg mb-4 bg-red-50 text-red-700 border border-red-200">
                    {error}
                </div>
            )}

            {/* Upload Message */}
            {uploadMessage && (
                <div className={`p-4 rounded-lg mb-4 ${
                    uploadMessage.type === 'success' 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                    {uploadMessage.text}
                </div>
            )}

            {/* 3 Kartlı Düzen */}
            <div className="space-y-6">
                {!isPreview ? (
                    <>
                        {/* 1. Kart: Profil Fotoğrafı */}
                        {isYonetimMode && (
                            <div className="rounded-2xl p-6 bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)]">
                                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                    <User size={20} />
                                    Profil Fotoğrafı
                                </h3>
                                {tableConfig.fields
                                    .filter(f => f.type === "image" || isImageLike(f.name))
                                    .map((f) => (
                                        <div key={f.name}>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                {f.label}
                                                {f.required ? " *" : ""}
                                            </label>
                                            {renderField(f)}
                                        </div>
                                    ))}
                            </div>
                        )}

                        {/* 2. Kart: Diğer Alanlar */}
                        <div className="rounded-2xl p-6 bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)]">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Edit size={20} />
                                Genel Bilgiler
                            </h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {tableConfig.fields
                                    .filter(f => f.name.toLowerCase() !== 'mudurlukler' && f.type !== "image" && !isImageLike(f.name))
                                    .map((f) => (
                                        <div key={f.name} className={f.type === "textarea" && f.name.toLowerCase() !== 'mudurlukler' ? "lg:col-span-2" : ""}>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                {f.label}
                                                {f.required ? " *" : ""}
                                            </label>
                                            {renderField(f)}
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* 3. Kart: Müdürlükler */}
                        {isYonetimMode && (
                            <div className="rounded-2xl p-6 bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)]">
                                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                    <Building size={20} />
                                    Müdürlükler
                                </h3>
                                {tableConfig.fields
                                    .filter(f => f.name.toLowerCase().includes('mudurluk'))
                                    .map((f) => (
                                        <div key={f.name}>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                {f.label}
                                                {f.required ? " *" : ""}
                                            </label>
                                            {renderMudurluklerField(f)}
                                        </div>
                                    ))}
                            </div>
                        )}
                    </>
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
                                        <div key={f.name} className="bg-white rounded-xl ring-1 ring-slate-200 p-4 md:col-span-2">
                                            {label}
                                            <div
                                                className="prose prose-slate max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-1"
                                                dangerouslySetInnerHTML={{ __html: html }}
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
                                                }`}
                                            >
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