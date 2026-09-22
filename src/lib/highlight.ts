/*
 * The tokenizer behind the editable panes.
 *
 * A textarea cannot colour its own text, so the highlighted copy is painted in
 * a `pre` underneath and the textarea is made transparent over it. The two must
 * agree on every metric that decides where a glyph lands (font, size, line
 * height, padding, `white-space`), which the stylesheet does by giving both the
 * same declarations.
 *
 * It is deliberately small. Shiki, which renders the static code blocks on this
 * page at build time, costs about a megabyte to run in the browser; that is a
 * poor trade next to a handful of snippets of a dozen lines.
 */

/** Order matters: at any position the first alternative to match wins. */
const TOKEN = new RegExp(
  [
    "(//[^\\n]*|/\\*[\\s\\S]*?\\*/)", // comment
    "(\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'|`(?:[^`\\\\]|\\\\.)*`)", // string
    "(</?[A-Za-z][\\w.]*)", // JSX tag name, opening or closing
    "([A-Za-z_$][\\w$]*(?==\\{))", // JSX attribute: `onClick={`
    "(\\b(?:import|from|export|default|const|let|var|function|return|if|else|new|typeof|await|async|null|true|false|undefined)\\b)",
    "([A-Za-z_$][\\w$]*(?=\\())", // anything called, hooks included
    "(\\b\\d+(?:\\.\\d+)?\\b)", // number
  ].join("|"),
  "g",
);

/** One class per capturing group above, in the same order. */
const TOKEN_CLASS = ["tk-c", "tk-s", "tk-t", "tk-a", "tk-k", "tk-f", "tk-n"];

const esc = (part: string) =>
  part.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function highlight(code: string): string {
  let html = "";
  let last = 0;

  for (const match of code.matchAll(TOKEN)) {
    html += esc(code.slice(last, match.index));
    // The group that fired names the token; the rest are undefined.
    const group = TOKEN_CLASS.findIndex((_, i) => match[i + 1] !== undefined);
    html += `<span class="${TOKEN_CLASS[group]}">${esc(match[0])}</span>`;
    last = match.index + match[0].length;
  }

  return html + esc(code.slice(last));
}
