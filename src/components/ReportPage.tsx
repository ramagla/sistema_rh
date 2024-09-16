import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

const ReportContainer = styled.div`
  padding: 20px;
`;

const ButtonGroup = styled.div`
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 15px;
  margin-right: 10px;
  background-color: #61dafb;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #21a1f1;
  }
`;

const ErrorTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f8f9fa;
  }
`;

const Result = styled.div<{ success: boolean }>`
  margin-top: 10px;
  padding: 10px;
  background-color: ${(props) => (props.success ? '#d4edda' : '#f8d7da')};
  border: 1px solid ${(props) => (props.success ? '#c3e6cb' : '#f5c6cb')};
  color: ${(props) => (props.success ? '#155724' : '#721c24')};
`;

interface Report {
  timestamp: string;
  nome: string;
  email: string;
  status: string;  // "Sucesso" ou "Erro"
}

const ReportPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState<'all' | 'success' | 'error'>('all');

  useEffect(() => {
  const fetchReports = async () => {
    try {
      const token = localStorage.getItem('token');  // Verifique se o token está disponível
      if (!token) {
        console.error('Token não encontrado');
        return;
      }

      const response = await fetch('http://localhost:5000/api/relatorios', {
        headers: {
          'Authorization': `Bearer ${token}`,  // Certifique-se de que o token está no formato correto
        },
      });

      if (response.status === 401) {
        console.error('Não autorizado');
        return;
      }

      const data = await response.json();
      console.log('Relatórios recebidos:', data);

      if (Array.isArray(data)) {
        setReports(data);
      } else {
        console.error('Resposta inesperada: não é um array', data);
      }
    } catch (error) {
      console.error('Erro ao buscar relatórios:', error);
    }
  };

  fetchReports();
}, []);




  // Filtrar os relatórios com base no status de sucesso ou erro
  const filteredReports = Array.isArray(reports) ? reports.filter((report) => {
  if (filter === 'success') return report.status === 'Sucesso';
  if (filter === 'error') return report.status.startsWith('Erro');
  return true;
}) : [];


  // Função para exportar os relatórios de erro em PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Relatório de Erros no Envio de Holerites', 10, 10);
    let y = 20;

    filteredReports
      .filter((report) => report.status.startsWith('Erro'))
      .forEach((report, index) => {
        doc.text(
          `${index + 1}. ${report.nome} (${report.email}) - Status: ${report.status} - Data: ${report.timestamp}`,
          10,
          y
        );
        y += 10;
      });

    doc.save('relatorio-erros-envio.pdf');
  };

  // Função para exportar relatórios em Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredReports.map((report) => ({
        Nome: report.nome,
        Email: report.email,
        Status: report.status,
        'Data/Hora': report.timestamp,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Relatórios');
    XLSX.writeFile(wb, 'relatorio-envios.xlsx');
  };

  return (
    <ReportContainer>
      <h2>Relatórios de Envio</h2>

      <ButtonGroup>
        <Button onClick={() => setFilter('all')}>Todos</Button>
        <Button onClick={() => setFilter('success')}>Sucesso</Button>
        <Button onClick={() => setFilter('error')}>Erro</Button>
        <Button onClick={exportPDF}>Exportar PDF</Button>
        <Button onClick={exportExcel}>Exportar Excel</Button>
      </ButtonGroup>

      return (
  <div>
    {Array.isArray(reports) && filteredReports.length > 0 ? (
      <div>
        {filteredReports.map((report, index) => (
          <Result key={index} success={report.status === 'Sucesso'}>
            {report.nome} ({report.email}): {report.status}
          </Result>
        ))}
        {/* Tabela de erros */}
        {filter === 'error' && (
          <ErrorTable>
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Status</th>
                <th>Data/Hora</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports
                .filter((report) => report.status.startsWith('Erro'))
                .map((report, index) => (
                  <tr key={index}>
                    <td>{report.nome}</td>
                    <td>{report.email}</td>
                    <td>{report.status}</td>
                    <td>{report.timestamp}</td>
                  </tr>
                ))}
            </tbody>
          </ErrorTable>
        )}
      </div>
    ) : (
      <p>Nenhum relatório disponível para esta categoria.</p>
    )}
  </div>
);

    </ReportContainer>
  );
};

export default ReportPage;
