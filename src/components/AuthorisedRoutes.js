import React from 'react';
import Unauthorized from './Unauthorized';
import UserSession from '../services/auth';

function PrivateRoute({ element: Component, path }) {
    return (UserSession.getUserPermissions()?.filter(permission => permission.application === "ump").find(permission => permission.permission === path) !== undefined) || UserSession.isAdmin() ? <Component /> : <Unauthorized />;
}

export default PrivateRoute;
