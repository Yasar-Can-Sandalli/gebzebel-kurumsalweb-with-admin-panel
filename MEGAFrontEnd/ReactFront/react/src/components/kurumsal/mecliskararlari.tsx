import { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Meclis Kararı verileri için interface
interface MeclisKarari {
    id: number;
    baslik: string;
    dosyaUrl: string;
    tarih: string;
    aktif: number;
    kategori: string;
}

const Kararlar = () => {
    const [activeTab, setActiveTab] = useState<string>("meclis");
    const [isChanging, setIsChanging] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [meclisKararlari, setMeclisKararlari] = useState<MeclisKarari[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Container animation variants for staggered animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.2
            }
        }
    };

    // Item animation variants
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        fetch("http://localhost:8080/api/kurumsal/meclis-kararlari")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setMeclisKararlari(data);
                setIsLoading(false);
                setLoaded(true);
            })
            .catch((error) => {
                setError("Meclis kararları yüklenirken hata oluştu.");
                setIsLoading(false);
                setLoaded(true);
            });
    }, []);

    const handleTabChange = (tab: string) => {
        if (tab !== activeTab && !isChanging) {
            setIsChanging(true);
            setLoaded(false);
            setTimeout(() => {
                setActiveTab(tab);
                setTimeout(() => {
                    setIsChanging(false);
                    setLoaded(true);
                }, 50);
            }, 300);
        }
    };

    // Tarih formatını düzenlemek için yardımcı fonksiyon
    const formatTarih = (tarihStr: string) => {
        const tarih = new Date(tarihStr);
        return new Intl.DateTimeFormat('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(tarih);
    };

    if (error) return (
        <div className="flex justify-content-center align-items-center min-h-screen p-4 bg-light">
            <div className="w-full max-w-2xl bg-white border-left border-danger rounded shadow-lg overflow-hidden">
                <div className="p-4">
                    <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-8 w-8 text-danger" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h2 className="text-lg font-weight-bold text-dark">Hata</h2>
                            <p className="text-secondary">{error}</p>
                            <button
                                className="mt-3 px-4 py-2 bg-danger text-white rounded hover:bg-danger"
                                onClick={() => window.location.reload()}
                            >
                                Yeniden Dene
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    if (isLoading) return (
        <div className="w-full mx-auto my-4 px-4">
            <div className="bg-white rounded shadow-lg overflow-hidden p-4">
                <div className="animate-pulse">
                    <div className="h-8 bg-secondary rounded w-1/4 mb-6"></div>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="h-20 bg-secondary rounded"></div>
                                <div className="h-20 bg-secondary rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            id="pcoded"
            className="pcoded w-full"
            style={{ minHeight: '100vh' }}
        >
            <div className="pcoded-overlay-box"></div>
            <div className="pcoded-container navbar-wrapper w-full">
                <div className="pcoded-main-container-left w-full">
                    <div className="pcoded-wrapper w-full">
                        <div className="pcoded-content w-full">
                            <div className="pcoded-inner-content w-full">
                                <div className="main-body w-full">
                                    <div className="page-wrapper w-full">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                            className="w-full mt-[-21px] p-2 md:p-6"
                                        >
                                            {/* Ana İçerik Alanı - Tam Genişlik */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                                                className="w-full"
                                            >
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.98 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.5 }}
                                                    className="bg-white shadow rounded-2xl p-5 w-full"
                                                >

                                                    {/* Sekmeler */}
                                                    <div className="flex border-b mb-4 overflow-x-auto">
                                                        <motion.button
                                                            initial={{ y: -10, opacity: 0 }}
                                                            animate={{ y: 0, opacity: 1 }}
                                                            transition={{ duration: 0.4, delay: 0.3 }}
                                                            whileHover={{
                                                                scale: 1.05,
                                                                backgroundColor: activeTab === "meclis" ? undefined : "rgba(239, 246, 255, 0.8)"
                                                            }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => handleTabChange("meclis")}
                                                            className={`whitespace-nowrap px-6 py-3 font-bold text-sm md:text-base
                                                                transition-all duration-300 ease-in-out rounded-t-xl
                                                                ${activeTab === "meclis"
                                                                ? "border-b-2 border-blue-600 text-blue-600 shadow-sm"
                                                                : "text-gray-500"
                                                            }`}
                                                        >
                                                            Meclis Kararları
                                                        </motion.button>
                                                        <motion.button
                                                            initial={{ y: -10, opacity: 0 }}
                                                            animate={{ y: 0, opacity: 1 }}
                                                            transition={{ duration: 0.4, delay: 0.4 }}
                                                            whileHover={{
                                                                scale: 1.05,
                                                                backgroundColor: activeTab === "encumen" ? undefined : "rgba(239, 246, 255, 0.8)"
                                                            }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => handleTabChange("encumen")}
                                                            className={`whitespace-nowrap ml-4 px-6 py-3 font-bold text-sm md:text-base
                                                                transition-all duration-300 ease-in-out rounded-t-xl
                                                                ${activeTab === "encumen"
                                                                ? "border-b-2 border-blue-600 text-blue-600 shadow-sm"
                                                                : "text-gray-500"
                                                            }`}
                                                        >
                                                            Encümen Kararları
                                                        </motion.button>
                                                    </div>

                                                    {/* İçerik - Geliştirilmiş Animasyon */}
                                                    <AnimatePresence mode="wait">
                                                        {activeTab === "meclis" ? (
                                                            <motion.div
                                                                key="meclis"
                                                                variants={containerVariants}
                                                                initial="hidden"
                                                                animate={loaded ? "visible" : "hidden"}
                                                                exit={{ opacity: 0, y: -20 }}
                                                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mt-6"
                                                            >
                                                                {meclisKararlari.length > 0 ? (
                                                                    meclisKararlari.map((karar,) => (
                                                                        <motion.div
                                                                            key={karar.id}
                                                                            variants={itemVariants}
                                                                            whileHover={{
                                                                                scale: 1.05,
                                                                                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                                                                                backgroundColor: "rgba(219, 234, 254, 0.8)"
                                                                            }}
                                                                            className="bg-blue-50 p-4 rounded-xl transition-all duration-300
                                                                                flex flex-col items-center shadow-md border border-blue-100 h-full"
                                                                        >
                                                                            <motion.div
                                                                                whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1 }}
                                                                                transition={{ duration: 0.5 }}
                                                                                className="flex items-center justify-center mb-3"
                                                                            >
                                                                                <FileText className="text-red-500 w-16 h-16" />
                                                                            </motion.div>

                                                                            <a
                                                                                href={karar.dosyaUrl}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                className="text-blue-700 font-semibold text-center text-sm md:text-base break-words hover:underline mt-2"
                                                                            >
                                                                                {karar.baslik}
                                                                            </a>
                                                                            <div className="text-gray-600 text-sm mt-2">
                                                                                {formatTarih(karar.tarih)}
                                                                            </div>
                                                                        </motion.div>
                                                                    ))
                                                                ) : (
                                                                    <motion.div
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 0.2, duration: 0.5 }}
                                                                        className="col-span-full text-center p-8 bg-blue-50 rounded-xl shadow-sm"
                                                                    >
                                                                        <p className="text-blue-700 font-semibold">Veri bulunamadı.</p>
                                                                    </motion.div>
                                                                )}
                                                            </motion.div>
                                                        ) : (
                                                            <motion.div
                                                                key="encumen"
                                                                initial={{ opacity: 0, y: 20 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: -20 }}
                                                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                                                whileHover={{ scale: 1.01 }}
                                                                className="bg-yellow-100 p-6 rounded-xl text-gray-700 text-lg mt-6
                                                                    border border-yellow-200 shadow-md"
                                                            >
                                                                <motion.strong
                                                                    initial={{ opacity: 0 }}
                                                                    animate={{ opacity: 1 }}
                                                                    transition={{ delay: 0.2, duration: 0.5 }}
                                                                >
                                                                    Encümen Kararları 6698 Sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında kaldırılmıştır.
                                                                </motion.strong>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </motion.div>
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Kararlar;