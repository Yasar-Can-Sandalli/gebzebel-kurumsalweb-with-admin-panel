import React, { useState, useEffect } from 'react';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useAuthStore } from '../store/authStore';
import { User, Save, Eye, EyeOff, Upload, X } from 'lucide-react';

interface UserSettings {
    isim: string;
    password: string;
    newPassword: string;
    confirmPassword: string;
    profilFoto: string;
}

export default function SettingsPage() {
    const { currentUser, loading, refetch } = useCurrentUser();
    const { updateUser } = useAuthStore();
    
    const [settings, setSettings] = useState<UserSettings>({
        isim: '',
        password: '',
        newPassword: '',
        confirmPassword: '',
        profilFoto: ''
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Kullanıcı bilgilerini yükle
    useEffect(() => {
        if (currentUser) {
            setSettings(prev => ({
                ...prev,
                isim: currentUser.isim || '',
                profilFoto: currentUser.profilFoto || ''
            }));
        }
    }, [currentUser]);

    // Form validasyonu
    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!settings.isim.trim()) {
            newErrors.isim = 'İsim boş olamaz';
        } else if (settings.isim.length < 2) {
            newErrors.isim = 'İsim en az 2 karakter olmalıdır';
        }

        if (settings.newPassword) {
            if (settings.newPassword.length < 6) {
                newErrors.newPassword = 'Yeni şifre en az 6 karakter olmalıdır';
            }
            if (settings.newPassword !== settings.confirmPassword) {
                newErrors.confirmPassword = 'Şifreler eşleşmiyor';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Profil fotoğrafı yükleme
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 1 * 1024 * 1024) {
                setMessage({ type: 'error', text: 'Dosya boyutu 1MB\'dan küçük olmalıdır.' });
                return;
            }
            
            if (!file.type.startsWith('image/')) {
                setMessage({ type: 'error', text: 'Lütfen sadece resim dosyası seçin.' });
                return;
            }

            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('directory', 'user_images'); // Kullanıcı resimleri için user_images dizini

                const response = await fetch('http://localhost:8080/api/files/upload', {
                    method: 'POST',
                    body: formData,
                });

                const result = await response.json();

                if (result.success) {
                    // Eski dosyayı sil (eğer varsa)
                    const currentPhoto = settings.profilFoto;
                    if (currentPhoto && currentPhoto.trim() !== '') {
                        try {
                            await fetch(`http://localhost:8080/api/files/delete`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ 
                                    fileName: currentPhoto,
                                    directory: 'user_images'
                                }),
                            });
                        } catch (deleteError) {
                            console.warn('Eski dosya silinemedi:', deleteError);
                        }
                    }

                    setSettings(prev => ({ ...prev, profilFoto: result.fileName }));
                    setMessage({ type: 'success', text: 'Profil fotoğrafı yüklendi.' });
                } else {
                    setMessage({ type: 'error', text: result.message || 'Resim yüklenemedi.' });
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                setMessage({ type: 'error', text: 'Resim yüklenirken hata oluştu.' });
            }
        }
    };

    // Profil fotoğrafını kaldırma
    const removeProfilePhoto = async () => {
        const currentPhoto = settings.profilFoto;
        if (currentPhoto && currentPhoto.trim() !== '') {
            try {
                await fetch(`http://localhost:8080/api/files/delete`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        fileName: currentPhoto,
                        directory: 'user_images'
                    }),
                });
            } catch (deleteError) {
                console.warn('Dosya silinemedi:', deleteError);
            }
        }
        
        setSettings(prev => ({ ...prev, profilFoto: '' }));
        setMessage({ type: 'success', text: 'Profil fotoğrafı kaldırıldı.' });
    };

    // Form gönderme
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setErrors({});

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Oturum bulunamadı');
            }

            // Eski profil fotoğrafını sil (eğer değiştiyse)
            const oldPhoto = currentUser?.profilFoto;
            const newPhoto = settings.profilFoto;
            if (oldPhoto && oldPhoto !== newPhoto && oldPhoto.trim() !== '') {
                try {
                    await fetch(`http://localhost:8080/api/files/delete`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ 
                            fileName: oldPhoto,
                            directory: 'user_images'
                        }),
                    });
                } catch (deleteError) {
                    console.warn('Eski profil fotoğrafı silinemedi:', deleteError);
                }
            }

            const updateData: any = {
                isim: settings.isim,
                profilFoto: settings.profilFoto
            };

            // Şifre değişikliği varsa ekle
            if (settings.newPassword) {
                updateData.password = settings.password;
                updateData.newPassword = settings.newPassword;
            }

            const response = await fetch('http://localhost:8080/api/auth/update-profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updateData)
            });

            const result = await response.json();

            if (response.ok && result.status === 'success') {
                setMessage({ type: 'success', text: 'Ayarlar başarıyla güncellendi.' });
                
                // Auth store'u hemen güncelle (anında görünüm için)
                updateUser({
                    isim: settings.isim,
                    profilFoto: settings.profilFoto
                });
                
                // Kullanıcı bilgilerini yenile (tam veri senkronizasyonu için)
                try {
                    await refetch();
                    console.log('User data refreshed successfully');
                } catch (refreshError) {
                    console.error('Error refreshing user data:', refreshError);
                }
                
                // Şifre alanlarını temizle
                setSettings(prev => ({
                    ...prev,
                    password: '',
                    newPassword: '',
                    confirmPassword: ''
                }));
            } else {
                setMessage({ type: 'error', text: result.message || 'Güncelleme başarısız.' });
            }
        } catch (error: any) {
            console.error('Update error:', error);
            setMessage({ type: 'error', text: error.message || 'Bir hata oluştu.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-slate-800">Ayarlar</h1>
            </div>

            {message && (
                <div className={`p-4 rounded-lg ${
                    message.type === 'success' 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profil Bilgileri */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl p-6 shadow-md shadow-blue-500/5 ring-1 ring-slate-200/60">
                        <h2 className="text-lg font-semibold text-slate-800 mb-4">Profil Bilgileri</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* İsim */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    İsim Soyisim
                                </label>
                                <input
                                    type="text"
                                    value={settings.isim}
                                    onChange={(e) => setSettings(prev => ({ ...prev, isim: e.target.value }))}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500/60 outline-none ${
                                        errors.isim ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="İsim Soyisim"
                                />
                                {errors.isim && (
                                    <p className="text-red-500 text-sm mt-1">{errors.isim}</p>
                                )}
                            </div>

                            {/* Mevcut Şifre */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mevcut Şifre (şifre değiştirmek için)
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={settings.password}
                                        onChange={(e) => setSettings(prev => ({ ...prev, password: e.target.value }))}
                                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/60 outline-none"
                                        placeholder="Mevcut şifrenizi girin"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {/* Yeni Şifre */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Yeni Şifre
                                </label>
                                <div className="relative">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        value={settings.newPassword}
                                        onChange={(e) => setSettings(prev => ({ ...prev, newPassword: e.target.value }))}
                                        className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500/60 outline-none ${
                                            errors.newPassword ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Yeni şifrenizi girin"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    >
                                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                {errors.newPassword && (
                                    <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                                )}
                            </div>

                            {/* Şifre Onayı */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Yeni Şifre Onayı
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={settings.confirmPassword}
                                        onChange={(e) => setSettings(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                        className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500/60 outline-none ${
                                            errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Yeni şifrenizi tekrar girin"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    >
                                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Save size={16} />
                                {isSubmitting ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Profil Fotoğrafı */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl p-6 shadow-md shadow-blue-500/5 ring-1 ring-slate-200/60">
                        <h2 className="text-lg font-semibold text-slate-800 mb-4">Profil Fotoğrafı</h2>
                        
                        <div className="text-center">
                            <div className="w-32 h-32 mx-auto rounded-full bg-gray-200 overflow-hidden mb-4">
                                {settings.profilFoto ? (
                                    <img
                                        src={`http://localhost:8080/api/files/image/${settings.profilFoto}`}
                                        alt="Profil Fotoğrafı"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <User className="w-12 h-12 text-gray-400" />
                                    </div>
                                )}
                            </div>
                            
                            <div className="space-y-2">
                                <label className="block">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                    />
                                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
                                        <Upload size={16} />
                                        Fotoğraf Yükle
                                    </span>
                                </label>
                                
                                {settings.profilFoto && (
                                    <button
                                        onClick={removeProfilePhoto}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                    >
                                        <X size={16} />
                                        Kaldır
                                    </button>
                                )}
                            </div>
                            
                            <p className="text-xs text-gray-500 mt-2">
                                Maksimum 1MB, JPG, PNG formatları desteklenir
                            </p>
                        </div>
                    </div>

                    {/* Hesap Bilgileri */}
                    <div className="bg-white rounded-xl p-6 shadow-md shadow-blue-500/5 ring-1 ring-slate-200/60 mt-6">
                        <h2 className="text-lg font-semibold text-slate-800 mb-4">Hesap Bilgileri</h2>
                        
                        <div className="space-y-3 text-sm">
                            <div>
                                <span className="text-gray-500">TC Kimlik No:</span>
                                <span className="ml-2 font-medium">{currentUser?.tcno}</span>
                            </div>
                            <div>
                                <span className="text-gray-500">Durum:</span>
                                <span className="ml-2 font-medium">{currentUser?.status}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
