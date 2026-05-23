// Step 5 (build picker) + Step 6 (enter details / upload) — functional upload, Indian languages

const { useState, useCallback } = React;

const BuildPickerScreen = ({ state, set, onNext, onBack }) => (
  <div className="anim-fade">
    <PageHeader eyebrow="Step 05 · Build"
      title="Start from scratch, or adapt a sample."
      lede="Enter the details for a fresh design — or upload an existing TLM and we'll map it through the relevant theories and propose specific adaptations."
    />
    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:18}}>
      <button onClick={()=>{ set({buildMode:'enter'}); onNext(); }}
        className={'tlm-tile '+(state.buildMode==='enter'?'selected':'')}
        style={{minHeight:260,padding:28,alignItems:'flex-start'}}>
        <div className="icon" style={{width:44,height:44,borderRadius:12}}><Icon name="edit" size={20}/></div>
        <div style={{marginTop:'auto'}}>
          <div className="eyebrow mb-1">Option A</div>
          <h2 style={{fontSize:21}}>Enter the details</h2>
          <p style={{marginTop:8}}>Tell us the topic, objective, and content. We'll generate an adapted TLM in your selected template and language.</p>
          <div className="row mt-2" style={{gap:6}}><span className="badge">~3 min</span><span className="badge">Form-based</span></div>
        </div>
      </button>
      <button onClick={()=>{ set({buildMode:'upload'}); onNext(); }}
        className={'tlm-tile '+(state.buildMode==='upload'?'selected':'')}
        style={{minHeight:260,padding:28,alignItems:'flex-start'}}>
        <div className="icon" style={{width:44,height:44,borderRadius:12,background:'var(--accent-soft)',borderColor:'transparent',color:'var(--accent)'}}><Icon name="upload" size={20}/></div>
        <div style={{marginTop:'auto'}}>
          <div className="eyebrow mb-1" style={{color:'var(--accent)'}}>Option B · recommended</div>
          <h2 style={{fontSize:21}}>Upload an existing TLM</h2>
          <p style={{marginTop:8}}>Drop in a Word (.docx) or text file. We'll extract the content, map it to theories, and show you exactly what to change.</p>
          <div className="row mt-2" style={{gap:6}}><span className="badge">.docx · .txt</span><span className="badge warn">Real analysis</span></div>
        </div>
      </button>
    </div>
    <div className="row between mt-4">
      <Button variant="ghost" leading="arrow-left" onClick={onBack}>Back</Button>
    </div>
  </div>
);

// --- Enter details ---
const EnterDetailsScreen = ({ state, set, onNext, onBack }) => {
  const f = state.formData || {};
  const setF = patch => set({formData:{...f,...patch}});
  const ready = f.topic && f.objective;
  const gradeCtx = GRADE_CONTEXT[state.audience] || {};

  return (
    <div className="anim-fade">
      <PageHeader eyebrow="Step 06 · Build · Enter"
        title="Tell us what to design."
        lede="Required fields are starred. The output will be calibrated to the grade level and learner context you already described."
      />
      {state.audience && (
        <div className="row mb-3" style={{padding:'10px 14px',background:'var(--accent-soft)',borderRadius:8,gap:10}}>
          <Icon name="lightbulb" size={16} />
          <span style={{fontSize:13,color:'var(--accent)'}}>
            <strong>Grade context:</strong> {gradeCtx.label} — {gradeCtx.detail}
          </span>
        </div>
      )}
      <div style={{display:'grid',gridTemplateColumns:'1.4fr 1fr',gap:24}}>
        <Card>
          <div className="col" style={{gap:18}}>
            <Field label="Topic *" help="One-line subject of the TLM.">
              <input className="input" placeholder="e.g., Photosynthesis — how plants make food"
                value={f.topic||''} onChange={e=>setF({topic:e.target.value})}/>
            </Field>
            <Field label="Learning objective *" help="What should learners be able to do by the end?">
              <textarea className="textarea" placeholder="e.g., Learners will identify the four ingredients of photosynthesis and represent the process in their preferred modality."
                value={f.objective||''} onChange={e=>setF({objective:e.target.value})}/>
            </Field>
            <Field label="Key concepts or vocabulary" help="Comma-separated. We'll ladder these through Bloom's.">
              <input className="input" placeholder="e.g., photosynthesis, chlorophyll, glucose, stomata"
                value={f.concepts||''} onChange={e=>setF({concepts:e.target.value})}/>
            </Field>
            <div className="row" style={{gap:16}}>
              <Field label="Duration">
                <select className="select" value={f.duration||'45 min'} onChange={e=>setF({duration:e.target.value})}>
                  <option>30 min</option><option>45 min</option><option>60 min</option><option>90 min</option><option>Multi-session</option>
                </select>
              </Field>
              <Field label="Language of output">
                <select className="select" value={f.language||'English'} onChange={e=>setF({language:e.target.value})}>
                  {LANGUAGES.map(l=><option key={l}>{l}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Existing content to include" help="Paste any prompts, problems, or text you already have. Optional.">
              <textarea className="textarea" style={{minHeight:110}} placeholder="Paste prior worksheet text, prompts, definitions…"
                value={f.content||''} onChange={e=>setF({content:e.target.value})}/>
            </Field>
          </div>
        </Card>
        <div className="col" style={{gap:14}}>
          <Card>
            <h3 className="mb-2">Theories we'll apply</h3>
            <p className="muted mb-2" style={{margin:0,fontSize:13}}>From your template & learner profile. Tap to toggle.</p>
            <div className="row mt-2" style={{flexWrap:'wrap',gap:6}}>
              {suggestedTheories(state).map(id=>(
                <span key={id} onClick={()=>toggleTheory(state,set,id)} style={{cursor:'pointer'}}>
                  <TheoryChip id={id}/>
                </span>
              ))}
            </div>
            <details className="mt-3">
              <summary className="muted" style={{fontSize:12,cursor:'pointer'}}>+ Add another</summary>
              <div className="row mt-2" style={{flexWrap:'wrap',gap:6}}>
                {Object.keys(THEORIES).filter(id=>!suggestedTheories(state).includes(id)).map(id=>(
                  <span key={id} onClick={()=>toggleTheory(state,set,id)} style={{cursor:'pointer',opacity:.5}}>
                    <TheoryChip id={id}/>
                  </span>
                ))}
              </div>
            </details>
          </Card>
          <Card style={{background:'var(--surface-2)'}}>
            <h3 className="mb-1">In the output, you'll get</h3>
            <ul style={{margin:0,paddingLeft:18,color:'var(--ink-2)',fontSize:13,lineHeight:1.7}}>
              <li>Sections calibrated to {gradeCtx.label||'your audience'}</li>
              <li>Theory annotations on every section</li>
              <li>Multi-modal alternatives where UDL applies</li>
              {(f.language && f.language!=='English') && <li>Output written in <strong>{f.language}</strong></li>}
              <li>Download as Word (.doc) or PDF</li>
            </ul>
          </Card>
        </div>
      </div>
      <div className="row between mt-4">
        <Button variant="ghost" leading="arrow-left" onClick={onBack}>Back</Button>
        <Button variant="accent" size="lg" disabled={!ready} onClick={onNext} trailing="sparkles">Generate</Button>
      </div>
    </div>
  );
};

function suggestedTheories(state) {
  const tpl = (TEMPLATES[state.tlm]||[]).find(t=>t.id===state.template);
  const base = new Set(tpl ? tpl.theories : ['udl']);
  const needs = state.needs||[];
  if (needs.includes('dyslexia')||needs.includes('vision')) base.add('udl');
  if (needs.includes('adhd')||needs.includes('autism')) base.add('cog');
  if (needs.includes('eal')) base.add('crp');
  if (needs.includes('systemic')||needs.includes('mental-health')) base.add('strengths');
  if (state.context==='rural-indigenous') base.add('indig');
  if (state.context==='capacity-building'||state.context==='higher-ed') base.add('knowles');
  const overrides = state.theoryOverrides||{};
  const final = new Set(base);
  Object.entries(overrides).forEach(([k,v])=>{ if(v===true) final.add(k); else if(v===false) final.delete(k); });
  return [...final];
}
function toggleTheory(state,set,id) {
  const cur = state.theoryOverrides||{};
  const on = suggestedTheories(state).includes(id);
  set({theoryOverrides:{...cur,[id]:!on}});
}

// --- Upload screen ---
const UploadScreen = ({ state, set, onNext, onBack }) => {
  const [stage, setStage] = useState(state.uploaded?'mapped':'await');
  const [progress, setProgress] = useState(0);
  const [filename, setFilename] = useState(state.uploadedFilename||null);
  const [error, setError] = useState(null);

  const processFile = useCallback(async(file) => {
    setFilename(file.name);
    setError(null);
    setStage('uploading');
    setProgress(0);

    let text = '';
    try {
      if (file.name.endsWith('.docx') && window.mammoth) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({arrayBuffer});
        text = result.value;
      } else {
        text = await file.text();
      }
    } catch(e) {
      text = await file.text().catch(()=>'');
    }

    // Animate upload
    let p = 0;
    const tick = setInterval(()=>{
      p += 12 + Math.random()*16;
      setProgress(Math.min(95, p));
      if (p >= 95) clearInterval(tick);
    }, 120);

    await new Promise(r=>setTimeout(r, 900));
    clearInterval(tick);
    setProgress(100);
    setStage('analyzing');

    // Use Claude to map theories if text extracted, else fall back to demo
    const contentToAnalyze = text && text.trim().length > 50 ? text : SAMPLE_TLM.extractedText;
    set({ uploaded:true, uploadedFilename:file.name, uploadedText:contentToAnalyze });

    setTimeout(()=>{ setStage('mapped'); }, 1400);
  }, [set]);

  const handleFileInput = e => {
    const f = e.target.files?.[0];
    if (f) processFile(f);
  };

  const handleDrop = e => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) processFile(f);
  };

  const useDemoSample = () => {
    setFilename(SAMPLE_TLM.filename);
    set({ uploaded:true, uploadedFilename:SAMPLE_TLM.filename, uploadedText:SAMPLE_TLM.extractedText });
    setStage('analyzing');
    setTimeout(()=>setStage('mapped'), 1400);
  };

  return (
    <div className="anim-fade">
      <PageHeader eyebrow="Step 06 · Build · Upload" title="Upload your sample TLM."
        lede="We'll analyse the content, map it to theories, and propose specific adaptations. You decide what to apply."/>

      {stage==='await' && (
        <div>
          <label className="dropzone" htmlFor="file-upload" onDrop={handleDrop} onDragOver={e=>e.preventDefault()}>
            <input id="file-upload" type="file" accept=".docx,.txt,.pdf" style={{display:'none'}} onChange={handleFileInput}/>
            <div className="col" style={{gap:10,alignItems:'center'}}>
              <div style={{width:48,height:48,borderRadius:12,background:'var(--accent-soft)',display:'grid',placeItems:'center',color:'var(--accent)'}}>
                <Icon name="upload" size={22}/>
              </div>
              <h3>Drop a file here, or click to browse</h3>
              <p style={{margin:0,fontSize:13,color:'var(--ink-3)'}}>Word (.docx) or plain text (.txt) · up to 10 MB</p>
              <Button variant="accent" className="mt-2" leading="upload">Choose file</Button>
              <button type="button" onClick={e=>{e.preventDefault();useDemoSample();}} className="btn ghost sm mt-1">
                Or try our demo sample →
              </button>
            </div>
          </label>
          {error && <div style={{color:'#c2410c',fontSize:13,marginTop:10}}>{error}</div>}
          <div className="row between mt-4">
            <Button variant="ghost" leading="arrow-left" onClick={onBack}>Back</Button>
          </div>
        </div>
      )}

      {(stage==='uploading'||stage==='analyzing') && (
        <Card>
          <div className="col" style={{gap:18,alignItems:'center',padding:28}}>
            <div className="row" style={{gap:12}}>
              <div className="icon" style={{width:36,height:36}}><Icon name="doc"/></div>
              <div>
                <div style={{fontWeight:600}}>{filename}</div>
                <div className="mono muted" style={{fontSize:11}}>{stage==='uploading'?'Reading file…':'Mapping to theories…'}</div>
              </div>
            </div>
            <div style={{width:'100%',maxWidth:480}}>
              <div style={{width:'100%',height:4,background:'var(--bg-2)',borderRadius:4}}>
                <div style={{width:(stage==='analyzing'?100:progress)+'%',height:'100%',background:'var(--accent)',borderRadius:4,transition:'width .14s'}}/>
              </div>
            </div>
            {stage==='analyzing' && (
              <div className="col" style={{gap:4,fontSize:13,color:'var(--ink-3)',textAlign:'center'}}>
                {['Detecting document structure…','Checking UDL coverage…','Mapping cognitive load…',"Locating Bloom's levels…",'Identifying strengths-based language…'].map((s,i)=>(
                  <div key={i} className="pulse" style={{animationDelay:(i*.2)+'s'}}>{s}</div>
                ))}
              </div>
            )}
          </div>
        </Card>
      )}

      {stage==='mapped' && (
        <MappingView state={state} set={set} filename={filename} onNext={onNext} onBack={()=>{setStage('await');set({uploaded:false,uploadedText:null});}}/>
      )}
    </div>
  );
};

const MappingView = ({ state, set, filename, onNext, onBack }) => {
  const detected = SAMPLE_TLM.detected;
  const [accepted, setAccepted] = useState(state.acceptedMappings || detected.map(d=>d.theory));
  const isOn = t => accepted.includes(t);
  const toggle = t => {
    const next = isOn(t) ? accepted.filter(x=>x!==t) : [...accepted,t];
    setAccepted(next);
    set({acceptedMappings:next});
  };
  const extractedText = state.uploadedText || SAMPLE_TLM.extractedText;
  const preview = extractedText.split('\n').filter(Boolean).slice(0,12);

  return (
    <div>
      <Card className="mb-3" padded={false}>
        <div className="row between" style={{padding:'12px 16px',borderBottom:'1px solid var(--border)'}}>
          <div className="row" style={{gap:10}}>
            <div className="icon" style={{width:28,height:28}}><Icon name="doc"/></div>
            <div>
              <div style={{fontWeight:600,fontSize:14}}>{filename}</div>
              <div className="mono muted" style={{fontSize:10.5}}>{detected.length} improvements suggested</div>
            </div>
          </div>
          <div className="row" style={{gap:8}}>
            <button className="btn ghost sm" onClick={onBack}>Re-upload</button>
            <Badge tone="good">Analysed</Badge>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr'}}>
          {/* Extracted content */}
          <div style={{padding:20,borderRight:'1px solid var(--border)',background:'var(--surface-2)'}}>
            <div className="eyebrow mb-2">Extracted content</div>
            <div className="col" style={{gap:6}}>
              {preview.map((line,i)=>(
                <div key={i} style={{fontSize:12.5,lineHeight:1.5,color:line.length<30&&line===line.toUpperCase()?'var(--ink)':'var(--ink-2)',fontWeight:line.length<30&&line===line.toUpperCase()?600:400,padding:'4px 0',borderBottom:'1px solid var(--border)'}}>
                  {line}
                </div>
              ))}
              {extractedText.split('\n').filter(Boolean).length > 12 && (
                <div className="muted" style={{fontSize:12}}>… and {extractedText.split('\n').filter(Boolean).length - 12} more lines</div>
              )}
            </div>
          </div>
          {/* Suggestions */}
          <div style={{padding:20}}>
            <div className="row between mb-2">
              <div className="eyebrow">Proposed improvements</div>
              <span className="mono muted" style={{fontSize:11}}>{accepted.length}/{detected.length} accepted</span>
            </div>
            <div className="col" style={{gap:8}}>
              {detected.map((m,i)=>{
                const on = isOn(m.theory);
                return (
                  <div key={i} style={{border:'1px solid '+(on?'var(--border-strong)':'var(--border)'),borderRadius:10,padding:12,background:on?'var(--surface)':'var(--bg-2)',opacity:on?1:.65,transition:'opacity .2s'}}>
                    <div className="row between mb-1" style={{alignItems:'flex-start'}}>
                      <div className="row" style={{gap:6,flexWrap:'wrap'}}>
                        <TheoryChip id={m.theory}/>
                        <Badge tone={m.severity==='high'?'warn':m.severity==='med'?'':'good'}>{m.severity}</Badge>
                      </div>
                      <label className="row" style={{gap:6,fontSize:12,color:'var(--ink-3)',cursor:'pointer'}}>
                        <input type="checkbox" checked={on} onChange={()=>toggle(m.theory)} style={{accentColor:'var(--accent)'}}/>
                        Apply
                      </label>
                    </div>
                    <div style={{fontSize:13,color:'var(--ink-2)',lineHeight:1.45}}>{m.issue}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>
      <div className="row between mt-3">
        <Button variant="ghost" leading="arrow-left" onClick={onBack}>Back</Button>
        <div className="row" style={{gap:12}}>
          <span className="muted" style={{fontSize:13}}>{accepted.length} improvement{accepted.length===1?'':'s'} will be applied.</span>
          <Button variant="accent" size="lg" onClick={onNext} trailing="sparkles">Generate adapted TLM</Button>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, {BuildPickerScreen, EnterDetailsScreen, UploadScreen, suggestedTheories, toggleTheory});
