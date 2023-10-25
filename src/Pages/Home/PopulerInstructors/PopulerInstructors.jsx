import React from 'react';
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa"

const PopulerInstructors = () => {
    const teachers = [
        {
            id: 1,
            name: 'John Doe',
            subject: 'Mathematics',
            image: 'https://get.pxhere.com/photo/man-person-people-male-asian-portrait-young-chinese-professional-business-profession-hairstyle-confident-spokesperson-businessperson-white-collar-worker-922334.jpg',
            description: 'Passionate about simplifying complex mathematical concepts for students.',
            social: {
                twitter: 'https://twitter.com/',
                linkedin: 'https://www.linkedin.com/',
                instagram: 'https://www.instagram.com/'
            }
        },
        {
            id: 2,
            name: 'Jane Smith',
            subject: 'Science',
            image: 'https://via.placeholder.com/150',
            description: 'Dedicated to fostering a love for the natural world and scientific inquiry.',
            social: {
                twitter: 'https://twitter.com/',
                linkedin: 'https://www.linkedin.com/',
                instagram: 'https://www.instagram.com/'
            }
        },
        {
            id: 3,
            name: 'William Johnson',
            subject: 'History',
            image: 'https://via.placeholder.com/150',
            description: 'Bringing history to life with engaging storytelling and in-depth knowledge.',
            social: {
                twitter: 'https://twitter.com/',
                linkedin: 'https://www.linkedin.com/',
                instagram: 'https://www.instagram.com/'
            }
        },
        {
            id: 4,
            name: 'Emily Brown',
            subject: 'English Literature',
            image: 'https://via.placeholder.com/150',
            description: 'Inspiring a passion for literature through interactive and creative teaching methods.',
            social: {
                twitter: 'https://twitter.com/',
                linkedin: 'https://www.linkedin.com/',
                instagram: 'https://www.instagram.com/'
            }
        }
    ];
    return (
        <div className="flex flex-wrap justify-center">
            {teachers.map((teacher) => (
                <div key={teacher.id} className="w-full sm:w-1/2 md:w-1/4 p-4">
                    <div className="bg-white rounded-lg p-6">
                        <img src={teacher.image} alt={teacher.name} className="w-32 h-32 object-cover rounded-full mx-auto" />
                        <h2 className="text-xl font-bold mt-4">{teacher.name}</h2>
                        <p className="text-sm text-gray-600 mb-4">{teacher.subject}</p>
                        <p className="text-sm text-gray-800">{teacher.description}</p>
                        <div className="flex justify-center mt-4">
                            <a href={teacher.social.twitter} className="mr-4"><FaTwitter className="text-blue-500 hover:text-blue-700" /></a>
                            <a href={teacher.social.linkedin} className="mr-4"><FaLinkedin className="text-blue-800 hover:text-blue-900" /></a>
                            <a href={teacher.social.instagram}><FaInstagram className="text-pink-600 hover:text-pink-800" /></a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PopulerInstructors;