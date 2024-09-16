import React, { useEffect, useState } from 'react';

const LogsPage: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null); // Estado para exibir erros

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Você não está autenticado. Faça login para ver os logs.');
      return;
    }

    fetch('http://localhost:5000/api/logs', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setLogs(data))
      .catch((error) => {
        console.error('Erro ao buscar logs:', error);
        setError('Erro ao buscar logs');
      });
  }, []);

  return (
    <div>
      <h2>Logs de Auditoria</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : logs.length > 0 ? (
        <ul>
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      ) : (
        <p>Nenhum log disponível</p>
      )}
    </div>
  );
};

export default LogsPage;
