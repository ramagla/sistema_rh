import React, { useState } from 'react';

const RenamePage: React.FC = () => {
  const [currentFileName, setCurrentFileName] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleRename = () => {
    if (!currentFileName || !newFileName) {
      alert('Por favor, insira o nome atual e o novo nome do arquivo.');
      return;
    }

    fetch('http://localhost:5000/api/renomear-arquivo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        arquivo_atual: currentFileName,
        novo_nome: newFileName,
      }),
    })
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error('Erro ao renomear arquivo:', error));
  };

  return (
    <div>
      <h2>Renomeação de Arquivos</h2>
      <input
        type="text"
        placeholder="Nome atual do arquivo"
        value={currentFileName}
        onChange={(e) => setCurrentFileName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Novo nome do arquivo"
        value={newFileName}
        onChange={(e) => setNewFileName(e.target.value)}
      />
      <button onClick={handleRename}>Renomear Arquivo</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RenamePage;
