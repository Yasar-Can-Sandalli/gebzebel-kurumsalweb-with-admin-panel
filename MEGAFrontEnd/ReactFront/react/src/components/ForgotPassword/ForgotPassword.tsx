import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import ParticleBackground from '../backgroundAnim/particle.tsx';

interface ForgotPasswordData {
    TCNo: string;
}

const ForgotPassword: React.FC = () => {
    const [TCNo, setTCNo] = useState('');
    const [tcNoError, setTcNoError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // TC Kimlik numarası doğrulama
    const validateTCNo = (tcno: string): boolean => {
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

    const forgotPasswordMutation = useMutation({
        mutationFn: async (data: ForgotPasswordData) => {
            const response = await axios.post('http://localhost:8080/api/auth/forgot-password', data, {
                withCredentials: true
            });
            return response.data;
        },
        onSuccess: (data) => {
            setMessage(data.message || 'Parola sıfırlama bağlantısı e-posta adresinize gönderildi.');
            setError(null);
        },
        onError: (error: any) => {
            if (error.response?.status === 404) {
                setError('Bu TC Kimlik No ile kayıtlı bir kullanıcı bulunamadı.');
            } else if (error.response?.status === 429) {
                setError('Çok fazla istek gönderildi. Lütfen bir süre sonra tekrar deneyin.');
            } else {
                setError(
                    error.response?.data?.message ||
                    'Parola sıfırlama işlemi başarısız. Lütfen tekrar deneyin.'
                );
            }
            setMessage(null);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        setTcNoError(null);

        if (!validateTCNo(TCNo)) {
            return;
        }

        forgotPasswordMutation.mutate({ TCNo });
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
                            Parola Sıfırlama
                        </h4>

                        {error && (
                            <div className="text-red-500 text-center mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
                                {error}
                            </div>
                        )}
                        {message && (
                            <div className="text-blue-500 text-center mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <p className="text-sm text-gray-600 mb-4">
                                    Parolanızı sıfırlamak için TC Kimlik Numaranızı girin. 
                                    Size e-posta ile parola sıfırlama bağlantısı gönderilecektir.
                                </p>
                                <input
                                    type="text"
                                    placeholder="T.C. Kimlik No"
                                    value={TCNo}
                                    onChange={(e) => {
                                        setTCNo(e.target.value);
                                        validateTCNo(e.target.value);
                                    }}
                                    className={`w-full px-3 py-2 border-b ${tcNoError ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500 transition-colors duration-300`}
                                    required
                                />
                                {tcNoError && (
                                    <div className="text-red-500 text-xs mt-1">{tcNoError}</div>
                                )}
                            </div>

                            <div className="text-center mb-4">
                                <button
                                    type="submit"
                                    disabled={forgotPasswordMutation.isPending}
                                    className={`inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out relative overflow-hidden ${
                                        forgotPasswordMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                    style={{
                                        background: "linear-gradient(to right, #022842, #222222)",
                                    }}
                                >
                                    {forgotPasswordMutation.isPending ? 'Gönderiliyor...' : 'PAROLA SIFIRLAMA BAĞLANTISI GÖNDER'}
                                </button>
                            </div>

                            <div className="flex flex-col items-center justify-center mt-4">
                                <p className="mb-2 text-sm text-gray-700">
                                    Parolanızı hatırladınız mı?
                                </p>
                                <Link to="/login">
                                    <button
                                        type="button"
                                        className="inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out relative overflow-hidden"
                                        style={{
                                            background: "#f7a600",
                                        }}
                                    >
                                        GİRİŞ YAP
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

export default ForgotPassword;
