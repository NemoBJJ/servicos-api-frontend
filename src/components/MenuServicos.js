import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-nemindev.png'; // Ajuste o nome do arquivo

const MenuServicos = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at top left, rgba(34, 197, 94, 0.25), transparent 35%), radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.2), transparent 30%), linear-gradient(135deg, #0f172a 0%, #0f172a 45%, #111827 100%)',
      padding: '2rem'
    }}>
      {/* Header com botão voltar e logo */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <Link to="/">
          <button style={{
            padding: '0.5rem 1.25rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#f8fafc',
            background: 'rgba(100, 116, 139, 0.3)',
            border: '1px solid rgba(255, 193, 7, 0.5)',
            borderRadius: '9999px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 193, 7, 0.2)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(100, 116, 139, 0.3)'}>← Voltar</button>
        </Link>
        
        {/* LOGO NEMINDEV */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '0.5rem 1rem',
          borderRadius: '9999px',
          border: '1px solid rgba(255, 193, 7, 0.2)'
        }}>
          <img 
            src={logo} 
            alt="NeminDev" 
            style={{ height: '32px', width: 'auto' }}
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
          />
          <span style={{ display: 'none', fontSize: '1.25rem' }}>🚀</span>
          <span style={{ color: '#fbbf24', fontWeight: '600', fontSize: '0.875rem' }}>NeminDev</span>
        </div>
        
        <div style={{ width: '80px' }} /> {/* Espaçador */}
      </div>

      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '2rem' }}>
        <div style={{
          display: 'inline-block',
          padding: '0.5rem 1.5rem',
          borderRadius: '999px',
          background: 'rgba(255, 193, 7, 0.15)',
          border: '1px solid rgba(255, 193, 7, 0.4)',
          color: '#fbbf24',
          fontSize: '0.75rem',
          fontWeight: '800',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '1.5rem'
        }}>GesteX</div>
        
        <h1 style={{
          fontSize: 'clamp(3rem, 8vw, 5rem)',
          fontWeight: '900',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          background: 'linear-gradient(135deg, #ffffff, #fbbf24)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          margin: 0,
          letterSpacing: '-0.02em'
        }}>Gestão de Serviços</h1>
        
        <p style={{
          color: '#94a3b8',
          fontSize: '1rem',
          marginTop: '1rem',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Agendamentos, Controle e Acompanhamento
        </p>
      </div>

      {/* Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem',
        maxWidth: '1100px',
        margin: '2rem auto 0 auto'
      }}>
        
        {/* Card 1 - Agendar Serviço */}
        <Link to="/agendar" style={{ textDecoration: 'none' }}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(14px)',
            borderRadius: '1.5rem',
            padding: '2rem',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            height: '100%',
            textAlign: 'center'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.borderColor = '#3b82f6';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.2)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📋</div>
            <h2 style={{ color: '#f8fafc', fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: '600' }}>Agendar Serviço</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1rem', lineHeight: '1.5' }}>
              Página pública para clientes solicitarem agendamentos
            </p>
            <div style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              background: 'rgba(59, 130, 246, 0.15)',
              borderRadius: '9999px',
              fontSize: '0.7rem',
              color: '#60a5fa',
              fontWeight: '600'
            }}>Área do Cliente</div>
            <div style={{ marginTop: '1.5rem', color: '#60a5fa', fontSize: '0.875rem', fontWeight: '500' }}>
              Acessar →
            </div>
          </div>
        </Link>

        {/* Card 2 - Gerenciar */}
        <Link to="/gerenciar" style={{ textDecoration: 'none' }}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(14px)',
            borderRadius: '1.5rem',
            padding: '2rem',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            height: '100%',
            textAlign: 'center'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.borderColor = '#22c55e';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(34, 197, 94, 0.2)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.3)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚙️</div>
            <h2 style={{ color: '#f8fafc', fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: '600' }}>Gerenciar</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1rem', lineHeight: '1.5' }}>
              Visualizar, confirmar ou recusar solicitações de clientes
            </p>
            <div style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              background: 'rgba(34, 197, 94, 0.15)',
              borderRadius: '9999px',
              fontSize: '0.7rem',
              color: '#22c55e',
              fontWeight: '600'
            }}>Área do Gestor</div>
            <div style={{ marginTop: '1.5rem', color: '#22c55e', fontSize: '0.875rem', fontWeight: '500' }}>
              Acessar →
            </div>
          </div>
        </Link>

        {/* Card 3 - Acompanhamento */}
        <Link to="/estatisticas" style={{ textDecoration: 'none' }}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(14px)',
            borderRadius: '1.5rem',
            padding: '2rem',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            height: '100%',
            textAlign: 'center'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.borderColor = '#8b5cf6';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.2)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📊</div>
            <h2 style={{ color: '#f8fafc', fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: '600' }}>Acompanhamento</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1rem', lineHeight: '1.5' }}>
              Métricas, relatórios e indicadores dos serviços
            </p>
            <div style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              background: 'rgba(139, 92, 246, 0.15)',
              borderRadius: '9999px',
              fontSize: '0.7rem',
              color: '#a78bfa',
              fontWeight: '600'
            }}>Dashboard</div>
            <div style={{ marginTop: '1.5rem', color: '#a78bfa', fontSize: '0.875rem', fontWeight: '500' }}>
              Acessar →
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MenuServicos;