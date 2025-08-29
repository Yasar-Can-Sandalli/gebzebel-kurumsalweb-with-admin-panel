import React, { useState, useEffect } from 'react';
import { SikayetIletisimService, SikayetIletisimDTO } from './services/sikayetIletisimService';

const SikayetIletisimYonetimi: React.FC = () => {
    const [sikayetler, setSikayetler] = useState<SikayetIletisimDTO[]>([]);
    const [selectedSikayet, setSelectedSikayet] = useState<SikayetIletisimDTO | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDurum, setSelectedDurum] = useState('');
    const [selectedKategori, setSelectedKategori] = useState('');
    const [selectedOncelik, setSelectedOncelik] = useState('');
    const [yanitText, setYanitText] = useState('');
    const [yanitlayanPersonel, setYanitlayanPersonel] = useState('');

    const [formData, setFormData] = useState<SikayetIletisimDTO>({
        adSoyad: '',
        eMail: '',
        telefon: '',
        konu: '',
        mesaj: '',
        kategori: '',
        adres: '',
        mahalle: '',
        ilce: ''
    });

    useEffect(() => {
        loadSikayetler();
    }, []);

    const loadSikayetler = async () => {
        try {
            const data = await SikayetIletisimService.tumSikayetleriGetir();
            setSikayetler(data);
        } catch (error) {
            console.error('Şikayetler yüklenirken hata:', error);
        }
    };

    const handleSearch = async () => {
        try {
            let data: SikayetIletisimDTO[] = [];

            if (selectedDurum && searchTerm) {
                data = await SikayetIletisimService.durumVeAramaYap(selectedDurum, searchTerm);
            } else if (selectedDurum) {
                data = await SikayetIletisimService.durumaGoreGetir(selectedDurum);
            } else if (searchTerm) {
                data = await SikayetIletisimService.aramaYap(searchTerm);
            } else if (selectedKategori) {
                data = await SikayetIletisimService.kategoriyeGoreGetir(selectedKategori);
            } else if (selectedOncelik) {
                data = await SikayetIletisimService.onceligeGoreGetir(selectedOncelik);
            } else {
                data = await SikayetIletisimService.tumSikayetleriGetir();
            }

            setSikayetler(data);
        } catch (error) {
            console.error('Arama yapılırken hata:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditMode && selectedSikayet?.id) {
                await SikayetIletisimService.sikayetGuncelle(selectedSikayet.id, formData);
            } else {
                await SikayetIletisimService.sikayetKaydet(formData);
            }

            setShowModal(false);
            setIsEditMode(false);
            setSelectedSikayet(null);
            setFormData({
                adSoyad: '',
                eMail: '',
                telefon: '',
                konu: '',
                mesaj: '',
                kategori: '',
                adres: '',
                mahalle: '',
                ilce: ''
            });
            loadSikayetler();
        } catch (error) {
            console.error('Şikayet kaydedilirken hata:', error);
        }
    };

    const handleEdit = (sikayet: SikayetIletisimDTO) => {
        setSelectedSikayet(sikayet);
        setFormData({
            adSoyad: sikayet.adSoyad,
            eMail: sikayet.eMail || '',
            telefon: sikayet.telefon || '',
            konu: sikayet.konu,
            mesaj: sikayet.mesaj,
            kategori: sikayet.kategori || '',
            adres: sikayet.adres || '',
            mahalle: sikayet.mahalle || '',
            ilce: sikayet.ilce || ''
        });
        setIsEditMode(true);
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Bu şikayeti silmek istediğinizden emin misiniz?')) {
            try {
                await SikayetIletisimService.sikayetSil(id);
                loadSikayetler();
            } catch (error) {
                console.error('Şikayet silinirken hata:', error);
            }
        }
    };

    const handleYanitEkle = async (id: number) => {
        if (!yanitText.trim() || !yanitlayanPersonel.trim()) {
            alert('Yanıt ve personel bilgisi gereklidir!');
            return;
        }

        try {
            await SikayetIletisimService.yanitEkle(id, yanitText, yanitlayanPersonel);
            setYanitText('');
            setYanitlayanPersonel('');
            loadSikayetler();
        } catch (error) {
            console.error('Yanıt eklenirken hata:', error);
        }
    };

    const handleDurumGuncelle = async (id: number, yeniDurum: string) => {
        try {
            await SikayetIletisimService.durumGuncelle(id, yeniDurum);
            loadSikayetler();
        } catch (error) {
            console.error('Durum güncellenirken hata:', error);
        }
    };

    const handleOncelikGuncelle = async (id: number, yeniOncelik: string) => {
        try {
            await SikayetIletisimService.oncelikGuncelle(id, yeniOncelik);
            loadSikayetler();
        } catch (error) {
            console.error('Öncelik güncellenirken hata:', error);
        }
    };

    const getDurumColor = (durum: string) => {
        switch (durum) {
            case 'BEKLEMEDE': return 'text-warning';
            case 'INCELENIYOR': return 'text-info';
            case 'YANITLANDI': return 'text-success';
            case 'KAPANDI': return 'text-secondary';
            default: return 'text-dark';
        }
    };

    const getOncelikColor = (oncelik: string) => {
        switch (oncelik) {
            case 'YÜKSEK': return 'text-danger fw-bold';
            case 'NORMAL': return 'text-warning';
            case 'DÜŞÜK': return 'text-success';
            default: return 'text-dark';
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Şikayet ve İletişim Yönetimi</h4>
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    setShowModal(true);
                                    setIsEditMode(false);
                                    setSelectedSikayet(null);
                                    setFormData({
                                        adSoyad: '',
                                        eMail: '',
                                        telefon: '',
                                        konu: '',
                                        mesaj: '',
                                        kategori: '',
                                        adres: '',
                                        mahalle: '',
                                        ilce: ''
                                    });
                                }}
                            >
                                <i className="fa fa-plus"></i> Yeni Şikayet
                            </button>
                        </div>
                        <div className="card-body">
                            {/* Arama ve Filtreler */}
                            <div className="row mb-3">
                                <div className="col-md-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Arama yapın..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <select
                                        className="form-select"
                                        value={selectedDurum}
                                        onChange={(e) => setSelectedDurum(e.target.value)}
                                    >
                                        <option value="">Tüm Durumlar</option>
                                        {SikayetIletisimService.getDurumSecenekleri().map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-2">
                                    <select
                                        className="form-select"
                                        value={selectedKategori}
                                        onChange={(e) => setSelectedKategori(e.target.value)}
                                    >
                                        <option value="">Tüm Kategoriler</option>
                                        {SikayetIletisimService.getKategoriSecenekleri().map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-2">
                                    <select
                                        className="form-select"
                                        value={selectedOncelik}
                                        onChange={(e) => setSelectedOncelik(e.target.value)}
                                    >
                                        <option value="">Tüm Öncelikler</option>
                                        {SikayetIletisimService.getOncelikSecenekleri().map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <button className="btn btn-secondary me-2" onClick={handleSearch}>
                                        <i className="fa fa-search"></i> Ara
                                    </button>
                                    <button className="btn btn-outline-secondary" onClick={loadSikayetler}>
                                        <i className="fa fa-refresh"></i> Yenile
                                    </button>
                                </div>
                            </div>

                            {/* Şikayetler Tablosu */}
                            <div className="table-responsive">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Ad Soyad</th>
                                            <th>Konu</th>
                                            <th>Kategori</th>
                                            <th>Öncelik</th>
                                            <th>Durum</th>
                                            <th>Tarih</th>
                                            <th>İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sikayetler.map((sikayet) => (
                                            <tr key={sikayet.id}>
                                                <td>{sikayet.id}</td>
                                                <td>{sikayet.adSoyad}</td>
                                                <td>{sikayet.konu}</td>
                                                <td>{sikayet.kategori}</td>
                                                <td>
                                                    <span className={getOncelikColor(sikayet.oncelik || '')}>
                                                        {sikayet.oncelik}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className={getDurumColor(sikayet.durum || '')}>
                                                        {sikayet.durum}
                                                    </span>
                                                </td>
                                                <td>{sikayet.olusturmaTarihi}</td>
                                                <td>
                                                    <div className="btn-group" role="group">
                                                        <button
                                                            className="btn btn-sm btn-info"
                                                            onClick={() => handleEdit(sikayet)}
                                                            title="Düzenle"
                                                        >
                                                            <i className="fa fa-edit"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() => handleDelete(sikayet.id!)}
                                                            title="Sil"
                                                        >
                                                            <i className="fa fa-trash"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-success"
                                                            onClick={() => {
                                                                setSelectedSikayet(sikayet);
                                                                setYanitText('');
                                                                setYanitlayanPersonel('');
                                                            }}
                                                            title="Yanıt Ekle"
                                                        >
                                                            <i className="fa fa-reply"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Şikayet Ekleme/Düzenleme Modal */}
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {isEditMode ? 'Şikayet Düzenle' : 'Yeni Şikayet Ekle'}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Ad Soyad *</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={formData.adSoyad}
                                                    onChange={(e) => setFormData({ ...formData, adSoyad: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">E-posta</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    value={formData.eMail}
                                                    onChange={(e) => setFormData({ ...formData, eMail: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Telefon</label>
                                                <input
                                                    type="tel"
                                                    className="form-control"
                                                    value={formData.telefon}
                                                    onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Kategori</label>
                                                <select
                                                    className="form-select"
                                                    value={formData.kategori}
                                                    onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                                                >
                                                    <option value="">Kategori Seçin</option>
                                                    {SikayetIletisimService.getKategoriSecenekleri().map(option => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Konu *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.konu}
                                            onChange={(e) => setFormData({ ...formData, konu: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Mesaj *</label>
                                        <textarea
                                            className="form-control"
                                            rows={4}
                                            value={formData.mesaj}
                                            onChange={(e) => setFormData({ ...formData, mesaj: e.target.value })}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label">Mahalle</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={formData.mahalle}
                                                    onChange={(e) => setFormData({ ...formData, mahalle: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label">İlçe</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={formData.ilce}
                                                    onChange={(e) => setFormData({ ...formData, ilce: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label">Adres</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={formData.adres}
                                                    onChange={(e) => setFormData({ ...formData, adres: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                        İptal
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        {isEditMode ? 'Güncelle' : 'Kaydet'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Yanıt Ekleme Modal */}
            {selectedSikayet && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Yanıt Ekle</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setSelectedSikayet(null)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Şikayet</label>
                                    <p className="form-control-plaintext">
                                        <strong>{selectedSikayet.konu}</strong><br />
                                        {selectedSikayet.mesaj}
                                    </p>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Yanıt *</label>
                                    <textarea
                                        className="form-control"
                                        rows={4}
                                        value={yanitText}
                                        onChange={(e) => setYanitText(e.target.value)}
                                        placeholder="Yanıtınızı yazın..."
                                        required
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Yanıtlayan Personel *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={yanitlayanPersonel}
                                        onChange={(e) => setYanitlayanPersonel(e.target.value)}
                                        placeholder="Adınızı yazın..."
                                        required
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setSelectedSikayet(null)}>
                                    İptal
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => handleYanitEkle(selectedSikayet.id!)}
                                >
                                    Yanıt Ekle
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Backdrop */}
            {(showModal || selectedSikayet) && (
                <div className="modal-backdrop fade show"></div>
            )}
        </div>
    );
};

export default SikayetIletisimYonetimi; 