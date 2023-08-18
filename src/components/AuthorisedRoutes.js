import React from 'react';
import Unauthorized from './Unauthorized';
import UserSession from '../services/auth';

function PrivateRoute({ element: Component, path }) {
    return (UserSession.isPageAllowed(path) || UserSession.isAdmin()) ? <Component /> : <Unauthorized />;
}

export default PrivateRoute;
