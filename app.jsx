// Let it Cast — main app
// Wires every screen into a DesignCanvas with sections for the
// talent journey (mobile) and the production back-end (desktop).
// Tweaks panel: language toggle (EN/FR), review variant.

const LIC_DEFAULTS = /*EDITMODE-BEGIN*/{
  "lang": "en",
  "reviewLayout": "classic",
  "selfTapeFocus": 1
}/*EDITMODE-END*/;

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

function MacFrame({ children, url = 'app.letitcast.com' }) {
  return (
    <div className="lic-mac">
      <div className="lic-mac-bar">
        <span className="dot" style={{ background: '#ff5f57' }}/>
        <span className="dot" style={{ background: '#febc2e' }}/>
        <span className="dot" style={{ background: '#28c840' }}/>
        <div className="url">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6b6b73" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          {url}
        </div>
      </div>
      <div className="lic-mac-body">{children}</div>
    </div>
  );
}

function App() {
  const [t, setT] = window.useTweaks(LIC_DEFAULTS);
  const T = (window.COPY)[t.lang] || window.COPY.en;
  const lang = t.lang;

  return (
    <>
      <window.DesignCanvas>
        {/* Brand strip / cover */}
        <window.DCSection
          id="cover"
          title="Let it Cast — investor demo"
          subtitle="From a casting call to a booked talent — full product walkthrough">
          <window.DCArtboard id="cover" label="Cover" width={1180} height={420}>
            <CoverArtboard T={T}/>
          </window.DCArtboard>
        </window.DCSection>

        {/* Talent journey (mobile) */}
        <window.DCSection
          id="talent"
          title="1. Talent journey — mobile"
          subtitle="Maya, an actress on iPhone — discover · audition · submit · track">
          <window.DCArtboard id="t1" label="01 · Profile" width={422} height={890}>
            <MobileFrame>
              <window.ScreenTalentProfile T={T}/>
            </MobileFrame>
          </window.DCArtboard>
          <window.DCArtboard id="t2" label="02 · Casting feed" width={422} height={890}>
            <MobileFrame>
              <window.ScreenFeed T={T}/>
            </MobileFrame>
          </window.DCArtboard>
          <window.DCArtboard id="t3" label="03 · Casting detail" width={422} height={890}>
            <MobileFrame>
              <window.ScreenCastingDetail T={T}/>
            </MobileFrame>
          </window.DCArtboard>
          <window.DCArtboard id="t4" label="04 · My auditions" width={422} height={890}>
            <MobileFrame>
              <window.ScreenTalentDashboard T={T}/>
            </MobileFrame>
          </window.DCArtboard>
        </window.DCSection>

        {/* Self-tape (THE screen) — 3 interactive variants */}
        <window.DCSection
          id="selftape"
          title="2. Self-tape recording — the star screen"
          subtitle="Three layouts. Tap record on any of them — fully interactive.">
          <window.DCArtboard id="st1" label="A · Classic" width={422} height={890}>
            <MobileFrame dark>
              <window.SelfTape T={T} layout={1}/>
            </MobileFrame>
          </window.DCArtboard>
          <window.DCArtboard id="st2" label="B · Teleprompter" width={422} height={890}>
            <MobileFrame dark>
              <window.SelfTape T={T} layout={2}/>
            </MobileFrame>
          </window.DCArtboard>
          <window.DCArtboard id="st3" label="C · Director" width={422} height={890}>
            <MobileFrame dark>
              <window.SelfTape T={T} layout={3}/>
            </MobileFrame>
          </window.DCArtboard>
        </window.DCSection>

        {/* Submission flow */}
        <window.DCSection
          id="submit"
          title="3. Online submission"
          subtitle="Review → encode → notify casting team">
          <window.DCArtboard id="s1" label="A · Review take" width={422} height={890}>
            <MobileFrame>
              <window.ScreenSubmission T={T} step="review"/>
            </MobileFrame>
          </window.DCArtboard>
          <window.DCArtboard id="s2" label="B · Uploading" width={422} height={890}>
            <MobileFrame>
              <window.ScreenSubmission T={T} step="uploading"/>
            </MobileFrame>
          </window.DCArtboard>
          <window.DCArtboard id="s3" label="C · Submitted" width={422} height={890}>
            <MobileFrame>
              <window.ScreenSubmission T={T} step="done"/>
            </MobileFrame>
          </window.DCArtboard>
        </window.DCSection>

        {/* Production / casting director (desktop) */}
        <window.DCSection
          id="prod"
          title="4. Production back-end — desktop"
          subtitle="Casting director dashboard + collaborative auditions review">
          <window.DCArtboard id="d1" label="01 · Casting dashboard" width={1460} height={920}>
            <MacFrame url="app.letitcast.com/evermore">
              <window.ScreenCastingDashboard T={T}/>
            </MacFrame>
          </window.DCArtboard>
          <window.DCArtboard id="d2" label={t.reviewLayout === 'grid' ? '02 · Review (grid compare)' : '02 · Review (classic)'} width={1460} height={920}>
            <MacFrame url="app.letitcast.com/evermore/fanny/maya-reyes">
              <window.ScreenReview T={T} layout={t.reviewLayout}/>
            </MacFrame>
          </window.DCArtboard>
        </window.DCSection>

        {/* Social feed + talent search */}
        <window.DCSection
          id="social"
          title="5. Social network — LinkedIn-style for the industry"
          subtitle="A feed where talents, casting directors and productions share — plus a talent recruiter back-office">
          <window.DCArtboard id="feed" label="01 · Social feed" width={1460} height={920}>
            <MacFrame url="app.letitcast.com/feed">
              <window.ScreenSocialFeed T={T}/>
            </MacFrame>
          </window.DCArtboard>
          <window.DCArtboard id="search" label="02 · Talent recruiter" width={1460} height={920}>
            <MacFrame url="app.letitcast.com/recruiter">
              <window.ScreenTalentSearch T={T}/>
            </MacFrame>
          </window.DCArtboard>
        </window.DCSection>

        {/* Landing page */}
        <window.DCSection
          id="landing"
          title="6. Landing page — for VC investors"
          subtitle="Public site · English — open the standalone file to scroll through">
          <window.DCArtboard id="landing" label="letitcast.com · landing" width={1280} height={920}>
            <LandingArtboard/>
          </window.DCArtboard>
        </window.DCSection>

        {/* Summary / system */}
        <window.DCSection
          id="system"
          title="7. The system"
          subtitle="Colors, type, components used across the platform">
          <window.DCArtboard id="sys" label="Design system" width={1180} height={520}>
            <SystemArtboard T={T}/>
          </window.DCArtboard>
        </window.DCSection>
      </window.DesignCanvas>

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection label="Language">
          <window.TweakRadio
            label="Copy"
            value={t.lang}
            onChange={v => setT('lang', v)}
            options={[{ label: 'EN', value: 'en' }, { label: 'FR', value: 'fr' }]}
          />
        </window.TweakSection>
        <window.TweakSection label="Variants">
          <window.TweakRadio
            label="Review layout"
            value={t.reviewLayout}
            onChange={v => setT('reviewLayout', v)}
            options={[
              { label: 'Classic', value: 'classic' },
              { label: 'Grid', value: 'grid' },
            ]}
          />
        </window.TweakSection>
      </window.TweaksPanel>
    </>
  );
}

// ── Cover artboard ────────────────────────────────────────────────────
function CoverArtboard({ T }) {
  return (
    <div className="lic" style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(120deg, #0A0A0B 0%, #1B1B1B 60%, #272728 100%)',
      borderRadius: 18, padding: 48, color: '#fff', display: 'flex',
      gap: 48, overflow: 'hidden', position: 'relative',
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', top: -120, right: -80, width: 420, height: 420,
        background: 'radial-gradient(circle, rgba(255,196,0,0.3) 0%, transparent 70%)',
      }}/>
      <div style={{
        position: 'absolute', bottom: -120, left: 200, width: 360, height: 360,
        background: 'radial-gradient(circle, rgba(30,90,245,0.25) 0%, transparent 70%)',
      }}/>
      <div style={{ flex: 1, position: 'relative', zIndex: 2 }}>
        <window.LicLogo size={28} color="#fff"/>
        <div style={{ marginTop: 32, fontFamily: 'var(--font-mono)', fontSize: 11, opacity: 0.7, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Investor demo · v0.1 · {T === window.COPY.fr ? 'Mai 2026' : 'May 2026'}
        </div>
        <h1 className="lic-display" style={{
          fontSize: 64, fontWeight: 700, lineHeight: 1.02,
          letterSpacing: '-0.03em', margin: '14px 0 18px',
        }}>
          The real-time arena<br/>
          <span style={{ color: '#FFC400' }}>for casting.</span>
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.5, maxWidth: 560, opacity: 0.85 }}>
          Every actor, anywhere, can self-tape an audition from their phone.
          Productions review and rate the best takes — together, instantly.
          A persistent performance profile updates with every audition.
        </p>
        <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
          <window.Chip variant="ink" size="lg" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: '#FFC400' }}/>
            Self-tape · MVP
          </window.Chip>
          <window.Chip variant="ink" size="lg" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: '#E5283A' }}/>
            Auditions review · MVP
          </window.Chip>
          <window.Chip variant="ink" size="lg" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: '#1E5AF5' }}/>
            Performance profile · MVP
          </window.Chip>
        </div>
      </div>
      <div style={{ width: 260, position: 'relative', zIndex: 2 }}>
        <div style={{
          height: '100%', borderRadius: 14, overflow: 'hidden',
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
          padding: 18, display: 'flex', flexDirection: 'column', gap: 14,
        }}>
          <div className="lic-mono" style={{ fontSize: 10, opacity: 0.6, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Demo walkthrough</div>
          {[
            { n: '1', l: 'Talent journey', s: 'Mobile, 4 screens' },
            { n: '2', l: 'Self-tape recording', s: '3 layouts · interactive' },
            { n: '3', l: 'Online submission', s: 'Mobile, 3 steps' },
            { n: '4', l: 'Production back-end', s: 'Desktop, 2 screens' },
            { n: '5', l: 'Social network', s: 'Feed + Talent recruiter' },
            { n: '6', l: 'Landing page', s: 'For VC investors · EN' },
            { n: '7', l: 'The system', s: 'Colors · type · tokens' },
          ].map(s => (
            <div key={s.n} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div className="lic-display" style={{
                width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 13, flexShrink: 0,
              }}>{s.n}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{s.l}</div>
                <div style={{ fontSize: 11, opacity: 0.6 }}>{s.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── System artboard (mini design system summary) ──────────────────────
function SystemArtboard({ T }) {
  const Swatch = ({ name, val, bg, light }) => (
    <div style={{ flex: 1 }}>
      <div style={{ height: 90, borderRadius: 10, background: bg, border: '1px solid var(--lic-line)' }}/>
      <div style={{ marginTop: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 700 }}>{name}</div>
        <div className="lic-mono" style={{ fontSize: 10, color: 'var(--lic-muted)' }}>{val}</div>
      </div>
    </div>
  );
  return (
    <div className="lic" style={{
      width: '100%', height: '100%', background: 'var(--lic-paper)',
      borderRadius: 18, padding: 32, overflow: 'auto',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: 18 }}>
        <window.LicLogo size={20}/>
        <span className="lic-mono" style={{ fontSize: 10, color: 'var(--lic-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Design system · v0.1</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: 24 }}>
        {/* Colors */}
        <div>
          <h3 className="lic-display" style={{ fontSize: 15, fontWeight: 700, margin: '0 0 12px' }}>Colors</h3>
          <div className="lic-mono" style={{ fontSize: 9, color: 'var(--lic-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Brand</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            <Swatch name="Mist" val="#E2E6F3" bg="#E2E6F3"/>
            <Swatch name="Paper" val="#FFFFFF" bg="#FFFFFF"/>
            <Swatch name="Ink" val="#0A0A0B" bg="#0A0A0B"/>
            <Swatch name="Ink-2" val="#1B1B1B" bg="#1B1B1B"/>
          </div>
          <div className="lic-mono" style={{ fontSize: 9, color: 'var(--lic-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Accents (logo bars)</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            <Swatch name="Yellow" val="#FFC400" bg="#FFC400"/>
            <Swatch name="Red" val="#E5283A" bg="#E5283A"/>
            <Swatch name="Blue" val="#1E5AF5" bg="#1E5AF5"/>
          </div>
          <div className="lic-mono" style={{ fontSize: 9, color: 'var(--lic-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Rating</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Swatch name="No go" val="#E5283A" bg="#E5283A"/>
            <Swatch name="Maybe" val="#F5B400" bg="#F5B400"/>
            <Swatch name="Good" val="#16A34A" bg="#16A34A"/>
          </div>
        </div>

        {/* Type */}
        <div>
          <h3 className="lic-display" style={{ fontSize: 15, fontWeight: 700, margin: '0 0 12px' }}>Type</h3>
          <div style={{ padding: 14, borderRadius: 10, background: 'var(--lic-paper-2)', marginBottom: 10 }}>
            <div className="lic-display" style={{ fontSize: 40, fontWeight: 700, lineHeight: 1, letterSpacing: '-0.03em' }}>Aa</div>
            <div style={{ fontSize: 11, color: 'var(--lic-muted)', marginTop: 4 }}>Bricolage Grotesque · display</div>
            <div className="lic-display" style={{ fontSize: 18, fontWeight: 600, marginTop: 8 }}>Self-tape your audition</div>
          </div>
          <div style={{ padding: 14, borderRadius: 10, background: 'var(--lic-paper-2)', marginBottom: 10 }}>
            <div style={{ fontSize: 28, fontWeight: 600 }}>Aa</div>
            <div style={{ fontSize: 11, color: 'var(--lic-muted)' }}>Geist · UI</div>
            <div style={{ fontSize: 14, marginTop: 6 }}>The real-time arena for casting.</div>
          </div>
          <div style={{ padding: 14, borderRadius: 10, background: 'var(--lic-paper-2)' }}>
            <div className="lic-mono" style={{ fontSize: 22 }}>Aa</div>
            <div className="lic-mono" style={{ fontSize: 11, color: 'var(--lic-muted)' }}>JetBrains Mono · accents</div>
            <div className="lic-mono" style={{ fontSize: 12, marginTop: 4, letterSpacing: '0.04em', textTransform: 'uppercase' }}>EVERMORE · SC.14</div>
          </div>
        </div>

        {/* Components */}
        <div>
          <h3 className="lic-display" style={{ fontSize: 15, fontWeight: 700, margin: '0 0 12px' }}>Building blocks</h3>
          <div style={{ padding: 14, borderRadius: 10, background: 'var(--lic-paper-2)', marginBottom: 10 }}>
            <div className="lic-mono" style={{ fontSize: 9, color: 'var(--lic-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Chips & status</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
              <window.Chip variant="mist">Shortlisted</window.Chip>
              <window.Chip variant="yellow">⚡ 92 match</window.Chip>
              <window.Chip variant="green">✓ Good match</window.Chip>
              <window.Chip variant="red">No go</window.Chip>
              <window.Chip variant="ink">Snap apply</window.Chip>
              <window.Chip variant="blue">Callback</window.Chip>
            </div>
          </div>
          <div style={{ padding: 14, borderRadius: 10, background: 'var(--lic-paper-2)', marginBottom: 10 }}>
            <div className="lic-mono" style={{ fontSize: 9, color: 'var(--lic-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Buttons</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
              <window.Btn variant="primary" icon={<window.Ico.record size={13} stroke="#fff"/>}>Self-tape</window.Btn>
              <window.Btn variant="secondary" icon={<window.Ico.pin size={13}/>}>Shortlist</window.Btn>
              <window.Btn variant="mist" icon={<window.Ico.sparkles size={13}/>}>AI rerank</window.Btn>
              <window.Btn variant="ghost">Skip</window.Btn>
            </div>
          </div>
          <div style={{ padding: 14, borderRadius: 10, background: 'var(--lic-paper-2)' }}>
            <div className="lic-mono" style={{ fontSize: 9, color: 'var(--lic-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Rating buttons (review)</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginTop: 8 }}>
              <div style={{ height: 36, borderRadius: 8, background: '#E5283A', color: '#fff', fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' }}>No go</div>
              <div style={{ height: 36, borderRadius: 8, background: '#F5B400', color: '#0A0A0B', fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' }}>Maybe</div>
              <div style={{ height: 36, borderRadius: 8, background: '#16A34A', color: '#fff', fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' }}>Good match</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Landing artboard — preview of the standalone landing.html ─────────
function LandingArtboard() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#FAFAFB', borderRadius: 18, overflow: 'hidden', boxShadow: 'var(--sh-2)' }}>
      <iframe
        src="landing.html"
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        title="Let it Cast landing page"
      />
      <div style={{
        position: 'absolute', top: 16, right: 16, display: 'flex', gap: 8,
      }}>
        <a href="landing.html" target="_blank" rel="noreferrer"
           style={{
             padding: '10px 16px', borderRadius: 10,
             background: '#0A0A0B', color: '#fff',
             fontSize: 13, fontWeight: 600, textDecoration: 'none',
             display: 'inline-flex', alignItems: 'center', gap: 8,
             boxShadow: '0 8px 24px rgba(10,10,11,0.25)',
           }}>
          Open full page
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
