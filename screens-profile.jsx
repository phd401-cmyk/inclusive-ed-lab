// Step 3 — Learner profile (multi-tab intake) + Step 4 — Shortlist

const TABS = [
  { id: 'persona', label: 'Persona' },
  { id: 'class',   label: 'Class composition' },
  { id: 'needs',   label: 'Considerations' },
  { id: 'context', label: 'Context' },
];

const ProfileScreen = ({ state, set, onNext, onBack }) => {
  const [tab, setTab] = useState('persona');
  const completed = useMemo(() => ({
    persona: !!state.persona,
    class:   !!state.composition,
    needs:   true,
    context: !!state.context,
  }), [state]);

  const completedCount = Object.values(completed).filter(Boolean).length;
  const ready = completed.class && completed.context;

  return (
    <div className="anim-fade">
      <PageHeader
        eyebrow="Step 03 · Describe"
        title="Tell us about your learners."
        lede="The more you share, the better we can shortlist templates and calibrate the theories we apply. Only class composition and context are required."
        right={
          <div className="col" style={{ alignItems: 'flex-end' }}>
            <div className="mono muted" style={{ fontSize: 11 }}>{completedCount} / {TABS.length} sections</div>
            <div style={{ width: 140, height: 4, background: 'var(--bg-2)', borderRadius: 2, marginTop: 6 }}>
              <div style={{ width: (completedCount / TABS.length * 100) + '%', height: '100%', background: 'var(--accent)', borderRadius: 2, transition: 'width .3s' }} />
            </div>
          </div>
        }
      />

      {/* Tab bar */}
      <div className="row" style={{ gap: 4, marginBottom: 24, borderBottom: '1px solid var(--border)' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: 'transparent', border: 0, padding: '10px 14px',
            fontSize: 13.5, fontWeight: tab === t.id ? 600 : 500, fontFamily: 'inherit',
            color: tab === t.id ? 'var(--ink)' : 'var(--ink-3)',
            borderBottom: '2px solid ' + (tab === t.id ? 'var(--accent)' : 'transparent'),
            marginBottom: -1, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            {t.label}
            {completed[t.id] && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />}
          </button>
        ))}
      </div>

      {tab === 'persona'  && <PersonaTab  state={state} set={set} />}
      {tab === 'class'    && <ClassTab    state={state} set={set} />}
      {tab === 'needs'    && <NeedsTab    state={state} set={set} />}
      {tab === 'context'  && <ContextTab  state={state} set={set} />}

      <div className="row between mt-4">
        <Button variant="ghost" leading="arrow-left" onClick={onBack}>Back to templates</Button>
        <div className="row" style={{ gap: 12 }}>
          {!ready && <span className="muted" style={{ fontSize: 13 }}>Class composition + context needed.</span>}
          <Button variant="accent" size="lg" disabled={!ready} onClick={onNext} trailing="arrow-right">See shortlisted templates</Button>
        </div>
      </div>
    </div>
  );
};

// ── Persona tab ───────────────────────────────────────────────────────────────
const PersonaTab = ({ state, set }) => (
  <Card>
    <div className="mb-2">
      <h2>Start from a preset profile — or describe your own.</h2>
      <p className="muted mt-1" style={{ margin: '6px 0 0', fontSize: 13.5 }}>Picking a preset fills the other tabs automatically. You can always edit.</p>
    </div>
    <div className="grid-persona">
      {PERSONAS.map(p => (
        <button key={p.id} onClick={() => set({ persona: p.id, composition: p.composition, needs: p.needs, context: p.context })}
          className={'tlm-tile ' + (state.persona === p.id ? 'selected' : '')}
          style={{ textAlign: 'left', minHeight: 120 }}>
          <div className="icon"><Icon name="users" size={16} /></div>
          <div>
            <h4>{p.title}</h4>
            <p>{p.detail}</p>
          </div>
        </button>
      ))}
      <button onClick={() => set({ persona: 'custom' })}
        className={'tlm-tile ' + (state.persona === 'custom' ? 'selected' : '')}
        style={{ textAlign: 'left', minHeight: 120, borderStyle: 'dashed' }}>
        <div className="icon"><Icon name="plus" size={16} /></div>
        <div>
          <h4>Describe my own</h4>
          <p>Skip the preset and fill the tabs yourself.</p>
        </div>
      </button>
    </div>
  </Card>
);

// ── Class tab ─────────────────────────────────────────────────────────────────
const ClassTab = ({ state, set }) => (
  <Card>
    <div className="col" style={{ gap: 22 }}>
      <div>
        <h2>Class composition</h2>
        <p className="muted mt-1" style={{ margin: '6px 0 0', fontSize: 13.5 }}>How varied are the learners in this group?</p>
      </div>

      <Field label="Composition *">
        <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
          {[
            { id: 'homogeneous',   label: 'Homogeneous' },
            { id: 'heterogeneous', label: 'Heterogeneous / mixed-ability' },
            { id: 'multi-grade',   label: 'Multi-grade' },
            { id: 'has-special',   label: 'Includes learners with additional needs' },
          ].map(o => (
            <Chip key={o.id} active={state.composition === o.id} onClick={() => set({ composition: o.id })}>{o.label}</Chip>
          ))}
        </div>
      </Field>

      <Field label="Reading level spread" help="Helps tune cognitive load and scaffolding depth.">
        <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
          {['Within 1 grade', 'Spans 2 grades', 'Spans 3+ grades', 'Unknown'].map(o => (
            <Chip key={o} active={state.reading === o} onClick={() => set({ reading: o })}>{o}</Chip>
          ))}
        </div>
      </Field>
    </div>
  </Card>
);

// ── Needs tab ─────────────────────────────────────────────────────────────────
const NeedsTab = ({ state, set }) => {
  const cur = state.needs || [];
  const toggle = id => set({ needs: cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id] });
  return (
    <Card>
      <div className="col" style={{ gap: 16 }}>
        <div>
          <h2>Considerations</h2>
          <p className="muted mt-1" style={{ margin: '6px 0 0', fontSize: 13.5 }}>Tick anything you want the design to actively support. Leave empty — UDL applies by default.</p>
        </div>
        <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
          {NEEDS.map(n => (
            <Chip key={n.id} active={cur.includes(n.id)} onClick={() => toggle(n.id)}>{n.label}</Chip>
          ))}
        </div>
        {cur.length > 0 && (
          <div className="surface-quiet" style={{ padding: 14, fontSize: 13, color: 'var(--ink-2)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <Icon name="lightbulb" size={16} />
            <div>
              <strong>How this shapes the output: </strong>
              {cur.includes('dyslexia') && 'Dyslexia-friendly phrasing, decodable structure, audio cue sheet. '}
              {cur.includes('adhd') && 'Smaller chunks, clear transitions, movement cues. '}
              {cur.includes('vision') && 'High-contrast text, alt-text scripts, larger type. '}
              {cur.includes('eal') && 'Multilingual glossary column, picture supports. '}
              {cur.includes('mental-health') && 'Trauma-informed framing, opt-in participation language. '}
              {cur.includes('systemic') && 'Asset-based language, reduced barrier framing. '}
              {!cur.some(x => ['dyslexia','adhd','vision','eal','mental-health','systemic'].includes(x)) && 'Standard UDL multi-modal supports applied.'}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

// ── Context tab ───────────────────────────────────────────────────────────────
const ContextTab = ({ state, set }) => (
  <Card>
    <div className="col" style={{ gap: 16 }}>
      <div>
        <h2>Context *</h2>
        <p className="muted mt-1" style={{ margin: '6px 0 0', fontSize: 13.5 }}>Where will this material be used? Shapes cultural responsiveness and worked examples.</p>
      </div>
      <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
        {CONTEXTS.map(c => (
          <Chip key={c.id} active={state.context === c.id} onClick={() => set({ context: c.id })}>{c.label}</Chip>
        ))}
      </div>
      <Field label="Anything specific about the community, language or place?" help="Optional — one or two sentences.">
        <textarea className="textarea" placeholder="e.g., Tamil-speaking community in Madurai; many first-generation learners; weekly outdoor sessions."
          value={state.contextNote || ''} onChange={e => set({ contextNote: e.target.value })} />
      </Field>
    </div>
  </Card>
);

// ── Shortlist screen ──────────────────────────────────────────────────────────
const ShortlistScreen = ({ state, set, onNext, onBack }) => {
  const all = TEMPLATES[state.tlm] || [];
  const tlmLabel = TLM_TYPES.find(t => t.id === state.tlm)?.label;

  const scored = useMemo(() => {
    const needs = state.needs || [];
    return all.map(tpl => {
      let score = 0;
      const reasons = [];
      if (state.composition === 'heterogeneous' && tpl.theories.includes('udl'))      { score += 3; reasons.push('Strong UDL match for mixed-ability'); }
      if (needs.includes('dyslexia') && tpl.theories.includes('udl'))                 { score += 2; reasons.push('Multi-modal for reading challenges'); }
      if (needs.includes('eal') && tpl.theories.includes('crp'))                      { score += 2; reasons.push('Culturally responsive for EAL'); }
      if (needs.includes('adhd') && tpl.theories.includes('cog'))                     { score += 2; reasons.push('Lower cognitive load'); }
      if (needs.includes('systemic') && tpl.theories.includes('strengths'))            { score += 2; reasons.push('Asset-based for systemic barriers'); }
      if (state.context === 'rural-indigenous' && tpl.theories.includes('indig'))     { score += 3; reasons.push('Land-rooted, community context'); }
      if (state.context === 'higher-ed' && tpl.theories.includes('knowles'))          { score += 2; reasons.push('Andragogy-aligned'); }
      if (state.context === 'capacity-building' && tpl.theories.includes('knowles'))  { score += 2; reasons.push('Adult learner principles'); }
      if (tpl.id === state.template) { score += 1; reasons.push('You selected this earlier'); }
      score += tpl.theories.length * 0.3;
      return { tpl, score, reasons };
    }).sort((a, b) => b.score - a.score);
  }, [state, all]);

  const shortlist = scored.slice(0, 4);
  const rest = scored.slice(4);

  return (
    <div className="anim-fade">
      <PageHeader
        eyebrow="Step 04 · Shortlist"
        title="Four templates that fit your learners."
        lede="Ranked by alignment with the profile you described. See why each was chosen below the grid."
      />

      <div className="row mb-2" style={{ gap: 6, flexWrap: 'wrap' }}>
        {(state.needs || []).map(n => <Chip key={n} active>{NEEDS.find(x => x.id === n)?.label}</Chip>)}
        {state.context && <Chip active>{CONTEXTS.find(c => c.id === state.context)?.label}</Chip>}
        {state.composition && <Chip active>{state.composition}</Chip>}
        <Button variant="ghost" size="sm" onClick={onBack}>Adjust profile</Button>
      </div>

      <div className="grid-tpl mb-3">
        {shortlist.map(({ tpl, reasons }, i) => (
          <TemplateCard key={tpl.id} tlm={tlmLabel} tpl={tpl}
            selected={state.template === tpl.id}
            onClick={() => set({ template: tpl.id })}
            badge={i === 0 ? { label: 'Best match', tone: 'good' } : i === 1 ? { label: 'Strong fit', tone: 'good' } : null}
          />
        ))}
      </div>

      {/* Why section */}
      <Card style={{ background: 'var(--surface-2)' }}>
        <h3 className="mb-2">Why these four?</h3>
        <div className="col" style={{ gap: 0 }}>
          {shortlist.map(({ tpl, reasons }, i) => (
            <div key={tpl.id} className="row" style={{ gap: 12, fontSize: 13, padding: '10px 0', borderTop: i === 0 ? 'none' : '1px solid var(--border)' }}>
              <span className="mono" style={{ width: 20, color: 'var(--ink-3)', flexShrink: 0 }}>{`0${i+1}`}</span>
              <strong style={{ minWidth: 160, flexShrink: 0 }}>{tpl.name}</strong>
              <span className="muted">{[...new Set(reasons)].slice(0, 2).join(' · ') || 'General-purpose match'}</span>
            </div>
          ))}
        </div>
      </Card>

      {rest.length > 0 && (
        <details className="mt-3">
          <summary className="muted" style={{ cursor: 'pointer', fontSize: 13 }}>Show {rest.length} more templates</summary>
          <div className="grid-tpl mt-2">
            {rest.map(({ tpl }) => (
              <TemplateCard key={tpl.id} tlm={tlmLabel} tpl={tpl}
                selected={state.template === tpl.id}
                onClick={() => set({ template: tpl.id })} />
            ))}
          </div>
        </details>
      )}

      <div className="row between mt-4">
        <Button variant="ghost" leading="arrow-left" onClick={onBack}>Back</Button>
        <Button variant="accent" size="lg" disabled={!state.template} onClick={onNext} trailing="arrow-right">Continue</Button>
      </div>
    </div>
  );
};

Object.assign(window, { ProfileScreen, ShortlistScreen });
