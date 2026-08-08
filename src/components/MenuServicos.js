import React from 'react';
import { Link } from 'react-router-dom';
import { Clipboard, Settings, BarChart } from 'lucide-react';
import './MenuServicos.css';

const MenuServicos = () => {
  return (
    <div className="servicos-home">
      <div className="servicos-hero">
        <span className="servicos-badge">GesteX</span>
        <h1>GESTÃO DE SERVIÇOS</h1>
        <p>Agendamentos, controle e acompanhamento</p>
      </div>

      <div className="servicos-cards">
        <Link to="/agendar" className="servicos-card agendar-card">
          <div className="card-icon">
            <Clipboard size={48} strokeWidth={2} />
          </div>
          <h2>Agendar Serviço</h2>
          <span>Acessar →</span>
        </Link>

        <Link to="/gerenciar" className="servicos-card gerenciar-card">
          <div className="card-icon">
            <Settings size={48} strokeWidth={2} />
          </div>
          <h2>Gerenciar</h2>
          <span>Acessar →</span>
        </Link>

        <Link to="/estatisticas" className="servicos-card estatisticas-card">
          <div className="card-icon">
            <BarChart size={48} strokeWidth={2} />
          </div>
          <h2>Acompanhamento</h2>
          <span>Acessar →</span>
        </Link>
      </div>
    </div>
  );
};

export default MenuServicos;