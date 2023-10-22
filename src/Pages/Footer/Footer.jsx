import React from 'react';

const Footer = () => {
    return (
        <footer className='bg-[#1F2937] text-[#D1D5DB]'>
            <div className="container mx-auto py-8 px-4 flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4">SunBurst Academy's Sustainable Village Development School</h2>
                <p className="text-lg mb-4 text-center">
                    Providing an innovative approach to learning and sustainable living for students during summer vacation.
                </p>
                <div className="flex mb-4">
                    <a href="#" className="mr-4 hover:text-green-500">
                        About Us
                    </a>
                    <a href="#" className="mr-4 hover:text-green-500">
                        Programs
                    </a>
                    <a href="#" className="mr-4 hover:text-green-500">
                        Contact
                    </a>
                </div>
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} SunBurst Academy's Sustainable Village Development School. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
