import { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";

interface Document {
    name: string;
    url: string;
}

interface DocumentCategory {
    department: string;
    docs: Document[];
}

interface ApiRapor {
    id: number;
    baslik: string;
    dosyaUrl: string;
    tarih: string;
    aktif: number;
    kategori: string;
}

// Kategoriler ile API kategori eşleşmesi
const categoryMap: { [key: string]: string } = {
    "Strateji Plan": "strateji_plan",
    "Faaliyet Raporu": "faaliyet_raporu",
    "Performans Programı": "performans_programi",
    "İç Kontrol Eylem Planı": "ic_kontrol_eylem_plani",
    "Mali Durum ve Beklentiler Raporu": "mali_durum_beklentiler"
};

const initialDocuments: DocumentCategory[] = [
    { department: "Strateji Plan", docs: [] },
    { department: "Faaliyet Raporu", docs: [] },
    { department: "Performans Programı", docs: [] },
    { department: "İç Kontrol Eylem Planı", docs: [] },
    { department: "Mali Durum ve Beklentiler Raporu", docs: [] },
];

const KurumsalRaporlar = () => {
    const [activeTab, setActiveTab] = useState<string>(initialDocuments[0].department);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [categories, setCategories] = useState<DocumentCategory[]>(initialDocuments);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const tabVariants = {
        hidden: { y: -20, opacity: 0 },
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                delay: i * 0.1
            }
        })
    };

    useEffect(() => {
        // Her kategori için API'den veri çek
        const fetchAll = async () => {
            const newCategories: DocumentCategory[] = [];
            for (const [department, kategori] of Object.entries(categoryMap)) {
                try {
                    const res = await fetch(
                        `http://localhost:8080/api/kurumsal/kurumsal-raporlar?kategori=${encodeURIComponent(kategori)}`
                    );
                    const data: ApiRapor[] = await res.json();
                    newCategories.push({
                        department,
                        docs: (data || []).map((item) => ({
                            name: item.baslik,
                            url: item.dosyaUrl
                        }))
                    });
                } catch {
                    newCategories.push({
                        department,
                        docs: []
                    });
                }
            }
            setCategories(newCategories);
            setLoaded(true);
        };
        fetchAll();
    }, []);

    const handleTabChange = (newTab: string) => {
        if (newTab !== activeTab) {
            setLoaded(false);
            setTimeout(() => {
                setActiveTab(newTab);
                setTimeout(() => {
                    setLoaded(true);
                }, 50);
            }, 300);
        }
    };

    const displayedDocs = categories.find((cat) => cat.department === activeTab)?.docs || [];

    return (
        <div className="bg-gray-50 min-h-screen py-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-7xl mx-auto p-5 mt-[-30px]"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className="relative bg-white border border-gray-300 rounded-3xl shadow-xl p-6"
                >
                    <div className="w-full text-center">
                        <motion.h1
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-3xl md:text-3xl text-white font-bold bg-red-900 border-2 border-gray-300 inline-block px-3 py-2 md:px-4 md:py-3 mt-0 rounded-full md:rounded-full"
                        >
                            KURUMSAL RAPORLAR
                        </motion.h1>

                        {/* Tab Navigation Buttons with Animation */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            className="flex flex-wrap justify-center mt-4"
                        >
                            {categories.map((category, index) => (
                                <motion.button
                                    key={category.department}
                                    custom={index}
                                    variants={tabVariants}
                                    onClick={() => handleTabChange(category.department)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`m-1 px-3 py-2 text-sm md:text-base font-semibold border-2 rounded-full transition-all duration-300 ease-in-out ${
                                        activeTab === category.department
                                            ? "bg-blue-900 text-white border-blue-900 shadow-md"
                                            : "bg-white text-black border-gray-300 hover:bg-blue-50"
                                    }`}
                                    style={{ minWidth: "150px" }}
                                >
                                    {category.department}
                                </motion.button>
                            ))}
                        </motion.div><br/>

                        {/* Documents Grid with Animation */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate={loaded ? "visible" : "hidden"}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8"
                        >
                            {displayedDocs.length === 0 ? (
                                <div className="text-center text-gray-500 py-8 col-span-full">Kayıt bulunamadı.</div>
                            ) : (
                                displayedDocs.map((doc, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        whileHover={{
                                            scale: 1.05,
                                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                                        }}
                                        className="bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-all duration-300 p-6 flex flex-col items-center text-center h-full"
                                    >
                                        <motion.div
                                            whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                                            transition={{ duration: 0.5 }}
                                            className="flex-grow flex items-center justify-center"
                                        >
                                            <FileText className="text-orange-500 mb-2" size={60} />
                                        </motion.div>

                                        <a
                                            href={doc.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-700 font-semibold hover:underline mt-2 text-sm md:text-base"
                                        >
                                            {doc.name}
                                        </a>
                                    </motion.div>
                                ))
                            )}
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default KurumsalRaporlar;