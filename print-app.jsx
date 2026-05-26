// Let it Cast — print layout
// Renders every artboard from the canvas on its own page, sized to fit
// landscape A4. Auto-prints once fonts and React are ready.

// ── Cover artboard (duplicated from app.jsx for print) ───────────────
function PrintCover() {
  return (
    <div className="lic" style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(120deg, #0A0A0B 0%, #1B1B1B 60%, #272728 100%)',
      borderRadius: 18, padding: 48, color: '#fff', display: 'flex',
      gap: 48, overflow: 'hidden', position: 'relative',
    }}>
      <div style={{ position: 'absolute', top: -120, right: -80, width: 420, height: 420, background: 'radial-gradient(circle, rgba(255,196,0,0.3) 0%, transparent 70%)' }}/>
      <div style={{ position: 'absolute', bottom: -120, left: 200, width: 360, height: 360, background: 'radial-gradient(circle, rgba(30,90,245,0.25) 0%, transparent 70%)' }}/>
      <div style={{ flex: 1, position: 'relative', zIndex: 2 }}>
        <window.LicLogo size={28} color="#fff"/>
        <div style={{ marginTop: 28, fontFamily: 'var(--font-mono)', fontSize: 11, opacity: 0.7, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Investor demo · v0.1 · May 2026
        </div>
        <h1 className="lic-display" style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.02, letterSpacing: '-0.03em', margin: '14px 0 18px' }}>
          The real-time arena<br/>
          <span style={{ color: '#FFC400' }}>for casting.</span>
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.5, maxWidth: 560, opacity: 0.85 }}>
          Every actor, anywhere, can self-tape an audition from their phone.
          Productions review and rate the best takes — together, instantly.
          A persistent performance profile updates with every audition.
        </p>
        <div style={{ display: 'flex', gap: 8, marginTop: 24, flexWrap: 'wrap' }}>
          {[
            { c: '#FFC400', l: 'Self-tape · MVP' },
            { c: '#E5283A', l: 'Auditions review · MVP' },
            { c: '#1E5AF5', l: 'Performance profile · MVP' },
          ].map(c => (
            <span key={c.l} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', borderRadius: 999, fontSize: 13, fontWeight: 600,
              background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)',
            }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: c.c }}/>{c.l}
            </span>
          ))}
        </div>
      </div>
      <div style={{ width: 280, position: 'relative', zIndex: 2 }}>
        <div style={{
          height: '100%', borderRadius: 14, overflow: 'hidden',
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
          padding: 18, display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          <div className="lic-mono" style={{ fontSize: 10, opacity: 0.6, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Demo walkthrough</div>
          {[
            { n: '1', l: 'Talent journey', s: 'Mobile, 4 screens' },
            { n: '2', l: 'Self-tape recording', s: '3 layouts' },
            { n: '3', l: 'Online submission', s: 'Mobile, 3 steps' },
            { n: '4', l: 'Production back-end', s: 'Desktop, 3 screens' },
            { n: '5', l: 'Social network', s: 'Feed + Recruiter' },
            { n: '6', l: 'The system', s: 'Colors · type · tokens' },
          ].map(s => (
            <div key={s.n} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div className="lic-display" style={{
                width: 26, height: 26, borderRadius: 7, background: 'rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 12, flexShrink: 0,
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

// ── System artboard (duplicated from app.jsx for print) ──────────────
function PrintSystem() {
  const Swatch = ({ name, val, bg }) => (
    <div style={{ flex: 1 }}>
      <div style={{ height: 88, borderRadius: 10, background: bg, border: '1px solid var(--lic-line)' }}/>
      <div style={{ marginTop: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 700 }}>{name}</div>
        <div className="lic-mono" style={{ fontSize: 10, color: 'var(--lic-muted)' }}>{val}</div>
      </div>
    </div>
  );
  const sub = (l) => <div className="lic-mono" style={{ fontSize: 9, color: 'var(--lic-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>{l}</div>;
  return (
    <div className="lic" style={{ width: '100%', height: '100%', background: 'var(--lic-paper)', borderRadius: 18, padding: 28, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: 16 }}>
        <window.LicLogo size={20}/>
        <span className="lic-mono" style={{ fontSize: 10, color: 'var(--lic-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Design system · v0.1</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: 22 }}>
        <div>
          <h3 className="lic-display" style={{ fontSize: 15, fontWeight: 700, margin: '0 0 12px' }}>Colors</h3>
          {sub('Brand')}
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <Swatch name="Mist" val="#E2E6F3" bg="#E2E6F3"/>
            <Swatch name="Paper" val="#FFFFFF" bg="#FFFFFF"/>
            <Swatch name="Ink" val="#0A0A0B" bg="#0A0A0B"/>
            <Swatch name="Ink-2" val="#1B1B1B" bg="#1B1B1B"/>
          </div>
          {sub('Accents (logo bars)')}
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <Swatch name="Yellow" val="#FFC400" bg="#FFC400"/>
            <Swatch name="Red" val="#E5283A" bg="#E5283A"/>
            <Swatch name="Blue" val="#1E5AF5" bg="#1E5AF5"/>
          </div>
          {sub('Rating')}
          <div style={{ display: 'flex', gap: 8 }}>
            <Swatch name="No go" val="#E5283A" bg="#E5283A"/>
            <Swatch name="Maybe" val="#F5B400" bg="#F5B400"/>
            <Swatch name="Good" val="#16A34A" bg="#16A34A"/>
          </div>
        </div>
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
        <div>
          <h3 className="lic-display" style={{ fontSize: 15, fontWeight: 700, margin: '0 0 12px' }}>Building blocks</h3>
          <div style={{ padding: 14, borderRadius: 10, background: 'var(--lic-paper-2)', marginBottom: 10 }}>
            {sub('Chips & status')}
            <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
              <window.Chip variant="mist">Shortlisted</window.Chip>
              <window.Chip variant="yellow">⚡ 92 match</window.Chip>
              <window.Chip variant="green">✓ Good match</window.Chip>
              <window.Chip variant="red">No go</window.Chip>
              <window.Chip variant="ink">Snap apply</window.Chip>
              <window.Chip variant="blue">Callback</window.Chip>
            </div>
          </div>
          <div style={{ padding: 14, borderRadius: 10, background: 'var(--lic-paper-2)', marginBottom: 10 }}>
            {sub('Buttons')}
            <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
              <window.Btn variant="primary" icon={<window.Ico.record size={13} stroke="#fff"/>}>Self-tape</window.Btn>
              <window.Btn variant="secondary" icon={<window.Ico.pin size={13}/>}>Shortlist</window.Btn>
              <window.Btn variant="mist" icon={<window.Ico.sparkles size={13}/>}>AI rerank</window.Btn>
            </div>
          </div>
          <div style={{ padding: 14, borderRadius: 10, background: 'var(--lic-paper-2)' }}>
            {sub('Rating buttons')}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginTop: 4 }}>
              <div style={{ height: 36, borderRadius: 8, background: '#E5283A', color: '#fff', fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' }}>No go</div>
              <div style={{ height: 36, borderRadius: 8, background: '#F5B400', color: '#0A0A0B', fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' }}>Maybe</div>
              <div style={{ height: 36, borderRadius: 8, background: '#16A34A', color: '#fff', fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' }}>Good</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Print page wrapper ───────────────────────────────────────────────
function PrintPage({ section, label, artW, artH, children, dark = false }) {
  const maxW = 1040, maxH = 620;
  const scale = Math.min(maxW / artW, maxH / artH, 1);
  return (
    <div className={`print-page ${dark ? 'print-page-dark' : ''}`}>
      <div className="print-label">
        <span style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <svg width="10" height="16" viewBox="0 0 22 36">
            <rect x="0" y="0" width="9" height="11" rx="1.5" fill="#FFC400"/>
            <rect x="11" y="6" width="9" height="11" rx="1.5" fill="#E5283A"/>
            <rect x="3" y="22" width="9" height="13" rx="1.5" fill="#1E5AF5"/>
          </svg>
          <strong style={{ color: '#0A0A0B', fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, letterSpacing: '-0.02em' }}>let it cast</strong>
          <span style={{ color: 'rgba(0,0,0,0.3)' }}>·</span>
          <span>{section}</span>
        </span>
        <span>{label}</span>
      </div>
      <div className="print-stage">
        <div style={{ width: artW * scale, height: artH * scale, position: 'relative', flexShrink: 0 }}>
          <div style={{
            width: artW, height: artH,
            transform: `scale(${scale})`,
            transformOrigin: '0 0',
            position: 'absolute', top: 0, left: 0,
          }}>
            {children}
          </div>
        </div>
      </div>
      <div className="print-footnote">
        <span>Investor demo · 2026</span>
        <span style={{ fontFamily: 'var(--font-mono)' }}>Strictly confidential · let it cast</span>
      </div>
    </div>
  );
}

function PrintApp() {
  const T = window.COPY.en;
  const phone = (children) => (
    <div className="lic-phone">
      <div className="lic-phone-inner" style={{ background: '#FAFAFB' }}>
        <div className="lic-island"/>{children}<div className="lic-home"/>
      </div>
    </div>
  );
  const phoneDark = (children) => (
    <div className="lic-phone lic-phone-dark">
      <div className="lic-phone-inner" style={{ background: '#000' }}>
        <div className="lic-island"/>{children}<div className="lic-home"/>
      </div>
    </div>
  );
  const mac = (children, url) => (
    <div className="lic-mac">
      <div className="lic-mac-bar">
        <span className="dot" style={{ background: '#ff5f57' }}/>
        <span className="dot" style={{ background: '#febc2e' }}/>
        <span className="dot" style={{ background: '#28c840' }}/>
        <div className="url">{url || 'app.letitcast.com'}</div>
      </div>
      <div className="lic-mac-body">{children}</div>
    </div>
  );

  return (
    <>
      <PrintPage section="00 · Cover" label="The performance layer of casting" artW={1180} artH={420}>
        <PrintCover/>
      </PrintPage>

      <PrintPage section="01 · Talent journey" label="Profile · Persistent performance profile" artW={422} artH={890}>
        {phone(<window.ScreenTalentProfile T={T}/>)}
      </PrintPage>
      <PrintPage section="01 · Talent journey" label="Casting feed · Discover & Snap Apply" artW={422} artH={890}>
        {phone(<window.ScreenFeed T={T}/>)}
      </PrintPage>
      <PrintPage section="01 · Talent journey" label="Casting detail · Brief + Sides" artW={422} artH={890}>
        {phone(<window.ScreenCastingDetail T={T}/>)}
      </PrintPage>
      <PrintPage section="01 · Talent journey" label="My auditions · Status tracker" artW={422} artH={890}>
        {phone(<window.ScreenTalentDashboard T={T}/>)}
      </PrintPage>

      <PrintPage section="02 · Self-tape" label="Layout A · Classic — full-bleed camera" artW={422} artH={890} dark>
        {phoneDark(<window.SelfTape T={T} layout={1}/>)}
      </PrintPage>
      <PrintPage section="02 · Self-tape" label="Layout B · Teleprompter — scrolling sides" artW={422} artH={890} dark>
        {phoneDark(<window.SelfTape T={T} layout={2}/>)}
      </PrintPage>
      <PrintPage section="02 · Self-tape" label="Layout C · Director — split + AI feedback" artW={422} artH={890} dark>
        {phoneDark(<window.SelfTape T={T} layout={3}/>)}
      </PrintPage>

      <PrintPage section="03 · Online submission" label="A · Review take + AI quality check" artW={422} artH={890}>
        {phone(<window.ScreenSubmission T={T} step="review"/>)}
      </PrintPage>
      <PrintPage section="03 · Online submission" label="B · Uploading + encoding" artW={422} artH={890}>
        {phone(<window.ScreenSubmission T={T} step="uploading"/>)}
      </PrintPage>
      <PrintPage section="03 · Online submission" label="C · Submitted — what happens next" artW={422} artH={890}>
        {phone(<window.ScreenSubmission T={T} step="done"/>)}
      </PrintPage>

      <PrintPage section="04 · Production back-end" label="Casting dashboard · Project + roles" artW={1460} artH={920}>
        {mac(<window.ScreenCastingDashboard T={T}/>, 'app.letitcast.com/evermore')}
      </PrintPage>
      <PrintPage section="04 · Production back-end" label="Auditions review · Rate together" artW={1460} artH={920}>
        {mac(<window.ScreenReview T={T} layout="classic"/>, 'app.letitcast.com/evermore/fanny/maya-reyes')}
      </PrintPage>
      <PrintPage section="04 · Production back-end" label="Auditions review · Grid compare variant" artW={1460} artH={920}>
        {mac(<window.ScreenReview T={T} layout="grid"/>, 'app.letitcast.com/evermore/fanny')}
      </PrintPage>

      <PrintPage section="05 · Social network" label="Feed · Castings · news · talent posts" artW={1460} artH={920}>
        {mac(<window.ScreenSocialFeed T={T}/>, 'app.letitcast.com/feed')}
      </PrintPage>
      <PrintPage section="05 · Social network" label="Talent recruiter · Search + campaigns" artW={1460} artH={920}>
        {mac(<window.ScreenTalentSearch T={T}/>, 'app.letitcast.com/recruiter')}
      </PrintPage>

      <PrintPage section="06 · The system" label="Colors · type · components" artW={1180} artH={520}>
        <PrintSystem/>
      </PrintPage>
    </>
  );
}

// Auto-print once fonts and React render are done.
(async function autoprint() {
  try { await document.fonts.ready; } catch {}
  await new Promise(r => setTimeout(r, 1500));
  window.print();
})();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<PrintApp/>);
