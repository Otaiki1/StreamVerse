import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAddress } from '@thirdweb-dev/react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const address = useAddress()

  if (!address) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;