import React from 'react';
import useAuth from '../../CustomHook/useAuth';
import useInstructor from '../../CustomHook/useInstructor';
import { Navigate, useLocation } from 'react-router-dom';
import SplashLoader from '../../Component/SplashLoader/SplashLoader';

const Instructor = ({ children }) => {
    const { user, loading } = useAuth();
    const [isInstructor, isInstructorLoading] = useInstructor();
    const location = useLocation();

    if (loading || isInstructorLoading) {
        return <SplashLoader />
    }

    if (user && isInstructor) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

export default Instructor;