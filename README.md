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
- Deployed at `https://reactant.rboud.com`, set as `site` in [astro.config.mjs](astro.config.mjs);
  the social card tags are built from it.
- The version badge and the Action pin on the page come from the installed
  `reactant-analyzer`, so bumping that dependency updates both.
- The social card is `public/og.png`, rendered from [tools/og.html](tools/og.html):

  ```sh
  chromium --headless --window-size=1200,630 --screenshot=public/og.png tools/og.html
  ```
