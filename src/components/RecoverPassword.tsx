import React, { useState } from 'react';

const RecoverPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRecover = () => {
    fetch('http://localhost:5000/api/recover-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error('Erro ao solicitar recuperação de senha:', error));
  };

  return (
    <div>
      <h2>Recuperação de Senha</h2>
      <input
        type="email"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleRecover}>Recuperar Senha</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RecoverPassword;
