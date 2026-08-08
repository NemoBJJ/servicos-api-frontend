import React from 'react';
import { Link } from 'react-router-dom';
import { Clipboard, Settings, BarChart } from 'lucide-react';

const MenuServicos = () => {
  return (
    <div style={{
      minHeight: '100vh',
      padding: '56px 24px',
      background: 'radial-gradient(circle at top left, rgba(59, 130, 246, 0.25), transparent 35%), radial-gradient(circle at bottom right, rgba(139, 92, 246, 0.15), transparent 30%), linear-gradient(135deg, #07111f 0%, #0f172a 45%, #111827 100%)',
      color: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <span style={{
          display: 'inline-block',
          padding: '8px 18px',
          borderRadius: '999px',
          background: 'rgba(59, 130, 246, 0.15)',
          border: '1px solid rgba(59, 130, 246, 0.45)',
          color: '#60a5fa',
          fontWeight: 800,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '18px'
        }}>GesteX</span>
        <h1 style={{
          margin: 0,
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          lineHeight: 0.95,
          fontWeight: 1000,
          letterSpacing: '0.08em',
          color: '#ffffff',
          textShadow: '0 14px 45px rgba(59, 130, 246, 0.20)'
        }}>GESTÃO DE SERVIÇOS</h1>
        <p style={{
          margin: '22px auto 0',
          maxWidth: '700px',
          fontSize: '1.12rem',
          color: '#cbd5e1'
        }}>Agendamentos, controle e acompanhamento</p>
      </div>

      <div style={{
        width: '100%',
        maxWidth: '1100px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '28px'
      }}>
        <Link to="/agendar" style={{ textDecoration: 'none' }}>
          <div style={{
            minHeight: '220px',
            padding: '28px 22px',
            borderRadius: '26px',
            background: 'rgba(15, 23, 42, 0.82)',
            border: '1px solid rgba(148, 163, 184, 0.22)',
            boxShadow: '0 24px 70px rgba(0, 0, 0, 0.38)',
            backdropFilter: 'blur(14px)',
            transition: 'all 0.18s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.6)';
            e.currentTarget.style.boxShadow = '0 34px 90px rgba(0, 0, 0, 0.52)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.22)';
            e.currentTarget.style.boxShadow = '0 24px 70px rgba(0, 0, 0, 0.38)';
          }}>
            <div style={{ marginBottom: '20px', color: '#60a5fa' }}>
              <Clipboard size={48} strokeWidth={2} />
            </div>
            <h2 style={{ margin: '0 0 12px', fontSize: '1.5rem', color: '#ffffff' }}>Agendar Serviço</h2>
            <span style={{ display: 'inline-block', marginTop: '12px', fontWeight: 900, color: '#60a5fa', letterSpacing: '0.02em' }}>Acessar →</span>
          </div>
        </Link>

        <Link to="/gerenciar" style={{ textDecoration: 'none' }}>
          <div style={{
            minHeight: '220px',
            padding: '28px 22px',
            borderRadius: '26px',
            background: 'rgba(15, 23, 42, 0.82)',
            border: '1px solid rgba(148, 163, 184, 0.22)',
            boxShadow: '0 24px 70px rgba(0, 0, 0, 0.38)',
            backdropFilter: 'blur(14px)',
            transition: 'all 0.18s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.6)';
            e.currentTarget.style.boxShadow = '0 34px 90px rgba(0, 0, 0, 0.52)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.22)';
            e.currentTarget.style.boxShadow = '0 24px 70px rgba(0, 0, 0, 0.38)';
          }}>
            <div style={{ marginBottom: '20px', color: '#60a5fa' }}>
              <Settings size={48} strokeWidth={2} />
            </div>
            <h2 style={{ margin: '0 0 12px', fontSize: '1.5rem', color: '#ffffff' }}>Gerenciar</h2>
            <span style={{ display: 'inline-block', marginTop: '12px', fontWeight: 900, color: '#60a5fa', letterSpacing: '0.02em' }}>Acessar →</span>
          </div>
        </Link>

        <Link to="/estatisticas" style={{ textDecoration: 'none' }}>
          <div style={{
            minHeight: '220px',
            padding: '28px 22px',
            borderRadius: '26px',
            background: 'rgba(15, 23, 42, 0.82)',
            border: '1px solid rgba(148, 163, 184, 0.22)',
            boxShadow: '0 24px 70px rgba(0, 0, 0, 0.38)',
            backdropFilter: 'blur(14px)',
            transition: 'all 0.18s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.6)';
            e.currentTarget.style.boxShadow = '0 34px 90px rgba(0, 0, 0, 0.52)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.22)';
            e.currentTarget.style.boxShadow = '0 24px 70px rgba(0, 0, 0, 0.38)';
          }}>
            <div style={{ marginBottom: '20px', color: '#60a5fa' }}>
              <BarChart size={48} strokeWidth={2} />
            </div>
            <h2 style={{ margin: '0 0 12px', fontSize: '1.5rem', color: '#ffffff' }}>Acompanhamento</h2>
            <span style={{ display: 'inline-block', marginTop: '12px', fontWeight: 900, color: '#60a5fa', letterSpacing: '0.02em' }}>Acessar →</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MenuServicos;