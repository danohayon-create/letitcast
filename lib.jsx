// Let it Cast — shared atoms, brand mark, icons, copy (FR/EN)

// ── Persona photos (real-looking, deterministic URLs) ────────────────
// Used by Avatar + Portrait when their `name` matches.
const PHOTO_FOR = {
  // Talents — featured personas
  'Maya':           'https://randomuser.me/api/portraits/women/65.jpg',
  'Maya Reyes':     'https://randomuser.me/api/portraits/women/65.jpg',
  'Theo':           'https://randomuser.me/api/portraits/men/32.jpg',
  'Theo Vance':     'https://randomuser.me/api/portraits/men/32.jpg',
  'Sofia Bello':    'https://randomuser.me/api/portraits/women/44.jpg',
  'Noor Haddad':    'https://randomuser.me/api/portraits/men/45.jpg',
  'Jules Marchand': 'https://randomuser.me/api/portraits/men/52.jpg',
  'Inès Karim':     'https://randomuser.me/api/portraits/women/12.jpg',
  // Review grid talents
  'Léa Martin':     'https://randomuser.me/api/portraits/women/29.jpg',
  'Margot Chen':    'https://randomuser.me/api/portraits/women/89.jpg',
  'Eva Sokolov':    'https://randomuser.me/api/portraits/women/8.jpg',
  'Jordan Cole':    'https://randomuser.me/api/portraits/men/77.jpg',
  // Casting / production team
  'Peter Known':    'https://randomuser.me/api/portraits/men/41.jpg',
  'Eden Tov':       'https://randomuser.me/api/portraits/women/68.jpg',
  'Julie Cohen':    'https://randomuser.me/api/portraits/women/22.jpg',
  'Lara Khan':      'https://randomuser.me/api/portraits/women/76.jpg',
  // Social feed extras
  'Mia Park':       'https://randomuser.me/api/portraits/women/55.jpg',
  'Adrien Roux':    'https://randomuser.me/api/portraits/men/16.jpg',
  'Hannah Levy':    'https://randomuser.me/api/portraits/women/33.jpg',
  'Olu Adebayo':    'https://randomuser.me/api/portraits/men/93.jpg',
  'Sana Mehta':     'https://randomuser.me/api/portraits/women/40.jpg',
  'Marco Liu':      'https://randomuser.me/api/portraits/men/24.jpg',
};

// ── Brand mark ────────────────────────────────────────────────────────
function LicLogo({ size = 22, color = '#0A0A0B', wordmark = true }) {
  // Stack of three offset bars — yellow, red, blue — vertical mini "color bars"
  // Inspired by film color-bars and the supplied logo screenshot.
  const bar = size;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.42 }}>
      <svg width={size * 0.66} height={size * 1.08} viewBox="0 0 22 36" style={{ display: 'block' }}>
        <rect x="0"  y="0"  width="9" height="11" rx="1.5" fill="#FFC400"/>
        <rect x="11" y="6"  width="9" height="11" rx="1.5" fill="#E5283A"/>
        <rect x="3"  y="22" width="9" height="13" rx="1.5" fill="#1E5AF5"/>
      </svg>
      {wordmark && (
        <span style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: size * 0.92,
          letterSpacing: '-0.03em',
          color,
          lineHeight: 1,
        }}>let it cast</span>
      )}
    </div>
  );
}

// ── Tiny inline icons (stroke-based) ──────────────────────────────────
const Icon = ({ d, size = 16, stroke = 'currentColor', fill = 'none', sw = 1.7, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke}
       strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" {...rest}>
    <path d={d}/>
  </svg>
);
const Ico = {
  search: (p) => <Icon {...p} d="M21 21l-4.3-4.3M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"/>,
  bell:   (p) => <Icon {...p} d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9zM10 21a2 2 0 0 0 4 0"/>,
  star:   (p) => <Icon {...p} d="M12 2l3 7 7 .8-5.2 4.8 1.6 7.1L12 18l-6.4 3.7L7.2 14.6 2 9.8 9 9z"/>,
  play:   (p) => <Icon {...p} d="M6 4l14 8-14 8z" fill="currentColor"/>,
  pause:  (p) => <Icon {...p} d="M7 4v16M17 4v16" sw={2.4}/>,
  record: (p) => <Icon {...p} d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10z" fill="currentColor" stroke="none"/>,
  check:  (p) => <Icon {...p} d="M4 12l5 5L20 6"/>,
  x:      (p) => <Icon {...p} d="M5 5l14 14M19 5L5 19"/>,
  arrow:  (p) => <Icon {...p} d="M5 12h14M13 6l6 6-6 6"/>,
  back:   (p) => <Icon {...p} d="M19 12H5M11 6l-6 6 6 6"/>,
  flip:   (p) => <Icon {...p} d="M3 7h13a4 4 0 0 1 4 4v2M21 17H8a4 4 0 0 1-4-4v-2M6 4L3 7l3 3M18 14l3 3-3 3"/>,
  mic:    (p) => <Icon {...p} d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3M8 21h8"/>,
  upload: (p) => <Icon {...p} d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M12 3v14M6 9l6-6 6 6"/>,
  download:(p)=> <Icon {...p} d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M12 17V3M6 11l6 6 6-6"/>,
  share:  (p) => <Icon {...p} d="M16 6l-4-4-4 4M12 2v13M4 13v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/>,
  more:   (p) => <Icon {...p} d="M5 12h.01M12 12h.01M19 12h.01" sw={3}/>,
  film:   (p) => <Icon {...p} d="M3 4h18v16H3zM7 4v16M17 4v16M3 8h4M3 12h4M3 16h4M17 8h4M17 12h4M17 16h4"/>,
  user:   (p) => <Icon {...p} d="M5 21a7 7 0 0 1 14 0M12 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/>,
  home:   (p) => <Icon {...p} d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2z"/>,
  flame:  (p) => <Icon {...p} d="M12 3s5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 1-3s2 1 2 4c0 0 2-1 2-4 0-3-2-6-2-7zM7 15a5 5 0 0 0 10 0"/>,
  inbox:  (p) => <Icon {...p} d="M3 13l3-8h12l3 8M3 13v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6M3 13h5l1 3h6l1-3h5"/>,
  pin:    (p) => <Icon {...p} d="M12 13v8M8 13h8l-1-8H9l-1 8z"/>,
  clock:  (p) => <Icon {...p} d="M12 6v6l4 2M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z"/>,
  globe:  (p) => <Icon {...p} d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>,
  send:   (p) => <Icon {...p} d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/>,
  filter: (p) => <Icon {...p} d="M3 5h18M6 12h12M10 19h4"/>,
  grid:   (p) => <Icon {...p} d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>,
  list:   (p) => <Icon {...p} d="M4 6h16M4 12h16M4 18h16"/>,
  plus:   (p) => <Icon {...p} d="M12 5v14M5 12h14"/>,
  sparkles:(p)=> <Icon {...p} d="M12 3v4M12 17v4M5 12H3M21 12h-2M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2"/>,
  bolt:   (p) => <Icon {...p} d="M13 2L4 14h7l-1 8 9-12h-7z"/>,
  trim:   (p) => <Icon {...p} d="M6 4v16M18 4v16M2 8h4M2 16h4M18 8h4M18 16h4"/>,
  eye:    (p) => <Icon {...p} d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>,
  message:(p) => <Icon {...p} d="M21 12a8 8 0 1 1-3-6.2L21 4l-1 4.5A8 8 0 0 1 21 12z"/>,
};

// ── Copy dictionary ───────────────────────────────────────────────────
const COPY = {
  en: {
    tagline: "the real-time arena for casting",
    feed: "Casting calls",
    forYou: "For you",
    nearMe: "Near me",
    new: "New",
    snapApply: "Snap apply",
    apply: "Apply",
    applied: "Applied",
    auditions: "Auditions",
    inbox: "Inbox",
    profile: "Profile",
    selfTape: "Self tape",
    record: "Record",
    retake: "Retake",
    submit: "Submit audition",
    submitted: "Submitted",
    takes: "Takes",
    take: "Take",
    sides: "Sides",
    teleprompter: "Teleprompter",
    framing: "Framing",
    aiFeedback: "AI feedback",
    review: "Review",
    rating: "Your rating",
    nogo: "No go",
    maybe: "Maybe",
    goodMatch: "Good match",
    otherRatings: "Other ratings",
    comments: "Comments",
    feedback: "Direct feedback to actor",
    deadline: "Deadline",
    roles: "Roles",
    submissions: "Submissions",
    shortlist: "Shortlist",
    cb: "Callbacks",
    booked: "Booked",
    castingDirectors: "Casting directors",
    projects: "Projects",
    new_cast: "New casting",
    perfProfile: "Persistent performance profile",
    perfProfileSub: "Every audition updates a model of how you perform — not who you claim to be.",
    height: "Height",
    agency: "Agency",
    contact: "Contact",
    cv: "CV",
    reel: "Reel",
    notesFromCD: "Notes from the casting director",
    sideUploaded: "The casting director uploaded the sides to the audition portal.",
    timer: "Timer",
    countdown: "Countdown",
    flipCam: "Flip camera",
    framingRatios: "Choose framing",
    keep: "Keep this take",
    discard: "Discard",
    nextLine: "Next line",
    finish: "Finish",
    seeAll: "See all",
    matchScore: "Match score",
    persistentPP: "Performance profile",
    auditionsCount: "Auditions",
    callbacksCount: "Callbacks",
    bookings: "Bookings",
    invitedTo: "Invited to audition",
    paidByProd: "Paid by production",
    closes: "Closes in",
    days: "days",
    hours: "h",
    submitting: "Submitting your audition",
    uploading: "Uploading",
    encoding: "Encoding 1080p",
    notifying: "Notifying casting team",
    done: "All set",
    nextSteps: "What happens next",
    nextNote: "The casting team usually reviews within 48h. We'll ping you the moment they rate your tape.",
    backHome: "Back to feed",
    rate: "Rate",
    addNote: "Add note",
    sortBy: "Sort by",
    recent: "Recent",
    topMatch: "Top match",
    unrated: "Unrated",
    compare: "Compare",
    by: "by",
    role: "Role",
    project: "Project",
    location: "Location",
    union: "Union",
    age: "Age range",
    type: "Type",
    pay: "Pay",
    selfTapeDue: "Self-tape due",
    sceneTitle: "Scene",
  },
  fr: {
    tagline: "l'arène en temps réel du casting",
    feed: "Castings",
    forYou: "Pour toi",
    nearMe: "À proximité",
    new: "Nouveau",
    snapApply: "Snap apply",
    apply: "Postuler",
    applied: "Envoyé",
    auditions: "Auditions",
    inbox: "Notifs",
    profile: "Profil",
    selfTape: "Self tape",
    record: "Enregistrer",
    retake: "Refaire",
    submit: "Envoyer l'audition",
    submitted: "Envoyé",
    takes: "Prises",
    take: "Prise",
    sides: "Sides",
    teleprompter: "Téléprompteur",
    framing: "Cadrage",
    aiFeedback: "Feedback IA",
    review: "Review",
    rating: "Ta note",
    nogo: "No go",
    maybe: "Maybe",
    goodMatch: "Good match",
    otherRatings: "Autres notes",
    comments: "Commentaires",
    feedback: "Feedback direct au talent",
    deadline: "Deadline",
    roles: "Rôles",
    submissions: "Soumissions",
    shortlist: "Shortlist",
    cb: "Callbacks",
    booked: "Booké",
    castingDirectors: "Directeurs de casting",
    projects: "Projets",
    new_cast: "Nouveau casting",
    perfProfile: "Persistent performance profile",
    perfProfileSub: "Chaque audition met à jour un modèle de ta performance — pas ce que tu prétends être.",
    height: "Taille",
    agency: "Agence",
    contact: "Contact",
    cv: "CV",
    reel: "Reel",
    notesFromCD: "Notes du directeur de casting",
    sideUploaded: "Le directeur de casting a uploadé les sides sur le portail.",
    timer: "Timer",
    countdown: "Compte à rebours",
    flipCam: "Retourner",
    framingRatios: "Choisir le cadre",
    keep: "Garder cette prise",
    discard: "Supprimer",
    nextLine: "Réplique suivante",
    finish: "Terminer",
    seeAll: "Tout voir",
    matchScore: "Match score",
    persistentPP: "Performance profile",
    auditionsCount: "Auditions",
    callbacksCount: "Callbacks",
    bookings: "Bookings",
    invitedTo: "Invité·e à auditionner",
    paidByProd: "Payé par la prod",
    closes: "Ferme dans",
    days: "j",
    hours: "h",
    submitting: "Envoi de l'audition",
    uploading: "Upload",
    encoding: "Encodage 1080p",
    notifying: "Notification équipe casting",
    done: "C'est bon",
    nextSteps: "Et après ?",
    nextNote: "L'équipe casting review en général sous 48h. On te ping dès qu'ils notent ta tape.",
    backHome: "Retour au feed",
    rate: "Noter",
    addNote: "Note",
    sortBy: "Trier par",
    recent: "Récent",
    topMatch: "Top match",
    unrated: "Non noté",
    compare: "Comparer",
    by: "par",
    role: "Rôle",
    project: "Projet",
    location: "Lieu",
    union: "Syndicat",
    age: "Âge",
    type: "Type",
    pay: "Rémun.",
    selfTapeDue: "Self-tape pour le",
    sceneTitle: "Scène",
  },
};

// ── Tiny utility components ───────────────────────────────────────────
function Chip({ children, variant = 'default', size = 'sm' }) {
  const v = {
    default: { bg: 'var(--lic-paper)', color: 'var(--lic-ink)', border: '1px solid var(--lic-line)' },
    mist:    { bg: 'var(--lic-mist-soft)', color: 'var(--lic-ink)', border: '1px solid var(--lic-mist)' },
    ink:     { bg: 'var(--lic-ink)', color: '#fff', border: '1px solid var(--lic-ink)' },
    yellow:  { bg: '#FFF6D6', color: '#7A5A00', border: '1px solid #F5D77A' },
    red:     { bg: '#FCE3E6', color: '#8A1422', border: '1px solid #F2B7BE' },
    blue:    { bg: '#E1EAFE', color: '#0E2F8E', border: '1px solid #B8CAFA' },
    green:   { bg: '#DEF4E5', color: '#0E5B2C', border: '1px solid #A9DDBC' },
    ghost:   { bg: 'transparent', color: 'var(--lic-muted)', border: '1px solid transparent' },
  }[variant];
  const pad = size === 'lg' ? '6px 12px' : size === 'md' ? '4px 10px' : '3px 8px';
  const fs = size === 'lg' ? 13 : 11;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: pad, borderRadius: 999, fontSize: fs, fontWeight: 600,
      letterSpacing: 0, lineHeight: 1, whiteSpace: 'nowrap',
      ...v,
    }}>{children}</span>
  );
}

function Btn({ children, variant = 'primary', size = 'md', icon, full = false, ...rest }) {
  const sz = {
    sm: { p: '6px 10px', fs: 12, ic: 14 },
    md: { p: '9px 14px', fs: 13, ic: 15 },
    lg: { p: '12px 18px', fs: 14, ic: 16 },
  }[size];
  const v = {
    primary: { bg: 'var(--lic-ink)', color: '#fff', border: '1px solid var(--lic-ink)' },
    secondary: { bg: 'var(--lic-paper)', color: 'var(--lic-ink)', border: '1px solid var(--lic-line-strong)' },
    ghost: { bg: 'transparent', color: 'var(--lic-ink)', border: '1px solid transparent' },
    mist: { bg: 'var(--lic-mist-soft)', color: 'var(--lic-ink)', border: '1px solid var(--lic-mist)' },
    danger: { bg: 'var(--lic-no)', color: '#fff', border: '1px solid var(--lic-no)' },
  }[variant];
  return (
    <button {...rest} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      gap: 8, padding: sz.p, borderRadius: 10,
      fontFamily: 'inherit', fontSize: sz.fs, fontWeight: 600,
      cursor: 'pointer', width: full ? '100%' : 'auto',
      transition: 'transform .12s, filter .12s', ...v, ...rest.style,
    }}
    onMouseEnter={e => e.currentTarget.style.filter = 'brightness(0.95)'}
    onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}>
      {icon}{children}
    </button>
  );
}

function Avatar({ name, size = 36, color, photo }) {
  const initials = name.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase();
  const palette = ['#FFC400', '#E5283A', '#1E5AF5', '#16A34A', '#7B5BFA', '#0AA1A8', '#F77F00'];
  const idx = name.charCodeAt(0) % palette.length;
  const c = color || palette[idx];
  const src = photo || PHOTO_FOR[name];
  if (src) {
    return (
      <img src={src} alt={name} referrerPolicy="no-referrer" loading="lazy"
           style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}/>
    );
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: c, color: '#fff',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.36, fontWeight: 700, letterSpacing: '-0.02em',
      flexShrink: 0,
    }}>{initials}</div>
  );
}

// Subtle striped portrait placeholder. If a `photo` URL is provided,
// the photo is shown instead (object-fit cover) so the demo feels real.
function Portrait({ name, color = '#E2E6F3', dark = false, label, role, photo, filter, style = {} }) {
  const seed = name ? name.charCodeAt(0) : 1;
  const hues = ['#E2E6F3', '#FFE7CC', '#FCD9DD', '#D5F0DC', '#E8DDFB', '#D6ECF8', '#FBEBC1'];
  const bg = color || hues[seed % hues.length];
  const ink = dark ? '#fff' : 'var(--lic-ink)';
  const src = photo || PHOTO_FOR[name];
  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      background: bg,
      ...style,
    }}>
      {src ? (
        <img src={src} alt={name || ''} loading="lazy" referrerPolicy="no-referrer"
             style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                      objectFit: 'cover', filter: filter || 'none' }}/>
      ) : (
        <>
          {/* Subtle silhouette */}
          <svg viewBox="0 0 100 140" preserveAspectRatio="xMidYMax meet"
               style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.55 }}>
            <ellipse cx="50" cy="55" rx="22" ry="26" fill="rgba(0,0,0,0.18)"/>
            <path d="M10 140 C 10 100, 35 88, 50 88 C 65 88, 90 100, 90 140 Z" fill="rgba(0,0,0,0.18)"/>
          </svg>
          {/* Diagonal stripes for that "placeholder" feel */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.18,
            background: 'repeating-linear-gradient(135deg, transparent 0 22px, rgba(10,10,11,0.5) 22px 23px)',
          }}/>
        </>
      )}
      {(label || role) && (
        <div style={{
          position: 'absolute', left: 12, bottom: 10, right: 12,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)', fontSize: 10, color: ink,
          textShadow: dark ? '0 1px 2px rgba(0,0,0,0.6)' : '0 1px 0 rgba(255,255,255,0.4)',
          letterSpacing: '0.04em', textTransform: 'uppercase',
        }}>
          <span>{label}</span><span style={{ opacity: 0.7 }}>{role}</span>
        </div>
      )}
    </div>
  );
}

// Card surface
function Card({ children, style = {}, padded = true }) {
  return (
    <div style={{
      background: 'var(--lic-paper)',
      borderRadius: 'var(--r-3)',
      boxShadow: 'var(--sh-1)',
      padding: padded ? 16 : 0,
      ...style,
    }}>{children}</div>
  );
}

// Color-bar mini accent
function ColorBars({ size = 6, gap = 3 }) {
  return (
    <div style={{ display: 'inline-flex', gap, alignItems: 'center' }}>
      <span style={{ width: size, height: size * 2.2, background: '#FFC400', borderRadius: 1 }}/>
      <span style={{ width: size, height: size * 2.2, background: '#E5283A', borderRadius: 1 }}/>
      <span style={{ width: size, height: size * 2.2, background: '#1E5AF5', borderRadius: 1 }}/>
    </div>
  );
}

// Personas used across screens
const PERSONAS = {
  maya:  { name: 'Maya Reyes',     role: 'Actress',  agency: 'Vertice Talent',     mail: 'maya@vertice.co',   height: '170 cm', color: '#FCD9DD' },
  theo:  { name: 'Theo Vance',     role: 'Singer',   agency: 'Open Stage',         mail: 'theo@openstage.io', height: '184 cm', color: '#D6ECF8' },
  sofia: { name: 'Sofia Bello',    role: 'Comedian', agency: 'Wildcard',           mail: 'sofia@wildcard.fr', height: '163 cm', color: '#FBEBC1' },
  noor:  { name: 'Noor Haddad',    role: 'Actor',    agency: 'Atlas Agency',       mail: 'noor@atlas.ag',     height: '178 cm', color: '#E8DDFB' },
  jules: { name: 'Jules Marchand', role: 'Actor',    agency: 'Bureau Argentique',  mail: 'jules@bureau.fr',   height: '189 cm', color: '#D5F0DC' },
  ines:  { name: 'Inès Karim',     role: 'Actress',  agency: 'Vertice Talent',     mail: 'ines@vertice.co',   height: '167 cm', color: '#FFE7CC' },
};

// Sample castings
const CASTINGS = [
  { id: 'evermore', title: 'Evermore', role: 'Fanny Brice',  type: 'TV series · A24', location: 'Los Angeles', age: '24–32', pay: '$1,200/day', closes: '3d 04h', match: 92, sides: 4, accent: '#FFC400' },
  { id: 'rive',     title: 'Rive Droite', role: 'Léa',        type: 'Indie film · Pathé', location: 'Paris', age: '26–34', pay: '€800/day', closes: '5d 11h', match: 87, sides: 2, accent: '#1E5AF5' },
  { id: 'echo',     title: 'Echo Park',  role: 'The Drifter', type: 'Music video · WMG', location: 'Remote',     age: '22–40', pay: '$900/day', closes: '1d 09h', match: 78, sides: 1, accent: '#E5283A' },
  { id: 'nuit',     title: 'La Nuit Vive', role: 'Marco',     type: 'Theatre · TNP',    location: 'Lyon',       age: '30–45', pay: '€650/day', closes: '6d 02h', match: 71, sides: 3, accent: '#16A34A' },
];

// Export to window for cross-script access
Object.assign(window, { LicLogo, Ico, Chip, Btn, Avatar, Portrait, Card, ColorBars, COPY, PERSONAS, CASTINGS, PHOTO_FOR });
