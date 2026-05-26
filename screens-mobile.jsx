// Let it Cast — mobile screens
// All screens designed for iPhone-ish 402×874 inside IOSDevice frame.
// Each screen returns just the inner content (no device chrome).

const M = {
  bg: 'var(--lic-paper-2)',
  paper: 'var(--lic-paper)',
  ink: 'var(--lic-ink)',
  muted: 'var(--lic-muted)',
  line: 'var(--lic-line)',
};

// Tiny iOS-style status bar (own version, since we draw scenes inside cards)
function PhoneStatus({ time = '9:41' }) {
  return (
    <div style={{
      height: 54, display: 'flex', alignItems: 'flex-end',
      justifyContent: 'space-between', padding: '0 28px 8px',
      fontFamily: '-apple-system, system-ui', fontWeight: 600, fontSize: 15,
      color: M.ink,
    }}>
      <span>{time}</span>
      <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <svg width="17" height="11" viewBox="0 0 17 11"><rect x="0" y="7" width="3" height="4" rx="0.6" fill="#0A0A0B"/><rect x="4.5" y="5" width="3" height="6" rx="0.6" fill="#0A0A0B"/><rect x="9" y="3" width="3" height="8" rx="0.6" fill="#0A0A0B"/><rect x="13.5" y="0" width="3" height="11" rx="0.6" fill="#0A0A0B"/></svg>
        <svg width="24" height="11" viewBox="0 0 24 11"><rect x="0.5" y="0.5" width="20" height="10" rx="2.5" stroke="#0A0A0B" strokeOpacity="0.5" fill="none"/><rect x="2" y="2" width="17" height="7" rx="1.5" fill="#0A0A0B"/><path d="M22 4v3c.6-.2 1-.7 1-1.5S22.6 4.2 22 4z" fill="#0A0A0B" fillOpacity="0.5"/></svg>
      </span>
    </div>
  );
}

// Top header (logo + actions)
function MobileTop({ T, action, title }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '6px 20px 14px',
    }}>
      <LicLogo size={18}/>
      <div style={{ display: 'flex', gap: 8 }}>
        {action}
        <button style={{
          width: 36, height: 36, borderRadius: 999,
          background: 'var(--lic-paper)', border: '1px solid var(--lic-line)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}><Ico.bell size={16}/></button>
      </div>
    </div>
  );
}

// Bottom tab bar
function MobileTabs({ active = 'home', T }) {
  const tabs = [
    { id: 'home',  label: T.feed,       icon: <Ico.home size={20}/> },
    { id: 'fire',  label: T.snapApply,  icon: <Ico.bolt size={20}/> },
    { id: 'inbox', label: T.auditions,  icon: <Ico.film size={20}/> },
    { id: 'me',    label: T.profile,    icon: <Ico.user size={20}/> },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      paddingBottom: 26, paddingTop: 10,
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid var(--lic-line)',
      display: 'flex', justifyContent: 'space-around',
    }}>
      {tabs.map(t => (
        <div key={t.id} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          color: active === t.id ? M.ink : M.muted,
        }}>
          {t.icon}
          <span style={{ fontSize: 10, fontWeight: 600 }}>{t.label}</span>
        </div>
      ))}
    </div>
  );
}

// ── SCREEN 1 — Casting Feed (for talents) ─────────────────────────────
function ScreenFeed({ T, onOpenCasting }) {
  const clickable = typeof onOpenCasting === 'function';
  return (
    <div className="lic" style={{ background: M.bg, height: '100%', position: 'relative', overflow: 'hidden' }}>
      <PhoneStatus/>
      <MobileTop T={T} action={
        <button style={{ width: 36, height: 36, borderRadius: 999, background: 'var(--lic-paper)', border: '1px solid var(--lic-line)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Ico.search size={16}/>
        </button>
      }/>

      <div style={{ padding: '0 20px 100px', overflowY: 'auto', height: 'calc(100% - 90px)' }}>
        {/* Greeting */}
        <div className="lic-display" style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.05, marginBottom: 4 }}>
          Hey Maya —<br/>
          <span style={{ color: M.muted, fontWeight: 600 }}>4 new roles match your profile.</span>
        </div>

        {/* Filter chips row */}
        <div style={{ display: 'flex', gap: 8, marginTop: 18, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
          <Chip variant="ink" size="md">⚡ {T.forYou}</Chip>
          <Chip size="md">{T.new}</Chip>
          <Chip size="md">{T.nearMe}</Chip>
          <Chip size="md">Film</Chip>
          <Chip size="md">TV</Chip>
        </div>

        {/* Featured swipe card (Snap Apply) */}
        <div onClick={clickable ? onOpenCasting : undefined} style={{
          position: 'relative', height: 340, borderRadius: 22, overflow: 'hidden',
          background: '#0A0A0B', marginBottom: 14, boxShadow: 'var(--sh-2)',
          cursor: clickable ? 'pointer' : 'default',
        }}>
          <Portrait name="Maya" color="#2A2435" dark
                    style={{ position: 'absolute', inset: 0 }}/>
          {/* Top label */}
          <div style={{ position: 'absolute', top: 14, left: 14, right: 14, display: 'flex', justifyContent: 'space-between' }}>
            <Chip variant="ink" size="md" style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff' }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: '#FFC400' }}/>
              {T.snapApply}
            </Chip>
            <div style={{
              padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600,
              background: 'rgba(255,255,255,0.16)', color: '#fff', backdropFilter: 'blur(20px)',
            }}>{T.closes} 1d 09h</div>
          </div>
          {/* Bottom content */}
          <div style={{ position: 'absolute', left: 18, right: 18, bottom: 16, color: '#fff' }}>
            <div className="lic-mono" style={{ fontSize: 11, opacity: 0.7, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Echo Park · WMG</div>
            <div className="lic-display" style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.05, margin: '6px 0 10px' }}>
              The Drifter
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <Chip variant="ink" style={{ background: 'rgba(255,255,255,0.16)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}>Music video</Chip>
              <Chip variant="ink" style={{ background: 'rgba(255,255,255,0.16)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}>{T.age} 22–40</Chip>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <button style={{
                flex: 1, height: 44, borderRadius: 12, border: 'none',
                background: '#fff', color: M.ink, fontWeight: 700, fontSize: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}><Ico.bolt size={16}/> Snap apply</button>
              <button style={{
                width: 44, height: 44, borderRadius: 12, border: '1px solid rgba(255,255,255,0.3)',
                background: 'rgba(255,255,255,0.08)', color: '#fff',
              }}><Ico.x size={18}/></button>
            </div>
          </div>
          {/* Match score badge */}
          <div style={{
            position: 'absolute', top: 56, right: 14,
            background: '#FFC400', color: '#0A0A0B',
            padding: '8px 12px', borderRadius: 12, textAlign: 'center',
            boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
          }}>
            <div className="lic-mono" style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{T.matchScore}</div>
            <div className="lic-display" style={{ fontSize: 26, fontWeight: 800, lineHeight: 1 }}>78</div>
          </div>
        </div>

        {/* Section title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 10, marginBottom: 10 }}>
          <h3 className="lic-display" style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>{T.feed}</h3>
          <span style={{ fontSize: 12, color: M.muted, fontWeight: 600 }}>{T.seeAll}</span>
        </div>

        {/* List items */}
        {CASTINGS.slice(0, 3).map(c => (
          <div key={c.id} onClick={clickable ? onOpenCasting : undefined} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            background: 'var(--lic-paper)', borderRadius: 14,
            padding: 10, marginBottom: 8,
            boxShadow: 'var(--sh-1)',
            cursor: clickable ? 'pointer' : 'default',
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 10, position: 'relative',
              background: c.accent, flexShrink: 0, overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'repeating-linear-gradient(135deg, transparent 0 8px, rgba(0,0,0,0.08) 8px 9px)',
              }}/>
              <div className="lic-display" style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, fontWeight: 800, color: c.accent === '#FFC400' ? '#7A5A00' : '#fff',
              }}>{c.title[0]}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
                <div className="lic-display" style={{ fontSize: 15, fontWeight: 700 }}>{c.title}</div>
                <Chip variant="mist">{c.match} match</Chip>
              </div>
              <div style={{ fontSize: 12, color: M.muted, marginTop: 2 }}>{c.role} · {c.type}</div>
              <div style={{ display: 'flex', gap: 10, marginTop: 6, fontSize: 11, color: M.muted, fontFamily: 'var(--font-mono)' }}>
                <span>📍 {c.location}</span>
                <span>⏱ {c.closes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <MobileTabs active="home" T={T}/>
    </div>
  );
}

// ── SCREEN 2 — Casting Call Detail ────────────────────────────────────
function ScreenCastingDetail({ T, onSelfTape, onBack }) {
  const c = CASTINGS[0]; // Evermore
  return (
    <div className="lic" style={{ background: M.bg, height: '100%', position: 'relative', overflow: 'hidden' }}>
      <PhoneStatus/>
      {/* Header with back */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 20px 14px' }}>
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 999, background: 'var(--lic-paper)', border: '1px solid var(--lic-line)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: onBack ? 'pointer' : 'default' }}>
          <Ico.back size={16}/>
        </button>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ width: 36, height: 36, borderRadius: 999, background: 'var(--lic-paper)', border: '1px solid var(--lic-line)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico.share size={15}/></button>
          <button style={{ width: 36, height: 36, borderRadius: 999, background: 'var(--lic-paper)', border: '1px solid var(--lic-line)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico.more size={15}/></button>
        </div>
      </div>

      <div style={{ padding: '0 20px 120px', overflowY: 'auto', height: 'calc(100% - 90px)' }}>
        {/* Brief video card */}
        <div style={{
          position: 'relative', height: 200, borderRadius: 18, overflow: 'hidden',
          background: '#1B1B1B', marginBottom: 16,
        }}>
          <div style={{ position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at 50% 40%, #4F2D3A 0%, #1B1B1B 70%)' }}/>
          <div style={{ position: 'absolute', inset: 0,
            background: 'repeating-linear-gradient(135deg, transparent 0 16px, rgba(255,255,255,0.04) 16px 17px)' }}/>
          {/* Play button */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              width: 64, height: 64, borderRadius: 999,
              background: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Ico.play size={24} stroke="#0A0A0B"/>
            </div>
          </div>
          <div style={{ position: 'absolute', top: 12, left: 12 }}>
            <Chip variant="ink" style={{ background: 'rgba(255,255,255,0.18)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: '#E5283A' }}/>
              Director's brief
            </Chip>
          </div>
          <div style={{ position: 'absolute', bottom: 12, right: 12, color: '#fff', fontFamily: 'var(--font-mono)', fontSize: 11 }}>2:14</div>
        </div>

        {/* Title block */}
        <div className="lic-mono" style={{ fontSize: 11, color: M.muted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{c.type} · A24</div>
        <div className="lic-display" style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.05, margin: '6px 0 6px' }}>{c.title}</div>
        <div style={{ fontSize: 15, color: M.muted, fontWeight: 500 }}>{T.role}: <strong style={{ color: M.ink }}>{c.role}</strong></div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 18, marginBottom: 16 }}>
          {[
            { l: T.deadline, v: c.closes },
            { l: T.pay, v: c.pay },
            { l: T.location, v: c.location.split(' ')[0] },
          ].map(s => (
            <div key={s.l} style={{ background: 'var(--lic-paper)', borderRadius: 12, padding: '10px 12px', boxShadow: 'var(--sh-1)' }}>
              <div className="lic-mono" style={{ fontSize: 9, color: M.muted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.l}</div>
              <div className="lic-display" style={{ fontSize: 15, fontWeight: 700, marginTop: 2 }}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* Role brief */}
        <Card padded={true} style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <strong style={{ fontSize: 14, fontWeight: 700 }}>{T.notesFromCD}</strong>
            <Chip variant="yellow">⚡ AI summary</Chip>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.55, color: '#3A3A40', margin: 0 }}>
            Fanny is 27, sharp, electric, the kind of voice that hijacks a room.
            We're looking for someone who can play vulnerable and ruthless in the
            same breath. Read the bar scene as if you're about to lose everything
            — and you know it.
          </p>
        </Card>

        {/* Sides */}
        <Card padded={true} style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <strong style={{ fontSize: 14, fontWeight: 700 }}>{T.sides}</strong>
            <span style={{ fontSize: 11, color: M.muted, fontFamily: 'var(--font-mono)' }}>{c.sides} PAGES</span>
          </div>
          <div style={{ background: 'var(--lic-paper-3)', borderRadius: 10, padding: '12px 14px', fontFamily: 'var(--font-mono)', fontSize: 11.5, lineHeight: 1.6 }}>
            <div style={{ color: M.muted }}>INT. BAR — NIGHT</div>
            <div style={{ marginTop: 8 }}><strong>FANNY</strong></div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12.5 }}>You think I haven't tried to leave? I packed a bag every Sunday for two years.</div>
            <div style={{ marginTop: 8 }}><strong>JAKE</strong></div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12.5 }}>So what's stopping you tonight?</div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11, color: M.muted, display: 'flex', gap: 10, alignItems: 'center' }}>
            <Ico.download size={13}/> PDF available · Print friendly
          </div>
        </Card>

        {/* Specs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
          {[
            ['Age', c.age], ['Union', 'SAG-AFTRA'], ['Type', 'Lead'], ['Shooting', 'Sep — Oct 2026']
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', flexDirection: 'column', padding: '8px 12px', borderLeft: '2px solid var(--lic-mist)' }}>
              <span className="lic-mono" style={{ fontSize: 9, color: M.muted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{k}</span>
              <span style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky CTA */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '14px 20px 30px',
        background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 30%)',
        backdropFilter: 'blur(10px)',
      }}>
        <Btn variant="primary" size="lg" full onClick={onSelfTape} icon={<Ico.record size={16} stroke="#fff"/>}>
          Self-tape your audition
        </Btn>
      </div>
    </div>
  );
}

// ── SCREEN 3 — Talent Profile (Persistent Performance Profile) ────────
function ScreenTalentProfile({ T }) {
  return (
    <div className="lic" style={{ background: M.bg, height: '100%', position: 'relative', overflow: 'hidden' }}>
      <PhoneStatus/>
      <MobileTop T={T} action={null}/>

      <div style={{ padding: '0 20px 100px', overflowY: 'auto', height: 'calc(100% - 90px)' }}>
        {/* Identity */}
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <Portrait name="Maya" color="#FCD9DD" style={{ width: 72, height: 72, borderRadius: 18 }}/>
          <div style={{ flex: 1 }}>
            <div className="lic-display" style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.1 }}>Maya Reyes</div>
            <div style={{ fontSize: 13, color: M.muted, marginTop: 2 }}>Actress · Los Angeles</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
              <Chip variant="mist">SAG-AFTRA</Chip>
              <Chip variant="green">✓ Verified</Chip>
            </div>
          </div>
        </div>

        {/* Persistent Performance Profile — hero card */}
        <div style={{
          marginTop: 16, padding: 16, borderRadius: 18,
          background: 'linear-gradient(135deg, #0A0A0B 0%, #1B1B1B 100%)',
          color: '#fff', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -40, right: -40, width: 180, height: 180,
            background: 'radial-gradient(circle, rgba(255,196,0,0.3) 0%, transparent 70%)',
          }}/>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <div>
              <div className="lic-mono" style={{ fontSize: 10, opacity: 0.7, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {T.perfProfile}
              </div>
              <div className="lic-display" style={{ fontSize: 18, fontWeight: 700, marginTop: 4, lineHeight: 1.2 }}>
                Built from 28 auditions
              </div>
            </div>
            <Chip style={{ background: 'rgba(255,255,255,0.16)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
              ⚡ Live
            </Chip>
          </div>

          {/* Performance attributes (mini bars) */}
          <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { l: 'Vulnerability',   v: 0.92, c: '#FFC400' },
              { l: 'Comedic timing',  v: 0.74, c: '#1E5AF5' },
              { l: 'Physical range',  v: 0.61, c: '#E5283A' },
              { l: 'Vocal command',   v: 0.83, c: '#16A34A' },
            ].map(a => (
              <div key={a.l}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, opacity: 0.85 }}>{a.l}</span>
                  <span className="lic-mono" style={{ fontSize: 11, opacity: 0.7 }}>{Math.round(a.v*100)}</span>
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.12)', borderRadius: 999 }}>
                  <div style={{ width: `${a.v*100}%`, height: '100%', background: a.c, borderRadius: 999 }}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 12 }}>
          {[
            { l: T.auditionsCount, v: '28' },
            { l: T.callbacksCount, v: '7' },
            { l: T.bookings, v: '3' },
          ].map(s => (
            <div key={s.l} style={{ background: 'var(--lic-paper)', borderRadius: 12, padding: '12px', boxShadow: 'var(--sh-1)', textAlign: 'left' }}>
              <div className="lic-display" style={{ fontSize: 22, fontWeight: 700 }}>{s.v}</div>
              <div className="lic-mono" style={{ fontSize: 9, color: M.muted, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Reels */}
        <div style={{ marginTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h3 className="lic-display" style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>{T.reel}</h3>
          <span style={{ fontSize: 12, color: M.muted, fontWeight: 600 }}>{T.seeAll}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 8 }}>
          {[
            { c: '#FFE7CC', l: 'Drama' },
            { c: '#D6ECF8', l: 'Comedy' },
            { c: '#FCD9DD', l: 'Action' },
          ].map(r => (
            <div key={r.l} style={{
              position: 'relative', aspectRatio: '3/4', borderRadius: 12, overflow: 'hidden',
              background: r.c,
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'repeating-linear-gradient(135deg, transparent 0 10px, rgba(0,0,0,0.08) 10px 11px)',
              }}/>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 32, height: 32, borderRadius: 999, background: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Ico.play size={12} stroke="#0A0A0B"/>
                </div>
              </div>
              <div className="lic-mono" style={{ position: 'absolute', left: 8, bottom: 6, fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{r.l}</div>
            </div>
          ))}
        </div>

        {/* Info block */}
        <Card padded style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              [T.height, '170 cm'],
              [T.agency, 'Vertice Talent'],
              [T.contact, 'maya@vertice.co'],
              ['Languages', 'English, Spanish'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span style={{ color: M.muted }}>{k}</span>
                <span style={{ fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <MobileTabs active="me" T={T}/>
    </div>
  );
}

// ── SCREEN 4 — Talent Dashboard (My auditions) ────────────────────────
function ScreenTalentDashboard({ T }) {
  const auditions = [
    { c: CASTINGS[0], status: 'reviewing', date: 'Sent 3d ago', icon: '⏳' },
    { c: CASTINGS[1], status: 'shortlisted', date: 'Shortlisted yesterday', icon: '★' },
    { c: CASTINGS[2], status: 'submitted',  date: 'Sent 1h ago', icon: '✓' },
    { c: CASTINGS[3], status: 'todo', date: 'Self-tape due in 2d', icon: '●' },
  ];
  const statusMap = {
    reviewing: { l: 'Under review', v: 'mist' },
    shortlisted: { l: 'Shortlisted', v: 'yellow' },
    submitted: { l: 'Just sent', v: 'green' },
    todo: { l: 'To self-tape', v: 'red' },
  };
  return (
    <div className="lic" style={{ background: M.bg, height: '100%', position: 'relative', overflow: 'hidden' }}>
      <PhoneStatus/>
      <MobileTop T={T} action={null}/>

      <div style={{ padding: '0 20px 100px', overflowY: 'auto', height: 'calc(100% - 90px)' }}>
        <div className="lic-display" style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.05 }}>{T.auditions}</div>
        <div style={{ fontSize: 14, color: M.muted, marginTop: 4 }}>4 active · 1 needs your attention</div>

        {/* Activity sparkline (cute) */}
        <Card padded style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div>
              <div className="lic-mono" style={{ fontSize: 9, color: M.muted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Last 14 days</div>
              <div className="lic-display" style={{ fontSize: 22, fontWeight: 700, marginTop: 2 }}>+12 plays</div>
            </div>
            <Chip variant="green">+38%</Chip>
          </div>
          <svg viewBox="0 0 200 50" style={{ width: '100%', height: 40 }}>
            <polyline fill="none" stroke="#0A0A0B" strokeWidth="1.6"
              points="0,40 20,32 40,38 60,22 80,28 100,20 120,24 140,12 160,18 180,10 200,8"/>
            <circle cx="200" cy="8" r="3" fill="#FFC400"/>
          </svg>
        </Card>

        {/* Auditions list */}
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {auditions.map(a => (
            <div key={a.c.id} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: 'var(--lic-paper)', borderRadius: 14,
              padding: 12, boxShadow: 'var(--sh-1)',
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 10, position: 'relative',
                background: a.c.accent, flexShrink: 0, overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', inset: 0,
                  background: 'repeating-linear-gradient(135deg, transparent 0 7px, rgba(0,0,0,0.08) 7px 8px)' }}/>
                <div className="lic-display" style={{
                  position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, fontWeight: 800, color: a.c.accent === '#FFC400' ? '#7A5A00' : '#fff',
                }}>{a.c.title[0]}</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="lic-display" style={{ fontSize: 14, fontWeight: 700 }}>{a.c.title}</div>
                <div style={{ fontSize: 11, color: M.muted, marginTop: 2 }}>{a.c.role} · {a.date}</div>
              </div>
              <Chip variant={statusMap[a.status].v}>{statusMap[a.status].l}</Chip>
            </div>
          ))}
        </div>

        {/* Insight card */}
        <div style={{
          marginTop: 14, padding: 14, borderRadius: 16,
          background: 'var(--lic-mist-soft)', border: '1px solid var(--lic-mist)',
          display: 'flex', gap: 12, alignItems: 'center',
        }}>
          <div style={{ width: 36, height: 36, borderRadius: 999, background: '#FFC400', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Ico.sparkles size={18} stroke="#0A0A0B"/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 13 }}>Smart nudge</div>
            <div style={{ fontSize: 12, color: M.muted, marginTop: 2 }}>3 new roles match your performance profile. Tap to see.</div>
          </div>
          <Ico.arrow size={16}/>
        </div>
      </div>

      <MobileTabs active="inbox" T={T}/>
    </div>
  );
}

// ── SCREEN 5 — Submission flow (Review → Upload → Done) ───────────────
function ScreenSubmission({ T, step = 'review', onNext, onBack }) {
  // step: 'review' | 'uploading' | 'done'
  const c = CASTINGS[0];
  return (
    <div className="lic" style={{ background: M.bg, height: '100%', position: 'relative', overflow: 'hidden' }}>
      <PhoneStatus/>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 20px 14px' }}>
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 999, background: 'var(--lic-paper)', border: '1px solid var(--lic-line)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: onBack ? 'pointer' : 'default' }}>
          <Ico.back size={16}/>
        </button>
        <Chip variant="ink" size="md">Step 3 of 3</Chip>
        <div style={{ width: 36 }}/>
      </div>

      <div style={{ padding: '0 20px 30px', overflowY: 'auto', height: 'calc(100% - 90px)' }}>
        <div className="lic-mono" style={{ fontSize: 11, color: M.muted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{c.title} · {c.role}</div>
        <div className="lic-display" style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.05, marginTop: 6 }}>
          {step === 'done' ? T.done + ' 🎬' : step === 'uploading' ? T.submitting : 'Review your audition'}
        </div>

        {step === 'review' && (
          <>
            {/* Video preview */}
            <div style={{
              marginTop: 16, aspectRatio: '4/5', borderRadius: 18, overflow: 'hidden',
              background: '#1B1B1B', position: 'relative',
            }}>
              <Portrait name="Maya" color="#2A2435" dark style={{ position: 'absolute', inset: 0 }}/>
              <div style={{ position: 'absolute', top: 12, left: 12 }}>
                <Chip variant="ink" style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                  TAKE 3 · 1:14
                </Chip>
              </div>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: 999, background: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Ico.play size={22} stroke="#0A0A0B"/>
                </div>
              </div>
              {/* Scrubber */}
              <div style={{ position: 'absolute', left: 14, right: 14, bottom: 14 }}>
                <div style={{ height: 3, background: 'rgba(255,255,255,0.25)', borderRadius: 999, position: 'relative' }}>
                  <div style={{ width: '38%', height: '100%', background: '#fff', borderRadius: 999 }}/>
                  <div style={{ position: 'absolute', left: '38%', top: '50%', transform: 'translate(-50%, -50%)', width: 10, height: 10, background: '#fff', borderRadius: 999 }}/>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-mono)', fontSize: 10 }}>
                  <span>0:26</span><span>1:14</span>
                </div>
              </div>
            </div>

            {/* Take selector */}
            <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
              {[1,2,3,4].map(i => (
                <div key={i} style={{
                  flex: 1, aspectRatio: '4/5', borderRadius: 10,
                  background: i === 3 ? '#1B1B1B' : 'var(--lic-paper-3)',
                  position: 'relative', overflow: 'hidden',
                  border: i === 3 ? '2px solid #FFC400' : '1px solid var(--lic-line)',
                }}>
                  <div className="lic-mono" style={{
                    position: 'absolute', top: 4, left: 6, fontSize: 9, fontWeight: 700,
                    color: i === 3 ? '#fff' : M.muted,
                  }}>T{i}</div>
                  {i === 3 && <div style={{ position: 'absolute', bottom: 4, right: 6 }}>
                    <Ico.check size={12} stroke="#FFC400"/>
                  </div>}
                </div>
              ))}
            </div>

            {/* Optional note */}
            <Card padded style={{ marginTop: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <strong style={{ fontSize: 13 }}>Add a note to casting</strong>
                <Chip variant="ghost">Optional</Chip>
              </div>
              <div style={{ fontSize: 13, color: M.muted, padding: '6px 0' }}>"Excited about Fanny — wanted to lean into her quietness rather than her edge."</div>
            </Card>

            {/* AI checks */}
            <Card padded style={{ marginTop: 10 }}>
              <strong style={{ fontSize: 13 }}>AI quality check</strong>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
                {[
                  { l: 'Framing', s: 'Good — head room ok', ok: true },
                  { l: 'Audio',   s: 'Clean, low room noise', ok: true },
                  { l: 'Lighting',s: 'Soft, slightly cool',   ok: true },
                ].map(r => (
                  <div key={r.l} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 18, height: 18, borderRadius: 999, background: 'var(--lic-yes)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Ico.check size={11} stroke="#fff"/>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{r.l}</span>
                    <span style={{ fontSize: 12, color: M.muted }}>{r.s}</span>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {step === 'uploading' && (
          <div style={{ marginTop: 20 }}>
            <div style={{ aspectRatio: '4/5', borderRadius: 18, overflow: 'hidden', background: '#1B1B1B', position: 'relative' }}>
              <Portrait name="Maya" color="#2A2435" dark style={{ position: 'absolute', inset: 0 }}/>
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }}/>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', gap: 14 }}>
                <div style={{ width: 80, height: 80, borderRadius: 999, border: '3px solid rgba(255,255,255,0.2)', borderTopColor: '#FFC400', animation: 'spin 1.4s linear infinite' }}/>
                <div className="lic-display" style={{ fontSize: 18, fontWeight: 700 }}>68%</div>
              </div>
            </div>
            <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { l: T.uploading, ok: true, s: '64.2 MB · 1080p' },
                { l: T.encoding, ok: 'now', s: 'Encoding for review' },
                { l: T.notifying, ok: false, s: 'Pinging Evermore casting' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 18, height: 18, borderRadius: 999,
                    background: r.ok === true ? 'var(--lic-yes)' : r.ok === 'now' ? '#FFC400' : 'var(--lic-line-strong)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {r.ok === true && <Ico.check size={11} stroke="#fff"/>}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: r.ok === false ? M.muted : M.ink }}>{r.l}</span>
                  <span style={{ fontSize: 12, color: M.muted }}>{r.s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 'done' && (
          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <div style={{
              width: 120, height: 120, borderRadius: 999, margin: '0 auto',
              background: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 12px 36px rgba(22,163,74,0.32)',
            }}>
              <Ico.check size={56} stroke="#fff" sw={3}/>
            </div>
            <div className="lic-display" style={{ fontSize: 22, fontWeight: 700, marginTop: 20 }}>
              Audition submitted
            </div>
            <div style={{ fontSize: 14, color: M.muted, marginTop: 6, padding: '0 20px' }}>
              {T.nextNote}
            </div>
            <Card padded style={{ marginTop: 20, textAlign: 'left' }}>
              <strong style={{ fontSize: 13 }}>{T.nextSteps}</strong>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Encoded & delivered', 'Casting team notified', 'Rating expected ~48h'].map((l, i) => (
                  <div key={l} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ width: 18, height: 18, borderRadius: 999, background: i === 2 ? 'var(--lic-mist-soft)' : 'var(--lic-yes)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {i !== 2 && <Ico.check size={11} stroke="#fff"/>}
                    </div>
                    <span style={{ fontSize: 13 }}>{l}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Sticky CTA */}
      {step !== 'uploading' && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '14px 20px 30px',
          background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 30%)',
        }}>
          <Btn variant="primary" size="lg" full onClick={onNext}
               icon={step === 'done' ? <Ico.arrow size={16} stroke="#fff"/> : <Ico.send size={16} stroke="#fff"/>}>
            {step === 'done' ? T.backHome : T.submit}
          </Btn>
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// Export to window
Object.assign(window, {
  ScreenFeed, ScreenCastingDetail, ScreenTalentProfile, ScreenTalentDashboard, ScreenSubmission,
});
