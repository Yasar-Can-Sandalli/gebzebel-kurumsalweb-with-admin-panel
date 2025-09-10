// src/components/AdminPanel/sayfalar/kurumsal/RaporEditPage.tsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, X, Eye, AlertCircle, Calendar, FileText } from "lucide-react";
import { getRaporById, updateRapor } from "../../services/raporlarService.ts";
import type { Rapor } from "../../../../types/raporlar";

function toDateInput(val?: string | null) {
    if (!val) return "";
    // ISO -> YYYY-MM-DD
    try {
        return val.slice(0, 10);
    } catch {
        return "";
    }
}
function toIsoFromDateInput(d: string) {
    return d ? new Date(d + "T00:00:00").toISOString() : undefined;
}

const SimpleLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">{children}</div>
    </div>
);

const DebugInfo: React.FC<{ data: any; onClose: () => void }> = ({ data, onClose }) => (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-yellow-800">Debug Info</h4>
            <button onClick={onClose} className="px-2 py-1 text-xs rounded bg-yellow-100 hover:bg-yellow-200">
                Hide Debug
            </button>
        </div>
        <pre className="text-xs text-yellow-700 overflow-auto">{JSON.stringify(data, null, 2)}</pre>
    </div>
);

export default function RaporEditPage() {
    const { id } = useParams<{ id: string }>();
    const nav = useNavigate();

    const [loading, setLoading] = React.useState(true);
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [debug, setDebug] = React.useState(true);
    const [preview, setPreview] = React.useState(false);

    const [model, setModel] = React.useState<Rapor | null>(null);

    // Form state
    const [baslik, setBaslik] = React.useState("");
    const [url, setUrl] = React.useState("");
    const [tarih, setTarih] = React.useState(""); // YYYY-MM-DD
    const [aktif, setAktif] = React.useState(true);

    React.useEffect(() => {
        let live = true;
        (async () => {
            try {
                setLoading(true);
                setError(null);
                const rapor = await getRaporById(Number(id));
                if (!live) return;
                setModel(rapor);
                setBaslik(rapor.raporBaslik);
                setUrl(rapor.raporUrl);
                setTarih(toDateInput(rapor.raporTarihi));
                setAktif(!!rapor.raporDurum);
            } catch (e: any) {
                setError(e?.message || "Rapor yüklenemedi");
            } finally {
                if (live) setLoading(false);
            }
        })();
        return () => {
            live = false;
        };
    }, [id]);

    const handleSave = async () => {
        if (!model) return;
        setSaving(true);
        setError(null);
        try {
            await updateRapor(model.raporId, {
                raporBaslik: baslik.trim(),
                raporUrl: url.trim(),
                categoryId: model.categoryId,
                raporTarihi: toIsoFromDateInput(tarih),
                raporDurum: aktif,
            });
            // küçük bir feedback
            alert("Rapor güncellendi");
            nav("/panel/kurumsal/raporlar");
        } catch (e: any) {
            setError(e?.message || "Kaydetme sırasında hata oluştu");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <SimpleLayout>
                <div className="h-48 grid place-items-center text-slate-600">Yükleniyor…</div>
            </SimpleLayout>
        );
    }

    if (!model) {
        return (
            <SimpleLayout>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-red-700">
                        <AlertCircle size={18} />
                        Kayıt bulunamadı.
                    </div>
                </div>
            </SimpleLayout>
        );
    }

    return (
        <SimpleLayout>
            {/* Debug */}
            {debug && (
                <DebugInfo
                    data={{
                        urlParams: { id },
                        mode: "report",
                        formData: {
                            baslik,
                            url,
                            tarih,
                            aktif,
                        },
                        model,
                    }}
                    onClose={() => setDebug(false)}
                />
            )}

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => nav(-1)}
                        className="p-2 rounded border border-slate-200 text-slate-600 hover:bg-slate-50"
                        title="Geri"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Sayfayı Düzenle</h2>
                        <div className="text-sm text-slate-500">Rapor • ID: {model.raporId}</div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setDebug((d) => !d)}
                        className="px-3 py-2 rounded bg-amber-100 text-amber-800 hover:bg-amber-200"
                    >
                        {debug ? "Hide Debug" : "Show Debug"}
                    </button>
                    <button
                        onClick={() => setPreview((p) => !p)}
                        className="px-3 py-2 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 inline-flex items-center gap-2"
                    >
                        <Eye size={16} /> {preview ? "Düzenleme" : "Önizleme"}
                    </button>
                    <button onClick={() => nav(-1)} className="px-3 py-2 rounded bg-slate-500 text-white hover:bg-slate-600 inline-flex items-center gap-2">
                        <X size={16} /> İptal
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-3 py-2 rounded bg-sky-600 text-white hover:bg-sky-700 inline-flex items-center gap-2 disabled:opacity-60"
                    >
                        <Save size={16} /> {saving ? "Kaydediliyor…" : "Kaydet"}
                    </button>
                </div>
            </div>

            {/* Form / Preview */}
            <div className="bg-white rounded-lg shadow p-6">
                {!preview ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Başlık *</label>
                            <input
                                value={baslik}
                                onChange={(e) => setBaslik(e.target.value)}
                                className="w-full border border-slate-300 rounded-lg px-3 py-2"
                                placeholder="Rapor başlığı"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Rapor URL (PDF) *</label>
                            <input
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="w-full border border-slate-300 rounded-lg px-3 py-2"
                                placeholder="https://..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Rapor Tarihi</label>
                            <input
                                type="date"
                                value={tarih}
                                onChange={(e) => setTarih(e.target.value)}
                                className="w-full border border-slate-300 rounded-lg px-3 py-2"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                id="aktif"
                                type="checkbox"
                                checked={aktif}
                                onChange={(e) => setAktif(e.target.checked)}
                                className="h-4 w-4"
                            />
                            <label htmlFor="aktif" className="text-sm text-slate-700">
                                Aktif
                            </label>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="text-2xl font-semibold text-slate-900">{baslik || "(Başlık girilmemiş)"}</div>
                        <div className="flex items-center gap-2 text-slate-600">
                            <Calendar size={16} />
                            {tarih || "—"}
                        </div>
                        <div className="flex items-center gap-2">
                            <FileText size={16} className="text-slate-500" />
                            <a href={url || "#"} target="_blank" rel="noreferrer" className="text-sky-700 underline break-all">
                                {url || "(URL girilmemiş)"}
                            </a>
                        </div>
                        <div className="text-sm text-slate-600">Durum: {aktif ? "Aktif" : "Pasif"}</div>
                    </div>
                )}
            </div>

            {/* Hata */}
            {error && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 flex items-center gap-2">
                    <AlertCircle size={18} /> {error}
                </div>
            )}
        </SimpleLayout>
    );
}
