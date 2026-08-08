import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import {
  ArrowLeft,
  Calendar,
  User,
  Mail,
  Phone,
  Scissors,
  CalendarDays,
  Clock,
  FileText,
  CheckCircle,
  Plus,
  AlertCircle
} from 'lucide-react';
import './AgendarServico.css';

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
    'Corte de Cabelo',
    'Manicure/Pedicure',
    'Massagem',
    'Consulta Psiquiátrica',
    'Consulta Odontológica',
    'Consulta Nutricional',
    'Personal Trainer',
    'Outro'
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
      <div className="agendar-sucesso">
        <div className="sucesso-card">
          <div className="sucesso-icon"><CheckCircle size={56} /></div>
          <h2>Solicitação Enviada com Sucesso!</h2>
          <p>Sua solicitação de agendamento foi recebida.<br/>Em breve entraremos em contato para confirmar.</p>
          <div className="sucesso-acoes">
            <button onClick={() => setEnviado(false)} className="btn-novo">
              <Plus size={18} /> Novo Agendamento
            </button>
            <Link to="/servicos" className="btn-voltar-sucesso">
              <ArrowLeft size={18} /> Voltar ao Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="agendar-container">
      <div className="agendar-header">
        <Link to="/servicos">
          <button className="btn-voltar">
            <ArrowLeft size={18} />
            Voltar ao Menu
          </button>
        </Link>
        <h1>
          <Calendar size={28} className="icon-header" />
          Agendamento de Serviços
        </h1>
      </div>

      <div className="agendar-card">
        <p className="agendar-subtitulo">Preencha os dados abaixo para solicitar seu horário</p>
        
        {erro && (
          <div className="erro-mensagem">
            <AlertCircle size={18} />
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="agendar-form">
          <div className="form-row">
            <div className="form-group">
              <label><User size={16} /> Nome Completo *</label>
              <input
                type="text"
                name="clienteNome"
                value={formData.clienteNome}
                onChange={handleChange}
                placeholder="Seu nome"
                required
              />
            </div>
            <div className="form-group">
              <label><Mail size={16} /> E-mail *</label>
              <input
                type="email"
                name="clienteEmail"
                value={formData.clienteEmail}
                onChange={handleChange}
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label><Phone size={16} /> Telefone (WhatsApp)</label>
              <input
                type="tel"
                name="clienteTelefone"
                value={formData.clienteTelefone}
                onChange={handleChange}
                placeholder="(11) 99999-9999"
              />
            </div>
            <div className="form-group">
              <label><Scissors size={16} /> Tipo de Serviço *</label>
              <select
                name="tipoServico"
                value={formData.tipoServico}
                onChange={handleChange}
                required
              >
                <option value="">Selecione...</option>
                {tiposServico.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label><CalendarDays size={16} /> Data *</label>
              <input
                type="date"
                name="dataAgendamento"
                value={formData.dataAgendamento}
                onChange={handleChange}
                min={hoje}
                required
              />
            </div>
            <div className="form-group">
              <label><Clock size={16} /> Horário *</label>
              <input
                type="time"
                name="horaAgendamento"
                value={formData.horaAgendamento}
                onChange={handleChange}
                min={horaMinima}
                required
              />
            </div>
          </div>

          <div className="form-group full">
            <label><FileText size={16} /> Observações (opcional)</label>
            <textarea
              name="observacao"
              rows="3"
              value={formData.observacao}
              onChange={handleChange}
              placeholder="Alguma informação adicional?"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-enviar">
            {loading ? 'Enviando...' : <><Calendar size={18} /> Solicitar Agendamento</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgendarServico;