import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as XLSX from 'xlsx';

const ReportContainer = styled.div`
  padding: 20px;
`;

const ButtonGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 10px; /* Adiciona espaço entre os botões */
`;

const Button = styled.button`
  font-size: 0.875rem; /* Reduz o tamanho da fonte */
  padding: 8px 12px; /* Ajusta o preenchimento interno */
  border-radius: 4px; /* Adiciona bordas arredondadas */
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  &.btn-primary {
    background-color: #007bff;
    color: white;
  }

  &.btn-success-light {
    background-color: #28a745;
    color: white;
  }

  &.btn-danger {
    background-color: #dc3545;
    color: white;
  }

  &.btn-dark {
    background-color: #343a40;
    color: white;
  }
`;

const DateInput = styled.input`
  font-size: 0.875rem; /* Reduz o tamanho da fonte */
  padding: 8px; /* Ajusta o preenchimento interno */
  border-radius: 4px; /* Adiciona bordas arredondadas */
  border: 1px solid #ccc;
  width: 100%; /* Ajusta o campo para preencher a largura disponível */
  box-sizing: border-box; /* Inclui o padding e border na largura total */
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
  status: string; // "Sucesso" ou "Erro"
}

const ReportPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState<'all' | 'success' | 'error'>('all');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token não encontrado');
          return;
        }

        const response = await fetch('http://localhost:5000/api/relatorios', {
          headers: {
            Authorization: `Bearer ${token}`,
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

  const filterByDate = (report: Report) => {
    const reportDate = new Date(report.timestamp).getTime();
    const start = startDate ? new Date(startDate).getTime() : null;
    const end = endDate ? new Date(endDate).getTime() : null;

    if (start && end) {
      return reportDate >= start && reportDate <= end;
    }
    if (start) {
      return reportDate >= start;
    }
    if (end) {
      return reportDate <= end;
    }
    return true;
  };

  const filteredReports = Array.isArray(reports)
    ? reports.filter((report) => {
        const statusFilter =
          filter === 'all' ||
          (filter === 'success' && report.status === 'Sucesso') ||
          (filter === 'error' && report.status.startsWith('Erro'));
        return statusFilter && filterByDate(report);
      })
    : [];

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

      <div className="row mb-3">
        <div className="col">
          <label>Data Inicial:</label>
          <DateInput
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col">
          <label>Data Final:</label>
          <DateInput
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <ButtonGroup className="btn-group">
        <Button className="btn-primary" onClick={() => setFilter('all')}>
          Todos
        </Button>
        <Button className="btn-success-light" onClick={() => setFilter('success')}>
          Sucesso
        </Button>
        <Button className="btn-danger" onClick={() => setFilter('error')}>
          Erro
        </Button>
        <Button className="btn-dark" onClick={exportExcel}>
          Exportar Excel
        </Button>
      </ButtonGroup>

      {Array.isArray(reports) && filteredReports.length > 0 ? (
        <div>
          {filteredReports.map((report, index) => (
            <div
              key={index}
              style={{
                backgroundColor: report.status === 'Sucesso' ? '#d4edda' : '#f8d7da',
                border: report.status === 'Sucesso' ? '1px solid #c3e6cb' : '1px solid #f5c6cb',
                color: report.status === 'Sucesso' ? '#155724' : '#721c24',
                padding: '10px',
                marginTop: '10px',
              }}
            >
              {report.nome} ({report.email}): {report.status}
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhum relatório disponível para esta categoria.</p>
      )}
    </ReportContainer>
  );
};

export default ReportPage;
