// Let it Cast — Social feed (LinkedIn-style for the casting industry)
// + Talent search / campaign back-office
// Two desktop screens, 1440×900 inside MacFrame.

const S = {
  bg: '#F4F2EE',           // LinkedIn-ish warm gray
  paper: '#FFFFFF',
  ink: 'var(--lic-ink)',
  muted: 'var(--lic-muted)',
  line: '#E0DFDC',
};

// Top nav for the social product
function SocialNav({ T, active = 'feed' }) {
  const tabs = [
    { id: 'feed',     l: 'Home',          icon: <Ico.home size={18}/> },
    { id: 'network',  l: 'Network',       icon: <Ico.user size={18}/> },
    { id: 'castings', l: 'Castings',      icon: <Ico.film size={18}/> },
    { id: 'inbox',    l: 'Messaging',     icon: <Ico.message size={18}/>, badge: 4 },
    { id: 'notifs',   l: 'Notifications', icon: <Ico.bell size={18}/>, badge: 12 },
    { id: 'me',       l: 'You',           icon: <Ico.user size={18}/> },
  ];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '0 28px', height: 52,
      borderBottom: '1px solid var(--lic-line)', background: 'var(--lic-paper)',
    }}>
      <LicLogo size={18}/>
      <div style={{
        flex: '0 0 auto', padding: '8px 12px', borderRadius: 6,
        background: '#EEF3F8', border: '1px solid #E0E4EA',
        fontSize: 13, color: S.muted, minWidth: 280,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <Ico.search size={15}/>
        <span>Search castings, talents, roles, productions…</span>
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 4 }}>
        {tabs.map(t => (
          <div key={t.id} style={{
            position: 'relative', display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 2, padding: '6px 14px',
            color: active === t.id ? S.ink : S.muted,
            borderBottom: active === t.id ? '2px solid #0A0A0B' : '2px solid transparent',
          }}>
            <div style={{ position: 'relative' }}>
              {t.icon}
              {t.badge && (
                <span style={{
                  position: 'absolute', top: -4, right: -6,
                  background: '#E5283A', color: '#fff', fontSize: 9, fontWeight: 700,
                  padding: '1px 4px', borderRadius: 999, minWidth: 14, textAlign: 'center',
                  border: '1.5px solid #fff',
                }}>{t.badge}</span>
              )}
            </div>
            <span style={{ fontSize: 11, fontWeight: 500 }}>{t.l}</span>
          </div>
        ))}
      </div>
      <div style={{
        padding: '6px 12px', borderLeft: '1px solid var(--lic-line)',
        fontSize: 12, color: S.muted, fontWeight: 600,
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        For Productions <Ico.arrow size={11}/>
      </div>
    </div>
  );
}

// ── SCREEN — Social feed ─────────────────────────────────────────────
function ScreenSocialFeed({ T }) {
  return (
    <div className="lic" style={{ background: S.bg, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <SocialNav T={T} active="feed"/>
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', justifyContent: 'center', padding: '20px 28px', gap: 24 }}>
        {/* Left sidebar */}
        <div style={{ width: 240, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Card padded={false} style={{ overflow: 'hidden' }}>
            <div style={{ height: 56, background: 'linear-gradient(120deg, #FFC400 0%, #E5283A 50%, #1E5AF5 100%)' }}/>
            <div style={{ padding: '0 14px 14px', marginTop: -32 }}>
              <img src={PHOTO_FOR['Maya Reyes']} alt="Maya"
                   style={{ width: 64, height: 64, borderRadius: '50%', border: '3px solid #fff', objectFit: 'cover' }}/>
              <div className="lic-display" style={{ fontSize: 16, fontWeight: 700, marginTop: 8 }}>Maya Reyes</div>
              <div style={{ fontSize: 12, color: S.muted, marginTop: 2 }}>Actress · Los Angeles · SAG-AFTRA</div>
              <div style={{ fontSize: 11, color: S.muted, marginTop: 6 }}>
                <strong style={{ color: S.ink }}>Vertice Talent</strong>
              </div>
            </div>
            <div style={{ borderTop: '1px solid var(--lic-line)', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <span style={{ color: S.muted }}>Profile views</span>
                <span style={{ fontWeight: 700, color: '#1E5AF5' }}>312</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <span style={{ color: S.muted }}>Audition matches</span>
                <span style={{ fontWeight: 700, color: '#1E5AF5' }}>14</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <span style={{ color: S.muted }}>Performance score</span>
                <span style={{ fontWeight: 700 }}>83 <span style={{ color: '#16A34A' }}>↑</span></span>
              </div>
            </div>
          </Card>
          <Card padded>
            <div className="lic-mono" style={{ fontSize: 9, color: S.muted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>My groups</div>
            {['SAG-AFTRA NY', 'Indie horror cast', 'On-camera actors LA', 'Theatre folks'].map(g => (
              <div key={g} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '5px 0', fontSize: 12 }}>
                <span style={{ width: 6, height: 6, borderRadius: 2, background: '#FFC400' }}/>
                {g}
              </div>
            ))}
          </Card>
          <Card padded>
            <div className="lic-mono" style={{ fontSize: 9, color: S.muted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Saved</div>
            <div style={{ fontSize: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span>🎬 3 castings saved</span>
              <span>📚 5 courses bookmarked</span>
              <span>👥 12 people followed</span>
            </div>
          </Card>
        </div>

        {/* Center feed */}
        <div style={{ width: 580, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Composer */}
          <Card padded>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <Avatar name="Maya Reyes" size={42}/>
              <div style={{ flex: 1, padding: '10px 14px', borderRadius: 999, border: '1px solid var(--lic-line-strong)', color: S.muted, fontSize: 13, fontWeight: 500 }}>
                Share an update, a self-tape, an audition win…
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 10, justifyContent: 'space-around' }}>
              {[
                { l: 'Self-tape', c: '#E5283A', icon: <Ico.record size={15} stroke="#E5283A"/> },
                { l: 'Photo',     c: '#1E5AF5', icon: <Ico.eye size={15} stroke="#1E5AF5"/> },
                { l: 'Article',   c: '#F77F00', icon: <Ico.film size={15} stroke="#F77F00"/> },
                { l: 'Casting',   c: '#16A34A', icon: <Ico.bolt size={15} stroke="#16A34A"/> },
              ].map(b => (
                <div key={b.l} style={{ display: 'flex', alignItems: 'center', gap: 6, color: S.muted, fontSize: 12, fontWeight: 600 }}>
                  {b.icon} <span>{b.l}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Posts */}
          <FeedPost
            who="A24 Casting" sub="Sponsored · Casting call" verified
            avatar={<div style={{ width: 44, height: 44, borderRadius: 8, background: '#0A0A0B', color: '#FFC400', fontWeight: 800, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>A24</div>}
            when="2h"
            body={<>
              <p style={{ margin: 0 }}>
                <strong>Now casting · Evermore</strong> (TV series).<br/>
                Looking for lead actress <strong>Fanny Brice</strong> — 24–32, sharp, electric.
                Self-tape audition opens today, closes Sep 14.
              </p>
              <p style={{ margin: '6px 0 0', color: S.muted, fontSize: 12 }}>#casting #TVseries #SAGAFTRA</p>
            </>}
            media={<CastingPosterMedia/>}
            actions={{ likes: 312, comments: 48, shares: 22 }}
          />

          <FeedPost
            who="Theo Vance" sub="Singer · Posted a self-tape"
            avatarName="Theo Vance"
            when="4h"
            body={<>
              <p style={{ margin: 0 }}>
                Just dropped my self-tape for the lead role in <em>Echo Park</em> (WMG music video).
                Wanted to play him quieter than the brief — let me know what you think.
              </p>
            </>}
            media={<SelfTapeReelMedia photo={PHOTO_FOR['Theo Vance']}/>}
            actions={{ likes: 184, comments: 31, shares: 6 }}
          />

          <FeedPost
            who="Variety" sub="Media · Industry news" verified blue
            avatar={<div style={{ width: 44, height: 44, borderRadius: 8, background: '#0A0A0B', color: '#fff', fontWeight: 800, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, letterSpacing: '0.04em' }}>VAR</div>}
            when="6h"
            body={<>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 15 }}>Streaming production volume up 12% in Q1 — and casting is the bottleneck.</p>
              <p style={{ margin: '6px 0 0', fontSize: 13, color: '#3A3A40' }}>
                Streamers are greenlighting at record pace. Industry analysts point to traditional
                casting cycles as the #1 obstacle to faster delivery…
              </p>
            </>}
            actions={{ likes: 1240, comments: 89, shares: 156 }}
          />

          <FeedPost
            who="Casting Society of America" sub="Page · Training"
            avatar={<div style={{ width: 44, height: 44, borderRadius: 22, background: '#1E5AF5', color: '#fff', fontWeight: 800, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>CSA</div>}
            when="1d"
            body={<>
              <p style={{ margin: 0 }}>
                <strong>New workshop · Learn to pitch your self-tape</strong><br/>
                30 minutes with a top casting director. How to open strong, sustain emotional truth,
                and own the silence between lines.
              </p>
            </>}
            media={<TrainingMedia/>}
            actions={{ likes: 528, comments: 72, shares: 41 }}
          />

          <FeedPost
            who="Eden Tov" sub="Producer at A24"
            avatarName="Eden Tov"
            when="1d"
            body={<>
              <p style={{ margin: 0 }}>
                Booked our lead for <em>Evermore</em> off a 1:14 self-tape. No flights, no test rooms.
                A year ago this would have taken 6 weeks. Insane.
              </p>
              <p style={{ margin: '6px 0 0', color: S.muted, fontSize: 12 }}>#letitcast #castingdirectors</p>
            </>}
            actions={{ likes: 892, comments: 64, shares: 31 }}
          />
        </div>

        {/* Right sidebar */}
        <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Card padded>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <strong style={{ fontSize: 13 }}>Top castings near you</strong>
              <span style={{ fontSize: 11, color: S.muted }}>See all</span>
            </div>
            {CASTINGS.slice(0, 3).map(c => (
              <div key={c.id} style={{ display: 'flex', gap: 10, padding: '8px 0', borderTop: '1px solid var(--lic-line)' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 6, background: c.accent, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, color: c.accent === '#FFC400' ? '#7A5A00' : '#fff',
                }}>{c.title[0]}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{c.title}</div>
                  <div style={{ fontSize: 11, color: S.muted, marginTop: 1 }}>{c.role} · {c.location}</div>
                  <div style={{ marginTop: 4 }}>
                    <Chip variant="mist" size="sm">{c.match} match</Chip>
                  </div>
                </div>
              </div>
            ))}
          </Card>

          <Card padded>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <strong style={{ fontSize: 13 }}>People to follow</strong>
              <span style={{ fontSize: 11, color: S.muted }}>See all</span>
            </div>
            {[
              { n: 'Sofia Bello',    r: 'Comedian · Paris' },
              { n: 'Olu Adebayo',    r: 'Actor · Lagos' },
              { n: 'Hannah Levy',    r: 'Casting director · NY' },
            ].map(p => (
              <div key={p.n} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 0', borderTop: '1px solid var(--lic-line)' }}>
                <Avatar name={p.n} size={36}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{p.n}</div>
                  <div style={{ fontSize: 11, color: S.muted }}>{p.r}</div>
                </div>
                <button style={{
                  padding: '4px 10px', borderRadius: 999, border: '1px solid var(--lic-ink)',
                  background: 'transparent', color: 'var(--lic-ink)', fontSize: 11, fontWeight: 700,
                  cursor: 'pointer', whiteSpace: 'nowrap',
                }}>+ Follow</button>
              </div>
            ))}
          </Card>

          <Card padded>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <strong style={{ fontSize: 13 }}>Industry pulse</strong>
              <Chip variant="yellow" size="sm">Live</Chip>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12 }}>
              <div>
                <strong>+200%</strong>
                <span style={{ color: S.muted, marginLeft: 6 }}>titles produced last 5y</span>
              </div>
              <div>
                <strong>20M</strong>
                <span style={{ color: S.muted, marginLeft: 6 }}>auditions / year worldwide</span>
              </div>
              <div>
                <strong>70%</strong>
                <span style={{ color: S.muted, marginLeft: 6 }}>submissions never reviewed (industry avg)</span>
              </div>
            </div>
          </Card>

          <div style={{ fontSize: 10, color: S.muted, padding: '0 6px', lineHeight: 1.6 }}>
            About · Accessibility · Help · Privacy<br/>
            Ads · Business Services<br/>
            Get the Let it Cast app · More<br/><br/>
            <strong>let it cast</strong> © 2026
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Reusable feed post ────────────────────────────────────────────────
function FeedPost({ who, sub, when, avatar, avatarName, verified, blue, body, media, actions }) {
  const verifiedDot = verified && (
    <span style={{
      width: 14, height: 14, borderRadius: 999,
      background: blue ? '#1E5AF5' : '#16A34A', color: '#fff',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 8, fontWeight: 700, marginLeft: 4,
    }}>✓</span>
  );
  return (
    <Card padded={false} style={{ overflow: 'hidden' }}>
      <div style={{ padding: '12px 14px 8px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        {avatar || <Avatar name={avatarName} size={44}/>}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <strong style={{ fontSize: 13 }}>{who}</strong>{verifiedDot}
          </div>
          <div style={{ fontSize: 11, color: S.muted, marginTop: 1 }}>
            {sub} <span style={{ margin: '0 4px' }}>·</span> {when} <span style={{ margin: '0 4px' }}>·</span> 🌐
          </div>
        </div>
        <button style={{ width: 24, height: 24, border: 'none', background: 'transparent', color: S.muted, cursor: 'pointer' }}>
          <Ico.more size={18}/>
        </button>
      </div>
      <div style={{ padding: '0 14px 10px', fontSize: 13, lineHeight: 1.5, color: '#1B1B1B' }}>{body}</div>
      {media && <div style={{ padding: '0 0 0' }}>{media}</div>}
      <div style={{
        padding: '6px 14px', borderTop: '1px solid var(--lic-line)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: 11, color: S.muted,
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ display: 'inline-flex' }}>
            {['#1E5AF5', '#FFC400', '#E5283A'].map(c => (
              <span key={c} style={{ width: 14, height: 14, borderRadius: 999, background: c, border: '1.5px solid #fff', marginLeft: -3 }}/>
            ))}
          </span>
          {actions.likes.toLocaleString()}
        </span>
        <span>{actions.comments} comments · {actions.shares} shares</span>
      </div>
      <div style={{
        display: 'flex', justifyContent: 'space-around',
        padding: '6px 0', borderTop: '1px solid var(--lic-line)',
      }}>
        {[
          { l: 'Like', icon: <Ico.flame size={16}/> },
          { l: 'Comment', icon: <Ico.message size={16}/> },
          { l: 'Share', icon: <Ico.share size={16}/> },
          { l: 'Send', icon: <Ico.send size={16}/> },
        ].map(a => (
          <button key={a.l} style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
            border: 'none', background: 'transparent', color: '#3A3A40',
            fontSize: 12, fontWeight: 600, borderRadius: 6, cursor: 'pointer',
          }}>{a.icon} {a.l}</button>
        ))}
      </div>
    </Card>
  );
}

function CastingPosterMedia() {
  return (
    <div style={{
      position: 'relative', aspectRatio: '16/9',
      background: 'linear-gradient(135deg, #0A0A0B 0%, #2A1F1F 100%)',
      overflow: 'hidden',
    }}>
      <img src={PHOTO_FOR['Maya Reyes']} alt="Fanny Brice cast"
           style={{
             position: 'absolute', inset: 0, width: '100%', height: '100%',
             objectFit: 'cover', objectPosition: 'center 25%',
             filter: 'contrast(1.05) saturate(0.85) brightness(0.95)',
             mixBlendMode: 'luminosity', opacity: 0.85,
           }}/>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 70% 50%, rgba(255,196,0,0.25) 0%, transparent 60%), linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.85) 100%)',
      }}/>
      <div style={{ position: 'absolute', top: 14, left: 14 }}>
        <Chip variant="ink" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)' }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: '#FFC400' }}/>
          CASTING CALL
        </Chip>
      </div>
      <div style={{ position: 'absolute', left: 18, bottom: 14, right: 18, color: '#fff' }}>
        <div className="lic-mono" style={{ fontSize: 10, opacity: 0.7, letterSpacing: '0.1em', textTransform: 'uppercase' }}>A24 · TV Series</div>
        <div className="lic-display" style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em', marginTop: 4 }}>Evermore</div>
        <div style={{ fontSize: 13, opacity: 0.85, marginTop: 4 }}>Casting · Fanny Brice · Lead · 12 roles open</div>
      </div>
    </div>
  );
}

function SelfTapeReelMedia({ photo }) {
  return (
    <div style={{ position: 'relative', aspectRatio: '16/9', background: '#0A0A0B', overflow: 'hidden' }}>
      <img src={photo} alt=""
           style={{
             position: 'absolute', inset: 0, width: '100%', height: '100%',
             objectFit: 'cover', objectPosition: 'center 30%',
             filter: 'contrast(1.1) saturate(0.8)',
           }}/>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.65) 100%)' }}/>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 68, height: 68, borderRadius: 999, background: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Ico.play size={26} stroke="#0A0A0B"/>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 14, left: 14 }}>
        <Chip variant="ink" style={{ background: 'rgba(0,0,0,0.55)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: '#E5283A' }}/>
          SELF TAPE
        </Chip>
      </div>
      <div style={{ position: 'absolute', bottom: 14, right: 14, fontFamily: 'var(--font-mono)', fontSize: 11, color: '#fff', background: 'rgba(0,0,0,0.55)', padding: '3px 8px', borderRadius: 4 }}>1:14</div>
    </div>
  );
}

function TrainingMedia() {
  return (
    <div style={{
      position: 'relative', aspectRatio: '16/9',
      background: 'linear-gradient(135deg, #1E5AF5 0%, #0A2E8B 100%)',
      padding: 20, color: '#fff', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, background: 'radial-gradient(circle, rgba(255,196,0,0.3) 0%, transparent 70%)' }}/>
      <div className="lic-mono" style={{ fontSize: 10, opacity: 0.7, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Workshop · 30 min</div>
      <div className="lic-display" style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', marginTop: 6, maxWidth: '70%' }}>
        Pitch your self-tape like a pro
      </div>
      <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
        <Chip variant="ink" style={{ background: 'rgba(255,255,255,0.16)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>4.9 ★</Chip>
        <Chip variant="ink" style={{ background: 'rgba(255,255,255,0.16)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>2,140 learners</Chip>
      </div>
      <div style={{ position: 'absolute', bottom: 16, right: 18 }}>
        <button style={{
          padding: '8px 14px', borderRadius: 8, border: 'none',
          background: '#FFC400', color: '#0A0A0B', fontWeight: 700, fontSize: 13,
        }}>Start free</button>
      </div>
    </div>
  );
}

// ── SCREEN — Talent search / campaign back-office ────────────────────
function ScreenTalentSearch({ T }) {
  const filters = [
    { l: 'Role type', v: ['Lead', 'Supporting'], more: 3 },
    { l: 'Location',  v: ['Los Angeles', 'Remote OK'] },
    { l: 'Age range', v: ['24–34'] },
    { l: 'Gender',    v: ['Female'] },
    { l: 'Languages', v: ['English', 'Spanish'], more: 1 },
    { l: 'Union',     v: ['SAG-AFTRA'] },
    { l: 'Height',    v: ['165–175 cm'] },
    { l: 'Skills',    v: ['Vulnerability', 'Comedic timing'], more: 4 },
  ];

  const results = [
    { name: 'Maya Reyes',     loc: 'Los Angeles, US',  agency: 'Vertice Talent', tags: ['Vulnerability', 'Drama'], score: 92, last: '3d', auds: 28, cb: 7, status: 'available' },
    { name: 'Inès Karim',     loc: 'Paris, FR',        agency: 'Vertice Talent', tags: ['Drama', 'Multilingual'], score: 87, last: '1w', auds: 19, cb: 4, status: 'available' },
    { name: 'Sofia Bello',    loc: 'Paris, FR',        agency: 'Wildcard',       tags: ['Comedy', 'Voice'], score: 84, last: '2d', auds: 31, cb: 9, status: 'busy' },
    { name: 'Léa Martin',     loc: 'Marseille, FR',    agency: 'Bureau A.',      tags: ['Theatre', 'Singing'], score: 79, last: '5d', auds: 16, cb: 3, status: 'available' },
    { name: 'Hannah Levy',    loc: 'New York, US',     agency: 'Open Stage',     tags: ['Drama', 'Comedy'], score: 76, last: '1d', auds: 24, cb: 6, status: 'available' },
    { name: 'Eva Sokolov',    loc: 'Berlin, DE',       agency: 'Atlas Agency',   tags: ['Drama', 'Action'], score: 73, last: '3w', auds: 11, cb: 2, status: 'busy' },
    { name: 'Margot Chen',    loc: 'Toronto, CA',      agency: 'Open Stage',     tags: ['Comedy', 'Improv'], score: 71, last: '4d', auds: 18, cb: 3, status: 'available' },
    { name: 'Mia Park',       loc: 'Seoul, KR',        agency: 'KR Talent',      tags: ['Drama', 'Multilingual'], score: 68, last: '6d', auds: 8, cb: 1, status: 'available' },
  ];

  return (
    <div className="lic" style={{ background: S.bg, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <SocialNav T={T} active="castings"/>

      {/* Sub-nav: Recruiter modules */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 4,
        padding: '0 28px', height: 44,
        background: 'var(--lic-paper)', borderBottom: '1px solid var(--lic-line)',
      }}>
        <strong style={{ fontSize: 13, marginRight: 18 }}>Talent Recruiter</strong>
        {['Search', 'My campaigns', 'Pipeline', 'Saved searches', 'Reports', 'Learning'].map((t, i) => (
          <div key={t} style={{
            padding: '8px 12px', fontSize: 12, fontWeight: 600,
            color: i === 0 ? S.ink : S.muted,
            borderBottom: i === 0 ? '2px solid #0A0A0B' : '2px solid transparent',
            marginBottom: -1,
          }}>{t}</div>
        ))}
        <div style={{ flex: 1 }}/>
        <Btn variant="secondary" size="sm" icon={<Ico.download size={13}/>}>Export shortlist</Btn>
        <Btn variant="primary" size="sm" icon={<Ico.plus size={13} stroke="#fff"/>}>New campaign</Btn>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Filters */}
        <div style={{ width: 260, flexShrink: 0, background: 'var(--lic-paper)', borderRight: '1px solid var(--lic-line)', overflowY: 'auto', padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
            <strong style={{ fontSize: 13 }}>Filters</strong>
            <span style={{ fontSize: 11, color: '#1E5AF5', fontWeight: 600 }}>Reset</span>
          </div>
          <div style={{ padding: 10, borderRadius: 8, background: 'var(--lic-mist-soft)', border: '1px solid var(--lic-mist)', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700 }}>
              <Ico.sparkles size={14} stroke="#1E5AF5"/> AI match
            </div>
            <div style={{ fontSize: 11, color: S.muted, marginTop: 4 }}>Find talents fitting your scene's emotional profile</div>
            <button style={{
              marginTop: 8, padding: '6px 10px', borderRadius: 6, border: 'none',
              background: '#0A0A0B', color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer',
            }}>+ Add scene</button>
          </div>
          {filters.map(f => (
            <div key={f.l} style={{ marginBottom: 14 }}>
              <div className="lic-mono" style={{ fontSize: 9, color: S.muted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>{f.l}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {f.v.map(v => (
                  <Chip key={v} variant="mist" size="md">{v} <span style={{ marginLeft: 4, opacity: 0.5 }}>×</span></Chip>
                ))}
                {f.more && (
                  <Chip variant="ghost" size="md">+ {f.more}</Chip>
                )}
              </div>
            </div>
          ))}
          {[
            'Ethnicity',
            'Special abilities',
            'Availability window',
            'Experience level',
            'Has reel',
            'Has agent',
          ].map(l => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', fontSize: 12, color: S.muted, borderBottom: '1px solid var(--lic-line)' }}>
              <span>{l}</span>
              <Ico.plus size={13}/>
            </div>
          ))}
        </div>

        {/* Results */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 24px' }}>
          {/* Search bar + meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{
              flex: 1, height: 40, borderRadius: 10,
              border: '1px solid var(--lic-line-strong)', background: '#fff',
              display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px',
            }}>
              <Ico.search size={16} stroke={S.muted}/>
              <span style={{ fontSize: 13, color: S.ink }}>"vulnerable, sharp, 24–32, drama-leaning"</span>
              <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 10, padding: '2px 6px', background: 'var(--lic-mist-soft)', borderRadius: 4, color: '#1E5AF5', fontWeight: 700 }}>AI parsed</span>
            </div>
            <Btn variant="secondary" size="md" icon={<Ico.pin size={14}/>}>Save search</Btn>
          </div>

          {/* Bar of meta */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: S.muted }}>
              <strong style={{ color: S.ink }}>1,847 talents</strong> match · sorted by <strong style={{ color: S.ink }}>AI performance fit</strong>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Chip variant="yellow">⚡ AI rerank</Chip>
              <Btn variant="ghost" size="sm" icon={<Ico.list size={13}/>}>Columns</Btn>
              <div style={{ display: 'flex', gap: 0, border: '1px solid var(--lic-line-strong)', borderRadius: 8, overflow: 'hidden' }}>
                <button style={{ padding: '6px 10px', border: 'none', background: '#0A0A0B', color: '#fff' }}><Ico.list size={13} stroke="#fff"/></button>
                <button style={{ padding: '6px 10px', border: 'none', background: '#fff', color: S.ink }}><Ico.grid size={13}/></button>
              </div>
            </div>
          </div>

          {/* Results table-cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {results.map((r, i) => (
              <div key={r.name} style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: '12px 14px',
                background: '#fff', borderRadius: 12, boxShadow: 'var(--sh-1)',
              }}>
                <input type="checkbox" defaultChecked={i < 2} style={{ width: 14, height: 14 }}/>
                <Avatar name={r.name} size={48}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <strong style={{ fontSize: 14 }}>{r.name}</strong>
                    {r.status === 'available'
                      ? <Chip variant="green" size="sm">● Available</Chip>
                      : <Chip variant="yellow" size="sm">● On project</Chip>}
                  </div>
                  <div style={{ fontSize: 11, color: S.muted, marginTop: 2 }}>{r.loc} · {r.agency}</div>
                  <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                    {r.tags.map(t => <Chip key={t} variant="mist" size="sm">{t}</Chip>)}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18, alignItems: 'center', minWidth: 220 }}>
                  <div>
                    <div className="lic-mono" style={{ fontSize: 9, color: S.muted, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Match</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <strong style={{ fontSize: 16, color: r.score > 85 ? '#16A34A' : r.score > 75 ? '#0A0A0B' : S.muted }}>{r.score}</strong>
                      <div style={{ flex: 1, height: 4, background: 'var(--lic-paper-3)', borderRadius: 999 }}>
                        <div style={{ width: `${r.score}%`, height: '100%', background: r.score > 85 ? '#16A34A' : '#0A0A0B', borderRadius: 999 }}/>
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{r.auds}</div>
                    <div className="lic-mono" style={{ fontSize: 9, color: S.muted, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Auditions</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{r.cb}</div>
                    <div className="lic-mono" style={{ fontSize: 9, color: S.muted, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Callbacks</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--lic-line-strong)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico.pin size={14}/></button>
                  <button style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--lic-line-strong)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico.message size={14}/></button>
                  <Btn variant="primary" size="sm">View reel</Btn>
                </div>
              </div>
            ))}
          </div>

          {/* Campaign basket sticky bar */}
          <div style={{
            marginTop: 14, padding: '12px 16px', borderRadius: 12,
            background: '#0A0A0B', color: '#fff',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{
              padding: '4px 10px', borderRadius: 999, background: '#FFC400', color: '#0A0A0B',
              fontWeight: 700, fontSize: 12,
            }}>2 selected</div>
            <span style={{ fontSize: 13 }}>
              Add to campaign · <strong>Evermore — Fanny Brice</strong>
            </span>
            <div style={{ flex: 1 }}/>
            <Btn variant="ghost" size="sm" style={{ color: '#fff' }}>Save to shortlist</Btn>
            <Btn variant="secondary" size="sm">Send audition invite</Btn>
            <Btn size="sm" style={{ background: '#FFC400', color: '#0A0A0B', border: 'none' }} icon={<Ico.send size={13}/>}>Launch campaign</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenSocialFeed, ScreenTalentSearch });
