import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ConfigPage from './components/ConfigPage';
import ExtractionPage from './components/ExtractionPage';
import SendPage from './components/SendPage';
import ReportPage from './components/ReportPage';
import Dashboard from './components/Dashboard';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
`;

const App: React.FC = () => {
  return (
    <Router>
      <AppContainer>
        <Sidebar />
        <ContentContainer>
          <Header />
          <MainContent>
            <Routes>
              <Route path="/configuracoes" element={<ConfigPage />} />
              <Route path="/extracao-arquivos" element={<ExtractionPage />} />
              <Route path="/envio-holerites" element={<SendPage />} />
              <Route path="/relatorios" element={<ReportPage />} />
              <Route path="/" element={<Dashboard />} /> {/* Definindo Dashboard como rota padrão */}
            </Routes>
          </MainContent>
        </ContentContainer>
      </AppContainer>
    </Router>
  );
};

export default App;
