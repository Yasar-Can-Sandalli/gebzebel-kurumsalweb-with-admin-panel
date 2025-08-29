import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="relative w-12 h-12">
                {/* Blue spinner */}
                <div className="absolute w-full h-full">
                    <div className="absolute left-0 top-0 w-1/2 h-full overflow-hidden">
                        <div className="absolute left-full top-0 w-200 h-full border-4 border-blue-500 rounded-full border-t-transparent border-r-transparent border-b-transparent"
                             style={{ transform: 'rotate(0deg)' }}></div>
                    </div>
                    <div className="absolute left-1/4 top-0 w-1/2 h-full overflow-hidden">
                        <div className="absolute left-0 top-0 w-200 h-full border-4 border-blue-500 rounded-full border-t-transparent"
                             style={{ transform: 'rotate(180deg)' }}></div>
                    </div>
                </div>

                {/* Other colors would follow similar pattern with different rotation delays */}
            </div>
        </div>
    );
};

export default Loader;