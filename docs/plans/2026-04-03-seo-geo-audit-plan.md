# Trixode Studios SEO and GEO Audit Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Produce a full SEO and GEO audit for `https://www.trixode-studios.com` that explains why Trixode has weak Google visibility today and delivers a prioritized roadmap to win `software agency` demand in Victoria first, then Vancouver Island, Vancouver, and broader BC.

**Architecture:** Run an evidence-first audit in five layers: live crawl/indexation, repo-level SEO template review, commercial page architecture and keyword mapping, local/GEO/entity signals, and off-site authority. Split the work across parallel subagents where the domains do not overlap, then combine the findings into one severity-ranked roadmap.

**Tech Stack:** Next.js 16 App Router, Vercel deployment, metadata in `app/`, schema in `lib/schemas.ts`, GEO helper file in `public/llms.txt`, Google Search Console, GA4, optional Ahrefs/Semrush/Screaming Frog.

---

### Task 1: Capture the Baseline

**Files:**
- Review: `app/layout.tsx`
- Review: `app/sitemap.ts`
- Review: `app/blog/[slug]/head.tsx`
- Review: `lib/schemas.ts`
- Review: `public/llms.txt`
- Review: `next.config.mjs`

**Step 1: Confirm the live SEO entry points**

Run: `curl -I -L "https://www.trixode-studios.com"`

Run: `curl -I -L "https://www.trixode-studios.com/robots.txt"`

Run: `curl -I -L "https://www.trixode-studios.com/sitemap.xml"`

Expected: `200` responses for home, `robots.txt`, and `sitemap.xml` with the production domain.

**Step 2: Confirm commercial URL behavior**

Run: `curl -I -L "https://www.trixode-studios.com/pricing"`

Run: `curl -I -L "https://www.trixode-studios.com/services"`

Expected: document whether `/services` is a real page or a redirect/canonical alias.

**Step 3: Record the current live baseline**

Capture: homepage title, H1, core service copy, canonical behavior, sitemap coverage, and robots directives.

Expected: one baseline section summarizing what is already correct and what is clearly broken.

### Task 2: Build the URL Inventory and Indexation Map

**Files:**
- Review: `app/sitemap.ts`
- Review: `app/(home)/page.tsx`
- Review: `app/pricing/page.tsx`
- Review: `app/services/page.tsx`
- Review: `app/projects/page.tsx`
- Review: `app/about/page.tsx`
- Review: `app/contact/page.tsx`
- Review: `app/people/page.tsx`
- Review: `app/careers/page.tsx`
- Review: `app/blog/page.tsx`
- Review: `app/blog/[slug]/page.tsx`

**Step 1: Export the list of intended indexable URLs**

Use the sitemap as the starting inventory.

Expected: one URL list containing all static pages and blog posts currently meant to rank.

**Step 2: Classify each URL**

Classify every URL as `keep`, `expand`, `merge`, `redirect`, or `noindex`.

Expected: a sheet that makes it obvious which URLs are real commercial assets and which are noise.

**Step 3: Flag crawl/indexation conflicts**

Check for these patterns:
- redirecting URLs in sitemap
- non-canonical URLs in sitemap
- thin pages included in crawl targets
- blog pages with weak or duplicate metadata
- staging or experiment URLs returning `200`

Expected: a dedicated issue list for crawl/index alignment.

### Task 3: Audit Template-Level Technical SEO

**Files:**
- Review: `app/layout.tsx`
- Review: `app/blog/layout.tsx`
- Review: `app/blog/[slug]/head.tsx`
- Review: `app/blog/[slug]/page.tsx`
- Review: `app/services/layout.tsx`
- Review: `app/pricing/layout.tsx`
- Review: `app/robots.ts`
- Review: `lib/seo.ts`

**Step 1: Audit metadata ownership by route type**

Verify which routes use App Router `metadata` or `generateMetadata` and which still depend on `head.tsx`.

Expected: a table showing the metadata source for home, services, pricing, blog index, and blog article pages.

**Step 2: Audit canonical and Open Graph consistency**

Check whether each page self-canonicalizes and whether OG URLs match the canonical URL.

Expected: a list of routes with canonical collisions, inherited metadata, or generic titles/descriptions.

**Step 3: Audit schema coverage**

Check which schema types are available in `lib/schemas.ts` versus which ones are actually emitted live.

Expected: a gap report for `ProfessionalService`, `WebSite`, `Service`, `BlogPosting`, `FAQPage`, `BreadcrumbList`, and person-level schema.

### Task 4: Build the Keyword and Page Architecture Map

**Files:**
- Review: `app/(home)/page.tsx`
- Review: `app/pricing/page.tsx`
- Review: `app/services/page.tsx`
- Review: `app/projects/page.tsx`
- Review: `app/blog/blogData.ts`
- Review: `components/home/ServicesSection.tsx`
- Review: `components/layout/FloatingNav.tsx`
- Review: `components/footer.tsx`

**Step 1: Define the primary demand cluster**

Primary cluster:
- `software agency victoria bc`
- `software development company victoria bc`
- `custom software development victoria`

Secondary clusters:
- `ai agency victoria`
- `web development agency victoria`
- `ai automation victoria`

Expected: one keyword cluster sheet split into primary, secondary, and supporting terms.

**Step 2: Map each cluster to a real landing page**

For every target cluster, assign one best URL or mark it as `missing`.

Expected: a page map that shows where the current site has no rankable landing page.

**Step 3: Define the expansion ladder**

Map the rollout order as:
- Victoria
- Vancouver Island
- Vancouver
- British Columbia

Expected: a geographic rollout map that avoids launching all location pages at once without proof.

### Task 5: Audit Local SEO and GEO Signals

**Files:**
- Review: `app/layout.tsx`
- Review: `lib/schemas.ts`
- Review: `public/llms.txt`
- Review: `app/contact/page.tsx`
- Review: `app/people/page.tsx`
- Review: `app/about/page.tsx`

**Step 1: Check entity consistency**

Validate consistency for business name, legal name, email domain, team titles, office locations, and service area wording.

Expected: one issue list for entity mismatches across the site and structured data.

**Step 2: Audit local proof**

Check for visible address signals, phone, hours, reviews, testimonials, BC client names, local case studies, and public trust markers.

Expected: one gap list showing what a user or LLM cannot confidently cite today.

**Step 3: Audit GEO-ready content**

Check whether the site provides:
- sourceable facts
- location-specific service claims
- FAQ-style answers
- case-study evidence
- comparison or decision content

Expected: one GEO readiness scorecard by page type.

### Task 6: Audit the Blog and Supporting Content Program

**Files:**
- Review: `app/blog/page.tsx`
- Review: `app/blog/blogData.ts`
- Review: `app/blog/[slug]/page.tsx`
- Review: `app/blog/[slug]/head.tsx`

**Step 1: Evaluate the current blog against commercial intent**

Separate posts into these buckets:
- commercial support
- topical authority
- off-topic dilution

Expected: a content audit table showing which posts help the agency rank and which do not.

**Step 2: Identify missing BOFU and local content**

Look for missing topics such as:
- software agency Victoria comparisons
- custom software cost in Victoria BC
- AI automation for Victoria businesses
- web development for Victoria small businesses
- software agency vs freelancer vs internal team

Expected: a new content brief list prioritized by revenue potential.

**Step 3: Audit blog-to-service linking**

Check whether every relevant article points to a canonical commercial page.

Expected: one internal-linking gap list for blog CTAs and related content.

### Task 7: Audit External Authority and Local Presence

**Files:**
- Review: `public/llms.txt`
- Review: LinkedIn profile
- Review: GitHub profile
- Review: Google Business Profile if it exists
- Review: Clutch, directories, citations, review profiles if they exist

**Step 1: Inventory owned profiles**

Build one list of all business profiles and citations already under Trixode control.

Expected: one master profile inventory with ownership status.

**Step 2: Check profile consistency**

Verify the same business facts appear across all profiles.

Expected: one inconsistency list for NAP, description, services, and leadership details.

**Step 3: Benchmark competitor authority**

Collect the top Victoria and BC competitors for:
- software agency
- software development company
- AI agency
- web development agency

Expected: one benchmark table showing why they outrank Trixode today.

### Task 8: Produce the Prioritized Roadmap

**Files:**
- Create: `docs/audits/seo-geo-audit-summary.md`
- Create: `docs/audits/seo-geo-url-map.csv`
- Create: `docs/audits/seo-geo-keyword-map.csv`

**Step 1: Create the quick-win list**

Include only fixes that materially improve discoverability in the next 14 days.

Expected: a short list led by indexation, metadata, sitemap, and entity cleanup.

**Step 2: Create the 30/60/90 roadmap**

Split work into:
- 30 days: technical cleanup and architecture decisions
- 60 days: commercial page launches and proof layer
- 90 days: local authority, content scaling, GEO reinforcement

Expected: a roadmap sequenced by leverage, not by convenience.

**Step 3: Define success metrics**

Track:
- indexed canonical pages
- branded and non-branded impressions
- clicks from Victoria software queries
- rankings for priority commercial terms
- conversions from organic landing pages
- LLM citation readiness for core pages

Expected: one measurement section tied to business outcomes, not vanity traffic.

### Task 9: Verification Before Sign-off

**Files:**
- Review: final audit summary
- Review: final URL map
- Review: final keyword map

**Step 1: Recheck the highest-risk live URLs**

Run: `curl -I -L "https://www.trixode-studios.com/services"`

Run: `curl -I -L "https://www.trixode-studios.com/pricing"`

Run: `curl -I -L "https://www.trixode-studios.com/blog/ai-seo-vs-traditional"`

Expected: all evidence cited in the audit still matches production behavior.

**Step 2: Recheck the repo references used in the audit**

Verify every cited file path and route still exists.

Expected: no stale references in the final deliverable.

**Step 3: Deliver the final recommendation**

End with:
- the top 5 blockers
- the top 5 quick wins
- the first 3 pages to build or fix
- the first 3 authority actions to take outside the repo

Expected: a final audit that is directly actionable.
