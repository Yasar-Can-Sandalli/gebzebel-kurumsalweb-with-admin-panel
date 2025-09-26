import { useEffect, useMemo, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Save, RefreshCw, Image } from "lucide-react";

type SanalTurDTO = {
    id?: number;
    baslik?: string;
    aciklama: string; // TinyMCE HTML
};

async function jsonFetch<T>(url: string, init?: RequestInit): Promise<T> {
    const res = await fetch(url, {
        headers: { Accept: "application/json", ...(init?.headers || {}) },
        ...init,
    });

    // önce JSON dene, olmazsa text'e düş
    const text = await res.text();
    let data: any;
    try {
        data = text ? JSON.parse(text) : null;
    } catch {
        // HTML gelmiş olabilir (<!doctype html> ile başlayan)
        const snippet = text?.slice(0, 200) || "";
        throw new Error(
            `Beklenmeyen yanıt biçimi (JSON değil). HTTP ${res.status}. ` +
            (snippet.startsWith("<") ? "Sunucudan HTML geldi." : "Gövde: " + snippet)
        );
    }

    if (!res.ok) {
        // Sunucu JSON'da hata döndürdüyse
        throw new Error((data && (data.message || data.error)) || `HTTP ${res.status}`);
    }
    return data as T;
}


export default function GebzeSanalTurPage() {
    const [model, setModel] = useState<SanalTurDTO>({ aciklama: "" });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
    const editorRef = useRef<any>(null);

    // İlk veriyi çek
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                setError(null);

                // Tek kayıt dönüyorsa obje, birden çoksa dizi olabilir:
                const data = await jsonFetch<any>("/api/gebze/sanaltur");
                const dto: SanalTurDTO = Array.isArray(data) ? (data[0] ?? { aciklama: "" }) : data ?? { aciklama: "" };
                // Boşsa varsayılan
                setModel({ id: dto?.id, baslik: dto?.baslik ?? "Gebze Sanal Tur", aciklama: dto?.aciklama ?? "" });
            } catch (e: any) {
                setError(e?.message || "Veri çekilirken hata oluştu.");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const isDirty = useMemo(() => saving, [saving]);

    async function handleSave() {
        try {
            setSaving(true);
            setError(null);

            const payload: SanalTurDTO = {
                id: model.id,
                baslik: model.baslik,
                aciklama: model.aciklama,
            };

            let saved: SanalTurDTO;
            if (model.id) {
                saved = await jsonFetch<SanalTurDTO>(`/api/gebze/sanaltur/${model.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
            } else {
                saved = await jsonFetch<SanalTurDTO>("/api/gebze/sanaltur", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
            }

            setModel(saved);
            setLastSavedAt(new Date().toLocaleString());
        } catch (e: any) {
            setError(e?.message || "Kaydederken bir sorun oluştu.");
        } finally {
            setSaving(false);
        }
    }

    async function handleRefresh() {
        setLoading(true);
        setError(null);
        try {
            const data = await jsonFetch<any>("/api/gebze/sanaltur");
            const dto: SanalTurDTO = Array.isArray(data) ? (data[0] ?? { aciklama: "" }) : data ?? { aciklama: "" };
            setModel({ id: dto?.id, baslik: dto?.baslik ?? "Gebze Sanal Tur", aciklama: dto?.aciklama ?? "" });
        } catch (e: any) {
            setError(e?.message || "Yenileme sırasında hata oluştu.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-xl md:text-2xl font-semibold">Gebze Sanal Tur İçeriği</h1>
                    <p className="text-sm text-slate-500">
                        Bu alandaki HTML içerik TinyMCE ile düzenlenir ve veritabanında saklanır.
                    </p>
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

            {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="grid place-items-center h-64 text-slate-500">Yükleniyor…</div>
            ) : (
                <div className="space-y-3">
                    <input
                        className="w-full rounded-lg border px-3 py-2 text-sm"
                        placeholder="Başlık (opsiyonel)"
                        value={model.baslik ?? ""}
                        onChange={(e) => setModel((m) => ({ ...m, baslik: e.target.value }))}
                    />

                    <Editor
                        apiKey="97ddxvpkajn94x504q9ism9sqsmz2kztqd0fu5zqub80p4ei"
                        onInit={(_, editor) => (editorRef.current = editor)}
                        value={model.aciklama}
                        onEditorChange={(content) => setModel((m) => ({ ...m, aciklama: content }))}
                        init={{
                            // Tiny Cloud kullanıyorsanız: apiKey: "YOUR_TINYMCE_API_KEY",
                            menubar: false,
                            language: "tr",
                            height: 520,
                            plugins: [
                                "advlist", "autolink", "lists", "link", "image", "charmap",
                                "preview", "anchor", "searchreplace", "visualblocks",
                                "code", "fullscreen", "insertdatetime", "media",
                                "table", "help", "wordcount", "paste"
                            ],
                            toolbar:
                                "undo redo | blocks | bold italic underline | " +
                                "alignleft aligncenter alignright alignjustify | " +
                                "bullist numlist outdent indent | link image media table | removeformat | code fullscreen",
                            images_upload_url: "/api/uploads/image",
                            images_upload_credentials: true,
                            automatic_uploads: true,
                            paste_data_images: true,
                            // Gereksiz inline stilleri azalt
                            valid_styles: { "*": "text-align,color,background-color" },
                            content_style: "body { font-family: Inter, system-ui, sans-serif; font-size:14px }",
                        }}
                    />

                    <div className="flex items-center justify-between text-xs text-slate-500">
                        <div className="inline-flex items-center gap-1">
                            <Image className="h-3.5 w-3.5" />
                            Görselleri düzenleyicide ekleyebilir veya panodan yapıştırabilirsiniz.
                        </div>
                        <div>{lastSavedAt ? `Son kayıt: ${lastSavedAt}` : isDirty ? "Kaydediliyor…" : ""}</div>
                    </div>
                </div>
            )}
        </div>
    );
}
