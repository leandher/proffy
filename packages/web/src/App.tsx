import React from 'react';

import Routes from './routes';
import AppProvider from './contexts';

import './styles/global.css';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
};

export default App;
