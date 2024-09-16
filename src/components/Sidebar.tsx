import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import image from '../images/Logo Bras-Mol-Model-Branco.png';
import styled from 'styled-components';

const SidebarContainer = styled.nav`
  width: 200px;
  background-color: #004a8c; /* Cor de fundo do sidebar */
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.img`
  width: 120px;
  margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
  color: white; /* Altera a cor do texto para branco */
  font-family: 'Arial', sans-serif; /* Define a fonte para Arial; substitua com a fonte desejada */
  font-weight: bold; /* Torna o texto mais chamativo */
  text-decoration: none; /* Remove o sublinhado padrão */
  display: block;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;

  &.active {
    background-color: #0056b3; /* Cor de fundo para o item ativo */
    color: white; /* Garante que a cor do texto do item ativo seja branca */
  }

  &:hover {
    text-decoration: underline; /* Adiciona um sublinhado ao passar o mouse */
  }
`;

const Sidebar: React.FC = () => {
  const location = useLocation();

  // Função para determinar se o link deve ser ativo
  const isActive = (path: string) => location.pathname === path;

  return (
    <SidebarContainer>
      <div className="text-center mb-4">
        {/* Logo envolvido no Link que redireciona para a home */}
        <Link to="/">
          <Logo src={image} alt="Logo" />
        </Link>
      </div>
      <ul className="nav flex-column mb-auto">
        <li className="nav-item mb-2">
          <StyledLink
            to="/extracao-arquivos"
            className={isActive('/extracao-arquivos') ? 'active' : ''}
          >
            Extração de Arquivos
          </StyledLink>
        </li>
        <li className="nav-item mb-2">
          <StyledLink
            to="/envio-holerites"
            className={isActive('/envio-holerites') ? 'active' : ''}
          >
            Envio de Holerites
          </StyledLink>
        </li>
        <li className="nav-item mb-2">
          <StyledLink
            to="/relatorios"
            className={isActive('/relatorios') ? 'active' : ''}
          >
            Relatórios
          </StyledLink>
        </li>
        <li className="nav-item mb-2">
          <StyledLink
            to="/"
            className={isActive('/') ? 'active' : ''}
          >
            Home
          </StyledLink>
        </li>
      </ul>
      <footer className="mt-auto text-center text-white">
        <div className="mb-2">
          Desenvolvido por{' '}
          <a
            href="https://portif-lio-iota-nine.vercel.app/"
            className="text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rafael Almeida
          </a>
        </div>
        <div className="small mt-2">
          Versão 1.0
        </div>
      </footer>
    </SidebarContainer>
  );
};

export default Sidebar;
