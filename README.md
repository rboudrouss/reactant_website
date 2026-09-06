# reactant_website

Landing page for [reactant](https://github.com/rboudrouss/reactant-analyzer), a static
analyzer for React hook bugs. Astro, one static page, no client-side JavaScript.

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # -> dist/
npm run preview
```

- Content and styles: [src/pages/index.astro](src/pages/index.astro)
- Design tokens (shared with rboud.com): [src/styles/global.css](src/styles/global.css)
- `site` in [astro.config.mjs](astro.config.mjs) is a placeholder, set it to the real domain.
