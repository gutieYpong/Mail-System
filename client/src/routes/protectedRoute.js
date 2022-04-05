import React from 'react';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';


const ProtectedRoute = props => {
  const {
    redirectPath = '/login',
    children
  } = props;
  const auth = useSelector( state => state.persistedReducer.auth );

  if (!auth.account) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;