import React from 'react';
import useAuth from '../../CustomHook/useAuth';
import useAdmin from '../../CustomHook/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import SplashLoader from '../../Component/SplashLoader/SplashLoader';

const Admin = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <SplashLoader />
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

export default Admin;