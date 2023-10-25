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

    const handleGoogleLogIn = () => {
        signInWithGoogle()
            .then(result => {
                const { displayName, photoURL, email } = result.user;
                if (result?.user) {
                    updateUserProfile(displayName, photoURL)
                        .then(() => {
                            axios.post('https://sun-burst-academy-server.vercel.app/users', { name: displayName, email, photo: photoURL, role: "student" })
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
            }).catch(error => {
                setLoading(false)
                console.log(error.message);
                if (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: `<a href="">${error.message}</a>`
                    })
                }
            })
    }

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
