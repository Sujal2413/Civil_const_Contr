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
  title: string;
  category: string;
  location: string;
  year: string;
  image: string;
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
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Blog", href: "#blog" },
    { label: "Contact us", href: "#contact" }
  ],
  hero: {
    title: "Building spaces to live, work, and thrive.",
    body:
      "Expert builders delivering homes, offices, and commercial spaces that stand the test of time.",
    cta: "Start your project"
  },
  tickerStats: [
    { value: "100+", label: "Projects" },
    { value: "100%", label: "Commitment" },
    { value: "15", label: "Years of excellence" },
    { value: "24/7", label: "Site coordination" }
  ],
  projects: [
    {
      index: "01",
      title: "Riverside Business Centre",
      category: "Commercial",
      location: "Manchester",
      year: "2024",
      image: "/assets/riverside-business-centre.png"
    },
    {
      index: "02",
      title: "Gateway Industrial Park",
      category: "Industrial",
      location: "Liverpool",
      year: "2023",
      image: "/assets/gateway-industrial-park.png"
    },
    {
      index: "03",
      title: "Oakwood Residential",
      category: "Residential",
      location: "Birmingham",
      year: "2023",
      image: "/assets/oakwood-residential.png"
    }
  ],
  proofStats: [
    {
      target: 50,
      value: "50+",
      label: "Trusted Partners",
      suffix: "+"
    },
    {
      target: 20,
      value: "£20M+",
      label: "Projects Delivered",
      prefix: "£",
      suffix: "M+"
    },
    {
      target: 98,
      value: "98%",
      label: "Client Satisfaction Rate",
      suffix: "%"
    }
  ],
  strengths: [
    {
      title: "Quality you can count on",
      points: [
        "Skilled staff with proven track records managing your build",
        "Quality craftsmanship as our non-negotiable priority",
        "A network of reliable sub-contractors"
      ]
    },
    {
      title: "Your vision, delivered",
      points: [
        "We listen carefully and turn your vision into reality",
        "Strong company resources dedicated to your project",
        "Responsive team ready to address any concerns"
      ]
    },
    {
      title: "Safety first, always",
      points: [
        "Industry-leading safety performance across all our projects",
        "Qualified safety officers overseeing all site operations",
        "Safety and health of our team and yours comes first"
      ]
    }
  ],
  services: [
    {
      number: "01",
      title: "Quality evaluation",
      body:
        "Regular inspections ensure top-tier workmanship. We check, test, and verify every key construction detail."
    },
    {
      number: "02",
      title: "Project management & construction consulting",
      body:
        "Expert coordination from planning through completion, with timelines, teams, and site decisions kept clear."
    },
    {
      number: "03",
      title: "Damage and repairability evaluation",
      body:
        "Detailed evaluation of structural concerns and repair feasibility with practical guidance on the best path forward."
    },
    {
      number: "04",
      title: "Cost estimation",
      body:
        "Clear, detailed cost projections that help you plan your construction budget with confidence."
    }
  ],
  manifesto:
    "For over 15 years, we've built our reputation on craftsmanship.\nOur professionals use proven techniques alongside the latest construction technology to deliver projects efficiently.\nWe understand what works because we've been doing this for years.\nThat's how we stay ahead while keeping quality at the heart of everything we build.",
  testimonials: [
    {
      quote:
        "Working with this team was straightforward and efficient. No hidden costs, no delays, just honest work and great results. They've earned our trust for future projects.",
      author: "Emma Harrison",
      role: "Operations Manager, Greenfield Retail"
    },
    {
      quote:
        "From day one, the team made the renovation process stress-free. They kept us informed and the finished space exceeded our expectations. Recommend them.",
      author: "David Pate",
      role: "CEO, Cornerstone Developments"
    },
    {
      quote:
        "The Buildings team turned our vision into reality. Their attention to detail and commitment to safety impressed us throughout the entire build. True professionals.",
      author: "Michael Chen",
      role: "Director, Apex Investments"
    }
  ],
  articles: [
    {
      category: "Insights",
      date: "11/19/25",
      title: "What Makes Projects Truly Successful",
      image: "/assets/riverside-business-centre.png"
    },
    {
      category: "Tips",
      date: "3/20/25",
      title: "How to Choose Your Construction Partner",
      image: "/assets/gateway-industrial-park.png"
    },
    {
      category: "Insights",
      date: "9/4/25",
      title: "Why Project Timelines Really Matter",
      image: "/assets/oakwood-residential.png"
    },
    {
      category: "Insights",
      date: "3/26/25",
      title: "Cheap vs value in construction",
      image: "/assets/article-eco-building.png"
    }
  ],
  contactIntro:
    "Our team is here to answer your questions and provide expert guidance. Reach out to discuss your needs.",
  footer: {
    summary:
      "Explore our complete portfolio of commercial, residential, and civil engineering projects across England.",
    address: "42 Victoria Street Manchester M3 1WD England",
    contact: {
      phone: "+44 161 234 5678",
      email: "info@buildingsconstruction.co.uk"
    },
    social: ["LinkedIn", "X", "Instagram", "Youtube"]
  }
};
