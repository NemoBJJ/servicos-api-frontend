import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import {
  ArrowLeft,
  BarChart,
  RefreshCw,
  List,
  Clock,
  CheckCircle,
  Check,
  XCircle,
  TrendingUp,
  Percent
} from 'lucide-react';
import './EstatisticasServicos.css';

const EstatisticasServicos = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [agendamentos, setAgendamentos] = useState([]);

  const limparEmojis = (texto) => {
    if (!texto) return '-';
    return texto.replace(/[^\w\s]/g, '').trim();
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const [statsRes, agendamentosRes] = await Promise.all([
        api.get('/servicos/estatisticas'),
        api.get('/servicos/agendamentos')
      ]);
      setStats(statsRes.data);
      setAgendamentos(agendamentosRes.data || []);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const servicosPorTipo = {};
  agendamentos.forEach(a => { if (a.tipoServico) { servicosPorTipo[a.tipoServico] = (servicosPorTipo[a.tipoServico] || 0) + 1; } });
  const topServicos = Object.entries(servicosPorTipo).sort((a, b) => b[1] - a[1]).slice(0, 5);

  if (loading) {
    return <div className="estatisticas-loading">Carregando estatísticas...</div>;
  }

  return (
    <div className="estatisticas-container">
      <div className="estatisticas-header">
        <Link to="/servicos">
          <button className="btn-voltar">
            <ArrowLeft size={18} />
            Voltar ao Menu
          </button>
        </Link>
        <h1>
          <BarChart size={28} className="icon-header" />
          Estatísticas dos Serviços
        </h1>
        <button className="btn-atualizar" onClick={carregarDados}>
          <RefreshCw size={18} />
          Atualizar
        </button>
      </div>

      {/* Cards de estatísticas */}
      <div className="stats-grid">
        <div className="stat-card stat-total">
          <div className="stat-icon"><List size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Total de Agendamentos</span>
            <span className="stat-value">{stats?.TOTAL || 0}</span>
          </div>
        </div>
        <div className="stat-card stat-pendente">
          <div className="stat-icon"><Clock size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Pendentes</span>
            <span className="stat-value">{stats?.PENDENTE || 0}</span>
          </div>
        </div>
        <div className="stat-card stat-confirmado">
          <div className="stat-icon"><CheckCircle size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Confirmados</span>
            <span className="stat-value">{stats?.CONFIRMADO || 0}</span>
          </div>
        </div>
        <div className="stat-card stat-concluido">
          <div className="stat-icon"><Check size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Concluídos</span>
            <span className="stat-value">{stats?.CONCLUIDO || 0}</span>
          </div>
        </div>
        <div className="stat-card stat-cancelado">
          <div className="stat-icon"><XCircle size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Cancelados</span>
            <span className="stat-value">{stats?.CANCELADO || 0}</span>
          </div>
        </div>
      </div>

      {/* Top 5 Serviços */}
      <div className="top-servicos-card">
        <h2>
          <TrendingUp size={20} className="icon-title" />
          Top 5 Serviços Mais Solicitados
        </h2>
        <div className="top-servicos-list">
          {topServicos.length === 0 ? (
            <div className="sem-dados">Nenhum serviço solicitado ainda</div>
          ) : (
            topServicos.map(([servico, qtd], idx) => (
              <div key={idx} className="top-servico-item">
                <span className="top-posicao">#{idx + 1}</span>
                <span className="top-nome">{limparEmojis(servico)}</span>
                <span className="top-qtd">{qtd} solicitação(ões)</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Taxa de Conversão */}
      <div className="conversao-card">
        <h2>
          <Percent size={20} className="icon-title" />
          Taxa de Conversão
        </h2>
        <div className="conversao-grid">
          <div className="conversao-item">
            <div className="conversao-label">Confirmados / Total</div>
            <div className="conversao-valor verde">
              {stats?.TOTAL ? Math.round((stats.CONFIRMADO / stats.TOTAL) * 100) : 0}%
            </div>
          </div>
          <div className="conversao-item">
            <div className="conversao-label">Concluídos / Confirmados</div>
            <div className="conversao-valor azul">
              {stats?.CONFIRMADO ? Math.round((stats.CONCLUIDO / stats.CONFIRMADO) * 100) : 0}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstatisticasServicos;