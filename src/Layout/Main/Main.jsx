import React from 'react';

import { Outlet } from 'react-router-dom';
import Footer from '../../Pages/Footer/Footer';
import Header from '../../Pages/Header/Header';

const Main = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default Main;