import React from 'react';

import Spinner from '../components/Spinner';
import { useAuth } from '../contexts/auth';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {
  const { signed, isLoading } = useAuth();

  if (isLoading) return <Spinner isLoading={isLoading} />;

  if (!signed) return <AuthRoutes />;

  return <AppRoutes />;
};

export default Routes;
