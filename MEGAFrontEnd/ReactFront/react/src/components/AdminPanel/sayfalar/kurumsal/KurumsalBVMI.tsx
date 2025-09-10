import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet } from "../../services/apiService";

/* ------------------- Yardımcı: backend key normalize ------------------- */
type BVMIKayit = {
    id: number;
    icerik?: string;
    kategori: "baskan" | "misyon" | "vizyon" | "ilkelerimiz" | string;
    resimUrl1?: string;
    imageUrl2?: string;
    aktif?: boolean;
    guncellemeTarihi?: string | null;
};

function normalizeBVMI(raw: any): BVMIKayit {
    const get = (k1: string, k2?: string) => raw?.[k1] ?? (k2 ? raw?.[k2] : undefined);
    const id = get("id", "ID");
    const kategoriRaw = get("kategori", "KATEGORI");
    const icerik = get("icerik", "ICERIK");
    const resimUrl1 = get("resimUrl1", "RESIM_URL1");
    const imageUrl2 = get("imageUrl2", "IMAGE_URL2");
    const aktif = get("aktif", "AKTIF");
    const guncel = get("guncellemeTarihi", "GUNCELLEME_TARIHI");
    return {
        id: Number(id),
        kategori: (kategoriRaw || "").toString().toLowerCase(),
        icerik,
        resimUrl1,
        imageUrl2,
        aktif: typeof aktif === "boolean" ? aktif : aktif ? String(aktif) === "1" : undefined,
        guncellemeTarihi: guncel ?? null,
    };
}

/* ------------------------------ Sabitler ------------------------------ */
const KATEGORILER: Array<{ value: BVMIKayit["kategori"]; label: string }> = [
    { value: "baskan", label: "Başkan" },
    { value: "vizyon", label: "Vizyon" },
    { value: "misyon", label: "Misyon" },
    { value: "ilkelerimiz", label: "İlkelerimiz" },
];

const LABEL_BY_VALUE = Object.fromEntries(KATEGORILER.map(k => [k.value, k.label]));

/* ------------------------------ Yardımcılar ------------------------------ */
const stripHtml = (html?: string) =>
    (html || "")
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
        .replace(/<\/?[^>]+>/g, "")
        .replace(/\s+/g, " ")
        .trim();

const truncateWithMore = (text: string, max = 160) => {
    if (!text) return { short: "", truncated: false };
    const clean = stripHtml(text);
    if (clean.length <= max) return { short: clean, truncated: false };
    return { short: clean.slice(0, max) + "…", truncated: true };
};

const pickImage = (item: BVMIKayit) => item.resimUrl1 || item.imageUrl2 || "/images/placeholder-16x9.jpg";

/* ================================ SAYFA ================================ */
export default function KurumsalBVMI() {
    const navigate = useNavigate();
    const { kategori } = useParams<{ kategori?: string }>();

    const allowedKeys = KATEGORILER.map(k => String(k.value));
    const selectedKey = (kategori || "").toLowerCase();
    const hasParam = !!kategori;
    const isValidParam = !hasParam || allowedKeys.includes(selectedKey);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [items, setItems] = useState<BVMIKayit[]>([]);
    const [expanded, setExpanded] = useState<Record<string, boolean>>({}); // kategori -> açık/kapalı

    useEffect(() => {
        let ignore = false;

        if (hasParam && !isValidParam) {
            setItems([]);
            setLoading(false);
            setError("İstenen kategori bulunamadı.");
            return;
        }

        (async () => {
            setLoading(true);
            setError(null);
            try {
                const hedefKategoriler = hasParam ? [selectedKey] : allowedKeys;
                const perCat: BVMIKayit[] = [];

                for (const k of hedefKategoriler) {
                    try {
                        const raw = await apiGet<any>(`/api/kurumsal/kategori/${k}`);
                        const data = (raw && (raw.data ?? raw)) as any;
                        if (Array.isArray(data) && data.length > 0) {
                            const chosen = data.find((x: any) => x?.AKTIF === 1 || x?.aktif === true) ?? data[0];
                            perCat.push(normalizeBVMI(chosen));
                        }
                    } catch {
                        /* kategori boş olabilir */
                    }
                }

                if (perCat.length === 0) throw new Error("Aktif kurumsal kayıt bulunamadı.");
                if (!ignore) setItems(perCat);
            } catch (err: any) {
                if (!ignore) setError(err?.message || "Veri yüklenemedi");
            } finally {
                if (!ignore) setLoading(false);
            }
        })();

        return () => {
            ignore = true;
        };
    }, [hasParam, isValidParam, selectedKey]);

    const itemsByKategori = useMemo(() => {
        const map: Record<string, BVMIKayit | null> = {};
        for (const { value } of KATEGORILER) map[value] = null;
        for (const it of items) {
            const key = (it.kategori || "").toLowerCase();
            if (!key) continue;
            map[key] = it;
        }
        return map;
    }, [items]);

    const displayCategories = hasParam && isValidParam
        ? [{ value: selectedKey, label: LABEL_BY_VALUE[selectedKey] || selectedKey }]
        : KATEGORILER;

    const toggleExpand = (key: string) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }));

    /* ------------------------------- UI ------------------------------- */
    if (loading) {
        return (
            <div className="p-4 md:p-6">
                <h1 className="text-xl font-semibold mb-4">Başkan-Vizyon-Misyon-İlke</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {Array.from({ length: displayCategories.length || 4 }).map((_, i) => (
                        <div key={i} className="rounded-2xl p-4 bg-white/10 backdrop-blur-md border border-white/20 shadow-sm">
                            <div className="aspect-video rounded-xl bg-slate-200/60 animate-pulse" />
                            <div className="h-5 w-48 bg-slate-200/70 animate-pulse rounded mt-4" />
                            <div className="h-4 w-full bg-slate-200/50 animate-pulse rounded mt-2" />
                            <div className="h-9 w-28 bg-slate-200/60 animate-pulse rounded mt-4" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!isValidParam) {
        return (
            <div className="p-4 md:p-6">
                <h1 className="text-xl font-semibold mb-4">Başkan-Vizyon-Misyon-İlke</h1>
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-4">
                    Geçersiz kategori: <strong>{kategori}</strong>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 md:p-6">
                <h1 className="text-xl font-semibold mb-4">Başkan-Vizyon-Misyon-İlke</h1>
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6">
            <div className={`grid gap-6 ${displayCategories.length > 1 ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
                {displayCategories.map(({ value, label }) => {
                    const it = itemsByKategori[value];
                    const key = value;
                    const isOpen = !!expanded[key];

                    return (
                        <div
                            key={value}
                            className="
                relative overflow-hidden rounded-2xl
                bg-white/10 dark:bg-white/10
                backdrop-blur-xl border border-white/20
                shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)]
                transition-transform hover:-translate-y-0.5
              "
                        >
                            {/* Kapak görseli */}
                            <div className="relative">
                                <img
                                    src={it ? pickImage(it) : "/images/placeholder-16x9.jpg"}
                                    alt={`${label} kapak`}
                                    className="w-full h-52 object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "/images/placeholder-16x9.jpg";
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                                <div className="absolute top-3 left-3 px-2.5 py-1 text-xs rounded-xl
                                bg-white/20 backdrop-blur-md border border-white/30 text-white">
                                    {value}
                                </div>
                            </div>

                            {/* İçerik */}
                            <div className="p-5">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                    <h3 className="text-lg font-semibold text-slate-900/90">{label}</h3>
                                    {it?.guncellemeTarihi && (
                                        <span className="text-xs text-slate-500">
                      Güncelleme: {new Date(it.guncellemeTarihi).toLocaleDateString("tr-TR")}
                    </span>
                                    )}
                                </div>

                                <div
                                    className={`
                    relative mt-2 text-sm text-slate-700/90 leading-6
                    transition-all duration-300
                    ${isOpen ? "max-h-[1000px]" : "max-h-20"}
                    overflow-hidden
                  `}
                                >
                                    {isOpen ? (
                                        <div
                                            className="prose prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-1"
                                            dangerouslySetInnerHTML={{ __html: it?.icerik || "" }}
                                        />
                                    ) : (
                                        <p>{truncateWithMore(it?.icerik || "", 180).short}</p>
                                    )}

                                    {!isOpen && (
                                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/90 to-transparent" />
                                    )}
                                </div>

                                <div className="mt-4 flex flex-wrap items-center gap-2">
                                    {(() => {
                                        const t = truncateWithMore(it?.icerik || "", 180);
                                        return t.truncated || isOpen ? (
                                            <button
                                                onClick={() => toggleExpand(key)}
                                                className="
                          px-3 py-1.5 rounded-lg text-sm
                          bg-white/30 hover:bg-white/40
                          backdrop-blur border border-white/40
                          text-slate-800 transition
                        "
                                            >
                                                {isOpen ? "Daha az göster" : "Daha fazla göster"}
                                            </button>
                                        ) : null;
                                    })()}

                                    {it?.id ? (
                                        <button
                                            onClick={() => navigate(`/panel/kurumsal/BMVI/${it.id}/edit`)}
                                            className="px-3 py-1.5 rounded-lg text-sm bg-blue-600 hover:bg-blue-700 text-white transition"
                                        >
                                            Düzenle
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => alert("Bu kategori için kayıt bulunamadı.")}
                                            className="px-3 py-1.5 rounded-lg text-sm bg-slate-800/90 text-white hover:bg-slate-800 transition"
                                        >
                                            Yeni Kayıt Oluştur
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
