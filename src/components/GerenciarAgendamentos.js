import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import {
  ArrowLeft,
  Calendar,
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle,
  List,
  Scissors,
  FileText,
  Check,
  X
} from 'lucide-react';
import './GerenciarAgendamentos.css';

const GerenciarAgendamentos = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState('TODOS');
  const [stats, setStats] = useState({ pendentes: 0, confirmados: 0, concluidos: 0, cancelados: 0 });

  useEffect(() => {
    carregarAgendamentos();
  }, []);

  const carregarAgendamentos = async () => {
    setLoading(true);
    try {
      const response = await api.get('/servicos/agendamentos');
      const dados = response.data || [];
      setAgendamentos(dados);
      setStats({
        pendentes: dados.filter(a => a.status === 'PENDENTE').length,
        confirmados: dados.filter(a => a.status === 'CONFIRMADO').length,
        concluidos: dados.filter(a => a.status === 'CONCLUIDO').length,
        cancelados: dados.filter(a => a.status === 'CANCELADO').length
      });
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const atualizarStatus = async (id, novoStatus) => {
    try {
      await api.put('/servicos/agendamentos/' + id + '/status', { status: novoStatus });
      carregarAgendamentos();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status');
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      PENDENTE: { bg: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', icon: <Clock size={14} />, text: 'Pendente' },
      CONFIRMADO: { bg: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', icon: <CheckCircle size={14} />, text: 'Confirmado' },
      CONCLUIDO: { bg: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', icon: <Check size={14} />, text: 'Concluído' },
      CANCELADO: { bg: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', icon: <XCircle size={14} />, text: 'Cancelado' }
    };
    return styles[status] || styles.PENDENTE;
  };

  const formatarDataHora = (data, hora) => {
    if (!data) return '-';
    return new Date(data).toLocaleDateString('pt-BR') + ' às ' + (hora || '--:--');
  };

  const agendamentosFiltrados = agendamentos.filter(a => {
    if (filtroStatus === 'TODOS') return true;
    return a.status === filtroStatus;
  });

  if (loading) {
    return (
      <div className="gerenciar-loading">
        Carregando agendamentos...
      </div>
    );
  }

  return (
    <div className="gerenciar-container">
      <div className="gerenciar-header">
        <Link to="/servicos">
          <button className="btn-voltar">
            <ArrowLeft size={18} />
            Voltar ao Menu
          </button>
        </Link>
        <h1>
          <Calendar size={28} className="icon-header" />
          Gerenciar Agendamentos
        </h1>
        <button className="btn-atualizar" onClick={carregarAgendamentos}>
          <RefreshCw size={18} />
          Atualizar
        </button>
      </div>

      {/* Cards de estatísticas */}
      <div className="stats-grid">
        <div className="stat-card stat-pendente">
          <div className="stat-icon"><Clock size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Pendentes</span>
            <span className="stat-value">{stats.pendentes}</span>
          </div>
        </div>
        <div className="stat-card stat-confirmado">
          <div className="stat-icon"><CheckCircle size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Confirmados</span>
            <span className="stat-value">{stats.confirmados}</span>
          </div>
        </div>
        <div className="stat-card stat-concluido">
          <div className="stat-icon"><Check size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Concluídos</span>
            <span className="stat-value">{stats.concluidos}</span>
          </div>
        </div>
        <div className="stat-card stat-cancelado">
          <div className="stat-icon"><XCircle size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Cancelados</span>
            <span className="stat-value">{stats.cancelados}</span>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="filtros-container">
        {['TODOS', 'PENDENTE', 'CONFIRMADO', 'CONCLUIDO', 'CANCELADO'].map(status => {
          let icon, label;
          switch(status) {
            case 'TODOS': icon = <List size={16} />; label = 'Todos'; break;
            case 'PENDENTE': icon = <Clock size={16} />; label = 'Pendentes'; break;
            case 'CONFIRMADO': icon = <CheckCircle size={16} />; label = 'Confirmados'; break;
            case 'CONCLUIDO': icon = <Check size={16} />; label = 'Concluídos'; break;
            case 'CANCELADO': icon = <XCircle size={16} />; label = 'Cancelados'; break;
            default: icon = null; label = status;
          }
          return (
            <button
              key={status}
              className={`filtro-btn ${filtroStatus === status ? 'active' : ''}`}
              onClick={() => setFiltroStatus(status)}
            >
              {icon} {label}
            </button>
          );
        })}
      </div>

      {/* Lista de agendamentos */}
      <div className="agendamentos-list">
        {agendamentosFiltrados.length === 0 ? (
          <div className="sem-dados">Nenhum agendamento encontrado</div>
        ) : (
          agendamentosFiltrados.map(a => {
            const statusStyle = getStatusBadge(a.status);
            return (
              <div key={a.id} className="agendamento-card">
                <div className="agendamento-topo">
                  <div>
                    <div className="cliente-nome">{a.clienteNome}</div>
                    <div className="cliente-contato">
                      {a.clienteEmail} | {a.clienteTelefone || 'Sem telefone'}
                    </div>
                  </div>
                  <div className="status-badge" style={{ background: statusStyle.bg, color: statusStyle.color }}>
                    {statusStyle.icon} {statusStyle.text}
                  </div>
                </div>

                <div className="agendamento-detalhes">
                  <div>
                    <Calendar size={14} /> {formatarDataHora(a.dataAgendamento, a.horaAgendamento)}
                  </div>
                  <div>
                    <Scissors size={14} /> {a.tipoServico}
                  </div>
                  {a.observacao && (
                    <div>
                      <FileText size={14} /> {a.observacao}
                    </div>
                  )}
                </div>

                <div className="agendamento-acoes">
                  {a.status === 'PENDENTE' && (
                    <>
                      <button
                        className="btn-confirmar"
                        onClick={() => atualizarStatus(a.id, 'CONFIRMADO')}
                      >
                        <CheckCircle size={16} /> Confirmar
                      </button>
                      <button
                        className="btn-recusar"
                        onClick={() => atualizarStatus(a.id, 'CANCELADO')}
                      >
                        <X size={16} /> Recusar
                      </button>
                    </>
                  )}
                  {a.status === 'CONFIRMADO' && (
                    <button
                      className="btn-concluir"
                      onClick={() => atualizarStatus(a.id, 'CONCLUIDO')}
                    >
                      <Check size={16} /> Marcar como Concluído
                    </button>
                  )}
                  {a.status === 'CONCLUIDO' && (
                    <span className="status-finalizado">✓ Serviço finalizado</span>
                  )}
                  {a.status === 'CANCELADO' && (
                    <span className="status-cancelado">✕ Solicitação recusada</span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default GerenciarAgendamentos;