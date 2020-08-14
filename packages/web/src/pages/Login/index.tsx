import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/auth';
import logo from '../../assets/images/logo.svg';
import background from '../../assets/images/background.svg';
import purpleHeart from '../../assets/images/icons/purple-heart.svg';

import './styles.css';

const Login: React.FC = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    await login(email, password);
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <div id="page-login">
      <div id="page-login-content">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
          <img src={background} alt="Logo" className="background-img" />
          <h2>Sua plataforma de estudos online</h2>
        </div>

        <div className="form-container">
          <form onSubmit={handleLogin}>
            <h1>Fazer login</h1>
            <input
              type="text"
              placeholder="Usuário"
              value={email}
              onChange={handleChangeEmail}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={handleChangePassword}
              required
            />
            <div className="forgot-password">
              <Link to="/forgot-password">Esqueci minha senha</Link>
            </div>
            <button type="submit">Entrar</button>
          </form>

          <footer>
            <div className="register">
              <span>Não tem conta?</span>
              <Link to="/register">Cadastre-se</Link>
            </div>
            <span className="isFree">
              É de graça
              <img src={purpleHeart} alt="Coração roxo" />
            </span>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Login;
