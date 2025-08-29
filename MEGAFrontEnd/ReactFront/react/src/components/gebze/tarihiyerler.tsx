import React from "react";
import { Info, MapPin } from "lucide-react";

const GalleryTest: React.FC = () => {
    // Create a function to generate the correct URL format based on the title
    const getDetailPageUrl = (title: string): string => {
        // Convert title to lowercase and remove special characters
        const formattedTitle = title
            .toLowerCase()
            .replace(/ı/g, "i")
            .replace(/ö/g, "o")
            .replace(/ü/g, "u")
            .replace(/ç/g, "c")
            .replace(/ş/g, "s")
            .replace(/ğ/g, "g")
            .replace(/İ/g, "i")
            .replace(/\s+/g, "")
            .replace(/[^\w\s]/gi, "");

        return `/gebze/tarihiyerler/${formattedTitle}`;
    };

    const historicalSites = [
        { img: "/images/gebze/tarihiyerler/anibal/1.JPG", title: "ANİBALIN MEZARI", mapLink: "https://www.google.com/maps/place/Hannibalin+Mezar%C4%B1/@40.782282,29.4395192,17z/data=!3m1!4b1!4m5!3m4!1s0x14cb2042af222be3:0xd11c044aa3d2711!8m2!3d40.782282!4d29.4417079?shorturl=1" },
        { img: "/images/gebze/tarihiyerler/ballikayalar/2.jpg", title: "BALLIKAYALAR", mapLink:"https://www.google.com/maps/place/Ball%C4%B1+Kayalar+Tabiat+Park%C4%B1/@40.8299347,29.515808,15.25z/data=!4m5!3m4!1s0x14cb242bfea49fbf:0x8a949c7858da831d!8m2!3d40.8330952!4d29.516802?shorturl=1" },
        { img: "/images/gebze/tarihiyerler/külliye/3.JPG", title: "ÇOBAN MUSTAFA PAŞA KÜLLİYESİ", mapLink:"https://www.google.com/maps/place/%C3%87oban+Mustafa+Pa%C5%9Fa+K%C3%BClliyesi/@40.799884,29.432153,15z/data=!4m5!3m4!1s0x0:0x1ab84b48f6e54236!8m2!3d40.799884!4d29.432153?shorturl=1"},
        { img: "/images/gebze/tarihiyerler/hamam/4.JPG", title: "ÇOBAN MUSTAFA PAŞA HAMAMI", mapLink:"https://www.google.com/maps/place/Tarihi+%C3%87ar%C5%9F%C4%B1+Hamam%C4%B1/@40.7992254,29.4309593,17z/data=!4m5!3m4!1s0x14cb20894af6630f:0xda82440ad30b8594!8m2!3d40.7985669!4d29.4341429?shorturl=1"},
        { img: "/images/gebze/tarihiyerler/sadirvan/5.JPG", title: "ÇOBAN MUSTAFA PAŞA ŞADIRVANI", mapLink:"https://www.google.com/maps/place/%C3%87oban+Mustafa+Pa%C5%9Fa+K%C3%BClliyesi/@40.798862,29.4298284,17z/data=!4m5!3m4!1s0x14cb208f33d5f6db:0x1ab84b48f6e54236!8m2!3d40.799884!4d29.432153?shorturl=1"},
        { img: "/images/gebze/tarihiyerler/eskihisarcesme/6.jpg", title: "ESKİHİSAR ÇEŞMESİ", mapLink:"https://www.google.com/maps/place/Eskihisar+%C3%87e%C5%9Fmesi/@40.769591,29.4252723,17z/data=!3m1!4b1!4m5!3m4!1s0x14cb200fbb67de7d:0x8c7064d245464b3d!8m2!3d40.769591!4d29.427461?shorturl=1"},
        { img: "/images/gebze/tarihiyerler/kale/7.JPG", title: "ESKİHİSAR KALESİ", mapLink:"https://www.google.com/maps/place/Eskihisar,+Eskihisar+Kalesi,+41400+Gebze%2FKocaeli/@40.7720176,29.4293137,17z/data=!3m1!4b1!4m5!3m4!1s0x14cb2012246f1bdf:0x210fd52d96efc378!8m2!3d40.7720176!4d29.4315024?shorturl=1"},
        { img: "/images/gebze/tarihiyerler/hünkar/8.JPG", title: "HÜNKAR ÇAYIRI",  mapLink:"https://www.google.com/maps/place/H%C3%BCnkar+%C3%87ay%C4%B1r%C4%B1/@40.813967,29.3409963,17z/data=!3m1!4b1!4m5!3m4!1s0x14cade66bb4b566f:0x563611efabd51aa!8m2!3d40.813967!4d29.343185?shorturl=1" },
        { img: "/images/gebze/tarihiyerler/ibrahimpasacamii/2.JPG", title: "İBRAHİM PAŞA ÇEŞMESİ", mapLink:"https://www.google.com/maps/place/%C4%B0brahim+Pa%C5%9Fa+%C3%87e%C5%9Fmesi+(Eski+%C3%87ar%C5%9F%C4%B1+%C3%87e%C5%9Fmesi)/@40.7983983,29.4316467,17z/data=!3m1!4b1!4m5!3m4!1s0x14cb2159ac7bdb4d:0x1128fdc4b678c96d!8m2!3d40.7983983!4d29.4338354?shorturl=1"},
        { img: "/images/gebze/tarihiyerler/ilyasbeycamii/9.JPG", title: "İLYAS BEY CAMİİ", mapLink:"https://www.google.com/maps/place/%C4%B0lyas+Bey+Cami/@40.7995368,29.4381119,17z/data=!3m1!4b1!4m5!3m4!1s0x14cb208d2614d9ef:0x648c4ebb83eead8a!8m2!3d40.7995368!4d29.4403006?shorturl=1"},
        { img: "/images/gebze/tarihiyerler/yalı/11.JPG", title: "OSMAN HAMDİ BEY YALISI", mapLink:"https://www.google.com/maps/place/Osman+Hamdi+Bey+Evi+ve+M%C3%BCzesi/@40.769348,29.4245433,17z/data=!3m1!4b1!4m5!3m4!1s0x14cb200fa27728bf:0xb8320b5bebc2a90a!8m2!3d40.769348!4d29.426732?shorturl=1"},
        { img: "/images/gebze/tarihiyerler/sultanorhancami/12.jpg", title: "SULTAN ORHAN CAMİİ", mapLink:"https://www.google.com/maps/place/Sultan+Orhan+Cami/@40.798083,29.4355794,17z/data=!3m1!4b1!4m5!3m4!1s0x14cb208c7bb7f3d5:0x805bf82146b0c733!8m2!3d40.798079!4d29.4377681?shorturl=1"}
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto px-5">
                <div className="bg-red-900 shadow-lg rounded-4xl p-3 mb-4 mt-2 text-center">
                    <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold text-white">
                        GEBZE TARİHİ YERLER
                    </h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                    {historicalSites.map((item, index) => (
                        <div
                            key={index}
                            className="relative rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl group w-full max-w-sm"
                        >
                            <div className="w-full h-48 overflow-hidden flex items-center justify-center">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                                <h2 className="text-white text-base font-semibold truncate">&nbsp;&nbsp;{item.title}</h2>
                                <div className="flex space-x-2 mt-1">
                                    <a
                                        href={getDetailPageUrl(item.title)}
                                        className="flex items-center text-white text-xs px-2 py-1 rounded-md hover:text-gray-200 transition-colors"
                                    >
                                        <Info className="w-4 h-4 mr-1" />
                                        Detaylı Bilgi
                                    </a>
                                    <a
                                        href={item.mapLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-white text-xs px-2 py-1 rounded-md hover:text-gray-200 transition-colors"
                                    >
                                        <MapPin className="w-4 h-4 mr-1" />
                                        Konum
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div><br/><br/>
        </div>
    );
};

export default GalleryTest;