import React, { useState } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, Button, Divider } from "@nextui-org/react";
import { NavLink } from 'react-router-dom';
import sunImg from "../../assets/sunLogo.jpg"
import useAuth from '../../CustomHook/useAuth';
import LogOut from '../../SharedPages/Logout/LogOut';
import { BiLogIn } from 'react-icons/bi';
import { VscSignIn } from 'react-icons/vsc';



const Header = () => {
    const { user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];
    const navMenu = (
        <>
            <NavLink
                to="/"
                className={({ isActive, isPending }) => isActive ? "active-link" : isPending ? "" : ""}
            >
                Home
            </NavLink>
            <NavLink
                to="/instructors"
                className={({ isActive, isPending }) => isActive ? "active-link" : isPending ? "" : ""}
            >
                Instructors
            </NavLink>
            <NavLink
                to="/classes"
                className={({ isActive, isPending }) => isActive ? "active-link" : isPending ? "" : ""}
            >
                Classes
            </NavLink>
        </>
    );

    const loginAndSignupRoute = <>
        {user ? <LogOut /> : <>
            <Button variant="bordered" color='success' startContent={<BiLogIn />}>
                <NavLink to="login" className="hidden lg:flex">
                    Login
                </NavLink>
            </Button>
            <span className='text-xs text-gray-500'>or</span>
            <Button variant='bordered' color='primary'
                startContent={<VscSignIn />}>
                <NavLink to="signUp">
                    Sign Up
                </NavLink>
            </Button>
        </>}
    </>
    return (

        <Navbar onMenuOpenChange={setIsMenuOpen} className='bg-gray-800 text-gray-300'>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand className='h-14 rounded-full flex items-center'>
                    <div
                        className="bg-cover bg-center h-full w-14 rounded-full"
                        style={{
                            backgroundImage: `url(${sunImg})`
                        }}
                    ></div>
                    <h1 className='text-sm lg:text-2xl font-extrabold ml-3 absolute top-[30px] left-[90px] lg:left-[53px]'>
                        <span
                            className='text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600'
                        >
                            SunBurst Academy
                        </span>
                    </h1>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem className='flex gap-5'>
                    {navMenu}
                </NavbarItem>

            </NavbarContent>
            <NavbarContent justify="end">
                {loginAndSignupRoute}
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
};

export default Header;