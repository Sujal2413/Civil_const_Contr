# Buildings Framer Site Recreation Research Dossier

## Executive summary

The audited site is not a live construction company website in the ordinary sense; it is a Framer template/demo branded as **Buildings — Construction Framer Template**, with repeated template CTAs such as **Use for free**, **Copy this template**, **Built in Framer**, and **Created by dianadia © 2026** in the footer. That matters because the safest client rebuild is not a clone of “this business,” but a fresh build that borrows only the structural idea: industrial photography, large editorial sections, project-led trust signals, service cards, testimonial blocks, article pages, and strong repeated CTAs. 

Structurally, the site is broader than the homepage suggests. It contains a homepage, project index, blog index, contact page, at least four individual project detail pages, and at least six article detail pages. One important inconsistency surfaced during the crawl: the main `/project` listing exposes only three projects and a **Load More** control, but a fourth project page, **Skyline Corporate Headquarters**, is reachable from related-project modules on detail pages. That is a good reminder to rebuild the IA deliberately rather than copying the source blindly. citeturn36view0turn10view0turn11view1

Visually, the strongest identity signal is the photography set rather than the UI chrome. The imagery leans heavily on silhouettes, cranes, steel frames, scaffolding, golden-hour light, amber/orange skies, muted concrete neutrals, and occasional deep blue sky blocks. Representative assets include the sunset crane hero, construction-worker documentary shots, scaffold silhouettes, and large aerial/urban construction frames. That produces a premium “industrial editorial” mood even though the underlying content is fairly generic template copy. citeturn12view0turn12view1turn12view4turn12view5turn13view1turn13view6

For a visually similar but non-infringing client site, the most defensible stack is **Next.js + React** for the production application, with **Lenis** for smooth scrolling, **GSAP** for scroll-linked or sequence-heavy motion, and a small declarative motion layer for hover glides and reveal transitions. Next.js positions itself as “The React Framework for the Web” with routing, server/client rendering options, and built-in optimizations, while React remains the component foundation; Lenis is specifically positioned as an accessible smooth-scroll library; GSAP provides tween/timeline orchestration and scroll plugins; and Vite remains the best lean alternative if you deliberately choose a static SPA build instead of Next.js. citeturn25view0turn25view2turn25view3turn29view0turn29view1turn31view0turn25view1

## Site structure and copy inventory

Short labels, names, and titles below are preserved where useful; longer body copy is paraphrased to keep this dossier practical.

### Sitemap and page inventory

| Route / page type | What is present | High-confidence notes |
|---|---|---|
| `/` | Hero, project showcase, stats, trust/value cards, services, about block, testimonial cluster, latest blog feed, two-panel CTA area, footer. The homepage visibly surfaces the project names **Riverside Business Centre**, **Gateway Industrial Park**, and **Oakwood Residential**, plus the service labels **Quality evaluation**, **Project management & construction consulting**, **Damage and repairability evaluation**, and **Cost estimation**. citeturn34view0turn35view0 | The homepage is the strongest visual reference for recreation because it shows the overall rhythm, section pacing, and photo-led mood. Footer markers confirm this is a template, not an original client brand. citeturn34view3 |
| `/project` | Project listing page with category-style filter headings and three visible project cards, followed by audience-fit content and “why choose us” content. The visible filter labels are **All projects**, **Residentials**, **Commercials**, **Industrials**, followed by **Load More**. citeturn36view0turn36view1 | The plural filter wording is awkward, and the exposed card set is incomplete relative to discovered project detail pages. That is useful to fix in your rebuilt IA. citeturn36view0turn11view1 |
| `/project/riverside-business-centre` | Commercial detail page with project summary, location, completion date, address, two KPI blocks, image gallery, related projects, CTA, footer. citeturn6view2turn12view1 | This page is the clearest pattern for your reusable project-detail template. citeturn6view2 |
| `/project/gateway-industrial-park` | Industrial detail page with summary, metadata, KPI pair, gallery, related projects, CTA, footer. citeturn8view1turn10view0 | Related-project module exposes hidden secondary content and proves the detail template is shared across projects. citeturn10view0 |
| `/project/oakwood-residential` | Residential detail page with summary, metadata, KPI pair, gallery, related projects, CTA, footer. citeturn9view1turn10view1 | Useful for testing how the same template adapts to a different sector narrative. citeturn9view1 |
| `/project/skyline-corporate-headquarters` | Hidden commercial detail page surfaced from related cards rather than the main project index. It includes Edinburgh location, date, address, sustainability mention, KPI pair, gallery, related projects, CTA, footer. citeturn11view1 | This is the most important sitemap discrepancy in the source site. Rebuild the final project index so every live detail page is discoverable. citeturn36view0turn11view1 |
| `/contact` | Contact form with **Name**, **Email**, **Company name**, **Message**, **Submit**, followed by a testimonial block, FAQ block, service/project CTA split, and footer. citeturn33view0 | Good source pattern for forms, FAQs, and trust reinforcement below conversion forms. citeturn33view0 |
| `/blog` | Article archive with six visible post links, a **Load More** control, a service/project CTA split, and footer. The surfaced article set includes **What Makes Projects Truly Successful**, **How to Choose Your Construction Partner**, **Why Project Timelines Really Matter**, **Cheap vs value in construction**, **Sustainable Materials Transform UK Building Sector**, and **5 Essentials Before Starting Your Build**. citeturn37view0 | The archive structure is clean and simple, but again the **Load More** control needs verification in a live UI pass. citeturn37view0 |
| `/blog/[slug]` | Standard article details with category label, title, date, hero media, body, “More articles,” CTA, and footer. Confirmed examples include **What Makes Projects Truly Successful**, **How to Choose Your Construction Partner**, **Why Project Timelines Really Matter**, **Cheap vs value in construction**, and **Sustainable Materials Transform UK Building Sector**. citeturn38view0turn9view2turn9view3turn9view4turn39view0 | This gives you one clear reusable article template. Keep the pattern, but replace every title, date, and body with original client material. citeturn38view0turn39view0 |

### Navigation, CTAs, people, and business placeholders

The global navigation consistently exposes **Projects**, **Services**, **About**, **Blog**, **Use for free**, and **Contact us**. In practice, **Services** and **About** appear to behave like homepage anchor targets rather than standalone content hubs, while **Contact us** opens a dedicated page. Repeated CTA language includes project-start, work-with-us, and view-all patterns across all major pages. citeturn0view0turn2view4turn34view3turn36view2

The site uses the same Manchester address, phone, and email across pages, and the trust content is populated with three named testimonial identities: **Emma Harrison**, **David Pate**, and **Michael Chen**, paired with business roles and organisations. Because the site is explicitly a template, treat all of that identity data as placeholder content that must not be reused for clients. citeturn33view0turn34view2turn37view0

## Visual and interaction analysis

### Visual language

The source’s strongest design move is not a complex UI system; it is the combination of large, cinematic construction imagery with a calm, editorial content rhythm. The images repeatedly show cranes at sunrise/sunset, skeletal building frames, scaffolding, aerial site views, and workers in high-visibility gear. That creates a polished industrial mood that feels more premium than the underlying template copy. citeturn12view0turn12view1turn12view2turn12view3turn12view4turn12view5turn13view1turn12view12

A practical recreation target is therefore: generous vertical spacing, full-width photography blocks, restrained card grids, large headings, simple metadata lines, and repeated two-column CTA panels near the bottom of most pages. The crawl does not expose exact CSS colors or font-family values, so the most reliable extractable “palette” is the media palette: black silhouettes, cream/sand highlights, amber and terracotta warmth, dusty mauve dusk tones, steel blue skies, and occasional pale concrete neutrals. citeturn34view0turn34view2turn34view3turn12view0turn12view1turn12view5turn13view6

### Observed interactions and recommended recreation targets

| Interaction area | What can be stated confidently from the crawl | Recommended rebuild target |
|---|---|---|
| Global nav | Persistent nav is present on all pages and links to projects, services/about anchors or home sections, blog, template CTA, and contact. citeturn0view0turn33view0turn37view0 | Use a sticky top bar with a shared-layout hover pill or underline glide. Aim for 180–240ms ease-out for hover movement and 220–300ms for active-state settle. |
| Project cards | All visible project cards have image, sector label, city, year, and a read-more action. citeturn34view0turn36view0 | Add subtle image scale on hover, 6–10px vertical lift, and a slow overlay fade. Avoid exaggerated 3D tilt; the source mood is professional, not flashy. |
| Category filters on `/project` | Category-style headings exist for residential, commercial, and industrial content. citeturn36view0 | Rebuild as real tabs or filter chips with keyboard-accessible semantics. Use animated active-state background glide; do not keep the odd plural labels. |
| Article archive cards | Blog archive exposes article taxonomy/date/title clusters and a load-more control. citeturn37view0 | Use simple hover emphasis only: title color shift, subtle arrow motion, and image zoom if thumbnails are used. |
| Contact form | Form fields are conventional and minimal, followed by trust/testimonial reinforcement. citeturn33view0 | Add animated floating/focus states, client-side validation, success state, and privacy/consent messaging. |
| Scroll behavior | The site is clearly built as a modern polished Framer template, but the text crawl does not reveal measured easing, spring constants, or scroll-linked timelines. citeturn34view3turn33view0 | Use Lenis for smooth scrolling and keep scroll-reveal motion restrained. Prefer 30–60px y-offset reveals with 0.45–0.7s duration and stagger only where groups deserve it. |
| 3D / WebGL | No 3D model, canvas, WebGL, or video references surfaced in the crawled pages. citeturn34view0turn36view0turn33view0turn37view0turn38view0turn39view0 | Treat 3D as optional future enhancement only if you deliberately commission original client assets. It is not part of the source template’s core identity. |

### Representative visual palette from the media set

| Role | Approximate colour direction from representative images |
|---|---|
| Hero/contrast anchor | Black and deep charcoal silhouettes against cream-to-amber sky gradients. citeturn12view0turn12view1 |
| Warm industrial accent | Amber, ochre, terracotta, and sand tones from steel frames, concrete, and sunset light. citeturn12view2turn12view4turn12view12 |
| Cool counterbalance | Blue sky blocks and slate/steel blue atmospheric tones. citeturn13view1turn13view6 |
| Safe recreation direction | Use a restrained neutral UI shell and let original photography carry the warmth. Do **not** copy the exact image set or grading. citeturn12view0turn12view4turn13view1 |

## Media, accessibility, SEO, and performance

### Representative media inventory

| Asset type | Representative content observed | Use in layout | Rebuild advice |
|---|---|---|---|
| Hero photograph | Sunset skyline/crane silhouette image. citeturn12view0 | High-impact opening mood setter. | Replace with different but equally cinematic licensed/original industrial photography. |
| Project feature image | Urban/site sunset and construction frame images for project cards and detail pages. citeturn12view1turn12view2turn12view3 | Project credibility and visual differentiation. | Use different sites, angles, and crops; keep aspect ratios consistent across cards. |
| Service-support image | On-site worker/inspection imagery. citeturn12view4turn13view1 | Adds human evidence to service content. | Commission or source new worker/site images with proper releases. |
| About/testimonial support image | Scaffold silhouette and large-scale crane/site frames. citeturn12view10turn13view6 | Atmosphere, not factual proof. | Preserve category, not composition. |
| CTA support image | Large aerial/urban construction frame. citeturn12view12 | Gives bottom-page CTA cards weight. | Replace with client-relevant build photography. |
| Video / 3D | Not surfaced. citeturn34view0turn36view0turn33view0turn37view0turn38view0turn39view0 | None detected. | Do not invent either unless the client has content and business value for it. |

### Accessibility, SEO, and performance findings

| Area | Finding | Why it matters |
|---|---|---|
| Alt text | The crawler repeatedly exposes images with the generic label **Image** rather than meaningful alt descriptions. citeturn34view0turn33view0turn38view0turn39view0 | In the rebuild, every informative image should get real alt text; decorative images should be hidden from assistive tech. |
| Breakpoint duplication | Many pages expose repeated copies of the same content blocks in crawler output, which strongly suggests separate breakpoint variants or duplicated layers inside the DOM. citeturn35view0turn33view0turn37view0 | If hidden incorrectly, this can bloat HTML, complicate maintenance, and create screen-reader/SEO clutter. Rebuild with a single responsive component tree wherever possible. |
| Page titles | Page titles are descriptive and route-specific, for example project and article pages include the page name plus the template brand. citeturn6view2turn11view1turn38view0turn39view0 | Good pattern to keep, but replace “Construction Framer Template” with the real client brand and intent-led metadata. |
| Internal linking | The site aggressively cross-links projects, services, contact, blog, and related content through bottom-page CTAs and related modules. citeturn34view3turn36view2turn37view0turn38view0 | Keep the strong internal-link strategy; it helps both navigation and crawlability. |
| Meta / structured data | Meta descriptions, schema, canonical settings, and OG tags were not surfaced in the text crawl. | Add them explicitly in the rebuild; do not assume parity from the template. |
| Image delivery | Image URLs are served through `framerusercontent` with explicit size parameters, indicating transformed/resized delivery rather than raw originals. citeturn12view0turn12view1turn12view12 | Keep that discipline by using `next/image` or another responsive-image pipeline in the rebuild. |
| Load / DOM risk | The site is image-heavy and appears to duplicate breakpoint content; both tendencies can increase payload and DOM complexity if replicated literally. citeturn12view0turn12view1turn35view0 | Use responsive image sizing, code-split long routes, and avoid duplicating whole sections for breakpoints. |

### Notable content and credibility issues worth fixing

The copy is broadly competent but clearly template-grade. There are several small but important issues: **Client Satisfaction Rate** is shown as **48%**, which is an implausibly weak boast; **Residentials/Commercials/Industrials** is awkward filter wording; **planning,detailing** is missing a space after the comma; **plan your budget your construction** is grammatically broken; and **You’ve got questions, we got answers** is conversationally off. citeturn34view0turn36view0turn35view0turn33view0

There is also a geography inconsistency. Multiple CTAs and FAQ answers say the work is “across England,” but one discovered project is located in Edinburgh, which is in Scotland. That is the sort of tiny factual mismatch you should actively QA out of client builds. citeturn33view0turn34view3turn11view1

## Recommended rebuild architecture

### Primary stack recommendation

Use **Next.js + React** for the production rebuild. Next.js explicitly positions itself as a React framework for building web applications, with file-based routing, nested layouts, multiple rendering strategies, and built-in optimizations; React remains the right base because this design decomposes naturally into reusable components such as hero, project-card, stat-band, service-card, testimonial, article-card, CTA split, and footer. citeturn25view0turn25view2

For motion, use **Lenis** for smooth page scrolling and **GSAP** where you need more explicit sequence control, scroll orchestration, or future timeline-heavy storytelling. Lenis is presented as an open-source smooth-scroll library built to standardize scroll experiences while remaining accessible, and GSAP’s core/timeline model is ideal when a client later asks for pinned sections, staggered reveals, or fine-grained choreography. citeturn25view3turn29view0turn29view1turn29view2

If you intentionally want a lighter static marketing build with no SSR needs, **Vite** is a very strong alternate starting point. Its docs emphasise a faster, leaner development experience and explicitly note that production bundles are suitable for static hosting. citeturn25view1turn31view0

### Tech stack mapping

| Need | Recommended choice | Why this fits | Official docs |
|---|---|---|---|
| App shell, routing, page composition | Next.js + React | Strong fit for multi-page marketing sites with reusable components, nested layouts, rendering flexibility, and built-in optimization. citeturn25view0turn25view2 | Next.js / React docs. citeturn25view0turn25view2 |
| Styling | Tailwind CSS or CSS Modules + design tokens | The source look is mostly spacing, typography scale, radius, and image treatment; either approach works. My recommendation is CSS variables for tokens plus utility classes for speed. | Use your preferred internal standard. |
| Smooth scrolling | Lenis | Best fit when you want polish without overengineering or harming accessibility goals. citeturn25view3 | Lenis docs. citeturn25view3 |
| Scroll-linked and sequence-heavy motion | GSAP | Strong for timelines, staggers, tweens, and scroll plugins; especially useful if the client later asks for narrative scrolling. citeturn29view0turn29view1turn29view2 | GSAP docs. citeturn29view0turn29view1turn29view2 |
| Simple hover glides and reveal transitions | Framer Motion or a very small animation layer of your choice | Shared-layout hover states and viewport reveals are easier to maintain declaratively than with manual imperative code. | Use if your team prefers a declarative motion API. |
| Carousel / slider, if needed | Embla or Swiper | The source does not prove a carousel requirement, but these are practical if a client later wants one. | Optional. |
| Optional 3D enhancement | React Three Fiber + drei | Only if you intentionally replace static photography with original 3D or model-led storytelling; 3D is not part of the source template core. | Optional. |
| Alternate starter | Vite + React | Best when you deliberately want a static-hosted, lighter build rather than a Next.js app. citeturn25view1turn31view0 | Vite docs. citeturn25view1turn31view0 |

### Component breakdown

| Layer | Components to build |
|---|---|
| Layout | `SiteHeader`, `MobileNav`, `PageIntro`, `Footer`, `SectionContainer`, `SplitCtaPanel` |
| Homepage | `HeroMedia`, `ProjectCardGrid`, `MetricBand`, `ValueCardTriplet`, `ServiceCardGrid`, `AboutMediaSplit`, `TestimonialCluster`, `ArticlePreviewList` |
| Projects | `ProjectFilterBar`, `ProjectArchiveGrid`, `AudienceFitCards`, `DifferentiatorCards` |
| Project detail | `ProjectHero`, `ProjectMetaList`, `ProjectMetricPair`, `ProjectGallery`, `RelatedProjects` |
| Blog | `ArticleArchiveList`, `ArticleHero`, `ArticleBody`, `RelatedArticles` |
| Contact | `ContactForm`, `FaqAccordion`, `TrustBand`, `ContactSplitCta` |
| Shared motion | `HoverPillNav`, `RevealInView`, `ImageZoomOnHover`, `SectionStagger` |

### Suggested folder structure

```txt
src/
  app/
    layout.tsx
    page.tsx
    project/
      page.tsx
      [slug]/
        page.tsx
    blog/
      page.tsx
      [slug]/
        page.tsx
    contact/
      page.tsx
  components/
    layout/
      site-header.tsx
      mobile-nav.tsx
      footer.tsx
    shared/
      section-container.tsx
      split-cta-panel.tsx
      reveal-in-view.tsx
      hover-pill-nav.tsx
      metric-band.tsx
    home/
      hero-media.tsx
      project-card.tsx
      service-card.tsx
      testimonial-card.tsx
      article-preview-card.tsx
    project/
      project-filter-bar.tsx
      project-hero.tsx
      project-gallery.tsx
    blog/
      article-hero.tsx
      article-body.tsx
      related-articles.tsx
    contact/
      contact-form.tsx
      faq-accordion.tsx
  content/
    projects/
    articles/
  lib/
    motion.ts
    seo.ts
    site-config.ts
  styles/
    globals.css
    tokens.css
  public/
    media/
      projects/
      articles/
      team/
      brand/
```

### Implementation order

| Phase | What to do | Estimated hours |
|---|---|---:|
| Discovery and token setup | Rebuild sitemap, create tokens, define spacing/type/image ratios, choose motion rules | 6–10 |
| Static layouts | Build header, footer, containers, homepage sections, project/blog/contact shells | 14–22 |
| CMS/content modelling | Model projects, testimonials, FAQs, articles, SEO fields | 6–10 |
| Motion layer | Hover pill nav, card hover states, viewport reveals, smooth scroll | 8–14 |
| Project and article details | Detail templates, related sections, image galleries, metadata blocks | 10–16 |
| Form + QA polish | Validation, success/error states, keyboard/focus, performance pass | 8–12 |
| Final content load and launch | Original copy, imagery, metadata, redirects, analytics, deployment | 6–10 |

### Code snippets for key effects

#### Nav glide on hover

```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const items = [
  { href: "/", label: "Home" },
  { href: "/project", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function HoverPillNav() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <nav className="relative flex items-center gap-2 rounded-full border border-neutral-300/60 bg-white/80 p-1 backdrop-blur">
      {items.map((item) => {
        const active = hovered === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onMouseEnter={() => setHovered(item.href)}
            onMouseLeave={() => setHovered(null)}
            className="relative z-10 rounded-full px-4 py-2 text-sm font-medium text-neutral-800"
          >
            {active && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 -z-10 rounded-full bg-neutral-900"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
            <span className={active ? "text-white" : ""}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
```

#### Smooth scroll with Lenis

```tsx
"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScrollProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      smoothWheel: true,
      smoothTouch: false,
    });

    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
```

#### Section reveal / motion transition

```tsx
"use client";

import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

export function RevealInView({ children }: PropsWithChildren) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

#### Optional 3D model embed

```tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/models/site-mass.glb");
  return <primitive object={scene} scale={1.2} />;
}

export function ProjectModelViewer() {
  return (
    <div className="h-[480px] w-full overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-950">
      <Canvas camera={{ position: [0, 1.8, 5], fov: 42 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[6, 8, 4]} intensity={1.2} />
        <Environment preset="city" />
        <Model />
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
}
```

### Deployment options

For the recommended stack, **Vercel** is the natural first choice because Next.js explicitly supports deployment there and positions Vercel as the frontend cloud from the creators of Next.js. If you choose a Vite-based static build instead, any good static host is fine because Vite’s production build is designed to be served over static hosting. citeturn25view0turn31view0

## Delivery plan, legal safeguards, and open questions

### Asset checklist

| Asset category | What you need for a non-infringing rebuild |
|---|---|
| Brand | New name, logo, favicon, social handles, footer/legal ownership lines |
| Copy | Original homepage messaging, service copy, project writeups, article/archive copy, FAQs, contact microcopy |
| Photography | Licensed or original hero set, project stills, team/site photos, article cover images |
| Proof | Real testimonials with permissions, real project dates/addresses, meaningful KPI numbers |
| SEO | Titles, meta descriptions, OG images, canonical strategy, schema, analytics events |
| Legal | Privacy policy, terms if needed, cookie/privacy consent if applicable, image licences/releases |
| Motion reference | One short desktop scroll recording, one nav-hover capture, one card-hover capture, one mobile-menu recording |

### QA and test checklist

| QA area | What to verify |
|---|---|
| Desktop | Header stickiness, hover pill accuracy, image crops, card hover states, article spacing, footer alignment |
| Mobile | Menu open/close, filter usability, form ergonomics, tap targets, image crop logic, no horizontal scroll |
| Accessibility | Alt text, heading order, visible focus states, keyboard nav, reduced-motion behaviour, form labels and errors |
| Performance | Responsive image sizes, lazy loading, bundle size, motion jank, no duplicated breakpoint DOM |
| SEO | Metadata per route, canonical URLs, sitemap, robots, schema, OG cards, internal links |
| Content | No placeholder names, no fake phone/email, no geography inconsistencies, no template credits left live |
| Forms | Validation, spam protection, success state, failure state, CRM/email routing |

### Legal and copyright-avoidance guidance

Do **not** reuse the exact template brand, footer credits, CTA copy, placeholder contact details, testimonial identities, or project/article narratives. The source explicitly invites template reuse inside Framer, but that does not give you a safe basis to ship a near-copy for a client using the same content, names, or image set. Rebuild the information architecture and the mood; replace the expression. citeturn34view3turn33view0turn37view0

The safest approach is to keep only the broad design grammar: photographic hero, trust band, featured projects, service cards, about split, testimonial cluster, article/archive patterns, and repeated bottom-page CTAs. Then deliberately change the wording, section ordering, card layouts, photo crops, spacing scale, and small interaction details. Even subtle differences such as changing a three-card service row into a two-plus-two grid, adjusting radii, altering CTA composition, and using a different media grade help move the work away from infringement risk. citeturn34view0turn35view0turn36view0turn37view0

### Open questions and limitations

The crawl was strong for structure, copy, and linked-page discovery, but it did **not** expose frame-accurate hover timing, exact easing curves, exact font-family declarations, or true rendered mobile screenshots. It also could not conclusively verify whether **Load More** and filter states are fully functional in the live visual UI. For pixel-level recreation, the most useful additional captures would be: one desktop full-page screenshot, one nav-hover screenshot, one project-card hover screenshot, one contact-form focus state screenshot, one mobile menu-open screenshot, and a 10–15 second screen recording of a normal page scroll. citeturn36view0turn37view0turn33view0