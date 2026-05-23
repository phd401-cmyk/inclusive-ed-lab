// Theory Library — visual SVG diagrams + explanations for all 12 frameworks

const { useState } = React;

const THEORY_LIBRARY = [
  {
    id:'udl', label:'UDL (CAST)', short:'Universal Design for Learning',
    color:'#6B2FA0',
    tagline:'Design for the edges — and it works better for everyone.',
    description:'UDL asks educators to offer multiple means of engagement (the why of learning), representation (the what), and action & expression (the how). Instead of retrofitting for individual needs, you design flexibility in from the start.',
    inPractice:[
      'Offer a video, a text, and a hands-on model of the same concept',
      'Let learners write, draw, speak, or build to show understanding',
      'Give choice in how learners engage with tasks and assessments',
    ],
    Diagram: () => (
      <svg viewBox="0 0 480 220" style={{width:'100%',display:'block'}}>
        <rect width="480" height="220" fill="#faf7ff"/>
        {/* Three pillars */}
        {[
          {x:20,  color:'#6B2FA0', title:'ENGAGEMENT',    sub:'Why', items:['Choice','Relevance','Self-reg']},
          {x:180, color:'#9b5fd0', title:'REPRESENT-ATION', sub:'What',items:['Visual','Audio','Text']},
          {x:340, color:'#c49ee8', title:'ACTION & EXPR.',  sub:'How', items:['Write','Draw','Speak']},
        ].map(({x,color,title,sub,items},i)=>(
          <g key={i}>
            <rect x={x} y="20" width="140" height="180" rx="8" fill="white" stroke={color} strokeWidth="1.5"/>
            <rect x={x} y="20" width="140" height="38" rx="8" fill={color}/>
            <rect x={x} y="42" width="140" height="8" fill={color}/>
            <text x={x+70} y="37" textAnchor="middle" fill="white" fontSize="11" fontFamily="'Work Sans',sans-serif" fontWeight="700">{title}</text>
            <text x={x+70} y="52" textAnchor="middle" fill="white" fontSize="9" fontFamily="'Work Sans',sans-serif" opacity=".8">{sub}</text>
            {items.map((it,j)=>(
              <g key={j}>
                <circle cx={x+22} cy={76+j*34} r="7" fill={color} opacity=".2"/>
                <text x={x+22} y={80+j*34} textAnchor="middle" fill={color} fontSize="9" fontFamily="'Work Sans',sans-serif" fontWeight="600">{j+1}</text>
                <text x={x+36} y={80+j*34} fill="#2e2040" fontSize="11" fontFamily="'Work Sans',sans-serif">{it}</text>
              </g>
            ))}
          </g>
        ))}
        <text x="240" y="215" textAnchor="middle" fill="#8878a8" fontSize="9" fontFamily="'JetBrains Mono',monospace" letterSpacing="1">FLEXIBLE BY DESIGN — NOT RETROFITTED</text>
      </svg>
    ),
  },
  {
    id:'bloom', label:"Bloom's Taxonomy", short:'Cognitive Taxonomy (Bloom et al.)',
    color:'#9b5fd0',
    tagline:'Not all learning is equal — ladder from recall to creation.',
    description:"Bloom's Taxonomy organises cognitive tasks from lower-order (Remember, Understand, Apply) to higher-order (Analyse, Evaluate, Create). Inclusive TLMs use the full ladder so all learners can access and be stretched.",
    inPractice:[
      'Start with recall to activate prior knowledge, then build upward',
      'Design assessments that allow learners to show different cognitive levels',
      'Use Bloom\'s verbs: define → explain → apply → compare → judge → design',
    ],
    Diagram: () => {
      const levels=[
        {l:'CREATE',   color:'#3a1060', w:120},
        {l:'EVALUATE', color:'#55247e', w:160},
        {l:'ANALYSE',  color:'#6B2FA0', w:200},
        {l:'APPLY',    color:'#9b5fd0', w:248},
        {l:'UNDERSTAND',color:'#c49ee8',w:296},
        {l:'REMEMBER', color:'#e8d8f8', w:340},
      ];
      return (
        <svg viewBox="0 0 480 220" style={{width:'100%',display:'block'}}>
          <rect width="480" height="220" fill="#faf7ff"/>
          {levels.map(({l,color,w},i)=>(
            <g key={i}>
              <rect x={(480-w)/2} y={20+i*30} width={w} height={26} rx="4" fill={color}/>
              <text x="240" y={20+i*30+17} textAnchor="middle" fill={i<2?"white":i<4?"white":"#3a1060"} fontSize="11" fontFamily="'Work Sans',sans-serif" fontWeight="600">{l}</text>
            </g>
          ))}
          <text x="240" y="214" textAnchor="middle" fill="#8878a8" fontSize="9" fontFamily="'JetBrains Mono',monospace" letterSpacing="1">LOWER ORDER → HIGHER ORDER THINKING</text>
        </svg>
      );
    },
  },
  {
    id:'vyg', label:'Scaffolding (Vygotsky)', short:'Zone of Proximal Development',
    color:'#6B2FA0',
    tagline:'Teach at the edge of what learners can almost do.',
    description:"Vygotsky's ZPD identifies the gap between what a learner can do alone and what they can do with support. Scaffolding — hints, worked examples, guiding questions, peer support — fills that gap and is gradually removed as mastery grows.",
    inPractice:[
      'Worked examples before independent practice (I do → We do → You do)',
      'Sentence starters, thinking frames, and visual supports that fade over time',
      'Peer pairing so more experienced learners scaffold those who are developing',
    ],
    Diagram: () => (
      <svg viewBox="0 0 480 220" style={{width:'100%',display:'block'}}>
        <rect width="480" height="220" fill="#faf7ff"/>
        {/* Concentric circles */}
        <circle cx="240" cy="110" r="90" fill="#e8d8f8" stroke="#6B2FA0" strokeWidth="1" strokeDasharray="4,4" opacity=".6"/>
        <circle cx="240" cy="110" r="62" fill="#c49ee8" opacity=".3" stroke="#6B2FA0" strokeWidth="1.5"/>
        <circle cx="240" cy="110" r="36" fill="#6B2FA0" opacity=".8"/>
        {/* Labels */}
        <text x="240" y="108" textAnchor="middle" fill="white" fontSize="10" fontFamily="'Work Sans',sans-serif" fontWeight="700">CAN DO</text>
        <text x="240" y="122" textAnchor="middle" fill="white" fontSize="9" fontFamily="'Work Sans',sans-serif">alone</text>
        <text x="240" y="172" textAnchor="middle" fill="#55247e" fontSize="10" fontFamily="'Work Sans',sans-serif" fontWeight="700">ZPD — WITH SUPPORT</text>
        <text x="240" y="186" textAnchor="middle" fill="#55247e" fontSize="9" fontFamily="'Work Sans',sans-serif">← where scaffolding lives</text>
        {/* Arrow labels outer */}
        <text x="240" y="206" textAnchor="middle" fill="#8878a8" fontSize="9" fontFamily="'Work Sans',sans-serif">NOT YET REACHABLE (outer ring)</text>
        {/* Scaffold examples */}
        {[
          [60,  60,  'Hint card'],
          [380, 60,  'Worked eg.'],
          [60,  160, 'Sentence starter'],
          [380, 160, 'Peer model'],
        ].map(([x,y,lbl],i)=>(
          <g key={i}>
            <rect x={x-38} y={y-12} width="76" height="22" rx="11" fill="white" stroke="#6B2FA0" strokeWidth="1" opacity=".7"/>
            <text x={x} y={y+2} textAnchor="middle" fill="#55247e" fontSize="9.5" fontFamily="'Work Sans',sans-serif">{lbl}</text>
          </g>
        ))}
      </svg>
    ),
  },
  {
    id:'cog', label:'Cognitive Load (Sweller)', short:'Cognitive Load Theory',
    color:'#9b5fd0',
    tagline:'Reduce friction. Chunk. Space. Repeat.',
    description:'Working memory is limited. Cognitive Load Theory distinguishes intrinsic load (the complexity of the concept), extraneous load (unnecessary noise), and germane load (the good effort that builds schema). Inclusive TLMs minimise extraneous load so learners can focus on meaning.',
    inPractice:[
      'Chunk long text into numbered steps — never more than 3 instructions at once',
      'Remove decorative elements that compete with key information',
      'Pair graphics with text, rather than having them separate (dual-coding)',
    ],
    Diagram: () => (
      <svg viewBox="0 0 480 220" style={{width:'100%',display:'block'}}>
        <rect width="480" height="220" fill="#faf7ff"/>
        {/* Before — overloaded */}
        <rect x="20" y="20" width="200" height="180" rx="8" fill="white" stroke="#c2410c" strokeWidth="1.5"/>
        <rect x="20" y="20" width="200" height="28" rx="8" fill="#c2410c"/>
        <rect x="20" y="40" width="200" height="8" fill="#c2410c"/>
        <text x="120" y="38" textAnchor="middle" fill="white" fontSize="10" fontFamily="'Work Sans',sans-serif" fontWeight="700">OVERLOADED ✗</text>
        {/* Wall of text lines */}
        {Array.from({length:9}).map((_,i)=>(
          <rect key={i} x="30" y={58+i*12} width={160*(0.9+Math.sin(i)*0.1)} height="7" rx="2" fill="#e0d0d0" opacity=".8"/>
        ))}
        <text x="120" y="186" textAnchor="middle" fill="#c2410c" fontSize="9" fontFamily="'Work Sans',sans-serif">Dense wall of text</text>
        {/* Arrow */}
        <text x="240" y="114" textAnchor="middle" fill="#6B2FA0" fontSize="20">→</text>
        {/* After — chunked */}
        <rect x="260" y="20" width="200" height="180" rx="8" fill="white" stroke="#4f7d52" strokeWidth="1.5"/>
        <rect x="260" y="20" width="200" height="28" rx="8" fill="#4f7d52"/>
        <rect x="260" y="40" width="200" height="8" fill="#4f7d52"/>
        <text x="360" y="38" textAnchor="middle" fill="white" fontSize="10" fontFamily="'Work Sans',sans-serif" fontWeight="700">CHUNKED ✓</text>
        {[['Step 1',58],['Step 2',96],['Step 3',134]].map(([lbl,y],i)=>(
          <g key={i}>
            <rect x="270" y={y} width="180" height="28" rx="4" fill="#edf6eb"/>
            <circle cx="285" cy={y+14} r="9" fill="#4f7d52"/>
            <text x="285" y={y+18} textAnchor="middle" fill="white" fontSize="9" fontFamily="'Work Sans',sans-serif" fontWeight="700">{i+1}</text>
            <rect x="300" y={y+7} width="100" height="5" rx="2" fill="#c8d8ca"/>
            <rect x="300" y={y+16} width="80" height="4" rx="2" fill="#c8d8ca" opacity=".6"/>
          </g>
        ))}
        <text x="360" y="186" textAnchor="middle" fill="#4f7d52" fontSize="9" fontFamily="'Work Sans',sans-serif">Numbered chunks</text>
      </svg>
    ),
  },
  {
    id:'kolb', label:'Experiential Learning (Kolb)', short:'Experiential Learning Cycle',
    color:'#6B2FA0',
    tagline:'Experience first. Reflect. Generalise. Apply.',
    description:"Kolb's four-stage cycle begins with a concrete experience, moves through reflective observation and abstract conceptualisation, and ends with active experimentation — which generates a new experience. TLMs designed on this model are activity-first, not explanation-first.",
    inPractice:[
      'Start lessons with a doing activity (experiment, case, role-play) before theory',
      'Build in structured reflection: What happened? What does it mean? What now?',
      'End with application tasks that transfer learning to new contexts',
    ],
    Diagram: () => {
      const stages=[
        {lbl:'Concrete\nExperience',   x:240, y:30,  angle:0},
        {lbl:'Reflective\nObservation', x:420, y:110, angle:90},
        {lbl:'Abstract\nConceptualisation',x:240,y:190,angle:180},
        {lbl:'Active\nExperimentation', x:60, y:110, angle:270},
      ];
      return (
        <svg viewBox="0 0 480 220" style={{width:'100%',display:'block'}}>
          <rect width="480" height="220" fill="#faf7ff"/>
          {/* Circle arc */}
          <circle cx="240" cy="110" r="70" fill="none" stroke="#c49ee8" strokeWidth="2" strokeDasharray="6,4"/>
          {/* Arrows */}
          {[0,90,180,270].map((a,i)=>{
            const r=70, rad=(a+45)*Math.PI/180;
            const x=240+r*Math.sin(rad), y=110-r*Math.cos(rad);
            return <circle key={i} cx={x} cy={y} r="5" fill="#6B2FA0" opacity=".5"/>;
          })}
          {/* Stage boxes */}
          {stages.map(({lbl,x,y},i)=>{
            const lines=lbl.split('\n');
            return (
              <g key={i}>
                <rect x={x-52} y={y-18} width="104" height="34" rx="8" fill={i===0?'#6B2FA0':'white'} stroke="#6B2FA0" strokeWidth="1.5"/>
                {lines.map((l,j)=>(
                  <text key={j} x={x} y={y-4+j*13} textAnchor="middle" fill={i===0?'white':'#3a1060'} fontSize="10" fontFamily="'Work Sans',sans-serif" fontWeight="600">{l}</text>
                ))}
              </g>
            );
          })}
          <text x="240" y="114" textAnchor="middle" fill="#6B2FA0" fontSize="9" fontFamily="'JetBrains Mono',monospace" letterSpacing=".5">CYCLE</text>
        </svg>
      );
    },
  },
  {
    id:'knowles', label:"Knowles' Andragogy", short:'Adult Learning Principles',
    color:'#9b5fd0',
    tagline:'Adults learn differently — honour their experience and autonomy.',
    description:"Knowles identified six principles that distinguish adult from child learning: self-concept (autonomy), experience (rich resource), readiness (life relevance), orientation (problem-centred), motivation (internal), and need to know (why before what). Andragogy-informed TLMs treat learners as collaborators.",
    inPractice:[
      'Open with "why this matters" before content — adults need relevance first',
      'Use case studies and real problems drawn from learners\' own contexts',
      'Offer choice in how and when learners engage with materials',
    ],
    Diagram: () => {
      const principles=[
        {lbl:'Self-Concept',  sub:'Autonomous',     x:100, y:50},
        {lbl:'Experience',    sub:'Rich resource',   x:280, y:50},
        {lbl:'Readiness',     sub:'Life relevance',  x:420, y:50},
        {lbl:'Orientation',   sub:'Problem-centred', x:100, y:140},
        {lbl:'Motivation',    sub:'Internal',        x:280, y:140},
        {lbl:'Need to Know',  sub:'Why before what', x:420, y:140},
      ];
      return (
        <svg viewBox="0 0 480 200" style={{width:'100%',display:'block'}}>
          <rect width="480" height="200" fill="#faf7ff"/>
          {/* Central circle */}
          <circle cx="240" cy="100" r="32" fill="#9b5fd0" opacity=".15" stroke="#9b5fd0" strokeWidth="1.5"/>
          <text x="240" y="97" textAnchor="middle" fill="#55247e" fontSize="10" fontFamily="'Work Sans',sans-serif" fontWeight="700">Adult</text>
          <text x="240" y="110" textAnchor="middle" fill="#55247e" fontSize="10" fontFamily="'Work Sans',sans-serif" fontWeight="700">Learner</text>
          {principles.map(({lbl,sub,x,y},i)=>(
            <g key={i}>
              <line x1="240" y1="100" x2={x} y2={y+14} stroke="#9b5fd0" strokeWidth="1" strokeOpacity=".4"/>
              <rect x={x-52} y={y} width="104" height="36" rx="6" fill="white" stroke="#9b5fd0" strokeWidth="1.2"/>
              <text x={x} y={y+14} textAnchor="middle" fill="#3a1060" fontSize="10" fontFamily="'Work Sans',sans-serif" fontWeight="600">{lbl}</text>
              <text x={x} y={y+26} textAnchor="middle" fill="#8878a8" fontSize="8.5" fontFamily="'Work Sans',sans-serif">{sub}</text>
            </g>
          ))}
        </svg>
      );
    },
  },
  {
    id:'connect', label:'Connectivism', short:'Siemens & Downes',
    color:'#6B2FA0',
    tagline:'Learning lives in the network, not just the learner.',
    description:'Connectivism holds that in a digital age, learning is the act of forming connections between nodes — people, ideas, resources, tools. The ability to know where to find knowledge matters as much as holding knowledge. TLMs based on connectivism are network-rich and link-heavy.',
    inPractice:[
      'Embed QR codes or links to expert resources, podcasts, and community voices',
      'Design activities where learners curate and share resources with peers',
      'Encourage learners to map their own knowledge networks',
    ],
    Diagram: () => {
      const nodes=[
        {lbl:'Learner', x:240, y:100, r:20, main:true},
        {lbl:'Peers',   x:120, y:50,  r:14},
        {lbl:'Texts',   x:370, y:50,  r:14},
        {lbl:'Tools',   x:80,  y:150, r:14},
        {lbl:'Expert',  x:400, y:150, r:14},
        {lbl:'Community',x:240,y:180, r:14},
        {lbl:'Data',    x:160, y:160, r:10},
        {lbl:'Video',   x:330, y:160, r:10},
      ];
      return (
        <svg viewBox="0 0 480 210" style={{width:'100%',display:'block'}}>
          <rect width="480" height="210" fill="#faf7ff"/>
          {nodes.slice(1).map(({x,y},i)=>(
            <line key={i} x1="240" y1="100" x2={x} y2={y} stroke="#6B2FA0" strokeWidth="1.5" strokeOpacity=".35"/>
          ))}
          {/* Cross connections */}
          {[[1,2],[2,4],[0,5],[3,5]].map(([a,b],i)=>(
            <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="#c49ee8" strokeWidth="1" strokeOpacity=".3"/>
          ))}
          {nodes.map(({lbl,x,y,r,main},i)=>(
            <g key={i}>
              <circle cx={x} cy={y} r={r} fill={main?'#6B2FA0':'white'} stroke="#6B2FA0" strokeWidth={main?0:1.5}/>
              <text x={x} y={y+4} textAnchor="middle" fill={main?'white':'#3a1060'} fontSize={main?11:9} fontFamily="'Work Sans',sans-serif" fontWeight="600">{lbl}</text>
            </g>
          ))}
        </svg>
      );
    },
  },
  {
    id:'hcd', label:'Human-Centred Design', short:'HCD / Design Thinking',
    color:'#9b5fd0',
    tagline:'Empathise before you design.',
    description:'HCD (popularised by IDEO and Stanford d.school) puts the end-user at the centre of every design decision. For TLMs, this means starting with the learner\'s lived experience, testing prototypes, and iterating based on feedback — not designing for an imagined average student.',
    inPractice:[
      'Interview or observe learners before designing — what do they struggle with, and why?',
      'Prototype a TLM quickly, test it with a small group, revise',
      'Use empathy maps to capture learner thoughts, feelings, actions, and needs',
    ],
    Diagram: () => {
      const stages=[
        {lbl:'Empathise', color:'#e8d8f8'},
        {lbl:'Define',    color:'#c49ee8'},
        {lbl:'Ideate',    color:'#9b5fd0'},
        {lbl:'Prototype', color:'#6B2FA0'},
        {lbl:'Test',      color:'#3a1060'},
      ];
      return (
        <svg viewBox="0 0 480 160" style={{width:'100%',display:'block'}}>
          <rect width="480" height="160" fill="#faf7ff"/>
          {stages.map(({lbl,color},i)=>(
            <g key={i}>
              <rect x={20+i*90} y="40" width="80" height="70" rx="8" fill={color}/>
              {i<4 && <polygon points={`${100+i*90},75 ${110+i*90},75 ${110+i*90},70 ${120+i*90},75 ${110+i*90},80 ${110+i*90},75`} fill={color} opacity=".6"/>}
              <text x={60+i*90} y={82} textAnchor="middle" fill={i<2?'#3a1060':'white'} fontSize="11" fontFamily="'Work Sans',sans-serif" fontWeight="700">{lbl}</text>
              <text x={60+i*90} y={140} textAnchor="middle" fill="#8878a8" fontSize="8.5" fontFamily="'Work Sans',sans-serif">{['Understand\nusers','Frame the\nproblem','Generate\nideas','Build\nmodel','Learn &\niterate'][i]}</text>
            </g>
          ))}
          {/* Loop arrow */}
          <path d="M450,110 Q460,130 240,140 Q20,130 30,110" fill="none" stroke="#6B2FA0" strokeWidth="1.5" strokeDasharray="5,4" opacity=".4"/>
          <polygon points="34,105 28,115 40,112" fill="#6B2FA0" opacity=".4"/>
        </svg>
      );
    },
  },
  {
    id:'strengths', label:'Strengths-Based Learning', short:'Asset-Based Pedagogy',
    color:'#6B2FA0',
    tagline:'See what learners bring, not what they lack.',
    description:'Strengths-based (or asset-based) pedagogy reframes learners through their capabilities, knowledge, and cultural resources — rather than deficits and gaps. TLMs designed this way use affirming language, build on existing expertise, and position learners as contributors rather than recipients.',
    inPractice:[
      'Replace "I can\'t" prompts with "I can... when I have..." framing',
      'Design tasks that invite learners to share expertise with the group',
      'Use rubrics that describe growth, not failure — "developing" not "below standard"',
    ],
    Diagram: () => (
      <svg viewBox="0 0 480 200" style={{width:'100%',display:'block'}}>
        <rect width="480" height="200" fill="#faf7ff"/>
        {/* Deficit side — crossed out */}
        <rect x="20" y="30" width="190" height="150" rx="8" fill="#fff0ee" stroke="#c2410c" strokeWidth="1.5"/>
        <text x="115" y="55" textAnchor="middle" fill="#c2410c" fontSize="11" fontFamily="'Work Sans',sans-serif" fontWeight="700">DEFICIT MODEL ✗</text>
        {['Gap','Problem','Weakness','Lacks','Behind','Cannot'].map((w,i)=>(
          <g key={i}>
            <rect x="36" y={68+i*14} width="120" height="10" rx="2" fill="#e0d0d0"/>
            <line x1="36" y1={73+i*14} x2="156" y2={73+i*14} stroke="#c2410c" strokeWidth="1.5" opacity=".6"/>
            <text x="50" y={77+i*14} fill="#888" fontSize="9" fontFamily="'Work Sans',sans-serif">{w}</text>
          </g>
        ))}
        {/* Asset side */}
        <rect x="270" y="30" width="190" height="150" rx="8" fill="#f0e8f8" stroke="#6B2FA0" strokeWidth="1.5"/>
        <text x="365" y="55" textAnchor="middle" fill="#55247e" fontSize="11" fontFamily="'Work Sans',sans-serif" fontWeight="700">ASSET MODEL ✓</text>
        {['Prior knowledge','Home language','Community ties','Lived experience','Cultural wealth','Curiosity'].map((w,i)=>(
          <g key={i}>
            <circle cx="292" cy={73+i*14} r="4" fill="#6B2FA0" opacity=".5"/>
            <text x="302" y={77+i*14} fill="#3a1060" fontSize="9.5" fontFamily="'Work Sans',sans-serif">{w}</text>
          </g>
        ))}
        {/* Arrow */}
        <text x="240" y="110" textAnchor="middle" fill="#6B2FA0" fontSize="22">→</text>
        <text x="240" y="195" textAnchor="middle" fill="#8878a8" fontSize="9" fontFamily="'JetBrains Mono',monospace">SHIFT THE FRAME</text>
      </svg>
    ),
  },
  {
    id:'selfdet', label:'Self-Determination Theory', short:'Deci & Ryan',
    color:'#9b5fd0',
    tagline:'Three basic needs: Autonomy, Competence, Relatedness.',
    description:'Self-Determination Theory (Deci & Ryan) holds that intrinsic motivation flourishes when three psychological needs are met: autonomy (choice and ownership), competence (feeling capable), and relatedness (belonging and connection). Inclusive TLMs are designed to nurture all three.',
    inPractice:[
      'Autonomy: offer choice in task, topic, or product — even small choices matter',
      'Competence: use graduated challenge so all learners experience success',
      'Relatedness: include collaborative tasks and affirming, community-linked content',
    ],
    Diagram: () => (
      <svg viewBox="0 0 480 210" style={{width:'100%',display:'block'}}>
        <rect width="480" height="210" fill="#faf7ff"/>
        {/* Three overlapping circles */}
        <circle cx="190" cy="100" r="70" fill="#9b5fd0" fillOpacity=".18" stroke="#9b5fd0" strokeWidth="1.5"/>
        <circle cx="290" cy="100" r="70" fill="#6B2FA0" fillOpacity=".18" stroke="#6B2FA0" strokeWidth="1.5"/>
        <circle cx="240" cy="175" r="70" fill="#c49ee8" fillOpacity=".18" stroke="#c49ee8" strokeWidth="1.5"/>
        <text x="148" y="95" textAnchor="middle" fill="#55247e" fontSize="11" fontFamily="'Work Sans',sans-serif" fontWeight="700">Autonomy</text>
        <text x="148" y="108" textAnchor="middle" fill="#55247e" fontSize="9" fontFamily="'Work Sans',sans-serif">Choice · Agency</text>
        <text x="332" y="95" textAnchor="middle" fill="#3a1060" fontSize="11" fontFamily="'Work Sans',sans-serif" fontWeight="700">Competence</text>
        <text x="332" y="108" textAnchor="middle" fill="#3a1060" fontSize="9" fontFamily="'Work Sans',sans-serif">Mastery · Growth</text>
        <text x="240" y="196" textAnchor="middle" fill="#6B2FA0" fontSize="11" fontFamily="'Work Sans',sans-serif" fontWeight="700">Relatedness</text>
        <text x="240" y="207" textAnchor="middle" fill="#6B2FA0" fontSize="9" fontFamily="'Work Sans',sans-serif">Belonging · Connection</text>
        {/* Centre label */}
        <circle cx="240" cy="120" r="22" fill="white" stroke="#6B2FA0" strokeWidth="1.5"/>
        <text x="240" y="117" textAnchor="middle" fill="#55247e" fontSize="9.5" fontFamily="'Work Sans',sans-serif" fontWeight="700">Intrinsic</text>
        <text x="240" y="129" textAnchor="middle" fill="#55247e" fontSize="9.5" fontFamily="'Work Sans',sans-serif" fontWeight="700">Motivation</text>
      </svg>
    ),
  },
  {
    id:'crp', label:'Culturally Responsive Pedagogy', short:'CRP (Gay, Ladson-Billings)',
    color:'#6B2FA0',
    tagline:'The curriculum must mirror the learner before it can open windows.',
    description:'Culturally Responsive Pedagogy affirms learners\' cultural identities as assets, uses community knowledge as curriculum content, and actively challenges inequity. CRP-informed TLMs use local names, community contexts, indigenous knowledge systems, and learner-authored examples.',
    inPractice:[
      'Use locally-relevant names, places, foods, and stories in worked examples',
      'Invite learners to bring and share knowledge from their home cultures',
      'Audit existing TLMs for whose knowledge is centred and whose is absent',
    ],
    Diagram: () => (
      <svg viewBox="0 0 480 200" style={{width:'100%',display:'block'}}>
        <rect width="480" height="200" fill="#faf7ff"/>
        {/* Flow: Community → Assets → Classroom → Curriculum */}
        {[
          {lbl:'Community\nKnowledge',    x:55,  color:'#3a1060'},
          {lbl:'Cultural\nAssets',        x:165, color:'#55247e'},
          {lbl:'Classroom\nContent',      x:295, color:'#6B2FA0'},
          {lbl:'Affirmed\nCurriculum',    x:405, color:'#9b5fd0'},
        ].map(({lbl,x,color},i)=>(
          <g key={i}>
            {i<3 && <polygon points={`${x+55},90 ${x+70},100 ${x+55},110`} fill={color} opacity=".5"/>}
            <rect x={x-45} y="74" width="90" height="52" rx="8" fill={color}/>
            {lbl.split('\n').map((l,j)=>(
              <text key={j} x={x} y={94+j*16} textAnchor="middle" fill="white" fontSize="10" fontFamily="'Work Sans',sans-serif" fontWeight="600">{l}</text>
            ))}
          </g>
        ))}
        {/* Bottom note */}
        {['Names from community','Local stories','Home language welcome','Lived experience cited'].map((t,i)=>(
          <g key={i}>
            <circle cx={55+i*115} cy="155" r="5" fill="#c49ee8"/>
            <text x={55+i*115} y="172" textAnchor="middle" fill="#55247e" fontSize="8.5" fontFamily="'Work Sans',sans-serif">{t}</text>
          </g>
        ))}
      </svg>
    ),
  },
  {
    id:'indig', label:'Indigenous Contextualization', short:'Land-based, Community-rooted',
    color:'#9b5fd0',
    tagline:'Knowledge is held in place, story, and relationship.',
    description:'Indigenous contextualization situates learning within land, community, and relational knowledge systems that predate and exist alongside Western academic frameworks. It is not a "topic" to cover — it is a way of organising TLMs so that indigenous knowledge-holders are positioned as experts, and learning is connected to place.',
    inPractice:[
      'Begin with an acknowledgement of the land and community whose knowledge you are building on',
      'Invite elders or community knowledge-holders as co-designers or guest voices',
      'Replace generic examples with place-specific ones: local plants, waterways, trades, stories',
    ],
    Diagram: () => (
      <svg viewBox="0 0 480 210" style={{width:'100%',display:'block'}}>
        <rect width="480" height="210" fill="#faf7ff"/>
        {/* Circular flow */}
        <circle cx="240" cy="108" r="80" fill="none" stroke="#9b5fd0" strokeWidth="2" strokeDasharray="6,4" opacity=".5"/>
        {/* 4 station labels on circle */}
        {[
          {lbl:'Land',      x:240, y:28},
          {lbl:'Story',     x:320, y:108},
          {lbl:'Learning',  x:240, y:188},
          {lbl:'Community', x:160, y:108},
        ].map(({lbl,x,y},i)=>(
          <g key={i}>
            <circle cx={x} cy={y} r="24" fill="#9b5fd0" opacity=".75"/>
            <text x={x} y={y+4} textAnchor="middle" fill="white" fontSize="11" fontFamily="'Work Sans',sans-serif" fontWeight="700">{lbl}</text>
            {/* Arrow arcs — approximate */}
          </g>
        ))}
        {/* Centre */}
        <circle cx="240" cy="108" r="28" fill="white" stroke="#9b5fd0" strokeWidth="1.5"/>
        <text x="240" y="105" textAnchor="middle" fill="#55247e" fontSize="9" fontFamily="'Work Sans',sans-serif" fontWeight="700">Relational</text>
        <text x="240" y="117" textAnchor="middle" fill="#55247e" fontSize="9" fontFamily="'Work Sans',sans-serif" fontWeight="700">Knowledge</text>
        <text x="240" y="205" textAnchor="middle" fill="#8878a8" fontSize="9" fontFamily="'JetBrains Mono',monospace">"LEARNING IS ALWAYS SITUATED"</text>
      </svg>
    ),
  },
];

const TheoryLibrary = ({ onClose }) => {
  const [active, setActive] = useState(THEORY_LIBRARY[0].id);
  const theory = THEORY_LIBRARY.find(t=>t.id===active);

  return (
    <div className="theory-panel">
      {/* Nav */}
      <div className="theory-nav">
        <div className="row between" style={{padding:'0 6px 16px', borderBottom:'1px solid var(--border)', marginBottom:12}}>
          <div style={{fontWeight:700, fontSize:14, color:'var(--accent)'}}>Theory Library</div>
          <button className="btn ghost sm" onClick={onClose} style={{padding:'4px 8px'}}>✕ Close</button>
        </div>
        {THEORY_LIBRARY.map(t=>(
          <button key={t.id} className={'theory-btn '+(active===t.id?'active':'')} onClick={()=>setActive(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="theory-content anim-fade" key={active}>
        <div className="eyebrow mb-1">{theory.short}</div>
        <h1 className="serif" style={{fontSize:34, color:'var(--accent)', marginBottom:6}}>{theory.label}</h1>
        <p className="lede mb-3" style={{fontStyle:'italic', color:'var(--ink-3)'}}>&ldquo;{theory.tagline}&rdquo;</p>
        <p style={{maxWidth:'64ch', fontSize:14.5, lineHeight:1.65}}>{theory.description}</p>

        {/* Visual diagram */}
        <div className="theory-diagram mt-3">
          <theory.Diagram/>
        </div>

        {/* In practice */}
        <div className="theory-in-practice mt-3">
          <div style={{fontWeight:700, fontSize:13, color:'var(--accent)', marginBottom:10}}>What this looks like in your TLM:</div>
          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            {theory.inPractice.map((tip,i)=>(
              <div key={i} className="row" style={{gap:10, alignItems:'flex-start'}}>
                <div style={{width:22, height:22, borderRadius:'50%', background:'var(--accent)', color:'#fff', display:'grid', placeItems:'center', fontSize:11, fontWeight:700, flexShrink:0}}>{i+1}</div>
                <span style={{fontSize:13.5, lineHeight:1.5, color:'var(--ink-2)'}}>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{height:80}}/>
      </div>
    </div>
  );
};

Object.assign(window, {TheoryLibrary, THEORY_LIBRARY});
