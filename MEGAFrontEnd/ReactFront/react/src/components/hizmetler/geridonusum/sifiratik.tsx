const SifirAtikPage = () => {
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
                    <div className="text-6xl sm:text-7xl">♻️</div>
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-green-900 mb-2">
                            Sıfır Atık Nedir?
                        </h1>
                        <div className="bg-white border-l-4 border-green-600 p-4 rounded shadow text-gray-700 max-w-2xl">
                            İsrafın önlenmesi, kaynakların daha verimli kullanılması ve atık oluşumunun engellenmesi amacıyla geliştirilen bir atık yönetim felsefesidir.
                        </div>
                    </div>
                </div>
            </header>

            <div className="py-10 max-w-4xl mx-auto flex flex-col gap-6">
                {/* Görsel Kartı */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <img
                        src="/images/hizmetler/donusum/sifiratik.jpg"
                        alt="Sıfır Atık"
                        className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                </div>

                {/* Metin Kartı */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">Sıfır Atık Yaklaşımı</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Sıfır atık; israfın önlenmesini, kaynakların daha verimli kullanılmasını, atık oluşumunun engellenmesi veya azaltılmasını, atığın oluşması durumunda ise kaynağında ayrı toplanması ve geri kazanılmasını kapsayan bir atık yönetim felsefesidir.
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                        Bu yaklaşım, ürünlerin yeniden kullanılması, kullanım ömürlerinin uzatılması, zararlı maddelerin kullanımının azaltılması ve geri dönüşümü mümkün ürünlerin üretilmesini esas alır.
                    </p>

                    <h2 className="text-2xl font-bold text-green-800 mb-4">Sıfır Atık Yönetim Sistemi Uygulama Adımları</h2>
                    <ol className="list-decimal list-inside text-lg text-gray-700 mb-4">
                        <li>Odak noktası</li>
                        <li>Mevcut durum</li>
                        <li>Planlama</li>
                        <li>İhtiyaç ve Termin</li>
                        <li>Eğitim</li>
                        <li>Uygulama</li>
                        <li>Raporlama ve takip</li>
                    </ol>

                    <h2 className="text-2xl font-bold text-green-800 mb-4">Gebze Belediyesi'nin Sıfır Atık Çalışmaları</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Gebze Belediyesi olarak 2009 yılından itibaren GEKAP kapsamında yürütülen geri dönüşüm faaliyetleri, 2017 yılında başlatılan Sıfır Atık Projesi öncülüğünde belediye ana ve ek hizmet binalarında sürdürülmektedir.
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                        Okullar, kamu kurumları, hastaneler, işletmeler ve tüm hanelerden oluşabilecek atık türlerinin kaynağında ayrı biriktirilmesi, atık kategorizasyonunun sağlanması ve israfın önlenmesi için ambalaj atıkları yönetim planı hazırlanmıştır.
                    </p>

                    <h2 className="text-2xl font-bold text-green-800 mb-4">Yönetilen Atık Türleri</h2>
                    <ul className="list-disc list-inside text-lg text-gray-700 mb-4">
                        <li>Ambalaj Atıkları</li>
                        <li>Atık Piller</li>
                        <li>Bitkisel Atık Yağlar</li>
                        <li>Evsel Çöpler-Organik Atıklar</li>
                        <li>Elektrikli ve Elektronik Atıklar</li>
                        <li>Tekstil Atıkları</li>
                        <li>Moloz Atıkları</li>
                        <li>İri Hacimli Atıklar</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-green-800 mb-4">İletişim</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Detaylı bilgi için İklim Değişikliği ve Sıfır Atık Müdürlüğü ile iletişime geçebilirsiniz:
                    </p>
                    <ul className="text-lg text-gray-700 mb-4">
                        <li><strong>Adres:</strong> Mevlana Mah. Issıkgöl Cad. No:111 Gebze Kocaeli</li>
                        <li><strong>Telefon:</strong> 0262 642 10 10</li>
                        <li><strong>E-posta:</strong> sifiratik@gebze.bel.tr</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SifirAtikPage;
