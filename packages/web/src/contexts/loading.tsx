import React, { createContext, useContext, useState } from 'react';

interface LoadingContextData {
  loading: boolean;
  onLoading(value: boolean): void;
}

const LoadingContext = createContext<LoadingContextData>({ loading: false } as LoadingContextData);

export const LoadingProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const onLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  return (
    <LoadingContext.Provider
      value={{
        loading,
        onLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextData => {
  const context = useContext(LoadingContext);

  return context;
};
