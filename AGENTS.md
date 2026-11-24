<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Anthony Pham portfolio redesign

## Purpose and handoff

This file captures the design and technical decisions from the planning conversation. The redesign lives in `C:\Users\phama\Work\pwv2`; `C:\Users\phama\Work\pw-main` is the content source. Implement the redesign in pwv2.

Owner: Anthony Pham (Anth), a software engineer based in Toronto and a former video/VFX editor under the name sakuti. The site should express both his engineering work and his visual editing taste.

The user wants a simple, personal website with a distinctive interactive composition. Preserve ease of reading and browsing while giving the site the atmosphere of his edits. Do not restart framework selection or substitute a generic portfolio template.

## Agreed technical direction

- Use standard Next.js, deployed on Vercel. This supersedes the earlier Cloudflare static-export decision.
- All visitor interactions run in the browser. No backend is planned.
- Do not introduce Astro, Vinext, OpenNext, authentication, a database, or backend features for the current scope. Vercel's built-in Next.js runtime and image optimization are allowed.
- The user has used Astro and found it awkward. Next.js is his preferred familiar framework. Vite was considered; the latest decision is standard Next.js on Vercel.
- Prebuilt HTML is compatible with the plan: articles and project pages can be generated at build time while the dial and effects use client components.
- Retain Markdown/MDX for writing and structured data for project and edit metadata where practical.
- The new starter uses Next.js 16.4.6, React 19.3.0, TypeScript, Tailwind CSS 4, and Bun 1.3.14. Preserve compatible tooling and keep React Compiler enabled.
- Follow pw-main's frontend organization: compose reusable shared and section-specific components under `src/components`. Use Tailwind utilities for component styling; keep global CSS for semantic tokens, font/reset, and accessibility defaults. Do not introduce CSS Modules as a new convention for this redesign.

### Vercel deployment

- Use Vercel's standard Next.js framework preset, automatic output handling, and the repository's Bun build script (`bun run build`).
- Do not add `output: "export"`, an `out` output-directory override, global `images.unoptimized`, or trailing-slash changes just to accommodate the superseded Cloudflare plan.
- Keep normal Next.js image optimization available. Supply meaningful image sizes and compress large custom backgrounds regardless of hosting.
- Use the new repo's actual production branch; do not assume a branch name without checking.
- Do not add backend functionality simply because the platform supports it. Keep portfolio content prebuilt where practical and interactions in client components.
- Enumerate local article/project routes at build time with `generateStaticParams()` where useful; static export is not a requirement.
- Updating local content requires a new build/deployment. A Git integration can automate this.
- Client components still prerender at build time: access `window`, `document`, and browser storage safely in browser-only effects or handlers.
- Verify the current official deployment instructions when configuring hosting. These notes describe the chosen architecture, not authorization to publish or change DNS immediately.
- Use the user's Vercel hosting destination. Do not create a separate Sites-hosted deployment as a substitute.
- Follow `docs/plan.md` for the active collaborative stages, review checkpoints, and decision log. Read `docs/redesign-plan.md` for supporting implementation detail and `docs/deployment.md` for hosting details.

## Visual direction: light first, typography second

The strongest personal references are Anthony's own edits. His priorities, in order, are light leaks/glares, stylistic lighting and depth, then typography. He likes anime, K-drama, lens flares, and black-and-white styling.

- Build a mostly monochrome foundation with generous negative space and readable content.
- The user will create a custom background for each dial section. Those images should carry the lighting and atmosphere.
- Design interactions around the supplied artwork rather than imposing a generic pointer glow on every background.
- Separate background, foreground, and light layers would allow depth and selective motion if the user supplies them. Do not assume layered assets already exist.
- Possible effects include restrained parallax, light leaks, glare, changes in focus/exposure, and depth-aware organic particles. Select effects to suit the artwork; this is a palette of possibilities, not a requirement to add all of them.
- Petals are a liked motif. Koi and the earlier ASCII pond concept have been dropped for this direction. Do not reintroduce them without user steering.
- Typography from the Suzy edit is a secondary reference. Anthony selected **Red Hat Display** during Part 1; use it as the site's primary font. Final scale and weight treatments remain for the composition review. Do not introduce a serif pairing by default.
- The user likes impact frames from the Vampire edit. Translate their punctuation carefully into purposeful, brief interactions; avoid strobing, repeated flashes, or motion that makes browsing tiring.
- A website has visitor-controlled pacing. Effects must settle into a complete, quiet composition and must not delay navigation or hide content.

### Reference websites

- https://www.yao-space.com/ — primary structural/interaction reference. The user especially likes the dynamic background as the dial moves, plus the circular composition and typography. He has explicitly become interested in a dial-based redesign. The site declared `sourceSerif` for menu titles and `neueMontreal` for small text when inspected; confirm actual font identity/licensing before adopting anything.
- https://www.borisnezlobin.com/projects — the tree above the projects provides atmosphere and depth within a readable site.
- https://ethanwong.ca/ — a cohesive personal scene and a simple overall structure. The user referenced hash-addressed destinations such as `/#cv`; this was discussed as an interaction model, not independently verified as Ethan's implementation.
- These are references for composition and behavior, not templates to reproduce verbatim or sources of artwork to copy.

### Personal video references and user explanations

1. https://www.youtube.com/watch?v=NWY_uNG1mx0 — Over The Moon / Bae Suzy. Cutout imagery, light, and oversized angled typography; typography around 18 seconds is an acceptable secondary reference.
2. https://www.youtube.com/watch?v=3YcFgJ-2uEo — Late Night Talking / Tada Never Falls in Love. Around 17–19 seconds, circular text and a yellow glowing circle rise with imagery, mimicking sunrise in response to the lyric "to the morning." The user explicitly explained this intent. He also likes the petals. Preserve the lesson that an effect responds to a meaningful trigger, rather than copying a circle as arbitrary decoration.
3. https://www.youtube.com/watch?v=B2UphnNtMhg — Vampire / Tokyo Ghoul. User highlights impact frames, light glares, and other stylistic effects; sampled frames also show layered silhouettes, exposure changes, and sparse text against black.

Editing account: https://www.instagram.com/lovesakuti . YouTube proved accessible through Chrome DevTools. Videos were inspected through sampled frames and closer transition samples, not assessed as a complete audiovisual playback. Do not claim verified music timing beyond the user's own explanation.

## Homepage and content architecture

### Confirmed direction

- Use a YAO-inspired dial as the main homepage navigation.
- The opening dial position is Anthony's logo, with About information on the left, similar in purpose to the current homepage.
- Projects follows; additional sections can follow the same scene structure.
- The user is creating a distinct background per section.
- Keep the résumé easy to access as a persistent text link; it does not need its own dial position. A link under the About introduction can reinforce discoverability. Open the PDF in a new tab.
- Create a new project and migrate content from this repo rather than redesigning this source checkout in place.

### Proposed structure, still open to refinement

- The user confirmed five dial sections during Part 1: logo/About, Projects, Edits, Writing, Contact. Keep quick contact links and the résumé persistent as well. Exact visual placement remains open.
- Hash locations such as `/#about`, `/#projects`, and `/#writing` can represent the selected scene. Direct links and browser Back/Forward should restore the selection.
- Projects initially shows three selected projects with compact metadata: title, one-sentence description, and year/context where available. Do not invent dates or results.
- Individual projects can open a focused detail panel; edits can open a video viewer; articles can use dedicated reading pages.
- The user considered showing the full project collection in a modal. The recommendation was a dedicated archive page for browsing the growing collection. This choice remains open; do not present the archive treatment as user-approved.
- Likewise, modal-versus-route behavior for detail views is not finalized. Choose deliberately with accessible dismissal, direct linking, mobile space, and history behavior in mind.
- Persistent résumé and contact/social links should remain discoverable regardless of dial state.
- Prefer one focused overlay at a time. Avoid an entire nested website inside a modal.

## Existing content and assets to migrate

Source checkout: `C:\Users\phama\Work\pw-main` (source GitHub repo: https://github.com/anthskti/pw-main).

| Source | Content |
| --- | --- |
| `src/app/page.js` | About introduction, current roles, education, selected builds, previous experience |
| `src/data/projects.js` | Project titles, descriptions, categories, technologies, images, demo and source links |
| `src/app/projects/page.js` | Existing archive/filter/search behavior |
| `src/app/writing/*/page.mdx` | Articles and their metadata |
| `src/components/writing/MdxLayout.js` | Existing article presentation |
| `src/components/Header.js` | Navigation, logo asset references, résumé link |
| `src/components/Footer.js` | Contact and social links |
| `src/assets/` | Headshot, logos, project imagery |
| `public/` | Résumé PDF and other public assets; inspect before migrating |

- Existing résumé URL: `/anthony_pham_resume.pdf`.
- Existing public identity/domain: Anthony Pham / https://anthonypham.ca . Preserve URLs where practical or plan host-level redirects for changed paths.
- Existing GitHub: https://github.com/anthskti . LinkedIn: https://www.linkedin.com/in/anthpham/ . Email: phamanthony47@gmail.com . Verify these against source before final migration.
- Writing directories observed: `2025`, `coding-tutorial`, `hack-the-6ix`, `luna-pmlabs`, `video-editing`.
- Reuse factual content and real assets. Do not copy `node_modules`, `.next`, credentials, or source Git history into the new project by default.
- Review current copy with the user as needed; do not silently change roles, achievements, or project claims.
- Current layout/theme styling is historical context, not a visual requirement for the redesign.

## Design reference and accessibility

The user explicitly requested the `apple-design` skill as a point of reference. Use it when available:

`C:\Users\phama\.agents\skills\apple-design\SKILL.md`

- Read the skill and relevant reference pages before citing them. For this website, apply its principles, craft, layout, typography, accessibility, and motion guidance; translate to web behavior rather than imposing native Apple navigation conventions.
- Preserve the site's personality. Do not turn it into a generic Apple-looking interface.
- Make dial sections selectable by direct click/tap and keyboard; dragging or scrolling must not be the only input path.
- Provide visible focus, semantic controls/links, an identifiable current section, and comfortable touch targets.
- Keep text contrast reliable against every background and during transitions. Use a stable content region or scrim when the artwork requires one.
- Honor reduced motion with a strong still composition; ongoing decorative motion needs an accessible pause mechanism where appropriate.
- Keep decorative imagery out of the accessibility tree. Give meaningful media suitable text alternatives.
- Modals need an accessible name, focus management, Escape/visible close behavior, and focus restoration.
- Adapt to narrow widths, browser zoom, and large text. A single-scene desktop concept must not force clipped content or prevent scrolling on mobile.
- Performance is part of the visual design: load the initial scene first, size/compress backgrounds, and progressively load other sections. Do not eagerly load every large image/video.

## Next working steps

1. Inspect the new repo and its instructions before editing. Continue from any work already present.
2. Verify a normal Next.js production build early, retaining React Compiler and the supported starter configuration.
3. Inventory and migrate the existing content/assets, keeping data separate from presentation.
4. Develop the opening logo/About scene and dial behavior as the first reviewable composition. Use clearly identified temporary assets if the custom backgrounds are not ready; do not claim they are the user's finished artwork.
5. Establish compact color/type/layout tokens and responsive composition before expanding the design, following the apple-design workflow.
6. Add section content, media/detail views, archive/reading routes, and asset-specific effects after that foundation is coherent.
7. Validate production builds, deep links/history, keyboard/touch navigation, overlays, mobile layout, and reduced motion. Deployment should be configured for Vercel.

## Current implementation status

- Desktop framing follow-up is implemented and verified: decorative ring removed, wheel shifted inward (82% wide / 88% intermediate center), and its own layout-width stage clips transformed bounds on both axes. No global body scroll lock was added. Desktop section transitions/direct hashes no longer introduce page scrollbars in checked sizes; mobile is preserved. Part 3 implementation is ready for final visual review, with Projects migration next as Part 4. See `docs/part-3-dial.md` for the reproduction and verification record.

- Latest approved batch: enlarge the desktop wheel and its label orbit, fix its crop at the scene/browser edge, and rotate desktop labels/metadata rigidly around one shared center. Five evenly spaced desktop stops use natural 72-degree spacing and orientation, superseding the earlier artificial 45-degree desktop tilt. Preserve the current mobile visuals, slim previews, and detail popups during this batch. Anthony likes mobile; source-content migration remains later work. See the latest-feedback section of `docs/part-3-design-review.md`. Broader audit proposals are not approved by this bounded batch.

- The new project is at `C:\Users\phama\Work\pwv2`. Parts 1 and 2 are implemented. Part 3's interactive dial prototype is in visual review: a larger circle cropped at the desktop right edge, stable left content, rotation-linked temporary backgrounds, direct section selection, drag, scoped wheel input, keyboard, and hash/history behavior. Custom artwork is pending; nothing has been deployed. See `docs/part-3-dial.md`.
- During Part 3, Anthony requested visible neighboring wheel sections, more of the circle on screen, consistent layout rules across states, and removal of the navigation row beneath each content panel. Use one shared section index above the content. For mobile, he selected YAO's wheel below the content, shifted left, with small section metadata; this supersedes the earlier top mobile arc proposal. Preserve normal scrolling and full About copy.
- Anthony's latest Part 3 preference supersedes the full-copy Part 2 homepage: use slim, consistent section previews. Only Projects, Edits, and Writing open accessible detail popups; About is a short introduction, and Contact uses direct links. Full About copy remains preserved in data/components. Lock mobile dial placement independently of preview height and reduce its visible area to about 1/4.5 of viewport height to leave room for future imagery. Neighboring labels should tilt about 45 degrees, and metadata is shown on desktop as well as mobile. See `docs/part-3-dial.md` and `docs/plan.md` for current review status; `docs/part-2-design.md` records historical layout rationale.
- React Compiler is enabled and accepted by the user. Preserve `reactCompiler: true`.
- Read the bundled Next.js docs required by the starter instructions before implementation.
- The starter also enables `cacheComponents` and `partialPrefetching`. Evaluate their use against this installed version and retain compatible defaults; there is no longer a static-export compatibility constraint.
- Migrate content selectively and preserve the new starter's compatible tooling. See `docs/content-map.md` for 17 active projects, five articles, asset inventory, and migration issues. Full project/article migration is deferred to the corresponding plan parts.
- The user authorized Luna at medium reasoning to write code while the primary agent orchestrates, reviews, and tests with Chrome DevTools. Continue that division of work when useful; provide the agent sufficient context and bounded file ownership.
