const IriHacimliAtikPage = () => {
    return (
        <div
            className="min-h-screen bg-green-50 text-gray-800 font-sans"
            style={{
                margin: '20px auto 0',
                maxWidth: 'calc(100% - 80px)',
                paddingLeft: '40px',
                paddingRight: '40px',
            }}
        >
            <header className="bg-green-100 px-6 py-10 rounded-b-2xl shadow-inner mt-10">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="text-6xl sm:text-7xl">🪑</div>
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-green-900 mb-2">
                            İri Hacimli Atıklar
                        </h1>
                        <div className="bg-white border-l-4 border-green-600 p-4 rounded shadow text-gray-700 max-w-3xl">
                            Kullanılmayacak durumda olan büyük hacimli eşyaların çevreye zarar vermemesi için doğru şekilde toplanması önemlidir.
                        </div>
                    </div>
                </div>
            </header>

            <div className="py-10 max-w-6xl mx-auto flex flex-col gap-6">
                {/* Görsel Kartı */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <img
                        src="/images/hizmetler/donusum/irihacimli.jpeg"
                        alt="İri Hacimli Atıklar"
                        className="w-full h-64 object-cover rounded-xl mb-4"
                    />
                </div>

                {/* Metin Kartı */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">İri Hacimli Atıklar Nedir?</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        İri hacimli atıklar, evsel nitelikte olup zamanla kullanım dışı kalan büyük boyutlu eşyalardır. Bu atıklar günlük çöp toplama sistemine dahil edilemeyecek kadar büyüktür ve özel olarak toplanmalıdır.
                    </p>

                    <h2 className="text-2xl font-bold text-green-800 mb-4">Örnek İri Hacimli Atıklar</h2>
                    <ul className="list-disc list-inside text-lg text-gray-700 mb-4 space-y-1">
                        <li>Kanepe</li>
                        <li>Kolçaklı sandalye</li>
                        <li>Yatak, baza, çekyat</li>
                        <li>Dolap</li>
                        <li>Halı</li>
                        <li>Kapı, pencere</li>
                        <li>Çalışma masası</li>
                        <li>Koltuk takımı</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-green-800 mb-4">Toplama Hizmeti</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Gebze Belediyesi, vatandaşların evlerinde bulunan ve artık kullanılmayan bu tarz eşyaları toplayarak çevre kirliliğini önlemeyi amaçlamaktadır.
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                        Bu hizmet sayesinde vatandaşlar, bu tür atıkları çevreye rastgele bırakmadan kolayca bertaraf edebilirler.
                    </p>

                    <h2 className="text-2xl font-bold text-green-800 mb-4">İletişim</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Toplama talebi için <strong>ALO 153</strong> Çözüm Merkezi veya <strong>0262 642 04 30</strong> numaralı telefonlardan Temizlik İşleri Müdürlüğü ile iletişime geçebilirsiniz.
                    </p>
                </div>

                {/* Tablo Kartı */}
                <div className="bg-white p-6 rounded-2xl shadow mt-6">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">Yıllara Göre Toplanan Evsel Atık Miktarları</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left text-gray-700 border">
                            <thead className="bg-green-100 text-green-900">
                            <tr>
                                <th className="px-4 py-2 border">Yıl</th>
                                <th className="px-4 py-2 border">Toplanan Miktar (Kg)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="hover:bg-green-50">
                                <td className="px-4 py-2 border">2020</td>
                                <td className="px-4 py-2 border">5.432</td>
                            </tr>
                            <tr className="hover:bg-green-50">
                                <td className="px-4 py-2 border">2021</td>
                                <td className="px-4 py-2 border">6.215</td>
                            </tr>
                            <tr className="hover:bg-green-50">
                                <td className="px-4 py-2 border">2022</td>
                                <td className="px-4 py-2 border">7.980</td>
                            </tr>
                            <tr className="hover:bg-green-50">
                                <td className="px-4 py-2 border">2023</td>
                                <td className="px-4 py-2 border">8.350</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IriHacimliAtikPage;
