import React from 'react';
import useAuth from '../../CustomHook/useAuth';
import useAdmin from '../../CustomHook/useAdmin';
import useInstructor from '../../CustomHook/useInstructor';
import useStudent from '../../CustomHook/useStudent';
import useTitle from '../../CustomHook/useTitle';
import Swal from 'sweetalert2';
import useClassPage from '../../CustomHook/useClassPage';
import useAxiosSecure from '../../CustomHook/useAxiosSecure';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const Classes = () => {
    useTitle("Classes")
    const { user } = useAuth();
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor()
    const [isStudent] = useStudent()
    const { classPage, axiosSecure } = useClassPage()


    const handleSelect = async (cls) => {

        const newClass = {
            availableSeats: cls.availableSeats,
            classImage: cls.classImage,
            className: cls.className,
            instructorEmail: cls.instructorEmail,
            instructorName: cls.instructorName,
            price: cls.price,
            status: cls.status,
            userEmail: user?.email
        };
        try {
            const res = await axiosSecure.post('/selectedClasses',
                newClass);
            if (res.data.insertedId) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your course has been saved, please see the dashbord',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (error) {
            if (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: `<a href="">${error.message}</a>`
                })
            }
        }
    }
    return (
        <div className="bg-gray-100 min-h-screen p-8 my-5">
            <div>
                <h1 className="text-center text-2xl font-semibold font-serif my-10 underline">{classPage.length === 0 ? "Opps! No Classes at the moment. Sorry!" :
                    <>
                        Our Available total Classes {classPage.length} are waiting for approved
                    </>
                }
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classPage.map((cls) => (
                    cls.status === "approved" && (
                        <div
                            key={cls._id}
                            className={`font-serif p-4 bg-white rounded shadow transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-[#008080] duration-300 hover:text-white ${cls.availableSeats === 0 ? 'bg-red-600 text-white' : 'bg-white'}`}
                        >
                            <img
                                src={cls.classImage}
                                alt={cls.classImage}
                                className="w-full h-40 object-cover mb-4 rounded"
                            />
                            <h2 className="text-xl font-bold mb-2">{cls.className}</h2>
                            <p className="text-gray-600 mb-4">Instructor: <span className="font-bold">{cls.instructorName}</span></p>
                            <p className="text-gray-600 mb-4">Status: {cls.status}</p>
                            <p className="mb-4">
                                Available Seats: {cls.availableSeats === 0 ? '0 (Full)' : cls.availableSeats}
                            </p>
                            <p className="mb-4">Price: {cls.price}</p>
                            {/* TODO: button is not work properly */}
                            {user ? (
                                <button
                                    onClick={() => handleSelect(cls)}
                                    disabled={!user || !isStudent || isAdmin || isInstructor || cls.availableSeats === 0}
                                    className={`bg-blue-700 w-full text-white px-3 py-2 rounded-md text-xl font-medium hover:bg-[#FF6600] hover:text-white transition-colors duration-300 ${!user || !isStudent || isAdmin || isInstructor || cls.availableSeats === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                    Select
                                </button>
                            ) : (
                                <p className="text-red-500">Please log in to select the course.</p>
                            )}

                        </div>
                    )

                ))}
            </div>
        </div>


    );
};

export default Classes;