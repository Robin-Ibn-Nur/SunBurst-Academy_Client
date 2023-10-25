import React from 'react';
import Header from '../../Pages/Header/Header';
import { Outlet } from 'react-router-dom';
import DashbordMenu from './DashbordMenu';
import { useEffect } from 'react';
import { useState } from 'react';
import useAuth from '../../CustomHook/useAuth';
import SplashLoader from '../../Component/SplashLoader/SplashLoader';

const Dashbord = () => {
    const { user, loading } = useAuth();
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    if (loading || showLoader) {
        return <SplashLoader />
    }
    return (
        <>
            <Header />
            <div className='flex items-center gap-2 h-screen'>
                <DashbordMenu />
                <Outlet />
            </div>
        </>
    );
};

export default Dashbord;