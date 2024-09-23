import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #004a8c; /* Azul mais escuro */
  color: white;
  align-items: center; /* Alinha os itens ao centro verticalmente */
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <h1>Sistema de Envio de Holerites</h1>
    </HeaderContainer>
  );
};

export default Header;
