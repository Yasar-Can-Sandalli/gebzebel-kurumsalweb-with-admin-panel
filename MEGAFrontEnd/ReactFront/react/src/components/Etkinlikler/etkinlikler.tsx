import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface NewsCardProps {
    image: string;
    category: string;
    title: string;
    author?: {
        name: string;
        image: string;
    };
    date?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
                                               image,
                                               category,
                                               title,
                                               author,
                                               date,
                                           }) => {
    return (
        <div className="bg-white border-l-4 border-indigo-600 p-2 rounded-lg shadow-md hover:shadow-blue-700/60 hover:scale-105 transition-transform duration-300 flex items-center gap-2 min-w-0 w-full">
            <img
                src={image}
                alt={title}
                className="w-32 h-19 rounded-md object-cover flex-shrink-0"
            />
            <p className="text-sm text-indigo-800 font-medium">{title}</p>
        </div>
    );
};

const NewsCardRight: React.FC<NewsCardProps> = ({
                                                    image,
                                                    category,
                                                    title,
                                                    author,
                                                    date,
                                                }) => {
    return (
        <div className="bg-white border-r-4 border-indigo-600 p-2 rounded-lg shadow-md hover:shadow-indigo-800/60 hover:scale-105 transition-transform duration-300 flex items-center justify-between gap-2 min-w-0 w-full">
            <p className="text-sm text-indigo-800 font-medium">{title}</p>
            <img
                src={image}
                alt={title}
                className="w-32 h-19 rounded-md object-cover flex-shrink-0"
            />
        </div>
    );
};

const monthNamesTR = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];

const EventCalendar: React.FC<{
    events: { date: string; title: string; imageUrl: string; description: string }[];
}> = ({ events }) => {
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    // Takvimde gösterilecek ayı ve yılı state olarak tut
    const [calendarYear, setCalendarYear] = useState(year);
    const [calendarMonth, setCalendarMonth] = useState(month);

    // Seçili ay ve yıl için gün sayısı
    const calendarDaysInMonth = new Date(calendarYear, calendarMonth, 0).getDate();

    // Oracle'dan gelen tarih formatı: YYYY-MM-DDTHH:mm:ss.sssZ veya YYYY-MM-DD
    // Chrome'da tarih parse hatası olmaması için tarih stringini 'YYYY-MM-DD' formatında kullan
    const parseDbDate = (dateStr: string) => {
        // Sadece tarih kısmını al (ilk 10 karakter)
        const [y, m, d] = dateStr.substring(0, 10).split('-').map(Number);
        // new Date(y, m - 1, d) Chrome ve Edge için uyumlu
        return new Date(y, m - 1, d);
    };

    // Seçili ay ve yıl için etkinlikleri bul
    const hasEventOnDay = (day: number) => {
        return events.some((e) => {
            const eventDate = parseDbDate(e.date);
            return (
                eventDate.getFullYear() === calendarYear &&
                eventDate.getMonth() + 1 === calendarMonth &&
                eventDate.getDate() === day
            );
        });
    };

    // Seçili gün için etkinlikleri bul
    const eventsForSelectedDate = selectedDate
        ? events.filter((e) => {
            const eventDate = parseDbDate(e.date);
            const selected = parseDbDate(selectedDate);
            return (
                eventDate.getFullYear() === selected.getFullYear() &&
                eventDate.getMonth() === selected.getMonth() &&
                eventDate.getDate() === selected.getDate()
            );
        })
        : [];

    const selectedEvent = eventsForSelectedDate[currentEventIndex];

    useEffect(() => {
        if (selectedDate) setCurrentEventIndex(0);
    }, [selectedDate]);

    const handlePrev = () => {
        setCurrentEventIndex((prev) =>
            prev === 0 ? eventsForSelectedDate.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentEventIndex((prev) =>
            (prev + 1) % eventsForSelectedDate.length
        );
    };

    const flexDirection = windowWidth >= 1024 ? "flex-row" : "flex-col";

    // Ayı ileri/geri al
    const handleMonthChange = (delta: number) => {
        let newMonth = calendarMonth + delta;
        let newYear = calendarYear;
        if (newMonth < 1) {
            newMonth = 12;
            newYear -= 1;
        } else if (newMonth > 12) {
            newMonth = 1;
            newYear += 1;
        }
        setCalendarMonth(newMonth);
        setCalendarYear(newYear);
    };

    return (
        <div className="w-full flex justify-center items-center px-2 sm:px-4">
            <div className="relative rounded-xl shadow-lg overflow-hidden w-full max-w-5xl bg-[#002850]">
                <div className={`relative flex ${flexDirection} justify-center items-stretch p-5 sm:p-4 md:p-6 gap-4 transition-all duration-500`}>

                    {/* TAKVİM */}
                    <div
                        className={`bg-white px-4 py-4 rounded-xl shadow-[0_4px_12px_rgba(0,40,80,0.2)] flex flex-col transition-all duration-500
    ${selectedEvent && windowWidth >= 1024 ? "w-[65%] min-w-[600px]" : "w-full"} 
    max-w-[900px] flex-1 lg:min-h-[400px]`}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <button
                                onClick={() => handleMonthChange(-1)}
                                className="text-[#002850] font-bold px-2 py-1 rounded hover:bg-gray-100"
                            >
                                {"<"}
                            </button>
                            <div className="text-lg sm:text-xl font-semibold text-white py-2 rounded-md bg-[#002850] text-center w-full mx-2">
                                📅 {monthNamesTR[calendarMonth - 1]} {calendarYear} Etkinlik Takvimi
                            </div>
                            <button
                                onClick={() => handleMonthChange(1)}
                                className="text-[#002850] font-bold px-2 py-1 rounded hover:bg-gray-100"
                            >
                                {">"}
                            </button>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-1 text-xs sm:text-sm text-center">
                            {[...Array(calendarDaysInMonth)].map((_, i) => {
                                const day = (i + 1).toString().padStart(2, "0");
                                const monthStr = calendarMonth.toString().padStart(2, "0");
                                const date = `${calendarYear}-${monthStr}-${day}`;
                                const hasEvent = hasEventOnDay(i + 1);

                                return (
                                    <button
                                        key={date}
                                        onClick={() => hasEvent && setSelectedDate(date)}
                                        className={`w-full h-[55px] sm:h-[60px] md:h-[55px] flex items-center justify-center rounded-md transition-all duration-300 ring-1 ring-inset
                  ${hasEvent
                                            ? "bg-orange-100 hover:bg-orange-200 text-orange-800 font-semibold border-b-2 border-orange-500 ring-orange-300"
                                            : "bg-gray-100 text-gray-400 cursor-default ring-gray-200"
                                        }`}
                                    >
                                        {day}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* DETAY */}
                    {selectedEvent && (
                        <div className={`bg-white p-4 rounded-xl shadow-[0_4px_12px_rgba(0,40,80,0.2)] flex flex-col justify-between transition-all duration-500
          ${windowWidth >= 1024
                            ? "w-[40%] min-w-[280px] max-w-[400px] lg:min-h-[400px]"
                            : "w-full mt-4"}`}>

                            <div className="rounded-lg overflow-hidden mb-3 h-60 sm:h-55 md:h-55 shadow-sm">
                                <img
                                    src={selectedEvent.imageUrl}
                                    alt={selectedEvent.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="text-base font-semibold mb-1 text-gray-800">{selectedEvent.title}</div>
                            <p className="text-sm text-gray-600 mb-1">📆 Tarih: {selectedEvent.date.substring(0, 10)}</p>
                            <p className="text-sm text-gray-600">{selectedEvent.description}</p>

                            {eventsForSelectedDate.length > 1 && (
                                <div className="flex justify-between items-center mt-4">
                                    <button
                                        onClick={handlePrev}
                                        className="text-sm bg-[#002850] text-white px-4 py-1.5 rounded hover:opacity-90"
                                    >
                                        ← Önceki
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="text-sm bg-[#002850] text-white px-4 py-1.5 rounded hover:opacity-90"
                                    >
                                        Sonraki →
                                    </button>
                                </div>
                            )}

                            <button
                                onClick={() => setSelectedDate(null)}
                                className="mt-4 text-xs text-orange-600 hover:underline self-end"
                            >
                                ✖ Kapat
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

// Etkinlik arayüzü
interface Etkinlik {
    id: number;
    baslik: string;
    tarih: string;
    resimUrl: string;
    aciklama: string;
}

const categories = [
    "NEWS",
    "HEALTH",
    "POLITICS",
    "TRAVEL",
    "SPORTS",
    "FOOD",
    "CULTURE",
    "EDUCATION",
    "ART",
    "MUSIC",
    "TECH",
    "NATURE"
];

const CombinedComponent: React.FC = () => {
    // Etkinlikler state'i
    const [events, setEvents] = useState<Etkinlik[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Güncel ayı almak için
    const currentDate = new Date();
    const currentMonth = monthNamesTR[currentDate.getMonth()];
    const currentYear = currentDate.getFullYear();

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:8080/api/etkinlikler")
            .then((response) => {
                if (!response.ok) throw new Error("Etkinlikler yüklenemedi");
                return response.json();
            })
            .then((data) => {
                setEvents(data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Etkinlikler yüklenirken hata oluştu.");
                setLoading(false);
            });
    }, []);

    // Slider otomatik geçiş - kartlara tıklandığında durur
    useEffect(() => {
        if (events.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [events]);

    if (loading) {
        return <div className="text-center py-10">Etkinlikler yükleniyor...</div>;
    }
    if (error) {
        return <div className="text-center text-red-600 py-10">{error}</div>;
    }

    // Slider'da gösterilecek etkinlik
    const featured = events[currentIndex];

    // Yan kartlar: slider'ın solunda ilk 4, sağında son 4 etkinlik (slider hariç)
    const leftCards = events.slice(0, 4);
    const rightCards = events.slice(-4);

    return (
        <div className="bg-gray-50 py-8 md:py-12 lg:py-2">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-8 md:py-10 lg:py-14 bg-gradient-to-br ">
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-screen-2xl mx-auto p-6 sm:p-8 md:p-10 border border-gray-200">
                        <div className="flex flex-col xl:flex-row gap-6 items-stretch w-full">
                            {/* Sol Kartlar */}
                            <div className="hidden xl:flex xl:flex-col gap-4 w-[280px] flex-shrink-0">
                                {leftCards.map((event, index) => (
                                    <div
                                        key={`left-${event.id}`}
                                        onClick={() => setCurrentIndex(index)}
                                        className="cursor-pointer"
                                    >
                                        <NewsCard
                                            image={event.resimUrl}
                                            category={categories[index % categories.length]}
                                            title={event.baslik}
                                        />
                                    </div>
                                ))}
                            </div>
                            {/* Orta Alan + Sağ Kartlar Yan Yana */}
                            <div className="flex flex-row gap-4 items-stretch w-full">
                                {/* Slider */}
                                <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-blue-950 bg-white w-full max-w-[700px] h-[400px]">
                                    {featured && (
                                        <a href="#" className="block w-full group h-full">
                                            <div className="w-full h-full">
                                                <img
                                                    src={featured.resimUrl}
                                                    alt={featured.baslik}
                                                    className="object-cover w-full h-full rounded-xl group-hover:scale-105 transition-transform duration-700"
                                                />
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white text-lg font-bold">
                                                {featured.baslik}
                                            </div>
                                        </a>
                                    )}
                                </div>
                                {/* Sağ Kartlar */}
                                <div className="hidden xl:flex xl:flex-col gap-4 w-[280px] flex-shrink-0">
                                    {rightCards.map((event, index) => (
                                        <div
                                            key={`right-${event.id}`}
                                            onClick={() => setCurrentIndex(events.length - 4 + index)}
                                            className="cursor-pointer"
                                        >
                                            <NewsCardRight
                                                image={event.resimUrl}
                                                category={categories[(index + 4) % categories.length]}
                                                title={event.baslik}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <EventCalendar
                    events={events.map((event) => ({
                        date: event.tarih,
                        title: event.baslik,
                        imageUrl: event.resimUrl,
                        description: event.aciklama,
                    }))}
                />

                <div className="px-2 sm:px-4 md:px-8 lg:px-16 xl:px-30 py-4 sm:py-6 md:py-8 lg:py-10">
                    <div className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-blue-950">
                        {currentMonth} {currentYear} Etkinlikleri
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                        {events.map((event) => (
                            <div key={event.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                                <div className="aspect-video w-full relative">
                                    <img
                                        src={event.resimUrl}
                                        alt={event.baslik}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-2 sm:p-3 md:p-4">
                                    <h3 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2">{event.baslik}</h3>
                                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Tarih: {event.tarih}</p>
                                    <p className="text-xs sm:text-sm text-gray-600 mt-1">{event.aciklama}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CombinedComponent;