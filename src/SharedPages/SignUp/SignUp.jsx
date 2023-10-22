import { useForm } from 'react-hook-form';
import { Input, Button } from '@nextui-org/react';
import authImage from "../../assets/auth.jpg"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useTitle from '../../CustomHook/useTitle';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuth from '../../CustomHook/useAuth';
import SplashLoader from '../../Component/SplashLoader/SplashLoader';
import GoogleButton from '../GoogleButton/GoogleButton';

const bgAuthImage = {
    backgroundImage: `url(${authImage})`,
    backgroundSize: 'cover',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};
const SignUp = () => {
    useTitle("Sign Up")
    const { createUser, updateUserProfile, loading, setLoading } = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        createUser(data?.email, data?.password)
            .then((result) => {
                // Creating User 
                const user = result.user;
                if (user) {
                    updateUserProfile(data?.name, data?.photoUrl)
                        // update user profile
                        .then(() => {
                            axios.post('https://server-liard-one.vercel.app/users', { name: data?.name, email: data?.email, photo: data?.photoUrl, role: "student" })
                                .then(res => {
                                    console.log(res);
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Welcome to the SunBurst - Academy',
                                        showConfirmButton: false,
                                        timer: 2000
                                    })
                                    navigate(from, { replace: true })
                                }).catch(error => {
                                    setLoading(false)
                                    console.log(error);
                                })
                        }).catch(error => console.log(error))
                }
            })
            .catch((error) => {
                setLoading(false)
                const errorMessage = error.message;
                console.log(errorMessage);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: `<a href="">${errorMessage}</a>`

                })
            });
        reset()
    };

    if (loading) {
        return <SplashLoader />
    }



    return (
        <div style={bgAuthImage} className="flex flex-col items-center  text-white sm:h-auto">
            <h2 className='text-center text-2xl font-bold my-5 '>Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md m-auto text-white backdrop-blur-sm bg-white/10 p-6">
                <div className="mb-4">
                    <label htmlFor="Username">User Name</label>
                    <Input
                        {...register("username", { required: true })}
                        variant='underlined'
                        placeholder="Enter your username"
                        error={errors.username && "Username is required"}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="Email">Email</label>
                    <Input
                        {...register("email", { required: true })}
                        type='email'
                        variant='underlined' placeholder="Enter your email"
                        error={errors.email && "Email is required"}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="Password">Password</label>
                    <Input
                        {...register("password", { required: true })}
                        type="password"
                        variant='underlined' placeholder="Enter your password"
                        error={errors.password && "Password is required"}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="Confirm Password">Confirm Password</label>
                    <Input
                        {...register("confirmPassword", { required: true, validate: (value) => value === watch('password') })}
                        type="password"
                        variant='underlined'
                        placeholder="Confirm your password"
                        error={errors.confirmPassword && "Please confirm your password"}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="Image URL">Image URL</label>

                    <Input
                        {...register("imageUrl")}
                        type="url"
                        variant='underlined'
                        placeholder="Enter your image URL"
                    />
                </div>
                <div className="text-center">
                    <Button className='text-white font-bold' type="submit" variant="bordered" >
                        {loading ? "Please Wait..." : "Register"}
                    </Button>
                </div>
            </form>
            <div className='text-center w-full'>
                <span>or</span>
            </div>
            <GoogleButton text="Sign Up" />
            <p className="mt-1 pb-5">
                Allready have an account?
                <span
                    className="text-white underline cursor-pointer font-semibold ml-2"
                >
                    <Link to='/login'>Log in</Link>
                </span>
            </p>
        </div>

    );
};

export default SignUp;