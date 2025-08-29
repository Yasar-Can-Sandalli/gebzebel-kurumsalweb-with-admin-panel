// src/components/ImageSlider.tsx
import React, { useState, useEffect, useRef } from 'react';

type Slide = {
    image: string;
    alt?: string;
    caption?: string;
};

type ImageSliderProps = {
    slides: Slide[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
};

const ImageSlider: React.FC<ImageSliderProps> = ({
                                                     slides,
                                                     autoPlay = true,
                                                     autoPlayInterval = 5000,
                                                 }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentTranslate, setCurrentTranslate] = useState(0);
    const [prevTranslate, setPrevTranslate] = useState(0);
    const [animationId, setAnimationId] = useState<number | null>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isAutoPlaying && !isDragging) {
            timer = setInterval(() => {
                goToNextSlide();
            }, autoPlayInterval);
        }
        return () => clearInterval(timer);
    }, [isAutoPlaying, isDragging]);

    const goToNextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const goToPrevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), autoPlayInterval * 2);
    };

    const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
        const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        setStartX(x);
        setIsDragging(true);
        setPrevTranslate(-currentSlide * (sliderRef.current?.offsetWidth || 0));
        cancelAnimationFrame(animationId ?? 0);
    };

    const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
        if (!isDragging) return;
        const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const diff = x - startX;
        setCurrentTranslate(prevTranslate + diff);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        const movedBy = currentTranslate - prevTranslate;
        const threshold = (sliderRef.current?.offsetWidth || 0) / 4;

        if (movedBy < -threshold) {
            goToNextSlide();
        } else if (movedBy > threshold) {
            goToPrevSlide();
        } else {
            setCurrentTranslate(-currentSlide * (sliderRef.current?.offsetWidth || 0));
        }
    };

    useEffect(() => {
        setCurrentTranslate(-currentSlide * (sliderRef.current?.offsetWidth || 0));
    }, [currentSlide]);

    return (
        <div className="relative w-full overflow-hidden rounded-lg shadow-xl">
            <div
                ref={sliderRef}
                className="flex"
                style={{
                    transform: `translateX(${isDragging ? currentTranslate : -currentSlide * (sliderRef.current?.offsetWidth || 0)}px)`,
                    transition: isDragging ? 'none' : 'transform 0.5s ease-in-out',
                    touchAction: 'none',
                    cursor: isDragging ? 'grabbing' : 'grab',
                }}
                onMouseDown={handleTouchStart}
                onMouseMove={handleTouchMove}
                onMouseUp={handleTouchEnd}
                onMouseLeave={() => isDragging && handleTouchEnd()}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="w-full flex-shrink-0 relative flex items-center justify-center bg-gray-100 h-64 md:h-96 lg:h-[500px]">
                        <img
                            src={slide.image}
                            alt={slide.alt}
                            draggable={false}
                            className="w-full h-auto max-h-64 md:max-h-96 lg:max-h-[500px]"

                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                            <p className="text-sm md:text-base">{slide.caption}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Arrows */}
            <button
                onClick={goToPrevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 transition"
            >
                &lt;
            </button>

            {/* Right Arrow */}
            <button
                onClick={goToNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 transition"
            >
                &gt;
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white w-6' : 'bg-white/50'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;
