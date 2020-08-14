import React from 'react';

import { AuthProvider } from './auth';
import { LoadingProvider } from './loading';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <LoadingProvider>{children}</LoadingProvider>
    </AuthProvider>
  );
};

export default AppProvider;
