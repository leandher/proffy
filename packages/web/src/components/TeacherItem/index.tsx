import React from 'react';

import whatsapp from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://pbs.twimg.com/profile_images/1254969316140888065/gVorJXWT_400x400.jpg"
          alt="Leandher"
        />
        <div>
          <strong>Leandher</strong>
          <span>Física</span>
        </div>
      </header>

      <p>
        Apaixonado por Física
        <br />
        <br />
        lorem ipsum dolor sit amet, consectet
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 80,00</strong>
        </p>
        <button type="button">
          <img src={whatsapp} alt="Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;
