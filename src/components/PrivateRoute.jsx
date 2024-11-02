// components/PrivateRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useUser } from '../UserContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { userRole } = useUser();

  return (
    <Route
      {...rest}
      element={userRole ? Component : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
