import React, { createContext, useState, useContext, useEffect } from 'react';
import { useEffectOnce } from 'react-use';

import { AxiosResponse } from 'axios';

import usePersistedState from '../hooks/usePersistedState';
import api from '../services/api';

interface User {
  name: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
  bio?: string;
}

interface AuthContextData {
  signed: boolean;
  isLoading: boolean;
  user: User | null;
  login(email: string, password: string): Promise<void>;
  logout(): void;
}

interface LoginResponse {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = usePersistedState<User | null>('user', null);
  const [token, setToken] = usePersistedState<string>('token', '');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await api.post<LoginResponse>('users/login', {
        email,
        password,
      });
      const { data } = response;

      setUser(data.user);
      setToken(data.token);
    } catch (error) {
      console.error(error.message);
    }
    setIsLoading(false);
  };

  const logout = () => {
    setToken('');
    setUser(null);
  };

  useEffect(() => {
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
    setIsLoading(false);
  }, [token]);

  useEffectOnce(() => {
    api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error?.response?.status === 401) {
          console.error('Sessão expirada!');
          logout();
        }
        return Promise.reject(error);
      }
    );
  });

  return (
    <AuthContext.Provider
      value={{ signed: !!(user && token), user, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  return context;
};
