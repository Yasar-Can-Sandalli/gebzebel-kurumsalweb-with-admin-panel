import React, {useState, useEffect, useCallback} from "react";
import {useParams, useNavigate, useLocation} from "react-router-dom";
import {ArrowLeft, Save, X, AlertCircle, Eye} from "lucide-react";
import {BaskanAPI} from "../services/pageService";
import {apiGet, apiPut} from "../services/apiService";

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


// herhangi bir objeden güvenli ID çek
const extractId = (obj: any) =>
    obj?.id ?? obj?.ID ?? obj?.raporId ?? obj?.RAPOR_ID ?? obj?.raporid ?? obj?.RAPORID ?? null;

// objeden ilk dolu değeri al (farklı yazımları tolere eder)
const pick = (obj: any, ...keys: string[]) => {
    for (const k of keys) {
        if (obj?.[k] != null) return obj[k];
        const lower = k.toLowerCase();
        const upper = k.toUpperCase();
        if (obj?.[lower] != null) return obj[lower];
        if (obj?.[upper] != null) return obj[upper];
    }
    return "";
};

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
    const lowerPath = location.pathname.toLowerCase();
    const isKurumsalBMVIMode =
        lowerPath.includes("/kurumsal/bmvi/");

    const goBackToList = () => {
        if (isEventMode) return "/panel/etkinlikler";
        if (isHaberMode) return "/panel/haberler";
        if (isHizmetMode) return "/panel/hizmetler";
        if (isRaporMode) return "/panel/kurumsal/raporlar";
        if (isYonetimMode) return "/panel/kurumsal/yonetim";   // 🔴 yeni
        if (isKurumsalBMVIMode) return "/panel/kurumsal/BMVI";
        return "/panel";
    };


    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isPreview, setIsPreview] = useState(false);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [debugMode, setDebugMode] = useState(false);
    const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
    const [hasLoaded, setHasLoaded] = useState(false);

    const fieldRefs = React.useRef<Record<string, HTMLTextAreaElement | HTMLInputElement | null>>({});
    const caretRef = React.useRef<{ name: string; start: number; end: number } | null>(null);

    // 🔴 yeni:
    const lastFocusedRef = React.useRef<string | null>(null);
    const rememberFocus = (name: string) => () => { lastFocusedRef.current = name; };

// 🔁 formData her değiştiğinde odağı kesin olarak geri ver
    useEffect(() => {
        const name = caretRef.current?.name ?? lastFocusedRef.current;
        if (!name) return;

        const el = fieldRefs.current[name];
        if (el) {
            el.focus({ preventScroll: true });                 // odak her seferinde geri ver
            if (caretRef.current && "setSelectionRange" in el) {
                const { start, end } = caretRef.current;
                try { (el as HTMLInputElement | HTMLTextAreaElement).setSelectionRange(start, end); } catch {}
            }
        }
        caretRef.current = null;
    }, [formData]);


    // Yalnızca textarea için change handler (imleç kaydetme)
    const handleTextAreaChange = (field: string) =>
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const { selectionStart, selectionEnd, value } = e.target;
            caretRef.current = {
                name: field,
                start: selectionStart ?? value.length,
                end: selectionEnd ?? value.length,
            };
            setFormData((p) => ({ ...p, [field]: value }));
        };

// Form data güncellenince odağı geri yükle
    useEffect(() => {
        if (!caretRef.current) return;
        const { name, start, end } = caretRef.current;
        const el = fieldRefs.current[name];
        // Sadece odak kaybolmuşsa geri ver
        if (el && document.activeElement !== el) {
            el.focus({ preventScroll: true });
            try { el.setSelectionRange(start, end); } catch {}
        }
        caretRef.current = null;
    }, [formData]);


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


                /* RAPORLAR */
                if (isRaporMode) {
                    let data: any;
                    try {
                        data = await apiGet<any>(`${RAPORLAR_CONFIG.apiEndpoint}/find/${numericId}`);
                    } catch {
                        try {
                            const all = await apiGet<any[]>(`${RAPORLAR_CONFIG.apiEndpoint}/list`);
                            data = all.find((x) => extractId(x) === numericId);
                        } catch {
                            const all2 = await apiGet<any[]>(RAPORLAR_CONFIG.apiEndpoint);
                            data = all2.find((x) => extractId(x) === numericId);
                        }
                    }
                    if (!data) throw new Error("Record not found");

                    const theId = extractId(data); //  ID’yi tek noktadan çek
                    setTableConfig(RAPORLAR_CONFIG);
                    setFormData({
                        id: theId ?? "", //  formData.id ARTIK DOLU
                        raporBaslik: pick(data, "raporBaslik", "RAPOR_BASLIK"),
                        raporUrl: pick(data, "raporUrl", "RAPOR_URL"),
                        categoryId: pick(data, "categoryId", "CATEGORY_ID") || 0,
                        raporDurum: pick(data, "raporDurum", "RAPOR_DURUM") ?? false,
                        raporTarihi: (pick(data, "raporTarihi", "RAPOR_TARIHI") || "")
                            .toString()
                            .slice(0, 10),
                    });
                    setHasLoaded(true);
                    return;
                }


                /* ETKİNLİK */
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
                        id: data.id ?? "",
                        baslik: data.baslik ?? "",
                        imgUrl: data.imgUrl ?? "",
                        telefon: data.telefon ?? "",
                        konum: data.konum ?? "",
                        buttonDetay: data.buttonDetay ?? "",
                        buttonKonum: data.buttonKonum ?? "",
                        mail: data.mail ?? "",
                        kategori: data.kategori ?? "",
                    });
                    setHasLoaded(true);
                    return;
                }

                /* YÖNETİM ŞEMASI */
                if (isYonetimMode) {
                    const cfg = TABLE_CONFIGS["kurumsal_yonetim_semasi"];

                    // /:id -> /find/:id -> /list ya da / (fallback) sırasıyla dene
                    let data: any;
                    try {
                        data = await apiGet<any>(`${cfg.apiEndpoint}/${numericId}`);
                    } catch {
                        try {
                            data = await apiGet<any>(`${cfg.apiEndpoint}/find/${numericId}`);
                        } catch {
                            const all = await apiGet<any[]>(`${cfg.apiEndpoint}/list`)
                                .catch(() => apiGet<any[]>(cfg.apiEndpoint));
                            data = all.find((x) => extractId(x) === numericId);
                        }
                    }
                    if (!data) throw new Error("Record not found");

                    const initial: Record<string, any> = {
                        id: extractId(data), // 🔴 id’yi forma yaz
                    };

                    // Alanları case-insensitive doldur
                    cfg.fields.forEach((f) => {
                        const val = pick(data, f.name);
                        initial[f.name] = f.type === "number" ? Number(val ?? 0) : (val ?? "");
                    });

                    setTableConfig(cfg);
                    setFormData(initial);
                    setHasLoaded(true);
                    return;
                }


                /* KURUMSAL: BMVİ (Başkan-Misyon-Vizyon-İlkeler) */
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
                        } catch {}
                    }
                    if (!foundData) throw new Error("Record not found (BMVİ)");

                    const tableKey = CATEGORY_TO_TABLE[foundData.kategori || category];
                    const config = TABLE_CONFIGS[tableKey];

                    const idForForm = extractId(foundData);

                    // Alan adlarını esnekçe doldur (ICERIK/KATEGORI ve resim alanları dahil)
                    const initial: Record<string, any> = {
                        // ID’yi iki şekilde de koy (ID ve id), save tarafında hangisi okunursa okunsun
                        ID: idForForm,
                        id: idForForm,

                        // alanlar
                        resimUrl1: pick(foundData, "resimUrl1", "RESIM_URL1", "resim_url1"),
                        imageUrl2: pick(foundData, "imageUrl2", "IMAGE_URL2", "image_url2"),

                        // config'te isimler büyük (ICERIK/KATEGORI) olduğu için form anahtarları da öyle olsun:
                        ICERIK: pick(foundData, "ICERIK", "icerik", "CONTENT", "content", "html"),
                        DELTA: pick(foundData, "DELTA", "delta"),
                        KATEGORI: (foundData.kategori ?? category) || "",
                    };

                    // Config’te başka alanlar varsa onları da doldur
                    config.fields.forEach((f) => {
                        if (initial[f.name] === undefined) {
                            initial[f.name] = pick(foundData, f.name);
                        }
                    });
                setTableConfig(config);
                    setFormData(initial);
                    setHasLoaded(true);
                    return;
                }

                throw new Error("Uygun sayfa modu bulunamadı");
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load data");
                setTableConfig(null);
            } finally {
                setLoading(false);
            }
        },
        [isEventMode, isHaberMode, isKurumsalBMVIMode, isYonetimMode, isHizmetMode, isRaporMode]
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

            // YÖNETİM ŞEMASI SAVE
            if (isYonetimMode) {
                const idForPut = extractId(formData);
                if (!idForPut) throw new Error("Yönetim şeması ID bulunamadı");

                const payload = {
                    isimSoyisim: (formData.isimSoyisim ?? "").trim(),
                    resimUrl: (formData.resimUrl ?? "").trim(),
                    pozisyon: (formData.pozisyon ?? "").trim(),
                    siraNo: Number(formData.siraNo) || 0,
                    mudurlukler: (formData.mudurlukler ?? "").toString(),
                };

                const base = TABLE_CONFIGS["kurumsal_yonetim_semasi"].apiEndpoint; // "/api/kurumsal/yonetim-semasi"

                try {
                    // 1) plain :id
                    await apiPut(`${base}/${idForPut}`, payload);
                } catch {
                    // 2) update/:id fallback
                    await apiPut(`${base}/update/${idForPut}`, payload);
                }

                alert("Yönetim şeması güncellendi!");
                return;
            }


            if (isRaporMode) {
                const idForPut = extractId(formData);    // 🔴 kaydederken ID’yi güvenli çek
                if (!idForPut) throw new Error("Rapor ID bulunamadı");

                const payload = {
                    raporBaslik: (formData.raporBaslik ?? "").trim(),
                    raporUrl: (formData.raporUrl ?? "").trim(),
                    categoryId: Number(formData.categoryId) || 0,
                    raporTarihi: (formData.raporTarihi ?? "").trim() || undefined,
                    raporDurum: !!formData.raporDurum,
                };

                // Bazı projelerde /raporlar/:id, bazılarında /raporlar/update/:id kullanılıyor.
                // Önce plain yolu dene, 404 olursa update yoluna düş.
                try {
                    await apiPut(`/api/raporlar/${idForPut}`, payload);
                } catch {
                    await apiPut(`/api/raporlar/update/${idForPut}`, payload);
                }
                alert("Rapor güncellendi!");
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
            window.location.href = goBackToList();
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
                        ref={(el) => (fieldRefs.current[field.name] = el)}
                        type="text"
                        value={value}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        onFocus={rememberFocus(field.name)}        // 🔴 yeni
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
                        ref={(el) => (fieldRefs.current[field.name] = el)}
                        value={value}
                        onChange={handleTextAreaChange(field.name)}
                        onFocus={rememberFocus(field.name)}        // 🔴 yeni
                        className={`${common} min-h-[140px]`}
                        rows={5}
                    />
                );
            case "select":
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
    const Wrapper: React.FC<{ children: React.ReactNode }> = ({children}) =>
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
                    <AlertCircle size={64} className="mx-auto text-red-300 mb-4"/>
                    <h3 className="text-lg font-medium text-gray-500 mb-1">Tablo bulunamadı</h3>
                    <p className="text-gray-400 mb-6">Bu tablo yapılandırması mevcut değil.</p>
                    <button
                        onClick={() => (window.location.href = goBackToList())}
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
            <div
                className="sticky top-0 z-10 -mx-4 px-4 py-3 mb-6 bg-white/60 backdrop-blur-md border-b border-white/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => (window.location.href = goBackToList())}
                        className="p-2 rounded-lg ring-1 ring-slate-200 text-slate-600 hover:bg-slate-50"
                    >
                        <ArrowLeft size={18}/>
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
                        urlParams: {id},
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

            {/* Cam gövdeli kutu */}
            <div
                className="rounded-2xl p-6 bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)]">
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
                                            <div
                                                className="aspect-video w-full overflow-hidden rounded-lg bg-slate-100">
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