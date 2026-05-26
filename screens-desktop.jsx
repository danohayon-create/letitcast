// Let it Cast — Desktop screens (1440×900 target for browser-window)
// 1) Casting dashboard (production back-end)
// 2) Auditions review (the star — improved version of the supplied screenshot)
//    + variant: grid compare layout

const D = {
  bg: 'var(--lic-paper-2)',
  paper: 'var(--lic-paper)',
  ink: 'var(--lic-ink)',
  muted: 'var(--lic-muted)',
  line: 'var(--lic-line)',
  lineStrong: 'var(--lic-line-strong)',
};

// Top nav shared across desktop screens
function DesktopNav({ T, active = 'castings', user = 'Peter Known' }) {
  const tabs = [
    { id: 'castings', l: T.feed },
    { id: 'home',     l: 'Home' },
    { id: 'actors',   l: 'Actors' },
    { id: 'help',     l: 'Help' },
  ];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 28,
      padding: '14px 28px', borderBottom: '1px solid var(--lic-line)',
      background: 'var(--lic-paper)',
    }}>
      <LicLogo size={18}/>
      <div style={{ display: 'flex', gap: 4 }}>
        {tabs.map(t => (
          <div key={t.id} style={{
            padding: '8px 12px', borderRadius: 8, fontSize: 13, fontWeight: 600,
            color: active === t.id ? D.ink : D.muted,
            background: active === t.id ? 'var(--lic-mist-soft)' : 'transparent',
          }}>{t.l}</div>
        ))}
      </div>
      <div style={{ flex: 1 }}/>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '7px 12px', borderRadius: 10,
        background: 'var(--lic-paper-3)', border: '1px solid var(--lic-line)',
        fontSize: 13, color: D.muted, minWidth: 260,
      }}>
        <Ico.search size={15}/>
        <span>Search talent, project, role…</span>
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 10, padding: '2px 6px', background: 'var(--lic-paper)', borderRadius: 4, border: '1px solid var(--lic-line)' }}>⌘K</span>
      </div>
      <span style={{ fontSize: 12, color: D.muted, fontWeight: 600 }}>EN (FR)</span>
      <button style={{ width: 32, height: 32, borderRadius: 999, border: '1px solid var(--lic-line)', background: 'var(--lic-paper)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Ico.bell size={15}/>
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Avatar name={user} size={30}/>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600 }}>{user}</div>
          <div style={{ fontSize: 10, color: D.muted, fontFamily: 'var(--font-mono)' }}>Casting director · A24</div>
        </div>
      </div>
    </div>
  );
}

// ── SCREEN 6 — Casting dashboard (production back-end) ───────────────
function ScreenCastingDashboard({ T }) {
  const projects = [
    { title: 'Evermore',     type: 'Series · A24',   roles: 12, subs: 390, status: 'casting',   color: '#FFC400', deadline: 'in 3 days' },
    { title: 'Rive Droite',  type: 'Film · Pathé',   roles: 5,  subs: 142, status: 'casting',   color: '#1E5AF5', deadline: 'in 5 days' },
    { title: 'Echo Park',    type: 'Music video',    roles: 2,  subs: 88,  status: 'shortlist', color: '#E5283A', deadline: 'tomorrow' },
    { title: 'La Nuit Vive', type: 'Theatre · TNP',  roles: 7,  subs: 64,  status: 'briefing',  color: '#16A34A', deadline: 'next week' },
  ];
  return (
    <div className="lic" style={{ background: D.bg, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <DesktopNav T={T} active="castings"/>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <div style={{
          width: 220, padding: '20px 12px', borderRight: '1px solid var(--lic-line)',
          display: 'flex', flexDirection: 'column', gap: 4, background: 'var(--lic-paper)',
        }}>
          <div className="lic-mono" style={{ fontSize: 9, color: D.muted, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '8px 10px 4px' }}>{T.projects}</div>
          {projects.map((p, i) => (
            <div key={p.title} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 10px', borderRadius: 8,
              background: i === 0 ? 'var(--lic-mist-soft)' : 'transparent',
            }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: p.color, flexShrink: 0 }}/>
              <span style={{ fontSize: 13, fontWeight: i === 0 ? 700 : 500 }}>{p.title}</span>
              <span style={{ marginLeft: 'auto', fontSize: 10, fontFamily: 'var(--font-mono)', color: D.muted }}>{p.subs}</span>
            </div>
          ))}
          <button style={{
            marginTop: 10, padding: '9px 10px', borderRadius: 8, border: '1px dashed var(--lic-line-strong)',
            background: 'transparent', color: D.muted, fontSize: 12, fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <Ico.plus size={14}/> {T.new_cast}
          </button>

          <div className="lic-mono" style={{ fontSize: 9, color: D.muted, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '20px 10px 4px' }}>Team</div>
          {[
            { n: 'Peter Known', r: 'Casting director' },
            { n: 'Eden Tov',    r: 'Producer' },
            { n: 'Julie Cohen', r: 'Assistant' },
            { n: 'Lara Khan',   r: 'Director' },
          ].map(m => (
            <div key={m.n} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px' }}>
              <Avatar name={m.n} size={22}/>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{m.n}</div>
                <div style={{ fontSize: 10, color: D.muted }}>{m.r}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px' }}>
          {/* Project header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 22 }}>
            <div style={{
              width: 64, height: 80, borderRadius: 10, position: 'relative',
              background: '#FFC400', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', inset: 0,
                background: 'repeating-linear-gradient(135deg, transparent 0 10px, rgba(0,0,0,0.08) 10px 11px)' }}/>
              <div className="lic-display" style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, fontWeight: 800, color: '#7A5A00',
              }}>E</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className="lic-mono" style={{ fontSize: 10, color: D.muted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Series · A24 · Drama</div>
              <h1 className="lic-display" style={{ fontSize: 32, fontWeight: 700, margin: '4px 0 6px', letterSpacing: '-0.02em' }}>Evermore</h1>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: D.muted }}>
                <span>Casting closes <strong style={{ color: D.ink }}>Sep 14</strong></span>
                <span style={{ width: 3, height: 3, background: D.muted, borderRadius: 999 }}/>
                <span>Shooting <strong style={{ color: D.ink }}>Oct — Dec 2026</strong></span>
                <span style={{ width: 3, height: 3, background: D.muted, borderRadius: 999 }}/>
                <span>Los Angeles</span>
              </div>
            </div>
            <Btn variant="secondary" icon={<Ico.share size={14}/>}>Share</Btn>
            <Btn variant="primary" icon={<Ico.plus size={14} stroke="#fff"/>}>New role</Btn>
          </div>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginBottom: 22 }}>
            {[
              { l: T.roles, v: '12', d: '4 lead · 8 supporting' },
              { l: T.submissions, v: '390', d: '+47 today', up: true },
              { l: T.shortlist, v: '28', d: '7 ready for callback' },
              { l: T.cb, v: '4', d: 'next: Sep 18' },
              { l: T.booked, v: '1', d: 'lead booked' },
            ].map((s, i) => (
              <div key={i} style={{ background: D.paper, borderRadius: 12, padding: '14px 16px', boxShadow: 'var(--sh-1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="lic-mono" style={{ fontSize: 9, color: D.muted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.l}</span>
                  {s.up && <Chip variant="green">↑</Chip>}
                </div>
                <div className="lic-display" style={{ fontSize: 28, fontWeight: 700, marginTop: 4, letterSpacing: '-0.02em' }}>{s.v}</div>
                <div style={{ fontSize: 11, color: D.muted, marginTop: 2 }}>{s.d}</div>
              </div>
            ))}
          </div>

          {/* Roles table */}
          <Card padded={false} style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderBottom: '1px solid var(--lic-line)' }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {[ 'All roles (12)', 'Lead (4)', 'Supporting (8)', 'Booked (1)' ].map((l, i) => (
                  <button key={l} style={{
                    padding: '7px 12px', borderRadius: 8, border: 'none',
                    background: i === 0 ? 'var(--lic-paper-3)' : 'transparent',
                    color: i === 0 ? D.ink : D.muted,
                    fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  }}>{l}</button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Btn variant="ghost" size="sm" icon={<Ico.filter size={13}/>}>Filter</Btn>
                <Btn variant="ghost" size="sm" icon={<Ico.list size={13}/>}>Sort</Btn>
              </div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: 'var(--lic-paper-2)' }}>
                  {['Role', 'Type', 'Submissions', 'Shortlist', 'Status', 'Deadline', ''].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 16px', fontSize: 10, fontWeight: 700, color: D.muted, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { r: 'Fanny Brice', t: 'Lead', s: 132, sl: 9, st: 'Reviewing', stc: 'mist', d: 'Sep 14' },
                  { r: 'Jake Holloway', t: 'Lead', s: 98,  sl: 6, st: 'Callbacks',  stc: 'yellow', d: 'Sep 16' },
                  { r: 'Margaret', t: 'Supporting', s: 67, sl: 5, st: 'Reviewing', stc: 'mist', d: 'Sep 22' },
                  { r: 'Lieutenant Sam', t: 'Supporting', s: 54, sl: 4, st: 'Open',  stc: 'green', d: 'Oct 02' },
                  { r: 'Young Fanny', t: 'Supporting', s: 39, sl: 4, st: 'Open',    stc: 'green', d: 'Oct 02' },
                ].map((r, i) => (
                  <tr key={i} style={{ borderTop: '1px solid var(--lic-line)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{r.r}</td>
                    <td style={{ padding: '12px 16px', color: D.muted }}>{r.t}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{r.s}</span>
                        <div style={{ width: 80, height: 4, background: 'var(--lic-paper-3)', borderRadius: 999, overflow: 'hidden' }}>
                          <div style={{ width: `${Math.min(r.s/2, 100)}%`, height: '100%', background: '#0A0A0B' }}/>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)' }}>{r.sl}</td>
                    <td style={{ padding: '12px 16px' }}><Chip variant={r.stc}>{r.st}</Chip></td>
                    <td style={{ padding: '12px 16px', color: D.muted, fontFamily: 'var(--font-mono)' }}>{r.d}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <button style={{ padding: '5px 10px', borderRadius: 8, border: '1px solid var(--lic-line-strong)', background: D.paper, fontSize: 12, fontWeight: 600 }}>Open</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* Two-column lower */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginTop: 16 }}>
            <Card padded>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h3 className="lic-display" style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Submissions over time</h3>
                <Chip variant="ghost">Last 14 days</Chip>
              </div>
              <svg viewBox="0 0 600 140" style={{ width: '100%', height: 140 }}>
                <defs>
                  <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#FFC400" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#FFC400" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d="M0,110 L40,95 L80,98 L120,80 L160,76 L200,60 L240,68 L280,50 L320,55 L360,40 L400,30 L440,42 L480,28 L520,22 L560,30 L600,18"
                      fill="none" stroke="#0A0A0B" strokeWidth="2"/>
                <path d="M0,110 L40,95 L80,98 L120,80 L160,76 L200,60 L240,68 L280,50 L320,55 L360,40 L400,30 L440,42 L480,28 L520,22 L560,30 L600,18 L600,140 L0,140 Z"
                      fill="url(#grad)"/>
                {[110, 95, 98, 80, 76, 60, 68, 50, 55, 40, 30, 42, 28, 22, 30, 18].map((y, i) => (
                  <circle key={i} cx={i*40} cy={y} r="2.5" fill="#0A0A0B"/>
                ))}
              </svg>
            </Card>
            <Card padded>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h3 className="lic-display" style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Activity</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { who: 'Eden Tov', what: 'rated Maya Reyes', tag: 'Good match', tc: 'green', t: '2m' },
                  { who: 'Julie Cohen', what: 'shortlisted Theo Vance', tag: 'Shortlist', tc: 'yellow', t: '14m' },
                  { who: 'Lara Khan', what: 'left a note on Sofia Bello', tag: 'Note', tc: 'mist', t: '1h' },
                  { who: 'Eden Tov', what: 'invited Noor to callback', tag: 'Callback', tc: 'blue', t: '3h' },
                ].map((a, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <Avatar name={a.who} size={26}/>
                    <div style={{ flex: 1, minWidth: 0, fontSize: 12 }}>
                      <span style={{ fontWeight: 600 }}>{a.who}</span>{' '}
                      <span style={{ color: D.muted }}>{a.what}</span>
                      <div style={{ display: 'flex', gap: 6, marginTop: 4, alignItems: 'center' }}>
                        <Chip variant={a.tc}>{a.tag}</Chip>
                        <span style={{ fontSize: 10, color: D.muted, fontFamily: 'var(--font-mono)' }}>{a.t} ago</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SCREEN 7 — Auditions Review (the original screen — polished) ──────
function ScreenReview({ T, layout = 'classic' }) {
  if (layout === 'grid') return <ScreenReviewGrid T={T}/>;
  return <ScreenReviewClassic T={T}/>;
}

// Classic layout: left big video + right ratings panel (improved version
// of supplied screenshot)
function ScreenReviewClassic({ T }) {
  const others = [
    { i: 'ET', n: 'Eden Tov', r: 'maybe' },
    { i: 'JC', n: 'Julie Cohen', r: 'yes' },
    { i: 'LK', n: 'Lara Khan',   r: 'yes' },
  ];
  return (
    <div className="lic" style={{ background: D.bg, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <DesktopNav T={T} active="castings"/>

      <div style={{ padding: '20px 32px 24px', overflowY: 'auto', flex: 1 }}>
        {/* Breadcrumb + selector */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: D.muted }}>
            <span>Evermore</span> <Ico.arrow size={11}/>
            <span>Fanny Brice</span> <Ico.arrow size={11}/>
            <span style={{ color: D.ink, fontWeight: 700 }}>Maya Reyes</span>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Btn variant="secondary" size="sm">390 auditions ▼</Btn>
            <button style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--lic-line)', background: D.paper, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico.message size={14}/></button>
            <button style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--lic-line)', background: D.paper, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico.user size={14}/></button>
            <button style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--lic-line)', background: D.paper, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico.back size={14}/></button>
            <button style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--lic-line)', background: D.paper, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico.arrow size={14}/></button>
          </div>
        </div>

        {/* Header: name + role */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <h1 className="lic-display" style={{ fontSize: 28, fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>Maya Reyes</h1>
              <span style={{ fontSize: 14, color: D.muted }}>as <strong style={{ color: D.ink }}>Fanny Brice</strong></span>
              <Chip variant="yellow">⚡ 92 match</Chip>
            </div>
            <div style={{ display: 'flex', gap: 14, marginTop: 8, fontSize: 12, color: D.muted, alignItems: 'center' }}>
              <span>{T.height} <strong style={{ color: D.ink }}>170 cm</strong></span>
              <span style={{ width: 3, height: 3, background: D.muted, borderRadius: 999 }}/>
              <span>{T.agency} <strong style={{ color: D.ink }}>Vertice Talent</strong></span>
              <span style={{ width: 3, height: 3, background: D.muted, borderRadius: 999 }}/>
              <span>{T.contact} <strong style={{ color: D.ink }}>maya@vertice.co</strong></span>
              <span style={{ width: 3, height: 3, background: D.muted, borderRadius: 999 }}/>
              <a style={{ color: '#1E5AF5', fontWeight: 600 }}>CV</a>
              <a style={{ color: '#1E5AF5', fontWeight: 600 }}>Reel</a>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn variant="secondary" size="sm" icon={<Ico.pin size={13}/>}>Shortlist</Btn>
            <Btn variant="primary" size="sm" icon={<Ico.send size={13} stroke="#fff"/>}>Invite to callback</Btn>
          </div>
        </div>

        {/* Main grid: video + rating + transcript */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 320px', gap: 18, alignItems: 'start' }}>
          {/* Video */}
          <div>
            <div style={{
              position: 'relative', aspectRatio: '16/9', borderRadius: 14, overflow: 'hidden',
              background: '#1B1B1B', boxShadow: 'var(--sh-2)',
            }}>
              <Portrait name="Maya" color="#3A2A2A" dark style={{ position: 'absolute', inset: 0 }}/>
              <div style={{ position: 'absolute', top: 12, left: 12 }}>
                <Chip variant="ink" style={{ background: 'rgba(0,0,0,0.55)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <span style={{ width: 6, height: 6, borderRadius: 999, background: '#FFC400' }}/>
                  Take 3 · best of 4
                </Chip>
              </div>
              <div style={{ position: 'absolute', top: 12, right: 12 }}>
                <Chip variant="ink" style={{ background: 'rgba(0,0,0,0.55)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                  Scene 14 · Bar
                </Chip>
              </div>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 76, height: 76, borderRadius: 999, background: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Ico.play size={28} stroke="#0A0A0B"/>
                </div>
              </div>
              <div style={{ position: 'absolute', left: 16, right: 16, bottom: 14 }}>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.25)', borderRadius: 999, position: 'relative' }}>
                  <div style={{ width: '58%', height: '100%', background: '#FFC400', borderRadius: 999 }}/>
                  <div style={{ position: 'absolute', left: '58%', top: '50%', transform: 'translate(-50%, -50%)', width: 12, height: 12, background: '#fff', borderRadius: 999, boxShadow: '0 0 0 4px rgba(255,196,0,0.4)' }}/>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, color: '#fff', fontFamily: 'var(--font-mono)', fontSize: 11 }}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    <Ico.play size={14} stroke="#fff" fill="#fff"/>
                    <Ico.mic size={14} stroke="#fff"/>
                    <span>00:47 / 01:14</span>
                  </div>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    <span>1.0×</span>
                    <Ico.download size={14} stroke="#fff"/>
                    <Ico.eye size={14} stroke="#fff"/>
                  </div>
                </div>
              </div>
            </div>

            {/* Below video: tabs */}
            <div style={{ display: 'flex', gap: 16, marginTop: 16, borderBottom: '1px solid var(--lic-line)' }}>
              {['Transcript', 'AI scene analysis', 'Other takes (4)', 'CV', 'Reel'].map((t, i) => (
                <div key={t} style={{
                  padding: '8px 0', fontSize: 13, fontWeight: 600,
                  color: i === 0 ? D.ink : D.muted,
                  borderBottom: i === 0 ? '2px solid #0A0A0B' : 'none', marginBottom: -1,
                }}>{t}</div>
              ))}
            </div>

            {/* Transcript */}
            <div style={{ marginTop: 14, fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.7, color: '#3A3A40' }}>
              <span style={{ background: '#FFF6D6', padding: '0 4px' }}>00:12</span>{' '}
              <strong style={{ color: D.ink }}>FANNY:</strong> You think I haven't tried to leave?{' '}
              <span style={{ background: '#FFF6D6', padding: '0 4px' }}>00:18</span>{' '}
              I packed a bag every Sunday for two years.{' '}
              <span style={{ background: '#FFF6D6', padding: '0 4px' }}>00:24</span>{' '}
              <strong style={{ color: D.ink }}>JAKE:</strong> So what's stopping you tonight?{' '}
              <span style={{ background: '#FFF6D6', padding: '0 4px' }}>00:31</span>{' '}
              <strong style={{ color: D.ink }}>FANNY:</strong> <em>You.</em> The version of you who used to laugh.
            </div>

            {/* Comments */}
            <div style={{ marginTop: 24 }}>
              <h3 className="lic-display" style={{ fontSize: 14, fontWeight: 700, margin: '0 0 12px' }}>Comments</h3>
              {[
                { n: 'Peter Known', r: 'Casting director', t: 'Probably the right actor for the role. Let\'s gather to discuss.', a: '2m ago' },
                { n: 'Eden Tov',    r: 'Producer',         t: 'Agreed — her quiet rage in the second beat is exactly what we wrote.', a: '1h ago' },
              ].map(c => (
                <div key={c.n} style={{ display: 'flex', gap: 12, marginBottom: 12, padding: 12, background: D.paper, borderRadius: 12, boxShadow: 'var(--sh-1)' }}>
                  <Avatar name={c.n} size={32}/>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                      <strong style={{ fontSize: 13 }}>{c.n}</strong>
                      <span style={{ fontSize: 11, color: D.muted }}>{c.r}</span>
                      <span style={{ fontSize: 11, color: D.muted, marginLeft: 'auto' }}>{c.a}</span>
                    </div>
                    <div style={{ fontSize: 13, marginTop: 4, lineHeight: 1.5 }}>{c.t}</div>
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <Avatar name="You" size={32} color="#0A0A0B"/>
                <div style={{ flex: 1, padding: '10px 12px', borderRadius: 12, background: D.paper, border: '1px dashed var(--lic-line-strong)', fontSize: 13, color: D.muted }}>Add a comment to the team…</div>
              </div>
            </div>
          </div>

          {/* Right rating panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Card padded>
              <h3 className="lic-display" style={{ fontSize: 14, fontWeight: 700, margin: '0 0 12px', textAlign: 'center' }}>{T.rating}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button style={{
                  height: 44, borderRadius: 10, border: 'none', cursor: 'pointer',
                  background: 'var(--lic-no)', color: '#fff', fontWeight: 700, fontSize: 14,
                }}>{T.nogo}</button>
                <button style={{
                  height: 44, borderRadius: 10, border: 'none', cursor: 'pointer',
                  background: 'var(--lic-maybe)', color: '#0A0A0B', fontWeight: 700, fontSize: 14,
                }}>{T.maybe}</button>
                <button style={{
                  height: 44, borderRadius: 10, border: '2px solid var(--lic-yes)', cursor: 'pointer',
                  background: '#DEF4E5', color: 'var(--lic-yes)', fontWeight: 700, fontSize: 14,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}><Ico.check size={16} stroke="var(--lic-yes)" sw={2.5}/> {T.goodMatch}</button>
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 12, padding: '8px 0', borderTop: '1px solid var(--lic-line)' }}>
                {[1,2,3,4,5].map(s => (
                  <Ico.star key={s} size={18} stroke="#FFC400" fill={s <= 4 ? "#FFC400" : "none"}/>
                ))}
                <span style={{ fontSize: 12, color: D.muted, marginLeft: 'auto' }}>4.0 / 5</span>
              </div>
            </Card>

            <Card padded>
              <h3 className="lic-display" style={{ fontSize: 13, fontWeight: 700, margin: '0 0 10px' }}>{T.otherRatings}</h3>
              <div style={{ display: 'flex', gap: 6 }}>
                {others.map(o => {
                  const c = o.r === 'yes' ? '#16A34A' : o.r === 'maybe' ? '#F5B400' : '#E5283A';
                  return (
                    <div key={o.i} title={o.n} style={{
                      width: 36, height: 36, borderRadius: 8, background: c,
                      color: '#fff', fontWeight: 700, fontSize: 12,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>{o.i}</div>
                  );
                })}
                <div style={{
                  width: 36, height: 36, borderRadius: 8, background: 'var(--lic-paper-3)',
                  color: D.muted, fontSize: 14, border: '1px dashed var(--lic-line-strong)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><Ico.plus size={14}/></div>
              </div>
              <div style={{ fontSize: 11, color: D.muted, marginTop: 8 }}>3 of 5 teammates have rated</div>
            </Card>

            <Card padded>
              <h3 className="lic-display" style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px' }}>AI scene analysis</h3>
              <div style={{ fontSize: 11, color: D.muted, marginBottom: 10 }}>Auto-generated from the take</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { l: 'Emotional range', v: 0.86 },
                  { l: 'Memorization',    v: 1.0 },
                  { l: 'Eye contact',     v: 0.74 },
                  { l: 'Pacing',          v: 0.68 },
                ].map(a => (
                  <div key={a.l}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                      <span>{a.l}</span>
                      <span className="lic-mono" style={{ color: D.muted }}>{Math.round(a.v*100)}</span>
                    </div>
                    <div style={{ height: 4, background: 'var(--lic-paper-3)', borderRadius: 999 }}>
                      <div style={{ width: `${a.v*100}%`, height: '100%', background: '#0A0A0B', borderRadius: 999 }}/>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card padded>
              <h3 className="lic-display" style={{ fontSize: 13, fontWeight: 700, margin: '0 0 4px' }}>{T.feedback}</h3>
              <div style={{ fontSize: 11, color: D.muted, marginBottom: 10 }}>Sent privately to the actor</div>
              <a style={{ color: '#1E5AF5', fontWeight: 600, fontSize: 13 }}>Send feedback →</a>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Variant: grid compare 4 candidates at a time
function ScreenReviewGrid({ T }) {
  const subs = [
    { name: 'Maya Reyes',     agency: 'Vertice', match: 92, role: 'yes',    take: 3, c: '#FCD9DD' },
    { name: 'Inès Karim',     agency: 'Vertice', match: 87, role: 'maybe',  take: 2, c: '#FFE7CC' },
    { name: 'Sofia Bello',    agency: 'Wildcard',match: 84, role: null,     take: 1, c: '#FBEBC1' },
    { name: 'Noor Haddad',    agency: 'Atlas',   match: 79, role: 'maybe',  take: 3, c: '#E8DDFB' },
    { name: 'Léa Martin',     agency: 'Bureau A',match: 76, role: 'no',     take: 2, c: '#D6ECF8' },
    { name: 'Margot Chen',    agency: 'Open',    match: 71, role: null,     take: 1, c: '#D5F0DC' },
    { name: 'Eva Sokolov',    agency: 'Wildcard',match: 68, role: 'maybe',  take: 2, c: '#FCD9DD' },
    { name: 'Jordan Cole',    agency: 'Atlas',   match: 65, role: null,     take: 1, c: '#FFE7CC' },
  ];
  const ratingPill = (r) => {
    if (r === 'yes') return <Chip variant="green">✓ Good</Chip>;
    if (r === 'maybe') return <Chip variant="yellow">~ Maybe</Chip>;
    if (r === 'no') return <Chip variant="red">✗ No go</Chip>;
    return <Chip>Unrated</Chip>;
  };
  return (
    <div className="lic" style={{ background: D.bg, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <DesktopNav T={T} active="castings"/>
      <div style={{ padding: '20px 32px 24px', overflowY: 'auto', flex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div className="lic-mono" style={{ fontSize: 10, color: D.muted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Evermore · Fanny Brice</div>
            <h1 className="lic-display" style={{ fontSize: 26, fontWeight: 700, margin: '4px 0 4px', letterSpacing: '-0.02em' }}>
              132 submissions · compare mode
            </h1>
            <div style={{ fontSize: 13, color: D.muted }}>Rate as you watch. Press 1 — no go · 2 — maybe · 3 — good match</div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Btn variant="secondary" size="sm" icon={<Ico.list size={13}/>}>Single view</Btn>
            <Btn variant="ink" size="sm" icon={<Ico.grid size={13} stroke="#fff"/>} style={{ background: '#0A0A0B', color: '#fff', border: '1px solid #0A0A0B' }}>Grid</Btn>
            <Btn variant="secondary" size="sm" icon={<Ico.filter size={13}/>}>Filter</Btn>
            <Btn variant="secondary" size="sm" icon={<Ico.list size={13}/>}>Sort: Top match</Btn>
          </div>
        </div>

        {/* Filter chips */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <Chip variant="ink" size="md">All 132</Chip>
          <Chip size="md">Unrated 84</Chip>
          <Chip size="md">Good match 18</Chip>
          <Chip size="md">Maybe 23</Chip>
          <Chip size="md">No go 7</Chip>
          <div style={{ flex: 1 }}/>
          <Chip variant="yellow" size="md">⚡ AI rerank by performance fit</Chip>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {subs.map((s, i) => (
            <Card key={i} padded={false} style={{ overflow: 'hidden' }}>
              <div style={{ position: 'relative', aspectRatio: '4/5', background: s.c, overflow: 'hidden' }}>
                <Portrait name={s.name} color={s.c} style={{ position: 'absolute', inset: 0 }}/>
                <div style={{ position: 'absolute', top: 8, left: 8 }}>
                  <Chip variant="ink" size="sm" style={{ background: 'rgba(0,0,0,0.55)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                    T{s.take}
                  </Chip>
                </div>
                <div style={{ position: 'absolute', top: 8, right: 8 }}>
                  <Chip variant="yellow" size="sm">{s.match}</Chip>
                </div>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 999, background: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Ico.play size={16} stroke="#0A0A0B"/>
                  </div>
                </div>
                {/* Quick rate strip */}
                <div style={{
                  position: 'absolute', left: 0, right: 0, bottom: 0,
                  display: 'flex', gap: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 100%)',
                  padding: 6,
                }}>
                  <button style={{ flex: 1, height: 28, borderRadius: 6, border: 'none', background: '#E5283A', color: '#fff', fontWeight: 700, fontSize: 11, margin: 1 }}>{T.nogo}</button>
                  <button style={{ flex: 1, height: 28, borderRadius: 6, border: 'none', background: '#F5B400', color: '#0A0A0B', fontWeight: 700, fontSize: 11, margin: 1 }}>{T.maybe}</button>
                  <button style={{ flex: 1, height: 28, borderRadius: 6, border: 'none', background: '#16A34A', color: '#fff', fontWeight: 700, fontSize: 11, margin: 1 }}>{T.goodMatch}</button>
                </div>
              </div>
              <div style={{ padding: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: 13 }}>{s.name}</strong>
                  {ratingPill(s.role)}
                </div>
                <div style={{ fontSize: 11, color: D.muted, marginTop: 2 }}>{s.agency} · 1:14</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenCastingDashboard, ScreenReview });
