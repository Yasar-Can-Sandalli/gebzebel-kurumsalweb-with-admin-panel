import { useEffect, useMemo, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Save, RefreshCw, BookOpen } from "lucide-react";

// API'nin döndürdüğü örnek objeye göre geniş tip.
// Tüm alanları koruruz ki PUT sırasında null'a düşmesinler.
type TarihceRecord = {
    id?: number;
    type?: string;
    baslik?: string;
    aciklama?: string;
    resim1?: string | null; resim2?: string | null; resim3?: string | null;
    resim4?: string | null; resim5?: string | null; resim6?: string | null;
    resim7?: string | null; resim8?: string | null; resim9?: string | null; resim10?: string | null;
    nufus1?: number | null; nufus2?: number | null; nufus3?: number | null; nufus4?: number | null; nufus5?: number | null;
    yil1?: number | null;   yil2?: number | null;   yil3?: number | null;   yil4?: number | null;   yil5?: number | null;
    // ileride yeni sütunlar gelirse de kopsun istemeyiz:
    [k: string]: any;
};

async function jsonFetch<T>(url: string, init?: RequestInit): Promise<T> {
    const res = await fetch(url, { headers: { Accept: "application/json", ...(init?.headers || {}) }, ...init });
    const text = await res.text();
    let data: any = null;
    try { data = text ? JSON.parse(text) : null; }
    catch {
        const snippet = text?.slice(0, 200) || "";
        throw new Error(`Beklenmeyen yanıt (JSON değil). HTTP ${res.status}. ${snippet.startsWith("<") ? "HTML geldi." : snippet}`);
    }
    if (!res.ok) throw new Error((data && (data.message || data.error)) || `HTTP ${res.status}`);
    return data as T;
}

export default function GebzeTarihcePage() {
    const [record, setRecord] = useState<TarihceRecord | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
    const editorRef = useRef<any>(null);

    // İlk veriyi çek (liste dönebiliyor → ilk elemanı al)
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await jsonFetch<any>("/api/tarihce");
                const rec: TarihceRecord = Array.isArray(data) ? (data[0] ?? {}) : (data ?? {});
                // hiç kayıt yoksa boş bir iskelet hazırla
                setRecord({ ...rec, type: rec.type ?? "TARIHCE", aciklama: rec.aciklama ?? "" });
            } catch (e: any) {
                setError(e.message || "Veri çekilemedi.");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const aciklama = record?.aciklama ?? "";
    const isDirty = useMemo(() => saving, [saving]);

    async function handleSave() {
        if (!record) return;
        try {
            setSaving(true);
            setError(null);
            const payload = { ...record }; // tüm alanları geri gönder (diğer sütunlar korunur)

            let saved: TarihceRecord;
            if (record.id) {
                saved = await jsonFetch<TarihceRecord>(`/api/tarihce/${record.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
            } else {
                saved = await jsonFetch<TarihceRecord>("/api/tarihce", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
            }
            setRecord(saved);
            setLastSavedAt(new Date().toLocaleString());
        } catch (e: any) {
            setError(e.message || "Kaydetme sırasında sorun oluştu.");
        } finally {
            setSaving(false);
        }
    }

    async function handleRefresh() {
        try {
            setLoading(true);
            setError(null);
            const data = await jsonFetch<any>("/api/tarihce");
            const rec: TarihceRecord = Array.isArray(data) ? (data[0] ?? {}) : (data ?? {});
            setRecord({ ...rec, type: rec.type ?? "TARIHCE", aciklama: rec.aciklama ?? "" });
        } catch (e: any) {
            setError(e.message || "Yenileme sırasında hata oluştu.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-xl md:text-2xl font-semibold">Gebze Tarihçe İçeriği</h1>
                    <p className="text-sm text-slate-500">TinyMCE ile yalnızca <b>aciklama</b> (HTML) alanını düzenliyorsunuz; diğer sütunlar korunur.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={handleRefresh}
                        className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-slate-50"
                        disabled={loading || saving}
                        title="Yenile"
                    >
                        <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                        Yenile
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-3 py-2 text-sm hover:bg-blue-700 disabled:opacity-60"
                        disabled={loading || saving}
                    >
                        <Save className="h-4 w-4" />
                        Kaydet
                    </button>
                </div>
            </div>

            {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

            {loading || !record ? (
                <div className="grid place-items-center h-64 text-slate-500">Yükleniyor…</div>
            ) : (
                <div className="space-y-3">
                    {/* İstersen baslik'ı da opsiyonel gösterebilirsin */}
                    <input
                        className="w-full rounded-lg border px-3 py-2 text-sm"
                        placeholder="Başlık (opsiyonel)"
                        value={record.baslik ?? ""}
                        onChange={(e) => setRecord((m) => ({ ...(m || {}), baslik: e.target.value }))}
                    />

                    <Editor
                        apiKey="97ddxvpkajn94x504q9ism9sqsmz2kztqd0fu5zqub80p4ei" // Tiny Cloud anahtarı vermeden uyarı kartını kaldırır
                        onInit={(_, editor) => (editorRef.current = editor)}
                        value={aciklama}
                        onEditorChange={(content) => setRecord((m) => ({ ...(m || {}), aciklama: content }))}
                        init={{
                            menubar: false,
                            language: "tr",
                            height: 520,
                            plugins: [
                                "advlist","autolink","lists","link","image","charmap",
                                "preview","anchor","searchreplace","visualblocks",
                                "code","fullscreen","insertdatetime","media",
                                "table","help","wordcount","paste"
                            ],
                            toolbar:
                                "undo redo | blocks | bold italic underline | " +
                                "alignleft aligncenter alignright alignjustify | " +
                                "bullist numlist outdent indent | link image media table | removeformat | code fullscreen",
                            images_upload_url: "/api/uploads/image",
                            images_upload_credentials: true,
                            automatic_uploads: true,
                            paste_data_images: true,
                            valid_styles: { "*": "text-align,color,background-color" },
                            content_style: "body { font-family: Inter, system-ui, sans-serif; font-size:14px }",
                        }}
                    />

                    <div className="flex items-center justify-between text-xs text-slate-500">
                        <div className="inline-flex items-center gap-1">
                            <BookOpen className="h-3.5 w-3.5" />
                            Metin içinde tablo, resim, başlıklar ekleyebilirsiniz.
                        </div>
                        <div>{lastSavedAt ? `Son kayıt: ${lastSavedAt}` : isDirty ? "Kaydediliyor…" : ""}</div>
                    </div>
                </div>
            )}
        </div>
    );
}
