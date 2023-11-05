import React from 'react';
import useAuth from '../../CustomHook/useAuth';
import useAdmin from '../../CustomHook/useAdmin';
import useInstructor from '../../CustomHook/useInstructor';
import useStudent from '../../CustomHook/useStudent';
import useTitle from '../../CustomHook/useTitle';
import Swal from 'sweetalert2';
import useClassPage from '../../CustomHook/useClassPage';
import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";


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
        <div className="min-h-screen p-5">
            <div>
                <h1 className="text-center text-2xl font-semibold font-serif my-10 underline">{classPage.length === 0 && "Opps! No Classes at the moment. Sorry!"
                }
                </h1>
            </div>

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classPage.map((cls) => (
                    cls.status === "approved" && (
                        <Card key={cls._id} isFooterBlurred className="w-full h-auto">
                            <CardHeader className="absolute z-10 top-1 flex-col items-start">
                                <h4 className="text-white/90 font-medium text-xl">
                                    Course Name: {cls.className}
                                </h4>
                                <h4 className="text-white/90 font-medium text-xl">
                                    Instructor: {cls.instructorName}
                                </h4>
                            </CardHeader>
                            <Image
                                removeWrapper
                                alt="Class Image"
                                className="z-0 w-full h-full object-cover"
                                src={cls.classImage}
                            />
                            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                                <div className="flex flex-grow gap-2 items-center">
                                    <div className="flex flex-col">
                                        {/* <p className="text-tiny text-white/60">Course Name: {cls.className}</p> */}
                                        <p className="text-tiny text-white/60">Instructor: {cls.instructorName}</p>
                                        {/* <p className="text-tiny text-white/60">Status: {cls.status}</p> */}
                                        <p className="text-tiny text-white/60">
                                            Available Seats:{" "}
                                            {cls.availableSeats === 0 ? "0 (Full)" : cls.availableSeats}
                                        </p>
                                        <p className="text-tiny text-white/60">Price: {cls.price}</p>
                                    </div>
                                </div>
                                {user ? (
                                    <Button
                                        onClick={() => handleSelect(cls)}
                                        disabled={
                                            !user ||
                                            !isStudent ||
                                            isAdmin ||
                                            isInstructor ||
                                            cls.availableSeats === 0
                                        }
                                        className={`text-white hover:text-black font-bold${!user ||
                                            !isStudent ||
                                            isAdmin ||
                                            isInstructor ||
                                            cls.availableSeats === 0
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                            }`}
                                        radius="full" size="md" variant='ghost'
                                    // color='primary'
                                    >
                                        Select
                                    </Button>
                                ) : (
                                    <p className="text-red-500">Please log in to select the course.</p>
                                )}
                            </CardFooter>
                        </Card>

                    )

                ))}
            </div>
        </div>


    );
};

export default Classes;