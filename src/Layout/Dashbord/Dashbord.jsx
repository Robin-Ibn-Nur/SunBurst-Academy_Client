import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import DashbordMenu from './DashbordMenu';
import { useEffect } from 'react';
import { useState } from 'react';
import useAuth from '../../CustomHook/useAuth';
import SplashLoader from '../../Component/SplashLoader/SplashLoader';
import Header from '../../Pages/Header/Header';


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
        return <SplashLoader />;
    }

    return (
        // <>
        //     <div className="flex items-center gap-2 h-screen">
        //         {/* <Logo /> */}
        //         {/* <Outlet /> */}
        //         <div className="flex flex-row gap-48 h-screen w-full">
        //             {/* Side Menu */}
        //             <div className="flex flex-col bg-gray-800 w-64">
        //                 <div className="flex items-center justify-center h-20 border-b border-gray-700">
        //                     <img
        //                         className="h-10 w-10 rounded-full"
        //                         src={user?.avatar}
        //                         alt="User Profile"
        //                     />
        //                     <h3 className="mx-2 text-white">{user?.name}</h3>
        //                 </div>
        //                 <DashbordMenu />
        //             </div>
        //             {/* Dashboard Content */}
        //             <div className="flex-1 flex items-center justify-center">
        //                 <Outlet />
        //             </div>
        //         </div>
        //     </div>

        // </>
        <div className='h-screen'>
            <Header />
            <Outlet />
        </div>
    );
};

export default Dashbord;
