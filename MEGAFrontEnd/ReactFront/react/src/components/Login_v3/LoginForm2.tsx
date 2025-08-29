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
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuthStore();

    const { buttonRef: loginButtonRef, createRipple: createLoginRipple } = useRippleEffect();
    const { buttonRef: signupButtonRef, createRipple: createSignupRipple } = useRippleEffect();

    React.useEffect(() => {
        if (isAuthenticated && user) {
            navigate('/panel/dashboard');
        }
    }, [isAuthenticated, user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        setIsLoading(true);

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
                navigate('/panel/dashboard');
            } else {
                setError('Giriş başarısız. Kullanıcı adı veya şifre hatalı.');
            }
        } catch (error: any) {
            console.error('Login error:', error);
            setError(error.message || 'Giriş sırasında bir hata oluştu.');
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
                                    placeholder="Kullanıcı Adı"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    placeholder="Parola"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                                    required
                                />
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
                                <a href="#" className="block mt-2 text-sm">
                                    Parolanızı Mı Unuttunuz?
                                </a>
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