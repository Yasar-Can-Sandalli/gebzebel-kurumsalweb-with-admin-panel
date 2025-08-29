const AtikPilDetayPage = () => {

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
                    <div className="text-6xl sm:text-7xl">🔋</div>
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-green-900 mb-2">
                            Atık Pil ve Akümülatörler
                        </h1>
                        <div className="bg-white border-l-4 border-green-600 p-4 rounded shadow text-gray-700 max-w-3xl">
                            Atık piller doğada uzun süre çözünmeden kalır ve içerdikleri ağır metaller çevre ve insan sağlığına büyük tehdit oluşturur.
                        </div>
                    </div>
                </div>
            </header>

            <div className="py-10 max-w-6xl mx-auto flex flex-col gap-6">
                <div className="bg-white p-6 rounded-2xl shadow">
                    <img
                        src="/images/hizmetler/donusum/pil.jpg"
                        alt="Atık Pil ve Akümülatörler"
                        className="w-full h-64 object-cover rounded-xl mb-4"
                    />
                </div>

                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">Atık Pil Nedir?</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Kullanılmış pillerin doğada yok olması uzun yıllar alır. Atık pillerin içerisinde bulunan ağır metaller (cıva, kadmiyum, kurşun vb.) toprağa ve yeraltı sularına karışarak insan sağlığını ve çevreyi tehdit eder.
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                        Özellikle çocuklarda gelişim bozukluklarına, hormonal ve sinir sistemi hastalıklarına yol açabilecek düzeyde tehlikelidir.
                    </p>

                    <h2 className="text-2xl font-bold text-green-800 mb-4">Amaç</h2>
                    <ul className="list-disc pl-5 space-y-2 text-lg text-gray-700 mb-4">
                        <li>Atık Pillerin diğer atıklarla karışmadan ayrı toplanması,</li>
                        <li>İnsan sağlığı ve çevrenin korunması,</li>
                        <li>Doğal kaynakların korunması,</li>
                        <li>Geri kazanılabilir malzemelerin tekrar kullanılması hedeflenmektedir.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-green-800 mb-4">Toplama Noktaları</h2>
                    <p className="text-lg text-gray-700">
                        İlçemiz sınırları içerisinde bulunan okullar, kamu kurumları, siteler, alışveriş merkezleri, muhtarlıklar ve camilere bırakılan atık pil kutuları ile atık piller toplanmakta, TAP (Taşınabilir Pil Üreticileri ve İthalatçıları Derneği) iş birliği ile çevre lisanslı firmalara teslim edilerek bertarafı sağlanmaktadır.
                    </p>
                </div>
                {/* Tablo Kartı */}
                <div className="bg-white p-6 rounded-2xl shadow mt-6">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">Yıllara Göre Toplanan Atık Pil Miktarı</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left text-gray-700 border">
                            <thead className="bg-green-100 text-green-900">
                            <tr>
                                <th className="px-4 py-2 border">Yıl</th>
                                <th className="px-4 py-2 border">Toplanan Atık Pil Miktarı (kg)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="hover:bg-green-50">
                                <td className="px-4 py-2 border">2009</td>
                                <td className="px-4 py-2 border">285</td>
                            </tr>
                            <tr className="hover:bg-green-50">
                                <td className="px-4 py-2 border">2010</td>
                                <td className="px-4 py-2 border">1628</td>
                            </tr>
                            <tr className="hover:bg-green-50">
                                <td className="px-4 py-2 border">2011</td>
                                <td className="px-4 py-2 border">1495</td>
                            </tr>
                            <tr className="hover:bg-green-50">
                                <td className="px-4 py-2 border">2012</td>
                                <td className="px-4 py-2 border">2881</td>
                            </tr>
                            <tr className="hover:bg-green-50">
                                <td className="px-4 py-2 border">2013</td>
                                <td className="px-4 py-2 border">7801</td>
                            </tr>
                            <tr className="hover:bg-green-50">
                                <td className="px-4 py-2 border">2014</td>
                                <td className="px-4 py-2 border">1747</td>
                            </tr>
                            <tr className="hover:bg-green-50">
                                <td className="px-4 py-2 border">2015</td>
                                <td className="px-4 py-2 border">2587</td>
                            </tr>
                            <tr className="hover:bg-green-50">
                                <td className="px-4 py-2 border">2016</td>
                                <td className="px-4 py-2 border">1188</td>
                            </tr>
                            <tr className="hover:bg-green-50">
                                <td className="px-4 py-2 border">2017</td>
                                <td className="px-4 py-2 border">2491</td>
                            </tr>
                            <tr className="hover:bg-green-50">
                                <td className="px-4 py-2 border">2018</td>
                                <td className="px-4 py-2 border">1961</td>
                            </tr>
                            <tr className="hover:bg-green-50">
                                <td className="px-4 py-2 border">2019</td>
                                <td className="px-4 py-2 border">3288</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AtikPilDetayPage;
