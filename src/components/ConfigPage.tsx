import React, { useState } from 'react';
import styled from 'styled-components';

const ConfigContainer = styled.div`
  padding: 20px;
`;

const Input = styled.input`
  padding: 8px;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 15px;
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

const Message = styled.p<{ success: boolean }>`
  color: ${(props) => (props.success ? 'green' : 'red')};
  font-weight: bold;
`;

const ConfigPage: React.FC = () => {
  const [smtpHost, setSmtpHost] = useState('');
  const [smtpPort, setSmtpPort] = useState('');
  const [smtpUser, setSmtpUser] = useState('');
  const [smtpPassword, setSmtpPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleSave = async () => {
    if (
      smtpHost.trim() === '' ||
      smtpPort.trim() === '' ||
      smtpUser.trim() === '' ||
      smtpPassword.trim() === ''
    ) {
      setMessage('Todos os campos são obrigatórios.');
      setSuccess(false);
      return;
    }

    const token = localStorage.getItem('token');  // Obtém o token JWT do localStorage
    if (!token) {
      setMessage('Usuário não autenticado.');
      setSuccess(false);
      return;
    }

    // Salvar as configurações no backend
    const response = await fetch('http://localhost:5000/api/configuracoes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // Envia o token JWT no cabeçalho
      },
      body: JSON.stringify({
        smtpHost,
        smtpPort,
        smtpUser,
        smtpPassword,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      setMessage('Configurações salvas com sucesso!');
      setSuccess(true);
    } else {
      setMessage(`Erro ao salvar configurações: ${result.message}`);
      setSuccess(false);
    }
  };

  return (
    <ConfigContainer>
      <h2>Configurações SMTP</h2>
      <label>Host SMTP:</label>
      <Input
        type="text"
        value={smtpHost}
        onChange={(e) => setSmtpHost(e.target.value)}
        placeholder="Digite o host SMTP"
      />
      <label>Porta SMTP:</label>
      <Input
        type="text"
        value={smtpPort}
        onChange={(e) => setSmtpPort(e.target.value)}
        placeholder="Digite a porta SMTP"
      />
      <label>Usuário SMTP (e-mail):</label>
      <Input
        type="text"
        value={smtpUser}
        onChange={(e) => setSmtpUser(e.target.value)}
        placeholder="Digite o e-mail do usuário SMTP"
      />
      <label>Senha SMTP:</label>
      <Input
        type="password"
        value={smtpPassword}
        onChange={(e) => setSmtpPassword(e.target.value)}
        placeholder="Digite a senha do SMTP"
      />
      <Button onClick={handleSave}>Salvar Configuração</Button>

      {message && <Message success={success!}>{message}</Message>}
    </ConfigContainer>
  );
};

export default ConfigPage;
