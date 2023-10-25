import React from 'react';
import useAuth from '../../CustomHook/useAuth';
import useStudent from '../../CustomHook/useStudent';
import { Navigate, useLocation } from 'react-router-dom';
import SplashLoader from '../../Component/SplashLoader/SplashLoader';

const Student = () => {
    const { user, loading } = useAuth()
    const [isStudent, isStudentLoading] = useStudent()
    const location = useLocation()
    if (loading && isStudentLoading) {
        return <SplashLoader />
    }
    if (user && isStudent) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default Student;