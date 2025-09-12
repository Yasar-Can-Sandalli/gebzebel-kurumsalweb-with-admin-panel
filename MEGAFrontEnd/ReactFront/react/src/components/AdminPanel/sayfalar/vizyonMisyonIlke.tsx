// =============================
// 1) src/types/kurumsal.ts
// =============================
export type KVMIKategori = "vizyon" | "misyon" | "ilkelerimiz";

export interface KVMIItem {
    id: number;
    kategori: KVMIKategori; // vizyon|misyon|ilkelerimiz
    icerik: string;         // HTML içerik (DB'den geliyor)
    imageUrl?: string;      // opsiyonel
    durum?: "Aktif" | "Arşivlendi" | "Taslak";
    updatedAt?: string;     // ISO tarih
}

// =============================
// 2) src/services/kurumsalService.ts
// =============================
import axios from "axios";
import type { KVMIItem } from "../types/kurumsal";

// BASE URL: Vite ise .env'de VITE_API_BASE_URL tanımlayabilirsiniz.
const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL || "/api" });

export async function getVizyonMisyonIlkeler(): Promise<KVMIItem[]> {
    try {
        const { data } = await api.get<KVMIItem[]>("/kurumsal/vizyon-misyon-ilke");
        return data;
    } catch (err) {
        // Geliştirme sırasında backend hazır değilse basit mock
        return [
            { id: 1, kategori: "vizyon", icerik: "<p>Geleceği şekillendiren, sürdürülebilir kalkınmayı destekleyen bir Gebze…</p>", updatedAt: new Date().toISOString(), durum: "Aktif" },
            { id: 2, kategori: "misyon", icerik: "<p>Gebze’de yaşam kalitesini artıran, katılımcı ve şeffaf belediyecilik…</p>", updatedAt: new Date().toISOString(), durum: "Aktif" },
            { id: 3, kategori: "ilkelerimiz", icerik: "<ul><li>Şeffaflık</li><li>Katılımcılık</li><li>İnovasyon</li></ul>", updatedAt: new Date().toISOString(), durum: "Aktif" },
        ];
    }
}

// =============================
// 3) src/components/sayfalar/sayfaVizyonMisyonIlke.tsx
// =============================
import React from "react";
import { getVizyonMisyonIlkeler } from "../../services/kurumsalService";
import type { KVMIItem, KVMIKategori } from "../../types/kurumsal";

const KATEGORI_LABEL: Record<KVMIKategori, string> = {
    vizyon: "Vizyon",
    misyon: "Misyon",
    ilkelerimiz: "İlkelerimiz",
};

export default function SayfaVizyonMisyonIlke(){
    const [items, setItems] = React.useState<KVMIItem[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [aktifTab, setAktifTab] = React.useState<KVMIKategori>("vizyon");
    const [secili, setSecili] = React.useState<number | null>(null);

    React.useEffect(() => {
        let live = true;
        (async () => {
            const data = await getVizyonMisyonIlkeler();
            if (!live) return;
            setItems(data);
            // İlk açılışta mevcut kategori varsa ona geç
            const cat = data.find(Boolean)?.kategori as KVMIKategori | undefined;
            if (cat) setAktifTab(cat);
            setLoading(false);
        })();
        return () => { live = false; };
    }, []);

    const filtered = items.filter(i => i.kategori === aktifTab);
    const selected = items.find(i => i.id === secili);

    return (
        <div className="kmvi-wrap" style={{display:"grid", gridTemplateColumns:"1fr", gap:16}}>

            {/* Başlık + Eylemler */}
            <div className="page-header" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <div>
                    <div style={{fontSize:12, color:"#6b7280"}}>Kurumsal /</div>
                    <h1 style={{margin:"4px 0", fontSize:22}}>Vizyon – Misyon – İlkelerimiz</h1>
                </div>
                <div style={{display:"flex", gap:8}}>
                    <button className="btn" style={{padding:"8px 12px", borderRadius:8, border:"1px solid #e5e7eb"}}>Arşivle</button>
                    <button className="btn" style={{padding:"8px 12px", borderRadius:8, background:"#3b82f6", color:"#fff", border:0}}>+ Ekle</button>
                </div>
            </div>

            {/* Sekmeler */}
            <div className="tabs" style={{display:"flex", gap:8}}>
                {(["vizyon","misyon","ilkelerimiz"] as KVMIKategori[]).map(k => (
                    <button
                        key={k}
                        onClick={() => { setAktifTab(k); setSecili(null); }}
                        style={{
                            padding:"8px 12px",
                            borderRadius:999,
                            border:"1px solid #e5e7eb",
                            background: aktifTab===k?"#eef2ff":"#fff",
                            color: aktifTab===k?"#1d4ed8":"#111"
                        }}
                    >{KATEGORI_LABEL[k]}</button>
                ))}
            </div>

            {/* İçerik: Sol Liste (DataGrid yerine basit tablo) + Sağ Önizleme */}
            <div className="grid" style={{display:"grid", gridTemplateColumns:"minmax(420px, 1fr) 1fr", gap:16}}>
                <div className="card" style={{background:"#fff", border:"1px solid #e5e7eb", borderRadius:12}}>
                    <div style={{padding:12, borderBottom:"1px solid #e5e7eb", fontWeight:600}}>Kayıtlar</div>
                    <div style={{padding:12}}>
                        {loading ? (
                            <div>Yükleniyor…</div>
                        ) : (
                            <table style={{width:"100%", borderCollapse:"collapse"}}>
                                <thead>
                                <tr style={{textAlign:"left", color:"#6b7280", fontSize:12}}>
                                    <th style={{padding:8, borderBottom:"1px solid #f3f4f6"}}>Kategori</th>
                                    <th style={{padding:8, borderBottom:"1px solid #f3f4f6"}}>Durum</th>
                                    <th style={{padding:8, borderBottom:"1px solid #f3f4f6"}}>Son Güncelleme</th>
                                    <th style={{padding:8, borderBottom:"1px solid #f3f4f6"}}>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filtered.map(row => (
                                    <tr key={row.id} style={{fontSize:14}}>
                                        <td style={{padding:8, borderBottom:"1px solid #f9fafb"}}>{KATEGORI_LABEL[row.kategori]}</td>
                                        <td style={{padding:8, borderBottom:"1px solid #f9fafb"}}>
                                            <span style={{background:"#eef2ff", color:"#1d4ed8", padding:"2px 8px", borderRadius:999}}>{row.durum || "Aktif"}</span>
                                        </td>
                                        <td style={{padding:8, borderBottom:"1px solid #f9fafb"}}>{row.updatedAt ? new Date(row.updatedAt).toLocaleString() : "-"}</td>
                                        <td style={{padding:8, borderBottom:"1px solid #f9fafb"}}>
                                            <button onClick={() => setSecili(row.id)} style={{padding:"6px 10px", borderRadius:8, border:"1px solid #e5e7eb"}}>Görüntüle</button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                <div className="card" style={{background:"#fff", border:"1px solid #e5e7eb", borderRadius:12}}>
                    <div style={{padding:12, borderBottom:"1px solid #e5e7eb", fontWeight:600}}>Önizleme</div>
                    <div style={{padding:16}}>
                        {!selected ? (
                            <div style={{color:"#6b7280"}}>Soldan bir kayıt seçin…</div>
                        ) : (
                            <article>
                                <h2 style={{marginTop:0}}>{KATEGORI_LABEL[selected.kategori]}</h2>
                                {selected.imageUrl && (
                                    <img src={selected.imageUrl} alt={selected.kategori} style={{maxWidth:"100%", borderRadius:12, marginBottom:12}}/>
                                )}
                                {/* DB'den HTML geldiği için dikkatli render ediyoruz */}
                                <div dangerouslySetInnerHTML={{ __html: selected.icerik }} />
                            </article>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// =============================
// 4) Router'a ekleme (ör: src/components/_AdminApp.tsx)
// =============================
// import SayfaVizyonMisyonIlke from "./sayfalar/sayfaVizyonMisyonIlke";
// <Route path="/kurumsal/vizyon-misyon-ilke" element={<SayfaVizyonMisyonIlke/>} />

// =============================
// 5) Sidebar'a link (ör: src/components/_Sidebar.tsx)
// =============================
// <NavLink to="/kurumsal/vizyon-misyon-ilke">Vizyon-Misyon-İlke</NavLink>

// ===================================================================
// 6) BACKEND SÖZLEŞMESİ — Spring Boot (Oracle) örneği
// ===================================================================
// Controller
// @RestController
// @RequestMapping("/api/kurumsal")
// public class KurumsalController {
//   private final KurumsalService svc;
//   public KurumsalController(KurumsalService s){ this.svc = s; }
//   @GetMapping("/vizyon-misyon-ilke")
//   public List<KVMIItemDto> list(){ return svc.listKVMI(); }
// }
// DTO
// public record KVMIItemDto(Long id, String kategori, String icerik, String imageUrl, String durum, Instant updatedAt) {}
// Repository (örnek native query — tabloyu sizdeki isme göre düzeltin)
// @Repository
// public interface KurumsalRepo extends JpaRepository<KvmiEntity, Long> {
//   @Query(value = "SELECT ID, KATEGORI, ICERIK, IMAGE_URL, DELTA AS DURUM, UPDATED_AT FROM KURUMSAL_BASKAN_MISYON_VIZYON_ILKELERIMIZ", nativeQuery = true)
//   List<Object[]> rawKVMI();
// }
// Service (mapping)
// @Service
// public class KurumsalService {
//   private final KurumsalRepo repo;
//   public KurumsalService(KurumsalRepo r){ this.repo = r; }
//   public List<KVMIItemDto> listKVMI(){
//     return repo.rawKVMI().stream().map(r -> new KVMIItemDto(
//       ((Number)r[0]).longValue(),
//       ((String)r[1]).toLowerCase(),
//       (String) r[2],
//       (String) r[3],
//       r[4] != null ? ("1".equals(r[4].toString())?"Aktif":"Arşivlendi") : "Aktif",
//       r[5] != null ? ((Timestamp) r[5]).toInstant() : null
//     )).toList();
//   }
// }

// Notlar:
// - React doğrudan Oracle'a bağlanmaz; bu REST endpoint JSON dönmeli.
// - ICERIK alanı HTML ise, frontend'te güvenilir kaynaktan geliyorsa render edilebilir.
// - updatedAt alanını ISO-8601 (Instant) döndürmek yerelleştirme için idealdir.