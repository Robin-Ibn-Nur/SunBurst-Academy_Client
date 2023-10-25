import { Avatar, Button, Tooltip } from '@nextui-org/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../CustomHook/useAuth';
import { BiLogIn, BiUserCircle } from 'react-icons/bi';
import { VscSignIn } from 'react-icons/vsc';
import LogOut from '../../../SharedPages/Logout/LogOut';

const LogInAndSignUp = () => {
    const { user } = useAuth();
    return (
        <>
            {user && <LogOut />}
            {!user && <> <Button className="hidden lg:flex" variant="bordered" color='success' startContent={<BiLogIn />}>
                <NavLink to="login" >
                    Login
                </NavLink>
            </Button>
                {!user && <span className="hidden sm:flex text-xs text-gray-500">or</span>}
                <Button variant='bordered' color='primary' className="hidden lg:flex"
                    startContent={<VscSignIn />}>
                    <NavLink to="signUp" >
                        Sign Up
                    </NavLink>
                </Button>
            </>
            }
            {user ?
                <Tooltip showArrow={true} content={user?.displayName}>
                    <Avatar isBordered color="success" src={user?.photoURL} />
                </Tooltip> :
                <Tooltip showArrow={true} content="No User">
                    <Avatar showFallback src={<BiUserCircle />} />
                </Tooltip>
            }


        </>
    );
};

export default LogInAndSignUp;