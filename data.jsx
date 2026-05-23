// Updated data — personas without numbers/grades, Indian languages, grade context

const THEORIES = {
  udl:      {id:'udl',     label:'UDL (CAST)',                  short:'UDL',          klass:'theory',     blurb:'Multiple means of engagement, representation, action & expression.'},
  bloom:    {id:'bloom',   label:"Bloom's Taxonomy",            short:"Bloom's",       klass:'theory alt', blurb:'Cognitive ladder — from remembering to creating.'},
  vyg:      {id:'vyg',     label:'Scaffolding (Vygotsky)',      short:'Scaffold',      klass:'theory',     blurb:'Zone of proximal development with structured supports.'},
  cog:      {id:'cog',     label:'Cognitive Load (Sweller)',    short:'Cog Load',      klass:'theory alt', blurb:'Reduce extraneous load, chunk intrinsic load.'},
  kolb:     {id:'kolb',    label:'Experiential (Kolb)',         short:'Experiential',  klass:'theory',     blurb:'Concrete experience → reflection → abstraction → testing.'},
  knowles:  {id:'knowles', label:"Knowles' Andragogy",          short:'Andragogy',     klass:'theory alt', blurb:'Self-directed, relevance-driven adult learning.'},
  connect:  {id:'connect', label:'Connectivism',                short:'Connectivism',  klass:'theory',     blurb:'Learning across networks, nodes and tools.'},
  hcd:      {id:'hcd',     label:'Human-Centred Design',        short:'HCD',           klass:'theory alt', blurb:'Empathy, prototyping, iteration.'},
  strengths:{id:'strengths',label:'Strengths-Based',            short:'Strengths',     klass:'theory',     blurb:'Lead with capability, not deficit.'},
  selfdet:  {id:'selfdet', label:'Self-Determination',          short:'Self-Det',      klass:'theory alt', blurb:'Autonomy, competence, relatedness.'},
  crp:      {id:'crp',     label:'Culturally Responsive',       short:'CRP',           klass:'theory',     blurb:'Affirm cultural assets, mirror learners.'},
  indig:    {id:'indig',   label:'Indigenous Contextualization',short:'Indigenous',    klass:'theory alt', blurb:'Land-based, community-rooted knowledge.'},
};

const TLM_TYPES = [
  {id:'lesson',   label:'Lesson plan',          desc:'Structured plan for a session or unit',    icon:'L'},
  {id:'worksheet',label:'Worksheet',            desc:'Practice activities with guided steps',    icon:'W'},
  {id:'slides',   label:'Slideshow',            desc:'Presentation-style teaching materials',    icon:'S'},
  {id:'orga',     label:'Graphic organizer',    desc:'Visual scaffolds — concept maps, T-charts',icon:'G'},
  {id:'assess',   label:'Assessment',           desc:'Formative or summative checks',            icon:'A'},
  {id:'poster',   label:'Infographic / Poster', desc:'Single-glance reference material',         icon:'I'},
  {id:'pamphlet', label:'Learning pamphlet',    desc:'Short take-home booklet',                  icon:'P'},
  {id:'story',    label:'Storybook',            desc:'Narrative-based learning text',            icon:'B'},
  {id:'textbook', label:'Textbook chapter',     desc:'Long-form structured reading',             icon:'T'},
  {id:'case',     label:'Case study',           desc:'Scenario-based learning',                  icon:'C'},
  {id:'sim',      label:'Simulation',           desc:'Interactive role-play or model',           icon:'M'},
  {id:'video',    label:'Video / Lecture script',desc:'Spoken or recorded content',             icon:'V'},
];

const AUDIENCES = [
  {id:'k5',   label:'K–5 (Primary)'},
  {id:'m68',  label:'Grades 6–8 (Middle)'},
  {id:'h912', label:'Grades 9–12 (Secondary)'},
  {id:'he',   label:'Higher Ed faculty'},
  {id:'adult',label:'Adult learners'},
  {id:'train',label:'Trainers / Capacity building'},
];

// Grade context for generation — drives vocabulary & rigor
const GRADE_CONTEXT = {
  k5:   {label:'Primary (K–5)',      detail:'Ages 5–11. Simple language, concrete examples, pictures, hands-on tasks. Bloom\'s focus: Remember, Understand, Apply. Short sentences (max 12 words). Visual cues essential.'},
  m68:  {label:'Middle School (6–8)',detail:'Ages 11–14. Age-appropriate vocabulary, some abstract ideas, group inquiry. Bloom\'s focus: Apply, Analyse. Evidence-based reasoning emerging.'},
  h912: {label:'Secondary (9–12)',   detail:'Ages 14–18. Formal academic language, abstract and critical thinking. Bloom\'s focus: Analyse, Evaluate, Create. Exam-aligned language, structured arguments, citations.'},
  he:   {label:'Higher Education',   detail:'Undergraduate/postgraduate. Academic register, theoretical frameworks, graduate attributes. Critical synthesis, literature engagement, research literacy expected.'},
  adult:{label:'Adult Learners',     detail:'Working adults. Connect to prior experience, practical relevance. Problem-centred, self-directed. Avoid jargon. Respect lived expertise.'},
  train:{label:'Trainers / Facilitators', detail:'Professional development. Reflective practice, facilitation skills, peer learning, transfer to practice. Models-of-practice lens.'},
};

// Indian languages only
const LANGUAGES = [
  'English','Hindi','Tamil','Telugu','Kannada','Malayalam','Marathi','Bengali','Gujarati','Assamese'
];

const TEMPLATES = {
  lesson: [
    {id:'l1',name:'UDL 5E Lesson',      theories:['udl','bloom'],       format:'docx',tone:'Inquiry-led, multi-modal'},
    {id:'l2',name:'Scaffolded Reading', theories:['vyg','cog'],         format:'docx',tone:'Guided release of responsibility'},
    {id:'l3',name:'Experiential Lab',   theories:['kolb','udl'],        format:'docx',tone:'Hands-on with reflection'},
    {id:'l4',name:'Strengths-First',    theories:['strengths','selfdet'],format:'docx',tone:'Asset-based, learner-voice'},
    {id:'l5',name:'Culturally Anchored',theories:['crp','indig'],       format:'docx',tone:'Community-rooted, story-led'},
    {id:'l6',name:'Andragogy Workshop', theories:['knowles','hcd'],     format:'docx',tone:'Adult learners, problem-centred'},
    {id:'l7',name:'Connectivist Module',theories:['connect','udl'],     format:'docx',tone:'Networked, resource-rich'},
    {id:'l8',name:'Low-Load Direct',    theories:['cog','vyg'],         format:'docx',tone:'Tight chunks, worked examples'},
  ],
  worksheet: [
    {id:'w1',name:'Tiered Practice',    theories:['udl','vyg'],         format:'docx',tone:'Three difficulty paths'},
    {id:'w2',name:'Picture-First',      theories:['udl','cog'],         format:'docx',tone:'Visual supports throughout'},
    {id:'w3',name:'Bloom Ladder',       theories:['bloom'],             format:'docx',tone:'Recall → Create'},
    {id:'w4',name:'Strengths Inventory',theories:['strengths','selfdet'],format:'docx',tone:'Self-directed reflection'},
    {id:'w5',name:'Cultural Mirror',    theories:['crp'],               format:'docx',tone:'Localised names & scenarios'},
    {id:'w6',name:'Choice Board',       theories:['udl','selfdet'],     format:'docx',tone:'Pick-your-task grid'},
    {id:'w7',name:'Concept Map Fill',   theories:['cog','vyg'],         format:'docx',tone:'Graphic-organised practice'},
    {id:'w8',name:'Real-World Problem', theories:['kolb','hcd'],        format:'docx',tone:'Authentic scenarios'},
  ],
  slides: [
    {id:'s1',name:'UDL Deck (16:9)',    theories:['udl'],               format:'pptx',tone:'Captioned, alt-text ready'},
    {id:'s2',name:'Scaffolded Lecture', theories:['vyg','cog'],         format:'pptx',tone:'Worked examples + prompts'},
    {id:'s3',name:'Story Arc Deck',     theories:['crp','bloom'],       format:'pptx',tone:'Narrative-driven'},
    {id:'s4',name:'Visual-First Deck',  theories:['udl','cog'],         format:'pptx',tone:'Imagery > bullets'},
    {id:'s5',name:'Networked Resources',theories:['connect'],           format:'pptx',tone:'Links, QR, side-quests'},
    {id:'s6',name:'Adult Learner Deck', theories:['knowles'],           format:'pptx',tone:'Discussion-prompt heavy'},
    {id:'s7',name:'Experiential Workshop',theories:['kolb'],            format:'pptx',tone:'Activity → debrief flow'},
    {id:'s8',name:'Land-Based Slides',  theories:['indig','crp'],       format:'pptx',tone:'Place-rooted teaching'},
  ],
  orga:    [{id:'g1',name:'Concept Map',theories:['cog','vyg'],format:'docx',tone:'Hub-and-spoke'},{id:'g2',name:'T-Chart',theories:['bloom'],format:'docx',tone:'Compare/contrast'},{id:'g3',name:'KWL+',theories:['selfdet','udl'],format:'docx',tone:'Know/Want/Learned/Reflect'},{id:'g4',name:'Story Web',theories:['crp','kolb'],format:'docx',tone:'Narrative mapping'}],
  assess:  [{id:'a1',name:'Exit Ticket',theories:['udl','bloom'],format:'docx',tone:'3-question quick check'},{id:'a2',name:'Performance Task',theories:['kolb','hcd'],format:'docx',tone:'Authentic demonstration'},{id:'a3',name:'Portfolio Rubric',theories:['strengths','selfdet'],format:'docx',tone:'Growth-oriented'},{id:'a4',name:'Multi-modal Quiz',theories:['udl'],format:'docx',tone:'Read/listen/draw options'}],
  poster:  [{id:'p1',name:'Visual Glossary',theories:['cog','udl'],format:'pdf',tone:'One concept, multiple representations'},{id:'p2',name:'Process Infographic',theories:['kolb'],format:'pdf',tone:'Step-by-step flow'},{id:'p3',name:'Identity Mirror',theories:['crp','strengths'],format:'pdf',tone:'Community-rooted'},{id:'p4',name:'Anchor Chart',theories:['vyg'],format:'pdf',tone:'Classroom reference'}],
  pamphlet:[{id:'pa1',name:'Family Take-Home',theories:['crp','udl'],format:'pdf',tone:'Plain-language, multilingual-ready'},{id:'pa2',name:'Self-Advocacy Guide',theories:['selfdet','strengths'],format:'pdf',tone:'Learner-voice forward'}],
  story:   [{id:'st1',name:'Mirror Story',theories:['crp','indig'],format:'pdf',tone:'Reflects learner identity'},{id:'st2',name:'Window Story',theories:['crp','bloom'],format:'pdf',tone:'Opens to other worlds'},{id:'st3',name:'Decodable + Picture',theories:['udl','cog'],format:'pdf',tone:'Literacy-supportive'}],
  textbook:[{id:'t1',name:'Chunked Chapter',theories:['cog','vyg'],format:'docx',tone:'Pre-teach, model, practice'},{id:'t2',name:'Inquiry Chapter',theories:['bloom','kolb'],format:'docx',tone:'Driving question per section'}],
  case:    [{id:'c1',name:'HCD Case',theories:['hcd','kolb'],format:'docx',tone:'Empathy → solution'},{id:'c2',name:'Equity Dilemma',theories:['crp','selfdet'],format:'docx',tone:'Discussion-driven'}],
  sim:     [{id:'m1',name:'Role-Play Card Set',theories:['kolb','hcd'],format:'pdf',tone:'Scenario + roles + debrief'},{id:'m2',name:'Decision Tree Sim',theories:['bloom','connect'],format:'pdf',tone:'Branching choices'}],
  video:   [{id:'v1',name:'Captioned Lecture Script',theories:['udl','cog'],format:'docx',tone:'Visual + audio cue sheet'},{id:'v2',name:'Story-Led Explainer',theories:['crp','bloom'],format:'docx',tone:'3-act narrative'}],
};

// Personas — descriptions only, no class size or grade level
const PERSONAS = [
  {id:'p_mixed',    title:'Mixed-ability group',      detail:'A heterogeneous class with varied learning profiles, including learners with IEPs and those for whom English is an additional language.',                          classSize:28,composition:'heterogeneous',needs:['dyslexia','adhd','eal'],context:'urban-public'},
  {id:'p_inclusive',title:'Inclusive classroom',      detail:'A diverse group that includes a learner with low vision and others across a wide range of reading and processing abilities.',                                       classSize:32,composition:'heterogeneous',needs:['vision','literacy'],context:'urban-public'},
  {id:'p_rural',    title:'Rural multi-grade group',  detail:'A small, mixed-grade cohort in a multilingual community where learners bring rich home-language knowledge and land-based experience.',                              classSize:18,composition:'multi-grade',needs:['eal','systemic'],context:'rural-indigenous'},
  {id:'p_adult',    title:'Adult vocational learners', detail:'Working adults returning to formal learning, with varied prior knowledge and strong real-world experience. Self-directed and time-constrained.',                   classSize:14,composition:'heterogeneous',needs:['literacy','mental-health'],context:'capacity-building'},
  {id:'p_he',       title:'Higher-education seminar',  detail:'A university cohort with diverse access needs, including neurodivergent learners and students who use mobility aids. Academically able and research-literate.',    classSize:22,composition:'heterogeneous',needs:['autism','mobility'],context:'higher-ed'},
  {id:'p_homog',    title:'Homogeneous cohort',        detail:'A relatively uniform group with shared background, similar prior attainment, and strong literacy skills. Pace can be accelerated.',                              classSize:24,composition:'homogeneous',needs:[],context:'urban-public'},
];

const NEEDS = [
  {id:'dyslexia',     label:'Dyslexia / reading'},
  {id:'adhd',         label:'ADHD / attention'},
  {id:'autism',       label:'Autism spectrum'},
  {id:'vision',       label:'Low vision / blind'},
  {id:'hearing',      label:'Deaf / hard of hearing'},
  {id:'mobility',     label:'Mobility / motor'},
  {id:'eal',          label:'EAL / multilingual'},
  {id:'literacy',     label:'Literacy challenges'},
  {id:'mental-health',label:'Mental health'},
  {id:'systemic',     label:'Systemic barriers'},
  {id:'gifted',       label:'Gifted / accelerated'},
  {id:'trauma',       label:'Trauma-informed'},
];

const CONTEXTS = [
  {id:'urban-public',    label:'Urban public school'},
  {id:'rural-indigenous',label:'Rural / indigenous community'},
  {id:'higher-ed',       label:'Higher education'},
  {id:'capacity-building',label:'Capacity-building / NGO'},
  {id:'home-school',     label:'Home-school / blended'},
  {id:'online',          label:'Fully online'},
];

const SAMPLE_TLM = {
  filename:'Photosynthesis_Lesson_v3.docx',
  title:'Photosynthesis — How Plants Make Food',
  grade:'Secondary',
  duration:'45 minutes',
  objective:'Students will define photosynthesis and identify the four ingredients plants need to make food.',
  extractedText:`Photosynthesis — How Plants Make Food

Learning Objective: Students will define photosynthesis and identify the four ingredients plants need to make food.

Today we will learn about photosynthesis. Read pages 42–47 of the textbook silently. Then answer the ten questions on page 48 in complete sentences. Submit the worksheet before the end of class.

Key Vocabulary
Photosynthesis, chlorophyll, glucose, stomata, carbon dioxide, oxygen.

Read the definitions in the glossary. Memorize the terms for the quiz on Friday.

Practice
Label the diagram of a leaf. Write a 200-word essay explaining how photosynthesis works.

Homework
Complete pages 48–50. Be ready to be called on tomorrow.`,
  detected:[
    {theory:'udl',     issue:'Single-modal: read & write only. Add listen / draw / build options.',   severity:'high'},
    {theory:'cog',     issue:'Multiple instructions stacked in one paragraph — split into discrete steps.', severity:'high'},
    {theory:'bloom',   issue:'All tasks at Remember level only. Ladder up to Apply / Analyse / Create.', severity:'high'},
    {theory:'vyg',     issue:'No modelling or guided practice before independent recall is required.',  severity:'med'},
    {theory:'strengths',issue:'"Be ready to be called on" cues compliance, not capability.',           severity:'low'},
    {theory:'crp',     issue:'Generic leaf diagram — anchor in plants from learners\' own community.', severity:'low'},
  ],
};

Object.assign(window, {THEORIES,TLM_TYPES,AUDIENCES,GRADE_CONTEXT,LANGUAGES,TEMPLATES,PERSONAS,NEEDS,CONTEXTS,SAMPLE_TLM});
