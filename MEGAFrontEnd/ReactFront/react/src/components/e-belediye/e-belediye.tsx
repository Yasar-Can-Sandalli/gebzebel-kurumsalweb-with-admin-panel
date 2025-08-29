import React from 'react';
import { FileText, SearchCheck, CreditCard, Landmark, MessageCircle, FileCheck, HelpCircle, Activity, Target, ArrowUpCircle, Home, Search, MapPin, Calendar, User, Lock } from 'lucide-react';
import { Link } from 'react-router-dom'; // Link'i import et

const EBelediyeSayfasi: React.FC = () => {
    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="max-w-7xl mx-auto">

                {/* Main Content */}
                <div className="bg-white p-6 rounded-b-lg shadow-md mb-6">
                    {/* Vergi İşlemleri Bölümü */}
                    <div className="mb-5">
                        <div className="flex items-center mb-2 border-b pb-2">
                            <Landmark className="text-blue-600 mr-3" size={28} />
                            <h2 className="text-2xl font-bold text-blue-800">VERGİ İŞLEMLERİ</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Vergi/Borç Ödeme Kartı */}
                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-full mb-4 shadow-inner">
                                    <CreditCard className="text-blue-700" size={36} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-lg font-semibold">Vergi & Borç Ödeme</h3>
                            </div>
                            {/* E-Beyan Kartı */}
                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-green-100 p-4 rounded-full mb-4">
                                    <FileText className="text-green-600" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">E-Beyan</h3>
                            </div>

                            {/* E-Beyan Bildirim Takip Kartı */}
                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-purple-100 p-4 rounded-full mb-4">
                                    <SearchCheck className="text-purple-600" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">E-Beyan Bildirim Takip</h3>
                            </div>
                        </div>
                    </div>
                    {/* Gebze İletişim Merkezi Bölümü */}
                    <div>
                        <div className="flex items-center mb-2 border-b pb-2">
                            <MessageCircle className="text-red-600 mr-3" size={28} />
                            <h2 className="text-2xl font-bold text-red-800">GEBZE İLETİŞİM MERKEZİ</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Başvuru Formu Kartı */}
                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-gradient-to-br from-red-100 to-red-200 p-4 rounded-full mb-4 shadow-inner">
                                    <FileText className="text-red-700" size={36} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-lg font-semibold">Başvuru Formu</h3>
                            </div>
                            {/* Başvuru Takip Kartı */}
                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-orange-100 p-4 rounded-full mb-4">
                                    <FileCheck className="text-orange-600" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">Başvuru Takip</h3>
                            </div>
                            {/* Bilgi Edinme (CİMER) Kartı */}
                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-yellow-100 p-4 rounded-full mb-4">
                                    <HelpCircle className="text-yellow-600" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">Bilgi Edinme (CİMER)</h3>
                            </div>
                        </div>
                    </div><br/>
                    {/* İnteraktif Hizmetler Bölümü */}
                    <div className="mt-10">
                        <div className="flex items-center mb-6 border-b pb-2">
                            <Landmark className="text-indigo-600 mr-3" size={28} />
                            <h2 className="text-2xl font-bold text-indigo-800">İNTERAKTİF HİZMETLER</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* e-Eksper */}
                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-indigo-100 p-4 rounded-full mb-4">
                                    <SearchCheck className="text-indigo-600" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">E-Eksper</h3>
                            </div>
                            {/* e-Moloz */}
                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-gray-200 p-4 rounded-full mb-4">
                                    <FileText className="text-gray-700" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">E-Moloz</h3>
                            </div>
                            {/* Sosyal Yardım Başvurusu */}
                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-pink-100 p-4 rounded-full mb-4">
                                    <MessageCircle className="text-pink-600" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">Sosyal Yardım Başvurusu</h3>
                            </div>
                            {/* e-İşyeri Ruhsat */}
                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-blue-100 p-4 rounded-full mb-4">
                                    <CreditCard className="text-blue-600" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">E-İşyeri Ruhsat</h3>
                            </div>
                            {/* e-Geri Dönüşüm */}
                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-green-100 p-4 rounded-full mb-4">
                                    <FileCheck className="text-green-600" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">E-Geri Dönüşüm</h3>
                            </div>
                            {/* Evcil Hayvan Sahiplenme */}
                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-orange-100 p-4 rounded-full mb-4">
                                    <HelpCircle className="text-orange-600" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">Evcil Hayvan Sahiplenme</h3>
                            </div>

                            {/* e-Rayiç */}
                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-yellow-100 p-4 rounded-full mb-4">
                                    <FileText className="text-yellow-600" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">E-Rayiç</h3>
                            </div>

                            {/* e-İlaçlama */}
                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-red-100 p-4 rounded-full mb-4">
                                    <SearchCheck className="text-red-600" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">E-İlaçlama (Özel Mülkiyet)</h3>
                            </div>
                        </div>
                    </div><br/>

                    <div className="mt-10">
                        <div className="flex items-center mb-6 border-b pb-2">
                            <Landmark className="text-indigo-600 mr-3" size={28} />
                            <h2 className="text-2xl font-bold text-indigo-800">SPOR & EĞİTİM</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* SENDE */}
                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-indigo-100 p-4 rounded-full mb-4">
                                    <SearchCheck className="text-indigo-600" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">SENDE<br/> (Kayıt ve Eğitim Portalı)</h3>
                            </div>
                        </div>
                    </div><br/>

                    {/* İmar Yönetim Sistemi Bölümü */}
                    <div className="mt-10">
                        <div className="flex items-center mb-6 border-b pb-2">
                            <Landmark className="text-teal-600 mr-3" size={28} />
                            <h2 className="text-2xl font-bold text-teal-800">İMAR YÖNETİM SİSTEMİ</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* İmar Durumu Başvurusu */}
                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-teal-100 p-4 rounded-full mb-4">
                                    <SearchCheck className="text-teal-600" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">İmar Durumu Başvurusu</h3>
                            </div>

                            {/* Güçlendirmeye Esas Başvurular */}
                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-blue-100 p-4 rounded-full mb-4">
                                    <Activity className="text-blue-600" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">Güçlendirmeye Esas Başvurular</h3>
                            </div>

                            {/* Yapı Ruhsat Başvurusu */}
                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-indigo-100 p-4 rounded-full mb-4">
                                    <FileText className="text-indigo-600" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">Yapı Ruhsat Başvurusu</h3>
                            </div>

                            {/* Kırmızı Kot Belgesi Başvurusu */}
                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-red-100 p-4 rounded-full mb-4">
                                    <Target className="text-red-600" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">Kırmızı Kot Belgesi Başvurusu</h3>
                            </div>

                            {/* Other imar entries continued... */}
                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-yellow-100 p-4 rounded-full mb-4">
                                    <FileCheck className="text-yellow-600" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">Yapı Ruhsatına Esas Başvurular</h3>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-purple-100 p-4 rounded-full mb-4">
                                    <ArrowUpCircle className="text-purple-600" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">Asansör Tescil Başvurusu</h3>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-pink-100 p-4 rounded-full mb-4">
                                    <Home className="text-pink-600" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">Kat İrtifakı & Mülkiyet Projesi Onayı</h3>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-gray-200 p-4 rounded-full mb-4">
                                    <Search className="text-gray-700" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">Başvuru Sorgulama</h3>
                            </div>
                        </div>
                    </div><br/>

                    <div className="mt-10">
                        <div className="flex items-center mb-6 border-b pb-2">
                            <Landmark className="text-teal-600 mr-3" size={28} />
                            <h2 className="text-2xl font-bold text-teal-800">BİLGİLENDİRME HİZMETLERİ</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Bilgilendirme hizmetleri entries */}
                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-teal-100 p-4 rounded-full mb-4">
                                    <MapPin className="text-teal-600" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">Acil Toplanma Alanları</h3>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-blue-100 p-4 rounded-full mb-4">
                                    <SearchCheck className="text-blue-600" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">Arsa Metrekare Birim<br/> Değeri Sorgulama</h3>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-indigo-100 p-4 rounded-full mb-4">
                                    <FileText className="text-indigo-600" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">İmar Planları</h3>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-red-100 p-4 rounded-full mb-4">
                                    <Calendar className="text-red-600" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">Mezarlık Bilgi Sistemi</h3>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-purple-100 p-4 rounded-full mb-4">
                                    <HelpCircle className="text-purple-600" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">Nöbetçi Eczane</h3>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-yellow-100 p-4 rounded-full mb-4">
                                    <FileCheck className="text-yellow-600" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">Askıya Çıkan İmar Planları</h3>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-green-100 p-4 rounded-full mb-4">
                                    <MessageCircle className="text-green-600" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">İmar Durumu</h3>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-orange-100 p-4 rounded-full mb-4">
                                    <Landmark className="text-orange-600" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">Kent Rehberi</h3>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-teal-100 p-4 rounded-full mb-4">
                                    <Calendar className="text-teal-600" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">Nikah Randevu Sistemi</h3>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-gray-100 p-4 rounded-full mb-4">
                                    <span className="text-3xl">🪦</span>
                                </div>
                                <h3 className="text-lg font-semibold">Vefat Edenler</h3>
                            </div>
                        </div>
                    </div><br/>

                    <div className="mt-10">
                        <div className="flex items-center mb-6 border-b pb-2">
                            <Home className="text-teal-600 mr-3" size={28} />
                            <h2 className="text-2xl font-bold text-teal-800">KURUM İÇİ İŞLEMLER</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Personel Giriş */}
                            {/* Değiştirilmiş Alan: Link bileşeni eklenmiş */}
                            <Link to="/login" className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-blue-100 p-4 rounded-full mb-4">
                                    <Lock className="text-blue-600" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">Personel Giriş</h3>
                            </Link>

                            {/* Personel Portalı */}
                            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
                                <div className="bg-green-100 p-4 rounded-full mb-4">
                                    <User className="text-green-600" size={36} />
                                </div>
                                <h3 className="text-lg font-semibold">Personel Portalı</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EBelediyeSayfasi;