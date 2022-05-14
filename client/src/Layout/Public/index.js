import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../../Component/Navigation/NavBar';
const Public = () => {
    return (
        <>
            <NavBar/>
            <Outlet/>
        </>
    );
};

export default Public;