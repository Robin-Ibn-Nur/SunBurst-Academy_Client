import React, { useEffect, useState } from 'react';
import useAuth from '../../../CustomHook/useAuth';
import ScrollAnimation from '../../../Component/ScrollAnimation/ScrollAnimation';

const Banner = () => {
    const { user } = useAuth()
    const [index, setIndex] = useState(0);
    const images = ['https://i.pinimg.com/564x/be/a6/e2/bea6e2cd479a5449e3791b7ffeafe516.jpg', 'https://i.pinimg.com/564x/55/3b/df/553bdf8e0cdeed1042fb4d5c695910f9.jpg'];

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);
    return (
        <div className="flex justify-center mt-5 h-96 reveal">
            <div className="w-2/3 h-80 rounded-lg overflow-hidden shadow-lg bg-opacity-50 backdrop-filter backdrop-blur-lg border">
                {images.map((image, i) => (
                    <img
                        key={i}
                        src={image}
                        alt={`Background Image ${i + 1}`}
                        className={`absolute top-0 left-0 w-full h-full object-cover rounded-lg transition-opacity duration-500 ${i === index ? 'opacity-100' : 'opacity-0'
                            }`}
                    />
                ))}
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center p-6 transition-opacity duration-500">
                    <h2 className="text-3xl font-bold text-white mb-4">{`${user} ${index + 1}`}</h2>
                    <p className="text-white mb-4">{`Content ${index + 1} goes here.`}</p>
                    <button className="px-4 py-2 bg-green-500 text-white rounded">{`Click Me ${index + 1}`}</button>
                </div>
            </div>
        </div>

    );
};

export default Banner;