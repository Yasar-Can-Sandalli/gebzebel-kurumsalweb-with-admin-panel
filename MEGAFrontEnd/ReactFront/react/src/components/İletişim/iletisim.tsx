import ContactForm from "../ContactForm";

const Contact = () => {
    return (
        <section className="bg-gray-50 py-16 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Harita */}
                <div className="rounded-3xl overflow-hidden shadow-md mb-16 mt-5">
                    <iframe
                        title="Gebze Belediyesi Konumu"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3059.226391275682!2d29.42791271543129!3d40.8027099793214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cacf2f7a4eae67%3A0x7e5dff07e8f4b8a5!2sGebze%20Belediyesi!5e0!3m2!1str!2str!4v1618845434469!5m2!1str!2str"
                        width="100%"
                        height="700"
                        allowFullScreen
                        loading="lazy"
                        className="w-full h-full"
                        style={{height: "5" +
                                "00px"}}
                    ></iframe>
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 relative">
                    <span className="bg-gray-50 px-4 relative z-10">İletişim Bilgilerimiz</span>
                    <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-300 -z-0"></div>
                </h2>
                {/* İletişim Bilgileri - 3'lü grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {[
                        {
                            icon: "📍",
                            title: "Adres",
                            text: "Güzeller Mah. Bahar Cad. No:1 Gebze/Kocaeli"
                        },
                        {
                            icon: "📞",
                            title: "Telefon",
                            text: "0262 642 04 30"
                        },
                        {
                            icon: "📠",
                            title: "Faks",
                            text: "0262 642 04 31"
                        },
                        {
                            icon: "✉️",
                            title: "E-posta",
                            text: "gebze@gebze.bel.tr"
                        },
                        {
                            icon: "📧",
                            title: "E-posta (KEP)",
                            text: "gebzebelediyesi@hs01.kep.tr"
                        },
                        {
                            icon: "🏛️",
                            title: "Hizmet Noktalarımız",
                            isRedirect: true,
                            link: "/hizmet-noktalari"
                        }
                    ].map((item, index) => {
                        const isLink = item.isRedirect;
                        const handleClick = () => {
                            if (isLink && item.link) {
                                window.location.href = item.link;
                            }
                        };
                        return (
                            <div
                                key={index}
                                onClick={handleClick}
                                className={`bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex flex-col items-center text-center justify-center cursor-${isLink ? "pointer" : "default"} transform hover:-translate-y-1`}
                            >
                                <div className="text-4xl mb-3">{item.icon}</div>
                                <h4 className="text-xl font-semibold text-gray-800 mb-1">{item.title}</h4>
                                {!isLink && (
                                    <p className="text-gray-600 text-sm max-w-[220px]">
                                        {item.text}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Sosyal Medya Hesapları - 5'li yatay düzen */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 relative">
                        <span className="bg-gray-50 px-4 relative z-10">Sosyal Medya Hesaplarımız</span>
                        <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-300 -z-0"></div>
                    </h2>

                    <div className="grid grid-cols-5 sm:grid-cols-5 gap-4">
                        {[
                            {
                                platform: "Facebook",
                                icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png",
                                url: "https://www.facebook.com/gebzebelediye",
                                color: "bg-blue-50",
                                borderColor: "border-blue-300"
                            },
                            {
                                platform: "Twitter",
                                icon: "https://images.freeimages.com/image/large-previews/f35/x-twitter-logo-on-black-circle-5694247.png?fmt=webp&h=350",
                                url: "https://x.com/gebze_belediye",
                                color: "bg-blue-50",
                                borderColor: "border-blue-300"
                            },
                            {
                                platform: "Instagram",
                                icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/800px-Instagram_icon.png",
                                url: "https://www.instagram.com/gebze_belediyesi/#",
                                color: "bg-pink-50",
                                borderColor: "border-pink-300"
                            },
                            {
                                platform: "Whatsapp",
                                icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/768px-WhatsApp.svg.png?20220228223904",
                                url: "https://api.whatsapp.com/send?phone=902626420430",
                                color: "bg-green-50",
                                borderColor: "border-green-300"
                            },
                            {
                                platform: "Youtube",
                                icon: "https://cdn.iconscout.com/icon/free/png-512/free-youtube-icon-download-in-svg-png-gif-file-formats--logo-social-media-icons-color-pack-logos-432560.png?f=webp&w=512",
                                url: "https://www.youtube.com/channel/UCj2OaUgzp76dOS2jTlz2frg",
                                color: "bg-red-50",
                                borderColor: "border-red-300"
                            }
                        ].map((social, index) => (
                            <a
                                key={index}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className={`${social.color} border ${social.borderColor} rounded-lg shadow-sm p-3 flex flex-col items-center justify-center text-center h-24 transition-all duration-300 hover:shadow-md hover:-translate-y-1 transform`}>
                                    <img
                                        src={social.icon}
                                        alt={social.platform}
                                        className="w-10 h-10 mb-2"
                                    />
                                    <span className="font-medium text-gray-700 text-sm">{social.platform}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* İletişim Formu */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 relative">
                        <span className="bg-gray-50 px-4 relative z-10">Bize Ulaşın</span>
                        <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-300 -z-0"></div>
                    </h2>
                    <ContactForm />
                </div>
            </div>
        </section>
    );
};

export default Contact;