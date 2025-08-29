import { useState } from "react";
import { MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const hizmetNoktalari = [
    {
        id: 1,
        ad: "📊 Basın Yayın ve Halkla İlişkiler Müdürlüğü",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Gebze+Belediye+Ba%C5%9Fkanl%C4%B1%C4%9F%C4%B1/@40.805905,29.440195,1707m/data=!3m1!1e3!4m6!3m5!1s0x14cb2088efaa11d3:0x575a512b11a2fd35!8m2!3d40.805905!4d29.440195!16s%2Fg%2F1tk69xgw?hl=tr&entry=ttu&g_ep=EgoyMDI1MDQyNy4xIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 2,
        ad: " 💻  Bilgi İşlem Müdürlüğü",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Gebze+Belediye+Ba%C5%9Fkanl%C4%B1%C4%9F%C4%B1/@40.805905,29.440195,1707m/data=!3m1!1e3!4m6!3m5!1s0x14cb2088efaa11d3:0x575a512b11a2fd35!8m2!3d40.805905!4d29.440195!16s%2Fg%2F1tk69xgw?hl=tr&entry=ttu&g_ep=EgoyMDI1MDQyNy4xIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 3,
        ad: "🛠️ Destek Hizmetleri Müdürlüğü",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Gebze+Belediye+Ba%C5%9Fkanl%C4%B1%C4%9F%C4%B1/@40.805905,29.440195,1707m/data=!3m1!1e3!4m6!3m5!1s0x14cb2088efaa11d3:0x575a512b11a2fd35!8m2!3d40.805905!4d29.440195!16s%2Fg%2F1tk69xgw?hl=tr&entry=ttu&g_ep=EgoyMDI1MDQyNy4xIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 4,
        ad: "🏠 Emlak ve İstimlak Müdürlüğü",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Gebze+Belediye+Ba%C5%9Fkanl%C4%B1%C4%9F%C4%B1/@40.805905,29.440195,1707m/data=!3m1!1e3!4m6!3m5!1s0x14cb2088efaa11d3:0x575a512b11a2fd35!8m2!3d40.805905!4d29.440195!16s%2Fg%2F1tk69xgw?hl=tr&entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },

    {
        id: 5,
        ad: "🚧 Fen İşleri Müdürlüğü",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/K%C3%B6%C5%9Fkl%C3%BC+%C3%87e%C5%9Fme,+Yeni+Ba%C4%9Fdat+Cd.+No:118,+41400+Gebze%2FKocaeli/@40.7959544,29.3952917,853m/data=!3m2!1e3!4b1!4m6!3m5!1s0x14cadf98048500d3:0xb108f5068589224!8m2!3d40.7959544!4d29.3952917!16s%2Fg%2F11vkcbz143?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 6,
        ad: "⚖️ Hukuk İşleri Müdürlüğü",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Gebze+Belediye+Ba%C5%9Fkanl%C4%B1%C4%9F%C4%B1/@40.805905,29.440195,1707m/data=!3m1!1e3!4m6!3m5!1s0x14cb2088efaa11d3:0x575a512b11a2fd35!8m2!3d40.805905!4d29.440195!16s%2Fg%2F1tk69xgw?hl=tr&entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 7,
        ad: "🏘️ İmar ve Şehircilik Müdürlüğü",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Gebze+Belediyesi/@40.805905,29.440195,16z/data=!4m5!3m4!1s0x0:0x575a512b11a2fd35!8m2!3d40.805905!4d29.440195?hl=tr&shorturl=1",
    },
    {
        id: 8,
        ad: "👥 İnsan Kaynakları ve Eğitim Müdürlüğü",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Gebze+Belediye+Ba%C5%9Fkanl%C4%B1%C4%9F%C4%B1/@40.805905,29.440195,1707m/data=!3m1!1e3!4m6!3m5!1s0x14cb2088efaa11d3:0x575a512b11a2fd35!8m2!3d40.805905!4d29.440195!16s%2Fg%2F1tk69xgw?hl=tr&entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 9,
        ad: "📈 İşletme ve İştirakler Müdürlüğü",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Mevlana+Kapal%C4%B1+Pazar+Yeri/@40.8122851,29.4193005,17.75z/data=!4m5!3m4!1s0x14cb214b36d25719:0x23db983d4dff738b!8m2!3d40.8120141!4d29.4188972?shorturl=1",
    },
    {
        id: 10,
        ad: "💰 Mali Hizmetler Müdürlüğü",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Gebze+Belediyesi/@40.805905,29.440195,16z/data=!4m5!3m4!1s0x0:0x575a512b11a2fd35!8m2!3d40.805905!4d29.440195?hl=tr&shorturl=1",
    },
    {
        id: 11,
        ad: "🛡️ Zabıta Müdürlüğü",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Mevlana+Kapal%C4%B1+Pazar+Yeri/@40.8122851,29.4193005,17.75z/data=!4m5!3m4!1s0x14cb214b36d25719:0x23db983d4dff738b!8m2!3d40.8120141!4d29.4188972?shorturl=1",
    },

    {
        id: 12,
        ad: "📈 İşletme ve İştirakler Müdürlüğü",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Mevlana+Kapal%C4%B1+Pazar+Yeri/@40.8122851,29.4193005,17.75z/data=!4m5!3m4!1s0x14cb214b36d25719:0x23db983d4dff738b!8m2!3d40.8120141!4d29.4188972?shorturl=1",
    },
    {
        id: 13,
        ad: "📚 Kültür İşleri Müdürlüğü",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Gebze+K%C3%BClt%C3%BCr+Merkezi/@40.7977525,29.429909,213m/data=!3m1!1e3!4m6!3m5!1s0x14cb2088792c7b75:0x6f17b50e45cc6c97!8m2!3d40.7982109!4d29.43007!16s%2Fg%2F11cltwggz7?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 14,
        ad: "👰‍♀️🤵‍♂️ Evlendirme Memurluğu",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Gebze+K%C3%BClt%C3%BCr+Merkezi/@40.7977525,29.429909,213m/data=!3m1!1e3!4m6!3m5!1s0x14cb2088792c7b75:0x6f17b50e45cc6c97!8m2!3d40.7982109!4d29.43007!16s%2Fg%2F11cltwggz7?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 15,
        ad: "💰 Mali Hizmetler Müdürlüğü",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Gebze+Belediyesi/@40.805905,29.440195,16z/data=!4m5!3m4!1s0x0:0x575a512b11a2fd35!8m2!3d40.805905!4d29.440195?hl=tr&shorturl=1",
    },
    {
        id: 16,
        ad: "🪦 Mezarlıklar Müdürlüğü",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Gebze+Merkez+Mezarl%C4%B1%C4%9F%C4%B1+ve+%C5%9Eehitli%C4%9Fi/@40.8156572,29.4115268,3413m/data=!3m1!1e3!4m6!3m5!1s0x14cadf6144297b57:0xedcf6db761ed2ca8!8m2!3d40.8147379!4d29.4130591!16s%2Fg%2F11dzdw421p?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 17,
        ad: " 🗂️  Özel Kalem Müdürlüğü",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Gebze+Belediye+Ba%C5%9Fkanl%C4%B1%C4%9F%C4%B1/@40.805905,29.440195,1707m/data=!3m1!1e3!4m6!3m5!1s0x14cb2088efaa11d3:0x575a512b11a2fd35!8m2!3d40.805905!4d29.440195!16s%2Fg%2F1tk69xgw?hl=tr&entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 18,
        ad: "🌳 Park ve Bahçeler Müdürlüğü",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Gaziler,+1727.+Sk.+No:1,+41400+Gebze%2FKocaeli/@40.8147875,29.4186089,252m/data=!3m1!1e3!4m5!3m4!1s0x14cb209fcc2e6b9f:0xf8e1183006075a6b!8m2!3d40.8149938!4d29.4190371?shorturl=1",
    },
    {
        id: 19,
        ad: "🗺️ Plan ve Proje Müdürlüğü",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Gebze+Belediye+Ba%C5%9Fkanl%C4%B1%C4%9F%C4%B1/@40.805905,29.440195,1707m/data=!3m1!1e3!4m6!3m5!1s0x14cb2088efaa11d3:0x575a512b11a2fd35!8m2!3d40.805905!4d29.440195!16s%2Fg%2F1tk69xgw?hl=tr&entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 20,
        ad: "📄 Ruhsat ve Denetim Müdürlüğü",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Gebze+Belediyesi/@40.805905,29.440195,16z/data=!4m5!3m4!1s0x0:0x575a512b11a2fd35!8m2!3d40.805905!4d29.440195?hl=tr&shorturl=1",
    },
    {
        id: 21,
        ad: "🫂 Sosyal Destek Hizmetleri Müdürlüğü",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Gebze+K%C3%BClt%C3%BCr+Merkezi/@40.7975161,29.4306013,639m/data=!3m1!1e3!4m6!3m5!1s0x14cb2088792c7b75:0x6f17b50e45cc6c97!8m2!3d40.7982109!4d29.43007!16s%2Fg%2F11cltwggz7?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 22,
        ad: "📋  Teftiş Kurulu Müdürlüğü",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Mevlana+Kapal%C4%B1+Pazar+Yeri/@40.8122851,29.4193005,853m/data=!3m1!1e3!4m6!3m5!1s0x14cb214b36d25719:0x23db983d4dff738b!8m2!3d40.8115684!4d29.4190946!16s%2Fg%2F11gnprgbd1?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 23,
        ad: "🗑️ Temizlik İşleri Müdürlüğü",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Kirazp%C4%B1nar,+Yeni+Ba%C4%9Fdat+Cd.+No:883,+41400+Gebze%2FKocaeli/@40.8209787,29.4675723,853m/data=!3m2!1e3!4b1!4m6!3m5!1s0x14cb212b21547c6b:0xa9fd1f16e010550a!8m2!3d40.8209787!4d29.4675723!16s%2Fg%2F11c1_fb4rt?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 24,
        ad: "🐾 Veteriner İşleri Müdürlüğü",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Mevlana+Kapal%C4%B1+Pazar+Yeri/@40.8122851,29.4193005,853m/data=!3m1!1e3!4m6!3m5!1s0x14cb214b36d25719:0x23db983d4dff738b!8m2!3d40.8115684!4d29.4190946!16s%2Fg%2F11gnprgbd1?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 25,
        ad: "📝  Yazı İşleri Müdürlüğü",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Gebze+K%C3%BClt%C3%BCr+Merkezi/@40.7977525,29.429909,19.25z/data=!4m5!3m4!1s0x14cb2088792c7b75:0x6f17b50e45cc6c97!8m2!3d40.7983025!4d29.4301529?shorturl=1",
    },
    {
        id: 26,
        ad: "🛡️ Zabıta Müdürlüğü",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Mevlana+Kapal%C4%B1+Pazar+Yeri/@40.8122851,29.4193005,17.75z/data=!4m5!3m4!1s0x14cb214b36d25719:0x23db983d4dff738b!8m2!3d40.8120141!4d29.4188972?shorturl=1",
    },
    {
        id: 27,
        ad: "🧑‍💼 İstihdam Büro",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Gebze+Belediyesi/@40.805905,29.440195,16z/data=!4m5!3m4!1s0x0:0x575a512b11a2fd35!8m2!3d40.805905!4d29.440195?hl=tr&shorturl=1",
    },
    {
        id: 28,
        ad: "🏗️ Makina İkmal Bakım Onarım Servisi",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Mevlana+Kapal%C4%B1+Pazar+Yeri/@40.8122851,29.4193005,853m/data=!3m1!1e3!4m6!3m5!1s0x14cb214b36d25719:0x23db983d4dff738b!8m2!3d40.8115684!4d29.4190946!16s%2Fg%2F11gnprgbd1?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 29,
        ad: "🚌  Otobüs İşleri Servisi",
        kategori: "Birimler",
        adres: "Mevlana Mahallesi",
        konumUrl: "https://www.google.com/maps/place/Mevlana+Kapal%C4%B1+Pazar+Yeri/@40.8122851,29.4193005,853m/data=!3m1!1e3!4m6!3m5!1s0x14cb214b36d25719:0x23db983d4dff738b!8m2!3d40.8115684!4d29.4190946!16s%2Fg%2F11gnprgbd1?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 30,
        ad: "📑  Evrak Kayıt Servisi",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Gebze+Belediyesi/@40.805905,29.440195,16z/data=!4m5!3m4!1s0x0:0x575a512b11a2fd35!8m2!3d40.805905!4d29.440195?hl=tr&shorturl=1",
    },
    {
        id: 31,
        ad: "🔢  Numarataj Şefliği",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Gebze+Belediyesi/@40.805905,29.440195,16z/data=!4m5!3m4!1s0x0:0x575a512b11a2fd35!8m2!3d40.805905!4d29.440195?hl=tr&shorturl=1",
    },

    {
        id: 32,
        ad: "🚦 Trafik ve Eğitim Okulu Zabıta Amirliği",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Zab%C4%B1ta+M%C3%BCd%C3%BCrl%C3%BC%C4%9F%C3%BC+%C3%87ocuk+Trafik+E%C4%9Fitim+Okulu/@40.8049925,29.4428919,18.75z/data=!4m5!3m4!1s0x14cb20ec9006cb7d:0xd6ffdfe862f20282!8m2!3d40.804962!4d29.4434921?shorturl=1",
    },
    {
        id: 33,
        ad: " 🛍️  Çarşı ve Seyyar Zabıta Amirliği",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Zab%C4%B1ta+M%C3%BCd%C3%BCrl%C3%BC%C4%9F%C3%BC+%C3%87ocuk+Trafik+E%C4%9Fitim+Okulu/@40.8049925,29.4428919,18.75z/data=!4m5!3m4!1s0x14cb20ec9006cb7d:0xd6ffdfe862f20282!8m2!3d40.804962!4d29.4434921?shorturl=1",
    },
    {
        id: 34,
        ad: "🏢 Terminal Zabıta Amirliği",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Gebze+Terminali/@40.7948829,29.4573284,853m/data=!3m1!1e3!4m6!3m5!1s0x14cb20fac8ab9801:0x266fc5bbb55d7ee8!8m2!3d40.7948789!4d29.4595171!16s%2Fg%2F1ptz5924m?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 35,
        ad: "🛡️ Mollafenari Zabıta Amirliği",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/@40.8859666,29.4927502,3a,55.8y,134.48h,89.08t/data=!3m7!1e1!3m5!1s-9qle0WHXRI0irrRBfUwbw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0.9177168005659553%26panoid%3D-9qle0WHXRI0irrRBfUwbw%26yaw%3D134.4827285718215!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 36,
        ad: "🛡️ Beylikbağı Karakolu",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Beylikba%C4%9F%C4%B1+Bilim+ve+Sanat+Merkezi/@40.8060524,29.3815603,853m/data=!3m1!1e3!4m6!3m5!1s0x14cadfa7d2168009:0x9d4de4e27aefbc48!8m2!3d40.8060484!4d29.383749!16s%2Fg%2F11dfj9z7ym?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 37,
        ad: "🛡️ Kamyon Tır Garajı Zabıta Karakolu",
        kategori: "Birimler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Bar%C4%B1%C5%9F,+Marmara+Nakliyeciler+Terminali,+41400+Gebze%2FKocaeli/@40.7977461,29.4684176,18z/data=!3m1!4b1!4m5!3m4!1s0x14cb211c04c111a9:0x6170e99e4c4123de!8m2!3d40.7975598!4d29.4694361?shorturl=1",
    },
    {
        id: 38,
        ad: "🔭 Beylikbağı Bilim ve Sanat Merkezi",
        kategori: "Bilim Sanat Merkezleri",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Beylikba%C4%9F%C4%B1+Bilim+ve+Sanat+Merkezi/@40.8060524,29.3815603,17z/data=!4m5!3m4!1s0x14cadfa7d2168009:0x9d4de4e27aefbc48!8m2!3d40.8060359!4d29.3837509?shorturl=1",
    },
    {
        id: 39,
        ad: "🔬 Arapçeşme Bilim Ve Sanat Merkezi",
        kategori: "Bilim Sanat Merkezleri",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Bar%C4%B1%C5%9F,+Marmara+Nakliyeciler+Terminali,+41400+Gebze%2FKocaeli/@40.7977461,29.4684176,18z/data=!3m1!4b1!4m5!3m4!1s0x14cb211c04c111a9:0x6170e99e4c4123de!8m2!3d40.7975598!4d29.4694361?shorturl=1",
    },
    {
        id: 40,
        ad: "🧬 İstasyon Bilim ve Sanat Merkezi",
        kategori: "Bilim Sanat Merkezleri",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Gebze+Belediyesi+Bilim+ve+Sanat+Merkezi/@40.784984,29.410849,3414m/data=!3m1!1e3!4m6!3m5!1s0x14cadf8c6861acd5:0x8e61b03f09c2b2c2!8m2!3d40.784984!4d29.410849!16s%2Fg%2F11g876pktq?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 41,
        ad: "🕊️ Güzide Cumhuriyet Meydanı",
        kategori: "Sosyal Tesisler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Hac%C4%B1halil,+Atat%C3%BCrk+Cd.+No:10%2F9,+41400+Gebze%2FKocaeli/@40.7978426,29.4316413,107m/data=!3m1!1e3!4m6!3m5!1s0x14cb2088e5fe3467:0x9b3576f802414c40!8m2!3d40.797941!4d29.431729!16s%2Fg%2F11rx83w0tm?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 42,
        ad: "🏟️ Güzide Kent Meydanı",
        kategori: "Sosyal Tesisler",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/G%C3%BCzide+Kent+Meydan%C4%B1/@40.7984529,29.4301886,213m/data=!3m1!1e3!4m6!3m5!1s0x14cb21831ca8cb55:0x6766574bbca84e13!8m2!3d40.7985304!4d29.4299523!16s%2Fg%2F11rsqlxyjl?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 43,
        ad: "🏇 Atlı Eğitim Merkezi",
        kategori: "Eğitim",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Gebze+Belediyesi+Atl%C4%B1+E%C4%9Fitim+Merkezi/@40.8215662,29.4263812,3413m/data=!3m1!1e3!4m6!3m5!1s0x14cb21919411d8b3:0xc02b5ca41c3cfd37!8m2!3d40.8215662!4d29.4263812!16s%2Fg%2F11g0gpt7v9?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 44,
        ad: "🏋️ Cumhuriyet Spor Salonu",
        kategori: "Eğitim",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Cumhuriyet,+Yeni+Ba%C4%9Fdat+Cd.+No:119,+41400+Gebze%2FKocaeli/@40.808397,29.3767127,18z/data=!3m1!4b1!4m5!3m4!1s0x14cadfa98c371e2f:0x21939a9f1a7d9e94!8m2!3d40.808397!4d29.377807?shorturl=1&shorturl=1",
    },
    {
        id: 45,
        ad: "🧩 Enderun Çocuk Atölyeleri",
        kategori: "Eğitim",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Mustafapa%C5%9Fa,+712%2F2.+Sk.+No:2,+41400+Gebze%2FKocaeli/@40.802388,29.427409,861m/data=!3m1!1e3!4m6!3m5!1s0x14cb2085a55b34a1:0xfb2fb8bc3b387035!8m2!3d40.802388!4d29.427409!16s%2Fg%2F11c2927bq_?ll=40.802388,29.427409&z=17&t=m&gl=TR&mapclient=embed&q=712/2.+Sk.+No:2+Mustafapa%C5%9Fa+41400+Gebze/Kocaeli&entry=tts&g_ep=EgoyMDI0MTIxMS4wIPu8ASoASAFQAw%3D%3D",
    },
    {
        id: 46,
        ad: "🏫 GESMEK Ademyavuz Mahalle Kursu",
        kategori: "Eğitim",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Adem+Yavuz,+2322.+Sk.+No:1,+41400+Gebze+Organize+Sanayi+B%C3%B6lgesi+3%2FGebze%2FKocaeli/@40.8208441,29.3817646,853m/data=!3m2!1e3!4b1!4m6!3m5!1s0x14cadf1a67d92827:0x7ef12b34e95c8fd8!8m2!3d40.8208441!4d29.3817646!16s%2Fg%2F11kgs58xrr?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 47,
        ad: "📘 GESMEK Gaziler Mahalle Kursu",
        kategori: "Eğitim",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/E%C5%9Fref+Bitlis+Park%C4%B1/@40.8146785,29.430259,17z/data=!4m5!3m4!1s0x14cb20bd7e654599:0xd167f603137cb32c!8m2!3d40.8146745!4d29.4324477?shorturl=1",
    },
    {
        id: 48,
        ad: "🏛️ GESMEK Merkez",
        kategori: "Eğitim",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/GESMEK+-+Gebze+Belediyesi+G%C3%BCzel+Sanatlar+ve+Meslek+E%C4%9Fitimi+Kurslar%C4%B1/@40.799833,29.433036,3414m/data=!3m1!1e3!4m6!3m5!1s0x14cb208ec548401f:0x51d3b10ec2b5859a!8m2!3d40.799833!4d29.433036!16s%2Fg%2F11g6xrd_n2?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 49,
        ad: "🧑‍🏫 GESMEK Yenikent Mahalle Kursu",
        kategori: "Eğitim",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Nur+Said+K%C4%B1rtasiye+%26+Tuhafiye+-+Oyuncak/@40.8202494,29.4199115,21z/data=!4m5!3m4!1s0x14cb214deef111e9:0xa579d0fe426252a4!8m2!3d40.82029!4d29.4199892?shorturl=1",
    },
    {
        id: 50,
        ad: "🪦 Adem Yavuz Mezarlığı",
        kategori: "Diğer",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Adem+Yavuz+Mahallesi+Mezarl%C4%B1%C4%9F%C4%B1/@40.819014,29.3758483,853m/data=!3m1!1e3!4m6!3m5!1s0x14cadf1b3b7189df:0x101d3a1916754cae!8m2!3d40.8193977!4d29.3794426!16s%2Fg%2F1tdjmkpz?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 51,
        ad: "🎖️ Gebze Merkez Mezarlığı ve Şehitliği",
        kategori: "Diğer",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Gebze+Merkez+Mezarl%C4%B1%C4%9F%C4%B1+ve+%C5%9Eehitli%C4%9Fi/@40.8156572,29.4115268,3413m/data=!3m1!1e3!4m6!3m5!1s0x14cadf6144297b57:0xedcf6db761ed2ca8!8m2!3d40.8147379!4d29.4130591!16s%2Fg%2F11dzdw421p?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 52,
        ad: "🪦 Mimar Sinan Mezarlığı",
        kategori: "Diğer",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Mimar+Sinan+Mahallesi+Mezarl%C4%B1%C4%9F%C4%B1/@40.8110423,29.384629,18z/data=!4m5!3m4!1s0x14cadf08e659f719:0xab1fc40bbd0f861c!8m2!3d40.8109238!4d29.3854621?shorturl=1",
    },
    {
        id: 53,
        ad: "🪦 Pelitli Mezarlığı",
        kategori: "Diğer",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Pelitli,+Yeni+Mezarl%C4%B1k+Yolu+No:107,+41400+Gebze%2FKocaeli/@40.8379003,29.4651812,1706m/data=!3m1!1e3!4m5!3m4!1s0x14cb26dfa7cf1b15:0xac0c247f4b8e0588!8m2!3d40.8386452!4d29.4664408?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 54,
        ad: "🪦 Osman Yılmaz Mezarlığı",
        kategori: "Diğer",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Osman+Y%C4%B1lmaz,+611.+Sk.+No:16,+41400+Gebze%2FKocaeli/@40.792897,29.4198293,854m/data=!3m1!1e3!4m6!3m5!1s0x14cb207ecb3fe14b:0x821e73eeae9ce77!8m2!3d40.792897!4d29.422018!16s%2Fg%2F11c5f0n7s_?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 55,
        ad: "🤝 Elden Ele Gönül Çarşısı",
        kategori: "Diğer",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Elden+Ele+G%C3%B6n%C3%BCl+%C3%87ar%C5%9F%C4%B1s%C4%B1/@40.7988478,29.429805,3414m/data=!3m1!1e3!4m6!3m5!1s0x14cb2124c099f945:0xfb811f41d638ef78!8m2!3d40.7988478!4d29.429805!16s%2Fg%2F11n0pcw6zn?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 56,
        ad: "🚌 Gebze Terminali",
        kategori: "Diğer",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Gebze+Terminali/@40.7948829,29.4573284,17z/data=!4m5!3m4!1s0x14cb20fac8ab9801:0x266fc5bbb55d7ee8!8m2!3d40.7948972!4d29.4595045?shorturl=1",
    },
    {
        id: 57,
        ad: "🚛 Kamyon ve Tır Parkı",
        kategori: "Diğer",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Bar%C4%B1%C5%9F,+Marmara+Nakliyeciler+Terminali,+41400+Gebze%2FKocaeli/@40.7977441,29.4695119,427m/data=!3m2!1e3!4b1!4m6!3m5!1s0x14cb211c04c111a9:0x6170e99e4c4123de!8m2!3d40.7975598!4d29.4694361!16s%2Fg%2F11rs2plfyt?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 58,
        ad: "🛍️ Mevlana Kapalı Pazar Alanı",
        kategori: "Diğer",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Mevlana+Kapal%C4%B1+Pazar+Yeri/@40.8122851,29.4193005,853m/data=!3m1!1e3!4m6!3m5!1s0x14cb214b36d25719:0x23db983d4dff738b!8m2!3d40.8115684!4d29.4190946!16s%2Fg%2F11gnprgbd1?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 59,
        ad: "🐾 Sokak Hayvanları Tedavi, Rehabilitasyon ve Eğitim Merkezi",
        kategori: "Diğer",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Pelitli,+Yeni+Mezarl%C4%B1k+Yolu+no:49,+41400+Gebze%2FKocaeli/@40.834091,29.4819456,3942m/data=!3m1!1e3!4m6!3m5!1s0x14cb26fcdbcadd9b:0xc9a68e98eff20ce9!8m2!3d40.8503446!4d29.4677041!16s%2Fg%2F11rcwln59g?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 60,
        ad: "🧺 Tatlıkuyu Pazar Alanı",
        kategori: "Diğer",
        adres: "",
        konumUrl: "https://www.google.com/maps/place/Tatl%C4%B1kuyu+Kapal%C4%B1+Pazar+Yeri/@40.7901627,29.4421716,427m/data=!3m1!1e3!4m6!3m5!1s0x14cb205fbbe2d5d7:0xc616ba8ce58cb649!8m2!3d40.790162!4d29.44326!16s%2Fg%2F11g8b65wl1?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D",
    }
];

const kategoriler = [
    { etiket: "🏛️ Birimler", deger: "Birimler" },
    { etiket: "🏫 Bilim Sanat Merkezleri", deger: "Bilim Sanat Merkezleri" },
    { etiket: "🏢 Sosyal Tesisler", deger: "Sosyal Tesisler" },
    { etiket: "📖 Eğitim", deger: "Eğitim" },
    { etiket: "🗨️ Diğer", deger: "Diğer" },
];

export default function HizmetNoktalari() {
    const [seciliKategori, setSeciliKategori] = useState("Birimler");
    const [tiklananId, setTiklananId] = useState<number | null>(null);

    const filtrelenmisNoktalar = hizmetNoktalari.filter(
        (nokta) => nokta.kategori === seciliKategori
    );

    return (
        <div className="p-4 md:p-10 max-w-screen-xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center text-black">
                Hizmet Noktalarımız
            </h1>

            {/* Kategoriler Sekmesi */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
                {kategoriler.map((kategori) => (
                    <button
                        key={kategori.deger}
                        onClick={() => {
                            setSeciliKategori(kategori.deger);
                            setTiklananId(null);
                        }}
                        className={`px-5 py-2 rounded-full text-sm font-semibold shadow-lg transition-all duration-00 ${
                            seciliKategori === kategori.deger
                                ? "bg-orange-600 text-black"
                                : "bg-blue-900 text-white hover:bg-blue-300"
                        }`}
                    >
                        {kategori.etiket}
                    </button>
                ))}
            </div>

            {/* Hizmet Noktaları Listesi */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={seciliKategori}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {filtrelenmisNoktalar.map((nokta) => {
                        const [emoji, ...baslikKelimeleri] = nokta.ad.trim().split(" ");
                        const baslik = baslikKelimeleri.join(" ");

                        return (
                            <div
                                key={nokta.id}
                                className="flex flex-col justify-between h-full border rounded-2xl p-4 shadow-md hover:shadow-lg transition-all bg-gray-100 items-center text-center"
                            >
                                <div>
                                    <div className="text-4xl mb-2">{emoji}</div>
                                    <h2 className="text-base font-semibold mb-2 text-gray-800">{baslik}</h2>
                                    <p className="text-sm text-gray-600 mb-5">{nokta.adres}</p>
                                </div>

                                {tiklananId === nokta.id ? (
                                    <div className="mt-auto inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-green-700 text-white transition-colors">
                                        <MapPin className="w-4 h-4" />
                                        Yönlendiriliyor...
                                    </div>
                                ) : (
                                    <a
                                        href={nokta.konumUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => setTiklananId(nokta.id)}
                                        className="mt-auto inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-lg bg-purple-700 text-white hover:bg-green-600 transition-colors"
                                    >
                                        <MapPin className="w-4 h-4" />
                                        Konuma Git
                                    </a>
                                )}
                            </div>
                        );
                    })}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
