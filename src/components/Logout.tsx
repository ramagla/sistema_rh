import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove o token do localStorage
    localStorage.removeItem('token');
    // Redireciona para a página de login
    navigate('/login');
  }, [navigate]);

  return null;
};

export default Logout;
