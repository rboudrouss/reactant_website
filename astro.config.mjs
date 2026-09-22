// @ts-check
import { createRequire } from "node:module";
import path from "node:path";

import { defineConfig } from "astro/config";

/*
 * The demo page needs the analyzer's `.wasm` as a Vite asset, so it can hand
 * the emitted URL to `initWasm`. The package's `exports` map does not expose
 * the file, which makes the deep import unresolvable, so resolve it here on
 * disk instead. A RegExp `find` is what keeps the `?url` suffix attached: a
 * string alias only matches a whole specifier or a path prefix, and the
 * pattern is deliberately unanchored at the end so `?url` survives the swap.
 */
const require = createRequire(import.meta.url);
const wasmFile = path.join(
  path.dirname(require.resolve("reactant-analyzer/package.json")),
  "dist/reactant_wasm_bg.wasm",
);

export default defineConfig({
  site: "https://reactant.rboud.com",
  vite: {
    resolve: {
      alias: [{ find: /^reactant-analyzer\/wasm-binary/, replacement: wasmFile }],
    },
  },
});
