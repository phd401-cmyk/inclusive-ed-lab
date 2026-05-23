// App — sidebar with Theory Library tab, updated color system, Tweaks

const { useState, useCallback } = React;

const STEPS = [
  {id:'intent',    label:'Describe'},
  {id:'templates', label:'Templates'},
  {id:'profile',   label:'Learners'},
  {id:'shortlist', label:'Shortlist'},
  {id:'build',     label:'Build'},
  {id:'detail',    label:'Details'},
  {id:'output',    label:'Output'},
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "density": "comfy",
  "accent": "#6B2FA0",
  "showSidebar": true,
  "showTour": false
}/*EDITMODE-END*/;

const App = () => {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    document.documentElement.dataset.theme = t.theme || 'light';
    document.documentElement.dataset.density = t.density || 'comfy';
    document.documentElement.style.setProperty('--accent', t.accent || '#6B2FA0');
  }, [t.theme, t.density, t.accent]);

  const [showTour, setShowTour] = useState(() => !localStorage.getItem('iel.toured.v2'));
  useEffect(() => { if (!showTour) localStorage.setItem('iel.toured.v2','1'); }, [showTour]);
  useEffect(() => { if (t.showTour) { setShowTour(true); setTweak('showTour', false); } }, [t.showTour]);

  const [showTheory, setShowTheory] = useState(false);

  const [state, setState] = useState({
    tlm:null, audience:null, template:null,
    persona:null, classSize:24, composition:null,
    needs:[], reading:null, context:null, contextNote:'',
    buildMode:null, formData:{}, uploaded:false,
    uploadedFilename:null, uploadedText:null,
    acceptedMappings:null, theoryOverrides:{},
    outputFormat:'docx', generatedContent:null,
  });
  const set = useCallback(patch => setState(s=>({...s,...patch})), []);

  const [stepIdx, setStepIdx] = useState(0);

  const isUnlocked = idx => {
    if (idx <= stepIdx) return true;
    if (idx===1) return !!state.tlm && !!state.audience;
    if (idx===2) return idx===stepIdx;
    if (idx===3) return !!state.composition && !!state.context;
    if (idx===4) return !!state.template;
    if (idx===5) return !!state.buildMode;
    if (idx===6) return state.buildMode==='upload' ? state.uploaded : !!(state.formData?.topic && state.formData?.objective);
    return false;
  };

  const restart = () => {
    setStepIdx(0);
    setState({tlm:null,audience:null,template:null,persona:null,classSize:24,composition:null,needs:[],reading:null,context:null,contextNote:'',buildMode:null,formData:{},uploaded:false,uploadedFilename:null,uploadedText:null,acceptedMappings:null,theoryOverrides:{},outputFormat:'docx',generatedContent:null});
  };

  const renderStep = () => {
    switch(STEPS[stepIdx].id) {
      case 'intent':    return <IntentScreen state={state} set={set} onNext={()=>setStepIdx(1)}/>;
      case 'templates': return <TemplateGalleryScreen state={state} set={set} onNext={()=>setStepIdx(2)} onBack={()=>setStepIdx(0)}/>;
      case 'profile':   return <ProfileScreen state={state} set={set} onNext={()=>setStepIdx(3)} onBack={()=>setStepIdx(1)}/>;
      case 'shortlist': return <ShortlistScreen state={state} set={set} onNext={()=>setStepIdx(4)} onBack={()=>setStepIdx(2)}/>;
      case 'build':     return <BuildPickerScreen state={state} set={set} onNext={()=>setStepIdx(5)} onBack={()=>setStepIdx(3)}/>;
      case 'detail':
        return state.buildMode==='upload'
          ? <UploadScreen state={state} set={set} onNext={()=>setStepIdx(6)} onBack={()=>setStepIdx(4)}/>
          : <EnterDetailsScreen state={state} set={set} onNext={()=>setStepIdx(6)} onBack={()=>setStepIdx(4)}/>;
      case 'output':    return <OutputWithGen state={state} set={set} onBack={()=>setStepIdx(5)} onRestart={restart}/>;
      default: return null;
    }
  };

  return (
    <div className="app-shell" data-screen-label="Inclusive Ed Lab">
      {t.showSidebar && (
        <Sidebar stepIdx={stepIdx} setStepIdx={setStepIdx} state={state}
          isUnlocked={isUnlocked} onReplayTour={()=>setShowTour(true)}
          onOpenTheory={()=>setShowTheory(true)}/>
      )}
      <div className="app-main">
        <TopBar stepIdx={stepIdx} state={state} setStepIdx={setStepIdx} onOpenTheory={()=>setShowTheory(true)}/>
        <div className="content">{renderStep()}</div>
      </div>

      {showTour && <WelcomeTour onClose={()=>setShowTour(false)} onDone={()=>setShowTour(false)}/>}
      {showTheory && <TheoryLibrary onClose={()=>setShowTheory(false)}/>}

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme"/>
        <TweakRadio label="Mode" value={t.theme} onChange={v=>setTweak('theme',v)} options={[{value:'light',label:'Light'},{value:'dark',label:'Dark'}]}/>
        <TweakColor label="Accent" value={t.accent} onChange={v=>setTweak('accent',v)} options={['#6B2FA0','#9b5fd0','#d97757','#4a7a8c','#2a6e48']}/>
        <TweakRadio label="Density" value={t.density} onChange={v=>setTweak('density',v)} options={[{value:'comfy',label:'Comfy'},{value:'compact',label:'Compact'}]}/>
        <TweakSection label="Navigation"/>
        <TweakToggle label="Show sidebar" value={t.showSidebar} onChange={v=>setTweak('showSidebar',v)}/>
        <TweakButton label="Replay welcome tour" onClick={()=>setShowTour(true)}/>
        <TweakButton label="Open Theory Library" onClick={()=>setShowTheory(true)}/>
        <TweakSection label="Jump to step"/>
        <TweakSelect label="Step" value={STEPS[stepIdx].id} onChange={v=>setStepIdx(STEPS.findIndex(s=>s.id===v))} options={STEPS.map(s=>({value:s.id,label:s.label}))}/>
      </TweaksPanel>
    </div>
  );
};

// ── Topbar ────────────────────────────────────────────────────────────────────
const TopBar = ({ stepIdx, state, setStepIdx, onOpenTheory }) => {
  const tlm = TLM_TYPES.find(t=>t.id===state.tlm);
  const tpl = state.template && (TEMPLATES[state.tlm]||[]).find(t=>t.id===state.template);
  const audience = AUDIENCES.find(a=>a.id===state.audience);
  return (
    <div className="topbar">
      <StepPills steps={STEPS.slice(0,5).map(s=>({id:s.id,label:s.label}))} current={Math.min(stepIdx,4)}/>
      <div style={{flex:1}}/>
      <div className="row" style={{gap:12,color:'var(--ink-3)',fontSize:12.5}}>
        {tlm && <span style={{fontWeight:600,color:'var(--ink-2)'}}>{tlm.label}</span>}
        {tpl && <><span>·</span><span>{tpl.name}</span></>}
        {audience && <><span>·</span><span>{audience.label}</span></>}
      </div>
      <button className="btn outline-accent sm" onClick={onOpenTheory} style={{gap:6}}>
        <Icon name="theory" size={13}/>
        Theory Library
      </button>
      <button className="btn ghost sm" title="Help"><Icon name="help" size={14}/></button>
    </div>
  );
};

// ── Sidebar ───────────────────────────────────────────────────────────────────
const Sidebar = ({ stepIdx, setStepIdx, state, isUnlocked, onReplayTour, onOpenTheory }) => {
  const activeTheories = state.tlm ? suggestedTheories(state) : [];

  return (
    <aside className="sidebar" data-screen-label="Sidebar">
      {/* Brand */}
      <div className="brand">
        <div className="brand-mark">i</div>
        <div className="brand-name">
          Inclusive Ed Lab
          <small>TLM Adapter</small>
        </div>
      </div>

      {/* Progress */}
      <div>
        <div className="sidebar-section-label mb-1">Your progress</div>
        <div className="progress-list">
          {STEPS.map((s,i) => {
            const cls = i===stepIdx?'active':i<stepIdx?'done':isUnlocked(i)?'':'locked';
            return (
              <div key={s.id} className={'progress-step '+cls}
                onClick={()=>isUnlocked(i)&&setStepIdx(i)}>
                <div className="step-bullet">{i<stepIdx?'✓':i+1}</div>
                <div>{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Theory Library button */}
      <div style={{borderTop:'1px solid var(--border)',paddingTop:14}}>
        <div className="sidebar-section-label mb-2">Resources</div>
        <button className="btn outline-accent" style={{width:'100%',justifyContent:'center',gap:8}} onClick={onOpenTheory}>
          <Icon name="theory" size={15}/>
          Theory Library
        </button>
        <p style={{fontSize:11.5,color:'var(--ink-3)',margin:'8px 4px 0',lineHeight:1.5}}>
          Visual guides to UDL, Bloom's, Vygotsky, Kolb, HCD and 8 more frameworks — with annotated TLM examples.
        </p>
      </div>

      {/* Theories in play */}
      {activeTheories.length > 0 && (
        <div className="surface-quiet" style={{padding:12}}>
          <div className="row" style={{gap:8,marginBottom:6}}>
            <Icon name="sparkles" size={14}/>
            <strong style={{fontSize:12}}>Theories in play</strong>
          </div>
          <div className="row" style={{gap:4,flexWrap:'wrap'}}>
            {activeTheories.slice(0,6).map(id=><TheoryChip key={id} id={id}/>)}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="sidebar-foot">
        <div className="row between mb-1">
          <span>Need a refresher?</span>
          <button className="btn ghost sm" onClick={onReplayTour} style={{padding:'3px 8px'}}>Tour</button>
        </div>
        <a href="templates.html" target="_blank" style={{color:'var(--accent)',fontSize:12,textDecoration:'none',display:'block',marginBottom:6}}>
          → Browse all 66 templates
        </a>
        <div style={{fontSize:10.5,lineHeight:1.6}}>
          Built on UDL · Bloom's · Vygotsky · Sweller · Kolb · Knowles · Connectivism · HCD · Strengths · Self-Determination · CRP · Indigenous.
        </div>
      </div>
    </aside>
  );
};

// ── useEffect shim for Tweaks ─────────────────────────────────────────────────
const { useEffect } = React;

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
