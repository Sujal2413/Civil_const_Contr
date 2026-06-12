Buildings Construction
======================

A Next.js reconstruction of the Buildings construction landing page direction,
using React, React Three Fiber/Three.js, custom GLSL shaders, GSAP ScrollTrigger,
Framer Motion, Apollo GraphQL, and PostgreSQL/Redis-ready data adapters.

The homepage includes a live WebGL dusk skyline hero with parallax tower cranes,
GSAP text and scroll reveals, marquee stats, animated counters, stacked strength
cards, R3F service meshes, testimonial swipes, editorial cards, and a matte black
lead-capture footer.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Data Layer

The app ships with local fallback content in `lib/content.ts` so it runs without
external services. The GraphQL route is available at `/api/graphql`.

Optional production-style adapters:

- `DATABASE_URL`: reads `site_content.payload` for slug `buildings-home`
- `REDIS_URL`: caches the resolved home payload for five minutes
