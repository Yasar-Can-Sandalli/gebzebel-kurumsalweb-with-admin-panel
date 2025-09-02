import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../services/userService.tsx';
import { PermissionService } from '../services/YetkiServis.tsx';

// Düzenlenebilir statüler
const assignableStatusOptions = ['Aktif', 'Pasif', 'Beklemede'];

/** Form için ayrı tip: password burada, User modelinde olmak zorunda değil */
type AddUserForm = {
    tcno: string;
    isim: string;
    password: string;
    status: string;
    yetkilerJson: string;
};

export default function AddUserPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<AddUserForm>({
        tcno: '',
        isim: '',
        password: '',
        status: assignableStatusOptions[0],
        yetkilerJson: '{}',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    
    // Doğrulama hataları için state'ler
    const [tcNoError, setTcNoError] = useState<string | null>(null);
    const [isimError, setIsimError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    
    // Şifre güçlülük seviyesi için state
    const [passwordStrength, setPasswordStrength] = useState<number>(0);
    const [showPassword, setShowPassword] = useState(false);

    // Yetkiler servisinden gelen nesne
    const [yetkiler, setYetkiler] = useState(PermissionService.getDefaultPermissions());

    // Yetkiler değişince formData.yetkilerJson güncelle
    useEffect(() => {
        setFormData(prev => ({ ...prev, yetkilerJson: JSON.stringify(yetkiler) }));
    }, [yetkiler]);

    // TC Kimlik numarası doğrulama
    const validateTCNo = (tcno: string): boolean => {
        // 11 haneli olmalı ve sadece rakam içermeli
        const regex = /^\d{11}$/;
        if (!regex.test(tcno)) {
            if (tcno.length === 0) {
                setTcNoError("TC Kimlik No boş olamaz");
            } else if (tcno.length < 11) {
                setTcNoError("TC Kimlik No 11 haneli olmalıdır (eksik hane)");
            } else if (tcno.length > 11) {
                setTcNoError("TC Kimlik No 11 haneli olmalıdır (fazla hane)");
            } else {
                setTcNoError("TC Kimlik No sadece rakam içermelidir");
            }
            return false;
        }
        
        // TC Kimlik algoritması kontrolü
        // 1) İlk hane 0 olamaz
        if (tcno[0] === '0') {
            setTcNoError("TC Kimlik No 0 ile başlayamaz");
            return false;
        }
        
        // 2) 1, 3, 5, 7, 9. hanelerin toplamının 7 katı ile 2, 4, 6, 8. hanelerin toplamı çıkartılır
        // ve sonucun 10'a bölümünden kalan 10. haneyi vermelidir
        let oddSum = 0;
        let evenSum = 0;
        
        for (let i = 0; i < 9; i += 2) {
            oddSum += parseInt(tcno[i]);
        }
        
        for (let i = 1; i < 8; i += 2) {
            evenSum += parseInt(tcno[i]);
        }
        
        const digit10 = (oddSum * 7 - evenSum) % 10;
        if (digit10 !== parseInt(tcno[9])) {
            setTcNoError("Geçersiz TC Kimlik No (10. hane kontrolü başarısız)");
            return false;
        }
        
        // 3) İlk 10 hanenin toplamının 10'a bölümünden kalan 11. haneyi vermelidir
        let sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(tcno[i]);
        }
        
        const digit11 = sum % 10;
        if (digit11 !== parseInt(tcno[10])) {
            setTcNoError("Geçersiz TC Kimlik No (11. hane kontrolü başarısız)");
            return false;
        }
        
        setTcNoError(null);
        return true;
    };

    // İsim doğrulama
    const validateIsim = (name: string): boolean => {
        if (name.length === 0) {
            setIsimError("İsim boş olamaz");
            return false;
        }
        
        // Sadece harfler ve boşluk içermeli
        const regex = /^[a-zA-ZğüşıöçĞÜŞİÖÇ ]+$/;
        if (!regex.test(name)) {
            setIsimError("İsim sadece harflerden oluşmalıdır (sayı ve özel karakter kullanılamaz)");
            return false;
        }
        
        if (name.length < 2) {
            setIsimError("İsim en az 2 karakter olmalıdır");
            return false;
        }
        
        setIsimError(null);
        return true;
    };

    // Parola doğrulama ve güçlülük hesaplama
    const validatePassword = (pass: string): boolean => {
        if (pass.length === 0) {
            setPasswordError("Parola boş olamaz");
            setPasswordStrength(0);
            return false;
        }
        
        // Şifre güçlülüğünü hesapla
        let strength = 0;
        
        // Uzunluk kontrolü
        if (pass.length >= 8) strength += 1;
        if (pass.length >= 12) strength += 1;
        
        // Karakter çeşitliliği kontrolleri
        if (/[A-Z]/.test(pass)) strength += 1; // büyük harf kontrolü
        if (/[a-z]/.test(pass)) strength += 1; // küçük harf kontrolü
        if (/\d/.test(pass)) strength += 1; // rakam kontrolü
        if (/[?@!#%+\-*]/.test(pass)) strength += 1; // özel karakter kontrolü
        
        // Güçlülük seviyesini güncelle (0-5 arası)
        setPasswordStrength(strength);
        
        // Detaylı hata mesajları
        if (pass.length < 8) {
            setPasswordError("Parola en az 8 karakter olmalıdır");
            return false;
        }
        
        if (!/[A-Z]/.test(pass)) {
            setPasswordError("Parola en az bir büyük harf içermelidir");
            return false;
        }
        
        if (!/[a-z]/.test(pass)) {
            setPasswordError("Parola en az bir küçük harf içermelidir");
            return false;
        }
        
        if (!/\d/.test(pass)) {
            setPasswordError("Parola en az bir rakam içermelidir");
            return false;
        }
        
        if (!/[?@!#%+\-*]/.test(pass)) {
            setPasswordError("Parola en az bir özel karakter (?@!#%+-*) içermelidir");
            return false;
        }
        
        setPasswordError(null);
        return true;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Real-time validation
        if (name === 'tcno') {
            validateTCNo(value);
        } else if (name === 'isim') {
            validateIsim(value);
        } else if (name === 'password') {
            validatePassword(value);
        }
    };

    const handleYetkiChange = (alan: string, yetki: string, value: boolean) => {
        setYetkiler((prev: any) => {
            const updated = {
                ...prev,
                [alan]: {
                    ...prev[alan],
                    [yetki]: value
                }
            };
            return updated;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Form gönderilmeden önce tüm hata mesajlarını temizle
        setErrorMessage(null);
        setTcNoError(null);
        setIsimError(null);
        setPasswordError(null);
        
        let hasError = false;
        
        // TC Kimlik No doğrulama
        if (!validateTCNo(formData.tcno)) {
            hasError = true;
        }
        
        // İsim doğrulama
        if (!validateIsim(formData.isim)) {
            hasError = true;
        }
        
        // Parola doğrulama
        if (!validatePassword(formData.password)) {
            hasError = true;
        }
        
        // Eğer herhangi bir doğrulama hatası yoksa formu gönder
        if (!hasError) {
            setIsSubmitting(true);
            
            try {
                const { tcno, isim, password, status } = formData;
                const newUserData = {
                    tcno,
                    isim,
                    password,
                    status,
                    yetkilerJson: JSON.stringify(yetkiler),
                };

                await createUser(newUserData);
                navigate('/panel/users');
            } catch (error: any) {
                console.error('Failed to add user:', error);
                setErrorMessage(error?.message || 'Kullanıcı oluşturma başarısız');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const inputCls = "rounded-lg px-3 py-2 bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500/60 outline-none";

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-slate-800">Yeni Kullanıcı</h1>
                <Link to="/panel/users" className="rounded-lg px-3 py-2 ring-1 ring-slate-200 hover:bg-slate-50">
                    Listeye Dön
                </Link>
            </div>

            {errorMessage && (
                <div className="text-red-600 bg-red-50 rounded-lg px-4 py-2 ring-1 ring-red-200">
                    {errorMessage}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-2xl space-y-3 bg-white rounded-xl p-5 shadow-md shadow-blue-500/5 ring-1 ring-slate-200/60"
            >
                <div>
                    <input
                        type="text"
                        placeholder="TC Kimlik No"
                        className={`${inputCls} ${tcNoError ? 'ring-red-500 border-red-500' : ''}`}
                        name="tcno"
                        value={formData.tcno}
                        onChange={handleChange}
                        required
                    />
                    {tcNoError && (
                        <div className="text-red-500 text-sm mt-1">{tcNoError}</div>
                    )}
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="İsim Soyisim"
                        className={`${inputCls} ${isimError ? 'ring-red-500 border-red-500' : ''}`}
                        name="isim"
                        value={formData.isim}
                        onChange={handleChange}
                        required
                    />
                    {isimError && (
                        <div className="text-red-500 text-sm mt-1">{isimError}</div>
                    )}
                </div>

                <div>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Parola"
                            className={`${inputCls} ${passwordError ? 'ring-red-500 border-red-500' : ''} pr-10`}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? (
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'/%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3C/svg%3E" alt="hide password" />
                            ) : (
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24'/%3E%3Cline x1='1' y1='1' x2='23' y2='23'/%3E%3C/svg%3E" alt="show password" />
                            )}
                        </button>
                    </div>
                    
                    {/* Şifre güçlülük göstergesi */}
                    {formData.password.length > 0 && (
                        <div className="mt-2">
                            <div className="flex w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full ${
                                        passwordStrength < 2 ? 'bg-red-500' : 
                                        passwordStrength < 4 ? 'bg-yellow-500' : 
                                        'bg-green-500'
                                    }`}
                                    style={{ width: `${(passwordStrength / 6) * 100}%` }}
                                ></div>
                            </div>
                            <p className="text-xs mt-1 text-gray-500">
                                {passwordStrength < 2 ? 'Zayıf şifre' : 
                                 passwordStrength < 4 ? 'Orta şifre' : 
                                 'Güçlü şifre'}
                            </p>
                        </div>
                    )}
                    
                    {passwordError && (
                        <div className="text-red-500 text-sm mt-1">{passwordError}</div>
                    )}
                </div>

                <select
                    className={inputCls}
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                >
                    {assignableStatusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>

                {/* Yetkiler */}
                <div className="space-y-4">
                    <div className="block text-sm font-medium text-gray-700">Yetkiler</div>
                    <div className="space-y-4">
                        {Object.entries(yetkiler).map(([alan, yetkiGrubu]: [string, any]) => (
                            <div key={alan} className="border p-3 rounded">
                                <h4 className="font-medium text-gray-900 mb-2 capitalize">{alan}</h4>
                                <div className="space-y-2">
                                    {Object.entries(yetkiGrubu).map(([yetki, deger]: [string, any]) => (
                                        <label key={`${alan}-${yetki}`} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={deger}
                                                onChange={(e) => handleYetkiChange(alan, yetki, e.target.checked)}
                                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700 capitalize">
                                                {yetki}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-sky-600 shadow-lg shadow-blue-500/20 disabled:opacity-60"
                    >
                        {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
                    </button>
                </div>
            </form>
        </div>
    );
}
