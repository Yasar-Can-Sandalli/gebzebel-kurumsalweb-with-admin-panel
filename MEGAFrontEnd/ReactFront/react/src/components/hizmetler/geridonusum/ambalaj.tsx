

const GeriDonusumDetayPage = () => {

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
                    <div className="text-6xl sm:text-7xl">🧃</div>
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-green-900 mb-2">
                            Ambalaj Atıkları
                        </h1>
                        <div className="bg-white border-l-4 border-green-600 p-4 rounded shadow text-gray-700 max-w-3xl">
                            Ambalaj atıkları, geri dönüşüm sürecine dahil edilerek çevreye katkı sağlanabilir. Cam, plastik, metal ve kâğıt ambalajlar geri dönüştürülebilir.
                        </div>
                    </div>
                </div>
            </header>

            <div className="py-10 max-w-6xl mx-auto flex flex-col gap-6">
                {/* Resim Kartı */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <img
                        src="/images/hizmetler/donusum/ambalaj.jpg"
                        alt="Ambalaj Atıkları"
                        className="w-full h-64 object-cover rounded-xl mb-4"
                    />
                </div>

                {/* Metin Kartı */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">Ambalaj Atıkları Nedir?</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Ambalaj, içerisindeki ürünün temiz kalmasını ve güvenilir bir şekilde tüketiciye ulaşmasını sağlayan, taşınmasını kolaylaştıran, ürünü koruyan ve aynı zamanda ürünün tanıtımını yapan endüstriyel bir üründür. Yiyecek-içecek, kozmetik, mobilya, hediyelik eşya, temizlik vb. sektörlerde ambalaj kullanımı oldukça yaygın olup, ürünün tanıtımı ve satışı da ambalaj aracılığıyla yapılır.

                        Öte yandan yönetmelikte ambalaj “Hammaddeden işlenmiş ürüne kadar, bir ürünün üreticiden kullanıcıya veya tüketiciye ulaştırılması aşamasında, taşınması, korunması, saklanması ve satışa sunulması için kullanılan herhangi bir malzemeden yapılmış Yönetmelik’in Ek-1’in de yer alan ‘Ambalaj Tanımına İlişkin Açıklayıcı Örnekler’de belirtilenler ile geri dönüşsüz olanlar da dâhil tüm ürünler” olarak tanımlanmaktadır.
                    </p>
                    <p className="text-lg text-gray-700">
                        Ambalaj atıklarının geri dönüşümü çevreyi korur, enerji tasarrufu sağlar ve kaynakların verimli kullanılmasına yardımcı olur. Bu nedenle, geri dönüşüm noktalarına bu atıkları yerinde bırakmanız çok önemlidir.
                    </p>
                    <h2 className="text-2xl font-bold text-green-800 mb-4 mt-6">BELEDİYEMİZ NELER YAPIYOR?</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Belediyemiz 2009 yılından itibaren ambalaj atıklarının kaynağında ayrı toplanmasına pilot bölgeler oluşturarak başlamış ve bu konuda çeşitli etkinlikler, projeler hazırlayarak farkındalık oluşturulmuştur. 2005 yılında yürürlüğe giren “Ambalaj Atıklarının Kontrolü Yönetmeliği’nce yasal zorunluluk haline gelen uygulama, 2009 yılında Belediyemizce hazırlanan ve Çevre ve Şehircilik Bakanlığı’nca onaylanan “Gebze İlçesi Ambalaj Atıkları Yönetim Planı” ile tüm ilçeyi kapsamıştır.

                        2017 yılında Cumhurbaşkanımızın eşi Emine Erdoğan Hanımefendinin himayelerinde başlatılan Sıfır Atık Projesi ile daha da koordineli hale gelen çalışmalarımız aralıksız devam etmektedir.

                        Çalışmalarımızda 6 adet sıkıştırmalı, 1 adet sıkıştırmasız atık aracı, 1 adet vinçli cam toplama kamyonu ve 30 personel ile yürütülmektedir.  Haftanın 7 günü 08.00-19.00 saatleri içerisinde gerçekleştirilen atık toplama faaliyeti sonucunda elde edilen ambalaj atıkları, ayrıştırılmak üzere Lisanslı Firma tarafından kurulan geri dönüşüm tesisine ulaştırılarak atıkların burada ekonomiye kazandırılmak üzere geri dönüşüm çalışmaları yürütülmektedir.

                        İlçemiz mücavir alanında bulunan Kamu Kurumları, Avmler, Marketler ve diğer tüm ticari faaliyette bulunan işletmelere belediyemiz tarafından temin edilen biriktirme ekipmanları ile Gebze’de tüm lokasyonlar sıfır atık sistemine dahil edilmiş oldu. Bu konuda hem belediyemiz içi hem de dışardan kurumlardan, işletmelerden ve vatandaşlarımızdan gelen talep ve önerilerin mevzuata uygunluğunun ve gerekli altyapısının sağlanması, çalışmaların yürütülmesi için Sıfır Atık Yönetim Birimimiz kurulmuştur.
                    </p>
                    <h2 className="text-2xl font-bold text-green-800 mb-4">Mevuzata Uyum</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Ülkemizde katı atıklar içinde önemli bir yer tutan ambalaj atıklarının yarattığı çevre kirliliğinin azaltılması ve bunların yeniden ekonomik değer haline getirilebilmeleri için ambalaj atıklarının yönetimi önemli bir süreçtir.

                        Ambalaj Atıkları Kontrolü Yönetmeliği 8.Madde 1. Bendinde ” Ambalaj atıklarının ayrı toplanmasından, 5216 sayılı Kanunun 7 nci maddesi kapsamında büyükşehir belediye sınırları içerisinde ilçe belediyeleri ve 5393 sayılı Kanunun 15 inci maddesi kapsamında belediyeler sorumludur” ibaresi yer almaktadır. Bu kapsam çerçevesinde belediyemiz tüm mücavir alanda oluşan ambalaj atıklarını toplamak/toplattırmakla yükümlüdür.

                    </p>
                </div>

                {/* Tablo Kartı */}
                <div className="bg-white p-6 rounded-2xl shadow mt-6">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">Yıllara Göre Toplanan Ambalaj Atıkları</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left text-gray-700 border">
                            <thead className="bg-green-100 text-green-900">
                            <tr>
                                <th className="px-4 py-2 border">Yıl</th>
                                <th className="px-4 py-2 border">Toplanan Ambalaj Atığı Miktarı (Ton)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="hover:bg-green-50">
                                <td className="px-4 py-2 border">2019</td>
                                <td className="px-4 py-2 border">11.101,191</td>
                            </tr>
                            <tr className="hover:bg-green-50">
                                <td className="px-4 py-2 border">2018</td>
                                <td className="px-4 py-2 border">12.445,830</td>
                            </tr>
                            <tr className="hover:bg-green-50">
                                <td className="px-4 py-2 border">2021</td>
                                <td className="px-4 py-2 border">6.181</td>
                            </tr>
                            <tr className="hover:bg-green-50">
                                <td className="px-4 py-2 border">2017</td>
                                <td className="px-4 py-2 border">11.644,370</td>
                            </tr>
                            <tr className="hover:bg-green-50">
                                <td className="px-4 py-2 border">2016</td>
                                <td className="px-4 py-2 border">6.585,930</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeriDonusumDetayPage;