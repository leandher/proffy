import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import logo from '../../assets/images/logo.svg';
import landing from '../../assets/images/landing.svg';
import study from '../../assets/images/icons/study.svg';
import giveClasses from '../../assets/images/icons/give-classes.svg';
import purpleHeart from '../../assets/images/icons/purple-heart.svg';
import logoutIcon from '../../assets/images/icons/logout.svg';
import userIcon from '../../assets/images/icons/user.svg';
import { useAuth } from '../../contexts/auth';

import './styles.css';

interface TotalConnectionResponse {
  total: number;
}

const Landing: React.FC = () => {
  const { user, logout } = useAuth();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotalConnections = async () => {
      const { data } = await api.get<TotalConnectionResponse>('connections');

      setTotal(data.total);
    };

    getTotalConnections();
  }, []);
  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <header>
          <div className="user-information">
            <img src={user?.avatar || userIcon} alt="Avatar" />
            <span>{`${user?.name} ${user?.lastName}`}</span>
          </div>

          <div role="button" className="button" onClick={logout}>
            <img src={logoutIcon} alt="logout" />
          </div>
        </header>

        <div className="logo-container">
          <img src={logo} alt="Logo" />
          <h2>Sua plataforma de estudos online</h2>
        </div>

        <img src={landing} alt="Plataforma de estudos" className="hero-image" />

        <span className="welcome">
          Seja bem-vindo. <b>O que deseja fazer?</b>
        </span>

        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={study} alt="Estudar" />
            Estudar
          </Link>
          <Link to="/give-classes" className="give-classes">
            <img src={giveClasses} alt="Dar aula" />
            Dar aulas
          </Link>
        </div>

        <span className="total-connections">
          Total de {total} conexões realizadas{' '}
          <img src={purpleHeart} alt="Coração roxo" />
        </span>
      </div>
    </div>
  );
};

export default Landing;
