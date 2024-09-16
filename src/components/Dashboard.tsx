import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Bar, Pie } from 'react-chartjs-2';

const DashboardContainer = styled.div`
  padding: 20px;
`;

const StatCard = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
`;

const StatTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 18px;
`;

const StatValue = styled.p`
  font-size: 24px;
  font-weight: bold;
`;

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    total_holerites: 0,
    sucesso_holerites: 0,
    erros_holerites: 0,
  });

  useEffect(() => {
    // Busca os dados do backend
    fetch('http://localhost:5000/api/dashboard-stats', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setStats(data))
      .catch((error) => console.error('Erro ao buscar dados do dashboard:', error));
  }, []);

  const barData = {
    labels: ['Total', 'Sucesso', 'Erros'],
    datasets: [
      {
        label: 'Holerites Enviados',
        data: [stats.total_holerites, stats.sucesso_holerites, stats.erros_holerites],
        backgroundColor: ['#36a2eb', '#4caf50', '#ff6384'],
      },
    ],
  };

  const pieData = {
    labels: ['Sucesso', 'Erros'],
    datasets: [
      {
        data: [stats.sucesso_holerites, stats.erros_holerites],
        backgroundColor: ['#4caf50', '#ff6384'],
      },
    ],
  };

  return (
    <DashboardContainer>
      <h2>Dashboard do Sistema</h2>

      <StatCard>
        <StatTitle>Total de Holerites Enviados</StatTitle>
        <StatValue>{stats.total_holerites}</StatValue>
      </StatCard>

      <StatCard>
        <StatTitle>Sucesso no Envio</StatTitle>
        <StatValue>{stats.sucesso_holerites}</StatValue>
      </StatCard>

      <StatCard>
        <StatTitle>Erros no Envio</StatTitle>
        <StatValue>{stats.erros_holerites}</StatValue>
      </StatCard>

      <StatCard>
        <h3>Gráfico de Barras</h3>
        <Bar data={barData} />
      </StatCard>

      <StatCard>
        <h3>Gráfico de Pizza</h3>
        <Pie data={pieData} />
      </StatCard>
    </DashboardContainer>
  );
};

export default Dashboard;
