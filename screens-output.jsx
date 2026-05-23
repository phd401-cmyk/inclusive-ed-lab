// Output screens — Claude-powered generation, functional download, grade alignment, translation, footer

const { useState, useEffect, useRef } = React;

// ── Grade-aware content builder ──────────────────────────────────────────────
function getGradeProfile(audience) {
  const g = GRADE_CONTEXT[audience] || GRADE_CONTEXT['m68'];
  return g;
}

// ── Generation screen ─────────────────────────────────────────────────────────
const GenerationScreen = ({ state, set, onNext, onBack }) => {
  const [step, setStep] = useState(0);
  const [generated, setGenerated] = useState(null);
  const [error, setError] = useState(null);
  const theories = suggestedTheories(state);
  const gradeProfile = getGradeProfile(state.audience);
  const language = state.formData?.language || 'English';

  const steps = [
    'Reading your inputs…',
    `Calibrating for ${gradeProfile.label}…`,
    `Applying ${theories.length} frameworks: ${theories.slice(0,3).map(t=>THEORIES[t].short).join(', ')}${theories.length>3?'…':''}`,
    'Drafting sections with theory annotations…',
    language !== 'English' ? `Translating to ${language}…` : 'Formatting multi-modal supports…',
    'Adding margin notes and footer…',
    'Ready.',
  ];

  useEffect(() => {
    let cancelled = false;
    const runGeneration = async () => {
      try {
        // Animate steps while generating
        const animate = async () => {
          for (let i = 0; i < steps.length - 1; i++) {
            if (cancelled) return;
            setStep(i);
            await new Promise(r => setTimeout(r, i === 4 && language !== 'English' ? 1800 : 700));
          }
        };
        const animPromise = animate();

        // Build prompt
        const tplName = (TEMPLATES[state.tlm]||[]).find(t=>t.id===state.template)?.name || 'general';
        const needs = (state.needs||[]).map(n=>NEEDS.find(x=>x.id===n)?.label).filter(Boolean).join(', ');
        const uploadedContent = state.uploadedText || '';
        const formContent = state.formData?.content || '';
        const sourceContent = uploadedContent || formContent;
        const topic = state.formData?.topic || SAMPLE_TLM.title;
        const objective = state.formData?.objective || SAMPLE_TLM.objective;
        const concepts = state.formData?.concepts || '';
        const duration = state.formData?.duration || '45 min';

        const languageInstruction = language !== 'English'
          ? `IMPORTANT: Write the ENTIRE output in ${language}. Every word of the body text, section headings, bullet points, and notes must be in ${language}. Only keep theory tag codes (like [UDL], [BLOOM]) in English as labels.`
          : '';

        const prompt = `You are an expert inclusive education specialist. Create a complete, well-structured Teaching-Learning Material (TLM) of type "${tplName}" for the following context.

AUDIENCE: ${gradeProfile.label}
GRADE CONTEXT: ${gradeProfile.detail}
TOPIC: ${topic}
OBJECTIVE: ${objective}
KEY CONCEPTS: ${concepts || 'to be determined from topic'}
DURATION: ${duration}
LEARNER PROFILE: ${state.classSize||'mixed'} learners, ${state.composition||'heterogeneous'}, needs: ${needs||'general UDL'}, context: ${state.contextNote||CONTEXTS.find(c=>c.id===state.context)?.label||'classroom'}
THEORIES TO APPLY: ${theories.map(t=>THEORIES[t].label).join(', ')}
${sourceContent ? `ORIGINAL MATERIAL TO ADAPT:\n${sourceContent.slice(0,2000)}` : ''}

${languageInstruction}

RULES:
1. Vocabulary and sentence complexity MUST match ${gradeProfile.label} — do not over-simplify or over-complicate
2. Each section must have a theory tag in brackets, e.g. [UDL] or [BLOOM]
3. Use concrete, culture-relevant examples appropriate for the context
4. Include at least one multi-modal alternative (read/draw/listen/build) per activity section
5. End with an asset-based exit/reflection prompt (not "be ready to be called on")
6. Final line must be exactly: FOOTER: Inclusive Ed Lab©
7. CRITICAL: Do NOT use any markdown formatting — no asterisks (**bold**), no underscores (_italic_), no backticks. Write plain prose only. Use numbered or bulleted lists with a simple dash (- ) prefix only.

OUTPUT FORMAT (use these exact headings):
## TITLE: [title here]
## OBJECTIVE: [one-sentence objective]
## SECTION 1 — [section name] [THEORY_TAG]
[content]
## SECTION 2 — [section name] [THEORY_TAG]
[content]
(4–6 sections total)
## EXIT PROMPT [STRENGTHS]
[content]
## FOOTER: Inclusive Ed Lab©`;

        const result = await window.claude.complete({
          messages: [{ role: 'user', content: prompt }]
        });

        await animPromise;
        if (!cancelled) {
          setStep(steps.length - 1);
          const parsed = parseGeneratedContent(result, theories, state, language);
          setGenerated(parsed);
          set({ generatedContent: parsed });
          setTimeout(() => { if (!cancelled) onNext(); }, 600);
        }
      } catch (e) {
        if (!cancelled) {
          setError('Generation failed. Using structured template instead.');
          const fallback = buildFallback(state, theories);
          setGenerated(fallback);
          set({ generatedContent: fallback });
          setStep(steps.length - 1);
          setTimeout(() => onNext(), 1200);
        }
      }
    };
    runGeneration();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="anim-fade" style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'60vh'}}>
      <div style={{maxWidth:540,width:'100%',textAlign:'center'}}>
        <div style={{position:'relative',width:72,height:72,margin:'0 auto 24px'}}>
          <div style={{position:'absolute',inset:0,border:'2px solid var(--border)',borderTopColor:'var(--accent)',borderRadius:'50%'}} className="spin"/>
          <div style={{position:'absolute',inset:0,display:'grid',placeItems:'center',color:'var(--accent)'}}>
            <Icon name="sparkles" size={26}/>
          </div>
        </div>
        <h2 className="serif" style={{fontSize:28,marginBottom:14}}>Composing your adapted TLM…</h2>
        {error && <div style={{color:'#c2410c',fontSize:13,marginBottom:12}}>{error}</div>}
        <div className="col" style={{gap:8,marginTop:18}}>
          {steps.map((s,i)=>(
            <div key={i} className="row" style={{gap:10,fontSize:13.5,color:i<=step?'var(--ink)':'var(--ink-4)'}}>
              <div style={{width:16,display:'grid',placeItems:'center'}}>
                {i<step?<Icon name="check" size={13}/>:i===step?<span className="pulse">•</span>:<span style={{color:'var(--ink-4)'}}>·</span>}
              </div>
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Markdown cleaner ─────────────────────────────────────────────────────────
function stripMd(text) {
  return (text||'')
    .replace(/\*\*(.+?)\*\*/g, '$1')   // **bold** → plain
    .replace(/\*(.+?)\*/g, '$1')        // *italic* → plain
    .replace(/__(.+?)__/g, '$1')        // __bold__ → plain
    .replace(/_(.+?)_/g, '$1')          // _italic_ → plain
    .replace(/`(.+?)`/g, '$1')          // `code` → plain
    .replace(/#{1,6}\s+/g, '')          // ## Heading → plain
    .trim();
}

// Convert markdown inline bold/italic to HTML spans (for Word export)
function mdToHtml(text) {
  return (text||'')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/__(.+?)__/g, '<strong>$1</strong>')
    .replace(/_(.+?)_/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/#{1,6}\s+/g, '');
}

// ── Parse Claude output ───────────────────────────────────────────────────────
function parseGeneratedContent(raw, theories, state, language) {
  const lines = raw.split('\n').map(l=>l.trim()).filter(Boolean);
  let title = state.formData?.topic || SAMPLE_TLM.title;
  let objective = state.formData?.objective || SAMPLE_TLM.objective;
  const sections = [];
  let current = null;

  lines.forEach(line => {
    if (line.startsWith('## TITLE:')) {
      title = stripMd(line.replace('## TITLE:','').trim());
    } else if (line.startsWith('## OBJECTIVE:')) {
      objective = stripMd(line.replace('## OBJECTIVE:','').trim());
    } else if (line.startsWith('## SECTION')||line.startsWith('## EXIT')) {
      if (current) sections.push(current);
      // Extract theory from [TAG]
      const tagMatch = line.match(/\[([A-Z_]+)\]/);
      const theory = tagMatch ? (Object.keys(THEORIES).find(k=>THEORIES[k].short.toUpperCase()===tagMatch[1])||theories[0]||'udl') : (theories[0]||'udl');
      const sectionName = line.replace(/##\s*(SECTION \d+ —?|EXIT PROMPT)/,'').replace(/\[[A-Z_]+\]/,'').replace(/[—-]/,'').trim();
      current = {title: stripMd(sectionName||line.replace('##','').trim()), theory, body:[]};
    } else if (line.startsWith('## FOOTER')) {
      if (current) sections.push(current);
      current = null;
    } else if (current) {
      if (line.startsWith('- ')||line.startsWith('• ')) {
        const item = stripMd(line.replace(/^[-•]\s*/,''));
        const lastBlk = current.body[current.body.length-1];
        if (lastBlk&&lastBlk.kind==='list') lastBlk.items.push(item);
        else current.body.push({kind:'list',items:[item]});
      } else if (line.length > 0) {
        current.body.push({kind:'p',text:stripMd(line)});
      }
    }
  });
  if (current) sections.push(current);

  // Ensure at least 3 sections
  if (sections.length < 2) return buildFallback(state, theories);

  const gradeCtx = getGradeProfile(state.audience);
  const audience = AUDIENCES.find(a=>a.id===state.audience)?.label || '';
  return {
    title,
    objective,
    subtitle: `${(TEMPLATES[state.tlm]||[]).find(t=>t.id===state.template)?.name||''} · ${audience} · ${language!=='English'?language:''}`.replace(/·\s*$/,'').trim(),
    gradeLabel: gradeCtx.label,
    language,
    theories,
    sections: sections.slice(0,6),
  };
}

// ── Fallback content ──────────────────────────────────────────────────────────
function buildFallback(state, theories) {
  const topic = state.formData?.topic || SAMPLE_TLM.title;
  const objective = state.formData?.objective || SAMPLE_TLM.objective;
  const g = getGradeProfile(state.audience);
  const audience = AUDIENCES.find(a=>a.id===state.audience)?.label||'';
  const lang = state.formData?.language||'English';

  return {
    title: topic,
    objective,
    subtitle: `${audience} · ${g.label}`,
    gradeLabel: g.label,
    language: lang,
    theories,
    sections: [
      { title:'1 · Hook & connect', theory:'crp', body:[
        {kind:'p', text:`Open with a 90-second community story or familiar scenario related to ${topic}. Invite learners to share what they already know — in any language.`},
        {kind:'note', text:'Culturally relevant opener. Multilingual sharing welcomed.'},
      ]},
      { title:'2 · Pre-teach key concepts', theory:'vyg', body:[
        {kind:'p', text:`Introduce core vocabulary with a picture card, a gesture, and the written term. Pause for choral and partner repetition.`},
        {kind:'note', text:'I Do → We Do → You Do. Multi-sensory anchoring.'},
      ]},
      { title:'3 · Explore — your choice of path', theory:'udl', body:[
        {kind:'p', text:'Choose one path to engage with the concept:'},
        {kind:'list', items:['Path A: Read the short text and annotate it','Path B: Listen to the 3-minute audio explanation','Path C: Build or draw the concept using the materials provided']},
        {kind:'note', text:'Same objective. Three modalities. Learner-chosen.'},
      ]},
      { title:'4 · Make meaning', theory:'bloom', body:[
        {kind:'p', text:`Work through the thinking ladder for ${topic}:`},
        {kind:'list', items:['Name the key parts (Remember)','Explain in your own words to a partner (Understand)','Apply: What happens if one part is missing? (Apply)','Create: Design a way to explain this to someone younger (Create)']},
        {kind:'note', text:"Bloom's ladder embedded as the activity sequence."},
      ]},
      { title:'5 · Check & celebrate growth', theory:'strengths', body:[
        {kind:'p', text:'Exit prompt — pick one:'},
        {kind:'list', items:['One thing I now understand that I didn\'t before.','One question I\'m still curious about.','One way I would explain this to someone else.']},
        {kind:'note', text:'Asset-based prompts. No performance anxiety.'},
      ]},
    ],
  };
}

// ── Output preview screen ─────────────────────────────────────────────────────
const OutputScreen = ({ state, set, onBack, onRestart }) => {
  const adapted = state.generatedContent || buildFallback(state, suggestedTheories(state));
  const [annot, setAnnot] = useState(true);
  const [showDl, setShowDl] = useState(false);
  const [format, setFormat] = useState(state.outputFormat||'docx');

  return (
    <div className="anim-fade">
      <PageHeader eyebrow="Step 07 · Generated" title="Your adapted TLM is ready."
        lede={`Built for ${adapted.gradeLabel||'your audience'}, mapped through ${adapted.theories?.length||0} frameworks. Toggle annotations to see what each theory changed.`}
        right={
          <div className="col" style={{alignItems:'flex-end',gap:8}}>
            <SegmentToggle value={format} onChange={v=>{setFormat(v);set({outputFormat:v})}} options={[{value:'docx',label:'Word (.doc)'},{value:'pdf',label:'PDF'}]}/>
            <label className="row" style={{gap:6,fontSize:12.5,color:'var(--ink-3)',cursor:'pointer'}}>
              <input type="checkbox" checked={annot} onChange={e=>setAnnot(e.target.checked)} style={{accentColor:'var(--accent)'}}/>
              Show theory annotations
            </label>
          </div>
        }
      />

      <div style={{display:'grid',gridTemplateColumns:'1fr 300px',gap:18,alignItems:'flex-start'}}>
        {/* Document */}
        <div className="doc-canvas">
          <DocumentPreview adapted={adapted} annot={annot} format={format}/>
        </div>

        {/* Sidebar */}
        <div className="col" style={{gap:14,position:'sticky',top:80}}>
          <Card>
            <div className="eyebrow mb-1">Theories applied</div>
            <div className="row" style={{gap:6,flexWrap:'wrap'}}>
              {(adapted.theories||[]).map(id=><TheoryChip key={id} id={id}/>)}
            </div>
            <div className="divider"/>
            <div className="col" style={{gap:10}}>
              <StatRow label="Audience" value={adapted.gradeLabel||'—'}/>
              <StatRow label="Language" value={adapted.language||'English'}/>
              <StatRow label="Sections" value={adapted.sections?.length||0}/>
              <StatRow label="Annotations" value={annot?'Visible':'Hidden'}/>
            </div>
          </Card>

          <Card style={{background:'var(--accent-soft)',borderColor:'var(--accent)',borderWidth:1}}>
            <h3 className="mb-1" style={{color:'var(--accent)'}}>Download</h3>
            <p style={{margin:0,fontSize:13,color:'var(--ink-2)'}}>
              {format==='docx'?'Editable Word document':'Print-ready PDF'} · includes all theory notes
            </p>
            {adapted.language&&adapted.language!=='English' && (
              <div className="row mt-1" style={{gap:6}}>
                <Badge tone="accent">In {adapted.language}</Badge>
              </div>
            )}
            <Button className="mt-2" variant="accent" leading="download" onClick={()=>setShowDl(true)} style={{width:'100%',justifyContent:'center'}}>
              Download {format==='docx'?'.doc':'.pdf'}
            </Button>
            <button className="btn ghost sm mt-1" style={{width:'100%',justifyContent:'center'}}
              onClick={()=>setFormat(format==='docx'?'pdf':'docx')}>
              Switch to {format==='docx'?'PDF':'Word'} instead
            </button>
          </Card>

          <Card>
            <h3 className="mb-1">Not quite right?</h3>
            <div className="col" style={{gap:8}}>
              <Button variant="ghost" leading="arrow-left" onClick={onBack}>Re-tune theories</Button>
              <Button variant="ghost" leading="sparkles" onClick={onRestart}>Start a new TLM</Button>
            </div>
          </Card>
        </div>
      </div>

      {showDl && <DownloadModal format={format} setFormat={v=>{setFormat(v);set({outputFormat:v})}} onClose={()=>setShowDl(false)} adapted={adapted} state={state}/>}
    </div>
  );
};

const StatRow = ({label,value,tone}) => (
  <div className="row between" style={{fontSize:13}}>
    <span className="muted">{label}</span>
    <span style={{fontWeight:600,color:tone==='good'?'var(--good)':'var(--ink)'}}>{value}</span>
  </div>
);

// ── Document preview ──────────────────────────────────────────────────────────
const DocumentPreview = ({ adapted, annot, format }) => {
  const isPdf = format==='pdf';
  const bodyFont = isPdf ? "'Glacial Indifference','Nunito',Arial,sans-serif" : "'Work Sans',system-ui,sans-serif";
  return (
    <div className="doc-page" style={{fontFamily:bodyFont}}>
      {/* Header line */}
      <div className="mono" style={{fontSize:9,letterSpacing:.12,color:'#9988aa',textTransform:'uppercase',marginBottom:14,borderBottom:'1px solid #e8e0f0',paddingBottom:8,display:'flex',justifyContent:'space-between'}}>
        <span>Inclusive Ed Lab©</span>
        <span>{adapted.gradeLabel} · {adapted.language||'English'}</span>
      </div>

      {/* Title */}
      <h1 style={{fontFamily:"'Instrument Serif',Georgia,serif",fontSize:30,lineHeight:1.1,color:'#0d0d0d',marginBottom:6,fontWeight:400}}>{adapted.title}</h1>
      {adapted.subtitle && <div style={{fontSize:12,color:'#8878a8',marginBottom:16}}>{adapted.subtitle}</div>}

      {/* Objective */}
      <div style={{fontSize:13,padding:'10px 14px',background:'#f0e8f8',borderLeft:'3px solid #6B2FA0',marginBottom:20,borderRadius:'0 6px 6px 0'}}>
        <strong style={{color:'#55247e'}}>Objective.</strong>{' '}{adapted.objective}
      </div>

      {/* Theory tags */}
      {annot && (
        <div className="row" style={{gap:6,marginBottom:18,flexWrap:'wrap'}}>
          {(adapted.theories||[]).map(id=><TheoryChip key={id} id={id}/>)}
        </div>
      )}

      {/* Sections */}
      {(adapted.sections||[]).map((sec,idx)=>(
        <div key={idx} style={{marginBottom:22}}>
          <div className="row" style={{alignItems:'baseline',gap:8,marginBottom:6}}>
            <h3 style={{fontSize:15,fontWeight:700,color:'#0d0d0d'}}>{sec.title}</h3>
            {annot && <TheoryChip id={sec.theory}/>}
          </div>
          {sec.body?.map((blk,i)=>{
            if (blk.kind==='p') return <p key={i} style={{margin:'5px 0',fontSize:13,lineHeight:1.65,color:'#1a1a1a'}}>{blk.text}</p>;
            if (blk.kind==='list') return (
              <ul key={i} style={{margin:'6px 0 6px 18px',padding:0,fontSize:13,lineHeight:1.65}}>
                {blk.items?.map((it,j)=><li key={j} style={{marginBottom:4}}>{it}</li>)}
              </ul>
            );
            if (blk.kind==='note'&&annot) return (
              <div key={i} className="mono" style={{fontSize:10,color:'#55247e',background:'#f0e8f8',padding:'5px 10px',borderRadius:4,marginTop:6,display:'inline-block'}}>
                {THEORIES[sec.theory]?.short}: {blk.text}
              </div>
            );
            return null;
          })}
        </div>
      ))}

      {/* Footer */}
      <div style={{marginTop:32,paddingTop:12,borderTop:'1px solid #e8e0f0',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontSize:11,color:'#9988aa',fontFamily:"'JetBrains Mono',monospace"}}>Inclusive Ed Lab©</span>
        <span style={{fontSize:11,color:'#c8c0d8'}}>Generated · {new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</span>
      </div>
    </div>
  );
};

// ── Download modal ─────────────────────────────────────────────────────────────
const DownloadModal = ({ format, setFormat, onClose, adapted, state }) => {
  const [stage, setStage] = useState('confirm');

  const doDownload = () => {
    setStage('downloading');
    try {
      if (format === 'pdf') downloadPDF(adapted);
      else downloadWord(adapted);
      setTimeout(() => setStage('done'), 800);
    } catch(e) {
      setStage('done');
    }
  };

  return (
    <div className="scrim anim-fade" onClick={onClose}>
      <div className="tour-modal" style={{width:'min(520px,92vw)'}} onClick={e=>e.stopPropagation()}>
        <div className="tour-body" style={{padding:'28px 28px 24px'}}>
          {stage==='confirm' && <>
            <div className="eyebrow mb-1">Final step</div>
            <h2 className="serif" style={{fontSize:24,marginBottom:8}}>Which format?</h2>
            <p style={{margin:'0 0 20px',fontSize:13.5}}>Both formats include theory annotations and the Inclusive Ed Lab© footer.</p>
            <div className="row" style={{gap:12}}>
              <button onClick={()=>setFormat('docx')} className={'tlm-tile '+(format==='docx'?'selected':'')} style={{flex:1,minHeight:110}}>
                <div className="icon"><Icon name="doc"/></div>
                <div><h4>Word (.doc)</h4><p>Editable — open in Word or Google Docs</p></div>
              </button>
              <button onClick={()=>setFormat('pdf')} className={'tlm-tile '+(format==='pdf'?'selected':'')} style={{flex:1,minHeight:110}}>
                <div className="icon"><Icon name="pdf"/></div>
                <div><h4>PDF</h4><p>Print-ready — Glacial Indifference font</p></div>
              </button>
            </div>
            <div className="row between mt-4">
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
              <Button variant="accent" leading="download" onClick={doDownload}>Download {format==='docx'?'.doc':'.pdf'}</Button>
            </div>
          </>}
          {stage==='downloading' && (
            <div style={{textAlign:'center',padding:36}}>
              <div style={{width:48,height:48,margin:'0 auto 18px',border:'2px solid var(--border)',borderTopColor:'var(--accent)',borderRadius:'50%'}} className="spin"/>
              <h2 className="serif" style={{fontSize:22}}>Preparing your file…</h2>
            </div>
          )}
          {stage==='done' && (
            <div style={{textAlign:'center',padding:28}}>
              <div style={{width:56,height:56,margin:'0 auto 14px',background:'var(--good-soft)',borderRadius:'50%',display:'grid',placeItems:'center',color:'var(--good)'}}>
                <Icon name="check" size={24} stroke={2.5}/>
              </div>
              <h2 className="serif" style={{fontSize:22}}>Download started!</h2>
              <p style={{margin:'8px 0 20px',fontSize:13.5}}>Check your downloads folder for <strong>{slugify(adapted.title)}.{format==='docx'?'doc':'pdf'}</strong></p>
              <div className="row" style={{justifyContent:'center',gap:10}}>
                <Button variant="ghost" onClick={onClose}>Keep editing</Button>
                <Button variant="primary" leading="download" onClick={()=>doDownload()}>Download again</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ── PDF download (jsPDF) ───────────────────────────────────────────────────────
function downloadPDF(adapted) {
  if (!window.jspdf) throw new Error('jsPDF not loaded');
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation:'portrait', unit:'mm', format:'a4' });
  const pageW = 210, lm = 20, rm = 20, usable = pageW - lm - rm;
  let y = 20;

  const addPage = () => { doc.addPage(); y = 20; };
  const checkPage = (needed=10) => { if (y > 272-needed) addPage(); };

  // Fonts (helvetica — closest to Glacial Indifference in jsPDF built-ins)
  // Header
  doc.setFont('helvetica','normal');
  doc.setFontSize(8);
  doc.setTextColor(153,136,170);
  doc.text('Inclusive Ed Lab©', lm, y);
  doc.text(`${adapted.gradeLabel||''} · ${adapted.language||'English'}`, pageW-rm, y, {align:'right'});
  doc.setDrawColor(232,224,240);
  doc.line(lm, y+2, pageW-rm, y+2);
  y += 10;

  // Title
  doc.setFont('helvetica','bold');
  doc.setFontSize(22);
  doc.setTextColor(13,13,13);
  const titleLines = doc.splitTextToSize(adapted.title, usable);
  doc.text(titleLines, lm, y);
  y += titleLines.length*8 + 4;

  // Subtitle
  if (adapted.subtitle) {
    doc.setFont('helvetica','normal');
    doc.setFontSize(9);
    doc.setTextColor(135,110,160);
    doc.text(adapted.subtitle, lm, y);
    y += 7;
  }

  // Objective box
  checkPage(20);
  doc.setFillColor(240,232,248);
  doc.setDrawColor(107,47,160);
  const objLines = doc.splitTextToSize(`Objective: ${adapted.objective}`, usable-14);
  doc.roundedRect(lm, y, usable, objLines.length*5+8, 2, 2, 'FD');
  doc.setFont('helvetica','normal');
  doc.setFontSize(10);
  doc.setTextColor(85,36,126);
  doc.text(objLines, lm+7, y+7);
  y += objLines.length*5+14;

  // Sections
  (adapted.sections||[]).forEach(sec => {
    checkPage(30);
    doc.setFont('helvetica','bold');
    doc.setFontSize(12);
    doc.setTextColor(13,13,13);
    const sTitle = `${sec.title}  [${THEORIES[sec.theory]?.short||''}]`;
    doc.text(sTitle, lm, y);
    doc.setDrawColor(107,47,160);
    doc.setLineWidth(0.4);
    doc.line(lm, y+2, lm+doc.getTextWidth(sTitle), y+2);
    y += 8;

    sec.body?.forEach(blk => {
      if (blk.kind==='p') {
        checkPage(12);
        doc.setFont('helvetica','normal');
        doc.setFontSize(10);
        doc.setTextColor(26,26,26);
        const lines = doc.splitTextToSize(stripMd(blk.text), usable);
        doc.text(lines, lm, y);
        y += lines.length*5+3;
      } else if (blk.kind==='list') {
        blk.items?.forEach(item => {
          checkPage(8);
          doc.setFont('helvetica','normal');
          doc.setFontSize(10);
          doc.setTextColor(26,26,26);
          doc.text('•', lm, y);
          const lines = doc.splitTextToSize(stripMd(item), usable-8);
          doc.text(lines, lm+6, y);
          y += lines.length*5+2;
        });
      } else if (blk.kind==='note') {
        checkPage(8);
        doc.setFont('helvetica','italic');
        doc.setFontSize(8.5);
        doc.setTextColor(107,47,160);
        doc.setFillColor(240,232,248);
        const nLines = doc.splitTextToSize(`${THEORIES[sec.theory]?.short||''}: ${stripMd(blk.text)}`, usable-8);
        doc.roundedRect(lm, y-2, usable, nLines.length*4+6, 1.5, 1.5, 'F');
        doc.text(nLines, lm+4, y+3);
        y += nLines.length*4+8;
      }
    });
    y += 4;
  });

  // Footer
  checkPage(14);
  doc.setDrawColor(232,224,240);
  doc.line(lm, y+2, pageW-rm, y+2);
  y += 6;
  doc.setFont('helvetica','normal');
  doc.setFontSize(8);
  doc.setTextColor(153,136,170);
  doc.text('Inclusive Ed Lab©', lm, y);
  doc.text(new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}), pageW-rm, y, {align:'right'});

  doc.save(`${slugify(adapted.title)}.pdf`);
}

// ── Word download (HTML-to-.doc) ──────────────────────────────────────────────
function downloadWord(adapted) {
  const theoriesHtml = (adapted.theories||[]).map(id=>`<span style="background:#f0e8f8;color:#55247e;font-family:monospace;font-size:9pt;padding:2px 6px;border-radius:10px;margin-right:4px;text-transform:uppercase;letter-spacing:.05em">${THEORIES[id]?.short||id}</span>`).join('');

  const sectionsHtml = (adapted.sections||[]).map(sec => {
    const bodyHtml = (sec.body||[]).map(blk => {
      if (blk.kind==='p') return `<p style="margin:6px 0;font-size:11pt;line-height:1.65;color:#1a1a1a">${mdToHtml(blk.text)}</p>`;
      if (blk.kind==='list') return `<ul style="margin:6px 0 6px 20px;font-size:11pt;line-height:1.65">${(blk.items||[]).map(i=>`<li style="margin-bottom:4px">${mdToHtml(i)}</li>`).join('')}</ul>`;
      if (blk.kind==='note') return `<div style="font-size:9pt;color:#55247e;background:#f0e8f8;padding:5px 10px;border-radius:4px;margin:6px 0;font-style:italic">${THEORIES[sec.theory]?.short||''}: ${blk.text}</div>`;
      return '';
    }).join('');
    return `
      <h2 style="font-size:13pt;font-weight:700;color:#0d0d0d;margin-top:20px;margin-bottom:6px;border-bottom:1px solid #e8e0f0;padding-bottom:4px">
        ${sec.title} <span style="font-size:9pt;color:#6B2FA0;font-family:monospace">[${THEORIES[sec.theory]?.short||''}]</span>
      </h2>
      ${bodyHtml}`;
  }).join('');

  const html = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="utf-8">
<style>
  @import url('https://fonts.cdnfonts.com/css/glacial-indifference-2');
  body { font-family: 'Glacial Indifference', 'Nunito', Arial, sans-serif; margin: 2.5cm 2.5cm 2cm; color: #1a1a1a; font-size: 11pt; }
  h1 { font-family: 'Georgia', serif; color: #0d0d0d; font-size: 22pt; font-weight: 400; margin-bottom: 6pt; }
  h2 { color: #0d0d0d; }
  .header-bar { font-size: 8pt; color: #9988aa; border-bottom: 1pt solid #e8e0f0; padding-bottom: 6pt; margin-bottom: 14pt; display: flex; justify-content: space-between; }
  .objective-box { background: #f0e8f8; border-left: 3pt solid #6B2FA0; padding: 10pt 14pt; margin-bottom: 16pt; border-radius: 0 4pt 4pt 0; }
  .footer { color: #9988aa; font-size: 8pt; border-top: 1pt solid #e8e0f0; margin-top: 28pt; padding-top: 8pt; display: flex; justify-content: space-between; }
</style>
</head>
<body>
<div class="header-bar">
  <span>Inclusive Ed Lab©</span>
  <span>${adapted.gradeLabel||''} · ${adapted.language||'English'}</span>
</div>
<h1>${adapted.title}</h1>
${adapted.subtitle?`<p style="font-size:10pt;color:#8878a8;margin-bottom:14pt">${adapted.subtitle}</p>`:''}
<div class="objective-box">
  <strong style="color:#55247e">Objective.</strong> ${adapted.objective}
</div>
<div style="margin-bottom:16pt">${theoriesHtml}</div>
${sectionsHtml}
<div class="footer">
  <span>Inclusive Ed Lab©</span>
  <span>Generated ${new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</span>
</div>
</body></html>`;

  const blob = new Blob([html], {type:'application/msword'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${slugify(adapted.title)}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(()=>URL.revokeObjectURL(url), 2000);
}

function slugify(s) {
  return (s||'untitled').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,40);
}

// ── Wrapper: generation → output ──────────────────────────────────────────────
const OutputWithGen = ({ state, set, onBack, onRestart }) => {
  const [phase, setPhase] = useState('gen');
  if (phase==='gen') return <GenerationScreen state={state} set={set} onNext={()=>setPhase('done')} onBack={onBack}/>;
  return <OutputScreen state={state} set={set} onBack={onBack} onRestart={onRestart}/>;
};

Object.assign(window, { OutputWithGen, GenerationScreen, OutputScreen, downloadPDF, downloadWord });
