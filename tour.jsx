// Welcome tour modal — 4 slides

const TOUR_SLIDES = [
  {
    title: 'Adapt any teaching material — for every learner.',
    body: 'Inclusive Ed Lab turns the lesson plans, worksheets and decks you already have into versions that meet your learners where they are.',
    art: 'hero',
  },
  {
    title: 'Built on twelve learning frameworks.',
    body: 'UDL, Bloom’s, Vygotsky, Kolb, Knowles, Sweller, Siemens & Downes, strengths-based, self-determination, culturally responsive, indigenous, and HCD — woven into every output.',
    art: 'theories',
  },
  {
    title: 'Three steps. Real outputs.',
    body: 'Tell us what you’re making and who it’s for. Pick a template. Paste in a draft or upload a sample. Download as Word or PDF — ready to teach with tomorrow.',
    art: 'steps',
  },
  {
    title: 'No assumptions. Your call.',
    body: 'We’ll ask questions when context is missing, surface every theory we applied, and let you tune the result before download. You stay in the driver’s seat.',
    art: 'driver',
  },
];

const TourArt = ({ kind }) => {
  if (kind === 'hero') return (
    <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
      <div style={{ background: 'var(--bg-2)', borderRight: '1px solid var(--border)', padding: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: 0.1 }}>Original</div>
        <div style={{ flex: 1, background: 'var(--surface)', borderRadius: 6, padding: 16, boxShadow: 'var(--shadow-1)', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ height: 8, width: '50%', background: 'var(--ink-4)', borderRadius: 2, opacity: 0.4 }} />
          <div style={{ height: 4, width: '90%', background: 'var(--ink-4)', borderRadius: 2, opacity: 0.25 }} />
          <div style={{ height: 4, width: '85%', background: 'var(--ink-4)', borderRadius: 2, opacity: 0.25 }} />
          <div style={{ height: 4, width: '70%', background: 'var(--ink-4)', borderRadius: 2, opacity: 0.25 }} />
          <div style={{ height: 4, width: '80%', background: 'var(--ink-4)', borderRadius: 2, opacity: 0.25 }} />
        </div>
      </div>
      <div style={{ background: 'var(--surface-2)', padding: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 0.1 }}>Adapted · UDL · Scaffold</div>
        <div style={{ flex: 1, background: 'var(--surface)', borderRadius: 6, padding: 16, boxShadow: 'var(--shadow-2)', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ height: 8, width: '60%', background: 'var(--ink)', borderRadius: 2 }} />
          <div className="row" style={{ gap: 4 }}>
            <span className="chip theory" style={{ fontSize: 8, padding: '2px 6px' }}>UDL</span>
            <span className="chip theory alt" style={{ fontSize: 8, padding: '2px 6px' }}>SCAFFOLD</span>
          </div>
          <div style={{ height: 4, width: '90%', background: 'var(--accent-soft)', borderRadius: 2 }} />
          <div style={{ height: 4, width: '85%', background: 'var(--ink-4)', borderRadius: 2, opacity: 0.3 }} />
          <div style={{ height: 4, width: '70%', background: 'var(--accent-2-soft)', borderRadius: 2 }} />
          <div style={{ height: 4, width: '80%', background: 'var(--ink-4)', borderRadius: 2, opacity: 0.3 }} />
        </div>
      </div>
    </div>
  );

  if (kind === 'theories') return (
    <div style={{ position: 'absolute', inset: 0, padding: 28, display: 'flex', flexWrap: 'wrap', gap: 8, alignContent: 'center', justifyContent: 'center', background: 'var(--bg-2)' }}>
      {Object.values(THEORIES).map((t, i) => (
        <span key={t.id} className={'chip ' + t.klass} style={{ fontSize: 12, padding: '7px 14px', opacity: 0.4 + (i % 5) * 0.12 }}>{t.label}</span>
      ))}
    </div>
  );

  if (kind === 'steps') return (
    <div style={{ position: 'absolute', inset: 0, padding: 28, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, background: 'var(--bg-2)' }}>
      {[
        { n: 1, title: 'Describe', sub: 'Format + learners' },
        { n: 2, title: 'Choose',   sub: 'Template + theories' },
        { n: 3, title: 'Generate', sub: 'Word or PDF' },
      ].map(s => (
        <div key={s.n} style={{ background: 'var(--surface)', borderRadius: 10, padding: 16, border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 6, justifyContent: 'space-between' }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>STEP 0{s.n}</div>
          <div>
            <div className="serif" style={{ fontSize: 22 }}>{s.title}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{s.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );

  if (kind === 'driver') return (
    <div style={{ position: 'absolute', inset: 0, padding: 28, background: 'var(--bg-2)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
      {[
        { q: 'What grade level?',         a: 'Grade 5 · mixed-ability', match: true },
        { q: 'How big is the class?',     a: '28 learners', match: true },
        { q: 'Any specific needs?',       a: 'Dyslexia, ADHD, EAL', match: true },
        { q: 'Apply which theories?',     a: 'UDL · Cognitive Load · Strengths', match: false },
      ].map((row, i) => (
        <div key={i} className="row" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>{row.q}</span>
          <span className="mono" style={{ fontSize: 11, color: row.match ? 'var(--accent)' : 'var(--accent-2)' }}>{row.a}</span>
        </div>
      ))}
    </div>
  );

  return null;
};

const WelcomeTour = ({ onClose, onDone }) => {
  const [idx, setIdx] = useState(0);
  const last = idx === TOUR_SLIDES.length - 1;
  const slide = TOUR_SLIDES[idx];
  return (
    <div className="scrim anim-fade" role="dialog" aria-modal="true">
      <div className="tour-modal">
        <div className="tour-art">
          <TourArt kind={slide.art} />
          <button className="btn ghost sm" onClick={onClose} style={{ position: 'absolute', top: 12, right: 12 }} aria-label="Skip">Skip tour</button>
        </div>
        <div className="tour-body">
          <div className="row between" style={{ alignItems: 'flex-end' }}>
            <div style={{ maxWidth: '52ch' }}>
              <div className="eyebrow mb-1">{`Welcome · 0${idx + 1} of 0${TOUR_SLIDES.length}`}</div>
              <h2 className="serif" style={{ fontSize: 28, marginBottom: 8 }}>{slide.title}</h2>
              <p style={{ margin: 0, fontSize: 14.5 }}>{slide.body}</p>
            </div>
            <div className="tour-dots" aria-hidden>
              {TOUR_SLIDES.map((_, i) => <span key={i} className={'tour-dot ' + (i === idx ? 'active' : '')} />)}
            </div>
          </div>
          <div className="row between mt-3">
            <Button variant="ghost" onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0} leading="arrow-left">Back</Button>
            {last ? (
              <Button variant="accent" size="lg" onClick={onDone} trailing="arrow-right">Let’s begin</Button>
            ) : (
              <Button variant="primary" onClick={() => setIdx(idx + 1)} trailing="arrow-right">Next</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { WelcomeTour });
