import React, {useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {TERipple} from "tw-elements-react";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import {Link} from 'react-router-dom';

// ESKI------------------------------------------------------------------------------------------------
// Login Credentials Interface
interface LoginCredentials {
    username: string;
    password: string;
}


// ESKI------------------------------------------------------------------------------------------------

// Authentication Service
const authService = {
    login: async (credentials: LoginCredentials) => {
        const { data } = await axios.post('http://localhost:8080/api/auth/login', credentials, {
            withCredentials: true
        });
        return data;
    }
};

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    // Login Mutation
    const loginMutation = useMutation({
        mutationFn: authService.login,
        onSuccess: (data) => {
            //console.log('Login successful', data);
            setMessage(data.response?.data?.message || 'Giriş Başaşrılı');
            // Geçiş yapılacak diğer sayfayı yönlendirme ekleyebilirsiniz
        },
        onError: (error: any) => {
            setError(
                error.response?.data?.message ||
                'Giriş başarısız. Lütfen tekrar deneyin. Backend açık mı?'
            );
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        loginMutation.mutate({
            username,
            password
        });
    };

    return (
        <section className="h-screen bg-[url('white.jpg')] bg-cover bg-center flex items-center justify-center">
            <div className="container h-full p-10">
                <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                    <div className="w-full">
                        <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                            <div className="g-0 flex flex-wrap flex-row-reverse">
                                <div className="w-full lg:w-6/12 p-6">
                                    <div className="text-center mb-4">
                                        <img
                                            className="w-40 mx-auto"
                                            src="/images/logo.png"
                                            alt="logo"
                                        />
                                    </div>
                                    <h4 className="mb-4 text-lg font-semibold text-center">
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
                                            <TERipple rippleColor="light" className="w-full">
                                                <button
                                                    className="inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out"
                                                    type="submit"
                                                    disabled={loginMutation.isPending}
                                                    style={{
                                                        background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                                                    }}
                                                >
                                                    {loginMutation.isPending ? 'Giriş Yapılıyor...' : 'GİRİŞ YAP'}
                                                </button>
                                            </TERipple>
                                            <a href="#" className="block mt-2 text-sm">
                                                Parolanızı Mı Unuttunuz?
                                            </a>
                                        </div>
                                        <div className="text-center mt-6">
                                            <p className="mb-4 text-sm">Hesabınız Yok Mu?</p>
                                            <TERipple rippleColor="light">
                                                <Link to="/signup">
                                                    <button
                                                        type="button"
                                                        className="inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out"
                                                        style={{
                                                            background: "#ff0000",
                                                        }}
                                                    >
                                                        KAYIT OL
                                                    </button>
                                                </Link>
                                            </TERipple>
                                        </div>

                                    </form>
                                </div>
                                <div className="w-full lg:w-6/12 flex justify-center items-center bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-0 m-0">
                                    <img
                                        className="w-auto h-auto max-w-[400px] max-h-[500px] object-contain"
                                        src="/images/zinnur-buyukgoz.png"
                                        alt="Başkan"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        </section>
    );
};

export default LoginPage;
