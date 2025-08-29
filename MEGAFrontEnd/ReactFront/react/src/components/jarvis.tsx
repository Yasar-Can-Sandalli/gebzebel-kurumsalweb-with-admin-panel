import { useState, useEffect, useRef } from "react";
import { X, Send, } from "lucide-react";

// Sıkı tip tanımlamaları için literal tipleri kullanalım
type ChatRole = "user" | "assistant";

type ChatMessage = {
    role: ChatRole;
    message: string;
};

const GUZIDE = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
        { role: "assistant", message: "Merhaba! Ben GÜZİDE, size nasıl yardımcı olabilirim?" }
    ]);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Kaydırma işlevini otomatik olarak en aşağıya yapan fonksiyon
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Chat geçmişi güncellendiğinde otomatik kaydırma
    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    // Modal açıldığında input alanına odaklanma
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [isOpen]);

    // HuggingFace API'ye bağlanarak yanıt alacak fonksiyon
    const getAIResponse = async (userMessage: string): Promise<string> => {
        try {
            // HuggingFace Inference API'sine istek gönderilecek
            // Bu örnek için, HuggingFace üzerinden ücretsiz kullanılabilecek bir Türkçe dil modeli kullanıyoruz
            const response = await fetch(
                "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        // HuggingFace'ten ücretsiz bir API token almanız gerekecek
                        Authorization: "Bearer hf_token_buraya_gelecek",
                    },
                    body: JSON.stringify({ inputs: userMessage }),
                }
            );

            if (!response.ok) {
                throw new Error("API yanıt vermedi");
            }

            const data = await response.json();
            // API yanıtı modele göre değişebilir
            return data.generated_text || "Üzgünüm, şu anda cevap veremiyorum.";
        } catch (error) {
            console.error("API hatası:", error);

            // API hatası durumunda basit yanıtlar verecek yedek fonksiyon
            return getFallbackResponse(userMessage);
        }
    };

    // API yanıt vermezse kullanılacak yedek yanıt fonksiyonu
    const getFallbackResponse = (userMessage: string): string => {
        const lowerCaseMsg = userMessage.toLowerCase();

        // Tarih ve zaman sorguları
        if (lowerCaseMsg.includes("saat") || lowerCaseMsg.includes("zaman")) {
            const now = new Date();
            return `Şu anki saat: ${now.toLocaleTimeString()}`;
        }

        // Tarih sorguları
        if (lowerCaseMsg.includes("tarih") || lowerCaseMsg.includes("bugün günlerden ne")) {
            const now = new Date();
            return `Bugünün tarihi: ${now.toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`;
        }

        // Selamlaşma yanıtları
        if (lowerCaseMsg.includes("merhaba") || lowerCaseMsg.includes("selam") || lowerCaseMsg.includes("hey")) {
            return "Merhaba! Size nasıl yardımcı olabilirim?";
        }

        // Teşekkür yanıtları
        if (lowerCaseMsg.includes("teşekkür") || lowerCaseMsg.includes("sağol")) {
            return "Rica ederim! Başka bir konuda yardımcı olabilir miyim?";
        }

        // Yardım kategorileri
        if (lowerCaseMsg.includes("talep") || lowerCaseMsg.includes("istek")) {
            return "Yeni bir talep oluşturmak için size yardımcı olabilirim. Lütfen talep türünü ve detaylarını belirtir misiniz?";
        }

        if (lowerCaseMsg.includes("yardım")) {
            return "Size hangi konuda yardımcı olabilirim? Talep oluşturma, iletişim bilgileri, kütüphane rezervasyonu veya başka bir konuda bilgi almak isterseniz sorabilirsiniz.";
        }

        if (lowerCaseMsg.includes("iletişim")) {
            return "İletişim bilgilerimiz: \nTelefon: +90 212 123 45 67\nE-posta: info@sirket.com\nAdres: Merkez Mahallesi, Atatürk Caddesi No:123, İstanbul";
        }

        if (lowerCaseMsg.includes("eczane") || lowerCaseMsg.includes("nöbetçi")) {
            return "Nöbetçi eczane bilgisi için bulunduğunuz ilçeyi belirtmeniz gerekiyor. Hangi ilçedeki nöbetçi eczaneleri öğrenmek istiyorsunuz?";
        }

        // Nasılsın tarzı sorular
        if (lowerCaseMsg.includes("nasılsın") || lowerCaseMsg.includes("ne haber")) {
            return "Ben çok iyiyim, teşekkür ederim! Size nasıl yardımcı olabilirim?";
        }

        // Kimsin sorusu
        if (lowerCaseMsg.includes("kimsin") || lowerCaseMsg.includes("adın ne")) {
            return "Ben GÜZİDE, size yardımcı olmak için tasarlanmış bir dijital asistanım. Her türlü sorunuza yanıt vermeye hazırım!";
        }

        // Varsayılan yanıt
        return "Anladım. Size daha iyi yardımcı olabilmem için biraz daha detay verebilir misiniz?";
    };

    // Kullanıcı mesajını gönderme fonksiyonu
    const handleSendMessage = async () => {
        if (userInput.trim() === "") return;

        // Kullanıcı mesajını ekle
        const newUserMessage: ChatMessage = {
            role: "user",
            message: userInput
        };

        setChatHistory((prev) => [...prev, newUserMessage]);
        setUserInput("");

        // Asistan yazıyor efekti
        setIsTyping(true);

        try {
            // Yapay zeka API'sinden yanıt al
            const aiResponse = await getAIResponse(userInput);

            // Asistan yanıtını ekle
            const newAssistantMessage: ChatMessage = {
                role: "assistant",
                message: aiResponse
            };

            setChatHistory((prev) => [...prev, newAssistantMessage]);
        } catch (error) {
            console.error("Yanıt alınamadı:", error);

            // Hata durumunda kullanıcıya bilgi ver
            const errorMessage: ChatMessage = {
                role: "assistant",
                message: "Üzgünüm, şu anda yanıt veremiyorum. Lütfen daha sonra tekrar deneyin."
            };

            setChatHistory((prev) => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    // Klavye olayını dinleyelim
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // Hızlı yanıt seçenekleri
    const quickReplies = [
        "Merhaba",
        "Yardım",
        "İletişim",
        "Teşekkürler"
    ];

    return (
        <>
            {/* Yardımcı Buton - Kompakt boyut */}
            <div className="fixed bottom-4 right-4  z-50">
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition transform hover:scale-105 flex items-center justify-center"
                >
                    <span className="text-lg">🤖</span>
                </button>
            </div>

            {/* Modal - Kompakt boyut */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end px-4 pb-4">

                {/* Arkaplan overlay */}
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

                    {/* Sağ tarafta açılan panel - Kompakt boyut */}
                    <div
                        className="relative w-full sm:w-80 md:w-96 max-h-96 sm:max-h-[500px] flex flex-col bg-white shadow-2xl transition-all duration-300 animate-in fade-in overflow-hidden rounded-t-xl sm:rounded-xl"
                        style={{
                            animation: "slideInFromBottom 0.3s ease-out",
                        }}
                    >
                        {/* Header - Kompakt */}
                        <div className="flex justify-between items-center p-3 border-b bg-blue-600 text-white rounded-t-xl">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">🤖</span>
                                <div>
                                    <h3 className="font-medium text-sm">GÜZİDE Asistan</h3>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-blue-500 transition">
                                <X className="w-4 h-4 text-white" />
                            </button>
                        </div>

                        {/* Chat History - Kompakt boyut */}
                        <div className="flex-1 p-3 overflow-y-auto bg-gray-50" style={{ maxHeight: "300px" }}>
                            {chatHistory.map((chat, index) => (
                                <div
                                    key={index}
                                    className={`mb-2 flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    {chat.role === "assistant" && (
                                        <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center mr-1 flex-shrink-0 shadow-md text-xs">
                                            🤖
                                        </div>
                                    )}

                                    <div
                                        className={`max-w-xs px-3 py-2 rounded-lg text-xs ${
                                            chat.role === "user"
                                                ? "bg-blue-600 text-white rounded-tr-none shadow-md"
                                                : "bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm"
                                        }`}
                                    >
                                        {chat.message}
                                    </div>

                                    {chat.role === "user" && (
                                        <div className="w-6 h-6 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center ml-1 flex-shrink-0 shadow-md text-xs">
                                            👤
                                        </div>
                                    )}
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start mb-2">
                                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center mr-1 flex-shrink-0 shadow-md text-xs">
                                        🤖
                                    </div>
                                    <div className="bg-black text-gray-800 border border-gray-200 px-3 py-2 rounded-lg rounded-tl-none shadow-sm">
                                        <div className="flex space-x-1">
                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "200ms" }}></div>
                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "400ms" }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Replies - Kompakt boyut */}
                        <div className="p-2 border-t bg-gray-50 overflow-x-auto">
                            <div className="flex gap-1">
                                {quickReplies.map((reply, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setUserInput(reply);
                                            setTimeout(() => {
                                                inputRef.current?.focus();
                                            }, 10);
                                        }}
                                        className="whitespace-nowrap px-2 py-1 bg-white text-gray-600 text-xs border border-gray-200 rounded-full hover:bg-gray-100 transition shadow-sm"
                                    >
                                        {reply}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Input Area - Kompakt boyut */}
                        <div className="p-2 border-t bg-white">
                            <div className="flex items-center">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Mesajınızı yazın..."
                                    className="flex-1 p-2 text-xs border rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!userInput.trim()}
                                    className="bg-blue-600 text-black p-2 ml-1 rounded-full disabled:opacity-50 hover:bg-blue-700 transition flex items-center justify-center"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Footer - Kompakt boyut */}
                        <div className="p-1 border-t bg-gray-50 text-center">
                            <p className="text-xs text-gray-500">
                                GÜZİDE v1.0 | Ücretsiz AI
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* CSS Animation - Aşağıdan yukarı gelme efekti için */}
            <style>{`
                @keyframes slideInFromBottom {
                    0% {
                        transform: translateY(100%);
                    }
                    100% {
                        transform: translateY(0);
                    }
                }
                
                @keyframes slideInFromRight {
                    0% {
                        transform: translateX(100%);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }
                
                @media (min-width: 640px) {
                    .slide-in-modal {
                        animation: slideInFromRight 0.3s ease-out;
                    }
                }
                
                @media (max-width: 639px) {
                    .slide-in-modal {
                        animation: slideInFromBottom 0.3s ease-out;
                    }
                }
            `}</style>
        </>
    );
};

export default GUZIDE;