import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import ParticleBackground from "../backgroundAnim/particle.tsx";

interface RegisterCredentials {
    TCNo: string;
    isim: string;
    Password: string; // Backend büyük P ile bekliyor
    profilFoto?: string;
}

// Authentication Service
const authService = {
    register: async (credentials: RegisterCredentials) => {
        const { data } = await axios.post('http://localhost:8080/api/auth/register', credentials, {
            withCredentials: true
        });
        return data;
    }
};

const SignUP: React.FC = () => {
    const [TCNo, setTCNo] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [profilFoto, setProfilFoto] = useState<string>('');
    const [regismessage, setregisMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [redirectCountdown, setRedirectCountdown] = useState<number | null>(null);

    // Doğrulama hataları için state'ler
    const [tcNoError, setTcNoError] = useState<string | null>(null);
    const [isimError, setIsimError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    // Şifre güçlülük seviyesi için state
    const [passwordStrength, setPasswordStrength] = useState<number>(0);

    // Profil fotoğrafı yükleme fonksiyonu
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Dosya boyutu kontrolü (1MB - daha küçük limit)
            if (file.size > 1 * 1024 * 1024) {
                setError('Dosya boyutu 1MB\'dan küçük olmalıdır.');
                return;
            }

            // Dosya tipi kontrolü
            if (!file.type.startsWith('image/')) {
                setError('Lütfen sadece resim dosyası seçin.');
                return;
            }

            try {
                // FormData oluştur
                const formData = new FormData();
                formData.append('file', file);

                // Dosyayı backend'e yükle
                const response = await fetch('http://localhost:8080/api/files/upload', {
                    method: 'POST',
                    body: formData,
                });

                const result = await response.json();

                if (result.success) {
                    setProfilFoto(result.fileName); // Sadece dosya adını sakla
                    setError(null);
                } else {
                    setError(result.message || 'Resim yüklenemedi.');
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                setError('Resim yüklenirken hata oluştu.');
            }
        }
    };

    const registermutation = useMutation({
        mutationFn: authService.register,
        onSuccess: (data) => {
            setregisMessage(data.response?.data?.message || 'Kaydolma başarılı');
        },
        onError: (error: any) => {
            if (error.response?.status === 409) {
                setError('Bu TC Kimlik No ile kayıtlı bir kullanıcı zaten var.');
            } else {
                setError(
                    error.response?.data?.message ||
                    'Kayıt işlemi başarısız. Lütfen tüm alanları doğru doldurduğunuzdan emin olun.'
                );
            }
        }
    });

    // Başarılı kayıt sonrası geri sayım ve yönlendirme
    useEffect(() => {
        if (redirectCountdown !== null && redirectCountdown > 0) {
            const timer = setTimeout(() => {
                setRedirectCountdown(redirectCountdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (redirectCountdown === 0) {
            navigate('/login');
        }
    }, [redirectCountdown, navigate]);

    // TC Kimlik numarası doğrulama (Test için basitleştirildi)
    const validateTCNo = (tcno: string): boolean => {
        // Sadece 11 haneli olmalı ve sadece rakam içermeli
        const regex = /^\d{11}$/;
        if (!regex.test(tcno)) {
            if (tcno.length === 0) {
                setTcNoError("TC Kimlik No boş olamaz");
            } else if (tcno.length < 11) {
                setTcNoError("TC Kimlik No 11 haneli olmalıdır");
            } else if (tcno.length > 11) {
                setTcNoError("TC Kimlik No 11 haneli olmalıdır");
            } else {
                setTcNoError("TC Kimlik No sadece rakam içermelidir");
            }
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

    // Parola doğrulama (Test için basitleştirildi)
    const validatePassword = (pass: string): boolean => {
        if (pass.length === 0) {
            setPasswordError("Parola boş olamaz");
            setPasswordStrength(0);
            return false;
        }

        // Şifre güçlülüğünü hesapla
        let strength = 0;

        // Uzunluk kontrolü
        if (pass.length >= 6) strength += 1;
        if (pass.length >= 8) strength += 1;

        // Karakter çeşitliliği kontrolleri
        if (/[A-Z]/.test(pass)) strength += 1; // büyük harf kontrolü
        if (/[a-z]/.test(pass)) strength += 1; // küçük harf kontrolü
        if (/\d/.test(pass)) strength += 1; // rakam kontrolü

        // Güçlülük seviyesini güncelle (0-5 arası)
        setPasswordStrength(strength);

        // Basit doğrulama (test için)
        if (pass.length < 6) {
            setPasswordError("Parola en az 6 karakter olmalıdır");
            return false;
        }

        setPasswordError(null);
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setTcNoError(null);
        setIsimError(null);
        setPasswordError(null);

        let hasError = false;

        // TC Kimlik No doğrulama
        if (!validateTCNo(TCNo)) {
            hasError = true;
        }

        // İsim doğrulama
        if (!validateIsim(isim)) {
            hasError = true;
        }

        // Parola doğrulama
        if (!validatePassword(password)) {
            hasError = true;
        }

        // Eğer herhangi bir doğrulama hatası yoksa formu gönder
        if (!hasError) {
            // Büyük P ile Password kullanarak gönderelim (backend'in beklediği format)
            registermutation.mutate({
                TCNo: TCNo,
                isim: isim,
                Password: password, // Büyük P ile Password olarak gönder
                profilFoto: profilFoto
            });
        }
    };

    return (
        <AnimatePresence mode="wait">
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6 }}
                className="relative flex items-center justify-center h-screen"
            >
                <ParticleBackground />
                <div className="w-full max-w-md z-10">
                    <div className="block rounded-lg bg-white shadow-lg ">
                        <div className="g-0 flex flex-wrap flex-row-reverse">
                            <div className="w-full p-6">
                                <div className="text-center mb-4">
                                    <img
                                        className="w-40 mx-auto"
                                        src="/images/logo.png"
                                        alt="Logo"
                                    />
                                </div>
                                <h4 className="mb-4 text-lg font-semibold text-center">
                                    Personel Kayıt Ol Sayfası
                                </h4>
                                {error && (
                                    <div className="text-red-500 text-center mb-4">
                                        {error}
                                    </div>
                                )}
                                {regismessage && (
                                    <div className="text-blue-500 text-center mb-4">
                                        {regismessage}
                                    </div>
                                )}
                                <form onSubmit={handleSubmit}>
                                    {/* TC Kimlik No */}
                                    <div className="mb-3">
                                        <input
                                            value={TCNo}
                                            placeholder="TC Kimlik No"
                                            type="text" /* number yerine text kullanıyoruz, çünkü doğrulamayı kendimiz yapacağız */
                                            onChange={(e) => {
                                                setTCNo(e.target.value);
                                                validateTCNo(e.target.value);
                                            }}
                                            required
                                            className={`w-full px-3 py-2 border-b ${tcNoError ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500 transition-colors duration-300`}
                                        />
                                        {tcNoError && (
                                            <div className="text-red-500 text-xs mt-1">{tcNoError}</div>
                                        )}
                                    </div>

                                    {/* İsim */}
                                    <div className="mb-3">
                                        <input
                                            value={isim}
                                            placeholder="İsim"
                                            type="text"
                                            onChange={(e) => {
                                                setIsim(e.target.value);
                                                validateIsim(e.target.value);
                                            }}
                                            required
                                            className={`w-full px-3 py-2 border-b ${isimError ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500 transition-colors duration-300`}
                                        />
                                        {isimError && (
                                            <div className="text-red-500 text-xs mt-1">{isimError}</div>
                                        )}
                                    </div>

                                    {/* Parola */}
                                    <div className="mb-3 relative">
                                        <div className="flex items-center">
                                            <input
                                                value={password}
                                                placeholder="Parola"
                                                type={showPassword ? "text" : "password"}
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                    validatePassword(e.target.value);
                                                }}
                                                required
                                                className={`w-full px-3 py-2 border-b ${passwordError ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500 transition-colors duration-300`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-2 text-gray-500"
                                            >
                                                {showPassword ? (
                                                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'/%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3C/svg%3E" alt="hide password" />
                                                ) : (
                                                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24'/%3E%3Cline x1='1' y1='1' x2='23' y2='23'/%3E%3C/svg%3E" alt="show password" />
                                                )}
                                            </button>
                                        </div>

                                        {/* Şifre güçlülük göstergesi */}
                                        {password.length > 0 && (
                                            <div className="mt-2">
                                                <div className="flex w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full ${
                                                            (() => {
                                                                if (passwordStrength < 2) return 'bg-red-500';
                                                                if (passwordStrength < 4) return 'bg-yellow-500';
                                                                return 'bg-green-500';
                                                            })()
                                                        }`}
                                                        style={{ width: `${(passwordStrength / 6) * 100}%` }}
                                                    ></div>
                                                </div>
                                                <p className="text-xs mt-1 text-gray-500">
                                                    {(() => {
                                                        if (passwordStrength < 2) return 'Zayıf şifre';
                                                        if (passwordStrength < 4) return 'Orta şifre';
                                                        return 'Güçlü şifre';
                                                    })()}
                                                </p>
                                            </div>
                                        )}

                                        {passwordError && (
                                            <div className="text-red-500 text-xs mt-1">{passwordError}</div>
                                        )}
                                    </div>

                                    {/* Profil Fotoğrafı */}
                                    <div className="mb-3">
                                        <label htmlFor="profile-photo" className="block text-sm font-medium text-gray-700 mb-2">
                                            Profil Fotoğrafı (İsteğe Bağlı)
                                        </label>
                                        <div className="flex items-center space-x-4">
                                            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                                                {profilFoto ? (
                                                    <img
                                                        src={`http://localhost:8080/api/files/image/${profilFoto}`}
                                                        alt="Profil Önizleme"
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <input
                                                    id="profile-photo"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileUpload}
                                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                />
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Maksimum 1MB, JPG, PNG formatları desteklenir
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center mb-4">
                                        <button
                                            className="w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                                            style={{
                                                background: "linear-gradient(to right, #022842, #222222)",
                                            }}
                                            type="submit"
                                            disabled={registermutation.isPending}
                                        >
                                            {(() => {
                                                if (registermutation.isPending) return 'Kayıt Yapılıyor...';
                                                if (redirectCountdown !== null) return 'Kayıt Başarılı';
                                                return 'Kayıt Ol';
                                            })()}
                                        </button>
                                        <a
                                            href="#"
                                            className="block mt-2 text-sm text-blue-600 "
                                        >
                                            Parolanızı Mı Unuttunuz?
                                        </a>
                                    </div>
                                    <div className="flex flex-col items-center justify-center mt-4">
                                        <p className="mb-2 text-sm text-gray-700 ">
                                            Hesabınız Var mı?
                                        </p>
                                        <Link to="/login">
                                            <button
                                                type="button"
                                                className="w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                                                style={{
                                                    backgroundColor: "#f7a600",
                                                }}>
                                                Giriş Yap
                                            </button>
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>
        </AnimatePresence>
    );
};

export default SignUP;