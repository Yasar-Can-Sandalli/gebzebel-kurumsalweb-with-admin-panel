// src/components/Sliders2/SliderTest2.tsx
import React, { useRef } from 'react';

type Slide = {
    image: string;
    alt?: string;
    caption?: string;
};

type ImageSliderProps = {
    slides: Slide[];
    currentSlide: number;
    onSlideChange: (index: number) => void;
    autoPlay?: boolean;
    autoPlayInterval?: number;
};

const ImageSlider: React.FC<ImageSliderProps> = ({
                                                     slides,
                                                     currentSlide,
                                                     onSlideChange,
                                                     autoPlay = false,
                                                     autoPlayInterval = 5000,
                                                 }) => {
    const sliderRef = useRef<HTMLDivElement>(null);

    // Use effect for autoplay removed for brevity since it's disabled

    return (
        <div className="relative w-full overflow-hidden rounded-lg shadow-xl">
            <div
                ref={sliderRef}
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                }}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="w-full flex-shrink-0 relative bg-gray-100">
                        {/* Fixed container with consistent aspect ratio */}
                        <div className="aspect-[16/9] w-full">
                            <img
                                src={slide.image}
                                alt={slide.alt || `Slide ${index + 1}`}
                                draggable={false}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        {slide.caption && (
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                                <p className="text-sm md:text-base">{slide.caption}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => onSlideChange(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            currentSlide === index ? 'bg-white w-6' : 'bg-white/50'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;