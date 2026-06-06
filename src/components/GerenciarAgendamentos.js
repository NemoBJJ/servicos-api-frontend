import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

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
      PENDENTE: { bg: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', text: '⏳ Pendente' },
      CONFIRMADO: { bg: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', text: '✅ Confirmado' },
      CONCLUIDO: { bg: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', text: '✓ Concluído' },
      CANCELADO: { bg: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', text: '❌ Cancelado' }
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
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: '#f8fafc' 
      }}>
        Carregando agendamentos...
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', 
      padding: '2rem' 
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: '2rem', 
        flexWrap: 'wrap', 
        gap: '1rem' 
      }}>
        <Link to="/servicos">
          <button style={{ 
            padding: '0.5rem 1.25rem', 
            fontSize: '0.875rem', 
            fontWeight: '600', 
            color: '#f8fafc', 
            background: 'rgba(100, 116, 139, 0.3)', 
            border: '1px solid rgba(255, 193, 7, 0.5)', 
            borderRadius: '9999px', 
            cursor: 'pointer' 
          }}>← Voltar ao Menu</button>
        </Link>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', 
          WebkitBackgroundClip: 'text', 
          backgroundClip: 'text', 
          color: 'transparent' 
        }}>📋 Gerenciar Agendamentos</h1>
        <button 
          onClick={carregarAgendamentos} 
          style={{ 
            padding: '0.5rem 1.25rem', 
            fontSize: '0.875rem', 
            fontWeight: '600', 
            background: 'rgba(59, 130, 246, 0.2)', 
            border: '1px solid rgba(59, 130, 246, 0.4)', 
            borderRadius: '0.5rem', 
            color: '#60a5fa', 
            cursor: 'pointer' 
          }}>🔄 Atualizar</button>
      </div>

      {/* Cards de estatísticas */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '1rem', 
        marginBottom: '2rem' 
      }}>
        <div style={{ 
          background: 'rgba(15, 23, 42, 0.8)', 
          borderRadius: '1rem', 
          padding: '1rem', 
          textAlign: 'center', 
          border: '1px solid rgba(255, 193, 7, 0.2)' 
        }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>⏳ Pendentes</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fbbf24' }}>{stats.pendentes}</div>
        </div>
        <div style={{ 
          background: 'rgba(15, 23, 42, 0.8)', 
          borderRadius: '1rem', 
          padding: '1rem', 
          textAlign: 'center', 
          border: '1px solid rgba(255, 193, 7, 0.2)' 
        }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>✅ Confirmados</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#22c55e' }}>{stats.confirmados}</div>
        </div>
        <div style={{ 
          background: 'rgba(15, 23, 42, 0.8)', 
          borderRadius: '1rem', 
          padding: '1rem', 
          textAlign: 'center', 
          border: '1px solid rgba(255, 193, 7, 0.2)' 
        }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>✓ Concluídos</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#60a5fa' }}>{stats.concluidos}</div>
        </div>
        <div style={{ 
          background: 'rgba(15, 23, 42, 0.8)', 
          borderRadius: '1rem', 
          padding: '1rem', 
          textAlign: 'center', 
          border: '1px solid rgba(255, 193, 7, 0.2)' 
        }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>❌ Cancelados</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ef4444' }}>{stats.cancelados}</div>
        </div>
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {['TODOS', 'PENDENTE', 'CONFIRMADO', 'CONCLUIDO', 'CANCELADO'].map(status => (
          <button 
            key={status} 
            onClick={() => setFiltroStatus(status)} 
            style={{ 
              padding: '0.5rem 1rem', 
              background: filtroStatus === status ? 'rgba(251, 191, 36, 0.2)' : 'rgba(100, 116, 139, 0.2)', 
              border: filtroStatus === status ? '1px solid #fbbf24' : '1px solid rgba(255, 193, 7, 0.3)', 
              borderRadius: '0.5rem', 
              color: filtroStatus === status ? '#fbbf24' : '#94a3b8', 
              cursor: 'pointer' 
            }}>
            {status === 'TODOS' ? '📋 Todos' : 
             status === 'PENDENTE' ? '⏳ Pendentes' : 
             status === 'CONFIRMADO' ? '✅ Confirmados' : 
             status === 'CONCLUIDO' ? '✓ Concluídos' : '❌ Cancelados'}
          </button>
        ))}
      </div>

      {/* Lista de agendamentos */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {agendamentosFiltrados.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#64748b', padding: '2rem' }}>Nenhum agendamento encontrado</div>
        ) : (
          agendamentosFiltrados.map(a => {
            const statusStyle = getStatusBadge(a.status);
            return (
              <div key={a.id} style={{ 
                background: 'rgba(15, 23, 42, 0.8)', 
                backdropFilter: 'blur(10px)', 
                borderRadius: '1rem', 
                padding: '1.25rem', 
                border: '1px solid rgba(255, 193, 7, 0.2)' 
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start', 
                  flexWrap: 'wrap', 
                  gap: '1rem', 
                  marginBottom: '1rem', 
                  paddingBottom: '0.5rem', 
                  borderBottom: '1px solid rgba(148, 163, 184, 0.2)' 
                }}>
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#fbbf24', fontSize: '1rem' }}>{a.clienteNome}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{a.clienteEmail} | {a.clienteTelefone || 'Sem telefone'}</div>
                  </div>
                  <div style={{ 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '9999px', 
                    fontSize: '0.75rem', 
                    fontWeight: '600', 
                    background: statusStyle.bg, 
                    color: statusStyle.color 
                  }}>{statusStyle.text}</div>
                </div>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '0.5rem', 
                  marginBottom: '1rem' 
                }}>
                  <div style={{ fontSize: '0.875rem', color: '#cbd5e1' }}>
                    <span style={{ color: '#64748b' }}>📅 Data:</span> {formatarDataHora(a.dataAgendamento, a.horaAgendamento)}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#cbd5e1' }}>
                    <span style={{ color: '#64748b' }}>💇 Serviço:</span> {a.tipoServico}
                  </div>
                  {a.observacao && (
                    <div style={{ fontSize: '0.875rem', color: '#cbd5e1' }}>
                      <span style={{ color: '#64748b' }}>📝 Obs:</span> {a.observacao}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  {a.status === 'PENDENTE' && (
                    <>
                      <button 
                        onClick={() => atualizarStatus(a.id, 'CONFIRMADO')} 
                        style={{ 
                          padding: '0.5rem 1rem', 
                          borderRadius: '0.5rem', 
                          fontWeight: '600', 
                          cursor: 'pointer', 
                          background: 'rgba(34, 197, 94, 0.2)', 
                          color: '#22c55e', 
                          border: '1px solid rgba(34, 197, 94, 0.3)' 
                        }}>✅ Confirmar</button>
                      <button 
                        onClick={() => atualizarStatus(a.id, 'CANCELADO')} 
                        style={{ 
                          padding: '0.5rem 1rem', 
                          borderRadius: '0.5rem', 
                          fontWeight: '600', 
                          cursor: 'pointer', 
                          background: 'rgba(239, 68, 68, 0.2)', 
                          color: '#ef4444', 
                          border: '1px solid rgba(239, 68, 68, 0.3)' 
                        }}>❌ Recusar</button>
                    </>
                  )}
                  {a.status === 'CONFIRMADO' && (
                    <button 
                      onClick={() => atualizarStatus(a.id, 'CONCLUIDO')} 
                      style={{ 
                        padding: '0.5rem 1rem', 
                        borderRadius: '0.5rem', 
                        fontWeight: '600', 
                        cursor: 'pointer', 
                        background: 'rgba(59, 130, 246, 0.2)', 
                        color: '#60a5fa', 
                        border: '1px solid rgba(59, 130, 246, 0.3)' 
                      }}>✓ Marcar como Concluído</button>
                  )}
                  {a.status === 'CONCLUIDO' && (
                    <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#60a5fa' }}>✓ Serviço finalizado</span>
                  )}
                  {a.status === 'CANCELADO' && (
                    <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#ef4444' }}>❌ Solicitação recusada</span>
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