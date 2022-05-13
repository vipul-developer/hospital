import React from 'react';
import { AuthStatus } from '../../Protected';
const User = (props) => {
    return (
        <AuthStatus>
            {props.children}
        </AuthStatus>
    );
};

export default User;