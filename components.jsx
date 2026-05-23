// Reusable UI primitives

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// --- Icons (minimal stroke set) ---
const Icon = ({ name, size = 16, stroke = 1.6, className = '' }) => {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round', className };
  switch (name) {
    case 'arrow-right': return <svg {...props}><path d="M5 12h14M13 5l7 7-7 7"/></svg>;
    case 'arrow-left':  return <svg {...props}><path d="M19 12H5M11 5l-7 7 7 7"/></svg>;
    case 'check':       return <svg {...props}><path d="M4 12l5 5L20 6"/></svg>;
    case 'x':           return <svg {...props}><path d="M6 6l12 12M18 6L6 18"/></svg>;
    case 'plus':        return <svg {...props}><path d="M12 5v14M5 12h14"/></svg>;
    case 'download':    return <svg {...props}><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v3a1 1 0 001 1h14a1 1 0 001-1v-3"/></svg>;
    case 'upload':      return <svg {...props}><path d="M12 21V9m0 0l-4 4m4-4l4 4M4 7V4a1 1 0 011-1h14a1 1 0 011 1v3"/></svg>;
    case 'sparkles':    return <svg {...props}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/></svg>;
    case 'doc':         return <svg {...props}><path d="M7 3h8l4 4v14a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z"/><path d="M14 3v5h5"/></svg>;
    case 'pdf':         return <svg {...props}><path d="M7 3h8l4 4v14a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/></svg>;
    case 'users':       return <svg {...props}><circle cx="9" cy="8" r="3"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/><circle cx="17" cy="8" r="3"/><path d="M21 21v-2a4 4 0 00-3-3.87"/></svg>;
    case 'lightbulb':   return <svg {...props}><path d="M9 18h6M10 21h4M12 3a6 6 0 00-3 11c1 1 1 2 1 3h4c0-1 0-2 1-3a6 6 0 00-3-11z"/></svg>;
    case 'layers':      return <svg {...props}><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/><path d="M3 17l9 5 9-5"/></svg>;
    case 'template':    return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 9v12"/></svg>;
    case 'wand':        return <svg {...props}><path d="M15 4l5 5L9 20H4v-5L15 4z"/></svg>;
    case 'eye':         return <svg {...props}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>;
    case 'edit':        return <svg {...props}><path d="M12 20h9M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>;
    case 'theory':      return <svg {...props}><path d="M4 19V5a2 2 0 012-2h12a2 2 0 012 2v14l-3-2-3 2-3-2-3 2-3-2z"/></svg>;
    case 'globe':       return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>;
    case 'sun':         return <svg {...props}><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4"/></svg>;
    case 'moon':        return <svg {...props}><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>;
    case 'sliders':     return <svg {...props}><path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h14M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="8" cy="12" r="2"/><circle cx="18" cy="18" r="0.5" fill="currentColor"/></svg>;
    case 'help':        return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 4M12 17h.01"/></svg>;
    case 'sparkle-small': return <svg {...props}><path d="M12 4l1.5 5L19 11l-5.5 1.5L12 18l-1.5-5.5L5 11l5.5-1.5L12 4z"/></svg>;
    default:            return <svg {...props}><circle cx="12" cy="12" r="9"/></svg>;
  }
};

const Button = ({ children, variant = 'default', size, leading, trailing, onClick, disabled, type = 'button', className = '' }) => {
  const cls = ['btn', variant === 'primary' ? 'primary' : variant === 'accent' ? 'accent' : variant === 'ghost' ? 'ghost' : '', size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : '', className].filter(Boolean).join(' ');
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {leading && <Icon name={leading} size={size === 'lg' ? 16 : 14} />}
      {children}
      {trailing && <Icon name={trailing} size={size === 'lg' ? 16 : 14} />}
    </button>
  );
};

const Chip = ({ active, onClick, children, className = '', kind }) => (
  <button type="button" className={['chip', kind || '', active ? 'active' : '', className].filter(Boolean).join(' ')} onClick={onClick}>
    {children}
  </button>
);

const TheoryChip = ({ id, withName = true }) => {
  const t = THEORIES[id]; if (!t) return null;
  return <span className={'chip ' + t.klass} title={t.blurb}>{withName ? t.short : id}</span>;
};

const Badge = ({ children, tone }) => (
  <span className={'badge ' + (tone || '')}>{children}</span>
);

const Field = ({ label, help, children }) => (
  <div className="field">
    {label && <label className="field-label">{label}</label>}
    {children}
    {help && <div className="field-help">{help}</div>}
  </div>
);

const Card = ({ children, padded = true, className = '', elevated, ...rest }) => (
  <div className={['card', elevated ? 'elevated' : '', className].filter(Boolean).join(' ')} style={padded ? null : { padding: 0 }} {...rest}>
    {children}
  </div>
);

const SegmentToggle = ({ value, onChange, options }) => (
  <div className="pill-toggle">
    {options.map(o => (
      <button key={o.value} className={value === o.value ? 'on' : ''} onClick={() => onChange(o.value)}>{o.label}</button>
    ))}
  </div>
);

// Topbar step pills
const StepPills = ({ steps, current }) => (
  <div className="step-pills">
    {steps.map((s, i) => (
      <React.Fragment key={s.id}>
        <div className={'step-pill ' + (current === i ? 'active' : current > i ? 'done' : '')}>
          <span className="num">{current > i ? '✓' : i + 1}</span>
          <span>{s.label}</span>
        </div>
        {i < steps.length - 1 && <span className="bar" />}
      </React.Fragment>
    ))}
  </div>
);

// Tile for selectable grid (TLM, audience etc.)
const TLMTile = ({ tlm, selected, onClick }) => (
  <button type="button" className={'tlm-tile ' + (selected ? 'selected' : '')} onClick={onClick}>
    <div className="icon">
      <span className="serif" style={{ fontSize: 18 }}>{tlm.icon}</span>
    </div>
    <div>
      <h4>{tlm.label}</h4>
      <p>{tlm.desc}</p>
    </div>
  </button>
);

// Template card placeholder thumb — uses SVG so no absolute-positioning fragility
const TemplateThumb = ({ tlm, name }) => {
  const colorFor = (str) => {
    let h = 0; for (const c of str) h = (h * 31 + c.charCodeAt(0)) % 360;
    // return a safe hsl (no oklch to avoid browser-support issues)
    return `hsl(${h},22%,82%)`;
  };
  const bg = colorFor(name);
  return (
    <div className="tpl-thumb">
      <svg viewBox="0 0 160 220" style={{ width:'100%', height:'100%', display:'block' }}>
        <rect width="160" height="220" fill="white"/>
        <rect x="0" y="0" width="160" height="20" fill={bg}/>
        <text x="80" y="13" textAnchor="middle" fill="rgba(0,0,0,0.5)" fontSize="7" fontFamily="system-ui" fontWeight="600" letterSpacing="0.5">
          {(tlm||'').toUpperCase().slice(0,18)}
        </text>
        <rect x="12" y="28" width="136" height="12" rx="2" fill={bg} opacity=".5"/>
        {[44,60,74,88,102,116].map((y,i) => (
          <rect key={i} x="12" y={y} width={[120,100,110,90,115,95][i]} height="5" rx="1.5" fill="#d0c8dc" opacity=".6"/>
        ))}
        <rect x="12" y="132" width="62" height="62" rx="4" fill={bg} opacity=".35"/>
        <rect x="86" y="132" width="62" height="28" rx="4" fill={bg} opacity=".2"/>
        <rect x="86" y="166" width="62" height="28" rx="4" fill={bg} opacity=".2"/>
        {[208,216].map((y,i) => (
          <rect key={i} x="12" y={y} width={i===0?136:100} height="4" rx="1.5" fill="#d0c8dc" opacity=".5"/>
        ))}
      </svg>
    </div>
  );
};

const TemplateCard = ({ tlm, tpl, selected, onClick, badge }) => (
  <div className={'tpl-card ' + (selected ? 'selected' : '')} onClick={onClick}>
    <TemplateThumb tlm={tlm} name={tpl.name} />
    <div className="tpl-meta">
      <div className="row between" style={{ alignItems: 'flex-start' }}>
        <h4>{tpl.name}</h4>
        {badge && <Badge tone={badge.tone}>{badge.label}</Badge>}
      </div>
      <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{tpl.tone}</div>
      <div className="row" style={{ marginTop: 6, gap: 4, flexWrap: 'wrap' }}>
        {tpl.theories.slice(0, 3).map(t => <TheoryChip key={t} id={t} />)}
      </div>
    </div>
  </div>
);

// Page header
const PageHeader = ({ eyebrow, title, lede, right }) => (
  <div className="row between mb-3" style={{ alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
    <div style={{ maxWidth: '64ch' }}>
      {eyebrow && <div className="eyebrow mb-1">{eyebrow}</div>}
      <h1 className="serif">{title}</h1>
      {lede && <p className="lede mt-1">{lede}</p>}
    </div>
    {right}
  </div>
);

Object.assign(window, { Icon, Button, Chip, TheoryChip, Badge, Field, Card, SegmentToggle, StepPills, TLMTile, TemplateThumb, TemplateCard, PageHeader });
