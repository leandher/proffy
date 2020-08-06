import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
import api from '../../services/api';

export interface Teacher {
  id: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
  subject: string;
  cost: number;
}

interface Props {
  teacher: Teacher;
}

const TeacherItem: React.FC<Props> = ({
  teacher: { id, name, avatar, bio, subject, cost, whatsapp },
}) => {
  const handleCreateNewConnection = () => {
    api.post('connections', {
      user_id: id,
    });
  };

  return (
    <article className="teacher-item">
      <header>
        <img src={avatar} alt={name} />
        <div>
          <strong>{name}</strong>
          <span>{subject}</span>
        </div>
      </header>

      <p>{bio}</p>

      <footer>
        <p>
          Preço/hora:
          <strong>
            R$ {Number(cost).toFixed(2).toString().replace('.', ',')}
          </strong>
        </p>
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCreateNewConnection}
        >
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
