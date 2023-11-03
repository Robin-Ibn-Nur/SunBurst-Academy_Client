import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../CustomHook/useAxiosSecure';
import useAuth from '../../../CustomHook/useAuth';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Button } from '@nextui-org/react';
import SplashLoader from '../../../Component/SplashLoader/SplashLoader';

const AddClass = () => {
    const { user, loading } = useAuth()
    const [axiosSecure] = useAxiosSecure()

    // using react hook form
    const { register, handleSubmit, reset } = useForm();

    // imageBB_url
    const imageBB_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Upload_token}`

    const handleAddClassSubmit = async (data) => {

        const newClass = {
            className: data.className,
            instructorName: user?.displayName,
            instructorEmail: user?.email,
            availableSeats: data.availableSeats,
            price: data.price,
            status: "pending"
        }

        try {


            const formData = new FormData();
            formData.append('image', data.classImage[0]);

            // post image to imageBB
            const response = await axios.post(imageBB_url, formData)
            if (response.data.success) {
                const imgURL = response.data.data.display_url;
                newClass.classImage = imgURL;

                // set the data to database
                const res = await axiosSecure.post('/add-a-class', newClass);

                if (res.data.insertedId) {
                    reset()
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `You have successfully add a class ${user?.displayName}your class is pending for approved`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }

        } catch (error) {
            if (error) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: `Sorry! ${error.message}`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    };
    if (loading) {
        return <SplashLoader />
    }
    return (
        <form onSubmit={handleSubmit(handleAddClassSubmit)} className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
            <div className="space-y-2 col-span-full lg:col-span-1">
                <p className="font-medium">Course Inormation</p>
                <p className="text-xs">Add your favourite course here</p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                <div className="col-span-full sm:col-span-3">
                    <label className="text-sm">Class Name</label>
                    <input id="ClassName" type="text" className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" {...register("className", { required: true })} />
                </div>
                <div className="col-span-full sm:col-span-3">
                    <label className="text-sm">Available Seats</label>
                    <input id="email" type="number" className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                        {...register("availableSeats", { required: true })} />
                </div>

                <div className="col-span-full sm:col-span-2">
                    <label className="text-sm">Course Price</label>
                    <input id="state" type="number" className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                        {...register("price", { required: true })}
                    />
                </div>
                <div className="col-span-full sm:col-span-2 items-center space-x-2">
                    <label className="text-sm">Add a Photo</label>
                    <input type="file" name="classImage" id="classImage" className="w-full  focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" {...register("classImage", { required: true })} />
                </div>


            </div>
            <div className="flex justify-center ml-28 col-span-full sm:col-span-2 mt-4">
                <Button type="submit" variant='shadow' className="font-bold px-4 py-2 border rounded-md dark:border-gray-100">Add</Button>
            </div>
        </form>
    );
};

export default AddClass;