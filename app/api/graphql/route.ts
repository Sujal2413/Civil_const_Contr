import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import type { NextRequest } from "next/server";
import { getBuildingsContent } from "@/lib/data-store";

export const runtime = "nodejs";

const typeDefs = `#graphql
  type Metric {
    value: String!
    label: String!
  }

  type Hero {
    title: String!
    body: String!
    cta: String!
  }

  type NavItem {
    label: String!
    href: String!
  }

  type Project {
    index: String!
    title: String!
    category: String!
    location: String!
    year: String!
    image: String!
  }

  type Stat {
    value: String!
    label: String!
    target: Int!
    suffix: String!
    prefix: String
  }

  type Strength {
    title: String!
    points: [String!]!
  }

  type Service {
    number: String!
    title: String!
    body: String!
  }

  type Testimonial {
    quote: String!
    author: String!
    role: String!
  }

  type Article {
    title: String!
    category: String!
    date: String!
    image: String!
  }

  type Contact {
    phone: String!
    email: String!
  }

  type Footer {
    summary: String!
    address: String!
    contact: Contact!
    social: [String!]!
  }

  type HomeContent {
    navigation: [NavItem!]!
    hero: Hero!
    tickerStats: [Metric!]!
    projects: [Project!]!
    proofStats: [Stat!]!
    strengths: [Strength!]!
    services: [Service!]!
    manifesto: String!
    testimonials: [Testimonial!]!
    articles: [Article!]!
    contactIntro: String!
    footer: Footer!
  }

  type Query {
    home: HomeContent!
    projects: [Project!]!
    services: [Service!]!
    articles: [Article!]!
    testimonials: [Testimonial!]!
  }
`;

const resolvers = {
  Query: {
    home: () => getBuildingsContent(),
    projects: async () => (await getBuildingsContent()).projects,
    services: async () => (await getBuildingsContent()).services,
    articles: async () => (await getBuildingsContent()).articles,
    testimonials: async () => (await getBuildingsContent()).testimonials
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const apolloHandler = startServerAndCreateNextHandler<NextRequest>(server);

export async function GET(request: NextRequest) {
  return apolloHandler(request);
}

export async function POST(request: NextRequest) {
  return apolloHandler(request);
}
