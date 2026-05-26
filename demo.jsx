// Let it Cast — Clickable mobile demo for investors
// Maya, an actress in LA, answers a casting call end-to-end.
// Flow: feed → casting detail → self-tape (Director layout) → review take → uploading → done.

const DEMO_STEPS = [
  { keys: ['feed'],                                      n: '1', l: 'Discover the role',  s: 'Casting feed → role brief' },
  { keys: ['detail'],                                    n: '1', l: 'Read the brief',     s: 'Sides · pay · deadline' },
  { keys: ['selftape'],                                  n: '2', l: 'Self-tape',          s: 'Director layout · sides + cam' },
  { keys: ['submit_review', 'submit_uploading', 'submit_done'], n: '3', l: 'Submit',     s: 'Review take → upload → done' },
];

function MobileFrame({ children, dark = false }) {
  return (
    <div className={`lic-phone ${dark ? 'lic-phone-dark' : ''}`}>
      <div className="lic-phone-inner" style={{ background: dark ? '#000' : '#FAFAFB' }}>
        <div className="lic-island"/>
        {children}
        <div className="lic-home"/>
      </div>
    </div>
  );
}

// Small pulsing hint that points at the next CTA — gives the investor
// confidence about where to tap. Lives outside the phone bezel so it never
// blocks clicks.
function TapHint({ text }) {
  return (
    <div style={{
      position: 'absolute', left: -120, top: '50%', transform: 'translateY(-50%)',
      display: 'flex', alignItems: 'center', gap: 8, opacity: 0.9,
      pointerEvents: 'none',
    }}>
      <div style={{
        padding: '6px 10px', borderRadius: 999,
        background: '#FFC400', color: '#0A0A0B',
        fontSize: 11, fontWeight: 700, letterSpacing: '0.02em',
        whiteSpace: 'nowrap', fontFamily: 'var(--font-mono)',
        boxShadow: '0 8px 24px rgba(255,196,0,0.35)',
        animation: 'tapPulse 1.6s ease-in-out infinite',
      }}>{text} →</div>
    </div>
  );
}

function App() {
  // 'feed' → 'detail' → 'selftape' → 'submit_review' → 'submit_uploading' → 'submit_done' → 'feed'
  const [screen, setScreen] = React.useState('feed');
  const T = window.COPY.en;

  // Auto-advance the uploading step (no CTA on screen — it's a spinner).
  React.useEffect(() => {
    if (screen === 'submit_uploading') {
      const t = setTimeout(() => setScreen('submit_done'), 2600);
      return () => clearTimeout(t);
    }
  }, [screen]);

  const reset = () => setScreen('feed');

  // Pick the right screen + tap hint per state.
  const isDark = screen === 'selftape';
  const tapHint = (() => {
    switch (screen) {
      case 'feed':              return 'Tap a casting';
      case 'detail':            return 'Tap Self-tape';
      case 'selftape':          return 'Tap record · then keep';
      case 'submit_review':     return 'Tap Submit';
      case 'submit_uploading':  return 'Encoding…';
      case 'submit_done':       return 'Tap Back to feed';
      default:                  return '';
    }
  })();

  let content;
  switch (screen) {
    case 'feed':
      content = <window.ScreenFeed T={T} onOpenCasting={() => setScreen('detail')}/>;
      break;
    case 'detail':
      content = <window.ScreenCastingDetail T={T}
                  onSelfTape={() => setScreen('selftape')}
                  onBack={() => setScreen('feed')}/>;
      break;
    case 'selftape':
      content = <window.SelfTape T={T} layout={3}
                  onSubmit={() => setScreen('submit_review')}
                  onClose={() => setScreen('detail')}/>;
      break;
    case 'submit_review':
      content = <window.ScreenSubmission T={T} step="review"
                  onNext={() => setScreen('submit_uploading')}
                  onBack={() => setScreen('selftape')}/>;
      break;
    case 'submit_uploading':
      content = <window.ScreenSubmission T={T} step="uploading"/>;
      break;
    case 'submit_done':
      content = <window.ScreenSubmission T={T} step="done"
                  onNext={reset}/>;
      break;
    default:
      content = null;
  }

  // Which step is "active" in the side rail (collapses detail+feed into 1, etc).
  const activeStep = (() => {
    if (screen === 'feed') return 0;
    if (screen === 'detail') return 1;
    if (screen === 'selftape') return 2;
    return 3;
  })();
  const stepsForRail = [
    { n: '1', l: 'Discover the role', s: 'Casting feed' },
    { n: '1', l: 'Read the brief',     s: 'Sides · pay · deadline' },
    { n: '2', l: 'Self-tape',          s: 'Director layout · sides + cam' },
    { n: '3', l: 'Submit',             s: 'Review → upload → done' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0A0A0B 0%, #1B1B1B 60%, #272728 100%)',
      color: '#fff', fontFamily: 'var(--font-ui)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px', overflow: 'hidden', position: 'relative',
    }}>
      {/* Ambient glows */}
      <div style={{ position: 'absolute', top: -200, right: -150, width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(255,196,0,0.18) 0%, transparent 60%)', pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', bottom: -200, left: -150, width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(30,90,245,0.15) 0%, transparent 60%)', pointerEvents: 'none' }}/>

      <div style={{
        display: 'flex', gap: 64, alignItems: 'center',
        maxWidth: 1240, width: '100%', position: 'relative', zIndex: 2,
      }}>
        {/* ── Left: narrative + step rail ── */}
        <div style={{ flex: 1, maxWidth: 520 }}>
          <window.LicLogo size={24} color="#fff"/>
          <div className="lic-mono" style={{
            fontSize: 11, opacity: 0.6, letterSpacing: '0.12em', textTransform: 'uppercase',
            marginTop: 20,
          }}>
            Investor demo · Clickable mobile flow
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 52, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.02,
            margin: '12px 0 16px',
          }}>
            How a talent answers<br/>
            <span style={{ color: '#FFC400', fontStyle: 'italic' }}>a casting call.</span>
          </h1>
          <p style={{ fontSize: 16, opacity: 0.7, lineHeight: 1.55, maxWidth: 460 }}>
            Tap through the phone on the right. Maya, an actress in LA, sees the
            new <strong style={{ color: '#fff' }}>Evermore</strong> casting, reads the brief, self-tapes
            from her phone, and submits to the production — end-to-end, in under 3 minutes.
          </p>

          <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {stepsForRail.map((st, i) => {
              const active = i === activeStep;
              const done = i < activeStep;
              return (
                <div key={i} style={{
                  display: 'flex', gap: 14, alignItems: 'center',
                  padding: '12px 14px', borderRadius: 12,
                  background: active ? 'rgba(255,196,0,0.12)'
                            : done ? 'rgba(22,163,74,0.10)'
                                   : 'rgba(255,255,255,0.04)',
                  border: active ? '1px solid #FFC400'
                        : done ? '1px solid rgba(22,163,74,0.4)'
                               : '1px solid rgba(255,255,255,0.06)',
                  transition: 'all .25s',
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: active ? '#FFC400'
                              : done ? '#16A34A'
                                     : 'rgba(255,255,255,0.08)',
                    color: active ? '#0A0A0B' : '#fff',
                    fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {done ? '✓' : st.n}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{st.l}</div>
                    <div style={{ fontSize: 12, opacity: 0.6, marginTop: 2 }}>{st.s}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
            <button onClick={reset} style={{
              padding: '10px 16px', borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.16)',
              background: 'transparent', color: '#fff',
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>↻ Restart demo</button>
            <a href="index.html" style={{
              padding: '10px 16px', borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.16)',
              background: 'transparent', color: '#fff',
              fontSize: 13, fontWeight: 600, textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>Full investor canvas →</a>
          </div>
        </div>

        {/* ── Right: phone ── */}
        <div style={{ flexShrink: 0, position: 'relative' }}>
          {tapHint && <TapHint text={tapHint}/>}
          <MobileFrame dark={isDark}>
            {content}
          </MobileFrame>
        </div>
      </div>

      <style>{`
        @keyframes tapPulse {
          0%, 100% { transform: translateY(-50%) scale(1); opacity: 0.95; }
          50%      { transform: translateY(-50%) scale(1.06); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
