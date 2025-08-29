const BitkiselAtikYagPage = () => {
    return (
        <div
            className="min-h-screen bg-green-50 text-gray-800 font-sans"
            style={{
                margin: "20px auto 0",
                maxWidth: "calc(100% - 80px)",
                paddingLeft: "40px",
                paddingRight: "40px",
            }}
        >
            <header className="bg-green-100 px-6 py-10 rounded-b-2xl shadow-inner mt-10">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="text-6xl sm:text-7xl">🛢️</div>
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-green-900 mb-2">
                            Bitkisel Atık Yağlar
                        </h1>
                        <div className="bg-white border-l-4 border-green-600 p-4 rounded shadow text-gray-700 max-w-3xl">
                            Kullanım ömrünü tamamlamış bitkisel yağların doğaya zarar vermemesi için uygun şekilde toplanması ve geri dönüşümü sağlanmalıdır.
                        </div>
                    </div>
                </div>
            </header>

            <div className="py-10 max-w-6xl mx-auto flex flex-col gap-6">
                {/* Resim Kartı */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <img
                        src="/images/hizmetler/donusum/bitkisel.jpg"
                        alt="Bitkisel Atık Yağ"
                        className="w-full h-64 object-cover rounded-xl mb-4"
                    />
                </div>

                {/* Metin Kartı */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">
                        Bitkisel Atık Yağ Nedir?
                    </h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Bitkisel atık yağlar, evsel ve endüstriyel alanlarda kullanılan sıvı yağların kullanıldıktan sonra tekrar kullanılmadan atığa dönüşmesiyle oluşur. Bu yağlar doğaya bilinçsizce bırakıldığında çevreye ciddi zararlar verebilir.
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                        Lavaboya dökülen bir litre atık yağın bir milyon litre içme suyunu kirletebildiği göz önünde bulundurulduğunda, atık yağların ayrı toplanarak geri dönüşüme kazandırılması büyük önem taşımaktadır.
                    </p>

                    <h2 className="text-2xl font-bold text-green-800 mb-4">Belediyemiz Neler Yapıyor?</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Belediyemiz, Çevre, Şehircilik ve İklim Değişikliği Bakanlığı tarafından lisanslandırılmış firmalarla protokol yaparak bitkisel atık yağların toplanması faaliyetlerini yürütmektedir. İlçemizdeki lokanta, restoran, otel, yemekhane ve benzeri toplu tüketim yerlerinden oluşan atık yağlar, vatandaşlarımızın çevreye duyarlılık bilinciyle getirdiği yağlar ile birlikte toplanmaktadır.
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                        Evlerden kaynaklı atık yağların toplanması amacıyla mahalle muhtarlıkları, camiler ve belediye hizmet binalarına biriktirme ekipmanları yerleştirilmiştir. Vatandaşlarımız evlerinde biriktirdikleri bitkisel atık yağları bu noktalara teslim edebilirler.
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                        Ayrıca mobil atık getirme aracı ile belirli periyotlarda mahallelerde toplanan atık yağlar lisanslı firmaya teslim edilmekte, bu sayede hem çevre korunmakta hem de ekonomiye katkı sağlanmaktadır.
                    </p>

                    <h2 className="text-2xl font-bold text-green-800 mb-4">Mevzuata Uyum</h2>
                    <p className="text-lg text-gray-700">
                        Bitkisel atık yağlar; 21.01.2005 tarih ve 25791 sayılı Resmi Gazete’de yayımlanarak yürürlüğe giren "Bitkisel Atık Yağların Kontrolü Yönetmeliği" kapsamında değerlendirilmekte olup, bu yönetmelik kapsamında; atık yağların lisanslı firmalar tarafından toplanması, taşınması, geri kazanımı veya bertarafı esastır.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BitkiselAtikYagPage;
