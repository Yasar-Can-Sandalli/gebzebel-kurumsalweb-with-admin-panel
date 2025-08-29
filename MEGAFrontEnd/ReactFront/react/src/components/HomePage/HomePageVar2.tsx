// src/pages/HomePage.tsx
// Bu dosyayı projenizin uygun bir klasörüne (örn: src/pages/) ekleyin.

import React from 'react';
// İkon kullanmak isterseniz: npm install react-icons
// import { FaBuilding, FaRecycle, FaBus } from 'react-icons/fa'; // Örnek ikonlar

// --- Veri Arayüzleri (İsteğe bağlı ama önerilir) ---
interface NewsItem {
    id: number;
    title: string;
    excerpt: string;
    imageUrl: string;
    link: string; // Gerçek link veya #
}

interface ServiceItem {
    id: number;
    title: string;
    description: string;
    icon?: string | React.ReactNode; // Emoji, SVG veya React Icon olabilir
    link: string;
}

// --- Örnek Veriler ---
const sampleNews: NewsItem[] = [
    { id: 1, title: 'Yeni Park Alanı Hizmete Açıldı', excerpt: 'Mahalle sakinlerinin kullanımı için modern bir park alanı...', imageUrl: 'https://via.placeholder.com/400x250/cccccc/333333?text=Haber+1', link: '#' },
    { id: 2, title: 'Altyapı Çalışmaları Başladı', excerpt: 'Şehrimizin önemli caddelerinden birinde altyapı yenileme...', imageUrl: 'https://via.placeholder.com/400x250/cccccc/333333?text=Haber+2', link: '#' },
    { id: 3, title: 'Belediye Meclisi Toplantı Duyurusu', excerpt: 'Aylık olağan meclis toplantısı gündemi ve tarihi açıklandı.', imageUrl: 'https://via.placeholder.com/400x250/cccccc/333333?text=Duyuru', link: '#' },
];

const sampleServices: ServiceItem[] = [
    // İkonları emoji veya metin olarak ekleyelim
    { id: 1, title: 'E-Belediye Hizmetleri', description: 'Vergi ödeme, başvuru takibi gibi işlemlerinizi online yapın.', icon: '🏢', link: '#' },
    { id: 2, title: 'Çevre ve Geri Dönüşüm', description: 'Atık yönetimi ve geri dönüşüm programlarımız hakkında bilgi alın.', icon: '♻️', link: '#' },
    { id: 3, title: 'Ulaşım Hizmetleri', description: 'Otobüs seferleri, güzergahlar ve ulaşım kartı işlemleri.', icon: '🚌', link: '#' },
    { id: 4, title: 'Sosyal Yardım Başvuruları', description: 'İhtiyaç sahibi vatandaşlarımız için destek programları.', icon: '🤝', link: '#' },
    // react-icons kullanılsaydı:
    // { id: 1, title: 'E-Belediye Hizmetleri', description: '...', icon: <FaBuilding size={40} className="text-belediye-mavi mb-4" />, link: '#' },
];

// --- Ana Sayfa Bileşeni ---
const HomePage: React.FC = () => {
    return (
        <main className="min-h-screen bg-belediye-gri"> {/* Navbar ve Footer olmadığı için ana kapsayıcı main olabilir */}

            {/* ===== HERO BÖLÜMÜ ===== */}
            <section
                className="bg-cover bg-center py-24 md:py-32 lg:py-40 text-white relative"
                // Gerçek bir belediye veya şehir fotoğrafı kullanın
                style={{ backgroundImage: "url('https://via.placeholder.com/1920x600/005a9c/ffffff?text=Şehir+Manzarası')" }}
            >
                {/* Metnin okunabilirliği için hafif karartma efekti */}
                <div className="absolute inset-0 bg-black opacity-40"></div>

                <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-center">
                    {/* İsteğe bağlı: Belediye Logosu */}
                    {/* <img src="/logo.png" alt="Belediye Logosu" className="mx-auto mb-4 h-16"/> */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        [Belediye Adı] Belediyesi'ne Hoş Geldiniz
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
                        Şehrimiz için birlikte çalışıyor, yaşam kalitesini artırıyoruz.
                    </p>
                    {/* İsteğe bağlı: Hızlı Erişim Butonu */}
                    {/* <a
            href="#hizmetler" // Veya ilgili sayfaya link
            className="bg-white text-belediye-mavi hover:bg-gray-200 font-semibold py-3 px-8 rounded-full transition duration-300"
          >
            Hizmetlerimizi Keşfedin
          </a> */}
                </div>
            </section>

            {/* ===== HABERLER/DUYURULAR BÖLÜMÜ ===== */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10 md:mb-12 text-metin-koyu">
                        Güncel Haberler ve Duyurular
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sampleNews.map((item) => (
                            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-xl">
                                <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2 text-belediye-mavi">{item.title}</h3>
                                    <p className="text-metin-acik mb-4">{item.excerpt}</p>
                                    <a href={item.link} className="text-belediye-mavi hover:underline font-medium">
                                        Devamını Oku &rarr;
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* İsteğe bağlı: Tüm Haberler Butonu */}
                    {/* <div className="text-center mt-12">
            <a href="#" className="bg-belediye-mavi text-white hover:bg-opacity-80 font-semibold py-3 px-8 rounded-full transition duration-300">
              Tüm Haberler
            </a>
          </div> */}
                </div>
            </section>

            {/* ===== HİZMETLER/PROJELER BÖLÜMÜ ===== */}
            <section id="hizmetler" className="py-16 md:py-20 bg-belediye-gri">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10 md:mb-12 text-metin-koyu">
                        Öne Çıkan Hizmet ve Projelerimiz
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {sampleServices.map((service) => (
                            <a key={service.id} href={service.link} className="block bg-white p-6 rounded-lg shadow-md text-center transition duration-300 hover:shadow-xl hover:-translate-y-1">
                                {/* İkon Alanı */}
                                <div className="text-4xl mb-4 flex justify-center items-center h-16">
                                    {/* İkonun türüne göre render etme (string veya ReactNode) */}
                                    {typeof service.icon === 'string' ? <span className="text-4xl">{service.icon}</span> : service.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-belediye-mavi">{service.title}</h3>
                                <p className="text-metin-acik">{service.description}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== HIZLI BİLGİ / İLETİŞİM BÖLÜMÜ (Footer Yerine) ===== */}
            <section className="py-12 bg-white border-t border-gray-200">
                <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center md:text-left">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Bölüm 1: Adres */}
                        <div>
                            <h4 className="font-semibold text-lg mb-2 text-metin-koyu">Adresimiz</h4>
                            <p className="text-metin-acik">
                                [Belediye Adresi], [İlçe] / [İl] <br/>
                                Gebze, Kocaeli, Türkiye {/* Örnek Lokasyon */}
                            </p>
                        </div>

                        {/* Bölüm 2: İletişim */}
                        <div>
                            <h4 className="font-semibold text-lg mb-2 text-metin-koyu">Bize Ulaşın</h4>
                            <p className="text-metin-acik">
                                Telefon: [Belediye Telefon Numarası] <br/>
                                E-posta: [Belediye E-posta Adresi]
                            </p>
                        </div>

                        {/* Bölüm 3: Hızlı Bağlantılar (Opsiyonel) */}
                        <div>
                            <h4 className="font-semibold text-lg mb-2 text-metin-koyu">Faydalı Linkler</h4>
                            <ul className="text-metin-acik space-y-1">
                                <li><a href="#" className="hover:text-belediye-mavi hover:underline">İletişim Formu</a></li>
                                <li><a href="#" className="hover:text-belediye-mavi hover:underline">Sıkça Sorulan Sorular</a></li>
                                {/* Başka linkler eklenebilir */}
                            </ul>
                        </div>

                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-metin-acik">
                        {/* Telif Hakkı Bilgisi */}
                        © {new Date().getFullYear()} [Belediye Adı] Belediyesi. Tüm hakları saklıdır. (Tarih: {new Date().toLocaleDateString('tr-TR')})
                    </div>
                </div>
            </section>

        </main>
    );
};

export default HomePage; // Bu bileşeni App.tsx'de kullanmak için dışa aktar