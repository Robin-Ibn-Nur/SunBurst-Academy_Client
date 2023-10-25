import React from 'react';
import sunImg from '../../../assets/sunLogo.jpg'
const NavIcon = () => {
    return (
        <>
            <div
                className="bg-cover bg-center h-full w-14 rounded-full"
                style={{
                    backgroundImage: `url(${sunImg})`
                }}
            ></div>
            <h1 className='text-sm lg:text-2xl font-extrabold ml-3 absolute top-[30px] left-[90px] lg:left-[53px]'>
                <span
                    className='text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600'
                >
                    SunBurst Academy
                </span>
            </h1>
        </>
    );
};

export default NavIcon;