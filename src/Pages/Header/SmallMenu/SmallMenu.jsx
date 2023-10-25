import { NavbarMenuItem } from '@nextui-org/navbar';
import React from 'react';
import { NavLink } from 'react-router-dom';

const SmallMenu = () => {
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
    return (
        <>
            {
                menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <NavLink
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            href="#"
                            size="lg"
                        >
                            {item}
                        </NavLink>
                    </NavbarMenuItem>
                ))
            }
        </>
    );
};

export default SmallMenu;