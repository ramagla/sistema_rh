import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Para redirecionar após login

  const handleLogin = async () => {
    // Verificação de campos vazios
    if (!username || !password) {
      setError('Usuário e senha são obrigatórios');
      return;
    }

    try {
      const response = await fetch('https://ramagla.pythonanywhere.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Adicione esta linha para incluir as credenciais
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 401) {
        setError('Usuário ou senha incorretos');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Erro ao fazer login');
        return;
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);  // Armazena o token JWT no localStorage
      navigate('/');  // Redireciona para a página principal
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Erro ao fazer login, tente novamente mais tarde.');
    }
  };

  return (
    <LoginContainer>
      <h2>Login</h2>
      <Input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>Entrar</Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </LoginContainer>
  );
};

export default LoginPage;
