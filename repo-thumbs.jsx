// SVG thumbnail engine — 22 layout patterns mapped to 66 templates

const WIDS = [0.95,0.70,0.85,0.60,0.90,0.75,0.65,0.80];
const lw = (i, max) => max * WIDS[i % 8];
const BG_MAP = {
  '#d97757':'#fdf0eb','#4a7a8c':'#eaf2f5','#7a5cb8':'#f3eefb',
  '#5a8d4f':'#edf6eb','#c2410c':'#fceee8','#b8862a':'#faf4e0','#3a3a3a':'#f2f2f2'
};
const bg = c => BG_MAP[c] || '#f6f6f4';

const TH = ({c,t}) => (
  <g>
    <rect x="0" y="0" width="160" height="20" fill={c}/>
    <text x="80" y="13" textAnchor="middle" fill="rgba(255,255,255,0.92)"
      fontSize="6.2" fontFamily="system-ui,sans-serif" fontWeight="600" letterSpacing="0.5">{t}</text>
  </g>
);

const LN = ({x,y,w=100,n=4,g=7,h=3,fill="#d0d0d0"}) => (
  <>{Array.from({length:n}).map((_,i)=>(
    <rect key={i} x={x} y={y+i*g} width={lw(i,w)} height={h} rx="1.5" fill={fill}/>
  ))}</>
);

const LAYOUTS = {

  'five-col': (c) => (
    <>{[8,38,68,98,128].map((x,i)=>(
      <g key={i}>
        <rect x={x} y={24} width={26} height={188} rx="3" fill={bg(c)}/>
        <rect x={x+2} y={27} width={22} height={8} rx="2" fill={c} opacity=".5"/>
        <LN x={x+3} y={40} w={20} n={6} g={7} h={2.5}/>
      </g>
    ))}</>
  ),

  'three-band': (c, p={}) => {
    const items = p.items||[{lbl:'I DO',op:.8},{lbl:'WE DO',op:.55},{lbl:'YOU DO',op:.32}];
    const hs = [54,52,50]; let y=24;
    return <>{items.map(({lbl,op},i)=>{
      const cy=y; y+=hs[i]+4;
      return <g key={i}>
        <rect x="8" y={cy} width="144" height={hs[i]} rx="4" fill={bg(c)}/>
        <rect x="8" y={cy} width="5" height={hs[i]} rx="2" fill={c} opacity={op}/>
        <text x="18" y={cy+13} fill={c} fontSize="7" fontFamily="system-ui" fontWeight="700" opacity={op}>{lbl}</text>
        <LN x="20" y={cy+20} w={120} n={i===0?4:i===1?3:2} g={9} h={3}/>
      </g>;
    })}</>;
  },

  'multi-path': (c) => (
    <>
      <rect x="8" y="24" width="144" height="12" rx="3" fill={c} opacity=".2"/>
      <LN x="14" y="28" w={128} n={1} h={4} fill={c}/>
      {[8,57,106].map((x,i)=>(
        <g key={i}>
          <rect x={x} y="42" width="44" height="130" rx="3" fill={bg(c)}/>
          <rect x={x+2} y="46" width="40" height="8" rx="2" fill={c} opacity=".5"/>
          <LN x={x+4} y={60} w={36} n={7} g={9} h={2.5}/>
        </g>
      ))}
      <rect x="8" y="180" width="144" height="12" rx="3" fill={c} opacity=".15"/>
    </>
  ),

  'timeline-h': (c) => {
    const nodes=[28,65,102,139], hts=[60,90,72,104];
    return <>
      <rect x="8" y="144" width="136" height="3" rx="1.5" fill={c} opacity=".4"/>
      <polygon points="144,141 154,145.5 144,150" fill={c} opacity=".4"/>
      {nodes.map((x,i)=>(
        <g key={i}>
          <rect x={x-16} y={208-hts[i]} width="32" height={hts[i]-68} rx="3" fill={bg(c)}/>
          <rect x={x-16} y={208-hts[i]} width="32" height="8" rx="2" fill={c} opacity=".5"/>
          <circle cx={x} cy="145.5" r="5" fill={c} opacity=".6"/>
          <LN x={x-13} y={208-hts[i]+12} w={26} n={2} g={7} h={2.5}/>
        </g>
      ))}
    </>;
  },

  'funnel': (c, p={}) => {
    const stages = p.stages||[{lbl:'① Goals',op:.6,w:144},{lbl:'② Evidence',op:.45,w:110},{lbl:'③ Activities',op:.32,w:76}];
    return <>{stages.map(({lbl,op,w},i)=>{
      const y=28+i*62, x=(160-w)/2;
      return <g key={i}>
        <rect x={x} y={y} width={w} height={52} rx="4" fill={bg(c)}/>
        <rect x={x} y={y} width={w} height={12} rx="3" fill={c} opacity={op}/>
        <text x="80" y={y+9} textAnchor="middle" fill="white" fontSize="6" fontFamily="system-ui" fontWeight="600">{lbl}</text>
        <LN x={x+6} y={y+18} w={w-12} n={3} g={8} h={3}/>
        {i<stages.length-1&&<polygon points={`74,${y+52} 86,${y+52} 80,${y+60}`} fill={c} opacity=".25"/>}
      </g>;
    })}</>;
  },

  'timed-blocks': (c, p={}) => {
    const blocks = p.blocks||[{time:'10 min',lines:2,h:50},{time:'25 min',lines:5,h:80},{time:'10 min',lines:2,h:40}];
    let y=24;
    return <>{blocks.map(({time,lines,h},i)=>{
      const cy=y; y+=h+4;
      return <g key={i}>
        <rect x="8" y={cy} width="144" height={h} rx="4" fill={bg(c)}/>
        <rect x="12" y={cy+4} width="26" height="10" rx="5" fill={c} opacity={.65-i*.1}/>
        <text x="25" y={cy+11} textAnchor="middle" fill="white" fontSize="5.5" fontFamily="system-ui" fontWeight="600">{time}</text>
        <LN x="12" y={cy+20} w={132} n={lines} g={9} h={3}/>
      </g>;
    })}</>;
  },

  'three-tier': (c, p={}) => {
    const tiers=p.tiers||[{badge:'A',op:.3},{badge:'B',op:.55},{badge:'C',op:.85}];
    return <>{tiers.map(({badge,op},i)=>(
      <g key={i}>
        <rect x="8" y={24+i*64} width="144" height="58" rx="4" fill={bg(c)}/>
        <circle cx="22" cy={24+i*64+14} r="8" fill={c} opacity={op}/>
        <text x="22" y={24+i*64+18} textAnchor="middle" fill="white" fontSize="7.5" fontFamily="system-ui" fontWeight="700">{badge}</text>
        <LN x="36" y={24+i*64+7} w={110} n={i+2} g={9} h={3}/>
      </g>
    ))}</>;
  },

  'grid-3x3': (c, p={}) => (
    <>
      <rect x="8" y="24" width="144" height="10" rx="3" fill={c} opacity=".3"/>
      {Array.from({length:9}).map((_,i)=>{
        const col=i%3, row=Math.floor(i/3), x=8+col*50, y=40+row*58;
        return <g key={i}>
          <rect x={x} y={y} width="44" height="50" rx="3" fill={bg(c)}/>
          <rect x={x+2} y={y+2} width="40" height="8" rx="2" fill={c} opacity={.3+row*.1}/>
          {p.imageGrid
            ? <rect x={x+4} y={y+14} width="36" height="28" rx="2" fill={c} opacity=".13"/>
            : <LN x={x+4} y={y+14} w={36} n={3} g={8} h={2.5}/>}
        </g>;
      })}
    </>
  ),

  'step-ladder': (c, p={}) => {
    const steps=p.steps||['Step 1','Step 2','Step 3','Step 4','Step 5','Step 6'];
    const ws=[144,128,112,96,80,64];
    return <>{steps.map((step,i)=>(
      <g key={i}>
        <rect x="8" y={26+i*28} width={ws[i]} height={22} rx="3" fill={c} opacity={.14+i*.11}/>
        <text x="18" y={26+i*28+14} fill={i>3?'rgba(255,255,255,0.9)':'#444'} fontSize="7" fontFamily="system-ui" fontWeight="600">{step}</text>
      </g>
    ))}</>;
  },

  'visual-left': (c) => (
    <>
      <rect x="8" y="24" width="64" height="76" rx="4" fill={bg(c)}/>
      <rect x="8" y="24" width="64" height="76" rx="4" fill="none" stroke={c} strokeWidth="1" strokeOpacity=".4"/>
      <rect x="20" y="46" width="40" height="30" rx="3" fill={c} opacity=".16"/>
      <circle cx="40" cy="61" r="9" fill={c} opacity=".24"/>
      <LN x="82" y="28" w={70} n={8} g={9} h={3}/>
      <LN x="8" y="110" w={144} n={5} g={9} h={3}/>
    </>
  ),

  'concept-map': (c) => (
    <>
      <LN x="8" y="24" w={130} n={1} h={6} fill={c}/>
      <ellipse cx="80" cy="112" rx="34" ry="22" fill={c} opacity=".55"/>
      <LN x="54" y="106" w={52} n={2} g={8} h={3} fill="white"/>
      {[[8,28,36,18],[116,28,36,18],[8,102,32,18],[120,102,32,18],[28,180,38,18],[94,180,38,18]].map(([x,y,w,h],i)=>(
        <g key={i}>
          <line x1="80" y1="112" x2={x+w/2} y2={y+h/2} stroke={c} strokeWidth="1.5" strokeOpacity=".3"/>
          <rect x={x} y={y} width={w} height={h} rx="9" fill={bg(c)} stroke={c} strokeWidth="1" strokeOpacity=".55"/>
          <LN x={x+5} y={y+5} w={w-10} n={1} h={4}/>
        </g>
      ))}
    </>
  ),

  'two-col-doc': (c, p={}) => (
    <>
      <LN x="8" y="24" w={130} n={1} h={7} fill={c}/>
      <LN x="8" y="36" w={80} n={1} h={3}/>
      <LN x="8" y="48" w={p.sidebarW?90:68} n={6} g={11} h={3}/>
      {p.sidebarW
        ? <><rect x="104" y="48" width="48" height="72" rx="3" fill={bg(c)}/><rect x="104" y="48" width="48" height="10" rx="2" fill={c} opacity=".4"/><LN x="106" y="62" w={44} n={4} g={9} h={3}/></>
        : <LN x="84" y="48" w={68} n={6} g={11} h={3}/>}
      {p.annotStrip&&<><rect x="8" y="148" width="144" height="14" rx="0" fill={c} opacity=".15"/><text x="12" y="158" fill={c} fontSize="5.5" fontFamily="monospace">ALT · AUDIO · NOTES</text></>}
      {p.notesArea&&<><rect x="8" y="148" width="144" height="1" fill="#ddd"/><text x="12" y="160" fill="#aaa" fontSize="6" fontFamily="system-ui">SPEAKER NOTES</text><LN x="8" y="166" w={144} n={4} g={8} h={3}/></>}
      {!p.annotStrip&&!p.notesArea&&<LN x="8" y="136" w={144} n={4} g={9} h={3}/>}
    </>
  ),

  'slide-full-img': (c) => (
    <>
      <rect x="8" y="24" width="144" height="142" rx="4" fill={bg(c)}/>
      <rect x="8" y="24" width="144" height="142" rx="4" fill="none" stroke={c} strokeWidth=".5" strokeOpacity=".4"/>
      <rect x="44" y="60" width="72" height="56" rx="4" fill={c} opacity=".12"/>
      <circle cx="80" cy="88" r="16" fill={c} opacity=".2"/>
      <path d="M44,118 L66,96 L82,108 L104,86 L124,118 Z" fill={c} opacity=".2"/>
      <rect x="8" y="172" width="144" height="32" rx="4" fill="white"/>
      <LN x="16" y="178" w={128} n={1} h={6} fill="#666"/>
      <LN x="16" y="190" w={90} n={1} h={3}/>
    </>
  ),

  'rubric-table': (c, p={}) => {
    const cols=p.cols||4, rows=p.rows||5, cw=Math.floor(144/cols), rh=26;
    return <>
      <LN x="8" y="24" w={130} n={1} h={7} fill={c}/>
      {Array.from({length:cols}).map((_,j)=>(
        <rect key={j} x={8+j*cw} y="36" width={cw} height={14} fill={c} opacity={.55-j*.06}/>
      ))}
      {Array.from({length:rows}).map((_,i)=>(
        Array.from({length:cols}).map((_,j)=>(
          <g key={`${i}-${j}`}>
            <rect x={8+j*cw} y={50+i*rh} width={cw} height={rh} fill={i%2===0?bg(c):"white"} stroke="#e8e8e8" strokeWidth=".5"/>
            <LN x={10+j*cw} y={56+i*rh} w={cw-4} n={1} h={3}/>
          </g>
        ))
      ))}
    </>;
  },

  'checklist-rows': (c) => (
    <>
      <LN x="8" y="24" w={130} n={1} h={7} fill={c}/>
      {Array.from({length:10}).map((_,i)=>(
        <g key={i}>
          <rect x="8" y={38+i*17} width="12" height="12" rx="2"
            fill={i<4?c:"transparent"} stroke={c} strokeWidth={i<4?0:1} strokeOpacity=".35"
            opacity={i<4?.6:1}/>
          {i<4&&<path d={`M11,${38+i*17+6} L13,${38+i*17+9} L18,${38+i*17+4}`} stroke="white" strokeWidth="1.5" fill="none"/>}
          <LN x="26" y={38+i*17+3} w={126} n={1} h={4}/>
        </g>
      ))}
    </>
  ),

  'tri-fold': (c) => (
    <>{[8,58,108].map((x,i)=>(
      <g key={i}>
        <rect x={x} y="24" width="46" height="188" rx="3" fill={bg(c)}/>
        <rect x={x} y="24" width="46" height="26" rx="3" fill={c} opacity={.6-i*.08}/>
        <LN x={x+4} y="30" w={38} n={1} h={7} fill="white"/>
        {i<2&&<line x1={x+46} y1="24" x2={x+46} y2="212" stroke="#ddd" strokeWidth="1" strokeDasharray="3,3"/>}
        <LN x={x+4} y={60} w={38} n={6} g={10} h={3}/>
        <rect x={x+10} y={148} width="26" height="26" rx="4" fill={c} opacity=".16"/>
      </g>
    ))}</>
  ),

  'storybook-spread': (c) => (
    <>
      <rect x="4" y="24" width="74" height="158" rx="4" fill={bg(c)}/>
      <rect x="12" y="56" width="58" height="82" rx="3" fill={c} opacity=".14"/>
      <circle cx="41" cy="92" r="18" fill={c} opacity=".24"/>
      <rect x="4" y="154" width="74" height="28" rx="0" fill="rgba(255,255,255,0.55)"/>
      <LN x="10" y="158" w={62} n={2} g={8} h={3} fill="#999"/>
      <rect x="82" y="24" width="74" height="158" rx="4" fill="white"/>
      <text x="119" y="36" textAnchor="middle" fill="#ccc" fontSize="8" fontFamily="serif">12</text>
      <LN x="86" y="44" w={66} n={8} g={13} h={4} fill="#ccc"/>
      <rect x="4" y="184" width="152" height="2" rx="1" fill="#e8e8e8"/>
    </>
  ),

  'script-cols': (c, p={}) => (
    <>
      <LN x="8" y="24" w={144} n={1} h={7} fill={c}/>
      <rect x="8" y="36" width="68" height="12" rx="2" fill={c} opacity=".5"/>
      <rect x="84" y="36" width="68" height="12" rx="2" fill={c} opacity=".35"/>
      <text x="42" y="45" textAnchor="middle" fill="white" fontSize="6" fontFamily="system-ui">{p.leftLabel||'VISUAL'}</text>
      <text x="118" y="45" textAnchor="middle" fill="white" fontSize="6" fontFamily="system-ui">{p.rightLabel||'NARRATION'}</text>
      {[0,1,2,3].map(i=>(
        <g key={i}>
          <rect x="8" y={52+i*40} width="68" height="36" fill={i%2===0?bg(c):"white"} stroke="#e5e5e5" strokeWidth=".5"/>
          <rect x="84" y={52+i*40} width="68" height="36" fill={i%2===0?"white":bg(c)} stroke="#e5e5e5" strokeWidth=".5"/>
          <rect x="8" y={52+i*40} width="20" height="9" fill={c} opacity=".2"/>
          <text x="14" y={52+i*40+7} fill={c} fontSize="5" fontFamily="monospace">{`0${i+1}:00`}</text>
          <rect x="12" y={52+i*40+14} width="26" height="16" rx="2" fill={c} opacity=".1"/>
          <LN x="88" y={52+i*40+8} w={60} n={3} g={8} h={3}/>
        </g>
      ))}
    </>
  ),

  'fishbone': (c) => (
    <>
      <LN x="8" y="24" w={130} n={1} h={6} fill={c}/>
      <rect x="10" y="108" width="124" height="3" rx="1.5" fill={c} opacity=".55"/>
      <polygon points="134,103 148,109.5 134,116" fill={c} opacity=".6"/>
      {[30,60,88,116].map((x,i)=>(
        <g key={i}>
          <line x1={x} y1="109" x2={x-10} y2="72" stroke={c} strokeWidth="1.5" strokeOpacity=".4"/>
          <line x1={x} y1="109" x2={x-10} y2="146" stroke={c} strokeWidth="1.5" strokeOpacity=".4"/>
          <rect x={x-32} y="54" width="44" height="18" rx="3" fill={bg(c)}/>
          <rect x={x-32} y="148" width="44" height="18" rx="3" fill={bg(c)}/>
          <LN x={x-30} y="58" w={40} n={1} h={4}/>
          <LN x={x-30} y="152" w={40} n={1} h={4}/>
        </g>
      ))}
    </>
  ),

  'branching-tree': (c) => (
    <>
      <LN x="8" y="24" w={130} n={1} h={6} fill={c}/>
      <rect x="48" y="36" width="64" height="22" rx="4" fill={c} opacity=".55"/>
      <LN x="54" y="43" w={52} n={2} g={7} h={3} fill="white"/>
      <line x1="80" y1="58" x2="40" y2="92" stroke={c} strokeWidth="1.5" strokeOpacity=".35"/>
      <line x1="80" y1="58" x2="120" y2="92" stroke={c} strokeWidth="1.5" strokeOpacity=".35"/>
      {[14,90].map((x,i)=>(
        <g key={i}>
          <rect x={x} y="92" width="52" height="20" rx="3" fill={bg(c)} stroke={c} strokeWidth="1" strokeOpacity=".6"/>
          <LN x={x+4} y="97" w={44} n={1} h={4}/>
          <line x1={x+26} y1="112" x2={x+10} y2="138" stroke={c} strokeWidth="1" strokeOpacity=".25"/>
          <line x1={x+26} y1="112" x2={x+42} y2="138" stroke={c} strokeWidth="1" strokeOpacity=".25"/>
          {[x,x+32].map((nx,j)=>(
            <g key={j}>
              <rect x={nx} y="138" width="26" height="16" rx="2" fill={bg(c)} stroke={c} strokeWidth=".75" strokeOpacity=".5"/>
              <LN x={nx+3} y="143" w={20} n={1} h={3}/>
            </g>
          ))}
        </g>
      ))}
      {[10,44,90,120].map((x,i)=>(
        <rect key={i} x={x} y="172" width="22" height="12" rx="2" fill={bg(c)} stroke={c} strokeWidth=".5" strokeOpacity=".4"/>
      ))}
    </>
  ),

  'radial-center': (c) => (
    <>
      <LN x="8" y="24" w={130} n={1} h={6} fill={c}/>
      <circle cx="80" cy="118" r="28" fill={c} opacity=".45"/>
      <LN x="56" y="112" w={48} n={2} g={8} h={3} fill="white"/>
      {[[10,42],[114,42],[4,112],[122,112],[28,182],[92,182]].map(([x,y],i)=>(
        <g key={i}>
          <line x1="80" y1="118" x2={x+16} y2={y+12} stroke={c} strokeWidth="1.5" strokeOpacity=".3"/>
          <rect x={x} y={y} width="32" height="22" rx="11" fill={bg(c)} stroke={c} strokeWidth="1" strokeOpacity=".6"/>
          <LN x={x+5} y={y+7} w={22} n={1} h={4}/>
        </g>
      ))}
    </>
  ),

  'venn': (c) => (
    <>
      <LN x="8" y="24" w={130} n={1} h={6} fill={c}/>
      <circle cx="62" cy="118" r="54" fill={c} fillOpacity=".15" stroke={c} strokeWidth="1.5" strokeOpacity=".5"/>
      <circle cx="98" cy="118" r="54" fill={c} fillOpacity=".15" stroke={c} strokeWidth="1.5" strokeOpacity=".5"/>
      <LN x="14" y="112" w={32} n={2} g={7} h={2.5}/>
      <LN x="72" y="112" w={16} n={2} g={7} h={2.5} fill={c}/>
      <LN x="110" y="112" w={32} n={2} g={7} h={2.5}/>
      <LN x="8" y="186" w={144} n={2} g={8} h={3}/>
    </>
  ),
};

// Maps each template ID → {color, layout, label, params}
const THUMB_MAP = {
  // LESSON PLANS
  L1:{c:'#d97757',layout:'five-col',lbl:'5E INQUIRY'},
  L2:{c:'#d97757',layout:'three-band',lbl:'DIRECT INSTR.'},
  L3:{c:'#d97757',layout:'multi-path',lbl:'UDL MULTI-PATH'},
  L4:{c:'#d97757',layout:'timeline-h',lbl:'STORY ARC'},
  L5:{c:'#d97757',layout:'funnel',lbl:'BACKWARDS DESIGN'},
  L6:{c:'#d97757',layout:'timed-blocks',lbl:'WORKSHOP MODEL'},
  // WORKSHEETS
  W1:{c:'#4a7a8c',layout:'three-tier',lbl:'TIERED PRACTICE'},
  W2:{c:'#4a7a8c',layout:'grid-3x3',lbl:'CHOICE BOARD'},
  W3:{c:'#4a7a8c',layout:'step-ladder',lbl:"BLOOM'S LADDER"},
  W4:{c:'#4a7a8c',layout:'visual-left',lbl:'VISUAL PROMPT'},
  W5:{c:'#4a7a8c',layout:'concept-map',lbl:'CONCEPT MAP FILL'},
  W6:{c:'#4a7a8c',layout:'timed-blocks',lbl:'EXIT TICKET',params:{blocks:[{time:'Q1',h:52,lines:3},{time:'Q2',h:52,lines:3},{time:'Q3',h:52,lines:3}]}},
  // SLIDES
  S1:{c:'#7a5cb8',layout:'two-col-doc',lbl:'UDL ANNOTATED',params:{annotStrip:true}},
  S2:{c:'#7a5cb8',layout:'slide-full-img',lbl:'VISUAL-FIRST'},
  S3:{c:'#7a5cb8',layout:'two-col-doc',lbl:'TWO COLUMN'},
  S4:{c:'#7a5cb8',layout:'two-col-doc',lbl:'SLIDE + NOTES',params:{notesArea:true}},
  S5:{c:'#7a5cb8',layout:'funnel',lbl:'QUESTION-DRIVEN',params:{stages:[{lbl:'Prompt',op:.6,w:144},{lbl:'Option A',op:.45,w:100},{lbl:'Option B',op:.32,w:66}]}},
  S6:{c:'#7a5cb8',layout:'grid-3x3',lbl:'STORYBOARD DECK',params:{imageGrid:true}},
  // GRAPHIC ORGANIZERS
  G1:{c:'#5a8d4f',layout:'concept-map',lbl:'CONCEPT MAP'},
  G2:{c:'#5a8d4f',layout:'fishbone',lbl:'FISHBONE'},
  G3:{c:'#5a8d4f',layout:'venn',lbl:'VENN DIAGRAM'},
  G4:{c:'#5a8d4f',layout:'rubric-table',lbl:'KWL+',params:{cols:4,rows:5}},
  G5:{c:'#5a8d4f',layout:'timeline-h',lbl:'STORY MAP'},
  G6:{c:'#5a8d4f',layout:'branching-tree',lbl:'TREE CHART'},
  // ASSESSMENTS
  A1:{c:'#c2410c',layout:'three-tier',lbl:'EXIT TICKET'},
  A2:{c:'#c2410c',layout:'rubric-table',lbl:'PERFORMANCE TASK'},
  A3:{c:'#c2410c',layout:'checklist-rows',lbl:'PORTFOLIO PROMPT'},
  A4:{c:'#c2410c',layout:'checklist-rows',lbl:'PEER ASSESSMENT'},
  A5:{c:'#c2410c',layout:'three-band',lbl:'MULTI-MODAL QUIZ',params:{items:[{lbl:'READ & WRITE',op:.75},{lbl:'DRAW IT',op:.5},{lbl:'LISTEN',op:.3}]}},
  A6:{c:'#c2410c',layout:'rubric-table',lbl:'ANECDOTAL RECORD',params:{cols:3,rows:7}},
  // POSTERS
  P1:{c:'#b8862a',layout:'grid-3x3',lbl:'VISUAL GLOSSARY'},
  P2:{c:'#b8862a',layout:'timeline-h',lbl:'PROCESS FLOW'},
  P3:{c:'#b8862a',layout:'visual-left',lbl:'DATA STORY'},
  P4:{c:'#b8862a',layout:'two-col-doc',lbl:'COMPARISON'},
  P5:{c:'#b8862a',layout:'radial-center',lbl:'IDENTITY MAP'},
  P6:{c:'#b8862a',layout:'three-tier',lbl:'ANCHOR CHART',params:{tiers:[{badge:'▶',op:.55},{badge:'▶▶',op:.4},{badge:'▶▶▶',op:.25}]}},
  // PAMPHLETS
  PA1:{c:'#4a7a8c',layout:'tri-fold',lbl:'TRI-FOLD'},
  PA2:{c:'#4a7a8c',layout:'two-col-doc',lbl:'FAMILY GUIDE',params:{sidebarW:true}},
  PA3:{c:'#4a7a8c',layout:'three-band',lbl:'SELF-ADVOCACY',params:{items:[{lbl:'My rights',op:.7},{lbl:'I can ask for...',op:.5},{lbl:'Resources',op:.3}]}},
  PA4:{c:'#4a7a8c',layout:'timed-blocks',lbl:'STEP-BY-STEP',params:{blocks:[{time:'①',h:44,lines:2},{time:'②',h:44,lines:2},{time:'③',h:44,lines:2},{time:'④',h:44,lines:2}]}},
  PA5:{c:'#4a7a8c',layout:'rubric-table',lbl:'QUICK REFERENCE',params:{cols:2,rows:8}},
  // STORYBOOKS
  ST1:{c:'#d97757',layout:'storybook-spread',lbl:'PICTURE BOOK'},
  ST2:{c:'#d97757',layout:'two-col-doc',lbl:'CHAPTER BOOK',params:{sidebarW:true}},
  ST3:{c:'#d97757',layout:'step-ladder',lbl:'DECODABLE READER',params:{steps:['Read','Sound out','Re-read','Understand','Retell','Create']}},
  ST4:{c:'#d97757',layout:'script-cols',lbl:'BILINGUAL STORY',params:{leftLabel:'LANG A',rightLabel:'LANG B'}},
  ST5:{c:'#d97757',layout:'grid-3x3',lbl:'WORDLESS JOURNEY',params:{imageGrid:true}},
  // TEXTBOOK
  T1:{c:'#3a3a3a',layout:'two-col-doc',lbl:'CHUNKED CHAPTER',params:{sidebarW:true}},
  T2:{c:'#3a3a3a',layout:'funnel',lbl:'INQUIRY CHAPTER',params:{stages:[{lbl:'Driving Question',op:.55,w:144},{lbl:'Section 1',op:.38,w:110},{lbl:'Section 2',op:.24,w:76}]}},
  T3:{c:'#3a3a3a',layout:'three-tier',lbl:'LAYERED TEXT',params:{tiers:[{badge:'✦',op:.2},{badge:'✦✦',op:.45},{badge:'✦✦✦',op:.7}]}},
  T4:{c:'#3a3a3a',layout:'visual-left',lbl:'VISUAL CHAPTER'},
  T5:{c:'#3a3a3a',layout:'three-band',lbl:'SOCRATIC TEXT',params:{items:[{lbl:'Passage',op:.6},{lbl:'?',op:.4},{lbl:'Passage',op:.6}]}},
  // CASE STUDIES
  C1:{c:'#7a5cb8',layout:'funnel',lbl:'HCD SCENARIO',params:{stages:[{lbl:'Empathise',op:.65,w:144},{lbl:'Define',op:.5,w:110},{lbl:'Ideate',op:.35,w:76},{lbl:'Test',op:.22,w:46}]}},
  C2:{c:'#7a5cb8',layout:'multi-path',lbl:'ETHICS DILEMMA'},
  C3:{c:'#7a5cb8',layout:'rubric-table',lbl:'DATA CASE',params:{cols:2,rows:6}},
  C4:{c:'#7a5cb8',layout:'timeline-h',lbl:'NARRATIVE CASE'},
  C5:{c:'#7a5cb8',layout:'two-col-doc',lbl:'COMPARATIVE'},
  // SIMULATIONS
  M1:{c:'#5a8d4f',layout:'grid-3x3',lbl:'ROLE CARD SET',params:{imageGrid:true}},
  M2:{c:'#5a8d4f',layout:'branching-tree',lbl:'DECISION TREE'},
  M3:{c:'#5a8d4f',layout:'timeline-h',lbl:'BOARD GAME'},
  M4:{c:'#5a8d4f',layout:'script-cols',lbl:'DEBATE SCRIPT',params:{leftLabel:'FOR',rightLabel:'AGAINST'}},
  M5:{c:'#5a8d4f',layout:'radial-center',lbl:'FISHBOWL'},
  // VIDEO / LECTURE
  V1:{c:'#4a7a8c',layout:'script-cols',lbl:'TWO-COL SCRIPT'},
  V2:{c:'#4a7a8c',layout:'grid-3x3',lbl:'STORYBOARD SCRIPT',params:{imageGrid:true}},
  V3:{c:'#4a7a8c',layout:'timed-blocks',lbl:'INTERACTIVE VIDEO',params:{blocks:[{time:'Video',h:60,lines:0},{time:'Pause',h:38,lines:2},{time:'Video',h:60,lines:0},{time:'Pause',h:30,lines:2}]}},
  V4:{c:'#4a7a8c',layout:'rubric-table',lbl:'CAPTIONS SHEET',params:{cols:3,rows:6}},
  V5:{c:'#4a7a8c',layout:'three-band',lbl:'EXPLAINER ARC',params:{items:[{lbl:'HOOK',op:.75},{lbl:'CONTENT',op:.5},{lbl:'CALL TO ACTION',op:.3}]}},
};

// Thumbnail component — SVG wrapper + layout content
const DocThumb = ({id, size=200}) => {
  const cfg = THUMB_MAP[id]; if (!cfg) return null;
  const fn = LAYOUTS[cfg.layout]; if (!fn) return null;
  const ratio = 220/160;
  return (
    <svg viewBox="0 0 160 220" xmlns="http://www.w3.org/2000/svg"
      style={{width:'100%',height:'100%',display:'block',background:'white'}}>
      <rect width="160" height="220" fill="white"/>
      {fn(cfg.c, cfg.params||{})}
      <TH c={cfg.c} t={cfg.lbl}/>
    </svg>
  );
};

Object.assign(window, {DocThumb, THUMB_MAP, LAYOUTS, bg, TH, LN});
