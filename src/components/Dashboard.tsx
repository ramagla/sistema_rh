import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const ListGroup = styled.div`
  .list-group-item {
    display: flex;
    flex-direction: column;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
    background-color: #fff;
    cursor: pointer;  /* Adiciona o cursor de link */
    
    &:hover {
      background-color: #f1f1f1;  /* Efeito de hover para parecer um link */
    }

    &.active {
      background-color: #007bff;
      color: white;
      border-color: #007bff;
    }
  }

  .d-flex {
    display: flex;
    justify-content: space-between;
  }

  .mb-1 {
    margin-bottom: 0.5rem;
  }

  .text-body-secondary {
    color: #6c757d;
  }
`;

const Dashboard: React.FC = () => {
  return (
    <DashboardContainer>
      <Title>Próximas Funcionalidades</Title>
      <ListGroup className="list-group">
        <div className="list-group-item list-group-item-action active" aria-current="true">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">Nova Funcionalidade 1</h5>
            <small>Em breve</small>
          </div>
          <p className="mb-1">Envio através de WhatsApp</p>
          <small>Enviar os holerites através de WhatsApp.</small>
        </div>
        <div className="list-group-item list-group-item-action">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">Nova Funcionalidade 2</h5>
            <small className="text-body-secondary">Em breve</small>
          </div>
          <p className="mb-1">Desenvolver a Aba Configurações</p>
          <small className="text-body-secondary">Mais detalhes em breve.</small>
        </div>
        <div className="list-group-item list-group-item-action">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">Nova Funcionalidade 3</h5>
            <small className="text-body-secondary">Em breve</small>
          </div>
          <p className="mb-1">Ajustar a Aba de Relatórios</p>
          <small className="text-body-secondary">Mais detalhes em breve.</small>
        </div>
      </ListGroup>
    </DashboardContainer>
  );
};

export default Dashboard;
