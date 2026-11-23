# Anthony Pham — Portfolio v2

A redesign of Anthony's personal portfolio, combining a dial-based homepage with custom backgrounds and light/VFX interactions inspired by his video editing work.

## Stack

Next.js App Router, React, TypeScript, Tailwind CSS 4, Bun, and React Compiler. Deploy as a standard Next.js project on Vercel. No application backend is planned. The earlier Cloudflare/static-export plan has been superseded.

## Development

```sh
bun install --frozen-lockfile
bun run dev
```

Open http://localhost:3000. To validate a production build:

```sh
bun run build
```

Application code lives in `src/app`. Read the installed Next.js documentation and root agent instructions before implementation.

## Project documentation

- [AGENTS.md](AGENTS.md): agreed direction, personal references, content sources, and working constraints.
- [Working plan](docs/plan.md): staged collaboration, review checkpoints, progress, and design decisions.
- [Content map](docs/content-map.md): source inventory, proposed content destinations, and migration issues.
- [Technical redesign plan](docs/redesign-plan.md): supporting implementation detail.
- [Deployment](docs/deployment.md): Vercel configuration and preview workflow.

## Content and artwork

Migrate existing portfolio content and assets from `C:\Users\phama\Work\pw-main`, adapting them to the new presentation. Anthony will create custom backgrounds for the sections. Temporary artwork should remain identifiable as a development placeholder.

The first visual milestone is the logo/About scene with an accessible dial and persistent résumé/contact links. The design should remain readable and usable on mobile, with keyboard controls and reduced-motion support.

## Deployment

Use Vercel's Next.js preset, `bun run build`, and the framework's default output directory. Do not configure a static export or disable image optimization globally for hosting compatibility. See [deployment notes](docs/deployment.md).

Parts 1 and 2 have a buildable implementation: migrated About/link data and assets now feed a wider opening composition with reusable Tailwind-styled components and a static section dial. Production builds and desktop/mobile browser checks pass. The composition is ready for Anthony's feedback; interactive navigation and custom backgrounds follow. No deployment has been performed.
