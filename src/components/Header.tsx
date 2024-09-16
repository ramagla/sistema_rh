import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #004a8c; /* Azul mais escuro */
  color: white;
  align-items: center; /* Alinha os itens ao centro verticalmente */
`;

const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <h1>Sistema de Envio de Holerites</h1>
      <Link to="/logout">
        <LogoutButton>Sair</LogoutButton>
      </Link>
    </HeaderContainer>
  );
};

export default Header;
