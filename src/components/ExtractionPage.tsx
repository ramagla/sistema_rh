import React, { useState } from 'react';
import styled from 'styled-components';

const ExtractionContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Alinha o conteúdo à esquerda */
`;

const Button = styled.button`
  padding: 10px 15px;
  margin-top: 10px;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const ChooseFileButton = styled(Button)`
  background-color: #007bff; /* Azul */
`;

const ProcessButton = styled(Button)`
  background-color: #28a745; /* Verde */
`;

const DownloadButton = styled(Button)`
  background-color: #17a2b8; /* Azul claro */
`;

const LogContainer = styled.div`
  margin-top: 20px;
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
`;

const LogItem = styled.div`
  margin-bottom: 5px;
  background-color: #e9ecef;
  padding: 10px;
  border-radius: 5px;
`;

const ExtractionPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setLogs((prevLogs) => [...prevLogs, 'Arquivo selecionado para processamento.']);
    }
  };

  const handleExtractAndRename = () => {
    if (!file) {
      alert('Por favor, selecione um arquivo PDF.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLogs((prevLogs) => [...prevLogs, 'Iniciando o processamento do arquivo...']);

    fetch('https://ramagla.pythonanywhere.com/api/dividir-renomear-zipar-pdf', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,  // Envia o token JWT no cabeçalho
      },
      body: formData,
    })
      .then((response) => {
        if (response.status === 401) {
          alert('Sessão expirada. Por favor, faça login novamente.');
          setLogs((prevLogs) => [...prevLogs, 'Erro: sessão expirada.']);
          return;
        }
        setLogs((prevLogs) => [...prevLogs, 'Arquivo processado com sucesso. Gerando arquivo zip...']);
        return response.blob();  // Recebe o arquivo zip como blob
      })
      .then((blob) => {
        if (blob) {
          // Cria uma URL temporária para o arquivo zip
          const url = window.URL.createObjectURL(blob);
          setDownloadUrl(url);
          setLogs((prevLogs) => [...prevLogs, 'Arquivo zip gerado e pronto para download.']);
        } else {
          console.error('Erro ao processar o arquivo: blob indefinido');
          setLogs((prevLogs) => [...prevLogs, 'Erro ao processar o arquivo.']);
        }
      })
      .catch((error) => {
        console.error('Erro ao processar o arquivo:', error);
        setLogs((prevLogs) => [...prevLogs, 'Erro ao processar o arquivo: ' + error.message]);
      });
  };

  return (
    <ExtractionContainer>
      <h2>Dividir, Renomear e Compactar Arquivo PDF</h2>
      <input
        type="file"
        accept=".pdf"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        id="fileInput"
      />
      <ChooseFileButton onClick={() => document.getElementById('fileInput')?.click()}>
        Escolher Arquivo
      </ChooseFileButton>
      <ProcessButton onClick={handleExtractAndRename}>
        Processar PDF
      </ProcessButton>

      {downloadUrl && (
        <div style={{ marginTop: '20px' }}>
          <h3>Arquivo Processado:</h3>
          <DownloadButton>
            <a href={downloadUrl} download="arquivos_renomeados.zip" style={{ color: 'white', textDecoration: 'none' }}>
              Baixar Arquivo Zipado
            </a>
          </DownloadButton>
        </div>
      )}

      {/* Exibir log do processo */}
      <LogContainer>
        <h3>Log do Processo:</h3>
        {logs.map((log, index) => (
          <LogItem key={index}>{log}</LogItem>
        ))}
      </LogContainer>
    </ExtractionContainer>
  );
};

export default ExtractionPage;
