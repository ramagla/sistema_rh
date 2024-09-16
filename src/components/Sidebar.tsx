import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.nav`
  width: 200px;
  background-color: #282c34;
  padding: 20px;
  height: 100vh;
  color: white;
`;

const SidebarList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const SidebarItem = styled.li`
  margin-bottom: 10px;
`;

const SidebarLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <SidebarList>
        <SidebarItem><SidebarLink to="/configuracoes">Configurações</SidebarLink></SidebarItem>
        <SidebarItem><SidebarLink to="/extracao-arquivos">Extração de Arquivos</SidebarLink></SidebarItem>
        <SidebarItem><SidebarLink to="/envio-holerites">Envio de Holerites</SidebarLink></SidebarItem>
        <SidebarItem><SidebarLink to="/relatorios">Relatórios</SidebarLink></SidebarItem>
        <SidebarItem><SidebarLink to="/">Home</SidebarLink></SidebarItem>
      </SidebarList>
    </SidebarContainer>
  );
};

export default Sidebar;
