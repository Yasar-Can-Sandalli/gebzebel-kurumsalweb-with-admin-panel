import  { useState, useEffect } from 'react';

const MunicipalityCouncil = () => {
    const [councilMembers, setCouncilMembers] = useState([]);
    const [mayor, setMayor] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        fetch("http://localhost:8080/api/kurumsal/belediyemeclisi")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const mayorData = data.find((member: Person) => member.gorev === 'Başkan');
                const membersData = data.filter((member: Person) => member.gorev !== 'Başkan');

                setMayor(mayorData || null);
                setCouncilMembers(membersData);
                setIsLoading(false);

                console.log("Belediye Meclisi Verileri:", data);
            })
            .catch(err => {
                console.error("Belediye Meclisi verileri yüklenirken hata oluştu:", err);
                setError("Veriler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
                setIsLoading(false);
            });
    }, []);

    interface Person {
        resimUrl: string;
        isimSoyisim: string;
        gorev: string;
    }

    const PersonCard = ({ person, isPresident = false }: { person: Person; isPresident?: boolean }) => {
        const cardClasses = isPresident
            ? "max-w-md mb-12 transform hover:scale-105 transition-transform duration-300"
            : "max-w-xs mb-8 transform hover:scale-105 transition-transform duration-300";

        // Enhanced shadow and border for better prominence
        const cardStyle = isPresident
            ? "shadow-xl border-2 border-gray-200 hover:shadow-2xl"
            : "shadow-lg border border-gray-200 hover:shadow-xl";

        // Updated image classes to make the card much taller by adding more padding
        const imgContainerClasses = isPresident
            ? "pt-10 pb-8 px-6" // Added horizontal padding (px-6)
            : "pt-8 pb-6 px-4"; // Added horizontal padding (px-4)

        // Added padding around the image to create a frame-like effect
        const imgWrapperClasses = "p-3 bg-white rounded-lg"; // Padding creates space between image and border

        const imgClasses = isPresident
            ? "h-80 w-64 object-cover rounded-lg" // Adjusted height/width for better proportions
            : "h-60 w-full object-cover rounded-lg";

        return (
            <div className={`bg-white rounded-lg overflow-hidden ${cardClasses} ${cardStyle}`}>
                <div className="text-center">
                    <div className={`relative ${imgContainerClasses}`}>
                        {/* Added this wrapper div with padding to create frame-like effect */}
                        <div className={`${imgWrapperClasses} border border-gray-100 shadow-sm`}>
                            <img
                                src={person.resimUrl}
                                alt={person.isimSoyisim}
                                className={imgClasses}
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/api/placeholder/250/230";
                                }}
                            />
                        </div>
                    </div>
                    <div className="p-8">
                        <h4 className="text-xl font-medium text-gray-800">{person.isimSoyisim}</h4>
                        <div className="mt-5">
                            <span className="text-gray-600 font-medium">{person.gorev}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (error && !mayor && councilMembers.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
                <div className="w-full max-w-2xl bg-white border-l-4 border-red-500 rounded shadow-lg hover:shadow-xl overflow-hidden">
                    <div className="p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-8 w-8 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h2 className="text-lg font-bold text-gray-800">Hata</h2>
                                <p className="text-gray-600">{error}</p>
                                <button
                                    className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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
    }

    if (isLoading) {
        return (
            <div className="w-full max-w-4xl mx-auto my-4 px-4">
                <div className="bg-white rounded shadow-xl overflow-hidden">
                    <div className="animate-pulse">
                        <div className="h-48 bg-gray-300 w-full"></div>
                        <div className="p-4">
                            <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-300 rounded"></div>
                                <div className="h-4 bg-gray-300 rounded"></div>
                                <div className="h-4 bg-gray-300 rounded"></div>
                                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                                {Array(8).fill(0).map((_, index) => (
                                    <div key={index} className="bg-gray-300 h-48 rounded-lg shadow-md"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div id="pcoded" className="pcoded">
            <div className="pcoded-container navbar-wrapper bg-transparent">
                <div className="pcoded-main-container">
                    <div className="pcoded-wrapper">
                        <div className="pcoded-content">
                            <div className="pcoded-inner-content">
                                <div className="main-body">
                                    <div className="page-wrapper">
                                        <div className="flex justify-center">
                                            <div className="w-full max-w-6xl px-4">
                                                <div className="shadow-lg hover:shadow-xl p-6 bg-white rounded-xl text-center mt-6 mb-8 border border-gray-200">
                                                    <h1 className="text-2xl md:text-4xl font-bold py-2">BELEDİYE MECLİSİ</h1>
                                                </div>
                                                <div className="bg-white rounded-xl shadow-xl p-8 border-2 border-gray-200">
                                                    {mayor && (
                                                        <div className="flex justify-center mb-14">
                                                            <PersonCard person={mayor} isPresident={true} />
                                                        </div>
                                                    )}
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                                        {councilMembers.map((member, index) => (
                                                            <PersonCard key={index} person={member} />
                                                        ))}
                                                    </div>
                                                    {!mayor && councilMembers.length === 0 && (
                                                        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded shadow-lg hover:shadow-xl">
                                                            <p className="font-bold">Uyarı</p>
                                                            <p>Belediye meclisi üye bilgisi bulunamadı.</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MunicipalityCouncil;