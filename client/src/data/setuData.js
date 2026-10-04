export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Domains', href: '#domains' },
  { name: 'Events', href: '#events' },
  { name: 'Recruitment', href: '#recruitment' },
  { name: 'Team', href: '#team' },
  { name: 'Stories', href: '#stories' },
];

export const STATS = [
  { label: 'Active Members', value: 20, suffix: '+', desc: 'Engineers, designers & organizers uniting across branches' },
  { label: 'Events', value: 15, suffix: '+', desc: 'Hands-on building sprints, dev summits & tech jams' },
  { label: 'Connected Minds', value: '∞', isInfinity: true, desc: 'Empowering students to turn problem statements into reality' },
];

export const PILLARS = [
  {
    title: 'Identify Real Problems',
    desc: 'We look around our campus and society for friction—inefficient systems, disconnected resources, and unmet needs.',
    tag: 'Problem Discovery',
  },
  {
    title: 'Solve Through Technology',
    desc: 'SETU acts as the structural bridge: solving real problems using technology, bringing student creators together to turn ideas into working platforms.',
    tag: 'Tech Engineering',
  },
  {
    title: 'Deploy & Empower People',
    desc: 'We do not stop at classroom theory. We launch live software, run impactful workshops, and nurture student creators into industry leaders.',
    tag: 'Real Impact',
  },
];

export const DOMAINS = [
  {
    id: 'outreach',
    title: 'OUTREACH',
    tagline: 'Connect communities, create bridges.',
    description: 'Building meaningful connections beyond campus walls. We forge partnerships with NGOs, corporates, and other institutions to amplify SETU\'s mission and drive social impact at scale.',
    roles: ['Partnership Development', 'Community Relations', 'Sponsorship & Funding', 'Stakeholder Engagement'],
    tools: ['LinkedIn', 'Google Workspace', 'Notion', 'HubSpot', 'Slack'],
    lightBg: 'bg-[#EFF6FF]',
    accent: '#3B82F6',
    borderGlow: 'hover:border-[#3B82F6]',
  },
  {
    id: 'field-operations',
    title: 'FIELD OPERATIONS',
    tagline: 'Execute on the ground, deliver impact.',
    description: 'The boots-on-the-ground team. We plan and execute field visits, community drives, logistics coordination, and on-site activations that bring SETU\'s vision to life in the real world.',
    roles: ['Logistics & Coordination', 'On-Site Execution', 'Volunteer Management', 'Resource Planning'],
    tools: ['Google Maps', 'Airtable', 'WhatsApp', 'Google Sheets', 'Trello'],
    lightBg: 'bg-[#FFF7ED]',
    accent: '#EA580C',
    borderGlow: 'hover:border-[#EA580C]',
  },
  {
    id: 'tech',
    title: 'TECH',
    tagline: 'Build, experiment and innovate.',
    description: 'The core engineering engine. We turn problem statements into scalable web platforms, smart mobile apps, API integrations, and hackathon prototypes.',
    roles: ['Fullstack Web Dev', 'Cloud & DevOps', 'App Development', 'AI/ML Solutions'],
    tools: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Tailwind'],
    lightBg: 'bg-[#F0FDFD]',
    accent: '#20A2B1',
    borderGlow: 'hover:border-[#20A2B1]',
  },
  {
    id: 'social-media-marketing',
    title: 'SOCIAL MEDIA AND MARKETING',
    tagline: 'Build reach and create impact.',
    description: 'Ensuring our tech products and events reach the people who need them. Data-driven growth, campus campaigns, brand storytelling, and partner relations across all digital channels.',
    roles: ['Growth Marketing', 'Brand Strategy', 'Content Creation', 'Analytics & PR', 'Video Editing & Reels', 'Podcast Production'],
    tools: ['Notion', 'Meta Suite', 'Google Analytics', 'Canva', 'HubSpot'],
    lightBg: 'bg-[#FFFBEB]',
    accent: '#E6972B',
    borderGlow: 'hover:border-[#E6972B]',
  },
  {
    id: 'events',
    title: 'EVENTS',
    tagline: 'Plan experiences people remember.',
    description: 'Orchestrating campus hackathons, technical problem-solving jams, hands-on coding bootcamps, and inspiring guest speaker keynotes that leave a lasting impression.',
    roles: ['Logistics & Flow', 'Hackathon Operations', 'Participant Experience', 'Stage Production'],
    tools: ['Airtable', 'Luma', 'Discord', 'Google Workspace', 'OBS'],
    lightBg: 'bg-[#ECFDF5]',
    accent: '#10B981',
    borderGlow: 'hover:border-emerald-400',
  },
  {
    id: 'design',
    title: 'DESIGN',
    tagline: 'Turn ideas into experiences.',
    description: 'Crafting user-centric UI/UX and design systems that make complex technological tools intuitive, clean, and delightful to use.',
    roles: ['UI/UX Product Design', 'Design Systems', 'Visual Branding', 'Motion Graphics'],
    tools: ['Figma', 'Spline', 'Illustrator', 'After Effects', 'Tailwind'],
    lightBg: 'bg-[#F5F3FF]',
    accent: '#8B5CF6',
    borderGlow: 'hover:border-purple-400',
  },
  {
    id: 'documentation-reporting',
    title: 'DOCUMENTATION AND REPORTING',
    tagline: 'Record, report and preserve knowledge.',
    description: 'The institutional memory of SETU. We maintain project documentation, compile event reports, track progress metrics, and build knowledge repositories that ensure continuity and accountability.',
    roles: ['Technical Writing', 'Report Compilation', 'Data Analysis & Metrics', 'Knowledge Management'],
    tools: ['Notion', 'Google Docs', 'Markdown', 'Google Sheets', 'Confluence'],
    lightBg: 'bg-[#FFF1F2]',
    accent: '#F43F5E',
    borderGlow: 'hover:border-rose-400',
  },
];

export const UPCOMING_EVENTS = [
  // Add your customized events here!
  // Example structure:
  /*
  {
    id: 'custom-event-1',
    featured: true, // true for the main highlight banner, false for grid cards
    title: 'Your Event Title',
    tagline: 'Your catchy event tagline',
    description: 'Detailed description of what will happen at the event.',
    date: 'NOVEMBER 15, 2026',
    time: '2:00 PM IST',
    location: 'Campus Auditorium / Lab 3',
    status: 'Applications Open',
    badge: 'Workshop',
    tags: ['Tech & Design', 'Hands-on'],
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop',
  },
  */
];

export const PAST_EVENTS = [
  {
    id: 'setu-x-iit-d',
    title: 'SETU x IIT D',
    date: 'Tech Exposure',
    attendees: 'SETU Team & Delegates',
    summary:
      'We had an amazing visit to IIT Delhi, where we explored new technologies, innovative ideas, and different aspects of the tech world. It was a great learning experience that gave us new insights, inspiration, and a chance to discover how technology is shaping the future.',
    image: '/events/setu-iitd.jpg',
    tags: ['IIT Delhi', 'Innovation', 'Future Tech'],
  },
  {
    id: 'setu-x-ghar-foundation',
    title: 'SETU x Ghar Foundation',
    date: 'Diwali Outreach',
    attendees: 'Children & SETU Volunteers',
    summary:
      'During Diwali, we visited Ghar Foundation, spent time with children, and gave them an exciting experience with AR, VR, and Meta Bat. It was a fun and memorable experience for everyone.',
    image: '/events/setu-ghar-foundation.jpg',
    tags: ['Ghar Foundation', 'AR/VR', 'Meta Bat', 'Diwali'],
  },
  {
    id: 'setu-x-aiesec',
    title: 'SETU x AIESEC',
    date: 'Community Leadership',
    attendees: 'AIESEC & SETU Community',
    summary:
      'Organized in cooperation with AIESEC, bringing youth leaders and children together for an inspiring day of interactive activities, creative tech exploration, and community empowerment.',
    image: '/events/setu-aiesec.jpg',
    tags: ['AIESEC', 'Youth Leadership', 'Community Impact'],
  },
  {
    id: 'impact-india-hackathon',
    title: 'Impact India Hackathon',
    date: 'Hackathon',
    attendees: '250+ Participants',
    summary:
      'We hosted the Impact India Hackathon—a high-energy celebration of innovation, creativity, and teamwork! From bold ideas to powerful solutions, participants turned technology into action and created an experience full of excitement, learning, and impact.',
    image: null,
    tags: ['Hackathon', 'Innovation', 'Creativity', 'Teamwork'],
  },
];


export const TEAM_MEMBERS = [
  {
    id: 'president',
    name: 'Ayana Sharma',
    role: 'President',
    category: 'Core',
    domain: 'Leadership',
    bio: 'Computer Science ’27. Passionate about bridging technical education with real-world startup execution and solving student problems.',
    image: '/team/ayana-sharma.jpg',
    imagePosition: 'center 20%',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    quote: '"SETU is our bridge: turning friction into functional tech."',
  },
  {
    id: 'vice-president',
    name: 'Ishita Chaurasiya',
    role: 'Vice President',
    category: 'Core',
    domain: 'Vice President',
    bio: 'Electronics & Comm ’27. Dedicated to scaling club infrastructure, student mentorship, and cross-domain product sprints.',
    image: '/team/ishita-chaurasiya.jpg',
    imagePosition: 'center 30%',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    quote: '"Empowering every student to solve problems that matter."',
  },
  {
    id: 'content-lead',
    name: 'Vedansh Saini',
    role: 'Social Media and Marketing HEAD',
    category: 'Core',
    domain: 'Content',
    bio: 'Journalism & Tech ’27. Documenting tech builds, writing tutorials, producing demo videos, and hosting the SETU Tech Talks podcast.',
    image: '/team/vedansh-saini.jpg',
    imagePosition: 'center 20%',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    quote: '"Telling the stories of students who build the future."',
  },
  
  {
    id: 'design-lead',
    name: 'Rohan Pratap Reddy',
    role: 'Design Lead',
    category: 'Core',
    domain: 'Design',
    bio: 'Design & Media ’27. UI/UX specialist ensuring that tech solutions developed at SETU are intuitive, accessible, and visually stunning.',
    image: '/team/rohan.jpg',
    imagePosition: 'center 20%',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    quote: '"Great design makes complex technology effortless to use."',
  },
  {
    id: 'events-lead',
    name: 'Disha B.',
    role: 'Event Lead',
    category: 'Core',
    domain: 'Events',
    bio: 'Mechanical Eng ’27. The master orchestrator behind 500+ participant hackathons and seamless campus problem-solving showcases.',
    image: '/team/disha-b.jpg',
    imagePosition: 'center 20%',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    quote: '"Creating environments where people build together under one roof."',
  },
  {
    id: 'documentation-head',
    name: 'Chenna Mahith',
    role: 'Documentation Head',
    category: 'Core',
    domain: 'Documentation',
    bio: 'Curating technical architectures, project documentation, knowledge repositories, and student problem-solving case studies.',
    image: '/team/chenna-mahith.jpg',
    imagePosition: 'center 30%',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    quote: '"Clear documentation bridges great code with lasting impact."',
  }
  
];

export const STORIES_GALLERY = [
  {
    id: 1,
    title: 'SETU x IIT D Tech Exploration',
    category: 'Events',
    date: 'Tech Exposure',
    image: '/events/setu-iitd.jpg',
    desc: 'Exploring cutting-edge technologies, innovative ideas, and discovering how technology is shaping the future during our visit to IIT Delhi.',
  },
  {
    id: 2,
    title: 'SETU x Ghar Foundation: AR/VR Experience',
    category: 'Events',
    date: 'Diwali',
    image: '/events/setu-ghar-foundation.jpg',
    desc: 'Bringing festive cheer and immersive AR, VR, and Meta Bat experiences to children at Ghar Foundation during Diwali.',
  },
  {
    id: 3,
    title: 'SETU x AIESEC Community Drive',
    category: 'Events',
    date: 'Youth Drive',
    image: '/events/setu-aiesec.jpg',
    desc: 'Empowering children and youth leaders through interactive activities, creative exploration, and community cooperation with AIESEC.',
  },
  {
    id: 4,
    title: 'Impact India Hackathon',
    category: 'Hackathons',
    date: 'Hackathon',
    image: null,
    desc: 'We hosted the Impact India Hackathon—a high-energy celebration of innovation, creativity, and teamwork where participants turned technology into action.',
  },
];

export const CURRENT_MEMBERS = [
  'Ayana Sharma',
  'Ishita Chaurasiya',
  'Vedansh Saini',
  'Disha B.',
  'Chenna Mahith',
  'Rohan Pratap Reddy',
  'Yash Raj',
  'Aaryan',
  'Aditya Yadav',
  'Ashu',
  'Mrityunjay Sahu',
  'Rameez Rehman',
];

export const EX_MEMBERS = [
   'Amanjeet Malik',
  'Ayush Kumar Pandey',
  'Arohi Jadhav',
  'Khyati',
  'Ananya Gupta',
  'Aditya',
  'Anaya pandey',
  'Anshika Khurana',
  'Deeptanu',
  'Vipul',
  'Vivek',
  'Shubhi',
  'Soham'
];

export const ALL_MEMBERS = CURRENT_MEMBERS;

