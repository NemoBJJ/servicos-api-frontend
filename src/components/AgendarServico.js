import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const AgendarServico = () => {
  const [formData, setFormData] = useState({
    clienteNome: '',
    clienteEmail: '',
    clienteTelefone: '',
    tipoServico: '',
    dataAgendamento: '',
    horaAgendamento: '',
    observacao: ''
  });
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const tiposServico = [
    '💇 Corte de Cabelo',
    '💅 Manicure/Pedicure',
    '💆 Massagem',
    '👨‍⚕️ Consulta Psiquiátrica',
    '🦷 Consulta Odontológica',
    '💊 Consulta Nutricional',
    '🏋️ Personal Trainer',
    '📝 Outro'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErro('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.clienteNome || !formData.clienteEmail || !formData.tipoServico || !formData.dataAgendamento || !formData.horaAgendamento) {
      setErro('Preencha todos os campos obrigatórios!');
      return;
    }
    
    setLoading(true);
    try {
      await api.post('/servicos/agendar', formData);
      setEnviado(true);
      setFormData({
        clienteNome: '',
        clienteEmail: '',
        clienteTelefone: '',
        tipoServico: '',
        dataAgendamento: '',
        horaAgendamento: '',
        observacao: ''
      });
    } catch (error) {
      console.error('Erro ao agendar:', error);
      setErro('Erro ao agendar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const hoje = new Date().toISOString().split('T')[0];
  const horaMinima = `${String(new Date().getHours()).padStart(2, '0')}:00`;

  if (enviado) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(10px)', borderRadius: '1.5rem', padding: '2rem', textAlign: 'center', border: '1px solid rgba(34, 197, 94, 0.3)', maxWidth: '500px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
          <h2 style={{ color: '#22c55e', marginBottom: '1rem' }}>Solicitação Enviada com Sucesso!</h2>
          <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Sua solicitação de agendamento foi recebida.<br/>Em breve entraremos em contato para confirmar.</p>
          <button onClick={() => setEnviado(false)} style={{ display: 'inline-block', padding: '0.75rem 1.5rem', margin: '0.5rem', borderRadius: '0.75rem', cursor: 'pointer', background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: 'white', border: 'none' }}>➕ Novo Agendamento</button>
          <Link to="/servicos" style={{ display: 'inline-block', padding: '0.75rem 1.5rem', margin: '0.5rem', borderRadius: '0.75rem', cursor: 'pointer', background: 'rgba(100, 116, 139, 0.3)', border: '1px solid rgba(255, 193, 7, 0.5)', color: '#f8fafc', textDecoration: 'none' }}>← Voltar ao Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <Link to="/servicos">
          <button style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem', fontWeight: '600', color: '#f8fafc', background: 'rgba(100, 116, 139, 0.3)', border: '1px solid rgba(255, 193, 7, 0.5)', borderRadius: '9999px', cursor: 'pointer' }}>← Voltar ao Menu</button>
        </Link>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>📅 Agendamento de Serviços</h1>
      </div>

      <div style={{ background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)', borderRadius: '1.5rem', padding: '2rem', border: '1px solid rgba(255, 193, 7, 0.2)', maxWidth: '700px', margin: '0 auto' }}>
        <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '1.5rem' }}>Preencha os dados abaixo para solicitar seu horário</p>
        
        {erro && <div style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '0.75rem', padding: '0.75rem', color: '#f87171', textAlign: 'center', marginBottom: '1rem' }}>{erro}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.875rem', color: '#94a3b8', fontWeight: '500' }}>Nome Completo *</label>
              <input type="text" name="clienteNome" value={formData.clienteNome} onChange={handleChange} placeholder="Seu nome" required style={{ padding: '0.75rem', background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255, 193, 7, 0.3)', borderRadius: '0.75rem', color: '#f8fafc' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.875rem', color: '#94a3b8', fontWeight: '500' }}>E-mail *</label>
              <input type="email" name="clienteEmail" value={formData.clienteEmail} onChange={handleChange} placeholder="seu@email.com" required style={{ padding: '0.75rem', background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255, 193, 7, 0.3)', borderRadius: '0.75rem', color: '#f8fafc' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.875rem', color: '#94a3b8', fontWeight: '500' }}>Telefone (WhatsApp)</label>
              <input type="tel" name="clienteTelefone" value={formData.clienteTelefone} onChange={handleChange} placeholder="(11) 99999-9999" style={{ padding: '0.75rem', background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255, 193, 7, 0.3)', borderRadius: '0.75rem', color: '#f8fafc' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.875rem', color: '#94a3b8', fontWeight: '500' }}>Tipo de Serviço *</label>
              <select name="tipoServico" value={formData.tipoServico} onChange={handleChange} required style={{ padding: '0.75rem', background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255, 193, 7, 0.3)', borderRadius: '0.75rem', color: '#f8fafc' }}>
                <option value="">Selecione...</option>
                {tiposServico.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.875rem', color: '#94a3b8', fontWeight: '500' }}>Data *</label>
              <input type="date" name="dataAgendamento" value={formData.dataAgendamento} onChange={handleChange} min={hoje} required style={{ padding: '0.75rem', background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255, 193, 7, 0.3)', borderRadius: '0.75rem', color: '#f8fafc' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.875rem', color: '#94a3b8', fontWeight: '500' }}>Horário *</label>
              <input type="time" name="horaAgendamento" value={formData.horaAgendamento} onChange={handleChange} min={horaMinima} required style={{ padding: '0.75rem', background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255, 193, 7, 0.3)', borderRadius: '0.75rem', color: '#f8fafc' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.875rem', color: '#94a3b8', fontWeight: '500' }}>Observações (opcional)</label>
            <textarea name="observacao" rows="3" value={formData.observacao} onChange={handleChange} placeholder="Alguma informação adicional?" style={{ padding: '0.75rem', background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255, 193, 7, 0.3)', borderRadius: '0.75rem', color: '#f8fafc' }}></textarea>
          </div>

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.875rem', background: 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', borderRadius: '0.75rem', color: 'white', fontWeight: '600', fontSize: '1rem', cursor: 'pointer', marginTop: '1rem' }}>
            {loading ? 'Enviando...' : '📅 Solicitar Agendamento'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgendarServico;