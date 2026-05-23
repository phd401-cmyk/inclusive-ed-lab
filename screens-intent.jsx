// Step 1: Intent (what + who at high level) and Template gallery

const IntentScreen = ({ state, set, onNext }) => {
  const canContinue = state.tlm && state.audience;
  return (
    <div className="anim-fade">
      <PageHeader
        eyebrow="Step 01 · Describe"
        title={<span>What do you want to design, <em className="serif" style={{ fontStyle: 'italic', color: 'var(--accent)' }}>and for whom?</em></span>}
        lede="Two quick choices to shape what we surface next. You can change these anytime."
      />

      <Card className="mb-3">
        <div className="row between mb-2" style={{ alignItems: 'flex-end' }}>
          <div>
            <div className="eyebrow mb-1">A. Format</div>
            <h2>Which kind of teaching material?</h2>
          </div>
          <div className="muted" style={{ fontSize: 13 }}>{state.tlm ? TLM_TYPES.find(t => t.id === state.tlm)?.label : 'Pick one'}</div>
        </div>
        <div className="grid-tlm">
          {TLM_TYPES.map(t => (
            <TLMTile key={t.id} tlm={t} selected={state.tlm === t.id} onClick={() => set({ tlm: t.id, template: null })} />
          ))}
        </div>
      </Card>

      <Card>
        <div className="row between mb-2" style={{ alignItems: 'flex-end' }}>
          <div>
            <div className="eyebrow mb-1">B. Audience</div>
            <h2>Who are you teaching?</h2>
          </div>
          <div className="muted" style={{ fontSize: 13 }}>You’ll describe specific learner needs in the next step.</div>
        </div>
        <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
          {AUDIENCES.map(a => (
            <Chip key={a.id} active={state.audience === a.id} onClick={() => set({ audience: a.id })}>{a.label}</Chip>
          ))}
        </div>
      </Card>

      <div className="row between mt-4">
        <span className="muted" style={{ fontSize: 13 }}>Don’t worry — we’ll never lock you into a single framework. You’ll see every theory we apply, before you download.</span>
        <Button variant="accent" size="lg" disabled={!canContinue} onClick={onNext} trailing="arrow-right">Continue to templates</Button>
      </div>
      <div className="divider" />
      <div className="row" style={{ gap: 14, alignItems: 'center' }}>
        <span style={{ fontSize: 13.5, color: 'var(--ink-2)' }}>Want to browse all 66 templates first?</span>
        <a href="Template Repository.html" target="_blank" className="btn sm" style={{ textDecoration: 'none' }}>Open Template Repository →</a>
      </div>
    </div>
  );
};

const TemplateGalleryScreen = ({ state, set, onNext, onBack }) => {
  const list = TEMPLATES[state.tlm] || [];
  const tlmLabel = TLM_TYPES.find(t => t.id === state.tlm)?.label;
  const audLabel = AUDIENCES.find(a => a.id === state.audience)?.label;
  const [filter, setFilter] = useState('all');
  const filtered = useMemo(() => filter === 'all' ? list : list.filter(t => t.theories.includes(filter)), [list, filter]);
  return (
    <div className="anim-fade">
      <PageHeader
        eyebrow="Step 02 · Choose · Browse"
        title={<span>Templates for <em className="serif" style={{ fontStyle: 'italic' }}>{tlmLabel?.toLowerCase()}</em></span>}
        lede={`Designed for ${audLabel}. Pick a starting point — you’ll refine it once we know more about your learners.`}
        right={
          <div className="col" style={{ alignItems: 'flex-end', gap: 8 }}>
            <SegmentToggle value={filter} onChange={setFilter} options={[
              { value: 'all', label: 'All' },
              { value: 'udl', label: 'UDL-leaning' },
              { value: 'cog', label: 'Low-load' },
              { value: 'crp', label: 'Culturally responsive' },
            ]} />
            <span className="muted mono" style={{ fontSize: 11 }}>{filtered.length} templates</span>
          </div>
        }
      />

      <div className="grid-tpl mb-3">
        {filtered.map(tpl => (
          <TemplateCard key={tpl.id} tlm={tlmLabel} tpl={tpl} selected={state.template === tpl.id} onClick={() => set({ template: tpl.id })} />
        ))}
      </div>

      <div className="row between mt-4">
        <Button variant="ghost" leading="arrow-left" onClick={onBack}>Back</Button>
        <div className="row" style={{ gap: 12 }}>
          {state.template ? (
            <span className="muted" style={{ fontSize: 13 }}>
              Selected: <strong style={{ color: 'var(--ink)' }}>{list.find(l => l.id === state.template)?.name}</strong>
            </span>
          ) : (
            <span className="muted" style={{ fontSize: 13 }}>Pick a template to continue — or skip and we’ll suggest some after the next step.</span>
          )}
          <Button variant="accent" size="lg" onClick={onNext} trailing="arrow-right">Describe your learners</Button>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { IntentScreen, TemplateGalleryScreen });
