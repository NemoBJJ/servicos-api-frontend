import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuServicos from './components/MenuServicos';
import AgendarServico from './components/AgendarServico';
import GerenciarAgendamentos from './components/GerenciarAgendamentos';
import EstatisticasServicos from './components/EstatisticasServicos';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/servicos" element={<MenuServicos />} />
        <Route path="/agendar" element={<AgendarServico />} />
        <Route path="/gerenciar" element={<GerenciarAgendamentos />} />
        <Route path="/estatisticas" element={<EstatisticasServicos />} />
        <Route path="/" element={<MenuServicos />} />
      </Routes>
    </Router>
  );
}

export default App;