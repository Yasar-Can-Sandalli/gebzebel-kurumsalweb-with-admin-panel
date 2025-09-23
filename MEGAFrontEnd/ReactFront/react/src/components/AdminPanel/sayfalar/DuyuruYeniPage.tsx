import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPost } from "../services/apiService";

const input =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/60";
const label = "block text-[13px] font-medium text-slate-700 mb-1";

// "2025-09-06 13:58:00" | "2025-09-06T13:58" | "2025-09-06" -> "2025-09-06"
function toDateOnly(v?: string) {
    if (!v) return "";
    const s = v.includes(" ") ? v.split(" ")[0] : v.includes("T") ? v.split("T")[0] : v;
    return s.slice(0, 10);
}

export default function DuyuruYeniPage() {
    const nav = useNavigate();

    const [form, setForm] = useState({
        baslik: "",
        ozet: "",
        tarih: "",      // LocalDate (yyyy-MM-dd)
        onemli: false,  // UI: boolean, API: 0/1
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!form.baslik.trim()) { setError("Başlık zorunludur."); return; }

        setSaving(true);
        setError(null);
        try {
            await apiPost("/api/duyurular/create", {
                baslik: form.baslik,
                ozet: form.ozet,
                tarih: toDateOnly(form.tarih), // <-- sadece yyyy-MM-dd
                onemli: form.onemli,   // <-- Short(0/1)
            });
            const stamp = Date.now();
            nav(`/panel/duyurular?r=${stamp}`, { replace: true, state: { refreshId: stamp } });
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "Ekleme hatası";
            setError(`${msg} (status: ${err?.response?.status ?? "?"})`);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="mx-auto max-w-[1100px]">
            <div className="flex items-center justify-between py-4">
                <div className="min-w-0">
                    <div className="text-xs text-slate-500">Duyurular</div>
                    <h1 className="text-2xl font-semibold text-slate-800">Yeni Duyuru</h1>
                </div>
                <div className="flex gap-2">
                    <Link to="/panel/duyurular" className="rounded-lg px-3 py-2 ring-1 ring-slate-200 hover:bg-slate-50">İptal</Link>
                    <button onClick={() => submit()} disabled={saving}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow-lg disabled:opacity-60">
                        {saving ? "Kaydediliyor…" : "Kaydet"}
                    </button>
                </div>
            </div>

            {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-red-700">{error}</div>}

            <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-5">
                        <div>
                            <label className={label}>Başlık *</label>
                            <input className={input} value={form.baslik}
                                   onChange={(e) => setForm({ ...form, baslik: e.target.value })} />
                        </div>

                        <div>
                            <label className={label}>Tarih</label>
                            <input type="date" className={input}
                                   value={toDateOnly(form.tarih)}
                                   onChange={(e) => setForm({ ...form, tarih: e.target.value })} />
                        </div>

                        <div className="flex items-center gap-3">
                            <input id="onemli" type="checkbox" checked={form.onemli}
                                   onChange={(e) => setForm({ ...form, onemli: e.target.checked })} />
                            <label htmlFor="onemli" className="text-sm text-slate-700">Önemli</label>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <label className={label}>Özet</label>
                            <textarea rows={10} className={input} value={form.ozet}
                                      onChange={(e) => setForm({ ...form, ozet: e.target.value })} />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
