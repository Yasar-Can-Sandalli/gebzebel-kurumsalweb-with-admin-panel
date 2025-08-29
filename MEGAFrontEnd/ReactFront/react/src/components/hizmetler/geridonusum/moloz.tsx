const MolozAtiklariPage = () => {
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
            <header className="bg-green-100 px-6 py-10 rounded-b-2xl shadow-inner">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="text-6xl sm:text-7xl">🏗️</div>
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-green-900 mb-2">
                            Moloz Atıkları
                        </h1>
                        <div className="bg-white border-l-4 border-green-600 p-4 rounded shadow text-gray-700 max-w-2xl">
                            Moloz ve inşaat atıkları çevreyi kirleten, doğaya zarar veren önemli atıklardır. Belediyemiz bu atıkları çevre dostu yöntemlerle toplamakta ve bertaraf etmektedir.
                        </div>
                    </div>
                </div>
            </header>

            <div className="py-10 max-w-6xl mx-auto flex flex-col gap-6">
                {/* Görsel Kartı */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <img
                        src="/images/hizmetler/donusum/moloz2.jpg"
                        alt="Moloz Atıkları"
                        className="w-full h-64 object-cover rounded-xl mb-4"
                    />
                </div>

                {/* Metin Kartı */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">Moloz Atıkları Nedir?</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Moloz atıkları, inşaat, tadilat, yıkım gibi işlemler sonucunda ortaya çıkan atıklardır. Bu atıkların çevreye gelişigüzel atılması hem çevre kirliliğine hem de insan sağlığına olumsuz etki eder.
                    </p>

                    <h2 className="text-2xl font-bold text-green-800 mb-4">Toplama Hizmeti</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Gebze Belediyesi, vatandaşların inşaat veya tadilat sonucu oluşan moloz atıklarını bertaraf edebilmeleri için hizmet sunmaktadır. Belediye tarafından verilen konteyner hizmeti ile bu tür atıkların toplanması sağlanmaktadır.
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                        Belediye bu hizmeti ücretsiz sunmamaktadır. Konteyner hizmeti almak isteyen vatandaşlar, ilgili birimlerle iletişime geçerek ücret bilgisi alabilirler.
                    </p>

                    <h2 className="text-2xl font-bold text-green-800 mb-4">İletişim</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Detaylı bilgi ve konteyner hizmeti talebi için <strong>ALO 153</strong> Çözüm Merkezi ya da <strong>0262 642 04 30</strong> numaralı Temizlik İşleri Müdürlüğü ile iletişime geçebilirsiniz.
                    </p>
                </div>

                {/* Tablo Kartı */}
                <div className="bg-white p-6 rounded-2xl shadow mt-6">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">Yıllara Göre Toplanan Moloz Atıkları</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left text-gray-700 border">
                            <thead className="bg-green-100 text-green-900">
                            <tr>
                                <th className="px-4 py-2 border">Yıl</th>
                                <th className="px-4 py-2 border">Toplanan Moloz Miktarı (Ton)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="hover:bg-green-50">
                                <td className="px-4 py-2 border">2019</td>
                                <td className="px-4 py-2 border">35.207</td>
                            </tr>
                            <tr className="hover:bg-green-50">
                                <td className="px-4 py-2 border">2020</td>
                                <td className="px-4 py-2 border">36.128</td>
                            </tr>
                            <tr className="hover:bg-green-50">
                                <td className="px-4 py-2 border">2021</td>
                                <td className="px-4 py-2 border">37.470</td>
                            </tr>
                            <tr className="hover:bg-green-50">
                                <td className="px-4 py-2 border">2022</td>
                                <td className="px-4 py-2 border">38.671</td>
                            </tr>
                            <tr className="hover:bg-green-50">
                                <td className="px-4 py-2 border">2023</td>
                                <td className="px-4 py-2 border">39.215</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MolozAtiklariPage;
