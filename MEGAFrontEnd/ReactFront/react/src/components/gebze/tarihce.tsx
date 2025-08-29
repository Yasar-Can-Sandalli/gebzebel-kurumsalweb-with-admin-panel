import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageSlider from '../Sliders/SliderTest.tsx';

interface Tarihce {
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
}

const TarihcePage: React.FC = () => {
    const [tarihce, setTarihce] = useState<Tarihce | null>(null);
    const [slides, setSlides] = useState<{ image: string }[]>([]);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/tarihce');
                if (response.data && response.data.length > 0) {
                    const data = response.data[0];
                    setTarihce(data);

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

    if (!tarihce) {
        return <div className="alert alert-info">Yükleniyor...</div>;
    }

    return (
        <div className="main-body">
            <div className="page-wrapper">
                <div className="col-lg ms-auto">
                    <div className="card w-full max-w-screen-lg mx-auto top-2 mt-1">
                        <div className="card-block p-4 md:p-6">
                            {slides.length > 0 && (
                                <div className="relative w-full overflow-hidden rounded-lg shadow-xl">
                                    <ImageSlider slides={slides} />
                                </div>
                            )}
                            <br />
                            <h3><b>TARİHÇE</b></h3><br />
                            <div style={{ textAlign: 'justify' }}>
                                <div dangerouslySetInnerHTML={{ __html: tarihce.aciklama }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TarihcePage;