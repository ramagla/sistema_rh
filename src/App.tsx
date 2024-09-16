import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ConfigPage from './components/ConfigPage';
import ExtractionPage from './components/ExtractionPage';
import SendPage from './components/SendPage';
import ReportPage from './components/ReportPage';
import LoginPage from './components/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import Logout from './components/Logout';
import Dashboard from './components/Dashboard';
import { debug } from 'console';

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
              <Route path="/login" element={<LoginPage />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/configuracoes" element={<PrivateRoute><ConfigPage /></PrivateRoute>} />
              <Route path="/extracao-arquivos" element={<PrivateRoute><ExtractionPage /></PrivateRoute>} />
              <Route path="/envio-holerites" element={<PrivateRoute><SendPage /></PrivateRoute>} />
              <Route path="/relatorios" element={<PrivateRoute><ReportPage /></PrivateRoute>} />
              <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> {/* Definindo Dashboard como rota padrão */}
            </Routes>
          </MainContent>
        </ContentContainer>
      </AppContainer>
    </Router>
  );
};


export default App;

