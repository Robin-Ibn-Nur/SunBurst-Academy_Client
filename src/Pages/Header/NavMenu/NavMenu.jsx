import React from 'react';
import useAuth from '../../../CustomHook/useAuth';
import { NavLink } from 'react-router-dom';

const NavMenu = () => {
    const { user } = useAuth();
    return (
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
            {!user && <NavLink
                to="/dashbord"
                className={({ isActive, isPending }) => isActive ? "active-link" : isPending ? "" : ""}
            >
                Dashbord
            </NavLink>}
        </>
    );
};

export default NavMenu;