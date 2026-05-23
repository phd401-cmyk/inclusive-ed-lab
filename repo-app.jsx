// Template Repository gallery UI

const { useState, useMemo } = React;

const RepoTheoryChip = ({id}) => {
  const t = REPO_THEORIES[id]; if (!t) return null;
  return <span className={'chip ' + t.klass} style={{fontSize:10.5,padding:'3px 8px'}}>{t.short}</span>;
};

const TagBadge = ({tag}) => {
  if (!tag) return null;
  const tone = tag==='Popular'?'good':tag==='Inclusive pick'?'':'warn';
  return <span className={'badge '+tone} style={{fontSize:10}}>{tag}</span>;
};

// Large template card for the gallery
const RepoCard = ({tlmId, tpl, selected, onClick, onUse}) => (
  <div className={'tpl-card'+(selected?' selected':'')}
    style={{cursor:'pointer', transition:'transform .15s, box-shadow .15s'}}
    onClick={onClick}>
    {/* Thumbnail */}
    <div style={{aspectRatio:'160/220', background:'white', borderBottom:'1px solid var(--border)', overflow:'hidden', position:'relative'}}>
      <DocThumb id={tpl.id}/>
      {tpl.tag && (
        <div style={{position:'absolute', top:8, right:8}}>
          <TagBadge tag={tpl.tag}/>
        </div>
      )}
    </div>
    {/* Meta */}
    <div style={{padding:'12px 14px', display:'flex', flexDirection:'column', gap:6}}>
      <div style={{fontWeight:600, fontSize:14, color:'var(--ink)'}}>{tpl.name}</div>
      <div style={{fontSize:12, color:'var(--ink-3)', lineHeight:1.4}}>{tpl.tone}</div>
      <div style={{display:'flex', gap:4, flexWrap:'wrap', marginTop:4}}>
        {tpl.theories.map(t => <RepoTheoryChip key={t} id={t}/>)}
      </div>
    </div>
    {/* Use button — shown on hover via inline state */}
    {selected && (
      <div style={{padding:'0 14px 14px'}}>
        <button className="btn accent" style={{width:'100%', justifyContent:'center'}}
          onClick={e => { e.stopPropagation(); onUse && onUse(tpl); }}>
          Use this template
        </button>
      </div>
    )}
  </div>
);

// Sidebar TLM type button
const TLMBtn = ({tlm, active, onClick}) => (
  <button onClick={onClick} style={{
    display:'flex', alignItems:'center', gap:10, width:'100%',
    padding:'9px 12px', borderRadius:8, border:'none', textAlign:'left',
    background: active ? 'var(--bg-2)' : 'transparent',
    cursor:'pointer', transition:'background .12s',
  }}>
    <div style={{
      width:28, height:28, borderRadius:7, display:'grid', placeItems:'center',
      background: active ? tlm.color : 'var(--bg-2)',
      color: active ? '#fff' : 'var(--ink-3)',
      fontFamily:"'Instrument Serif', serif", fontSize:16,
      flexShrink:0, transition:'background .12s, color .12s',
    }}>{tlm.icon}</div>
    <div style={{flex:1, minWidth:0}}>
      <div style={{fontSize:13, fontWeight: active?600:500, color: active?'var(--ink)':'var(--ink-2)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{tlm.label}</div>
      <div style={{fontSize:11, color:'var(--ink-3)'}}>{tlm.count} templates</div>
    </div>
    {active && <div style={{width:4, height:4, borderRadius:'50%', background:tlm.color, flexShrink:0}}/>}
  </button>
);

// Search + filter bar
const FilterBar = ({search, setSearch, theoryFilter, setTheoryFilter, color}) => {
  const theories = Object.entries(REPO_THEORIES).slice(0,6);
  return (
    <div style={{display:'flex', flexDirection:'column', gap:10, marginBottom:24}}>
      <div style={{position:'relative'}}>
        <input className="input" placeholder="Search templates by name or style…"
          value={search} onChange={e=>setSearch(e.target.value)}
          style={{paddingLeft:36}}/>
        <div style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'var(--ink-3)', pointerEvents:'none'}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>
        </div>
        {search && <button className="btn ghost sm" onClick={()=>setSearch('')}
          style={{position:'absolute',right:8,top:'50%',transform:'translateY(-50%)',padding:'2px 6px',lineHeight:1}}>✕</button>}
      </div>
      <div style={{display:'flex', gap:6, flexWrap:'wrap', alignItems:'center'}}>
        <span style={{fontSize:12, color:'var(--ink-3)', marginRight:4}}>Filter:</span>
        {theories.map(([id, t]) => (
          <button key={id} onClick={()=>setTheoryFilter(theoryFilter===id?null:id)}
            className={'chip '+(theoryFilter===id?'active':'')+' '+t.klass}
            style={{fontSize:11, padding:'4px 10px'}}>
            {t.short}
          </button>
        ))}
        {theoryFilter && <button className="btn ghost sm" onClick={()=>setTheoryFilter(null)}>Clear</button>}
      </div>
    </div>
  );
};

// Main gallery component
const RepoGallery = () => {
  const [activeTlm, setActiveTlm] = useState('lesson');
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [theoryFilter, setTheoryFilter] = useState(null);
  const [toast, setToast] = useState(null);

  const tlm = REPO_TLM_TYPES.find(t=>t.id===activeTlm);
  const allTemplates = REPO_TEMPLATES[activeTlm] || [];

  const filtered = useMemo(() => {
    let list = allTemplates;
    if (search) list = list.filter(t =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.tone.toLowerCase().includes(search.toLowerCase())
    );
    if (theoryFilter) list = list.filter(t => t.theories.includes(theoryFilter));
    return list;
  }, [allTemplates, search, theoryFilter]);

  const totalCount = REPO_TLM_TYPES.reduce((s,t)=>s+t.count,0);

  const handleUse = (tpl) => {
    setToast(`"${tpl.name}" added to your workspace. Return to the main app to continue.`);
    setTimeout(()=>setToast(null), 4000);
  };

  return (
    <div style={{display:'grid', gridTemplateColumns:'260px 1fr', minHeight:'100vh', background:'var(--bg)'}}>

      {/* Sidebar */}
      <div style={{borderRight:'1px solid var(--border)', padding:'22px 14px', display:'flex', flexDirection:'column', gap:4, position:'sticky', top:0, height:'100vh', overflowY:'auto'}}>
        {/* Brand */}
        <div style={{padding:'4px 8px 16px', borderBottom:'1px solid var(--border)', marginBottom:8}}>
          <div style={{display:'flex', alignItems:'center', gap:8}}>
            <div style={{width:26,height:26,borderRadius:7,background:'var(--ink)',display:'grid',placeItems:'center',color:'var(--bg)',fontFamily:"'Instrument Serif',serif",fontSize:17,position:'relative'}}>
              i<span style={{position:'absolute',right:-3,bottom:-3,width:7,height:7,borderRadius:'50%',background:'var(--accent)'}}/>
            </div>
            <div>
              <div style={{fontWeight:600,fontSize:13,letterSpacing:'-0.01em'}}>Template Repository</div>
              <div style={{fontSize:11,color:'var(--ink-3)'}}>{totalCount} templates · 12 TLM types</div>
            </div>
          </div>
        </div>

        {/* TLM list */}
        {REPO_TLM_TYPES.map(t => (
          <TLMBtn key={t.id} tlm={t} active={activeTlm===t.id}
            onClick={()=>{ setActiveTlm(t.id); setSelected(null); setSearch(''); setTheoryFilter(null); }}/>
        ))}

        {/* Back link */}
        <div style={{marginTop:'auto', paddingTop:16, borderTop:'1px solid var(--border)'}}>
          <a href="Inclusive Ed Lab.html" className="btn ghost sm" style={{width:'100%', justifyContent:'center', textDecoration:'none'}}>
            ← Back to main app
          </a>
        </div>
      </div>

      {/* Main area */}
      <div style={{display:'flex', flexDirection:'column', minWidth:0}}>
        {/* Top bar */}
        <div style={{height:56, borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', padding:'0 32px', gap:16, background:'var(--bg)', position:'sticky', top:0, zIndex:10}}>
          <div style={{display:'flex', alignItems:'center', gap:10}}>
            <div style={{width:10, height:10, borderRadius:3, background:tlm?.color}}/>
            <span style={{fontWeight:600, fontSize:15}}>{tlm?.label}</span>
          </div>
          <span style={{color:'var(--ink-3)', fontSize:13}}>{filtered.length} of {allTemplates.length} shown</span>
        </div>

        {/* Content */}
        <div style={{padding:'32px 36px 80px', flex:1}}>
          {/* Page header */}
          <div style={{marginBottom:28}}>
            <div className="eyebrow" style={{marginBottom:8}}>{tlm?.label}</div>
            <h1 className="serif" style={{fontSize:38, marginBottom:10}}>Choose a layout</h1>
            <p className="lede">Each template is wired to one or more learning theories. Pick the layout that fits your learners — you'll tune it in the next step.</p>
          </div>

          <FilterBar search={search} setSearch={setSearch}
            theoryFilter={theoryFilter} setTheoryFilter={setTheoryFilter} color={tlm?.color}/>

          {filtered.length === 0 ? (
            <div style={{textAlign:'center', padding:'60px 0', color:'var(--ink-3)'}}>
              <div style={{fontSize:32, marginBottom:12}}>—</div>
              <div style={{fontSize:15}}>No templates match. Try a different filter.</div>
              <button className="btn ghost mt-2" onClick={()=>{ setSearch(''); setTheoryFilter(null); }}>Clear filters</button>
            </div>
          ) : (
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:18}}>
              {filtered.map(tpl => (
                <RepoCard key={tpl.id} tlmId={activeTlm} tpl={tpl}
                  selected={selected===tpl.id}
                  onClick={()=>setSelected(selected===tpl.id?null:tpl.id)}
                  onUse={handleUse}/>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position:'fixed', bottom:28, left:'50%', transform:'translateX(-50%)',
          background:'var(--ink)', color:'var(--bg)', padding:'12px 20px',
          borderRadius:10, fontSize:13.5, boxShadow:'var(--shadow-3)',
          zIndex:200, maxWidth:480, textAlign:'center', lineHeight:1.5,
          animation:'fadeIn .25s ease both',
        }}>{toast}</div>
      )}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<RepoGallery/>);
