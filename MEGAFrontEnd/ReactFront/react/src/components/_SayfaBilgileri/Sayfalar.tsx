import {DropdownItem} from './types.tsx';
import {
    FiActivity,
    FiAward, FiBook, FiBookOpen, FiCamera,
    FiCoffee,
    FiClipboard,
    FiEye, FiGlobe, FiHeart, FiHome,
    FiLayout, FiMap, FiMapPin, FiRefreshCw,
    FiTarget,
    FiTool,
    FiUser,
    FiUserCheck, FiDollarSign, FiEdit, FiPhone, FiInfo,
    FiUsers,
    FiCreditCard,
    FiFileText
} from 'react-icons/fi';

export const gebze: DropdownItem[] = [
    {
        icon: <FiBookOpen  size={24}/>,
        title: 'TARİHÇE',
        description: 'Gebze Tarihçesi hakkında bilgi',
        path:'/gebze/tarihce'
    },
    {
        icon: <FiMap />,
        title: 'BUGÜNKÜ GEBZE',
        description: 'Bugünkü Gebze hakkında bilgi',
        path:'/gebze/bugunkugebze'
    },

    {
        icon: <FiGlobe />,
        title: 'KARDEŞ ŞEHİRLER',
        description: 'Kardeş Şehirler hakkında bilgi',
        path:'/gebze/kardessehirler'
    },

    {
        icon: <FiMapPin />,
        title: 'MAHALLE MUHTARLARI',
        description: 'Mahalle Muhtarları hakkında bilgi',
        path:'/gebze/muhtarlar'
    },
    {
        icon: <FiMap />,
        title: 'TARİHİ YERLER',
        description: 'Tarihi Yerler hakkında bilgi',
        path:'/gebze/tarihiyerler'
    },
    {
        icon: <FiCamera />,
        title: 'FOTOĞRAFLARLA GEBZE',
        description: 'Gebze Fotoğrafları hakkında bilgi',
        path:'/gebze/fotograflarlaGebze'
    },

    {
        icon: <FiUsers />,
        title: 'ÜYE OLDUĞUMUZ BİRLİKLER',
        description: 'Üye Olduğumuz Birlikler hakkında bilgi',
        path:'/gebze/uyeoldugumuzbirlikler'
    },
    {icon: <FiMap />,
        title: '360 SANAL TUR',
        description: 'Gebze 360 Sanal Tur',
        path:'/gebze/360sanaltur'
    },

];
export const kurumsal: DropdownItem[] = [

    {
        icon: <FiUsers  size={20}/>,
        title: 'BAŞKAN',
        description: 'Başkan hakkında bilgi',
        path: '/kurumsal/baskan'// onClick yerine pathname kullanın

    },
    {
        icon: <FiEye  size={20}/>,
        title: 'VİZYONUMUZ',
        description: 'Vizyonumuz hakkında bilgi',
        path: '/kurumsal/vizyon'

    },
    {
        icon: <FiTarget  size={20}/>,
        title: 'MİSYONUMUZ',
        description: 'Misyonumuz hakkında bilgi',
        path: '/kurumsal/misyon'
    },
    {
        icon: <FiAward  size={20}/>,
        title: 'İLKELERİMİZ',
        description: 'İlkelerimiz hakkında bilgi',
        path: '/kurumsal/ilkelerimiz'
    },
    {
        icon: <FiUsers  size={20}/>,
        title: 'BELEDİYE MECLİSİ',
        description: 'Belediye Meclisi hakkında bilgi',
        path: '/kurumsal/belediyemeclisi'
    },
    {
        icon: <FiLayout  size={20}/>,
        title: 'YÖNETİM ŞEMASI',
        description: 'Yönetim Şeması hakkında bilgi',
        path: '/kurumsal/yonetimsemasi'
    },
    {
        icon: <FiUsers  size={20}/>,
        title: 'BAŞKAN YARDIMCILARI',
        description: 'Başkan Yardımcıları hakkında bilgi',
        path:'/kurumsal/baskanyardimcilari'
    },
    {
        icon: <FiUser  size={20}/>,
        title: 'BAŞKAN DANIŞMANLARI',
        description: 'Başkan Danışmanları hakkında bilgi',
        path: '/kurumsal/baskandanismanlari'
    },
    {
        icon: <FiFileText  size={20}/>,
        title: 'MÜDÜRLÜKLER',
        description: 'Müdürlükler hakkında bilgi',
        path:'/kurumsal/mudurlukler'
    },
    {
        icon: <FiUsers  size={20}/>,
        title: 'ESKİ BAŞKANLAR',
        description: 'Eski Başkanlar hakkında bilgi',
        path:'/kurumsal/eskibaskanlar'
    },
    {
        icon: <FiUserCheck  size={20}/>,
        title: 'ARABULUCULUK KOMİSYONU',
        description: 'Arabuluculuk Komisyonu hakkında bilgi',
        path:'/kurumsal/arabuluculuk'
    },
    {
        icon: <FiUserCheck  size={20}/>,
        title: 'ETİK KOMİSYONU',
        description: 'Etik Komisyonu hakkında bilgi',
        path: '/kurumsal/etikkomisyonu'
    },
    {
        icon: <FiClipboard  size={20}/>,
        title: 'MECLİS KARALARI',
        description: 'Meclis Kararları hakkında bilgi',
        path: '/kurumsal/mecliskararlari'
    },
    {
        icon: <FiFileText  size={20}/>,
        title: 'KURUMSAL KİMLİK',
        description: 'Kurumsal Kimlik hakkında bilgi',
        path: '/kurumsal/kurumsalkimlik'
    },
    {
        icon: <FiFileText  size={20}/>,
        title: 'KURUMSAL RAPORLAR',
        description: 'Kurumsal Raporlar hakkında bilgi',
        path: '/kurumsal/raporlar'
    },
    {
        icon: <FiFileText  size={20}/>,
        title: 'KURUMSAL DÖKÜMANLAR',
        description: 'Kurumsal Dökümanlar hakkında bilgi',
        path: '/kurumsal/kurumsaldoc'
    },

];

export const skurumsal: DropdownItem[] = [

    {
        icon: <FiUsers  size={20}/>,
        title: 'BAŞKAN',
        description: 'Başkan hakkında bilgi',
        path: '/kurumsal/baskan'// onClick yerine pathname kullanın

    },
    {
        icon: <FiEye  size={20}/>,
        title: 'VİZYONUMUZ',
        description: 'Vizyonumuz hakkında bilgi',
        path: '/kurumsal/vizyon'

    },
    {
        icon: <FiTarget  size={20}/>,
        title: 'MİSYONUMUZ',
        description: 'Misyonumuz hakkında bilgi',
        path: '/kurumsal/misyon'
    },
    {
        icon: <FiAward  size={20}/>,
        title: 'İLKELERİMİZ',
        description: 'İlkelerimiz hakkında bilgi',
        path: '/kurumsal/ilkelerimiz'
    },

    {
        icon: <FiLayout  size={20}/>,
        title: 'YÖNETİM ŞEMASI',
        description: 'Yönetim Şeması hakkında bilgi',
        path: '/kurumsal/yonetimsemasi'
    },
    {
        icon: <FiUsers  size={20}/>,
        title: 'BAŞKAN YARDIMCILARI',
        description: 'Başkan Yardımcıları hakkında bilgi',
        path:'/kurumsal/baskanyardimcilari'
    },
    {
        icon: <FiUser  size={20}/>,
        title: 'BAŞKAN DANIŞMANLARI',
        description: 'Başkan Danışmanları hakkında bilgi',
        path: '/kurumsal/baskandanismanlari'
    },
    {
        icon: <FiFileText  size={20}/>,
        title: 'MÜDÜRLÜKLER',
        description: 'Müdürlükler hakkında bilgi',
        path:'/kurumsal/mudurlukler'
    },
    {
        icon: <FiUsers  size={20}/>,
        title: 'BELEDİYE MECLİSİ',
        description: 'Belediye Meclisi hakkında bilgi',
        path: '/kurumsal/belediyemeclisi'
    },
    {
        icon: <FiUsers  size={20}/>,
        title: 'ESKİ BAŞKANLAR',
        description: 'Eski Başkanlar hakkında bilgi',
        path:'/kurumsal/eskibaskanlar'
    }
];


export const hizmetler: DropdownItem[] = [
    {
        icon: <FiTool />,
        title: 'ATÖLYELER',
        description: 'Atölye çalışmaları hakkında bilgi',
        path: '/hizmetler/atolyeler'
    },
    {
        icon: <FiHome />,
        title: 'BEBEK VE ÇOCUK BAKIM EVİ',
        description: 'Bebek ve çocuk bakımı hakkında bilgi',
        path: '/hizmetler/bakimevi'

    },
    {
        icon: <FiBook />,
        title: 'EĞİTİMLER',
        description: 'Eğitim programları hakkında bilgi',
        path: '/hizmetler/egitimler'

    },
    {
        icon: <FiHeart />,
        title: 'EVLENDİRME',
        description: 'Evlendirme işlemleri hakkında bilgi',
        path: '/hizmetler/evlendirme'
    },
    {
        icon: <FiRefreshCw />,
        title: 'GERİ DÖNÜŞÜM',
        description: 'Geri dönüşüm hizmetleri hakkında bilgi',
        path: '/hizmetler/geridonusum'
    },
    {
        icon: <FiActivity />,
        title: 'GÜREŞ',
        description: 'Güreş etkinlikleri hakkında bilgi',
        path: '/hizmetler/gures'
    },
    {
        icon: <FiBookOpen />,
        title: 'KÜTÜPHANE',
        description: 'Kütüphane hizmetleri hakkında bilgi',
        path: '/hizmetler/kutuphane'

    },
    {
        icon: <FiMapPin />,
        title: 'MERKEZLER',
        description: 'Merkezler hakkında bilgi',
        path: '/hizmetler/merkezler'
    },

    {
        icon: <FiCoffee />,
        title: 'MESİRE ALANI',
        description: 'Mesire alanları hakkında bilgi',
        path: '/hizmetler/mesirealani'
    },
];
export const eBelediye: DropdownItem[] = [
    {
        icon: <FiDollarSign />,
        title: 'VERGİ İŞLEMLERİ',
        description: 'Vergi işlemleri hakkında bilgi'
    },
    {
        icon: <FiCreditCard />,
        title: 'VERGİ & BORÇ ÖDEME',
        description: 'Vergi ve borç ödeme işlemleri'
    },
    {icon: <FiEdit />, title: 'E-BEYAN', description: 'E-Beyan işlemleri'},
    {
        icon: <FiClipboard />,
        title: 'E-BEYAN BİLDİRİM TAKİP',
        description: 'E-Beyan bildirim takip işlemleri'
    },
    {
        icon: <FiPhone />,
        title: 'GEBZE İLETİŞİM MERKEZİ',
        description: 'Gebze iletişim merkezi hakkında bilgi'
    },
    {icon: <FiFileText />, title: 'BAŞVURU FORMU', description: 'Başvuru formu işlemleri'},
    {icon: <FiFileText />, title: 'BAŞVURU TAKİP', description: 'Başvuru takip işlemleri'},
    {
        icon: <FiInfo />,
        title: 'BİLGİ EDİNME (CİMER)',
        description: 'Bilgi edinme işlemleri (CİMER)'
    },
];

export const yayinlarimiz: DropdownItem[] = [
    {
        icon: <FiDollarSign />,
        title: 'GEBZE BELEDİYESİ PROJELERİ',
        description: 'Gerçekleştirilen projeler',
        path: '/yayin/projeler'
    },
    {
        icon: <FiCreditCard />,
        title: 'GEBZE MANŞET',
        description: 'Vergi ve borç ödeme işlemleri',
        path: '/yayin/manset'
    },
    {   icon: <FiEdit />,
        title: 'KÜLTÜR YAYINLARI',
        description: 'Kültürel yayınlanan belgeler ',
        path: '/yayin/kultur'
    }
];

export const tarihiyerler: DropdownItem[] = [
    {
        icon: <FiMap />,
        title: 'ANİBALIN MEZARI',
        path: '/gebze/tarihiyerler/hanibalınmezarı'
    },
    {
        icon: <FiMap />,
        title: 'BALLIKAYALAR',
        path: '/gebze/tarihiyerler/ballikayalar'
    },
    {
        icon: <FiMap />,
        title: 'ÇOBAN MUSTAFA PAŞA KÜLLİYESİ',
        path: '/gebze/tarihiyerler/külliyesi'
    },
    {
        icon: <FiMap />,
        title: 'ÇOBAN MUSTAFA PAŞA HAMAMI',
        path: '/gebze/tarihiyerler/hamami'
    },
    {
        icon: <FiMap />,
        title: 'ÇOBAN MUSTAFA PAŞA ŞADIRVANI',
        path: '/gebze/tarihiyerler/sadirvani'
    },
    {
        icon: <FiMap />,
        title: 'ESKİHİSAR ÇEŞMESİ',
        path: '/gebze/tarihiyerler/cesmesi'
    },
    {
        icon: <FiMap />,
        title: 'ESKİHİSAR KALESİ',
        path: '/gebze/tarihiyerler/kalesi'
    },
    {
        icon: <FiMap />,
        title: 'HÜNKAR ÇAYIRI',
        path: '/gebze/tarihiyerler/hünkar'
    },
    {
        icon: <FiMap />,
        title: 'İBRAHİM PAŞA ÇEŞMESİ',
        path: '/gebze/tarihiyerler/ibrahimpasacesmesi'
    },
    {
        icon: <FiMap />,
        title: 'İLYAS BEY CAMİİ',
        path: '/gebze/tarihiyerler/ilyasbeycamii'
    },
    {
        icon: <FiMap />,
        title: 'OSMAN HAMDİ BEY YALISI',
        path: '/gebze/tarihiyerler/osmanhamdibeyyalisi'
    },
    {
        icon: <FiMap />,
        title: 'SULTAN ORHAN CAMİİ',
        path: '/gebze/tarihiyerler/sultanorhancamii'
    }
];