import React from 'react';
import useAuth from '../../CustomHook/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Button } from '@nextui-org/react';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';

const GoogleButton = ({ text }) => {
    const { signInWithGoogle, updateUserProfile, setLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleGoogleLogIn = async () => {
        try {
            const result = await signInWithGoogle();
            const { displayName, photoURL, email } = result.user;
            const newUser = { name: displayName, email, photo: photoURL, role: "student" };
            if (result.user) {
                await updateUserProfile(displayName, photoURL);
                const res = await axios.post('https://server-liard-one.vercel.app/users', newUser);

                console.log(res);

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Welcome to the SunBurst - Academy',
                    showConfirmButton: false,
                    timer: 2000
                });

                navigate(from, { replace: true });
            }
        } catch (error) {
            setLoading(false);
            console.log(error.message);

            if (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: `<a href="">${error.message}</a>`
                });
            }
        }
    };

    return (
        <Button
            onClick={handleGoogleLogIn}
            color="danger"
            variant="bordered"
            startContent={<FcGoogle />}
            className=" mt-4 text-white"
        >
            {text} with Google
        </Button>
    );
};

export default GoogleButton;
