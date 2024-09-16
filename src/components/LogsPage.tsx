import React, { useEffect, useState } from 'react';

const LogsPage: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/logs', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setLogs(data))
      .catch((error) => console.error('Erro ao buscar logs:', error));
  }, []);

  return (
    <div>
      <h2>Logs de Auditoria</h2>
      {logs.length > 0 ? (
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
