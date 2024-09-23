import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const SendContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: flex-start;
`;

const LeftContainer = styled.div`
  flex: 1;
`;

const RightContainer = styled.div`
  flex: 1;
  margin-left: 20px;
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

const ZipButton = styled(Button)`
  background-color: #ffc107; /* Amarelo */
`;

const ExcelButton = styled(Button)`
  background-color: #28a745; /* Verde */
`;

const FeedbackMessage = styled.p<{ success: boolean | undefined }>`
  margin-top: 20px;
  color: ${(props) => (props.success ? '#155724' : '#721c24')};
  background-color: ${(props) => (props.success ? '#d4edda' : '#f8d7da')};
  padding: 10px;
  border: 1px solid ${(props) => (props.success ? '#c3e6cb' : '#f5c6cb')};
`;

const LogContainer = styled.div`
  margin-top: 20px;
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 5px;
`;

const LogItem = styled.div`
  margin-bottom: 5px;
  background-color: #e9ecef;
  padding: 10px;
  border-radius: 5px;
`;

const StyledTable = styled.table`
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f8f9fa;
  }
`;

const SendPage: React.FC = () => {
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState<{ message: string; success: boolean } | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const handleZipFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setZipFile(file);
      setLogs((prevLogs) => [...prevLogs, `Arquivo ZIP (${file.name}) selecionado para envio.`]);
    }
  };

  const handleExcelFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setExcelFile(file);
      setLogs((prevLogs) => [...prevLogs, `Arquivo Excel (${file.name}) selecionado para envio.`]);
    }
  };

  const handleSend = async () => {
  if (!zipFile || !excelFile) {
    setFeedback({ message: 'Ambos os arquivos são necessários.', success: false });
    setLogs((prevLogs) => [...prevLogs, 'Erro: Ambos os arquivos são necessários.']);
    return;
  }

  const formData = new FormData();
  formData.append('zipfile', zipFile);  // Certifique-se de que o nome seja 'zipfile'
  formData.append('excelfile', excelFile);  // Certifique-se de que o nome seja 'excelfile'

  try {
    setLogs((prevLogs) => [...prevLogs, 'Iniciando o envio dos arquivos...']);

    const response = await fetch('https://ramagla.pythonanywhere.com/api/enviar-holerites', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',        
      },
    });

    const result = await response.json();
    setFeedback({ message: result.message, success: response.ok });

    // Exibe os erros retornados pelo backend nos logs
    if (result.errors && result.errors.length > 0) {
      setLogs((prevLogs) => [...prevLogs, ...result.errors]);
    }

    setLogs((prevLogs) => [
      ...prevLogs,
      response.ok ? 'Arquivos enviados com sucesso.' : 'Erro ao enviar os arquivos.',
    ]);
  } catch (error) {
    setFeedback({ message: 'Erro ao enviar os arquivos.', success: false });
    setLogs((prevLogs) => [...prevLogs, 'Erro ao enviar os arquivos: ' + (error as Error).message]);
  }
};



  return (
    <SendContainer>
      <LeftContainer>
        <h3>Formato esperado do arquivo Excel</h3>
        <StyledTable className="table table-dark table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Celular</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>João Silva</td>
              <td>joao.silva@email.com</td>
              <td>(11) 91234-5678</td>
            </tr>
            <tr>
              <td>Ana Souza</td>
              <td>ana.souza@email.com</td>
              <td>(21) 91234-5678</td>
            </tr>
            <tr>
              <td>Carlos Lima</td>
              <td>carlos.lima@email.com</td>
              <td>(31) 91234-5678</td>
            </tr>
          </tbody>
        </StyledTable>
      </LeftContainer>

      <RightContainer>
        <h2>Envio de Holerites</h2>

        <div>
          <h5>Anexe o arquivo ZIP</h5>
          <ZipButton onClick={() => document.getElementById('zipfile')?.click()}>
            Anexe o arquivo ZIP
          </ZipButton>
          <input
            id="zipfile"
            type="file"
            accept=".zip"
            style={{ display: 'none' }}
            onChange={handleZipFileUpload}
          />
          {zipFile && <p>Arquivo selecionado: {zipFile.name}</p>}
        </div>

        <div>
          <h5>Anexe a planilha Excel</h5>
          <ExcelButton onClick={() => document.getElementById('excelfile')?.click()}>
            Anexe a planilha Excel
          </ExcelButton>
          <input
            id="excelfile"
            type="file"
            accept=".xlsx"
            style={{ display: 'none' }}
            onChange={handleExcelFileUpload}
          />
          {excelFile && <p>Arquivo selecionado: {excelFile.name}</p>}
        </div>

        <button className="btn btn-primary mt-3" onClick={handleSend} disabled={!zipFile || !excelFile}>
          Enviar Holerites
        </button>

        {feedback && (
          <FeedbackMessage success={Boolean(feedback.success)}>
            {feedback.message}
          </FeedbackMessage>
        )}



        <LogContainer>
          <h3>Logs do Processo:</h3>
          {logs.map((log, index) => (
            <LogItem key={index}>{log}</LogItem>
          ))}
        </LogContainer>
      </RightContainer>
    </SendContainer>
  );
};

export default SendPage;
