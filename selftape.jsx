// Let it Cast — Self Tape Recording (THE star screen)
// Mobile. Three layout variants exposed via prop:
//   1 — "Classic"    full-bleed cam + sides overlay strip
//   2 — "Prompter"   teleprompter dominant, cam below
//   3 — "Director"   split: sides on left, cam right (landscape feel)
//
// Interactive: countdown, recording timer, take selection, framing,
// AI feedback toggles.

const SCRIPT_LINES = [
  { role: 'FANNY', text: 'You think I haven\u2019t tried to leave?', emph: true },
  { role: 'FANNY', text: 'I packed a bag every Sunday for two years.' },
  { role: 'JAKE',  text: 'So what\u2019s stopping you tonight?' },
  { role: 'FANNY', text: 'You. The version of you who used to laugh.' },
  { role: 'FANNY', text: 'I miss him. I haven\u2019t seen him in months.' },
  { role: 'JAKE',  text: 'He\u2019s still here. He\u2019s just tired.' },
  { role: 'FANNY', text: 'So am I. And I am leaving anyway.' },
];

const FRAMINGS = [
  { id: '16:9', l: '16:9', w: 16, h: 9 },
  { id: '4:5',  l: '4:5',  w: 4,  h: 5 },
  { id: '3:2',  l: '3:2',  w: 3,  h: 2 },
  { id: '1:1',  l: '1:1',  w: 1,  h: 1 },
];

function fmt(s) { const m = Math.floor(s/60), r = Math.floor(s%60); return `${m}:${String(r).padStart(2,'0')}`; }

// ── Top bar (transparent over camera) ───────────────────────────────
function STTopBar({ T, take, total = 4, onClose }) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20,
      padding: '50px 16px 0',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <button onClick={onClose} style={{
        width: 36, height: 36, borderRadius: 999, border: 'none',
        background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}><Ico.x size={18} stroke="#fff"/></button>

      <div style={{
        padding: '6px 12px', borderRadius: 999,
        background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontSize: 12, fontWeight: 600,
      }}>
        <span className="lic-mono" style={{ color: '#FFC400', letterSpacing: '0.04em' }}>EVERMORE</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span>Fanny · Sc. 14</span>
      </div>

      <div style={{
        padding: '6px 10px', borderRadius: 999,
        background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)',
        color: '#fff', fontSize: 12, fontWeight: 600,
      }}>{T.take} {take}/{total}</div>
    </div>
  );
}

// ── Side / Script panel ──────────────────────────────────────────────
function ScriptPanel({ idx, compact = false, dark = true }) {
  const surfaceBg = dark ? 'rgba(0,0,0,0.55)' : 'var(--lic-paper)';
  const txt = dark ? '#fff' : 'var(--lic-ink)';
  const muted = dark ? 'rgba(255,255,255,0.5)' : 'var(--lic-muted)';
  return (
    <div style={{
      background: surfaceBg, color: txt,
      backdropFilter: dark ? 'blur(20px)' : 'none',
      borderRadius: 18,
      padding: compact ? 14 : 18,
      border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid var(--lic-line)',
      overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span className="lic-mono" style={{ fontSize: 9, color: muted, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Scene · sides
        </span>
        <span className="lic-mono" style={{ fontSize: 9, color: muted, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {idx + 1}/{SCRIPT_LINES.length}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {SCRIPT_LINES.map((l, i) => {
          const active = i === idx;
          const past = i < idx;
          return (
            <div key={i} style={{
              opacity: active ? 1 : past ? 0.35 : 0.55,
              transform: active ? 'scale(1)' : 'scale(0.98)',
              transition: 'all .25s',
            }}>
              <div className="lic-mono" style={{
                fontSize: 10, fontWeight: 700, color: active ? '#FFC400' : muted,
                letterSpacing: '0.08em',
              }}>{l.role}</div>
              <div style={{
                fontSize: active ? 18 : 14, fontWeight: active ? 600 : 500,
                lineHeight: 1.35, marginTop: 2, fontFamily: 'var(--font-display)',
                letterSpacing: '-0.01em',
              }}>{l.text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Recording state shared hook ──────────────────────────────────────
function useRecorder() {
  const [state, setState] = React.useState('idle'); // 'idle'|'countdown'|'recording'|'review'
  const [countdown, setCountdown] = React.useState(3);
  const [elapsed, setElapsed] = React.useState(0);
  const [lineIdx, setLineIdx] = React.useState(0);

  React.useEffect(() => {
    let id;
    if (state === 'countdown') {
      id = setInterval(() => {
        setCountdown(c => {
          if (c <= 1) { setState('recording'); setElapsed(0); setLineIdx(0); return 3; }
          return c - 1;
        });
      }, 850);
    } else if (state === 'recording') {
      id = setInterval(() => {
        setElapsed(e => e + 0.25);
        setLineIdx(i => {
          // advance line every ~6s if not last
          const nextI = Math.floor((elapsed + 0.25) / 5.5);
          return Math.min(nextI, SCRIPT_LINES.length - 1);
        });
      }, 250);
    }
    return () => clearInterval(id);
  }, [state, elapsed]);

  const start = () => { setCountdown(3); setState('countdown'); };
  const stop  = () => setState('review');
  const reset = () => { setState('idle'); setElapsed(0); setLineIdx(0); };

  return { state, countdown, elapsed, lineIdx, setLineIdx, start, stop, reset };
}

// ── Live camera preview — talent acting the role ────────────────────
// Shows the talent's portrait with cinematic "performance" styling
// (warm bar light, vignette, slight desat) so it reads as mid-scene.
function CamPreview({ framing = '16:9', children, photo, name = 'Maya Reyes' }) {
  const f = FRAMINGS.find(x => x.id === framing) || FRAMINGS[0];
  const src = photo || (window.PHOTO_FOR && window.PHOTO_FOR[name]);
  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden', background: '#0F0F12',
    }}>
      {/* Backdrop — warm bar/scene gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 50% 28%, #c98855 0%, #6a3a32 40%, #2a1f1f 75%, #0F0F12 100%)',
      }}/>
      {/* Actor portrait */}
      {src && (
        <img src={src} alt={name} referrerPolicy="no-referrer"
             style={{
               position: 'absolute', left: '50%', top: '50%',
               transform: 'translate(-50%, -42%) scale(1.05)',
               width: '90%', height: '110%', objectFit: 'cover',
               objectPosition: 'center 22%',
               filter: 'contrast(1.05) saturate(0.85) brightness(0.95)',
               mixBlendMode: 'normal',
             }}/>
      )}
      {/* Warm rim light overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 30% 30%, rgba(255,196,120,0.18) 0%, transparent 40%)',
      }}/>
      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 55%, transparent 40%, rgba(0,0,0,0.55) 100%)',
      }}/>
      {/* Subtle grain */}
      <div style={{
        position: 'absolute', inset: 0, mixBlendMode: 'overlay', opacity: 0.35, pointerEvents: 'none',
        background: 'repeating-linear-gradient(180deg, transparent 0 2px, rgba(255,255,255,0.04) 2px 3px)',
      }}/>

      <FramingOverlay ratio={f}/>
      {children}
    </div>
  );
}

function FramingOverlay({ ratio }) {
  // Draws a rule-of-thirds + safe area based on chosen aspect ratio.
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr 1fr 1fr',
      }}>
        {Array.from({length: 9}).map((_, i) => (
          <div key={i} style={{ border: '0.5px solid rgba(255,255,255,0.18)' }}/>
        ))}
      </div>
      {/* Center brackets */}
      <div style={{ position: 'absolute', left: '50%', top: '36%', transform: 'translateX(-50%)' }}>
        {[0, 90, 180, 270].map(deg => (
          <span key={deg} style={{
            position: 'absolute', width: 12, height: 12,
            borderTop: '2px solid #FFC400', borderLeft: '2px solid #FFC400',
            transform: `rotate(${deg}deg) translate(-22px, -22px)`,
            transformOrigin: '0 0',
          }}/>
        ))}
      </div>
      {/* Ratio tag */}
      <div className="lic-mono" style={{
        position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
        padding: '4px 8px', borderRadius: 6, background: 'rgba(0,0,0,0.55)',
        color: '#FFC400', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
      }}>{ratio.id}</div>
    </div>
  );
}

// ── Big record button ───────────────────────────────────────────────
function RecordButton({ state, onStart, onStop, onAccept, onRetake }) {
  if (state === 'review') {
    return (
      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={onRetake} style={{
          flex: 1, height: 56, borderRadius: 16, border: 'none',
          background: 'rgba(255,255,255,0.16)', color: '#fff',
          fontWeight: 700, fontSize: 14, backdropFilter: 'blur(20px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}><Ico.x size={16} stroke="#fff"/> Retake</button>
        <button onClick={onAccept} style={{
          flex: 2, height: 56, borderRadius: 16, border: 'none',
          background: '#FFC400', color: '#0A0A0B',
          fontWeight: 700, fontSize: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}><Ico.check size={16} stroke="#0A0A0B" sw={2.5}/> Keep this take</button>
      </div>
    );
  }
  const isRec = state === 'recording';
  return (
    <button onClick={isRec ? onStop : onStart} style={{
      width: 72, height: 72, borderRadius: 999, border: '4px solid rgba(255,255,255,0.6)',
      background: 'transparent', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
    }}>
      <div style={{
        width: isRec ? 28 : 60, height: isRec ? 28 : 60,
        borderRadius: isRec ? 8 : 999,
        background: '#E5283A', transition: 'all .25s',
      }}/>
    </button>
  );
}

// ── Side controls strip ──────────────────────────────────────────────
function SideControls({ framing, setFraming, T }) {
  return (
    <div style={{
      position: 'absolute', right: 12, top: '38%', transform: 'translateY(-50%)',
      display: 'flex', flexDirection: 'column', gap: 12, zIndex: 10,
    }}>
      {[
        { icon: <Ico.flip size={18} stroke="#fff"/>, l: T.flipCam },
        { icon: <Ico.bolt size={18} stroke="#fff"/>, l: 'Flash' },
        { icon: <Ico.sparkles size={18} stroke="#fff"/>, l: T.aiFeedback, active: true },
        { icon: <Ico.mic size={18} stroke="#fff"/>, l: 'Mic' },
      ].map((c, i) => (
        <button key={i} style={{
          width: 44, height: 44, borderRadius: 999, border: 'none',
          background: c.active ? '#FFC400' : 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(20px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {c.active ? <Ico.sparkles size={18} stroke="#0A0A0B"/> : c.icon}
        </button>
      ))}

      {/* Framing chips column */}
      <div style={{
        background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)',
        borderRadius: 14, padding: 6, display: 'flex', flexDirection: 'column', gap: 4,
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        {FRAMINGS.map(f => (
          <button key={f.id} onClick={() => setFraming(f.id)} style={{
            border: 'none', cursor: 'pointer',
            padding: '6px 8px', borderRadius: 8, minWidth: 32,
            background: framing === f.id ? '#fff' : 'transparent',
            color: framing === f.id ? '#0A0A0B' : '#fff',
            fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700,
            letterSpacing: '0.04em',
          }}>{f.l}</button>
        ))}
      </div>
    </div>
  );
}

// ── Take strip ───────────────────────────────────────────────────────
function TakeStrip({ takes, current, onSelect }) {
  return (
    <div style={{ display: 'flex', gap: 6, padding: '0 4px' }}>
      {takes.map((t, i) => (
        <button key={i} onClick={() => onSelect(i)} style={{
          flex: 1, aspectRatio: '4/5', borderRadius: 10,
          border: i === current ? '2px solid #FFC400' : '1px solid rgba(255,255,255,0.2)',
          background: t.recorded ? '#1B1B1B' : 'rgba(255,255,255,0.06)',
          position: 'relative', overflow: 'hidden', cursor: 'pointer',
        }}>
          {t.recorded && (
            <div style={{ position: 'absolute', inset: 0,
              background: 'radial-gradient(circle at 50% 40%, rgba(255,210,180,0.3) 0%, rgba(40,25,30,0.6) 100%)' }}/>
          )}
          <div className="lic-mono" style={{
            position: 'absolute', top: 4, left: 5,
            fontSize: 8, fontWeight: 700, color: '#fff',
          }}>T{i+1}</div>
          {t.recorded && (
            <div style={{ position: 'absolute', bottom: 4, right: 5,
              fontFamily: 'var(--font-mono)', fontSize: 8, color: 'rgba(255,255,255,0.7)' }}>
              {fmt(t.duration)}
            </div>
          )}
          {t.starred && (
            <div style={{ position: 'absolute', top: 4, right: 5 }}>
              <Ico.star size={10} stroke="#FFC400" fill="#FFC400"/>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

// ── LAYOUT 1 — "Classic": full-bleed cam + bottom drawer ─────────────
function SelfTapeClassic({ T, onClose }) {
  const rec = useRecorder();
  const [framing, setFraming] = React.useState('4:5');
  const [takeIdx, setTakeIdx] = React.useState(2);
  const [takes] = React.useState([
    { recorded: true, duration: 68, starred: false },
    { recorded: true, duration: 74, starred: false },
    { recorded: true, duration: 71, starred: true },
    { recorded: false, duration: 0, starred: false },
  ]);

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#000', overflow: 'hidden' }}>
      <CamPreview framing={framing}/>
      <STTopBar T={T} take={takeIdx + 1} onClose={onClose}/>
      <SideControls framing={framing} setFraming={setFraming} T={T}/>

      {/* Recording indicator */}
      {rec.state === 'recording' && (
        <div style={{
          position: 'absolute', top: 100, left: '50%', transform: 'translateX(-50%)',
          padding: '6px 14px', borderRadius: 999,
          background: 'rgba(229,40,58,0.95)', color: '#fff', fontWeight: 700, fontSize: 13,
          display: 'flex', alignItems: 'center', gap: 8,
          boxShadow: '0 6px 20px rgba(229,40,58,0.4)',
        }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: '#fff', animation: 'pulse 1s infinite' }}/>
          REC · {fmt(rec.elapsed)}
        </div>
      )}

      {/* Countdown */}
      {rec.state === 'countdown' && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 30 }}>
          <div className="lic-display" style={{
            fontSize: 160, fontWeight: 800, color: '#FFC400',
            textShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}>{rec.countdown}</div>
        </div>
      )}

      {/* AI feedback chip */}
      <div style={{
        position: 'absolute', top: 100, left: 16,
        padding: '6px 10px', borderRadius: 10,
        background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(20px)',
        color: '#fff', fontSize: 11, fontWeight: 600,
        display: 'flex', alignItems: 'center', gap: 6,
        border: '1px solid rgba(255,196,0,0.4)',
      }}>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: '#16A34A' }}/>
        Framing good · Audio clear
      </div>

      {/* Bottom drawer */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.85) 100%)',
        padding: '40px 16px 40px',
        display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        {/* Active line (teleprompter mini) */}
        <div style={{ textAlign: 'center', padding: '0 20px' }}>
          <div className="lic-mono" style={{ fontSize: 10, color: '#FFC400', fontWeight: 700, letterSpacing: '0.1em' }}>
            {SCRIPT_LINES[rec.lineIdx].role}
          </div>
          <div className="lic-display" style={{
            fontSize: 18, fontWeight: 600, color: '#fff', marginTop: 4, lineHeight: 1.3,
            letterSpacing: '-0.01em',
          }}>
            {SCRIPT_LINES[rec.lineIdx].text}
          </div>
          <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginTop: 8 }}>
            {SCRIPT_LINES.map((_, i) => (
              <span key={i} style={{
                width: i === rec.lineIdx ? 16 : 4, height: 3, borderRadius: 999,
                background: i <= rec.lineIdx ? '#FFC400' : 'rgba(255,255,255,0.25)',
                transition: 'all .3s',
              }}/>
            ))}
          </div>
        </div>

        {/* Record button row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '4px 8px' }}>
          <button style={{
            width: 48, height: 48, borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)',
            background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Ico.film size={20} stroke="#fff"/>
          </button>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <RecordButton state={rec.state} onStart={rec.start} onStop={rec.stop}
              onAccept={() => { rec.reset(); }} onRetake={rec.reset}/>
          </div>
          <button style={{
            width: 48, height: 48, borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)',
            background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Ico.check size={20} stroke="#fff"/>
          </button>
        </div>

        {/* Takes strip */}
        <TakeStrip takes={takes} current={takeIdx} onSelect={setTakeIdx}/>
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </div>
  );
}

// ── LAYOUT 2 — "Prompter": teleprompter top, cam below ───────────────
function SelfTapePrompter({ T, onClose }) {
  const rec = useRecorder();
  const [framing, setFraming] = React.useState('4:5');

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0A0A0B', overflow: 'hidden' }}>
      <STTopBar T={T} take={3} onClose={onClose}/>

      {/* Teleprompter top */}
      <div style={{
        position: 'absolute', top: 96, left: 0, right: 0, height: 280, padding: '0 24px',
        overflow: 'hidden',
        maskImage: 'linear-gradient(180deg, transparent 0%, #000 18%, #000 80%, transparent 100%)',
      }}>
        <div style={{ paddingTop: 100, transition: 'transform .4s', transform: `translateY(${-rec.lineIdx * 70}px)` }}>
          {SCRIPT_LINES.map((l, i) => {
            const active = i === rec.lineIdx;
            return (
              <div key={i} style={{
                marginBottom: 28, opacity: active ? 1 : 0.4,
                transition: 'opacity .25s',
              }}>
                <div className="lic-mono" style={{
                  fontSize: 11, fontWeight: 700, color: active ? '#FFC400' : 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.1em',
                }}>{l.role}</div>
                <div className="lic-display" style={{
                  fontSize: 22, fontWeight: 600, color: '#fff', marginTop: 4,
                  lineHeight: 1.25, letterSpacing: '-0.01em',
                }}>{l.text}</div>
              </div>
            );
          })}
        </div>
        {/* Prompter speed indicator */}
        <div style={{
          position: 'absolute', right: 24, top: 8,
          padding: '4px 8px', borderRadius: 6,
          background: 'rgba(255,255,255,0.08)', color: '#fff',
          fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.08em',
        }}>SPEED · 1.0×</div>
      </div>

      {/* Camera card below */}
      <div style={{
        position: 'absolute', bottom: 240, left: 16, right: 16,
        aspectRatio: framing === '16:9' ? '16/9' : framing === '4:5' ? '4/5' : framing === '3:2' ? '3/2' : '1/1',
        maxHeight: 380, borderRadius: 20, overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}>
        <CamPreview framing={framing}/>
        {rec.state === 'recording' && (
          <div style={{
            position: 'absolute', top: 10, left: 10,
            padding: '4px 10px', borderRadius: 999,
            background: 'rgba(229,40,58,0.95)', color: '#fff', fontWeight: 700, fontSize: 11,
            display: 'flex', alignItems: 'center', gap: 6, zIndex: 5,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: '#fff', animation: 'pulse 1s infinite' }}/>
            REC {fmt(rec.elapsed)}
          </div>
        )}
      </div>

      {/* Framing dock (horizontal) */}
      <div style={{
        position: 'absolute', bottom: 184, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 4, padding: 5, borderRadius: 999,
        background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(20px)',
      }}>
        {FRAMINGS.map(f => (
          <button key={f.id} onClick={() => setFraming(f.id)} style={{
            border: 'none', cursor: 'pointer',
            padding: '6px 12px', borderRadius: 999,
            background: framing === f.id ? '#fff' : 'transparent',
            color: framing === f.id ? '#0A0A0B' : '#fff',
            fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
          }}>{f.l}</button>
        ))}
      </div>

      {/* Bottom record bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 160,
        padding: '20px 24px 40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 100%)',
      }}>
        <button style={{
          width: 48, height: 48, borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)',
          background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'absolute', left: 24, bottom: 56,
        }}><Ico.flip size={20} stroke="#fff"/></button>
        <RecordButton state={rec.state} onStart={rec.start} onStop={rec.stop}
          onAccept={rec.reset} onRetake={rec.reset}/>
        <button style={{
          width: 48, height: 48, borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)',
          background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'absolute', right: 24, bottom: 56,
        }}><Ico.sparkles size={20} stroke="#FFC400"/></button>
      </div>

      {/* Countdown */}
      {rec.state === 'countdown' && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 30, background: 'rgba(0,0,0,0.3)' }}>
          <div className="lic-display" style={{ fontSize: 160, fontWeight: 800, color: '#FFC400' }}>{rec.countdown}</div>
        </div>
      )}
    </div>
  );
}

// ── LAYOUT 3 — "Director": split with sides panel + cam ──────────────
function SelfTapeDirector({ T, onClose, onSubmit }) {
  const rec = useRecorder();
  const [framing, setFraming] = React.useState('1:1');

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0A0A0B', overflow: 'hidden' }}>
      <STTopBar T={T} take={3} onClose={onClose}/>

      {/* Camera (top half) */}
      <div style={{
        position: 'absolute', top: 96, left: 16, right: 16, height: 360,
        borderRadius: 20, overflow: 'hidden', boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
      }}>
        <CamPreview framing={framing}/>
        {rec.state === 'recording' && (
          <div style={{
            position: 'absolute', top: 10, left: 10,
            padding: '4px 10px', borderRadius: 999,
            background: 'rgba(229,40,58,0.95)', color: '#fff', fontWeight: 700, fontSize: 11,
            display: 'flex', alignItems: 'center', gap: 6, zIndex: 5,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: '#fff', animation: 'pulse 1s infinite' }}/>
            REC {fmt(rec.elapsed)}
          </div>
        )}

        {/* Inline AI chip */}
        <div style={{
          position: 'absolute', bottom: 10, left: 10, right: 10,
          background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(20px)',
          borderRadius: 10, padding: '8px 12px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', color: '#fff' }}>
            <span style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: '#16A34A' }}/>
              Framing
            </span>
            <span style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: '#16A34A' }}/>
              Audio
            </span>
            <span style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: '#F5B400' }}/>
              Light cool
            </span>
          </div>
          <div className="lic-mono" style={{ fontSize: 9, color: '#FFC400', letterSpacing: '0.08em' }}>AI</div>
        </div>
      </div>

      {/* Framing pills below cam */}
      <div style={{ position: 'absolute', top: 466, left: 16, right: 16, display: 'flex', gap: 6 }}>
        {FRAMINGS.map(f => (
          <button key={f.id} onClick={() => setFraming(f.id)} style={{
            flex: 1, height: 32, borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)',
            background: framing === f.id ? '#fff' : 'rgba(255,255,255,0.04)',
            color: framing === f.id ? '#0A0A0B' : '#fff',
            fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
          }}>{f.l}</button>
        ))}
      </div>

      {/* Script panel (lower half) */}
      <div style={{ position: 'absolute', top: 510, left: 16, right: 16, bottom: 144, overflow: 'hidden' }}>
        <ScriptPanel idx={rec.lineIdx} dark/>
      </div>

      {/* Bottom record bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '14px 24px 34px',
        background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <button style={{
          width: 44, height: 44, borderRadius: 999, border: '1px solid rgba(255,255,255,0.2)',
          background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><Ico.flip size={18} stroke="#fff"/></button>
        <RecordButton state={rec.state} onStart={rec.start} onStop={rec.stop}
          onAccept={onSubmit || rec.reset} onRetake={rec.reset}/>
        <button style={{
          width: 44, height: 44, borderRadius: 999, border: '1px solid rgba(255,255,255,0.2)',
          background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><Ico.sparkles size={18} stroke="#FFC400"/></button>
      </div>

      {/* Countdown */}
      {rec.state === 'countdown' && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 30, background: 'rgba(0,0,0,0.3)' }}>
          <div className="lic-display" style={{ fontSize: 160, fontWeight: 800, color: '#FFC400' }}>{rec.countdown}</div>
        </div>
      )}
    </div>
  );
}

// ── PhoneStatus (white-on-dark variant) ──────────────────────────────
function PhoneStatusDark() {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 25,
      height: 54, display: 'flex', alignItems: 'flex-end',
      justifyContent: 'space-between', padding: '0 28px 8px',
      fontFamily: '-apple-system, system-ui', fontWeight: 600, fontSize: 15,
      color: '#fff', pointerEvents: 'none',
    }}>
      <span>9:41</span>
      <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <svg width="17" height="11" viewBox="0 0 17 11"><rect x="0" y="7" width="3" height="4" rx="0.6" fill="#fff"/><rect x="4.5" y="5" width="3" height="6" rx="0.6" fill="#fff"/><rect x="9" y="3" width="3" height="8" rx="0.6" fill="#fff"/><rect x="13.5" y="0" width="3" height="11" rx="0.6" fill="#fff"/></svg>
        <svg width="24" height="11" viewBox="0 0 24 11"><rect x="0.5" y="0.5" width="20" height="10" rx="2.5" stroke="#fff" strokeOpacity="0.5" fill="none"/><rect x="2" y="2" width="17" height="7" rx="1.5" fill="#fff"/><path d="M22 4v3c.6-.2 1-.7 1-1.5S22.6 4.2 22 4z" fill="#fff" fillOpacity="0.5"/></svg>
      </span>
    </div>
  );
}

// ── Master export — picks layout ─────────────────────────────────────
function SelfTape({ T, layout = 1, onClose = () => {}, onSubmit }) {
  const L = layout === 2 ? SelfTapePrompter : layout === 3 ? SelfTapeDirector : SelfTapeClassic;
  return (
    <>
      <PhoneStatusDark/>
      <L T={T} onClose={onClose} onSubmit={onSubmit}/>
    </>
  );
}

Object.assign(window, { SelfTape });
