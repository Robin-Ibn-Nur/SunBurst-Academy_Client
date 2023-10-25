import React, { useState } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu } from "@nextui-org/react";
import NavMenu from './NavMenu/NavMenu';
import LogInAndSignUp from './LogInAndSignUpMenu/LogInAndSignUp';
import NavIcon from './NavIcon/NavIcon';
import SmallMenu from './SmallMenu/SmallMenu';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (

        <Navbar onMenuOpenChange={setIsMenuOpen} className='bg-gray-800 text-gray-300'>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand className='h-14 rounded-full flex items-center'>
                    <NavIcon />
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem className='flex gap-5'>
                    <NavMenu />
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <LogInAndSignUp />
            </NavbarContent>
            <NavbarMenu>
                <SmallMenu />
            </NavbarMenu>
        </Navbar>
    );
};

export default Header;