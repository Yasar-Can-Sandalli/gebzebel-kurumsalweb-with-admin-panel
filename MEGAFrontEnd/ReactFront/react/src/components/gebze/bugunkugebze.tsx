import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageSlider from '../Sliders/SliderTest.tsx';

interface BugunkuGebze {
    id: number;
    resim1: string;
    resim2: string;
    resim3: string;
    resim4: string;
    resim5: string;
    resim6: string;
    resim7: string;
    resim8: string;
    resim9: string;
    resim10: string;
    aciklama: string;
    nufus1: number;
    nufus2: number;
    nufus3: number;
    nufus4: number;
    nufus5: number;
    yil1: number;
    yil2: number;
    yil3: number;
    yil4: number;
    yil5: number;
}

const BugunkuGebzePage: React.FC = () => {
    const [bugunkuGebze, setBugunkuGebze] = useState<BugunkuGebze | null>(null);
    const [slides, setSlides] = useState<{ image: string }[]>([]);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/bugunkugebze');
                if (response.data && response.data.length > 0) {
                    const data = response.data[0];
                    setBugunkuGebze(data);

                    const validSlides = [
                        data.resim1,
                        data.resim2,
                        data.resim3,
                        data.resim4,
                        data.resim5,
                        data.resim6,
                        data.resim7,
                        data.resim8,
                        data.resim9,
                        data.resim10
                    ]
                        .filter(resim => resim)
                        .map(resim => ({ image: resim }));

                    setSlides(validSlides);
                }
            } catch (err) {
                console.error('Veri çekme hatası:', err);
                setError('Veriler yüklenirken bir hata oluştu');
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!bugunkuGebze) {
        return <div className="alert alert-info">Yükleniyor...</div>;
    }

    const populationData = [
        { year: bugunkuGebze.yil1?.toString(), population: bugunkuGebze.nufus1?.toString() },
        { year: bugunkuGebze.yil2?.toString(), population: bugunkuGebze.nufus2?.toString() },
        { year: bugunkuGebze.yil3?.toString(), population: bugunkuGebze.nufus3?.toString() },
        { year: bugunkuGebze.yil4?.toString(), population: bugunkuGebze.nufus4?.toString() },
        { year: bugunkuGebze.yil5?.toString(), population: bugunkuGebze.nufus5?.toString() }
    ].filter(item => item.year && item.population);

    return (
        <div className="main-body">
            <div className="page-wrapper">
                <div className="w-full px-2 md:px-4">
                    <div className="card w-full max-w-screen-lg mx-auto top-2 mt-1">
                        <div className="card w-full bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="card-block p-3 md:p-6">
                                {slides.length > 0 && (
                                    <div className="relative w-full overflow-hidden rounded-lg shadow-md">
                                        <div className="aspect-w-16 aspect-h-9 md:aspect-h-7">
                                            <ImageSlider slides={slides} />
                                        </div>
                                    </div>
                                )}

                                <div className="mt-6">
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">BUGÜNKÜ GEBZE</h2>
                                    <div className="text-justify text-gray-700 space-y-4">
                                        <div dangerouslySetInnerHTML={{ __html: bugunkuGebze.aciklama }} />
                                    </div>

                                    {populationData.length > 0 && (
                                        <div className="overflow-x-auto mt-6">
                                            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
                                                <thead>
                                                <tr className="bg-indigo-500 text-white">
                                                    <th className="py-2 px-4 border-b text-left">Yıl</th>
                                                    <th className="py-2 px-4 border-b text-center">Nüfus</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {populationData.map((item, idx) => (
                                                    <tr key={idx}>
                                                        <td className="py-2 px-4 border-b font-medium">{item.year}</td>
                                                        <td className="py-2 px-4 border-b">
                                                            <div className="flex justify-center">
                                                                <div className="bg-indigo-100 rounded-full px-3 py-1 text-center w-24">
                                                                        <span className="font-medium text-indigo-700">
                                                                            {item.population}
                                                                        </span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BugunkuGebzePage;