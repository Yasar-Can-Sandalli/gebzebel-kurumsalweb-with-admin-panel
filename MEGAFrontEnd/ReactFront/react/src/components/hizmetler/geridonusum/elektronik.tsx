const ElektronikAtikPage = () => {
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
                    <div className="text-6xl sm:text-7xl">🖥️</div>
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-green-900 mb-2">
                            Elektronik Atıklar
                        </h1>
                        <div className="bg-white border-l-4 border-green-600 p-4 rounded shadow text-gray-700 max-w-3xl">
                            Kullanım ömrü sona ermiş ya da arızalanmış elektronik ürünlerin geri dönüşümü önemlidir.
                        </div>
                    </div>
                </div>
            </header>

            <div className="py-10 max-w-4xl mx-auto flex flex-col gap-6">
                {/* Görsel Kartı */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <img
                        src="/images/hizmetler/donusum/elektronik.jpg"
                        alt="Elektronik Atıklar"
                        className="w-full h-64 object-cover rounded-xl mb-4"
                    />
                </div>

                {/* Metin Kartı */}
                <div className="bg-white p-6 max-w-6xl rounded-2xl shadow">
                    <h2 className="text-xl font-bold text-green-800 mb-4">Elektronik Atıklar Nedir?</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Elektrikli ve Elektronik Eşyalar; bilgi teknolojileri, telekomünikasyon, tüketici ekipmanları, aydınlatma, elektrikli ve elektronik aletler, oyuncaklar, eğlence ve spor ekipmanları, tıbbi cihazlar gibi çeşitli alanlarda kullanılan cihazlardır.
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                        Bu eşyaların kullanım ömrü sona erdiğinde veya arızalandığında çevreye ve insan sağlığına zarar verebilecek hale gelirler. Bu yüzden geri dönüşümü önemlidir.
                    </p>

                    <h2 className="text-2xl font-bold text-green-800 mb-4">Belediyemiz Neler Yapıyor?</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Belediyemiz, elektrikli ve elektronik atıkların çevreye zarar vermeyecek şekilde toplanması için çeşitli uygulamalar yürütmektedir. Yetkili firmalarla işbirliği içerisinde elektronik atıkların toplanması ve lisanslı geri dönüşüm tesislerine iletilmesi sağlanmaktadır.
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                        Belediyemiz ayrıca vatandaşlarımızın elektronik atıklarını kolayca teslim edebilmeleri için okullara, kamu kurumlarına ve mahalle muhtarlıklarına özel toplama kutuları yerleştirmiştir.
                    </p>

                    <h2 className="text-2xl font-bold text-green-800 mb-4">Toplama Kapsamındaki Elektrikli ve Elektronik Eşyalar</h2>
                    <ul className="list-disc list-inside text-lg text-gray-700 mb-4 space-y-1">
                        <li>Bilgisayar, dizüstü bilgisayar</li>
                        <li>Yazıcı, tarayıcı</li>
                        <li>Televizyon, monitör</li>
                        <li>Telefon, cep telefonu</li>
                        <li>Küçük ev aletleri (ütü, mikser vb.)</li>
                        <li>Beyaz eşyalar (buzdolabı, çamaşır makinesi vb.)</li>
                        <li>Aydınlatma ekipmanları</li>
                        <li>Elektrikli oyuncaklar</li>
                        <li>Elektrikli tıbbi cihazlar (ev kullanımı için olanlar)</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-green-800 mb-4">Mevzuata Uyum</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Elektrikli ve Elektronik Eşyaların Kontrolü Yönetmeliği kapsamında çevreye zarar vermeden bertarafı gereken elektronik atıklar için üretici sorumluluğu esastır. Belediyeler, bu atıkların toplanmasında ve geçici depolanmasında görev alır.
                    </p>
                </div>

                {/* Tablo Kartı */}
                <div className="bg-white p-6 rounded-2xl shadow mt-6">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">Yıllara Göre Toplanan Elektronik Atık Miktarları</h2>
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
                                <td className="px-4 py-2 border">1.715</td>
                            </tr>
                            <tr className="hover:bg-green-50">
                                <td className="px-4 py-2 border">2021</td>
                                <td className="px-4 py-2 border">2.154</td>
                            </tr>
                            <tr className="hover:bg-green-50">
                                <td className="px-4 py-2 border">2022</td>
                                <td className="px-4 py-2 border">3.122</td>
                            </tr>
                            <tr className="hover:bg-green-50">
                                <td className="px-4 py-2 border">2023</td>
                                <td className="px-4 py-2 border">3.642</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ElektronikAtikPage;
