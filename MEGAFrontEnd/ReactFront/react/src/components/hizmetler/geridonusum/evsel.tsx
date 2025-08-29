const EvselAtikPage = () => {
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
                    <div className="text-6xl sm:text-7xl">🍂</div>
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-green-900 mb-2">
                            Evsel Çöpler ve Organik Atıklar
                        </h1>
                        <div className="bg-white border-l-4 border-green-600 p-4 rounded shadow text-gray-700 max-w-3xl">
                            Organik atıkların geri dönüşümü, çevre için kritik öneme sahiptir.
                        </div>
                    </div>
                </div>
            </header>

            <div className="py-10 max-w-6xl mx-auto flex flex-col gap-6">
                {/* Görsel Kartı */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <img
                        src="/images/hizmetler/donusum/evsel.jpeg"
                        alt="Evsel Atıklar"
                        className="w-full h-64 object-cover rounded-xl mb-4"
                    />
                </div>

                {/* Metin Kartı */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">Evsel Çöpler ve Organik Atıklar Nedir?</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Evsel atıklar, konutlarda günlük yaşam sonucunda oluşan çöpleri ifade eder. Bunlar genellikle mutfak atıkları, sebze ve meyve kabukları, gıda ambalajları ve çeşitli evsel atıkları içerir.
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                        Organik atıklar ise, biyolojik olarak parçalanabilir maddelerdir. Evlerde, restoranlarda, gıda üretim tesislerinde oluşan organik atıklar, doğru şekilde işlenmediği takdirde çevre kirliliğine neden olabilir.
                    </p>

                    <h2 className="text-2xl font-bold text-green-800 mb-4">Belediyemiz Neler Yapıyor?</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Belediyemiz, evsel atıkları geri dönüştürmek ve organik atıkları doğru bir şekilde ayrıştırmak için çeşitli projeler yürütmektedir. Özellikle organik atıkların ayrıştırılması, doğada kolayca çözünebilen malzemelere dönüştürülmesini sağlar.
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                        Ayrıca, geri dönüşüm ve organik atık yönetimi konusunda vatandaşlarımıza eğitimler verilmekte, toplama noktaları yerleştirilmektedir.
                    </p>

                    <h2 className="text-2xl font-bold text-green-800 mb-4">Evsel Çöpler ve Organik Atıkların Ayrıştırılması</h2>
                    <ul className="list-disc list-inside text-lg text-gray-700 mb-4 space-y-1">
                        <li>Sebze ve meyve kabukları</li>
                        <li>Gıda artıkları (ekmek, et, süt ürünleri vb.)</li>
                        <li>Kağıt peçeteler, kağıt havlular</li>
                        <li>Çay posası, kahve telvesi</li>
                        <li>Yumurta kabukları</li>
                        <li>Bitki atıkları</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-green-800 mb-4">Mevzuat ve Yönetmelikler</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Evsel atıkların yönetimi, Çevre ve Şehircilik Bakanlığı'nın belirlediği yönetmeliklere ve belediyenin yerel yönetim kararlarına dayanır. Çöp ayrıştırma, geri dönüşüm ve bertaraf işlemleri bu yasal çerçevede yapılmaktadır.
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                        Belediyemiz, atıkların geri kazanılması konusunda yürüttüğü projelerle, sürdürülebilir çevre yönetimi sağlamakta ve çevre bilincinin artırılmasına katkıda bulunmaktadır.
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

export default EvselAtikPage;
