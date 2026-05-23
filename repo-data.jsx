// Template repository data — 66 templates across 12 TLM types

const REPO_TLM_TYPES = [
  {id:'lesson',   label:'Lesson Plan',          color:'#d97757', icon:'L', count:6},
  {id:'worksheet',label:'Worksheet',             color:'#4a7a8c', icon:'W', count:6},
  {id:'slides',   label:'Slideshow',             color:'#7a5cb8', icon:'S', count:6},
  {id:'orga',     label:'Graphic Organizer',     color:'#5a8d4f', icon:'G', count:6},
  {id:'assess',   label:'Assessment',            color:'#c2410c', icon:'A', count:6},
  {id:'poster',   label:'Infographic / Poster',  color:'#b8862a', icon:'I', count:6},
  {id:'pamphlet', label:'Learning Pamphlet',     color:'#4a7a8c', icon:'P', count:5},
  {id:'story',    label:'Storybook',             color:'#d97757', icon:'B', count:5},
  {id:'textbook', label:'Textbook Chapter',      color:'#3a3a3a', icon:'T', count:5},
  {id:'case',     label:'Case Study',            color:'#7a5cb8', icon:'C', count:5},
  {id:'sim',      label:'Simulation',            color:'#5a8d4f', icon:'M', count:5},
  {id:'video',    label:'Video / Lecture',       color:'#4a7a8c', icon:'V', count:5},
];

const REPO_TEMPLATES = {
  lesson: [
    {id:'L1', name:'5E Inquiry',          theories:['udl','bloom'],      tone:'Engage → Explore → Explain → Elaborate → Evaluate', tag:'Popular'},
    {id:'L2', name:'Direct Instruction',  theories:['vyg','cog'],        tone:'I Do / We Do / You Do — gradual release'},
    {id:'L3', name:'UDL Multi-path',      theories:['udl','selfdet'],    tone:'3 parallel learning paths, one shared goal', tag:'Inclusive pick'},
    {id:'L4', name:'Story Arc',           theories:['crp','kolb'],       tone:'Narrative structure woven across the session'},
    {id:'L5', name:'Backwards Design',    theories:['bloom','udl'],      tone:'Goals → Evidence → Activities (UbD-aligned)'},
    {id:'L6', name:'Workshop Model',      theories:['vyg','strengths'],  tone:'Mini-lesson · Independent practice · Share'},
  ],
  worksheet: [
    {id:'W1', name:'Tiered Practice',     theories:['udl','vyg'],        tone:'Three difficulty paths — same learning goal', tag:'Inclusive pick'},
    {id:'W2', name:'Choice Board',        theories:['udl','selfdet'],    tone:'Learner picks from a 3×3 menu of tasks'},
    {id:'W3', name:"Bloom's Ladder",      theories:['bloom'],            tone:'Remember → Understand → Apply → Analyse → Evaluate → Create'},
    {id:'W4', name:'Visual Prompt',       theories:['udl','cog'],        tone:'Image-first with structured writing scaffold'},
    {id:'W5', name:'Concept Map Fill',    theories:['cog','vyg'],        tone:'Pre-structured organizer with guided blanks'},
    {id:'W6', name:'Exit Ticket',         theories:['udl','strengths'],  tone:'3 prompts, learner chooses one to answer'},
  ],
  slides: [
    {id:'S1', name:'UDL Annotated Deck',  theories:['udl'],              tone:'Alt-text strips, multi-modal cue sheet per slide', tag:'Accessible'},
    {id:'S2', name:'Visual-First',        theories:['cog','udl'],        tone:'Full-bleed image + minimal bottom text'},
    {id:'S3', name:'Two-Column',          theories:['vyg','cog'],        tone:'Content left, visual scaffold or notes right'},
    {id:'S4', name:'Slide + Notes',       theories:['udl','knowles'],    tone:'Slide above, speaker notes always visible'},
    {id:'S5', name:'Question-Driven',     theories:['bloom','selfdet'],  tone:'Large driving prompt + learner choice options'},
    {id:'S6', name:'Storyboard Deck',     theories:['crp','kolb'],       tone:'4-panel narrative layout per slide'},
  ],
  orga: [
    {id:'G1', name:'Concept Map',         theories:['cog','connect'],    tone:'Central idea with radiating connections'},
    {id:'G2', name:'Fishbone',            theories:['bloom','cog'],      tone:'Cause-and-effect spine diagram'},
    {id:'G3', name:'Venn Diagram',        theories:['bloom'],            tone:'Compare two concepts or groups'},
    {id:'G4', name:'KWL+',               theories:['selfdet','udl'],    tone:'Know / Want / Learned / Reflect — 4 columns', tag:'Popular'},
    {id:'G5', name:'Story Map',           theories:['crp','kolb'],       tone:'Sequential narrative flow with boxes'},
    {id:'G6', name:'Tree Chart',          theories:['bloom','connect'],  tone:'Hierarchy and classification branching'},
  ],
  assess: [
    {id:'A1', name:'Exit Ticket',         theories:['udl','bloom'],      tone:'3 prompts, learner picks one — asset-based', tag:'Popular'},
    {id:'A2', name:'Performance Task',    theories:['kolb','hcd'],       tone:'Rubric-based authentic demonstration'},
    {id:'A3', name:'Portfolio Prompt',    theories:['strengths','selfdet'],tone:'Reflective, growth-oriented journaling'},
    {id:'A4', name:'Peer Assessment',     theories:['udl','selfdet'],    tone:'Structured peer feedback with checklist'},
    {id:'A5', name:'Multi-modal Quiz',    theories:['udl'],              tone:'Read / Draw / Listen options per question', tag:'Inclusive pick'},
    {id:'A6', name:'Anecdotal Record',    theories:['strengths'],        tone:'Teacher observation and evidence log'},
  ],
  poster: [
    {id:'P1', name:'Visual Glossary',     theories:['udl','cog'],        tone:'Term + definition + visual icon — 6-cell grid'},
    {id:'P2', name:'Process Flow',        theories:['kolb','cog'],       tone:'Numbered steps with directional arrows'},
    {id:'P3', name:'Data Story',          theories:['bloom','connect'],  tone:'Chart + callout annotations + interpretation'},
    {id:'P4', name:'Comparison',          theories:['bloom'],            tone:'Two concepts side by side for contrast'},
    {id:'P5', name:'Identity Map',        theories:['crp','strengths'],  tone:'Community-rooted, learner-centred radial', tag:'Inclusive pick'},
    {id:'P6', name:'Anchor Chart',        theories:['vyg'],              tone:'Bold classroom reference — key concepts at a glance'},
  ],
  pamphlet: [
    {id:'PA1',name:'Tri-fold',            theories:['udl','crp'],        tone:'Classic 3-panel brochure', tag:'Popular'},
    {id:'PA2',name:'Family Guide',        theories:['crp','udl'],        tone:'Plain-language take-home sheet with sidebar'},
    {id:'PA3',name:'Self-Advocacy',       theories:['selfdet','strengths'],tone:'Learner voice, rights and resources'},
    {id:'PA4',name:'Step-by-Step',        theories:['cog','vyg'],        tone:'Numbered process guide with icons'},
    {id:'PA5',name:'Quick Reference',     theories:['cog','udl'],        tone:'Dense at-a-glance two-column card'},
  ],
  story: [
    {id:'ST1',name:'Picture Book Spread', theories:['crp','udl'],        tone:'Full-page illustration + minimal text', tag:'Popular'},
    {id:'ST2',name:'Chapter Book',        theories:['bloom','crp'],      tone:'Running text with inline illustration'},
    {id:'ST3',name:'Decodable Reader',    theories:['udl','cog'],        tone:'Large type, phonics-supportive structure'},
    {id:'ST4',name:'Bilingual Story',     theories:['crp','udl'],        tone:'Side-by-side language columns', tag:'Inclusive pick'},
    {id:'ST5',name:'Wordless Journey',    theories:['udl','crp'],        tone:'4-panel image sequence — no text required'},
  ],
  textbook: [
    {id:'T1', name:'Chunked Chapter',     theories:['cog','vyg'],        tone:'Main text + sidebar + key concept box', tag:'Popular'},
    {id:'T2', name:'Inquiry Chapter',     theories:['bloom','kolb'],     tone:'Driving question leads every section'},
    {id:'T3', name:'Layered Text',        theories:['udl','vyg'],        tone:'3 complexity levels, colour-coded', tag:'Inclusive pick'},
    {id:'T4', name:'Visual Chapter',      theories:['udl','cog'],        tone:'Diagram-dominant with captioned figures'},
    {id:'T5', name:'Socratic Text',       theories:['bloom','selfdet'],  tone:'Questions woven between reading passages'},
  ],
  case: [
    {id:'C1', name:'HCD Scenario',        theories:['hcd','kolb'],       tone:'Empathise → Define → Ideate → Test'},
    {id:'C2', name:'Ethics Dilemma',      theories:['crp','selfdet'],    tone:'Stakeholder perspectives and deliberation'},
    {id:'C3', name:'Data Case',           theories:['bloom','connect'],  tone:'Evidence table + analysis scaffold'},
    {id:'C4', name:'Narrative Case',      theories:['crp','kolb'],       tone:'Story section → What? So what? Now what?'},
    {id:'C5', name:'Comparative',         theories:['bloom'],            tone:'Two cases side by side for critical analysis'},
  ],
  sim: [
    {id:'M1', name:'Role Card Set',       theories:['kolb','hcd'],       tone:'Character + context + goal — printable cards'},
    {id:'M2', name:'Decision Tree',       theories:['bloom','connect'],  tone:'Branching choices with consequences'},
    {id:'M3', name:'Board Game',          theories:['kolb','udl'],       tone:'Path-based game with learning stops', tag:'Popular'},
    {id:'M4', name:'Debate Script',       theories:['bloom','selfdet'],  tone:'For / Against columns + rebuttal + reflection'},
    {id:'M5', name:'Fishbowl Protocol',   theories:['selfdet','crp'],    tone:'Inner/outer ring discussion scaffold'},
  ],
  video: [
    {id:'V1', name:'Two-Column Script',   theories:['udl','cog'],        tone:'Visual cue | Narration — side-by-side rows', tag:'Popular'},
    {id:'V2', name:'Storyboard Script',   theories:['udl','crp'],        tone:'Frame sketch + timecode + narration text'},
    {id:'V3', name:'Interactive Video',   theories:['udl','selfdet'],    tone:'Pause prompts and learner choice points', tag:'Inclusive pick'},
    {id:'V4', name:'Captions Sheet',      theories:['udl'],              tone:'Timecode + caption + audio description table'},
    {id:'V5', name:'Explainer Arc',       theories:['bloom','cog'],      tone:'Hook → Content → Call to action'},
  ],
};

// Theory info (subset used in repo)
const REPO_THEORIES = {
  udl:      {short:'UDL',         klass:'theory'},
  bloom:    {short:"Bloom's",     klass:'theory alt'},
  vyg:      {short:'Scaffold',    klass:'theory'},
  cog:      {short:'Cog Load',    klass:'theory alt'},
  kolb:     {short:'Experiential',klass:'theory'},
  knowles:  {short:'Andragogy',   klass:'theory alt'},
  connect:  {short:'Connectivism',klass:'theory'},
  hcd:      {short:'HCD',         klass:'theory alt'},
  strengths:{short:'Strengths',   klass:'theory'},
  selfdet:  {short:'Self-Det',    klass:'theory alt'},
  crp:      {short:'CRP',         klass:'theory'},
  indig:    {short:'Indigenous',  klass:'theory alt'},
};

Object.assign(window, {REPO_TLM_TYPES, REPO_TEMPLATES, REPO_THEORIES});
