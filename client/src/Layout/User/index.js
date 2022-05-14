import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../../Component/Navigation/Header";
const User = () => {
    return (
        <>
            <Header>
                <Outlet/>
            </Header>
        </>
    );
};

export default User;