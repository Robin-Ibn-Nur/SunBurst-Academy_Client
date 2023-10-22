import { useForm } from 'react-hook-form';
import { Input, Button } from '@nextui-org/react';
import authImage from "../assets/auth.jpg"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../CustomHook/useAuth';
import Swal from 'sweetalert2';
import SplashLoader from '../Component/SplashLoader/SplashLoader';
import GoogleButton from './GoogleButton/GoogleButton';


const bgAuthImage = {
    backgroundImage: `url(${authImage})`,
    backgroundSize: 'cover',
    height: '100vh',
    width: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
};
const Login = () => {
    const { signIn, loading, setLoading } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();


    const onSubmit = (data) => {

        signIn(data?.email, data?.password)
            .then((result) => {
                const user = result.user;
                navigate(from, { replace: true })
                setLoading(false)
                if (user) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: "Welcome to The SunBurst - Academy",
                        showConfirmButton: false,
                        timer: 2000
                    })
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
        <div style={bgAuthImage} className="flex flex-col items-center  text-white">
            <h2 className='text-center text-2xl my-5'>Log in</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md  text-white backdrop-blur-sm bg-white/10 p-6">
                <div className="mb-4">
                    <label htmlFor='Password'>Email</label>
                    <Input className='text-white'
                        {...register("email", { required: true })}
                        placeholder="Enter your email"
                        variant='underlined'
                        error={errors.email && "Email is required"}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="Password">Password</label>
                    <Input
                        {...register("password", { required: true })}
                        type="password"
                        placeholder="Enter your password"
                        variant='underlined'
                        color='primary'
                        error={errors.password && "Password is required"}
                    />
                </div>
                <div className="text-center ">
                    <Button className='text-white font-bold' type="submit" variant="bordered" >
                        Log in
                    </Button>
                </div>
            </form>
            <div className='text-center w-full'>
                <span>or</span>
            </div>
            <GoogleButton text="Log in" />
            <p className="mt-4">
                Don't have an account?
                <span
                    className="text-white underline cursor-pointer font-semibold ml-2"
                >
                    <Link to='/signUp'>Sign Up</Link>
                </span>
            </p>
        </div>
    );
};

export default Login;