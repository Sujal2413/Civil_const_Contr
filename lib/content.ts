export type NavItem = {
  label: string;
  href: string;
};

export type TickerStat = {
  value: string;
  label: string;
};

export type Project = {
  index: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  image: string;
  description: string;
  specs: {
    area: string;
    duration: string;
    budget: string;
    type: string;
  };
  narrative: string[];
  galleryImages: string[];
};

export type ProofStat = {
  target: number;
  value: string;
  label: string;
  suffix: string;
  prefix?: string;
};

export type Strength = {
  title: string;
  points: string[];
};

export type Service = {
  number: string;
  title: string;
  body: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export type Article = {
  title: string;
  category: string;
  date: string;
  image: string;
};

export type ExpertiseArea = {
  number: string;
  title: string;
  body: string;
  details: string[];
};

export type HeritageEvent = {
  year: string;
  title: string;
  description: string;
  image?: string;
};

export type TeamMember = {
  name: string;
  role: string;
  image: string;
};

export type CoreValue = {
  title: string;
  description: string;
  icon: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type HomeContent = {
  navigation: NavItem[];
  hero: {
    title: string;
    body: string;
    cta: string;
  };
  tickerStats: TickerStat[];
  projects: Project[];
  proofStats: ProofStat[];
  strengths: Strength[];
  services: Service[];
  manifesto: string;
  testimonials: Testimonial[];
  articles: Article[];
  contactIntro: string;
  footer: {
    summary: string;
    address: string;
    contact: {
      phone: string;
      email: string;
    };
    social: string[];
  };
};

export const homeContent: HomeContent = {
  navigation: [
    { label: "Portfolio", href: "/portfolio" },
    { label: "Expertise", href: "/expertise" },
    { label: "Heritage", href: "/heritage" },
    { label: "Contact", href: "/contact" },
  ],
  hero: {
    title: "Building spaces to live, work, and thrive.",
    body:
      "Expert builders delivering homes, offices, and commercial spaces that stand the test of time.",
    cta: "Start your project",
  },
  tickerStats: [
    { value: "100+", label: "Projects" },
    { value: "100%", label: "Commitment" },
    { value: "15", label: "Years of excellence" },
    { value: "24/7", label: "Site coordination" },
  ],
  projects: [
    {
      index: "01",
      slug: "riverside-business-centre",
      title: "Riverside Business Centre",
      category: "Commercial",
      location: "Manchester",
      year: "2024",
      image: "/assets/riverside-business-centre.png",
      description: "A landmark commercial complex featuring sustainable design principles and state-of-the-art workplace environments along Manchester's waterfront.",
      specs: {
        area: "45,000 sqft",
        duration: "18 Months",
        budget: "£8.2M",
        type: "Commercial",
      },
      narrative: [
        "The Riverside Business Centre represents a new paradigm in commercial architecture, combining sustainability with functional elegance. Situated along Manchester's revitalized waterfront, this development draws inspiration from the city's industrial heritage while pushing boundaries in modern workplace design.",
        "Our team employed advanced digital twin modeling throughout the construction process, allowing real-time monitoring of structural integrity and energy efficiency. The result is a building that exceeds BREEAM Excellent standards while providing tenants with naturally lit, open-plan spaces.",
        "Traditional stonework on the facade pays homage to Manchester's architectural legacy, while the interior features cutting-edge smart building systems that optimize energy consumption and occupant comfort throughout the seasons.",
      ],
      galleryImages: [
        "/assets/riverside-business-centre.png",
        "/assets/hero-construction.png",
        "/assets/commitment-construction.png",
      ],
    },
    {
      index: "02",
      slug: "gateway-industrial-park",
      title: "Gateway Industrial Park",
      category: "Industrial",
      location: "Liverpool",
      year: "2023",
      image: "/assets/gateway-industrial-park.png",
      description: "A modern industrial campus designed for flexible manufacturing and logistics operations with an emphasis on sustainability and worker wellbeing.",
      specs: {
        area: "120,000 sqft",
        duration: "24 Months",
        budget: "£15.4M",
        type: "Industrial",
      },
      narrative: [
        "Gateway Industrial Park redefines what modern industrial spaces can be. Moving beyond the utilitarian approach, our design integrates green spaces, natural lighting, and advanced ventilation systems that prioritize worker wellbeing alongside operational efficiency.",
        "The park features six interconnected units with flexible layouts that can accommodate everything from precision manufacturing to large-scale distribution. Each unit is equipped with reinforced foundations capable of supporting heavy machinery while maintaining ISO-certified clean environments.",
        "Sustainability was embedded from the ground up, with solar panel arrays, rainwater harvesting systems, and electric vehicle charging infrastructure making this one of the region's most forward-thinking industrial developments.",
      ],
      galleryImages: [
        "/assets/gateway-industrial-park.png",
        "/assets/hero-crane-sunset.png",
        "/assets/article-eco-building.png",
      ],
    },
    {
      index: "03",
      slug: "oakwood-residential",
      title: "Oakwood Residential",
      category: "Residential",
      location: "Birmingham",
      year: "2023",
      image: "/assets/oakwood-residential.png",
      description: "An exclusive residential development featuring bespoke luxury homes that blend contemporary design with the natural landscape of Birmingham's green belt.",
      specs: {
        area: "32,000 sqft",
        duration: "14 Months",
        budget: "£6.8M",
        type: "Residential",
      },
      narrative: [
        "Oakwood Residential is a collection of twelve bespoke homes nestled within Birmingham's prestigious green belt, where architecture and nature exist in perfect harmony. Each residence has been individually designed to maximize natural light and frame views of the surrounding woodland.",
        "The construction combines traditional building techniques with modern engineering. Hand-laid Staffordshire brick exteriors meet interior spaces fitted with underfloor heating, triple-glazed windows, and smart home automation systems.",
        "Private gardens designed by award-winning landscape architects extend the living space outdoors, creating seamless indoor-outdoor transitions that change character with the seasons.",
      ],
      galleryImages: [
        "/assets/oakwood-residential.png",
        "/assets/project-serene-haven.png",
        "/assets/project-cedar-ridge.png",
      ],
    },
  ],
  proofStats: [
    {
      target: 50,
      value: "50+",
      label: "Trusted Partners",
      suffix: "+",
    },
    {
      target: 20,
      value: "£20M+",
      label: "Projects Delivered",
      prefix: "£",
      suffix: "M+",
    },
    {
      target: 98,
      value: "98%",
      label: "Client Satisfaction Rate",
      suffix: "%",
    },
  ],
  strengths: [
    {
      title: "Quality you can count on",
      points: [
        "Skilled staff with proven track records managing your build",
        "Quality craftsmanship as our non-negotiable priority",
        "A network of reliable sub-contractors",
      ],
    },
    {
      title: "Your vision, delivered",
      points: [
        "We listen carefully and turn your vision into reality",
        "Strong company resources dedicated to your project",
        "Responsive team ready to address any concerns",
      ],
    },
    {
      title: "Safety first, always",
      points: [
        "Industry-leading safety performance across all our projects",
        "Qualified safety officers overseeing all site operations",
        "Safety and health of our team and yours comes first",
      ],
    },
  ],
  services: [
    {
      number: "01",
      title: "Quality evaluation",
      body:
        "Regular inspections ensure top-tier workmanship. We check, test, and verify every key construction detail.",
    },
    {
      number: "02",
      title: "Project management & construction consulting",
      body:
        "Expert coordination from planning through completion, with timelines, teams, and site decisions kept clear.",
    },
    {
      number: "03",
      title: "Damage and repairability evaluation",
      body:
        "Detailed evaluation of structural concerns and repair feasibility with practical guidance on the best path forward.",
    },
    {
      number: "04",
      title: "Cost estimation",
      body:
        "Clear, detailed cost projections that help you plan your construction budget with confidence.",
    },
  ],
  manifesto:
    "For over 15 years, we've built our reputation on craftsmanship.\nOur professionals use proven techniques alongside the latest construction technology to deliver projects efficiently.\nWe understand what works because we've been doing this for years.\nThat's how we stay ahead while keeping quality at the heart of everything we build.",
  testimonials: [
    {
      quote:
        "Working with this team was straightforward and efficient. No hidden costs, no delays, just honest work and great results. They've earned our trust for future projects.",
      author: "Emma Harrison",
      role: "Operations Manager, Greenfield Retail",
    },
    {
      quote:
        "From day one, the team made the renovation process stress-free. They kept us informed and the finished space exceeded our expectations. Recommend them.",
      author: "David Pate",
      role: "CEO, Cornerstone Developments",
    },
    {
      quote:
        "The Buildings team turned our vision into reality. Their attention to detail and commitment to safety impressed us throughout the entire build. True professionals.",
      author: "Michael Chen",
      role: "Director, Apex Investments",
    },
  ],
  articles: [
    {
      category: "Insights",
      date: "11/19/25",
      title: "What Makes Projects Truly Successful",
      image: "/assets/riverside-business-centre.png",
    },
    {
      category: "Tips",
      date: "3/20/25",
      title: "How to Choose Your Construction Partner",
      image: "/assets/gateway-industrial-park.png",
    },
    {
      category: "Insights",
      date: "9/4/25",
      title: "Why Project Timelines Really Matter",
      image: "/assets/oakwood-residential.png",
    },
    {
      category: "Insights",
      date: "3/26/25",
      title: "Cheap vs value in construction",
      image: "/assets/article-eco-building.png",
    },
  ],
  contactIntro:
    "Our team is here to answer your questions and provide expert guidance. Reach out to discuss your needs.",
  footer: {
    summary:
      "Explore our complete portfolio of commercial, residential, and civil engineering projects across England.",
    address: "42 Victoria Street Manchester M3 1WD England",
    contact: {
      phone: "+44 161 234 5678",
      email: "info@buildingsconstruction.co.uk",
    },
    social: ["LinkedIn", "X", "Instagram", "Youtube"],
  },
};

// Extended projects for portfolio
export const allProjects: Project[] = [
  ...homeContent.projects,
  {
    index: "04",
    slug: "cedar-ridge-estate",
    title: "Cedar Ridge Estate",
    category: "Residential",
    location: "Cheshire",
    year: "2024",
    image: "/assets/project-cedar-ridge.png",
    description: "A private estate development featuring five luxury residences with panoramic countryside views and bespoke architectural details.",
    specs: {
      area: "28,000 sqft",
      duration: "16 Months",
      budget: "£7.5M",
      type: "Residential",
    },
    narrative: [
      "Cedar Ridge Estate represents the pinnacle of luxury residential construction. Each of the five homes has been designed to take advantage of the site's elevated position, offering uninterrupted views across the Cheshire countryside.",
      "The development showcases our mastery of traditional building techniques, with hand-cut stone facades, custom timber framing, and artisanal metalwork throughout. These time-honored methods are complemented by cutting-edge building systems including geothermal heating and automated climate control.",
    ],
    galleryImages: [
      "/assets/project-cedar-ridge.png",
      "/assets/oakwood-residential.png",
      "/assets/project-serene-haven.png",
    ],
  },
  {
    index: "05",
    slug: "serene-haven-wellness",
    title: "Serene Haven Wellness Centre",
    category: "Institutional",
    location: "Leeds",
    year: "2022",
    image: "/assets/project-serene-haven.png",
    description: "A purpose-built wellness and rehabilitation centre designed to promote healing through architectural design and natural materials.",
    specs: {
      area: "18,000 sqft",
      duration: "12 Months",
      budget: "£4.2M",
      type: "Institutional",
    },
    narrative: [
      "The Serene Haven Wellness Centre was conceived as a place where architecture itself becomes part of the healing process. Natural materials, biophilic design principles, and carefully considered acoustics create spaces that promote calm and recovery.",
      "Our team worked closely with healthcare professionals to ensure every design decision supported therapeutic outcomes. The result is a facility that feels more like a retreat than a medical building, with courtyards, water features, and abundant natural light.",
    ],
    galleryImages: [
      "/assets/project-serene-haven.png",
      "/assets/article-eco-building.png",
      "/assets/hero-construction.png",
    ],
  },
  {
    index: "06",
    slug: "willow-creek-apartments",
    title: "Willow Creek Apartments",
    category: "Residential",
    location: "Sheffield",
    year: "2024",
    image: "/assets/project-willow-creek.png",
    description: "A contemporary apartment complex offering 48 premium units with communal gardens, co-working spaces, and sustainable design.",
    specs: {
      area: "52,000 sqft",
      duration: "20 Months",
      budget: "£12.1M",
      type: "Residential",
    },
    narrative: [
      "Willow Creek Apartments reimagines urban living with a development that prioritizes community, sustainability, and design excellence. The 48-unit complex includes a mix of one, two, and three-bedroom apartments arranged around a central courtyard garden.",
      "Shared amenities include a professionally designed co-working space, a residents' lounge, and a rooftop terrace with views across Sheffield. The building achieves EPC A-rating through innovative insulation, heat pump technology, and integrated solar generation.",
    ],
    galleryImages: [
      "/assets/project-willow-creek.png",
      "/assets/riverside-business-centre.png",
      "/assets/commitment-construction.png",
    ],
  },
];

// Expertise page content
export const expertiseAreas: ExpertiseArea[] = [
  {
    number: "01",
    title: "Architectural Design & Planning",
    body: "From initial concept sketches to detailed construction drawings, our in-house design team creates spaces that inspire while meeting rigorous technical standards.",
    details: [
      "Full conceptual design and feasibility studies",
      "Planning permission and regulatory compliance",
      "3D visualization and virtual walkthroughs",
      "Sustainable design integration",
    ],
  },
  {
    number: "02",
    title: "Commercial Construction",
    body: "Large-scale commercial projects delivered with precision, from office towers to retail centres, with a focus on energy efficiency and occupant wellbeing.",
    details: [
      "Grade A office fit-outs",
      "Retail and hospitality developments",
      "Mixed-use commercial projects",
      "Fast-track construction programs",
    ],
  },
  {
    number: "03",
    title: "Residential Development",
    body: "Bespoke homes and multi-unit residential schemes that balance architectural ambition with practical living, from luxury estates to urban apartments.",
    details: [
      "Custom home construction",
      "Multi-unit residential developments",
      "Heritage property restoration",
      "High-specification interior finishes",
    ],
  },
  {
    number: "04",
    title: "Infrastructure & Civil Works",
    body: "Heavy civil engineering and infrastructure projects including foundations, earthworks, and structural concrete for major developments.",
    details: [
      "Deep foundation engineering",
      "Structural steelwork and concrete",
      "Site preparation and earthworks",
      "Utility and service installations",
    ],
  },
  {
    number: "05",
    title: "Project Management",
    body: "End-to-end project management ensuring your build stays on time, on budget, and to specification, with transparent reporting at every stage.",
    details: [
      "Full project lifecycle management",
      "Cost control and value engineering",
      "Quality assurance programs",
      "Stakeholder communication and reporting",
    ],
  },
  {
    number: "06",
    title: "Sustainability & Green Building",
    body: "Pioneering sustainable construction practices that reduce environmental impact while creating buildings that perform better for occupants and owners.",
    details: [
      "BREEAM and EPC certification",
      "Renewable energy integration",
      "Low-carbon material specification",
      "Lifecycle assessment and circular design",
    ],
  },
];

export const processSteps: ProcessStep[] = [
  {
    title: "Discovery",
    description: "We listen to your vision, assess site conditions, and define project requirements.",
  },
  {
    title: "Design",
    description: "Our architects create detailed plans, 3D models, and obtain necessary permits.",
  },
  {
    title: "Construction",
    description: "Expert teams execute the build with rigorous quality and safety oversight.",
  },
  {
    title: "Handover",
    description: "Final inspections, snagging, and a seamless transition to your new space.",
  },
];

// Heritage page content
export const heritageTimeline: HeritageEvent[] = [
  {
    year: "2010",
    title: "The Foundation",
    description: "Buildings Architectural Group was established in Manchester with a small team of five dedicated craftsmen and a vision to bring traditional building excellence into the modern era.",
    image: "/assets/hero-construction.png",
  },
  {
    year: "2013",
    title: "First Major Commercial Project",
    description: "Completed our first £2M+ commercial project, a boutique office complex in Manchester's Northern Quarter, establishing our reputation for quality and reliability.",
  },
  {
    year: "2015",
    title: "Team Expansion",
    description: "Grew to a team of 35 professionals, including our first in-house architects and structural engineers. Opened our dedicated design studio.",
    image: "/assets/commitment-construction.png",
  },
  {
    year: "2017",
    title: "Technology Adoption",
    description: "Invested in digital twin modeling and BIM (Building Information Modeling) technologies, becoming one of the first mid-sized firms in the region to fully integrate digital workflows.",
  },
  {
    year: "2019",
    title: "Regional Expansion",
    description: "Extended operations across the North West, with projects spanning Liverpool, Leeds, Sheffield, and Birmingham. Surpassed £50M in cumulative project value.",
    image: "/assets/hero-crane-sunset.png",
  },
  {
    year: "2021",
    title: "Sustainability Commitment",
    description: "Launched our Green Building Initiative, committing to net-zero operational carbon on all new projects by 2030. Achieved our first BREEAM Outstanding certification.",
  },
  {
    year: "2023",
    title: "100th Project Milestone",
    description: "Celebrated the completion of our 100th project — the Gateway Industrial Park in Liverpool — a testament to 13 years of consistent delivery and client trust.",
    image: "/assets/gateway-industrial-park.png",
  },
  {
    year: "2025",
    title: "15 Years of Excellence",
    description: "Marking 15 years with a portfolio spanning commercial, residential, and institutional sectors. Over 100 projects delivered, 98% client satisfaction, and a team of 60+ professionals.",
  },
];

export const coreValues: CoreValue[] = [
  {
    title: "Craftsmanship",
    description: "Every joint, every finish, every detail reflects our commitment to building things the right way — with skill, care, and pride.",
    icon: "hammer",
  },
  {
    title: "Innovation",
    description: "We embrace emerging technologies and methodologies that enhance quality, efficiency, and sustainability in construction.",
    icon: "lightbulb",
  },
  {
    title: "Safety",
    description: "Zero compromise on safety. Our industry-leading protocols protect our people, our clients, and the communities we build in.",
    icon: "shield",
  },
  {
    title: "Sustainability",
    description: "Building for today while protecting tomorrow. We integrate sustainable practices into every project we undertake.",
    icon: "leaf",
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: "James Whitfield",
    role: "Founder & Managing Director",
    image: "/assets/hero-construction.png",
  },
  {
    name: "Sarah Chen",
    role: "Head of Architecture",
    image: "/assets/commitment-construction.png",
  },
  {
    name: "Robert Davies",
    role: "Construction Director",
    image: "/assets/hero-crane-sunset.png",
  },
  {
    name: "Priya Sharma",
    role: "Sustainability Lead",
    image: "/assets/article-eco-building.png",
  },
];
