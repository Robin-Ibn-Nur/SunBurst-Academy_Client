import React from 'react';
import useAuth from '../../CustomHook/useAuth';
import Swal from 'sweetalert2';
import { Button } from '@nextui-org/react';
import { BiLogOut } from "react-icons/bi"

const LogOut = () => {
    const { logOut } = useAuth()

    const handleLogOut = () => {
        logOut().then(() => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Sign-out successful.',
                showConfirmButton: false,
                timer: 1500
            })
        }).catch(error => console.log(error))
    }
    return (
        <Button onClick={handleLogOut} color="danger" variant="bordered" startContent={<BiLogOut />}>
            Log Out
        </Button>
    );
};

export default LogOut;