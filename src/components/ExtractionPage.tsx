import React, { useState } from 'react';

const ExtractionPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleExtractAndRename = () => {
    if (!file) {
      alert('Por favor, selecione um arquivo PDF.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:5000/api/dividir-renomear-zipar-pdf', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,  // Envia o token JWT no cabeçalho
      },
      body: formData,
    })
      .then((response) => {
        if (response.status === 401) {
          alert('Sessão expirada. Por favor, faça login novamente.');
          return;
        }
        return response.blob();  // Recebe o arquivo zip como blob
      })
      .then((blob) => {
        if (blob) {
          // Cria uma URL temporária para o arquivo zip
          const url = window.URL.createObjectURL(blob);
          setDownloadUrl(url);
        } else {
          console.error('Erro ao processar o arquivo: blob indefinido');
        }
      })
      .catch((error) => console.error('Erro ao processar o arquivo:', error));
  };

  return (
    <div>
      <h2>Dividir, Renomear e Compactar Arquivo PDF</h2>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleExtractAndRename}>Processar PDF</button>
      {downloadUrl && (
        <div>
          <h3>Arquivo Processado:</h3>
          <a href={downloadUrl} download="arquivos_renomeados.zip">Baixar Arquivo Zipado</a>
        </div>
      )}
    </div>
  );
};

export default ExtractionPage;
