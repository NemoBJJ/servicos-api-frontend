import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const EstatisticasServicos = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [agendamentos, setAgendamentos] = useState([]);

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
    return <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f8fafc' }}>Carregando estatísticas...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <Link to="/servicos"><button style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem', fontWeight: '600', color: '#f8fafc', background: 'rgba(100, 116, 139, 0.3)', border: '1px solid rgba(255, 193, 7, 0.5)', borderRadius: '9999px', cursor: 'pointer' }}>← Voltar ao Menu</button></Link>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>📊 Estatísticas dos Serviços</h1>
        <button onClick={carregarDados} style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem', fontWeight: '600', background: 'rgba(59, 130, 246, 0.2)', border: '1px solid rgba(59, 130, 246, 0.4)', borderRadius: '0.5rem', color: '#60a5fa', cursor: 'pointer' }}>🔄 Atualizar</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: 'rgba(15, 23, 42, 0.8)', borderRadius: '1rem', padding: '1rem', textAlign: 'center', border: '1px solid rgba(255, 193, 7, 0.2)' }}><div style={{ fontSize: '2rem' }}>📋</div><div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Total de Agendamentos</div><div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fbbf24' }}>{stats?.TOTAL || 0}</div></div>
        <div style={{ background: 'rgba(15, 23, 42, 0.8)', borderRadius: '1rem', padding: '1rem', textAlign: 'center', border: '1px solid rgba(255, 193, 7, 0.2)' }}><div style={{ fontSize: '2rem' }}>⏳</div><div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Pendentes</div><div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fbbf24' }}>{stats?.PENDENTE || 0}</div></div>
        <div style={{ background: 'rgba(15, 23, 42, 0.8)', borderRadius: '1rem', padding: '1rem', textAlign: 'center', border: '1px solid rgba(255, 193, 7, 0.2)' }}><div style={{ fontSize: '2rem' }}>✅</div><div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Confirmados</div><div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#22c55e' }}>{stats?.CONFIRMADO || 0}</div></div>
        <div style={{ background: 'rgba(15, 23, 42, 0.8)', borderRadius: '1rem', padding: '1rem', textAlign: 'center', border: '1px solid rgba(255, 193, 7, 0.2)' }}><div style={{ fontSize: '2rem' }}>✓</div><div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Concluídos</div><div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#60a5fa' }}>{stats?.CONCLUIDO || 0}</div></div>
        <div style={{ background: 'rgba(15, 23, 42, 0.8)', borderRadius: '1rem', padding: '1rem', textAlign: 'center', border: '1px solid rgba(255, 193, 7, 0.2)' }}><div style={{ fontSize: '2rem' }}>❌</div><div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Cancelados</div><div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ef4444' }}>{stats?.CANCELADO || 0}</div></div>
      </div>

      <div style={{ background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(255, 193, 7, 0.2)', marginBottom: '2rem' }}>
        <h2 style={{ color: '#f8fafc', fontSize: '1.25rem', marginBottom: '1rem', borderLeft: '4px solid #fbbf24', paddingLeft: '0.75rem' }}>🔥 Top 5 Serviços Mais Solicitados</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {topServicos.length === 0 ? <div style={{ textAlign: 'center', color: '#64748b', padding: '2rem' }}>Nenhum serviço solicitado ainda</div> : topServicos.map(([servico, qtd], idx) => (<div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', background: 'rgba(30, 41, 59, 0.4)', borderRadius: '0.5rem' }}><span style={{ color: '#fbbf24', fontWeight: 'bold' }}>#{idx + 1}</span><span style={{ color: '#cbd5e1' }}>{servico}</span><span style={{ color: '#f8fafc', fontWeight: 'bold' }}>{qtd} solicitação(ões)</span></div>))}
        </div>
      </div>

      <div style={{ background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(255, 193, 7, 0.2)' }}>
        <h2 style={{ color: '#f8fafc', fontSize: '1.25rem', marginBottom: '1rem', borderLeft: '4px solid #3b82f6', paddingLeft: '0.75rem' }}>📈 Taxa de Conversão</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(30, 41, 59, 0.4)', borderRadius: '0.75rem' }}><div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Confirmados / Total</div><div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22c55e' }}>{stats?.TOTAL ? Math.round((stats.CONFIRMADO / stats.TOTAL) * 100) : 0}%</div></div>
          <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(30, 41, 59, 0.4)', borderRadius: '0.75rem' }}><div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Concluídos / Confirmados</div><div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#60a5fa' }}>{stats?.CONFIRMADO ? Math.round((stats.CONCLUIDO / stats.CONFIRMADO) * 100) : 0}%</div></div>
        </div>
      </div>
    </div>
  );
};

export default EstatisticasServicos;