// LoginForm2.tsx
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ParticleBackground from "../backgroundAnim/particle.tsx";
import { login } from "../AdminPanel/services/authService.tsx";
import { useAuthStore } from "../AdminPanel/store/authStore";

// Custom Ripple Effect Hook
const useRippleEffect = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget;
        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
        circle.classList.add("ripple");

        const ripple = button.getElementsByClassName("ripple")[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    };

    return { buttonRef, createRipple };
};

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [tcNoError, setTcNoError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuthStore();

    const { buttonRef: loginButtonRef, createRipple: createLoginRipple } = useRippleEffect();
    const { buttonRef: signupButtonRef, createRipple: createSignupRipple } = useRippleEffect();

    React.useEffect(() => {
        if (isAuthenticated && user) {
            navigate('/panel/mainPage');
        }
    }, [isAuthenticated, user, navigate]);

    // TC Kimlik numarası doğrulama
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

    // Parola doğrulama
    const validatePassword = (pass: string): boolean => {
        if (pass.length === 0) {
            setPasswordError("Parola boş olamaz");
            return false;
        }

        if (pass.length < 6) {
            setPasswordError("Parola en az 6 karakter olmalıdır");
            return false;
        }

        setPasswordError(null);
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        setTcNoError(null);
        setPasswordError(null);
        setIsLoading(true);

        // Form doğrulama
        let hasError = false;

        // TC Kimlik No doğrulama
        if (!validateTCNo(username)) {
            hasError = true;
        }

        // Parola doğrulama
        if (!validatePassword(password)) {
            hasError = true;
        }

        // Eğer doğrulama hatası varsa işlemi durdur
        if (hasError) {
            setIsLoading(false);
            return;
        }

        try {
            const success = await login(username, password);
            console.log('Login success:', success);

            // Debug store state
            const storeState = useAuthStore.getState();
            console.log('Store state after login:', {
                isAuthenticated: storeState.isAuthenticated,
                user: storeState.user,
                permissions: storeState.permissions
            });

            if (success) {
                setMessage('Giriş başarılı! Yönlendiriliyorsunuz...');
                navigate('/panel/mainPage');
            } else {
                setError('Giriş başarısız. Kullanıcı adı veya şifre hatalı.');
            }
        } catch (error: any) {
            console.error('Login error:', error);
            
            // Daha detaylı hata mesajları
            if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
                setError('Kullanıcı adı veya şifre hatalı. Lütfen bilgilerinizi kontrol edin.');
            } else if (error.message?.includes('Network') || error.message?.includes('fetch')) {
                setError('Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.');
            } else if (error.message?.includes('404')) {
                setError('Kullanıcı bulunamadı. Lütfen TC Kimlik No\'nuzu kontrol edin.');
            } else {
                setError(error.message || 'Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="h-screen bg-cover bg-center flex items-center justify-center">
            <div className="w-full max-w-md px-4 mx-auto">
                <div className="rounded-lg bg-white shadow-lg">
                    <div className="p-4 sm:p-6 flex flex-col justify-center">
                        <div className="text-center mb-4">
                            <img
                                className="w-32 sm:w-40 mx-auto"
                                src="/images/logo.png"
                                alt="logo"
                            />
                        </div>
                        <h4 className="mb-4 text-base sm:text-lg font-semibold text-center">
                            Personel Giriş Sayfası
                        </h4>

                        {error && (
                            <div className="text-red-500 text-center mb-4">
                                {error}
                            </div>
                        )}
                        {message && (
                            <div className="text-blue-500 text-center mb-4">
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    placeholder="T.C. Kimlik No"
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        validateTCNo(e.target.value);
                                    }}
                                    className={`w-full px-3 py-2 border-b ${tcNoError ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500 transition-colors duration-300`}
                                    required
                                />
                                {tcNoError && (
                                    <div className="text-red-500 text-xs mt-1">{tcNoError}</div>
                                )}
                            </div>
                            <div className="mb-3 relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Parola"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        validatePassword(e.target.value);
                                    }}
                                    className={`w-full px-3 py-2 pr-10 border-b ${passwordError ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500 transition-colors duration-300`}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? (
                                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'/%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3C/svg%3E" alt="hide password" />
                                    ) : (
                                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24'/%3E%3Cline x1='1' y1='1' x2='23' y2='23'/%3E%3C/svg%3E" alt="show password" />
                                    )}
                                </button>
                                {passwordError && (
                                    <div className="text-red-500 text-xs mt-1">{passwordError}</div>
                                )}
                            </div>
                            <div className="text-center mb-4">
                                <button
                                    ref={loginButtonRef}
                                    onClick={createLoginRipple}
                                    type="submit"
                                    disabled={isLoading}
                                    className={`inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out relative overflow-hidden ${
                                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                    style={{
                                        background: "linear-gradient(to right, #022842, #222222)",
                                    }}
                                >
                                    {isLoading ? 'Giriş Yapılıyor...' : 'GİRİŞ YAP'}
                                </button>
                                <button type="button" className="block mt-2 text-sm text-blue-600 hover:text-blue-800">
                                    Parolanızı Mı Unuttunuz?
                                </button>
                            </div>
                            <div className="flex flex-col items-center justify-center mt-4">
                                <p className="mb-2 text-sm text-gray-700">
                                    Hesabınız yok mu?
                                </p>
                                <Link to="/signup">
                                    <button
                                        ref={signupButtonRef}
                                        onClick={createSignupRipple}
                                        type="button"
                                        className="inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out relative overflow-hidden"
                                        style={{
                                            background: "#f7a600",
                                        }}
                                    >
                                        KAYIT OL
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ParticleBackground />
        </section>
    );
};

export default LoginPage;