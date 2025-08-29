const TekstilAtiklariPage = () => {
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
                    <div className="text-6xl sm:text-7xl">👕</div>
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-green-900 mb-2">
                            Tekstil Atıkları
                        </h1>
                        <div className="bg-white border-l-4 border-green-600 p-4 rounded shadow text-gray-700 max-w-2xl">
                            Kullanılmış giysi ve tekstil ürünlerinin geri dönüşümü için belediyemizin sunduğu hizmetler.
                        </div>
                    </div>
                </div>
            </header>

            <div className="py-10 max-w-4xl mx-auto flex flex-col gap-6">
                {/* Görsel Kartı */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <img
                        src="/images/hizmetler/donusum/tekstil.jpg"
                        alt="Tekstil Atıkları"
                        className="w-full h-48  rounded-xl mb-4"
                    />
                </div>

                {/* Metin Kartı */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">"TEKSTİL ATIKLARI" NEDİR?</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Tekstil atıkları; tüketicilerin kullanımı sonrası veya tekstil endüstrilerinde üretim süreçlerinde ortaya çıkan atıklardır. Bizi ilgilendiren kısım vatandaşlarımızın kullanımı sonrası artık ihtiyaç duymadığı veya kullanılmayacak derecede tahrip olmuş giysi ve ayakkabı gibi tekstil ürünleridir.
                    </p>

                    <h2 className="text-2xl font-bold text-green-800 mb-4">BELEDİYEMİZ NELER YAPIYOR?</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Oluşan tekstil atıklarının evsel çöpe karışarak depolama alanlarına taşınması, hem hacmen fazla yer kaplamalarının hem de bertaraf maliyetlerinin azaltılmasının sağlanması için bölgemize 140 adet tekstil kumbarası yerleştirildi. Haftanın tüm günleri lisanslı işletme tarafından kumbaralar kontrol edilerek gerekli düzenleme ve çalışmalar yapılmaktadır.
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                        Kumbaralara kullanılmış tüm giysi (şapka, kazak, t-shirt, iç çamaşırı, çorap, elbise, pantolon, ayakkabı, terlik, bot vb.) ve diğer tekstil ürünlerini (battaniye, örtü, eşarp, perde, çanta, havlu vb.) atabilirsiniz. Alo Atık Hattı 0262 6421010’u arayarak tekstil atıklarınızı verebilir veya tekstil kumbarası talep edebilirsiniz.
                    </p>

                    <h2 className="text-2xl font-bold text-green-800 mb-4">Toplanan Tekstil Atık Miktarı</h2>
                    <table className="w-full text-left border-collapse mb-4">
                        <thead>
                        <tr>
                            <th className="border-b-2 border-green-600 px-4 py-2">Yıl</th>
                            <th className="border-b-2 border-green-600 px-4 py-2">Miktar (kg)</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="border-b border-gray-300 px-4 py-2">2018</td>
                            <td className="border-b border-gray-300 px-4 py-2">8.980</td>
                        </tr>
                        <tr>
                            <td className="border-b border-gray-300 px-4 py-2">2019</td>
                            <td className="border-b border-gray-300 px-4 py-2">121.844</td>
                        </tr>
                        </tbody>
                    </table>

                    <h2 className="text-2xl font-bold text-green-800 mb-4">MEVZUATLA UYUM</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Tekstil atıklarının toplanması, geri dönüşümü veya bertarafı ile ilgili henüz herhangi bir mevzuat, alt mevzuat yayımlanmamış olsa dahi, atık yönetimi ve çevrenin korunması ile ilgili genel mevzuat metinleri konu ile alakalı bir çerçeve çizmektedir. Çevre Kanunu'nun 8. maddesi "Her türlü atık ve artığı, çevreye zarar verecek şekilde, ilgili yönetmeliklerde belirlenen standartlara ve yöntemlere aykırı olarak doğrudan ve dolaylı biçimde alıcı ortama vermek, depolamak, taşımak, uzaklaştırmak ve benzeri faaliyetlerde bulunmak yasaktır." şeklinde hükmetmektedir. Aynı zamanda 02.04.2015 tarihli 29314 sayılı Atık Yönetimi Yönetmeliği'nin 5. maddesinin 3. fıkrasının (b) bendi "Atık üretiminin kaçınılmaz olduğu durumlarda atıkların; yeniden kullanımı, geri dönüşümü ve ikincil hammadde elde etme amaçlı diğer işlemler ile geri kazanılması, enerji kaynağı olarak kullanılması veya bertaraf edilmesi esastır. Atıkların alternatif hammadde ve ek yakıt olarak kullanılmasına ilişkin esaslar Bakanlıkça belirlenir." şeklindedir. Buna istinaden geri dönüşüm süreçlerine dahil edilebilecek her atık bertaraf/depolama/yakma vb. gibi nihai işlemlerden önce yeniden değerlendirilmektedir.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TekstilAtiklariPage;
