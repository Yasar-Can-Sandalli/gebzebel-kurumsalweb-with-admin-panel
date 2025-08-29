import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import ParticleBackground from "../backgroundAnim/particle.tsx";

interface RegisterCredentials {
    TCNo: string;
    isim: string;
    Password: string; // Backend büyük P ile bekliyor
}

// Authentication Service
const authService = {
    register: async (credentials: RegisterCredentials) => {
        console.log('Gönderilen kayıt bilgileri:', credentials);
        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', credentials, {
                withCredentials: true
            });
            console.log('Kayıt başarılı, sunucu yanıtı:', response.data);
            return response.data;
        } catch (error) {
            console.error('Kayıt hatası:', error);
            throw error;
        }
    }
};

const SignUP: React.FC = () => {
    const navigate = useNavigate();
    const [TCNo, setTCNo] = useState('');
    const [isim, setIsim] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [regismessage, setregisMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [redirectCountdown, setRedirectCountdown] = useState<number | null>(null);
    
    // Doğrulama hataları için state'ler
    const [tcNoError, setTcNoError] = useState<string | null>(null);
    const [isimError, setIsimError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    
    // Şifre güçlülük seviyesi için state
    const [passwordStrength, setPasswordStrength] = useState<number>(0);
    
    const registermutation = useMutation({
        mutationFn: authService.register,
        onSuccess: () => {
            setregisMessage('Kayıt işlemi başarılı! Giriş sayfasına yönlendiriliyorsunuz...');
            setRedirectCountdown(3); // 3 saniye sonra yönlendir
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

    // TC Kimlik numarası doğrulama
    const validateTCNo = (tcno: string): boolean => {
        // 11 haneli olmalı ve sadece rakam içermeli
        const regex = /^\d{11}$/;
        if (!regex.test(tcno)) {
            return false;
        }
        
        // TC Kimlik algoritması kontrolü
        // 1) İlk hane 0 olamaz
        if (tcno[0] === '0') {
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
            return false;
        }
        
        // 3) İlk 10 hanenin toplamının 10'a bölümünden kalan 11. haneyi vermelidir
        let sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(tcno[i]);
        }
        
        const digit11 = sum % 10;
        if (digit11 !== parseInt(tcno[10])) {
            return false;
        }
        
        return true;
    };

    // İsim doğrulama
    const validateIsim = (name: string): boolean => {
        // Sadece harfler ve boşluk içermeli
        const regex = /^[a-zA-ZğüşıöçĞÜŞİÖÇ ]+$/;
        return regex.test(name);
    };

    // Parola doğrulama ve güçlülük hesaplama
    const validatePassword = (pass: string): boolean => {
        // Şifre güçlülüğünü hesapla
        let strength = 0;
        
        // Uzunluk kontrolü
        if (pass.length >= 8) strength += 1;
        if (pass.length >= 12) strength += 1;
        
        // Karakter çeşitliliği kontrolleri
        if (/[A-Z]/.test(pass)) strength += 1; // büyük harf kontrolü
        if (/[a-z]/.test(pass)) strength += 1; // küçük harf kontrolü
        if (/[0-9]/.test(pass)) strength += 1; // rakam kontrolü
        if (/[?@!#%+\-*%]/.test(pass)) strength += 1; // özel karakter kontrolü
        
        // Güçlülük seviyesini güncelle (0-5 arası)
        setPasswordStrength(strength);
        
        // Doğrulama sonucu
        return pass.length >= 8 && 
               /[A-Z]/.test(pass) && 
               /[a-z]/.test(pass) && 
               /[0-9]/.test(pass) && 
               /[?@!#%+\-*%]/.test(pass);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Form gönderilmeden önce tüm hata mesajlarını temizle
        setError(null);
        setTcNoError(null);
        setIsimError(null);
        setPasswordError(null);
        
        let hasError = false;
        
        // TC Kimlik No doğrulama
        if (!validateTCNo(TCNo)) {
            setTcNoError("Geçerli bir TC Kimlik Numarası giriniz");
            hasError = true;
        }
        
        // İsim doğrulama
        if (!validateIsim(isim)) {
            setIsimError("İsim sadece harflerden oluşmalıdır");
            hasError = true;
        }
        
        // Parola doğrulama
        if (!validatePassword(password)) {
            setPasswordError("Parola en az 8 karakter uzunluğunda olmalı ve büyük harf, küçük harf, rakam ve özel karakter içermelidir");
            hasError = true;
        }
        
        // Eğer herhangi bir doğrulama hatası yoksa formu gönder
        if (!hasError) {
            // Büyük P ile Password kullanarak gönderelim (backend'in beklediği format)
            registermutation.mutate({
                TCNo: TCNo,
                isim: isim,
                Password: password // Büyük P ile Password olarak gönder
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
                                    <div className="text-green-600 text-center mb-4 font-medium">
                                        {regismessage}
                                        {redirectCountdown !== null && (
                                            <div className="mt-1 text-sm">
                                                {redirectCountdown} saniye içinde yönlendirileceksiniz...
                                            </div>
                                        )}
                                    </div>
                                )}
                                <form onSubmit={handleSubmit}>
                                    {/* TC Kimlik No */}
                                    <div className="mb-3">
                                        <input
                                            value={TCNo}
                                            placeholder="TC Kimlik No"
                                            type="text" /* number yerine text kullanıyoruz, çünkü doğrulamayı kendimiz yapacağız */
                                            onChange={(e) => setTCNo(e.target.value)}
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
                                            onChange={(e) => setIsim(e.target.value)}
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
                                                    <span role="img" aria-label="hide">👁️‍🗨️</span>
                                                ) : (
                                                    <span role="img" aria-label="show">👁️</span>
                                                )}
                                            </button>
                                        </div>
                                        
                                        {/* Şifre güçlülük göstergesi */}
                                        {password.length > 0 && (
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
                                            <div className="text-red-500 text-xs mt-1">{passwordError}</div>
                                        )}
                                    </div>
                                    <div className="text-center mb-4">
                                        <button
                                            className="w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                                            style={{
                                                background: "linear-gradient(to right, #022842, #222222)",
                                            }}
                                            type="submit"
                                            disabled={registermutation.isPending || redirectCountdown !== null}
                                        >
                                            {registermutation.isPending ? 'Kayıt Yapılıyor...' : 
                                             redirectCountdown !== null ? 'Kayıt Başarılı' : 'Kayıt Ol'}
                                        </button>
                                        <a
                                            href="#"
                                            className="block mt-2 text-sm text-blue-600"
                                        >
                                            Parolanızı Mı Unuttunuz?
                                        </a>
                                    </div>
                                    <div className="flex flex-col items-center justify-center mt-4">
                                        <p className="mb-2 text-sm text-gray-700">
                                            Hesabınız Var mı?
                                        </p>
                                        <Link to="/login">
                                            <button
                                                type="button"
                                                className="w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                                                style={{
                                                    backgroundColor: "#f7a600",
                                                }}
                                            >
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