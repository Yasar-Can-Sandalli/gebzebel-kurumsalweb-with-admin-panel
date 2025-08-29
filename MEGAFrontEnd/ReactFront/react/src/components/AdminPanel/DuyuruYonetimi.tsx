import React, { useState, useEffect } from 'react';
import { DuyuruService, DuyuruDTO } from './services/duyuruService';

const DuyuruYonetimi: React.FC = () => {
    const [duyurular, setDuyurular] = useState<DuyuruDTO[]>([]);
    const [selectedDuyuru, setSelectedDuyuru] = useState<DuyuruDTO | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDurum, setSelectedDurum] = useState('TUMU');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<DuyuruDTO>({
        baslik: '',
        icerik: '',
        durum: 'AKTIF',
        olusturanKullanici: 'Admin'
    });

    useEffect(() => {
        loadDuyurular();
    }, []);

    const loadDuyurular = async () => {
        setLoading(true);
        try {
            let data: DuyuruDTO[];
            if (selectedDurum === 'TUMU') {
                data = await DuyuruService.tumDuyurulariGetir();
            } else {
                data = await DuyuruService.durumaGoreGetir(selectedDurum);
            }
            setDuyurular(data);
        } catch (error) {
            console.error('Duyurular yüklenirken hata:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            loadDuyurular();
            return;
        }

        setLoading(true);
        try {
            let data: DuyuruDTO[];
            if (selectedDurum === 'TUMU') {
                data = await DuyuruService.aramaYap(searchTerm);
            } else {
                data = await DuyuruService.durumVeAramaYap(selectedDurum, searchTerm);
            }
            setDuyurular(data);
        } catch (error) {
            console.error('Arama yapılırken hata:', error);
        } finally {
            setLoading(false);
        }
    };

    const openModal = (duyuru?: DuyuruDTO) => {
        if (duyuru) {
            setSelectedDuyuru(duyuru);
            setFormData(duyuru);
            setIsEditMode(true);
        } else {
            setSelectedDuyuru(null);
            setFormData({
                baslik: '',
                icerik: '',
                durum: 'AKTIF',
                olusturanKullanici: 'Admin'
            });
            setIsEditMode(false);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDuyuru(null);
        setIsEditMode(false);
        setFormData({
            baslik: '',
            icerik: '',
            durum: 'AKTIF',
            olusturanKullanici: 'Admin'
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEditMode && selectedDuyuru?.id) {
                await DuyuruService.duyuruGuncelle(selectedDuyuru.id, formData);
            } else {
                await DuyuruService.duyuruKaydet(formData);
            }

            closeModal();
            loadDuyurular();
        } catch (error) {
            console.error('Duyuru kaydedilirken hata:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Bu duyuruyu silmek istediğinizden emin misiniz?')) {
            setLoading(true);
            try {
                await DuyuruService.duyuruSil(id);
                loadDuyurular();
            } catch (error) {
                console.error('Duyuru silinirken hata:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Duyuru Yönetimi</h4>
                            <button
                                className="btn btn-primary"
                                onClick={() => openModal()}
                                disabled={loading}
                            >
                                <i className="fa fa-plus"></i> Yeni Duyuru
                            </button>
                        </div>

                        <div className="card-body">
                            {/* Arama ve Filtreleme */}
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Duyuru ara..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <select
                                        className="form-control"
                                        value={selectedDurum}
                                        onChange={(e) => setSelectedDurum(e.target.value)}
                                    >
                                        <option value="TUMU">Tümü</option>
                                        {DuyuruService.getDurumSecenekleri().map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-2">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={handleSearch}
                                        disabled={loading}
                                    >
                                        <i className="fa fa-search"></i> Ara
                                    </button>
                                </div>
                                <div className="col-md-3">
                                    <button
                                        className="btn btn-info"
                                        onClick={loadDuyurular}
                                        disabled={loading}
                                    >
                                        <i className="fa fa-refresh"></i> Yenile
                                    </button>
                                </div>
                            </div>

                            {/* Duyuru Listesi */}
                            {loading ? (
                                <div className="text-center">
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Yükleniyor...</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Başlık</th>
                                                <th>Durum</th>
                                                <th>Oluşturan</th>
                                                <th>Oluşturma Tarihi</th>
                                                <th>İşlemler</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {duyurular.map(duyuru => (
                                                <tr key={duyuru.id}>
                                                    <td>{duyuru.id}</td>
                                                    <td>{duyuru.baslik}</td>
                                                    <td>
                                                        <span className={`badge badge-${duyuru.durum === 'AKTIF' ? 'success' : 'secondary'}`}>
                                                            {duyuru.durum}
                                                        </span>
                                                    </td>
                                                    <td>{duyuru.olusturanKullanici}</td>
                                                    <td>{duyuru.olusturmaTarihi}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-sm btn-warning mr-1"
                                                            onClick={() => openModal(duyuru)}
                                                        >
                                                            <i className="fa fa-edit"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() => duyuru.id && handleDelete(duyuru.id)}
                                                        >
                                                            <i className="fa fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {isEditMode ? 'Duyuru Düzenle' : 'Yeni Duyuru'}
                                </h5>
                                <button type="button" className="close" onClick={closeModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Başlık *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="baslik"
                                            value={formData.baslik}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>İçerik *</label>
                                        <textarea
                                            className="form-control"
                                            name="icerik"
                                            rows={5}
                                            value={formData.icerik}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Durum</label>
                                        <select
                                            className="form-control"
                                            name="durum"
                                            value={formData.durum}
                                            onChange={handleInputChange}
                                        >
                                            {DuyuruService.getDurumSecenekleri().map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Oluşturan Kullanıcı</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="olusturanKullanici"
                                            value={formData.olusturanKullanici}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                        İptal
                                    </button>
                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                        {loading ? 'Kaydediliyor...' : (isEditMode ? 'Güncelle' : 'Kaydet')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DuyuruYonetimi; 