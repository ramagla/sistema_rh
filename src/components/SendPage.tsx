import React, { useState } from 'react';
import styled from 'styled-components';

const SendContainer = styled.div`
  padding: 20px;
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

const Input = styled.input`
  padding: 8px;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FeedbackMessage = styled.p<{ success: boolean | undefined }>`
  margin-top: 20px;
  color: ${(props) => (props.success ? '#155724' : '#721c24')};
  background-color: ${(props) => (props.success ? '#d4edda' : '#f8d7da')};
  padding: 10px;
  border: 1px solid ${(props) => (props.success ? '#c3e6cb' : '#f5c6cb')};
`;

const Result = styled.div<{ success: boolean | undefined }>`
  margin-top: 20px;
  padding: 10px;
  background-color: ${(props) => (props.success ? '#d4edda' : '#f8d7da')};
  border: 1px solid ${(props) => (props.success ? '#c3e6cb' : '#f5c6cb')};
  color: ${(props) => (props.success ? '#155724' : '#721c24')};
`;

interface Funcionario {
  id: number;
  nome: string;
  email: string;
}

const SendPage: React.FC = () => {
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState<{ message: string; success: boolean } | null>(null);

  const handleZipFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setZipFile(file);
    }
  };

  const handleExcelFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setExcelFile(file);
    }
  };

  const handleSend = async () => {
  if (!zipFile || !excelFile) {
    setFeedback({ message: 'Ambos os arquivos são necessários.', success: false });
    return;
  }

  const formData = new FormData();
  formData.append('zipfile', zipFile);
  formData.append('excelfile', excelFile);

  try {
    const token = localStorage.getItem('token');  // Certifique-se de que o token está armazenado no localStorage
    if (!token) {
      setFeedback({ message: 'Usuário não autenticado.', success: false });
      return;
    }

    const response = await fetch('http://localhost:5000/api/enviar-holerites', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`,  // Incluindo o token JWT no cabeçalho
        'Accept': 'application/json',
      },
    });

    const result = await response.json();
    setFeedback({ message: result.message, success: response.ok });
  } catch (error) {
    setFeedback({ message: 'Erro ao enviar os arquivos.', success: false });
  }
};


  return (
    <SendContainer>
      <h2>Envio de Holerites</h2>
      <Input type="file" accept=".zip" onChange={handleZipFileUpload} placeholder="Selecione o arquivo zip" />
      <Input type="file" accept=".xlsx" onChange={handleExcelFileUpload} placeholder="Selecione o arquivo Excel" />
      <Button onClick={handleSend} disabled={!zipFile || !excelFile}>
        Enviar Holerites
      </Button>

      {feedback && (
        <FeedbackMessage success={feedback.success ? true : undefined}>
          {feedback.message}
        </FeedbackMessage>
      )}
    </SendContainer>
  );
};

export default SendPage;
