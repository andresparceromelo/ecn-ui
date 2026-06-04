import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const features = [
  {
    icon: '⚡',
    title: 'Métricas Clínicas Reales',
    desc: 'Calcula tu FFMI, SWR y 1RM usando la fórmula científica de Brzycki. Sin estimaciones.',
  },
  {
    icon: '📊',
    title: 'Seguimiento de Progresión',
    desc: 'Registra cada sesión y visualiza tu progresión a lo largo del tiempo.',
  },
  {
    icon: '🏆',
    title: 'Categorización Inteligente',
    desc: 'Tu nivel se determina automáticamente mediante una matriz ponderada de fuerza, masa y experiencia.',
  },
  {
    icon: '🔒',
    title: 'Datos 100% Seguros',
    desc: 'Autenticación JWT. Tu información clínica nunca se comparte ni se expone.',
  },
];

const stats = [
  { value: '4', label: 'Niveles de categoría' },
  { value: '3+', label: 'Métricas clínicas' },
  { value: '100%', label: 'Basado en ciencia' },
];

const checkmarks = [
  'Acceso a tu perfil clínico completo',
  'Registro de levantamientos con 1RM calculado',
  'Categorización automática de nivel atlético',
  'Dashboard de progresión personalizado',
];

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#080b14',
        color: '#ffffff',
        fontFamily: "'Inter', -apple-system, sans-serif",
        overflowX: 'hidden',
      }}
    >
      {/* ── NAVBAR ── */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 48px',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background:
            scrollY > 20
              ? 'rgba(8,11,20,0.85)'
              : 'transparent',
          backdropFilter: scrollY > 20 ? 'blur(20px)' : 'none',
          borderBottom:
            scrollY > 20
              ? '1px solid rgba(255,255,255,0.06)'
              : '1px solid transparent',
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3eb489, #8a2be2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
            }}
          >
            ⚡
          </div>
          <span style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
            ecn<span style={{ color: '#3eb489' }}>.</span>
          </span>
        </div>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Link
            to="/login"
            style={{
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
          >
            Iniciar sesión
          </Link>
          <Link
            to="/login"
            style={{
              background: 'linear-gradient(135deg, #8a2be2, #6a0dad)',
              color: 'white',
              padding: '10px 24px',
              borderRadius: '100px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              boxShadow: '0 4px 16px rgba(138,43,226,0.35)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(138,43,226,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(138,43,226,0.35)';
            }}
          >
            Empieza ahora →
          </Link>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section
        style={{
          position: 'relative',
          minHeight: '90vh',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          gap: 64,
          padding: '80px 48px 100px',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        {/* Gradient blobs */}
        <div
          style={{
            position: 'absolute',
            top: '-5%',
            left: '-15%',
            width: 700,
            height: 700,
            background:
              'radial-gradient(circle, rgba(62,180,137,0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-10%',
            right: '-5%',
            width: 600,
            height: 600,
            background:
              'radial-gradient(circle, rgba(138,43,226,0.18) 0%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }}
        />

        {/* Left content */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(62,180,137,0.1)',
              color: '#3eb489',
              padding: '6px 14px',
              borderRadius: '100px',
              fontWeight: 600,
              fontSize: '0.82rem',
              marginBottom: 28,
              border: '1px solid rgba(62,180,137,0.2)',
              letterSpacing: '0.3px',
            }}
          >
            <span>✦</span>
            <span>Plataforma de rendimiento deportivo</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              marginBottom: 24,
              letterSpacing: '-1.5px',
            }}
          >
            El rendimiento{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #3eb489, #8a2be2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              atlético,
            </span>
            <br />
            elevado a ciencia.
          </h1>

          <p
            style={{
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.55)',
              marginBottom: 36,
              lineHeight: 1.7,
              maxWidth: 480,
            }}
          >
            ECN analiza tus métricas clínicas basales y categoriza tu nivel
            atlético automáticamente. Desde principiante hasta élite.
          </p>

          {/* Checkmarks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
            {checkmarks.map((item) => (
              <div
                key={item}
                style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.92rem', color: 'rgba(255,255,255,0.75)' }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: 'rgba(62,180,137,0.15)',
                    border: '1px solid rgba(62,180,137,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: '0.65rem',
                    color: '#3eb489',
                  }}
                >
                  ✓
                </div>
                {item}
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            to="/login"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: 'linear-gradient(135deg, #8a2be2, #6a0dad)',
              color: 'white',
              padding: '16px 36px',
              borderRadius: '100px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              boxShadow: '0 8px 32px rgba(138,43,226,0.4)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(138,43,226,0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(138,43,226,0.4)';
            }}
          >
            Empieza ahora
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Right panel - App preview card */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 24,
              padding: 28,
              backdropFilter: 'blur(20px)',
              boxShadow: '0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            {/* Window chrome */}
            <div style={{ display: 'flex', gap: 7, marginBottom: 20 }}>
              {['#ff5f56', '#ffbd2e', '#27c93f'].map((c) => (
                <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
              ))}
            </div>

            {/* Profile card */}
            <div
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 12,
                padding: '16px 20px',
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3eb489, #8a2be2)',
                  flexShrink: 0,
                }}
              />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Carlos A.</div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: '#3eb489',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    marginTop: 2,
                  }}
                >
                  ● ADVANCED
                </div>
              </div>
              <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>FFMI</div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#3eb489' }}>22.4</div>
              </div>
            </div>

            {/* Metrics grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
              {[
                { label: 'SWR', value: '4.8×', color: '#8a2be2' },
                { label: 'Squat 1RM', value: '140 kg', color: '#3eb489' },
                { label: 'Deadlift', value: '170 kg', color: '#f59e0b' },
              ].map((m) => (
                <div
                  key={m.label}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 10,
                    padding: '12px 10px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    {m.label}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: m.color }}>{m.value}</div>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>
                <span>Progreso al siguiente nivel</span>
                <span style={{ color: '#3eb489' }}>68%</span>
              </div>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                <div
                  style={{
                    width: '68%',
                    height: '100%',
                    background: 'linear-gradient(90deg, #3eb489, #8a2be2)',
                    borderRadius: 3,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <div
            style={{
              position: 'absolute',
              bottom: -20,
              left: -20,
              background: 'rgba(8,11,20,0.9)',
              border: '1px solid rgba(62,180,137,0.3)',
              borderRadius: 12,
              padding: '10px 16px',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '0.8rem',
              fontWeight: 600,
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            }}
          >
            <span>🔬</span>
            <span style={{ color: '#3eb489' }}>Análisis clínico completado</span>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '40px 48px',
          background: 'rgba(255,255,255,0.02)',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: 32,
          }}
        >
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  background: 'linear-gradient(90deg, #3eb489, #8a2be2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-1px',
                }}
              >
                {s.value}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginTop: 4 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES SECTION ── */}
      <section style={{ padding: '100px 48px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 800,
              marginBottom: 16,
              letterSpacing: '-0.5px',
            }}
          >
            Una plataforma inteligente,
            <br />
            <span
              style={{
                background: 'linear-gradient(90deg, #3eb489, #8a2be2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              construida para atletas.
            </span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.05rem', maxWidth: 520, margin: '0 auto' }}>
            Cada funcionalidad está diseñada para que entiendas exactamente en qué punto de tu desarrollo estás.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 24,
          }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16,
                padding: '28px 32px',
                transition: 'border-color 0.3s, background 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(62,180,137,0.3)';
                e.currentTarget.style.background = 'rgba(62,180,137,0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: 'rgba(62,180,137,0.12)',
                  border: '1px solid rgba(62,180,137,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  marginBottom: 18,
                }}
              >
                {f.icon}
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 8 }}>{f.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── POWERHOUSE DARK SECTION ── */}
      <section
        style={{
          background: 'linear-gradient(135deg, rgba(138,43,226,0.15) 0%, rgba(62,180,137,0.08) 100%)',
          border: '1px solid rgba(255,255,255,0.06)',
          margin: '0 48px',
          borderRadius: 32,
          padding: '80px 64px',
          textAlign: 'center',
          marginBottom: 80,
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            letterSpacing: '-1px',
            marginBottom: 16,
          }}
        >
          Tu laboratorio atlético,
          <br />
          <span style={{ color: '#3eb489' }}>en tu bolsillo.</span>
        </h2>
        <p
          style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: '1.05rem',
            maxWidth: 560,
            margin: '0 auto 40px',
            lineHeight: 1.7,
          }}
        >
          Completa tu perfil clínico una sola vez. El sistema calcula tu FFMI, SWR y tu categoría 
          utilizando fórmulas validadas por la ciencia del deporte.
        </p>
        <Link
          to="/login"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: '#ffffff',
            color: '#080b14',
            padding: '16px 40px',
            borderRadius: '100px',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '1rem',
            transition: 'all 0.25s ease',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)';
          }}
        >
          Empieza ahora →
        </Link>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '32px 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'rgba(255,255,255,0.35)',
          fontSize: '0.85rem',
        }}
      >
        <span>
          <strong style={{ color: 'rgba(255,255,255,0.7)' }}>ecn.</strong> Plataforma de rendimiento atlético
        </span>
        <span>© 2026 · Todos los derechos reservados</span>
      </footer>
    </div>
  );
}
